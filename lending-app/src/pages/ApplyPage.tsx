import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { TrendingUp, ArrowLeft, ArrowRight, CheckCircle2, Loader2, Eye, EyeOff } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useAuth } from '@/context/AuthContext'

type Step = 'pre-qual' | 'account' | 'confirm'

const GMV_RANGES = [
  '$250K – $1M',
  '$1M – $5M',
  '$5M – $15M',
  '$15M – $50M',
  '$50M+',
]

const CATEGORIES = [
  'Electronics', 'Home & Kitchen', 'Sporting Goods', 'Health & Beauty',
  'Books & Media', 'Clothing & Apparel', 'Toys & Games', 'Automotive', 'Other',
]

export function ApplyPage() {
  const { signUp } = useAuth()
  const navigate = useNavigate()

  const [step, setStep] = useState<Step>('pre-qual')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const [formData, setFormData] = useState({
    sellerName: '',
    gmvRange: '',
    category: '',
    sellerAge: '',
    fullName: '',
    email: '',
    password: '',
    companyName: '',
    amazonSellerId: '',
    ein: '',
  })

  const update = (field: string, value: string) =>
    setFormData((prev) => ({ ...prev, [field]: value }))

  const preQualComplete =
    formData.sellerName && formData.gmvRange && formData.category && formData.sellerAge

  const accountComplete =
    formData.fullName && formData.email && formData.password && formData.companyName

  const handleSubmit = async () => {
    setLoading(true)
    setError('')
    const { error } = await signUp(formData.email, formData.password, formData.fullName)
    setLoading(false)
    if (error) {
      setError(error.message)
    } else {
      navigate('/dashboard')
    }
  }

  const steps = [
    { id: 'pre-qual', label: 'Pre-Qualification', num: 1 },
    { id: 'account', label: 'Create Account', num: 2 },
    { id: 'confirm', label: 'Confirm & Apply', num: 3 },
  ]

  return (
    <div className="min-h-screen bg-background py-16 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
          <Button variant="ghost" size="sm" asChild className="mb-6 -ml-2">
            <Link to="/">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to home
            </Link>
          </Button>

          <div className="flex items-center gap-2 mb-6">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
              <TrendingUp className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-lg">
              Dynamic<span className="text-gradient">Lend</span>
            </span>
          </div>

          <Badge className="mb-3">No credit impact · 2-minute pre-qual</Badge>
          <h1 className="text-3xl font-bold text-foreground mb-2">Check Your Credit Eligibility</h1>
          <p className="text-muted-foreground">
            Tell us about your Amazon store and we'll give you an estimated credit line — instantly.
          </p>
        </motion.div>

        {/* Progress Steps */}
        <div className="flex items-center gap-2 mb-8">
          {steps.map((s, i) => (
            <div key={s.id} className="flex items-center gap-2 flex-1">
              <div
                className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                  step === s.id
                    ? 'bg-primary text-primary-foreground'
                    : steps.findIndex((x) => x.id === step) > i
                    ? 'bg-emerald-500 text-white'
                    : 'bg-muted text-muted-foreground'
                }`}
              >
                {steps.findIndex((x) => x.id === step) > i ? (
                  <CheckCircle2 className="w-4 h-4" />
                ) : (
                  s.num
                )}
              </div>
              <span className={`text-xs hidden sm:block ${step === s.id ? 'text-foreground font-medium' : 'text-muted-foreground'}`}>
                {s.label}
              </span>
              {i < steps.length - 1 && (
                <div className={`flex-1 h-px mx-2 ${steps.findIndex((x) => x.id === step) > i ? 'bg-primary' : 'bg-border'}`} />
              )}
            </div>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {step === 'pre-qual' && (
            <motion.div
              key="pre-qual"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <Card className="glass border-border/50">
                <CardContent className="p-8 space-y-6">
                  <div>
                    <h2 className="text-xl font-semibold text-foreground mb-1">About Your Store</h2>
                    <p className="text-sm text-muted-foreground">Help us understand your Amazon business</p>
                  </div>

                  <div className="space-y-2">
                    <Label>Amazon Store Name or Seller URL</Label>
                    <Input
                      placeholder="e.g. My Brand Store or seller-id"
                      value={formData.sellerName}
                      onChange={(e) => update('sellerName', e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Annual GMV Range</Label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {GMV_RANGES.map((range) => (
                        <button
                          key={range}
                          type="button"
                          onClick={() => update('gmvRange', range)}
                          className={`px-3 py-2.5 rounded-lg text-sm border transition-all text-left ${
                            formData.gmvRange === range
                              ? 'border-primary bg-primary/10 text-primary font-medium'
                              : 'border-border text-muted-foreground hover:border-primary/50 hover:text-foreground'
                          }`}
                        >
                          {range}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Primary Category</Label>
                    <div className="flex flex-wrap gap-2">
                      {CATEGORIES.map((cat) => (
                        <button
                          key={cat}
                          type="button"
                          onClick={() => update('category', cat)}
                          className={`px-3 py-1.5 rounded-full text-xs border transition-all ${
                            formData.category === cat
                              ? 'border-primary bg-primary/10 text-primary font-medium'
                              : 'border-border text-muted-foreground hover:border-primary/50'
                          }`}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Years Selling on Amazon</Label>
                    <div className="flex gap-2">
                      {['< 1 year', '1–2 years', '2–5 years', '5+ years'].map((y) => (
                        <button
                          key={y}
                          type="button"
                          onClick={() => update('sellerAge', y)}
                          className={`flex-1 px-2 py-2.5 rounded-lg text-xs border transition-all ${
                            formData.sellerAge === y
                              ? 'border-primary bg-primary/10 text-primary font-medium'
                              : 'border-border text-muted-foreground hover:border-primary/50'
                          }`}
                        >
                          {y}
                        </button>
                      ))}
                    </div>
                  </div>

                  <Button
                    variant="gradient"
                    size="lg"
                    className="w-full"
                    disabled={!preQualComplete}
                    onClick={() => setStep('account')}
                  >
                    See My Estimated Credit Line
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {step === 'account' && (
            <motion.div
              key="account"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              {/* Estimated line teaser */}
              <Card className="glass border-primary/20 mb-6 bg-primary/5">
                <CardContent className="p-6 flex items-center justify-between">
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">Estimated Credit Line</div>
                    <div className="text-3xl font-bold text-gradient">
                      {formData.gmvRange === '$1M – $5M'
                        ? '$250K – $1.2M'
                        : formData.gmvRange === '$5M – $15M'
                        ? '$1M – $3.5M'
                        : formData.gmvRange === '$15M – $50M'
                        ? '$3M – $8M'
                        : '$50K – $250K'}
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      Subject to Amazon data verification
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge variant="success">Pre-qualified</Badge>
                    <div className="text-xs text-muted-foreground mt-2">No credit impact</div>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass border-border/50">
                <CardContent className="p-8 space-y-6">
                  <div>
                    <h2 className="text-xl font-semibold text-foreground mb-1">Create Your Account</h2>
                    <p className="text-sm text-muted-foreground">
                      Already have one?{' '}
                      <Link to="/signin" className="text-primary hover:underline">
                        Sign in
                      </Link>
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2 col-span-2 sm:col-span-1">
                      <Label>Full Name</Label>
                      <Input
                        placeholder="Jane Smith"
                        value={formData.fullName}
                        onChange={(e) => update('fullName', e.target.value)}
                      />
                    </div>
                    <div className="space-y-2 col-span-2 sm:col-span-1">
                      <Label>Company Name</Label>
                      <Input
                        placeholder="Acme Resellers LLC"
                        value={formData.companyName}
                        onChange={(e) => update('companyName', e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Email Address</Label>
                    <Input
                      type="email"
                      placeholder="you@company.com"
                      value={formData.email}
                      onChange={(e) => update('email', e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Password</Label>
                    <div className="relative">
                      <Input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Min. 8 characters"
                        value={formData.password}
                        onChange={(e) => update('password', e.target.value)}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Button variant="outline" size="lg" onClick={() => setStep('pre-qual')} className="flex-1">
                      <ArrowLeft className="w-4 h-4 mr-1" />
                      Back
                    </Button>
                    <Button
                      variant="gradient"
                      size="lg"
                      className="flex-1"
                      disabled={!accountComplete}
                      onClick={() => setStep('confirm')}
                    >
                      Continue
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {step === 'confirm' && (
            <motion.div
              key="confirm"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <Card className="glass border-border/50">
                <CardContent className="p-8 space-y-6">
                  <div>
                    <h2 className="text-xl font-semibold text-foreground mb-1">Confirm & Submit Application</h2>
                    <p className="text-sm text-muted-foreground">Review your details before we begin underwriting</p>
                  </div>

                  <div className="rounded-lg border border-border/50 divide-y divide-border/50">
                    {[
                      { label: 'Store / Name', value: formData.sellerName },
                      { label: 'Annual GMV', value: formData.gmvRange },
                      { label: 'Category', value: formData.category },
                      { label: 'Seller Tenure', value: formData.sellerAge },
                      { label: 'Contact', value: formData.email },
                      { label: 'Company', value: formData.companyName },
                    ].map(({ label, value }) => (
                      <div key={label} className="flex justify-between px-4 py-3">
                        <span className="text-sm text-muted-foreground">{label}</span>
                        <span className="text-sm text-foreground font-medium">{value}</span>
                      </div>
                    ))}
                  </div>

                  <div className="rounded-lg bg-blue-500/10 border border-blue-500/20 p-4">
                    <p className="text-sm text-blue-300">
                      By submitting, you authorize DynamicLend to pull your Amazon Seller Central data
                      via SP-API (read-only) to complete underwriting. This does <strong>not</strong> impact
                      your personal credit score.
                    </p>
                  </div>

                  {error && (
                    <div className="text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-lg px-4 py-3">
                      {error}
                    </div>
                  )}

                  <div className="flex gap-3">
                    <Button variant="outline" size="lg" onClick={() => setStep('account')} className="flex-1" disabled={loading}>
                      <ArrowLeft className="w-4 h-4 mr-1" />
                      Back
                    </Button>
                    <Button
                      variant="gradient"
                      size="lg"
                      className="flex-1"
                      onClick={handleSubmit}
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Creating Account…
                        </>
                      ) : (
                        <>
                          Submit Application
                          <ArrowRight className="w-4 h-4 ml-1" />
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        <p className="text-center text-xs text-muted-foreground mt-6">
          Bank-level security · Read-only Amazon access · FDIC regulated
        </p>
      </div>
    </div>
  )
}
