import { SafeAreaView, ScrollView, Text, Card, CardContent, CardHeader, CardTitle, CardDescription, Button, View } from "@/components/ui";
import { Search, Heart, Shield, BookOpen, MessageSquare, ChevronRight, Sparkles } from "lucide-react-native";
import { useRouter } from "expo-router";
import { Pressable, Image } from "react-native";

export default function HomeScreen() {
  const router = useRouter();

  return (
    <SafeAreaView edges={["top"]} className="flex-1 bg-background">
      <ScrollView className="flex-1" contentContainerClassName="p-6 gap-6">
        <View className="flex-row items-center justify-between mb-2">
          <View className="flex-1">
            <Text variant="h1" className="text-primary font-bold text-3xl">
              ClearHeart
            </Text>
            <Text variant="p" className="text-foreground/80 text-lg italic">
              "Transitioning from confusion to clarity."
            </Text>
          </View>
          <View className="w-24 h-24 rounded-full bg-slate-200 overflow-hidden border-4 border-white shadow-xl">
            <Image 
              source={{ uri: 'https://animationtech.com/wp-content/uploads/2024/05/maggie-portrait.jpg' }} 
              className="w-full h-full"
              defaultSource={require('@/assets/images/icon.png')}
            />
          </View>
        </View>

        <View className="bg-primary p-6 rounded-3xl border-2 border-secondary shadow-lg mt-4">
          <View className="flex-row gap-3 items-start mb-6">
            <MessageSquare className="w-6 h-6 text-primary-foreground mt-1" />
            <View className="flex-1">
              <Text className="font-bold text-primary-foreground mb-2 text-xl">Maggie says:</Text>
              <Text className="text-primary-foreground text-lg leading-relaxed">
                "Welcome, dear. I'm here to help you find your footing again.
                Would you like to do the relationship assessment quiz or discover the tactics?"
              </Text>
            </View>
          </View>

          <View className="gap-4">
            <Button 
              onPress={() => router.push("/assessment")}
              className="w-full h-16 bg-white border-2 border-secondary"
            >
              <View className="flex-row items-center gap-3">
                <Shield className="w-6 h-6 text-primary" />
                <Text className="text-lg font-bold text-primary">Take Relationship Assessment</Text>
              </View>
            </Button>

            <Button
              onPress={() => router.push("/tactics-quiz")}
              className="w-full h-16 bg-white border-2 border-accent"
            >
              <View className="flex-row items-center gap-3">
                <BookOpen className="w-6 h-6 text-primary" />
                <Text className="text-lg font-bold text-primary">Discover Tactics Quiz</Text>
              </View>
            </Button>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
