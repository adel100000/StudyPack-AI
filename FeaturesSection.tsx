import { 
  FileText, 
  CreditCard, 
  HelpCircle, 
  BarChart3, 
  Search, 
  Download,
  Upload,
  MessageSquare 
} from "lucide-react";

const FeaturesSection = () => {
  const features = [
    {
      icon: FileText,
      title: "Smart Notes Generator",
      description: "Transform messy notes into clean, organized study materials with AI-powered formatting and structure.",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: CreditCard,
      title: "Flashcard Creator",
      description: "Instantly generate interactive flashcards from any content for effective spaced repetition learning.",
      color: "from-teal-500 to-teal-600"
    },
    {
      icon: HelpCircle,
      title: "Adaptive Quiz Mode",
      description: "Take AI-generated quizzes that adapt to your knowledge level and track your progress over time.",
      color: "from-purple-500 to-purple-600"
    },
    {
      icon: BarChart3,
      title: "Study Analytics",
      description: "Get detailed insights into your study patterns, strengths, and areas that need improvement.",
      color: "from-green-500 to-green-600"
    },
    {
      icon: MessageSquare,
      title: "Topic Explainer",
      description: "Break down complex concepts into simple explanations with our 'Teach Me Like I'm 5' feature.",
      color: "from-orange-500 to-orange-600"
    },
    {
      icon: Upload,
      title: "Multi-Format Support",
      description: "Upload PDFs, DOCX, or text files to automatically extract and process study material.",
      color: "from-red-500 to-red-600"
    },
    {
      icon: Search,
      title: "Smart Search",
      description: "Find any information instantly with AI-powered search and contextual highlighting.",
      color: "from-indigo-500 to-indigo-600"
    },
    {
      icon: Download,
      title: "Export Options",
      description: "Export your notes and flashcards as PDF, DOCX, or Quizlet-compatible formats.",
      color: "from-pink-500 to-pink-600"
    }
  ];

  return (
    <section className="py-24 bg-muted/30">
      <div className="container-main">
        {/* Header */}
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-4xl font-bold text-gradient">
            Everything You Need to Study Smarter
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Our comprehensive suite of AI-powered tools helps you organize, understand, 
            and master any subject with unprecedented efficiency.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div 
                key={index} 
                className="card-feature group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${feature.color} mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
                
                <h3 className="text-xl font-semibold mb-3 text-foreground">
                  {feature.title}
                </h3>
                
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <div className="card-glass max-w-2xl mx-auto p-8 rounded-2xl">
            <h3 className="text-2xl font-bold mb-4 text-gradient">
              Ready to Transform Your Study Experience?
            </h3>
            <p className="text-muted-foreground mb-6">
              Join thousands of students who are already studying smarter with StudyPack AI.
            </p>
            <button className="btn-hero">
              Start Your Free Trial
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;