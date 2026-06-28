import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  TrendingUp, Package, Activity, Bell, ArrowUpRight,
  ArrowDownRight, LogOut, Settings, ChevronRight, AlertTriangle,
  CheckCircle2, RefreshCw, BarChart3, Wallet, Clock, Plus
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Separator } from '@/components/ui/separator'
import { useAuth } from '@/context/AuthContext'
import { formatCurrency, formatPercent } from '@/lib/utils'

const DEMO_DATA = {
  creditLimit: 850000,
  availableCredit: 512000,
  currentBalance: 338000,
  inventoryValue: 1120000,
  borrowingBase: 742000,
  utilizationPct: 39.8,
  sellThroughRate: 68.2,
  sellerRating: 97.4,
  pendingSettlement: 142300,
}

const recentActivity = [
  { type: 'draw', label: 'Draw Disbursed', amount: 75000, date: 'Jun 26', status: 'completed' },
  { type: 'repayment', label: 'Settlement Sweep', amount: -28400, date: 'Jun 24', status: 'completed' },
  { type: 'increase', label: 'Line Increased', amount: 50000, date: 'Jun 22', status: 'info' },
  { type: 'draw', label: 'Draw Disbursed', amount: 120000, date: 'Jun 18', status: 'completed' },
  { type: 'repayment', label: 'Settlement Sweep', amount: -41200, date: 'Jun 15', status: 'completed' },
]

const alerts = [
  { severity: 'warning', message: 'ASIN B08XJ3KN1L approaching 25% concentration limit', time: '2h ago' },
  { severity: 'info', message: 'Borrowing base refreshed: +$14,200 from new FBA intake', time: '6h ago' },
  { severity: 'success', message: 'Auto-repayment of $28,400 applied from Amazon settlement', time: '2d ago' },
]

const inventory = [
  { name: 'Electronics', units: 1840, value: 412000, pct: 36.8 },
  { name: 'Home & Kitchen', units: 3120, value: 318000, pct: 28.4 },
  { name: 'Sporting Goods', units: 2200, value: 214000, pct: 19.1 },
  { name: 'Other ASINs', units: 890, value: 176000, pct: 15.7 },
]

function StatCard({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  color = 'blue',
}: {
  title: string
  value: string
  subtitle?: string
  icon: React.ElementType
  trend?: { direction: 'up' | 'down'; value: string }
  color?: string
}) {
  const colorMap: Record<string, string> = {
    blue: 'from-blue-500 to-cyan-500',
    green: 'from-emerald-500 to-teal-500',
    violet: 'from-violet-500 to-purple-500',
    amber: 'from-amber-500 to-orange-500',
  }

  return (
    <Card className="glass hover:border-primary/20 transition-all group">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div
            className={`w-10 h-10 rounded-lg bg-gradient-to-br ${colorMap[color]} flex items-center justify-center group-hover:scale-110 transition-transform`}
          >
            <Icon className="w-5 h-5 text-white" />
          </div>
          {trend && (
            <div
              className={`flex items-center gap-1 text-xs font-medium ${
                trend.direction === 'up' ? 'text-emerald-400' : 'text-rose-400'
              }`}
            >
              {trend.direction === 'up' ? (
                <ArrowUpRight className="w-3 h-3" />
              ) : (
                <ArrowDownRight className="w-3 h-3" />
              )}
              {trend.value}
            </div>
          )}
        </div>
        <div className="text-2xl font-bold text-foreground mb-1">{value}</div>
        <div className="text-sm text-muted-foreground">{title}</div>
        {subtitle && <div className="text-xs text-muted-foreground/70 mt-1">{subtitle}</div>}
      </CardContent>
    </Card>
  )
}

