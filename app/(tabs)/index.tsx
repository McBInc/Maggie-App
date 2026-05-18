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

        <View className="bg-primary p-5 rounded-2xl border-2 border-secondary shadow-md">
          <View className="flex-row gap-3 items-start">
            <MessageSquare className="w-5 h-5 text-primary-foreground mt-1" />
            <View className="flex-1">
              <Text className="font-bold text-primary-foreground mb-1 text-lg">Maggie's Note:</Text>
              <Text className="text-primary-foreground italic text-base leading-relaxed">
                "Welcome, dear. I'm here to help you find your footing again. Your peace is non-negotiable."
              </Text>
            </View>
          </View>
        </View>

        <Card className="border-primary/20 bg-white overflow-hidden shadow-sm">
          <CardHeader>
            <View className="flex-row items-center gap-2 mb-2">
              <View className="bg-secondary/20 p-2 rounded-full">
                <Sparkles className="w-5 h-5 text-secondary" />
              </View>
              <CardTitle><Text className="text-xl font-bold">Ask Maggie</Text></CardTitle>
            </View>
            <CardDescription>
              <Text className="text-base text-foreground/70">Paste a text message you're unsure about. I'll help you decode the manipulation.</Text>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button 
              onPress={() => router.push("/scanner")}
              className="w-full h-14"
            >
              <Text className="text-lg">Analyze a Text</Text>
            </Button>
          </CardContent>
        </Card>

        <View className="flex-row gap-4">
          <Pressable 
            className="flex-1"
            onPress={() => router.push("/assessment")}
          >
            <Card className="h-full border-secondary/20 shadow-sm">
              <CardHeader className="p-4 pb-2">
                <View className="bg-secondary/10 w-12 h-12 items-center justify-center rounded-2xl mb-2">
                  <Shield className="w-6 h-6 text-secondary" />
                </View>
                <CardTitle className="text-lg"><Text>Assessment</Text></CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <Text variant="small" className="text-muted-foreground">
                  81 questions to reveal the truth about your dynamic.
                </Text>
              </CardContent>
            </Card>
          </Pressable>

          <Pressable 
            className="flex-1"
            onPress={() => router.push("/library")}
          >
            <Card className="h-full border-accent/20 shadow-sm">
              <CardHeader className="p-4 pb-2">
                <View className="bg-accent/10 w-12 h-12 items-center justify-center rounded-2xl mb-2">
                  <BookOpen className="w-6 h-6 text-accent" />
                </View>
                <CardTitle className="text-lg"><Text>Library</Text></CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <Text variant="small" className="text-muted-foreground">
                  Master the 80 tactics and build your boundary shield.
                </Text>
              </CardContent>
            </Card>
          </Pressable>
        </View>

        <View className="pb-10">
          <Text variant="h3" className="mb-4">Weekly Focus</Text>
          <Card className="shadow-sm">
            <Pressable className="p-4 flex-row items-center justify-between">
              <View className="flex-row items-center gap-4">
                <View className="bg-destructive/10 p-2 rounded-full">
                  <Heart className="w-5 h-5 text-destructive" />
                </View>
                <View>
                  <Text className="font-semibold text-lg">Gaslighting 101</Text>
                  <Text variant="small" className="text-muted-foreground">Tactic #3 • 2 min read</Text>
                </View>
              </View>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </Pressable>
          </Card>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
