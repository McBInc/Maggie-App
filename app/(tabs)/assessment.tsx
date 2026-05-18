import { SafeAreaView, ScrollView, Text, View, Card, CardHeader, CardTitle, CardDescription, CardContent, Button, Spinner, Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, Badge } from "@/components/ui";
import { Shield, ChevronRight, AlertCircle, Lock, Sparkles } from "lucide-react-native";
import { useState } from "react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Alert, Pressable } from "react-native";
import { useRevenueCat } from "@/hooks/useRevenueCat";

export default function AssessmentScreen() {
  const [started, setStarted] = useState(false);
  const questions = useQuery(api.questions.list);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showPaywall, setShowPaywall] = useState(false);
  const { isPremium, offerings, purchasePackage } = useRevenueCat();

  const [results, setResults] = useState<Record<string, { healthy: number, concern: number, red_flag: number }>>({});
  const [showReport, setShowReport] = useState(false);

  if (questions === undefined) {
    return (
      <SafeAreaView edges={["top"]} className="flex-1 bg-background justify-center items-center">
        <Spinner size="large" color="#2D8B7F" />
      </SafeAreaView>
    );
  }

  const handleAnswer = (value: "healthy" | "concern" | "red_flag") => {
    const category = currentQuestion.category;
    setResults(prev => ({
      ...prev,
      [category]: {
        ...(prev[category] || { healthy: 0, concern: 0, red_flag: 0 }),
        [value]: (prev[category]?.[value] || 0) + 1
      }
    }));
    handleNext();
  };

  const handleNext = () => {
    const nextIndex = currentIndex + 1;
    
    // Freemium Paywall at Question 40
    const PAYWALL_THRESHOLD = 40; 
    
    if (nextIndex >= PAYWALL_THRESHOLD && !isPremium) {
      setShowPaywall(true);
      return;
    }

    if (nextIndex < questions.length) {
      setCurrentIndex(nextIndex);
    } else {
      setShowReport(true);
    }
  };

  const currentQuestion = questions[currentIndex];

  if (showReport) {
    const categories = ["Sanctuary", "Substance", "Spirit", "Social Grace", "Sovereign Time"];
    return (
      <SafeAreaView edges={["top"]} className="flex-1 bg-background">
        <ScrollView className="flex-1" contentContainerClassName="p-6 gap-6">
          <View className="items-center py-6">
            <View className="bg-secondary/20 p-4 rounded-full mb-4">
              <Shield className="w-12 h-12 text-secondary" />
            </View>
            <Text variant="h1" className="text-center font-bold text-primary">Your Clarity Report</Text>
            <Text className="text-center text-foreground/60 italic">"Trust your perception, dear. Here is what we found."</Text>
          </View>

          <View className="gap-6">
            {categories.map(cat => {
              const score = results[cat] || { healthy: 0, concern: 0, red_flag: 0 };
              const total = score.healthy + score.concern + score.red_flag;
              if (total === 0) return null;
              
              const isWarning = score.red_flag > 0 || score.concern > 2;

              return (
                <Card key={cat} className={`border-2 ${isWarning ? 'border-destructive/20 bg-destructive/5' : 'border-muted/50 bg-white'}`}>
                  <CardHeader className="pb-2">
                    <View className="flex-row justify-between items-center">
                      <CardTitle className={isWarning ? 'text-destructive' : 'text-primary'}>{cat}</CardTitle>
                      <Badge variant={isWarning ? 'destructive' : 'outline'} className={!isWarning ? 'border-muted-foreground/30' : ''}>
                        <Text className={isWarning ? 'text-white' : 'text-muted-foreground'}>{isWarning ? "Needs Attention" : "Clear"}</Text>
                      </Badge>
                    </View>
                  </CardHeader>
                  <CardContent>
                    <View className="flex-row h-3 rounded-full overflow-hidden bg-muted/30">
                      <View style={{ width: `${(score.healthy / total) * 100}%` }} className="bg-muted-foreground" />
                      <View style={{ width: `${(score.concern / total) * 100}%` }} className="bg-secondary" />
                      <View style={{ width: `${(score.red_flag / total) * 100}%` }} className="bg-destructive" />
                    </View>
                    <View className="flex-row justify-between mt-2">
                      <Text variant="small" className="text-muted-foreground">Healthy Sign</Text>
                      <Text variant="small" className="text-secondary font-bold">Concern</Text>
                      <Text variant="small" className="text-destructive font-bold">Red Flag</Text>
                    </View>
                  </CardContent>
                </Card>
              );
            })}
          </View>

          <View className="bg-primary p-6 rounded-2xl border-2 border-secondary shadow-lg mt-4">
            <View className="flex-row gap-3 items-start mb-3">
              <Sparkles className="w-6 h-6 text-secondary" />
              <Text className="text-primary-foreground font-bold text-xl">Maggie's Executive Advice</Text>
            </View>
            <Text className="text-primary-foreground text-lg leading-relaxed italic">
              "The patterns don't lie. If you're seeing Coral Red in your report, it's your gut telling you something isn't right. You are learning the language of boundaries now. Stay steady, stay safe, and remember: your peace is non-negotiable."
            </Text>
          </View>

          <Button size="lg" className="mt-8 mb-10" onPress={() => { setShowReport(false); setStarted(false); setCurrentIndex(0); setResults({}); }}>
            <Text>Retake Assessment</Text>
          </Button>
        </ScrollView>
      </SafeAreaView>
    );
  }

  if (!started || !currentQuestion) {
    return (
      <SafeAreaView edges={["top"]} className="flex-1 bg-background">
        <ScrollView className="flex-1" contentContainerClassName="p-6 gap-8">
          <View className="items-center py-10">
            <View className="bg-primary/10 p-6 rounded-full mb-6 border-2 border-primary/20">
              <Shield className="w-16 h-16 text-primary" />
            </View>
            <Text variant="h1" className="text-center font-bold mb-2 text-primary">Relationship Assessment</Text>
            <Text variant="p" className="text-center text-foreground/60 px-4 text-lg">
              81 questions designed to help you identify if your relationship is healthy, confusing, or manipulative.
            </Text>
          </View>

          <View className="gap-4">
            <Card className="border-muted bg-white">
              <CardContent className="p-5 flex-row gap-4 items-center">
                <AlertCircle className="w-6 h-6 text-secondary" />
                <View className="flex-1">
                  <Text className="font-bold text-primary">Privacy Guaranteed</Text>
                  <Text variant="small" className="text-foreground/60">Your answers are encrypted and never shared.</Text>
                </View>
              </CardContent>
            </Card>
            
            <Card className="border-muted bg-white">
              <CardContent className="p-5 flex-row gap-4 items-center">
                <View className="bg-secondary/10 p-2 rounded-lg">
                  <Text className="font-bold text-secondary text-lg">15m</Text>
                </View>
                <View className="flex-1">
                  <Text className="font-bold text-primary">Time to complete</Text>
                  <Text variant="small" className="text-foreground/60">It's better to take your time and be honest.</Text>
                </View>
              </CardContent>
            </Card>
          </View>

          <Button size="lg" className="mt-4 h-16 shadow-md" onPress={() => setStarted(true)}>
            <Text className="text-lg font-bold">Begin Assessment</Text>
          </Button>
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView edges={["top"]} className="flex-1 bg-background">
      <View className="p-6 border-b border-muted flex-row items-center justify-between bg-white">
        <Text className="font-bold text-primary">Question {currentIndex + 1} of {questions.length}</Text>
        <View className="bg-muted/50 px-3 py-1 rounded-full">
          <Text className="text-primary font-bold">{Math.round(((currentIndex + 1) / questions.length) * 100)}%</Text>
        </View>
      </View>
      <ScrollView className="flex-1" contentContainerClassName="p-6 gap-6">
        <View>
          <Badge variant="secondary" className="self-start mb-4 px-3 py-1"><Text className="text-primary font-bold uppercase text-xs tracking-wider">{currentQuestion.category}</Text></Badge>
          <Text className="text-2xl font-bold leading-tight text-foreground">{currentQuestion.text}</Text>
        </View>
        
        <View className="gap-4">
          {[
            { text: currentQuestion.healthySign, value: "healthy", color: "border-muted" },
            { text: currentQuestion.potentialConcern, value: "concern", color: "border-secondary/40" },
            { text: currentQuestion.redFlag, value: "red_flag", color: "border-destructive/30" },
          ].map((option) => (
            <Pressable 
              key={option.value} 
              onPress={() => handleAnswer(option.value as any)}
              className={`bg-white p-5 rounded-2xl border-2 ${option.color} active:bg-muted/50 shadow-sm`}
            >
              <Text className="text-lg font-medium text-foreground">{option.text}</Text>
            </Pressable>
          ))}
        </View>

        <View className="flex-row justify-between mt-6 items-center">
          <Button variant="ghost" onPress={() => {
            setStarted(false);
            setCurrentIndex(0);
          }}>
            <Text className="text-muted-foreground underline">Exit Assessment</Text>
          </Button>
        </View>
      </ScrollView>

      <Dialog open={showPaywall} onOpenChange={setShowPaywall}>
        <DialogContent>
          <DialogHeader>
            <View className="items-center mb-4">
              <View className="bg-primary/10 p-4 rounded-full">
                <Lock className="w-10 h-10 text-primary" />
              </View>
            </View>
            <DialogTitle className="text-center text-2xl"><Text>You're halfway there!</Text></DialogTitle>
            <DialogDescription className="text-center text-base">
              <Text>To unlock the final 40 questions and receive your Relationship Clarity Report, upgrade to ClearHeart Premium.</Text>
            </DialogDescription>
          </DialogHeader>
          <View className="gap-4 my-6">
            <View className="flex-row items-center gap-3">
              <Sparkles className="w-5 h-5 text-primary" />
              <Text>Unlimited AI Text Scanning</Text>
            </View>
            <View className="flex-row items-center gap-3">
              <Shield className="w-5 h-5 text-primary" />
              <Text>Full 80-Tactic Library Access</Text>
            </View>
            <View className="flex-row items-center gap-3">
              <Lock className="w-5 h-5 text-primary" />
              <Text>Secure Journal Vault</Text>
            </View>
          </View>
          <DialogFooter className="gap-3">
            <Button className="w-full h-14" onPress={async () => {
              if (offerings?.availablePackages?.[0]) {
                const success = await purchasePackage(offerings.availablePackages[0]);
                if (success) {
                  setShowPaywall(false);
                  handleNext();
                }
              } else {
                // Fallback for web/demo
                Alert.alert("Development Mode", "In a real app, this would trigger the app store purchase flow.");
              }
            }}>
              <Text className="text-lg">Unlock Everything - $6.50/mo</Text>
            </Button>
            <Button variant="ghost" onPress={() => setShowPaywall(false)}>
              <Text>Maybe Later</Text>
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </SafeAreaView>
  );
}
