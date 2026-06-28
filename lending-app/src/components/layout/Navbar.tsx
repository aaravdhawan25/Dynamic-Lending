import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { TrendingUp, LogOut, LayoutDashboard, Menu, X } from 'lucide-react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/context/AuthContext'

export function Navbar() {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()
  const [mobileOpen, setMobileOpen] = useState(false)

  const handleSignOut = async () => {
    await signOut()
    navigate('/')
  }

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center group-hover:shadow-[0_0_15px_rgba(59,130,246,0.5)] transition-all">
              <TrendingUp className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-lg text-foreground">
              Dynamic<span className="text-gradient">Lend</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link to="/#how-it-works" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              How It Works
            </Link>
            <Link to="/#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Features
            </Link>
            <Link to="/#rates" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Rates
            </Link>
          </div>

          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <>
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/dashboard">
                    <LayoutDashboard className="w-4 h-4 mr-2" />
                    Dashboard
                  </Link>
                </Button>
                <Button variant="outline" size="sm" onClick={handleSignOut}>
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign Out
                </Button>
              </>
            ) : (
              <>
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/signin">Sign In</Link>
                </Button>
                <Button variant="gradient" size="sm" asChild>
                  <Link to="/apply">Apply Now</Link>
                </Button>
              </>
            )}
          </div>

          <button
            className="md:hidden text-muted-foreground hover:text-foreground"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-border bg-background/95 backdrop-blur-xl px-4 py-4 space-y-3">
          <Link to="/#how-it-works" className="block text-sm text-muted-foreground" onClick={() => setMobileOpen(false)}>How It Works</Link>
          <Link to="/#features" className="block text-sm text-muted-foreground" onClick={() => setMobileOpen(false)}>Features</Link>
          <Link to="/#rates" className="block text-sm text-muted-foreground" onClick={() => setMobileOpen(false)}>Rates</Link>
          <div className="flex flex-col gap-2 pt-2 border-t border-border">
            {user ? (
              <>
                <Button variant="ghost" size="sm" asChild><Link to="/dashboard" onClick={() => setMobileOpen(false)}>Dashboard</Link></Button>
                <Button variant="outline" size="sm" onClick={handleSignOut}>Sign Out</Button>
              </>
            ) : (
              <>
                <Button variant="ghost" size="sm" asChild><Link to="/signin" onClick={() => setMobileOpen(false)}>Sign In</Link></Button>
                <Button variant="gradient" size="sm" asChild><Link to="/apply" onClick={() => setMobileOpen(false)}>Apply Now</Link></Button>
              </>
            )}
          </div>
        </div>
      )}
    </motion.nav>
  )
}
