import { useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import {
  CreditCard,
  Sparkles,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  Shuffle,
  Download
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { generateFlashcards, Flashcard, downloadAsFile } from "@/lib/utils";

const FlashcardCreator = () => {
  const [inputText, setInputText] = useState("");
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const [currentCard, setCurrentCard] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  // Load cached flashcards on mount
  useEffect(() => {
    const cached = localStorage.getItem("flashcards");
    if (cached) {
      setFlashcards(JSON.parse(cached));
      toast({ title: "Loaded cached flashcards", description: "Offline mode enabled", variant: "default" });
    }
  }, []);

  const handleGenerate = async () => {
    if (!inputText.trim()) {
      toast({ title: "No content provided", description: "Enter some text first!", variant: "destructive" });
      return;
    }

    setIsGenerating(true);
    try {
      const cards = await generateFlashcards(inputText);
      setFlashcards(cards);
      setCurrentCard(0);
      setIsFlipped(false);

      // save to localStorage
      localStorage.setItem("flashcards", JSON.stringify(cards));

      toast({ title: "Flashcards ready!", description: `Generated ${cards.length} cards.`, variant: "default" });
    } catch (err) {
      console.error("Flashcard generation error:", err);

      // try to load cached flashcards if available
      const cached = localStorage.getItem("flashcards");
      if (cached) {
        setFlashcards(JSON.parse(cached));
        setCurrentCard(0);
        setIsFlipped(false);
        toast({
          title: "Backend offline",
          description: "Loaded cached flashcards instead.",
          variant: "default"
        });
      } else {
        toast({ title: "Error", description: "Failed to generate flashcards.", variant: "destructive" });
      }
    } finally {
      setIsGenerating(false);
    }
  };

  const nextCard = () => {
    setCurrentCard((prev) => (prev + 1) % flashcards.length);
    setIsFlipped(false);
  };

  const prevCard = () => {
    setCurrentCard((prev) => (prev - 1 + flashcards.length) % flashcards.length);
    setIsFlipped(false);
  };

  const shuffleCards = () => {
    const shuffled = [...flashcards].sort(() => Math.random() - 0.5);
    setFlashcards(shuffled);
    setCurrentCard(0);
    setIsFlipped(false);
    toast({ title: "Shuffled", description: "Cards randomized for better learning.", variant: "default" });
  };

  const handleDownloadCSV = () => {
    if (!flashcards.length) return;
    const csv = flashcards
      .map((f) => `"${f.front.replace(/"/g, '""')}","${f.back.replace(/"/g, '""')}"`)
      .join("\n");
    downloadAsFile("flashcards.csv", csv);
    toast({ title: "Download started", description: "Your flashcards are being downloaded as CSV.", variant: "default" });
  };

  const handleDownloadTXT = () => {
    if (!flashcards.length) return;
    const txt = flashcards.map((f) => `Q: ${f.front}\nA: ${f.back}\n`).join("\n");
    downloadAsFile("flashcards.txt", txt);
    toast({ title: "Download started", description: "Your flashcards are being downloaded as TXT.", variant: "default" });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container-main py-8 space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center space-x-2 bg-gradient-secondary text-secondary-foreground px-4 py-2 rounded-full text-sm font-medium">
            <CreditCard className="h-4 w-4" />
            <span>AI Flashcard Creator</span>
          </div>
          <h1 className="text-4xl font-bold text-gradient">Create Interactive Flashcards</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Transform any content into effective flashcards for spaced repetition learning.
          </p>
        </div>

        {/* Input */}
        <Card className="card-feature max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Sparkles className="h-5 w-5 text-secondary" />
              <span>Generate Flashcards</span>
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
                    Creating Flashcards...
                  </>
                ) : (
                  <>
                    <CreditCard className="h-4 w-4 mr-2" />
                    Generate Flashcards
                  </>
                )}
              </Button>
              <Button variant="outline" onClick={() => setInputText("")}>Clear</Button>
            </div>
          </CardContent>
        </Card>

        {/* Flashcard Viewer */}
        {flashcards.length > 0 && (
          <div className="max-w-4xl mx-auto space-y-6">
            {/* Controls */}
            <div className="flex items-center justify-between">
              <div className="text-sm text-muted-foreground">
                Card {currentCard + 1} of {flashcards.length}
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm" onClick={shuffleCards}><Shuffle className="h-4 w-4" /></Button>
                <Button variant="outline" size="sm" onClick={prevCard}><ChevronLeft className="h-4 w-4" /></Button>
                <Button variant="outline" size="sm" onClick={nextCard}><ChevronRight className="h-4 w-4" /></Button>
              </div>
            </div>

            {/* Flashcard */}
            <div className="perspective-1000 cursor-pointer" onClick={() => setIsFlipped(!isFlipped)}>
              <div className={`relative w-full h-80 transition-transform duration-700 transform-style-preserve-3d ${isFlipped ? "rotate-y-180" : ""}`}>
                {/* Front */}
                <Card className="absolute inset-0 backface-hidden card-glass">
                  <CardContent className="h-full flex items-center justify-center p-8">
                    <div className="text-center space-y-4">
                      <div className="text-sm font-medium text-secondary mb-4">Question</div>
                      <p className="text-lg font-medium leading-relaxed">{flashcards[currentCard].front}</p>
                      <div className="text-sm text-muted-foreground mt-8">Click to reveal answer</div>
                    </div>
                  </CardContent>
                </Card>

                {/* Back */}
                <Card className="absolute inset-0 backface-hidden rotate-y-180 card-glass">
                  <CardContent className="h-full flex items-center justify-center p-8">
                    <div className="text-center space-y-4">
                      <div className="text-sm font-medium text-primary mb-4">Answer</div>
                      <p className="text-lg leading-relaxed">{flashcards[currentCard].back}</p>
                      <div className="text-sm text-muted-foreground mt-8">Click to flip back</div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-center space-x-4">
              <Button variant="outline" onClick={() => setIsFlipped(!isFlipped)}>
                <RotateCcw className="h-4 w-4 mr-2" /> Flip Card
              </Button>
              <Button variant="outline" onClick={nextCard}>
                Next Card <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
              <Button variant="outline" onClick={handleDownloadCSV}>
                <Download className="h-4 w-4 mr-2" /> CSV
              </Button>
              <Button variant="outline" onClick={handleDownloadTXT}>
                <Download className="h-4 w-4 mr-2" /> TXT
              </Button>
            </div>

            {/* Progress */}
            <div className="w-full bg-muted rounded-full h-2">
              <div
                className="bg-gradient-secondary h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentCard + 1) / flashcards.length) * 100}%` }}
              />
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default FlashcardCreator;
