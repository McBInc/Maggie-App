import { SafeAreaView, ScrollView, Text, View, Card, CardHeader, CardTitle, CardDescription, CardContent, Badge, Button, Spinner, MuxPlayer } from "@/components/ui";
import { BookOpen, Lock, ShieldCheck, MessageCircle, PlayCircle } from "lucide-react-native";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Alert, Pressable, Image } from "react-native";
import { useState } from "react";
import { useRevenueCat } from "@/hooks/useRevenueCat";

export default function LibraryScreen() {
  const tactics = useQuery(api.tactics.list);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const { isPremium, offerings, purchasePackage } = useRevenueCat();

  if (tactics === undefined) {
    return (
      <SafeAreaView edges={["top"]} className="flex-1 bg-background justify-center items-center">
        <Spinner size="large" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView edges={["top"]} className="flex-1 bg-background">
      <ScrollView className="flex-1" contentContainerClassName="p-6 gap-6">
        <View className="mb-2">
          <View className="flex-row items-center gap-4 mb-4">
            <View className="bg-primary/10 p-3 rounded-2xl">
              <BookOpen className="w-8 h-8 text-primary" />
            </View>
            <View className="flex-1">
              <Text variant="h1" className="text-primary font-bold">
                Maggie's Library
              </Text>
              <Text variant="p" className="text-muted-foreground">
                80 tactics used to manipulate and control.
              </Text>
            </View>
          </View>
          <View className="h-40 rounded-2xl overflow-hidden mb-4 relative">
            <Image 
              source={{ uri: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=800&h=400' }}
              className="w-full h-full"
            />
            <View className="absolute inset-0 bg-primary/20 items-center justify-center">
              <View className="bg-black/50 px-4 py-2 rounded-lg">
                <Text className="text-white text-lg font-bold">Knowledge is your Shield</Text>
              </View>
            </View>
          </View>
        </View>

        <View className="gap-6">
          {tactics.map((tactic) => (
            <Card key={tactic._id} className={(!tactic.isStarter && !isPremium) ? "border-border/40 opacity-80" : "border-primary/20"}>
              <Pressable onPress={() => setExpandedId(expandedId === tactic._id ? null : tactic._id)}>
                <View className="p-5 bg-secondary border-l-4 border-primary flex-row justify-between items-center">
                  <View className="flex-row items-center gap-2 flex-1">
                    <Text className="font-bold text-lg text-primary-foreground">{tactic.tacticId}. {tactic.title}</Text>
                  </View>
                  {(!tactic.isStarter && !isPremium) ? (
                    <Lock className="w-5 h-5 text-primary-foreground/50" />
                  ) : (
                    <View className="flex-row items-center gap-2">
                      <PlayCircle className="w-5 h-5 text-primary-foreground" />
                      <Badge variant="outline" className="border-primary-foreground/30"><Text className="text-primary-foreground text-xs">{tactic.isStarter ? "Starter" : "Premium"}</Text></Badge>
                    </View>
                  )}
                </View>
              </Pressable>

              <CardContent className="p-5 gap-5">
                {expandedId === tactic._id && (tactic.isStarter || isPremium) && (
                  <View className="mb-2">
                    <MuxPlayer playbackId="scf7v68s00100" />
                  </View>
                )}

                <View className="bg-muted p-4 rounded-xl">
                  <View className="flex-row items-center gap-2 mb-2">
                    <MessageCircle className="w-4 h-4 text-primary" />
                    <Text className="text-xs font-bold uppercase text-primary tracking-wider">The Language</Text>
                  </View>
                  <Text className="text-base italic text-foreground/80 leading-relaxed">
                    "{tactic.description}"
                  </Text>
                </View>

                {(tactic.isStarter || isPremium) ? (
                  <View className="bg-white p-4 rounded-xl border border-primary/10 shadow-sm">
                    <View className="flex-row items-center gap-2 mb-2">
                      <ShieldCheck className="w-4 h-4 text-primary" />
                      <Text className="text-xs font-bold uppercase text-primary tracking-wider">The Shield</Text>
                    </View>
                    <Text className="text-base font-semibold text-foreground leading-relaxed">
                      {tactic.fullContent}
                    </Text>
                  </View>
                ) : (
                  <Button
                    variant="outline"
                    className="mt-2 border-secondary border-2"
                    onPress={async () => {
                      if (offerings?.availablePackages?.[0]) {
                        await purchasePackage(offerings.availablePackages[0]);
                      } else {
                        Alert.alert("Premium Feature", "Upgrade to ClearHeart Premium to unlock the Boundary Shields for all 80 tactics.");
                      }
                    }}
                  >
                    <Lock className="w-4 h-4 mr-2 text-secondary" />
                    <Text className="text-secondary font-bold">Unlock Boundary Shield</Text>
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </View>

        <Card className="bg-primary/5 border-primary/20 mb-10">
          <CardContent className="p-6 items-center">
            <Lock className="w-10 h-10 text-primary mb-4" />
            <Text variant="h3" className="text-center mb-2">Unlock the Full Library</Text>
            <Text variant="small" className="text-center text-muted-foreground mb-4">
              Get full access to all 80 tactics and their corresponding Boundary Shields.
            </Text>
            <Button className="w-full">
              <Text>Upgrade to Premium ($6.50/mo)</Text>
            </Button>
          </CardContent>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
}
