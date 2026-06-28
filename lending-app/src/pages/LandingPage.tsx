import { motion, type Variants } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  TrendingUp, Zap, Shield, BarChart3, RefreshCw, Bell, ArrowRight,
  CheckCircle2, DollarSign, Package, Activity, Clock, Star, ChevronRight
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { SplineScene } from '@/components/ui/splite'
import { Spotlight } from '@/components/ui/spotlight'

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: [0.25, 0.1, 0.25, 1] },
  }),
}

const features = [
  {
    icon: RefreshCw,
    title: 'Dynamic Borrowing Base',
    description: 'Refreshed daily using real-time Amazon inventory, sales velocity, and settlement data — not static appraisals.',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    icon: Zap,
    title: 'Same-Day Funding',
    description: 'API-driven draws tied directly to your borrowing base. Apply in minutes, funds in your account today.',
    color: 'from-cyan-500 to-emerald-500',
  },
  {
    icon: Activity,
    title: 'Real-Time Risk Monitoring',
    description: 'Continuous surveillance of account health, inventory aging, and sales velocity — with proactive alerts.',
    color: 'from-emerald-500 to-teal-500',
  },
  {
    icon: BarChart3,
    title: 'AI-Powered Underwriting',
    description: 'ML-driven risk scoring replaces tax returns. Your Amazon performance history is your credit profile.',
    color: 'from-violet-500 to-purple-500',
  },
  {
    icon: Shield,
    title: 'Bank-Grade Compliance',
    description: 'Full audit trail, explainable credit decisions, and compliance with SR 11-7 and Fair Lending principles.',
    color: 'from-rose-500 to-pink-500',
  },
  {
    icon: Bell,
    title: 'Auto-Repayment',
    description: 'Optional settlement sweep — repayments flow directly from Amazon payouts, zero friction.',
    color: 'from-amber-500 to-orange-500',
  },
]

const steps = [
  {
    step: '01',
    title: 'Connect Your Amazon Store',
    description: 'Grant read-only OAuth access to your Seller Central account. Takes 2 minutes.',
  },
  {
    step: '02',
    title: 'Instant Underwriting',
    description: 'Our engine analyzes 12–24 months of sales history, inventory, and performance metrics automatically.',
  },
  {
    step: '03',
    title: 'Review Your Offer',
    description: 'See your credit limit, advance rates, and pricing. Use scenario sliders to model different outcomes.',
  },
  {
    step: '04',
    title: 'Draw Funds Anytime',
    description: 'Access your revolving credit line on demand. Balance grows with your inventory.',
  },
]

const rates = [
  { label: 'FBA Inventory', rate: '60–75%', desc: 'Advance rate on sellable FBA stock' },
  { label: 'FBM Inventory', rate: '40–55%', desc: 'Advance rate on merchant-fulfilled stock' },
  { label: 'Amazon Receivables', rate: '80–90%', desc: 'Advance rate on pending settlements' },
  { label: 'In-Transit Inventory', rate: '30–40%', desc: 'Lower advance rate for unconfirmed stock' },
]

const testimonials = [
  {
    name: 'Sarah K.',
    role: 'Amazon FBA Seller · $3.2M GMV',
    quote: 'Got approved in 4 hours and drew $180K the same day. No bank ever moved this fast for my business.',
    rating: 5,
  },
  {
    name: 'Marcus T.',
    role: 'Multi-Category Reseller · $8.7M GMV',
    quote: 'The dynamic borrowing base is a game changer. My line actually increases during Q4 when I need it most.',
    rating: 5,
  },
  {
    name: 'Priya N.',
    role: 'Private Label + Wholesale · $1.9M GMV',
    quote: 'Auto-repayment from settlements means I never think about payments. It just works.',
    rating: 5,
  },
]

