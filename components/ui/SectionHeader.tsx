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
      className={cn("flex-row items-center justify-between", className)}
    >
      <Text className="text-[#6F6F74] text-[19px] leading-[25px] font-semibold tracking-tight">
        {title}
      </Text>
      <ChevronRight size={25} color="#7C7C81" strokeWidth={2.1} />
    </Pressable>
  );
}
