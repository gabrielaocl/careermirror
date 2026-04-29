import Link from 'next/link'
import { ArrowRight, Sparkles, TrendingUp, Zap } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-background">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold text-primary">CareerMirror</h1>
          </div>
          <div className="hidden md:flex gap-8">
            <a href="#features" className="text-foreground/70 hover:text-primary transition">Features</a>
            <a href="#how-it-works" className="text-foreground/70 hover:text-primary transition">How It Works</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="inline-block bg-secondary px-4 py-2 rounded-full border border-primary/20">
                  <span className="text-sm font-semibold text-primary"> Ready to Tansform Your Career?</span>
                </div>
                <h1 className="text-5xl md:text-6xl font-bold leading-tight">
                  Explore Your <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Perfect Career Pivot</span>
                </h1>
                <p className="text-xl text-foreground/70 leading-relaxed">
                  Not sure about your next career move? CareerMirror helps you discover your ideal career path through personalized insights and data-driven recommendations.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/quiz">
                  <Button size="lg" className="bg-primary hover:bg-primary/90 text-white rounded-xl text-base font-semibold w-full sm:w-auto">
                    Start Career Quiz <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
                <Button variant="outline" size="lg" className="rounded-xl border-2 border-primary text-primary hover:bg-secondary">
                  Learn More
                </Button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 pt-8 border-t border-border">
                <div>
                  <p className="text-3xl font-bold text-primary">10K+</p>
                  <p className="text-sm text-foreground/60">Career Paths</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-primary">95%</p>
                  <p className="text-sm text-foreground/60">Success Rate</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-primary">500+</p>
                  <p className="text-sm text-foreground/60">Transformations</p>
                </div>
              </div>
            </div>

            {/* Right Illustration */}
            <div className="relative h-96 md:h-full min-h-96 bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl border border-primary/20 flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="space-y-4 text-center">
                  <div className="w-24 h-24 bg-gradient-to-br from-primary to-accent rounded-2xl mx-auto flex items-center justify-center">
                    <TrendingUp className="w-12 h-12 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-primary">Your Career Journey Starts Here</h3>
                </div>
              </div>
              
              {/* Floating Cards */}
              <div className="absolute top-12 -left-6 bg-white rounded-xl p-4 shadow-lg border border-border rotate-12 w-32">
                <p className="text-sm font-semibold text-foreground">Personalized</p>
                <p className="text-xs text-foreground/60">Tailored for you</p>
              </div>
              <div className="absolute bottom-12 -right-6 bg-white rounded-xl p-4 shadow-lg border border-border -rotate-12 w-32">
                <p className="text-sm font-semibold text-foreground">Data-Driven</p>
                <p className="text-xs text-foreground/60">Smart insights</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">How CareerMirror Works</h2>
            <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
              A simple, 3-step process to discover your perfect career path
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Sparkles className="w-8 h-8" />,
                number: "01",
                title: "Take the Quiz",
                description: "Answer personalized questions about your skills, interests, and values to create your career profile."
              },
              {
                icon: <TrendingUp className="w-8 h-8" />,
                number: "02",
                title: "Upload Your Resume",
                description: "Share your experience and let our AI analyze your strengths and highlight your unique value."
              },
              {
                icon: <Zap className="w-8 h-8" />,
                number: "03",
                title: "Get Your Roadmap",
                description: "Receive a personalized career pivot roadmap with actionable steps and resources."
              }
            ].map((step, idx) => (
              <div key={idx} className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/0 to-accent/0 group-hover:from-primary/10 group-hover:to-accent/10 rounded-2xl transition-all duration-300" />
                <div className="relative bg-white rounded-2xl p-8 border border-border hover:border-primary/30 transition-all duration-300 shadow-sm hover:shadow-lg h-full">
                  <div className="text-primary mb-4">{step.icon}</div>
                  <p className="text-5xl font-bold text-primary/20 mb-4">{step.number}</p>
                  <h3 className="text-2xl font-bold mb-3 text-foreground">{step.title}</h3>
                  <p className="text-foreground/70 leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="how-it-works" className="py-20 bg-gradient-to-b from-secondary/30 to-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <h2 className="text-4xl font-bold">Why Choose CareerMirror?</h2>
              <div className="space-y-6">
                {[
                  { title: "Smart Matching", desc: "AI-powered matching of your skills with in-demand careers" },
                  { title: "Actionable Roadmap", desc: "Clear steps and timeline to achieve your career transition" },
                  { title: "Expert Resources", desc: "Curated learning paths and mentorship opportunities" },
                  { title: "Community Support", desc: "Connect with others on similar career journeys" }
                ].map((benefit, idx) => (
                  <div key={idx} className="flex gap-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Zap className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg text-foreground">{benefit.title}</h3>
                      <p className="text-foreground/70">{benefit.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-xl p-6 border border-primary/20 h-40 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-primary rounded-lg mx-auto mb-3" />
                    <p className="text-sm font-semibold text-foreground">Feature {i}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Transform Your Career?</h2>
          <p className="text-xl text-foreground/70 mb-8 max-w-2xl mx-auto">
            Join thousands of professionals discovering their perfect career path with CareerMirror.
          </p>
          <Link href="/quiz">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-white rounded-xl text-base font-semibold">
              Start Your Journey <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground/5 border-t border-border py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-foreground/60">
          <p>&copy; 2024 CareerMirror. Helping you discover your perfect career path.</p>
        </div>
      </footer>
    </div>
  )
}