export function LandingPage() {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-16">
        <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-40" />
        <div className="absolute inset-0 bg-gradient-radial from-blue-900/20 via-transparent to-transparent" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <Card className="w-full min-h-[600px] bg-black/40 relative overflow-hidden border-border/50">
            <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="#3B82F6" />

            <div className="flex flex-col lg:flex-row h-full min-h-[600px]">
              {/* Left: Text content */}
              <div className="flex-1 p-8 lg:p-12 relative z-10 flex flex-col justify-center">
                <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={0}>
                  <Badge className="mb-6 text-xs font-semibold tracking-wider uppercase">
                    Amazon Reseller ABL Platform
                  </Badge>
                </motion.div>

                <motion.h1
                  initial="hidden"
                  animate="visible"
                  variants={fadeUp}
                  custom={1}
                  className="text-4xl lg:text-6xl font-bold leading-tight mb-6"
                >
                  <span className="text-gradient-blue">Working Capital</span>
                  <br />
                  <span className="text-gradient">That Moves</span>
                  <br />
                  <span className="text-gradient-blue">With Your Inventory</span>
                </motion.h1>

                <motion.p
                  initial="hidden"
                  animate="visible"
                  variants={fadeUp}
                  custom={2}
                  className="text-lg text-muted-foreground max-w-xl mb-8 leading-relaxed"
                >
                  Revolving credit lines for Amazon sellers — dynamically underwritten
                  using real-time SP-API data. No tax returns. No manual audits.
                  Decision in minutes, funds same day.
                </motion.p>

                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={fadeUp}
                  custom={3}
                  className="flex flex-col sm:flex-row gap-4 mb-8"
                >
                  <Button variant="gradient" size="xl" asChild>
                    <Link to="/apply">
                      Check My Eligibility
                      <ArrowRight className="w-5 h-5 ml-1" />
                    </Link>
                  </Button>
                  <Button
                    variant="outline"
                    size="xl"
                    onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })}
                  >
                    See How It Works
                  </Button>
                </motion.div>

                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={fadeUp}
                  custom={4}
                  className="flex flex-wrap gap-4"
                >
                  {['No impact on credit score', 'Decision in 2–5 min', 'Lines up to $5M'].map((item) => (
                    <div key={item} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      {item}
                    </div>
                  ))}
                </motion.div>
              </div>

              {/* Right: 3D Spline scene */}
              <div className="flex-1 relative min-h-[300px] lg:min-h-full">
                <SplineScene
                  scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
                  className="w-full h-full"
                />
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="border-y border-border/50 bg-card/50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { label: 'Average Credit Line', value: '$850K', icon: DollarSign },
              { label: 'Time to Decision', value: '< 5 min', icon: Clock },
              { label: 'Amazon Sellers Funded', value: '2,400+', icon: Package },
              { label: 'Total Volume Deployed', value: '$1.2B', icon: TrendingUp },
            ].map(({ label, value, icon: Icon }) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="flex flex-col items-center lg:items-start gap-1"
              >
                <div className="flex items-center gap-2 text-muted-foreground text-sm">
                  <Icon className="w-4 h-4 text-primary" />
                  {label}
                </div>
                <div className="text-3xl font-bold text-gradient">{value}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Badge className="mb-4">Platform Capabilities</Badge>
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Built for Amazon Sellers,{' '}
              <span className="text-gradient">Not Traditional Borrowers</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Traditional inventory financing doesn't work for e-commerce. We rebuilt it from scratch
              using your actual Amazon data as the foundation.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="h-full glass hover:border-primary/30 transition-all duration-300 group hover:glow-blue">
                  <CardContent className="p-6">
                    <div
                      className={`w-10 h-10 rounded-lg bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                    >
                      <feature.icon className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="font-semibold text-foreground mb-2 text-lg">{feature.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-24 bg-card/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Badge className="mb-4">Borrower Journey</Badge>
            <h2 className="text-4xl font-bold text-foreground mb-4">
              From Discovery to <span className="text-gradient">Funded in Hours</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our digital-first process eliminates weeks of paperwork. Connect your store and get
              a real credit decision based on real data.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, i) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="relative"
              >
                {i < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-6 left-[calc(100%-12px)] w-full h-px bg-gradient-to-r from-primary/50 to-transparent z-10" />
                )}
                <div className="flex flex-col gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-primary/30 flex items-center justify-center">
                    <span className="text-primary font-bold text-sm">{step.step}</span>
                  </div>
                  <h3 className="font-semibold text-foreground text-lg">{step.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Advance Rates */}
      <section id="rates" className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Badge className="mb-4">Advance Rates</Badge>
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Transparent Pricing,{' '}
              <span className="text-gradient">Zero Surprises</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {rates.map((rate, i) => (
              <motion.div
                key={rate.label}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="glass text-center p-6 h-full hover:border-primary/30 transition-all group">
                  <CardContent className="p-0">
                    <div className="text-4xl font-bold text-gradient mb-2 group-hover:scale-110 transition-transform inline-block">
                      {rate.rate}
                    </div>
                    <div className="font-semibold text-foreground mb-1">{rate.label}</div>
                    <div className="text-sm text-muted-foreground">{rate.desc}</div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-8 text-sm text-muted-foreground"
          >
            Rates are illustrative. Final advance rates set by credit decision engine based on ASIN
            concentration, sell-through velocity, and account health.
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-card/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Badge className="mb-4">Seller Stories</Badge>
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Trusted by Sellers at <span className="text-gradient">Every Scale</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
              >
                <Card className="glass h-full hover:border-primary/20 transition-all">
                  <CardContent className="p-6">
                    <div className="flex gap-1 mb-4">
                      {Array.from({ length: t.rating }).map((_, j) => (
                        <Star key={j} className="w-4 h-4 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <p className="text-foreground/90 mb-6 leading-relaxed italic">
                      "{t.quote}"
                    </p>
                    <div>
                      <div className="font-semibold text-foreground">{t.name}</div>
                      <div className="text-sm text-muted-foreground">{t.role}</div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-radial from-blue-900/30 via-transparent to-transparent" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Badge className="mb-6">Get Started Today</Badge>
            <h2 className="text-5xl font-bold text-foreground mb-6">
              Ready to Scale Your <span className="text-gradient">Amazon Business?</span>
            </h2>
            <p className="text-muted-foreground text-xl mb-10 max-w-2xl mx-auto">
              See your estimated credit line in 2 minutes. No credit impact, no commitment,
              no paperwork.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="gradient" size="xl" asChild>
                <Link to="/apply">
                  Check My Credit Eligibility
                  <ChevronRight className="w-5 h-5" />
                </Link>
              </Button>
              <Button variant="outline" size="xl" asChild>
                <Link to="/signin">Sign In to Dashboard</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                <TrendingUp className="w-3.5 h-3.5 text-white" />
              </div>
              <span className="font-bold text-foreground">
                Dynamic<span className="text-gradient">Lend</span>
              </span>
            </div>
            <div className="text-sm text-muted-foreground">
              © 2026 DynamicLend. Asset-based lending for Amazon marketplace sellers.
            </div>
            <div className="flex gap-6 text-sm text-muted-foreground">
              <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
              <a href="#" className="hover:text-foreground transition-colors">Terms</a>
              <a href="#" className="hover:text-foreground transition-colors">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
