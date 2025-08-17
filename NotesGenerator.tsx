import { useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles, FileText, Copy, Download, Wand2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { generateNotes, downloadAsFile } from "@/lib/utils";

const NotesGenerator = () => {
  const [inputText, setInputText] = useState("");
  const [generatedNotes, setGeneratedNotes] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  // Load cached notes on mount
  useEffect(() => {
    const cached = localStorage.getItem("generatedNotes");
    if (cached) {
      setGeneratedNotes(cached);
      toast({ title: "Loaded cached notes", description: "Offline mode enabled", variant: "default" });
    }
  }, []);

  const handleGenerate = async () => {
    if (!inputText.trim()) {
      toast({
        title: "No content provided",
        description: "Enter some text first!",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    try {
      const notes = await generateNotes(inputText);
      setGeneratedNotes(notes || "");

      // save to localStorage
      localStorage.setItem("generatedNotes", notes || "");

      toast({
        title: "Notes generated!",
        description: "Your AI-powered study notes are ready.",
        variant: "default",
      });
    } catch (err) {
      console.error("Notes generation error:", err);

      // try loading cached notes if available
      const cached = localStorage.getItem("generatedNotes");
      if (cached) {
        setGeneratedNotes(cached);
        toast({
          title: "Backend offline",
          description: "Loaded cached notes instead.",
          variant: "default",
        });
      } else {
        toast({
          title: "Error",
          description: "Failed to generate notes. Try again.",
          variant: "destructive",
        });
      }
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = () => {
    if (!generatedNotes) return;
    navigator.clipboard.writeText(generatedNotes);
    toast({ title: "Copied to clipboard", description: "Notes copied!", variant: "default" });
  };

  const handleDownload = (type: "txt" | "md") => {
    if (!generatedNotes) return;
    const filename = type === "md" ? "study-notes.md" : "study-notes.txt";
    downloadAsFile(filename, generatedNotes);
    toast({
      title: "Download started",
      description: `Your notes are being downloaded as ${filename}.`,
      variant: "default",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container-main py-8">
        <div className="space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <div className="inline-flex items-center space-x-2 bg-gradient-primary text-primary-foreground px-4 py-2 rounded-full text-sm font-medium">
              <Sparkles className="h-4 w-4" />
              <span>AI-Powered Notes Generator</span>
            </div>
            <h1 className="text-4xl font-bold text-gradient">
              Transform Your Content into Study Notes
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Paste your lecture notes, textbook content, or any study material and let AI generate clean, organized notes.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Input Section */}
            <Card className="card-feature">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <FileText className="h-5 w-5 text-primary" />
                  <span>Input Your Content</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  placeholder="Paste your study material here..."
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  className="min-h-[300px] resize-none"
                />
                <div className="flex flex-col sm:flex-row gap-2">
                  <Button onClick={handleGenerate} disabled={isGenerating} className="btn-hero flex-1">
                    {isGenerating ? (
                      <>
                        <Wand2 className="h-4 w-4 mr-2 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <Sparkles className="h-4 w-4 mr-2" />
                        Generate Notes
                      </>
                    )}
                  </Button>
                  <Button variant="outline" onClick={() => setInputText("")}>Clear</Button>
                </div>
              </CardContent>
            </Card>

            {/* Output Section */}
            <Card className="card-feature">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Sparkles className="h-5 w-5 text-secondary" />
                    <span>Generated Notes</span>
                  </div>
                  {generatedNotes && (
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" onClick={handleCopy}>
                        <Copy className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleDownload("md")}>
                        <Download className="h-4 w-4" /> MD
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleDownload("txt")}>
                        <Download className="h-4 w-4" /> TXT
                      </Button>
                    </div>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {generatedNotes ? (
                  <div className="bg-muted/50 rounded-lg p-4 min-h-[300px] font-mono text-sm whitespace-pre-wrap">
                    {generatedNotes}
                  </div>
                ) : (
                  <div className="flex items-center justify-center min-h-[300px] text-muted-foreground">
                    <div className="text-center space-y-2">
                      <FileText className="h-12 w-12 mx-auto opacity-50" />
                      <p>Generated notes will appear here</p>
                      <p className="text-sm">Add your content and click "Generate Notes" to get started</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default NotesGenerator;
