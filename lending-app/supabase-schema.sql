-- DynamicLend: Amazon Reseller ABL Platform
-- Run this in your Supabase SQL editor to set up the schema

-- Profiles table (extends auth.users)
create table if not exists public.profiles (
  id uuid references auth.users(id) on delete cascade primary key,
  email text not null,
  full_name text,
  company_name text,
  amazon_seller_id text,
  gmv_range text,
  primary_category text,
  seller_age text,
  ein text,
  -- Credit data
  credit_limit numeric(14,2) default 0,
  available_credit numeric(14,2) default 0,
  current_balance numeric(14,2) default 0,
  borrowing_base numeric(14,2) default 0,
  inventory_value numeric(14,2) default 0,
  sell_through_rate numeric(5,2) default 0,
  seller_rating numeric(5,2) default 0,
  account_status text default 'pending' check (account_status in ('pending', 'under_review', 'approved', 'active', 'frozen', 'closed')),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Draws / Disbursements
create table if not exists public.draws (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid references public.profiles(id) on delete cascade not null,
  amount numeric(14,2) not null,
  destination_account text,
  status text default 'pending' check (status in ('pending', 'processing', 'completed', 'failed')),
  requested_at timestamptz default now(),
  disbursed_at timestamptz
);

-- Repayments
create table if not exists public.repayments (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid references public.profiles(id) on delete cascade not null,
  amount numeric(14,2) not null,
  source text default 'manual' check (source in ('manual', 'settlement_sweep', 'bank_transfer')),
  status text default 'pending' check (status in ('pending', 'completed', 'failed')),
  created_at timestamptz default now()
);

-- Alerts
create table if not exists public.alerts (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid references public.profiles(id) on delete cascade not null,
  severity text default 'info' check (severity in ('info', 'warning', 'critical', 'success')),
  title text not null,
  message text,
  is_read boolean default false,
  created_at timestamptz default now()
);

-- Borrowing base history (for charting)
create table if not exists public.borrowing_base_history (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid references public.profiles(id) on delete cascade not null,
  borrowing_base numeric(14,2) not null,
  inventory_value numeric(14,2),
  credit_limit numeric(14,2),
  recorded_at timestamptz default now()
);

-- RLS Policies
alter table public.profiles enable row level security;
alter table public.draws enable row level security;
alter table public.repayments enable row level security;
alter table public.alerts enable row level security;
alter table public.borrowing_base_history enable row level security;

-- Users can only access their own data
create policy "Users can view own profile" on public.profiles for select using (auth.uid() = id);
create policy "Users can update own profile" on public.profiles for update using (auth.uid() = id);
create policy "Users can view own draws" on public.draws for select using (auth.uid() = profile_id);
create policy "Users can insert own draws" on public.draws for insert with check (auth.uid() = profile_id);
create policy "Users can view own repayments" on public.repayments for select using (auth.uid() = profile_id);
create policy "Users can view own alerts" on public.alerts for select using (auth.uid() = profile_id);
create policy "Users can update own alerts" on public.alerts for update using (auth.uid() = profile_id);
create policy "Users can view own bb history" on public.borrowing_base_history for select using (auth.uid() = profile_id);

-- Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, full_name)
  values (
    new.id,
    new.email,
    new.raw_user_meta_data->>'full_name'
  );
  return new;
end;
$$ language plpgsql security definer;

create or replace trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Update timestamp trigger
create or replace function public.update_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger update_profiles_updated_at
  before update on public.profiles
  for each row execute function public.update_updated_at();
