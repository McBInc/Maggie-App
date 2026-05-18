import React, { useState } from "react";
import { SafeAreaView, ScrollView, Text, View, Input, Button, Card, CardContent, CardHeader, CardTitle, CardDescription, Spinner } from "@/components/ui";
import { MessageSquare, Send, Sparkles, ShieldAlert, CheckCircle2, History } from "lucide-react-native";
import { Alert, KeyboardAvoidingView, Platform, Pressable } from "react-native";
import { useAction, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

export default function ScannerScreen() {
  const [text, setText] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const analyze = useAction(api.maggie.analyzeText);
  const history = useQuery(api.analyses.list);
  const [analysis, setAnalysis] = useState<{
    tactic: string;
    shard: string;
    script: string;
    validation: string;
  } | null>(null);

  const handleAnalyze = async () => {
    if (!text.trim()) {
      Alert.alert("Please enter a message to analyze.");
      return;
    }

    setIsAnalyzing(true);
    try {
      const result = await analyze({ text });
      setAnalysis(result);
      setText(""); // Clear input on success
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Maggie is taking a break. Please try again in a moment.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <SafeAreaView edges={["top"]} className="flex-1 bg-background">
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <ScrollView className="flex-1" contentContainerClassName="p-6 gap-6">
          <View>
            <Text variant="h1" className="text-primary font-bold">
              Ask Maggie
            </Text>
            <Text variant="p" className="text-muted-foreground">
              Paste the message you're unsure about. I'll help you see through the fog.
            </Text>
          </View>

          <Card className="border-border bg-white shadow-sm">
            <CardContent className="pt-6">
              <Input
                multiline
                numberOfLines={6}
                placeholder="Paste the text message here..."
                value={text}
                onChangeText={setText}
                className="min-h-[150px] text-lg p-4 border-2 border-muted"
                textAlignVertical="top"
              />
              <Button 
                onPress={handleAnalyze} 
                disabled={isAnalyzing || !text.trim()}
                className="mt-4 flex-row gap-2 h-14"
              >
                {isAnalyzing ? (
                  <Spinner size="small" color="white" />
                ) : (
                  <>
                    <Sparkles className="w-5 h-5 text-primary-foreground" />
                    <Text className="text-lg font-semibold">Analyze with Maggie</Text>
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {analysis && (
            <View className="gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <View className="flex-row items-center gap-2">
                <ShieldAlert className="w-5 h-5 text-destructive" />
                <Text className="text-xl font-bold">Current Analysis</Text>
              </View>

              <View className="bg-primary p-5 rounded-2xl border-2 border-secondary shadow-md self-start max-w-[90%]">
                <View className="flex-row gap-3 items-start mb-4">
                  <ShieldAlert className="w-5 h-5 text-primary-foreground mt-1" />
                  <View className="flex-1">
                    <Text className="text-secondary font-bold text-lg mb-1">
                      {analysis.tactic}
                    </Text>
                    <Text className="text-primary-foreground/90 font-semibold mb-2">
                      Attacking: {analysis.shard}
                    </Text>
                    <Text className="text-primary-foreground italic text-base leading-relaxed">
                      "{analysis.validation}"
                    </Text>
                  </View>
                </View>
                
                <View className="bg-white/10 p-4 rounded-xl border border-white/20">
                  <Text className="text-xs font-bold uppercase text-secondary mb-2">Suggested Response</Text>
                  <Text className="text-lg font-medium text-white">
                    {analysis.script}
                  </Text>
                </View>

                <Button variant="ghost" className="mt-4 self-start" onPress={() => setAnalysis(null)}>
                  <Text className="text-primary-foreground underline">Dismiss</Text>
                </Button>
              </View>
            </View>
          )}

          {history && history.length > 0 && (
            <View className="gap-4 mt-4">
              <View className="flex-row items-center gap-2">
                <History className="w-5 h-5 text-foreground/50" />
                <Text className="text-xl font-bold">Past Insights</Text>
              </View>
              
              {history.map((item) => (
                <Pressable key={item._id} onPress={() => setAnalysis(item)}>
                  <Card className="border-border bg-white shadow-sm">
                    <CardContent className="p-5">
                      <Text className="text-sm text-foreground/60 mb-2 italic" numberOfLines={1}>
                        "{item.userInput}"
                      </Text>
                      <View className="flex-row justify-between items-center">
                        <View className="bg-secondary/10 px-3 py-1 rounded-full">
                          <Text className="font-bold text-primary text-xs uppercase">{item.tactic}</Text>
                        </View>
                        <Text className="text-xs text-foreground/40">
                          {new Date(item.createdAt).toLocaleDateString()}
                        </Text>
                      </View>
                    </CardContent>
                  </Card>
                </Pressable>
              ))}
            </View>
          )}

          <View className="py-10">
            <Text className="text-center text-muted-foreground italic">
              "Your peace is non-negotiable." — Maggie
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
