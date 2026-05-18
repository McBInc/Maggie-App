import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useVideoPlayer, VideoView } from 'expo-video';
import { Spinner } from './spinner';

interface MuxPlayerProps {
  playbackId: string;
  className?: string;
}

export const MuxPlayer = ({ playbackId, className }: MuxPlayerProps) => {
  const videoSource = `https://stream.mux.com/${playbackId}.m3u8`;
  
  const player = useVideoPlayer(videoSource, (player) => {
    player.loop = false;
    player.play();
  });

  return (
    <View className={className}>
      <VideoView
        style={styles.video}
        player={player}
        allowsFullscreen
        allowsPictureInPicture
      />
    </View>
  );
};

const styles = StyleSheet.create({
  video: {
    width: '100%',
    aspectRatio: 16 / 9,
    backgroundColor: '#000',
    borderRadius: 12,
  },
});
