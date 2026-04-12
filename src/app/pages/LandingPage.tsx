import { Link } from 'react-router';
import { Sparkles, Camera, FileText, Target, TrendingUp, Shield, Zap, ArrowRight, Star, CheckCircle2 } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { motion } from 'motion/react';

export function LandingPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#fdfbf8] via-[#f5e9e4] to-[#ffd4d4]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              <div className="inline-flex items-center gap-2 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full border border-border">
                <Sparkles className="w-4 h-4 text-primary" />
                <span className="text-sm">AI-Powered Skincare Technology</span>
              </div>
              
              <h1 className="text-4xl md:text-6xl leading-tight">
                AI-Powered Personalized Skincare Analysis
              </h1>
              
              <p className="text-lg text-muted-foreground">
                Discover your unique skin profile through our advanced AI questionnaire and image-based analysis. 
                Get personalized skincare routines tailored specifically for you.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/assessment">
                  <Button size="lg" className="bg-primary hover:bg-primary/90 px-8">
                    <FileText className="w-5 h-5 mr-2" />
                    Start Skin Assessment
                  </Button>
                </Link>
                <Link to="/upload">
                  <Button size="lg" variant="outline" className="px-8">
                    <Camera className="w-5 h-5 mr-2" />
                    Upload Skin Image
                  </Button>
                </Link>
              </div>

              <div className="flex items-center justify-center gap-8 pt-4">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-primary" />
                  <span className="text-sm">Free Analysis</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-primary" />
                  <span className="text-sm">Instant Results</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-primary" />
                  <span className="text-sm">Privacy Focused</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl mb-4">Comprehensive Skincare Analysis</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our AI-powered platform provides detailed insights into your skin's unique needs
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="border-border hover:shadow-lg transition-shadow">
              <CardContent className="p-6 space-y-4">
                <div className="w-12 h-12 rounded-xl bg-[#8b9a8d]/10 flex items-center justify-center">
                  <Target className="w-6 h-6 text-primary" />
                </div>
                <h3>Skin Type Detection</h3>
                <p className="text-sm text-muted-foreground">
                  Accurately identify whether your skin is oily, dry, combination, or sensitive using advanced AI algorithms.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border hover:shadow-lg transition-shadow">
              <CardContent className="p-6 space-y-4">
                <div className="w-12 h-12 rounded-xl bg-[#ffd4d4]/20 flex items-center justify-center">
                  <Camera className="w-6 h-6 text-accent-foreground" />
                </div>
                <h3>Image-Based Analysis</h3>
                <p className="text-sm text-muted-foreground">
                  Upload photos to detect skin concerns like acne, pigmentation, wrinkles, and texture issues.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border hover:shadow-lg transition-shadow">
              <CardContent className="p-6 space-y-4">
                <div className="w-12 h-12 rounded-xl bg-[#a8c4a8]/20 flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-primary" />
                </div>
                <h3>Personalized Routine</h3>
                <p className="text-sm text-muted-foreground">
                  Get customized morning and night skincare routines with product type recommendations.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border hover:shadow-lg transition-shadow">
              <CardContent className="p-6 space-y-4">
                <div className="w-12 h-12 rounded-xl bg-[#f5e9e4] flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-secondary-foreground" />
                </div>
                <h3>Progress Tracking</h3>
                <p className="text-sm text-muted-foreground">
                  Monitor your skin's improvement over time with detailed history and comparison features.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-gradient-to-br from-[#fdfbf8] to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl mb-4">How It Works</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Three simple steps to discover your personalized skincare routine
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="relative">
              <Card className="border-border h-full">
                <CardContent className="p-8 space-y-4">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#8b9a8d] to-[#a8c4a8] flex items-center justify-center text-white text-2xl font-bold">
                    1
                  </div>
                  <h3>Complete Questionnaire</h3>
                  <p className="text-sm text-muted-foreground">
                    Answer a few simple questions about your skin type, concerns, and daily habits to help our AI understand your needs.
                  </p>
                  <Link to="/assessment" className="inline-flex items-center text-sm text-primary hover:underline">
                    Start Assessment <ArrowRight className="w-4 h-4 ml-1" />
                  </Link>
                </CardContent>
              </Card>
              <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                <ArrowRight className="w-8 h-8 text-primary/30" />
              </div>
            </div>

            <div className="relative">
              <Card className="border-border h-full">
                <CardContent className="p-8 space-y-4">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#ffd4d4] to-[#f5c5c5] flex items-center justify-center text-white text-2xl font-bold">
                    2
                  </div>
                  <h3>Upload Skin Image</h3>
                  <p className="text-sm text-muted-foreground">
                    Take a clear photo of your face in natural lighting and upload it for AI-powered visual analysis.
                  </p>
                  <Link to="/upload" className="inline-flex items-center text-sm text-primary hover:underline">
                    Upload Image <ArrowRight className="w-4 h-4 ml-1" />
                  </Link>
                </CardContent>
              </Card>
              <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                <ArrowRight className="w-8 h-8 text-primary/30" />
              </div>
            </div>

            <div>
              <Card className="border-border h-full">
                <CardContent className="p-8 space-y-4">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#a8c4a8] to-[#8b9a8d] flex items-center justify-center text-white text-2xl font-bold">
                    3
                  </div>
                  <h3>Get Your Routine</h3>
                  <p className="text-sm text-muted-foreground">
                    Receive a personalized skincare routine with detailed product recommendations tailored to your skin's unique needs.
                  </p>
                  <Link to="/dashboard" className="inline-flex items-center text-sm text-primary hover:underline">
                    View Dashboard <ArrowRight className="w-4 h-4 ml-1" />
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl">Why Choose DermaAI?</h2>
              <p className="text-lg text-muted-foreground">
                Our platform combines cutting-edge AI technology with dermatological expertise to provide you with the most accurate and personalized skincare recommendations.
              </p>
              
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Shield className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4>Privacy & Security</h4>
                    <p className="text-sm text-muted-foreground">Your data is encrypted and never shared with third parties</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Zap className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4>Instant Results</h4>
                    <p className="text-sm text-muted-foreground">Get your personalized analysis in seconds, not days</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Sparkles className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4>AI-Powered Accuracy</h4>
                    <p className="text-sm text-muted-foreground">Advanced algorithms trained on thousands of skin types</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <Card className="border-border p-8">
                <div className="space-y-6">
                  <div className="flex items-center gap-4 p-4 bg-[#f5e9e4] rounded-xl">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#8b9a8d] to-[#a8c4a8] flex items-center justify-center text-white">
                      <CheckCircle2 className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium">98% Accuracy</div>
                      <div className="text-sm text-muted-foreground">Skin type detection</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 p-4 bg-[#ffd4d4]/20 rounded-xl">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#ffd4d4] to-[#f5c5c5] flex items-center justify-center text-white">
                      <CheckCircle2 className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium">50,000+</div>
                      <div className="text-sm text-muted-foreground">Happy users worldwide</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 p-4 bg-[#a8c4a8]/20 rounded-xl">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#a8c4a8] to-[#8b9a8d] flex items-center justify-center text-white">
                      <CheckCircle2 className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium">24/7 Support</div>
                      <div className="text-sm text-muted-foreground">AI chat assistant</div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-to-br from-[#fdfbf8] to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl mb-4">What Our Users Say</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Join thousands of happy users who have transformed their skincare routine
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <Card className="border-border">
              <CardContent className="p-6 space-y-4">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-[#ffd4d4] text-[#ffd4d4]" />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground">
                  "DermaAI completely changed my skincare routine! The personalized recommendations actually work for my sensitive skin."
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#8b9a8d] to-[#a8c4a8]"></div>
                  <div>
                    <div className="font-medium">Sarah Johnson</div>
                    <div className="text-xs text-muted-foreground">Verified User</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardContent className="p-6 space-y-4">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-[#ffd4d4] text-[#ffd4d4]" />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground">
                  "The image analysis feature is incredible! It detected issues I didn't even know I had and gave me exactly what I needed."
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#ffd4d4] to-[#f5c5c5]"></div>
                  <div>
                    <div className="font-medium">Emily Chen</div>
                    <div className="text-xs text-muted-foreground">Verified User</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardContent className="p-6 space-y-4">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-[#ffd4d4] text-[#ffd4d4]" />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground">
                  "Finally, a skincare tool that understands my combination skin! The AI recommendations are spot-on and easy to follow."
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#a8c4a8] to-[#8b9a8d]"></div>
                  <div>
                    <div className="font-medium">Michael Torres</div>
                    <div className="text-xs text-muted-foreground">Verified User</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-[#8b9a8d] to-[#a8c4a8] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <h2 className="text-3xl md:text-4xl">Ready to Transform Your Skincare Routine?</h2>
          <p className="text-lg text-white/90">
            Start your personalized skincare journey today with our AI-powered analysis
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/assessment">
              <Button size="lg" variant="secondary" className="px-8">
                <FileText className="w-5 h-5 mr-2" />
                Start Assessment Now
              </Button>
            </Link>
            <Link to="/upload">
              <Button size="lg" variant="outline" className="px-8 bg-white/10 border-white/20 text-white hover:bg-white/20">
                <Camera className="w-5 h-5 mr-2" />
                Upload Your Photo
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}