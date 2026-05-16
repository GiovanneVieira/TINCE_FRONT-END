import { Pressable, Text, View } from "react-native";
import {
  Clock,
  FileText,
  Hand,
  Plus,
  type LucideIcon,
} from "lucide-react-native";

type Action = {
  key: string;
  label: string;
  Icon: LucideIcon;
  onPress?: () => void;
};

type QuickActionsProps = {
  onAulas?: () => void;
  onNotas?: () => void;
  onFaltas?: () => void;
  onVerMais?: () => void;
};

export function QuickActions({
  onAulas,
  onNotas,
  onFaltas,
  onVerMais,
}: QuickActionsProps) {
  const actions: Action[] = [
    { key: "aulas", label: "Aulas", Icon: Clock, onPress: onAulas },
    { key: "notas", label: "Notas", Icon: FileText, onPress: onNotas },
    { key: "faltas", label: "Faltas", Icon: Hand, onPress: onFaltas },
    { key: "vermais", label: "Ver mais", Icon: Plus, onPress: onVerMais },
  ];

  return (
    <View className="flex-row justify-between px-2 my-6">
      {actions.map(({ key, label, Icon, onPress }) => (
        <Pressable
          key={key}
          onPress={onPress}
          className="items-center active:opacity-60"
        >
          <View className="w-16 h-16 rounded-full bg-surface items-center justify-center mb-2">
            <Icon size={28} color="#F5F5F5" />
          </View>
          <Text className="text-foreground text-base">{label}</Text>
        </Pressable>
      ))}
    </View>
  );
}
