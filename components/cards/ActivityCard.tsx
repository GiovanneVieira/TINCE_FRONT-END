import { Pressable, Text, View } from "react-native";
import { ChevronRight } from "lucide-react-native";
import type { CanvasActivity } from "@/types";

type ActivityCardProps = {
  activity: CanvasActivity;
  onPress?: () => void;
  width?: number;
};

export function ActivityCard({ activity, onPress, width }: ActivityCardProps) {
  return (
    <Pressable
      onPress={onPress}
      style={width ? { width } : undefined}
      className="bg-surface rounded-2xl p-4 mr-3 active:opacity-70"
    >
      <View className="flex-row items-start justify-between mb-2">
        <Text
          className="text-foreground text-base font-semibold flex-1 mr-2"
          numberOfLines={1}
        >
          {activity.course}
        </Text>
        <ChevronRight size={20} color="#A1A1A1" />
      </View>
      <Text
        className="text-muted-foreground text-sm leading-5"
        numberOfLines={2}
      >
        {activity.description}
      </Text>
    </Pressable>
  );
}
