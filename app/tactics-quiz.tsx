import React, { useState, useEffect } from "react";
import { SafeAreaView, ScrollView, Text, View, Button, Card, CardContent, Spinner } from "@/components/ui";
import { BookOpen, CheckCircle, XCircle } from "lucide-react-native";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Pressable } from "react-native";
import { Stack } from "expo-router";

export default function TacticsQuizScreen() {
  const tactics = useQuery(api.tactics.list);
  const [currentQuestion, setCurrentQuestion] = useState<{
    description: string;
    correctTacticId: number;
    options: { id: number; title: string }[];
  } | null>(null);
  const [selectedOptionId, setSelectedOptionId] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    if (tactics && tactics.length > 0 && !currentQuestion) {
      generateQuestion();
    }
  }, [tactics]);

  const generateQuestion = () => {
    if (!tactics || tactics.length < 4) return;

    // Pick a random tactic as the correct answer
    const correctIndex = Math.floor(Math.random() * tactics.length);
    const correctTactic = tactics[correctIndex];

    // Pick 3 other random distinct tactics for wrong options
    const wrongOptions: typeof tactics = [];
    while (wrongOptions.length < 3) {
      const randomIndex = Math.floor(Math.random() * tactics.length);
      if (randomIndex !== correctIndex && !wrongOptions.find(t => t._id === tactics[randomIndex]._id)) {
        wrongOptions.push(tactics[randomIndex]);
      }
    }

    // Combine and shuffle options
    const options = [correctTactic, ...wrongOptions].map((t: any) => ({ id: t.tacticId, title: t.title }));
    for (let i = options.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [options[i], options[j]] = [options[j], options[i]];
    }

    setCurrentQuestion({
      description: correctTactic.description,
      correctTacticId: correctTactic.tacticId,
      options,
    });
    setSelectedOptionId(null);
    setShowResult(false);
  };

  const handleSelectOption = (optionId: number) => {
    if (showResult) return;
    setSelectedOptionId(optionId);
    setShowResult(true);
  };

  if (tactics === undefined) {
    return (
      <SafeAreaView edges={["top"]} className="flex-1 bg-background justify-center items-center">
        <Spinner size="large" />
      </SafeAreaView>
    );
  }

  if (!currentQuestion) {
     return (
      <SafeAreaView edges={["top"]} className="flex-1 bg-background justify-center items-center">
         <Text>Not enough tactics available to start quiz.</Text>
      </SafeAreaView>
     )
  }

  const isCorrect = selectedOptionId === currentQuestion.correctTacticId;

  return (
    <SafeAreaView edges={["top"]} className="flex-1 bg-background">
      <Stack.Screen options={{ title: "Tactics Quiz", headerBackTitle: "Home" }} />
      <ScrollView className="flex-1" contentContainerClassName="p-6 gap-6">
        <View className="mb-2">
          <View className="flex-row items-center gap-3 mb-4">
            <View className="bg-accent/20 p-3 rounded-full">
              <BookOpen className="w-8 h-8 text-accent" />
            </View>
            <View className="flex-1">
              <Text variant="h1" className="text-primary font-bold text-2xl">
                Identify the Tactic
              </Text>
              <Text className="text-muted-foreground text-sm">
                Read the description and select the correct manipulation tactic.
              </Text>
            </View>
          </View>
        </View>

        <Card className="border-border bg-white shadow-sm mb-4">
          <CardContent className="p-6">
            <Text className="text-lg leading-relaxed text-foreground font-medium">
              "{currentQuestion.description}"
            </Text>
          </CardContent>
        </Card>

        <View className="gap-3">
          {currentQuestion.options.map((option) => {
            const isSelected = selectedOptionId === option.id;
            const isActuallyCorrect = option.id === currentQuestion.correctTacticId;

            let buttonStyle = "bg-white border-2 border-border";
            let textStyle = "text-foreground";
            let icon = null;

            if (showResult) {
              if (isActuallyCorrect) {
                buttonStyle = "bg-green-50 border-2 border-green-500";
                textStyle = "text-green-700 font-bold";
                icon = <CheckCircle className="w-5 h-5 text-green-600" />;
              } else if (isSelected && !isActuallyCorrect) {
                buttonStyle = "bg-red-50 border-2 border-red-500";
                textStyle = "text-red-700";
                icon = <XCircle className="w-5 h-5 text-red-600" />;
              }
            } else if (isSelected) {
               buttonStyle = "bg-accent/10 border-2 border-accent";
            }

            return (
              <Pressable
                key={option.id}
                onPress={() => handleSelectOption(option.id)}
                className={`p-4 rounded-xl flex-row items-center justify-between ${buttonStyle}`}
              >
                <Text className={`text-base ${textStyle}`}>{option.title}</Text>
                {icon}
              </Pressable>
            );
          })}
        </View>

        {showResult && (
          <View className="mt-6 gap-4 animate-in fade-in zoom-in duration-300">
             <View className={`p-4 rounded-xl border-2 ${isCorrect ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
                <Text className={`text-lg font-bold text-center ${isCorrect ? 'text-green-800' : 'text-red-800'}`}>
                    {isCorrect ? "Correct! Well done." : "Not quite. Keep learning!"}
                </Text>
             </View>

            <Button onPress={generateQuestion} className="w-full h-14 bg-primary">
              <Text className="text-lg font-bold">Next Question</Text>
            </Button>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
