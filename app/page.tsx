import Link from 'next/link'
import { ArrowRight, Sparkles, TrendingUp, Zap } from 'lucide-react'
import { Button } from '@/components/ui/button'
import DemoCarousel from '@/components/demo-carousel'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-background">
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

            {/* Right Illustration - Dashboard Preview */}
            <div className="relative h-96 md:h-full min-h-96 bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl border border-emerald-200 shadow-2xl overflow-hidden p-5">
              {/* Decorative blur elements */}
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-emerald-200 rounded-full blur-3xl opacity-20" />
              <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-green-200 rounded-full blur-3xl opacity-20" />

              <div className="relative z-10 space-y-4 h-full flex flex-col">
                {/* Header */}
                <div className="flex items-center justify-between pb-3 border-b border-slate-300">
                  <div className="space-y-1">
                    <p className="text-xs font-bold text-emerald-600 uppercase">Welcome back</p>
                    <p className="text-sm font-bold text-slate-900">Your Dashboard</p>
                  </div>
                  <div className="w-8 h-8 bg-emerald-600 rounded-full" />
                </div>

                {/* Progress Summary */}
                <div className="bg-white rounded-xl p-3 border border-emerald-100 shadow-sm">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-xs font-semibold text-slate-900">Overall Progress</p>
                    <span className="text-xs font-bold text-emerald-600">64%</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                    <div className="h-full w-[64%] bg-gradient-to-r from-emerald-500 to-green-500 rounded-full" />
                  </div>
                </div>

                {/* Cards Grid */}
                <div className="grid grid-cols-2 gap-2 flex-1">
                  {/* Quiz Card */}
                  <div className="bg-gradient-to-br from-green-600 to-green-280 rounded-lg p-3 text-white shadow-md hover:shadow-lg transition transform hover:scale-105">
                    <div className="flex items-start justify-between mb-2">
                      <div className="w-8 h-8 bg-white/20 rounded-lg" />
                      <span className="text-xs bg-white/30 px-2 py-1 rounded-full">✓</span>
                    </div>
                    <p className="text-xs font-bold">Career Quiz</p>
                    <p className="text-xs opacity-90">10 questions</p>
                  </div>

                  {/* Resume Card */}
                  <div className="bg-gradient-to-br from-green-600 to-green-280 rounded-lg p-3 text-white shadow-md hover:shadow-lg transition transform hover:scale-105">
                    <div className="flex items-start justify-between mb-2">
                      <div className="w-8 h-8 bg-white/20 rounded-lg" />
                      <span className="text-xs bg-white/30 px-2 py-1 rounded-full">78%</span>
                    </div>
                    <p className="text-xs font-bold">Resume Review</p>
                    <p className="text-xs opacity-90">AI analyzed</p>
                  </div>

                  {/* LinkedIn Card */}
                  <div className="bg-gradient-to-br from-green-600 to-green-280 rounded-lg p-3 text-white shadow-md hover:shadow-lg transition transform hover:scale-105">
                    <div className="flex items-start justify-between mb-2">
                      <div className="w-8 h-8 bg-white/20 rounded-lg" />
                      <span className="text-xs bg-white/30 px-2 py-1 rounded-full">✓</span>
                    </div>
                    <p className="text-xs font-bold">LinkedIn Review</p>
                    <p className="text-xs opacity-90">Profile analyzed</p>
                  </div>

                  {/* Roadmap Card */}
                  <div className="bg-gradient-to-br from-green-600 to-green-280 rounded-lg p-3 text-white shadow-md hover:shadow-lg transition transform hover:scale-105">
                    <div className="flex items-start justify-between mb-2">
                      <div className="w-8 h-8 bg-white/20 rounded-lg" />
                      <span className="text-xs bg-white/30 px-2 py-1 rounded-full">45%</span>
                    </div>
                    <p className="text-xs font-bold">Career Roadmap</p>
                    <p className="text-xs opacity-90">In progress</p>
                  </div>
                </div>

                {/* Recommendations */}
                <div className="bg-white rounded-xl p-3 border border-emerald-100 shadow-sm">
                  <p className="text-xs font-bold text-slate-900 mb-2">💡 AI Recommendation</p>
                  <p className="text-xs text-slate-600 leading-tight">
                    Strong match for Product Manager roles. Focus on leadership skills.
                  </p>
                </div>
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
                  { title: "AI-Powered Career Intelligence", desc: "Discover opportunities perfectly aligned with your unique strengths and passion" },
                  { title: "Your Step-by-Step Blueprint", desc: "Clear milestones from where you are to where you want to be—no guesswork" },
                  { title: "Accelerated Learning Paths", desc: "Curated resources and skills from industry leaders to fast-track your growth" },
                  { title: "Your Support Network", desc: "Connect with mentors and peers navigating similar transformative career moves" }
                ].map((benefit, idx) => (
                  <div key={idx} className="flex gap-4">
                    <div className="w-12 h-12 rounded-lg bg-emerald-100 flex items-center justify-center flex-shrink-0">
                      <Zap className="w-6 h-6 text-emerald-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg text-foreground">{benefit.title}</h3>
                      <p className="text-foreground/70">{benefit.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex items-center justify-center">
              <DemoCarousel />
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
