import { Pressable, Text, View } from "react-native";
import { Image } from "expo-image";
import type { NewsItem } from "@/types";

type NewsCardProps = {
  item: NewsItem;
  onPress?: () => void;
  width?: number;
};

export function NewsCard({ item, onPress, width }: NewsCardProps) {
  return (
    <Pressable
      onPress={onPress}
      style={width ? { width } : undefined}
      className="mr-3 active:opacity-70"
    >
      <Image
        source={{ uri: item.imageUrl }}
        contentFit="cover"
      />
      <View className="bg-surface rounded-b-2xl p-4 -mt-3">
        <Text
          className="text-foreground text-base font-medium leading-6 mb-3"
          numberOfLines={3}
        >
          {item.title}
        </Text>
        <Text className="text-muted-foreground text-sm font-semibold">
          Ler mais
        </Text>
      </View>
    </Pressable>
  );
}
