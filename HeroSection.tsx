import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Zap, Target } from "lucide-react";


const HeroSection = () => {
  const features = [
    { icon: Sparkles, text: "AI-Powered" },
    { icon: Zap, text: "Instant Generation" },
    { icon: Target, text: "Smart Learning" },
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-background via-background to-muted/30">
      {/* Floating background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '-3s' }} />
      </div>

      <div className="container-main relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh] py-20">
          {/* Content */}
          <div className="space-y-8 animate-fade-up">
            {/* Badge */}
            <div className="inline-flex items-center space-x-2 bg-gradient-primary text-primary-foreground px-4 py-2 rounded-full text-sm font-medium">
              <Sparkles className="h-4 w-4" />
              <span>Powered by Advanced AI</span>
            </div>

            {/* Headline */}
            <div className="space-y-4">
              <h1 className="text-hero text-gradient">
                Transform Your Study
                <br />
                Experience with AI
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed max-w-lg">
                Generate smart notes, create flashcards, and master any subject with our AI-powered study assistant. Study smarter, not harder.
              </p>
            </div>

            {/* Features */}
            <div className="flex flex-wrap items-center gap-6">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div key={index} className="flex items-center space-x-2 text-muted-foreground">
                    <div className="p-1 bg-primary/10 rounded-md">
                      <Icon className="h-4 w-4 text-primary" />
                    </div>
                    <span className="text-sm font-medium">{feature.text}</span>
                  </div>
                );
              })}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="btn-hero group">
                Start Studying Now
                <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="outline" size="lg">
                See How It Works
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-8 border-t border-border">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">10K+</div>
                <div className="text-sm text-muted-foreground">Students</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">500K+</div>
                <div className="text-sm text-muted-foreground">Notes Generated</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">95%</div>
                <div className="text-sm text-muted-foreground">Success Rate</div>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative lg:ml-8">
            <div className="relative">
              <img
          
                alt="StudyPack AI Platform"
                className="w-full h-auto rounded-2xl shadow-elevation"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-secondary/20 rounded-2xl" />
            </div>
            
            {/* Floating cards */}
            <div className="absolute -top-6 -left-6 card-glass p-4 rounded-xl animate-float">
              <div className="text-sm font-medium text-primary">✨ Smart Notes</div>
              <div className="text-xs text-muted-foreground">AI-generated summaries</div>
            </div>
            
            <div className="absolute -bottom-6 -right-6 card-glass p-4 rounded-xl animate-float" style={{ animationDelay: '-2s' }}>
              <div className="text-sm font-medium text-secondary">🧠 Quiz Mode</div>
              <div className="text-xs text-muted-foreground">Adaptive learning</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;