export function DashboardPage() {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()
  const [drawAmount, setDrawAmount] = useState('')
  const [showDrawForm, setShowDrawForm] = useState(false)

  const handleSignOut = async () => {
    await signOut()
    navigate('/')
  }

  const utilization = (DEMO_DATA.currentBalance / DEMO_DATA.creditLimit) * 100

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar */}
      <div className="fixed left-0 top-0 bottom-0 w-64 border-r border-border/50 bg-card/50 backdrop-blur-xl hidden lg:flex flex-col z-40">
        <div className="p-6 border-b border-border/50">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
              <TrendingUp className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-foreground">
              Dynamic<span className="text-gradient">Lend</span>
            </span>
          </Link>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {[
            { icon: BarChart3, label: 'Overview', active: true },
            { icon: Wallet, label: 'Draw Funds', active: false },
            { icon: Package, label: 'Inventory', active: false },
            { icon: Activity, label: 'Analytics', active: false },
            { icon: RefreshCw, label: 'Repayments', active: false },
            { icon: Bell, label: 'Alerts', active: false },
            { icon: Settings, label: 'Settings', active: false },
          ].map(({ icon: Icon, label, active }) => (
            <button
              key={label}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all ${
                active
                  ? 'bg-primary/10 text-primary font-medium'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
              }`}
            >
              <Icon className="w-4 h-4" />
              {label}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-border/50">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-xs font-bold text-white">
              {user?.email?.[0]?.toUpperCase() ?? 'U'}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-foreground truncate">
                {user?.user_metadata?.full_name ?? user?.email}
              </div>
              <div className="text-xs text-muted-foreground truncate">{user?.email}</div>
            </div>
          </div>
          <Button variant="ghost" size="sm" className="w-full justify-start text-muted-foreground" onClick={handleSignOut}>
            <LogOut className="w-4 h-4 mr-2" />
            Sign Out
          </Button>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Top bar */}
        <div className="sticky top-0 z-30 border-b border-border/50 bg-background/80 backdrop-blur-xl px-6 py-4">
          <div className="flex items-center justify-between max-w-6xl mx-auto">
            <div>
              <h1 className="text-lg font-semibold text-foreground">
                Good morning,{' '}
                <span className="text-gradient">
                  {user?.user_metadata?.full_name?.split(' ')[0] ?? 'Seller'}
                </span>
              </h1>
              <p className="text-xs text-muted-foreground">
                Borrowing base last refreshed: Today at 6:02 AM UTC
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant="success" className="hidden sm:flex">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mr-1.5" />
                Account Healthy
              </Badge>
              <Button variant="gradient" size="sm" onClick={() => setShowDrawForm(true)}>
                <Plus className="w-4 h-4 mr-1" />
                Draw Funds
              </Button>
            </div>
          </div>
        </div>

        <div className="p-6 max-w-6xl mx-auto space-y-8">
          {/* Credit Overview */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Card className="border-primary/20 bg-gradient-to-br from-blue-950/50 to-cyan-950/20 overflow-hidden">
              <CardContent className="p-0">
                <div className="grid lg:grid-cols-3 divide-y lg:divide-y-0 lg:divide-x divide-border/50">
                  <div className="p-8">
                    <div className="text-sm text-muted-foreground mb-2">Available Credit</div>
                    <div className="text-5xl font-bold text-gradient mb-1">
                      {formatCurrency(DEMO_DATA.availableCredit)}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      of {formatCurrency(DEMO_DATA.creditLimit)} total line
                    </div>
                    <div className="mt-4">
                      <div className="flex justify-between text-xs text-muted-foreground mb-2">
                        <span>Utilized</span>
                        <span>{formatPercent(utilization)}</span>
                      </div>
                      <Progress value={utilization} className="h-2" />
                    </div>
                  </div>

                  <div className="p-8">
                    <div className="text-sm text-muted-foreground mb-2">Borrowing Base</div>
                    <div className="text-5xl font-bold text-foreground mb-1">
                      {formatCurrency(DEMO_DATA.borrowingBase)}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      from {formatCurrency(DEMO_DATA.inventoryValue)} inventory
                    </div>
                    <div className="mt-4 space-y-1.5">
                      {[
                        { label: 'FBA Sellable (70%)', value: formatCurrency(784000 * 0.7) },
                        { label: 'Receivables (85%)', value: formatCurrency(DEMO_DATA.pendingSettlement * 0.85) },
                      ].map(({ label, value }) => (
                        <div key={label} className="flex justify-between text-xs">
                          <span className="text-muted-foreground">{label}</span>
                          <span className="text-foreground font-medium">{value}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="p-8">
                    <div className="text-sm text-muted-foreground mb-2">Current Balance</div>
                    <div className="text-5xl font-bold text-foreground mb-1">
                      {formatCurrency(DEMO_DATA.currentBalance)}
                    </div>
                    <div className="text-sm text-muted-foreground">outstanding</div>
                    <div className="mt-4">
                      <div className="text-sm text-muted-foreground mb-2">Pending Settlement</div>
                      <div className="text-2xl font-semibold text-emerald-400">
                        {formatCurrency(DEMO_DATA.pendingSettlement)}
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">Auto-sweep in 3 days</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Draw Funds Form */}
          {showDrawForm && (
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
              <Card className="border-primary/30 bg-primary/5">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                    <Wallet className="w-5 h-5 text-primary" />
                    Request a Draw
                  </h3>
                  <div className="flex gap-3 items-end">
                    <div className="flex-1 space-y-2">
                      <label className="text-sm text-muted-foreground">Amount (max {formatCurrency(DEMO_DATA.availableCredit)})</label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                        <input
                          type="number"
                          placeholder="0"
                          max={DEMO_DATA.availableCredit}
                          value={drawAmount}
                          onChange={(e) => setDrawAmount(e.target.value)}
                          className="w-full pl-8 h-11 rounded-lg border border-border bg-muted/50 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                        />
                      </div>
                    </div>
                    <Button variant="gradient" size="lg" className="shrink-0">
                      <Zap className="w-4 h-4 mr-2" />
                      Disburse Same-Day
                    </Button>
                    <Button variant="outline" size="lg" onClick={() => setShowDrawForm(false)}>
                      Cancel
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Stat Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-4"
          >
            <StatCard
              title="Inventory Value"
              value={formatCurrency(DEMO_DATA.inventoryValue)}
              subtitle="FBA + FBM combined"
              icon={Package}
              trend={{ direction: 'up', value: '+8.3%' }}
              color="blue"
            />
            <StatCard
              title="Sell-Through Rate"
              value={formatPercent(DEMO_DATA.sellThroughRate)}
              subtitle="30-day rolling"
              icon={Activity}
              trend={{ direction: 'up', value: '+2.1%' }}
              color="green"
            />
            <StatCard
              title="Seller Rating"
              value={formatPercent(DEMO_DATA.sellerRating)}
              subtitle="Account health score"
              icon={CheckCircle2}
              color="violet"
            />
            <StatCard
              title="Pending Settlement"
              value={formatCurrency(DEMO_DATA.pendingSettlement)}
              subtitle="Next Amazon payout"
              icon={Clock}
              color="amber"
            />
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Inventory Breakdown */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-2"
            >
              <Card className="glass h-full">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <Package className="w-5 h-5 text-primary" />
                      Inventory Breakdown
                    </span>
                    <Badge>{formatCurrency(DEMO_DATA.inventoryValue)}</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {inventory.map((item, i) => (
                      <motion.div
                        key={item.name}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 + i * 0.05 }}
                      >
                        <div className="flex items-center justify-between text-sm mb-1.5">
                          <span className="text-foreground font-medium">{item.name}</span>
                          <div className="flex items-center gap-3">
                            <span className="text-muted-foreground text-xs">{item.units.toLocaleString()} units</span>
                            <span className="text-foreground font-semibold">{formatCurrency(item.value)}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Progress value={item.pct} className="flex-1 h-1.5" />
                          <span className="text-xs text-muted-foreground w-10 text-right">{formatPercent(item.pct)}</span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Alerts */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
            >
              <Card className="glass h-full">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bell className="w-5 h-5 text-primary" />
                    Alerts
                    <Badge variant="warning" className="ml-auto">1 Warning</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {alerts.map((alert, i) => (
                      <div
                        key={i}
                        className={`flex gap-3 p-3 rounded-lg text-sm ${
                          alert.severity === 'warning'
                            ? 'bg-amber-500/10 border border-amber-500/20'
                            : alert.severity === 'success'
                            ? 'bg-emerald-500/10 border border-emerald-500/20'
                            : 'bg-blue-500/10 border border-blue-500/20'
                        }`}
                      >
                        {alert.severity === 'warning' ? (
                          <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                        ) : alert.severity === 'success' ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        ) : (
                          <Bell className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                        )}
                        <div>
                          <p className="text-foreground/90 leading-snug">{alert.message}</p>
                          <p className="text-xs text-muted-foreground mt-1">{alert.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="glass">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <Activity className="w-5 h-5 text-primary" />
                    Recent Activity
                  </span>
                  <Button variant="ghost" size="sm" className="text-xs text-muted-foreground">
                    View All <ChevronRight className="w-3 h-3 ml-1" />
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-0">
                  {recentActivity.map((item, i) => (
                    <div key={i}>
                      <div className="flex items-center justify-between py-3">
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                              item.amount > 0
                                ? 'bg-blue-500/20 text-blue-400'
                                : 'bg-emerald-500/20 text-emerald-400'
                            }`}
                          >
                            {item.amount > 0 ? (
                              <ArrowUpRight className="w-4 h-4" />
                            ) : (
                              <ArrowDownRight className="w-4 h-4" />
                            )}
                          </div>
                          <div>
                            <div className="text-sm font-medium text-foreground">{item.label}</div>
                            <div className="text-xs text-muted-foreground">{item.date}</div>
                          </div>
                        </div>
                        <div
                          className={`text-sm font-semibold ${
                            item.amount > 0 ? 'text-blue-400' : 'text-emerald-400'
                          }`}
                        >
                          {item.amount > 0 ? '+' : ''}
                          {formatCurrency(Math.abs(item.amount))}
                        </div>
                      </div>
                      {i < recentActivity.length - 1 && <Separator />}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

// Needed for the draw form
function Zap({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  )
}
