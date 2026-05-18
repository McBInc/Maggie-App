import React, { useState, useEffect } from "react";
import { SafeAreaView, ScrollView, Text, View, Button, Card, CardContent, CardHeader, CardTitle, CardDescription, Input, Spinner } from "@/components/ui";
import { Mic, Lock, ShieldCheck, History, Plus, FileText, Square, Play, Trash2, Calendar } from "lucide-react-native";
import { Alert, Platform, Image } from "react-native";
import { Audio } from 'expo-av';
import { useRevenueCat } from "@/hooks/useRevenueCat";
import { useMutation, useQuery, useAction } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";

export default function VaultScreen() {
  const [isRecording, setIsRecording] = useState(false);
  const [isTranscribing, setIsTranscribing] = useState(false);
  const { isPremium: realIsPremium, offerings, purchasePackage } = useRevenueCat();
  // FORCE PREMIUM FOR DEV PREVIEW
  const isPremium = true; 
  
  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const [permissionResponse, requestPermission] = Audio.usePermissions();
  
  const entries = useQuery(api.vault.getEntries, {}) || [];
  const generateUploadUrl = useMutation(api.vault.generateUploadUrl);
  const addEntry = useMutation(api.vault.addEntry);
  const removeEntry = useMutation(api.vault.removeEntry);
  const transcribeAction = useAction(api.vault.transcribe);

  async function startRecording() {
    try {
      if (permissionResponse?.status !== 'granted') {
        console.log('Requesting permission..');
        const permission = await requestPermission();
        if (permission.status !== 'granted') {
          Alert.alert("Permission Denied", "We need microphone access to record your notes.");
          return;
        }
      }
      
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      console.log('Starting recording..');
      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
      setRecording(recording);
      setIsRecording(true);
    } catch (err) {
      console.error('Failed to start recording', err);
      Alert.alert("Error", "Could not start recording.");
    }
  }

  async function stopRecording() {
    if (!recording) return;

    setIsRecording(false);
    setIsTranscribing(true);
    
    try {
      await recording.stopAndUnloadAsync();
      const uri = recording.getURI();
      
      if (!uri) throw new Error("No recording URI found");

      // 1. Get upload URL
      const postUrl = await generateUploadUrl();

      // 2. Fetch the audio file
      const response = await fetch(uri);
      const blob = await response.blob();

      // 3. Upload to Convex Storage
      const result = await fetch(postUrl, {
        method: "POST",
        headers: { "Content-Type": blob.type },
        body: blob,
      });
      const { storageId } = (await result.json()) as { storageId: Id<"_storage"> };

      // 4. Transcribe
      const text = await transcribeAction({ storageId });

      // 5. Save entry
      await addEntry({
        text,
        audioStorageId: storageId,
      });

      Alert.alert("Entry Saved", "Maggie has transcribed your note into the vault.");
    } catch (err) {
      console.error('Failed to process recording', err);
      Alert.alert("Error", "Transcription failed. Your note was not saved.");
    } finally {
      setIsTranscribing(false);
      setRecording(null);
    }
  }

  if (!isPremium) {
    return (
      <SafeAreaView edges={["top"]} className="flex-1 bg-background">
        <ScrollView className="flex-1" contentContainerClassName="p-6 gap-8 justify-center items-center py-20">
          <View className="w-full h-56 rounded-3xl overflow-hidden mb-2 shadow-lg">
            <Image 
              source={{ uri: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800&h=400' }}
              className="w-full h-full"
            />
            <View className="absolute inset-0 bg-black/40 items-center justify-center">
              <Lock className="w-20 h-20 text-white opacity-80" />
            </View>
          </View>
          <View className="items-center">
            <Text variant="h1" className="text-center font-bold mb-2">Secure Journal Vault</Text>
            <Text variant="p" className="text-center text-muted-foreground px-6">
              A private, encrypted space to document your experiences, feelings, and evidence.
            </Text>
          </View>

          <Card className="w-full border-primary/20 bg-primary/5">
            <CardContent className="p-6 gap-4">
              <View className="flex-row items-center gap-3">
                <ShieldCheck className="w-5 h-5 text-primary" />
                <Text className="font-semibold">End-to-End Encrypted</Text>
              </View>
              <View className="flex-row items-center gap-3">
                <Mic className="w-5 h-5 text-primary" />
                <Text className="font-semibold">Voice-to-Text Documentation</Text>
              </View>
              <View className="flex-row items-center gap-3">
                <History className="w-5 h-5 text-primary" />
                <Text className="font-semibold">Time-stamped Records</Text>
              </View>
            </CardContent>
          </Card>

          <Button size="lg" className="w-full" onPress={async () => {
            if (offerings?.availablePackages?.[0]) {
              await purchasePackage(offerings.availablePackages[0]);
            } else {
              Alert.alert("Premium Feature", "Upgrade to ClearHeart Premium to unlock your secure vault.");
            }
          }}>
            <Text>Unlock Vault ($6.50/mo)</Text>
          </Button>
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView edges={["top"]} className="flex-1 bg-background">
      <ScrollView className="flex-1" contentContainerClassName="p-6 gap-6">
        <View className="flex-row justify-between items-center">
          <View>
            <Text variant="h1" className="text-primary font-bold">Your Vault</Text>
            <Text variant="small" className="text-muted-foreground">Secure & Encrypted</Text>
          </View>
          <Button size="icon" variant="outline">
            <Plus className="w-6 h-6 text-primary" />
          </Button>
        </View>

        <Card className="border-primary/20">
          <CardHeader>
            <CardTitle className="text-lg"><Text>New Journal Entry</Text></CardTitle>
            <CardDescription><Text>Speak your truth. I'll transcribe it for you.</Text></CardDescription>
          </CardHeader>
          <CardContent className="gap-4">
            <View className="h-40 bg-secondary/5 rounded-lg border border-dashed border-border items-center justify-center">
              {isTranscribing ? (
                <View className="items-center gap-4">
                  <Spinner size="large" />
                  <Text className="text-primary font-bold text-lg">Maggie is listening back...</Text>
                </View>
              ) : isRecording ? (
                <View className="items-center gap-4">
                   <View className="bg-destructive/10 p-6 rounded-full">
                    <View className="bg-destructive w-4 h-4 rounded-full" />
                  </View>
                  <Text className="text-destructive font-bold text-lg">Recording...</Text>
                </View>
              ) : (
                <Button variant="ghost" className="h-full w-full" onPress={startRecording}>
                  <View className="items-center gap-2">
                    <Mic className="w-12 h-12 text-primary" />
                    <Text className="text-muted-foreground font-medium">Tap to start recording</Text>
                  </View>
                </Button>
              )}
            </View>
            {isRecording && (
              <Button variant="destructive" size="lg" className="flex-row gap-2" onPress={stopRecording}>
                <Square className="w-4 h-4 text-destructive-foreground fill-current" />
                <Text>Stop & Transcribe</Text>
              </Button>
            )}
          </CardContent>
        </Card>

        <View className="gap-4 pb-10">
          <Text variant="h3">Evidence Log</Text>
          {entries.length === 0 && !isTranscribing && (
            <Card className="border-dashed bg-transparent items-center py-10">
              <Text className="text-muted-foreground">No entries yet. Start recording above.</Text>
            </Card>
          )}
          {entries.map((entry) => (
            <Card key={entry._id} className="overflow-hidden">
              <View className="p-4 bg-primary/5 border-b border-primary/10 flex-row justify-between items-center">
                <View className="flex-row items-center gap-2">
                  <FileText className="w-4 h-4 text-primary" />
                  <Text className="font-bold text-primary">Voice Entry</Text>
                </View>
                <Text variant="small" className="text-muted-foreground">
                  {new Date(entry.createdAt).toLocaleDateString()} • {new Date(entry.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </Text>
              </View>
              <CardContent className="p-4">
                <Text variant="p" className="text-foreground leading-relaxed">
                  {entry.text}
                </Text>
                <View className="flex-row gap-2 mt-4">
                  {entry.audioStorageId && (
                    <Button variant="outline" size="sm" className="flex-row gap-2">
                      <Play className="w-3 h-3 text-foreground fill-current" />
                      <Text>Play Audio</Text>
                    </Button>
                  )}
                  <Button variant="ghost" size="sm" className="flex-row gap-2" onPress={() => removeEntry({ id: entry._id })}>
                    <Trash2 className="w-3 h-3 text-destructive" />
                    <Text className="text-destructive">Delete</Text>
                  </Button>
                </View>
              </CardContent>
            </Card>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
