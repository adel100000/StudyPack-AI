import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { ListChecks, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { generateQuiz, QuizQuestion } from "@/lib/utils";

const QuizGenerator = () => {
  const [inputText, setInputText] = useState("");
  const [quiz, setQuiz] = useState<QuizQuestion[]>([]);
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  const handleGenerate = async () => {
    if (!inputText.trim()) {
      toast({ title: "No content", description: "Please enter some text.", variant: "destructive" });
      return;
    }
    setIsGenerating(true);
    try {
      const q = await generateQuiz(inputText);
      setQuiz(q);
      setCurrentQ(0);
      setSelected(null);
      setScore(0);
      toast({ title: "Quiz ready!", description: `Generated ${q.length} questions.` });
    } catch (err) {
      console.error("Quiz generation error:", err);
      toast({ title: "Error", description: "Could not generate quiz.", variant: "destructive" });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleAnswer = (i: number) => {
    setSelected(i);
    if (quiz[currentQ].options[i] === quiz[currentQ].answer) {
      setScore((prev) => prev + 1);
    }
  };

  const nextQuestion = () => {
    setCurrentQ((prev) => prev + 1);
    setSelected(null);
  };

  const getButtonVariant = (i: number) => {
    if (selected === i) {
      return quiz[currentQ].options[i] === quiz[currentQ].answer ? "secondary" : "destructive";
    }
    return "outline";
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container-main py-8 space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center space-x-2 bg-gradient-secondary text-secondary-foreground px-4 py-2 rounded-full text-sm font-medium">
            <ListChecks className="h-4 w-4" />
            <span>AI Quiz Generator</span>
          </div>
          <h1 className="text-4xl font-bold text-gradient">Test Yourself with Quizzes</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Create interactive multiple-choice quizzes from your notes.
          </p>
        </div>

        {/* Input */}
        <Card className="card-feature max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Sparkles className="h-5 w-5 text-secondary" />
              <span>Generate Quiz</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              placeholder="Paste your notes or content here..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="min-h-[150px] resize-none"
            />
            <div className="flex flex-col sm:flex-row gap-2">
              <Button onClick={handleGenerate} disabled={isGenerating} className="btn-hero flex-1">
                {isGenerating ? (
                  <>
                    <Sparkles className="h-4 w-4 mr-2 animate-spin" />
                    Creating Quiz...
                  </>
                ) : (
                  <>
                    <ListChecks className="h-4 w-4 mr-2" />
                    Generate Quiz
                  </>
                )}
              </Button>
              <Button variant="outline" onClick={() => setInputText("")}>Clear</Button>
            </div>
          </CardContent>
        </Card>

        {/* Quiz Viewer */}
        {quiz.length > 0 && currentQ < quiz.length && (
          <div className="max-w-4xl mx-auto space-y-6">
            <Card className="card-glass">
              <CardHeader>
                <CardTitle>
                  Q{currentQ + 1}. {quiz[currentQ].question}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {quiz[currentQ].options.map((opt, i) => (
                  <Button
                    key={i}
                    variant={getButtonVariant(i)}
                    className="w-full justify-start"
                    onClick={() => handleAnswer(i)}
                    disabled={selected !== null}
                  >
                    {opt}
                  </Button>
                ))}
              </CardContent>
            </Card>

            <div className="flex items-center justify-between">
              <div className="text-sm text-muted-foreground">
                Question {currentQ + 1} of {quiz.length} | Score: {score}
              </div>
              <Button onClick={nextQuestion} disabled={selected === null}>
                Next
              </Button>
            </div>
          </div>
        )}

        {/* Quiz Complete */}
        {quiz.length > 0 && currentQ >= quiz.length && (
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold">Quiz Complete 🎉</h2>
            <p className="text-lg">
              You scored {score} out of {quiz.length}
            </p>
            <Button onClick={() => { setCurrentQ(0); setScore(0); setSelected(null); }}>Retry</Button>
          </div>
        )}
      </main>
    </div>
  );
};

export default QuizGenerator;
