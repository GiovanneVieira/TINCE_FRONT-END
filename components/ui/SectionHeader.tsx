import { Pressable, Text, View } from "react-native";
import { ChevronRight } from "lucide-react-native";
import { cn } from "@/lib/utils";

type SectionHeaderProps = {
  title: string;
  onPress?: () => void;
  className?: string;
};

export function SectionHeader({
  title,
  onPress,
  className,
}: SectionHeaderProps) {
  return (
    <Pressable
      onPress={onPress}
      disabled={!onPress}
      className={cn("flex-row items-center justify-between mb-3", className)}
    >
      <Text className="text-muted text-3xl font-bold">{title}</Text>
      {onPress && <ChevronRight size={28} color="#8A8A8A" />}
    </Pressable>
  );
}
