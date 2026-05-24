import { Pressable, ScrollView, Text, View, useWindowDimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { ChevronLeft, ChevronRight, CircleHelp } from "lucide-react-native";

type GradeCell = {
  key: string;
  label: string;
  value: string;
  highlight?: boolean;
};

type SubjectGrade = {
  id: string;
  subject: string;
  cells: GradeCell[];
};

// API slot: replace by backend payload later.
const TERM_LABEL = "2026/01";

// API slot: replace by backend payload later.
const SUBJECT_GRADES: SubjectGrade[] = [
  {
    id: "g-1",
    subject: "Eletrônica Digital Computacional",
    cells: [
      { key: "ac1", label: "AC1", value: "8,6" },
      { key: "ac2", label: "AC2", value: "-" },
      { key: "af", label: "AF", value: "-" },
      { key: "sub", label: "Sub", value: "-" },
      { key: "ag", label: "AG", value: "-" },
      { key: "media", label: "Média", value: "-", highlight: true },
    ],
  },
  {
    id: "g-2",
    subject: "Engenharia de Software",
    cells: [
      { key: "ac1", label: "AC1", value: "10" },
      { key: "ac2", label: "AC2", value: "-" },
      { key: "af", label: "AF", value: "-" },
      { key: "sub", label: "Sub", value: "-" },
      { key: "ag", label: "AG", value: "-" },
      { key: "media", label: "Média", value: "-", highlight: true },
    ],
  },
  {
    id: "g-3",
    subject: "Lean Startup e Agile  (ELETIVA 3 / Período:7)",
    cells: [
      { key: "ac1", label: "AC1", value: "9,5" },
      { key: "ac2", label: "AC2", value: "-" },
      { key: "af", label: "AF", value: "-" },
      { key: "sub", label: "Sub", value: "-" },
      { key: "ag", label: "AG", value: "-" },
      { key: "media", label: "Média", value: "-", highlight: true },
    ],
  },
  {
    id: "g-4",
    subject: "Processamento de Imagens",
    cells: [
      { key: "ac1", label: "AC1", value: "9,3" },
      { key: "ac2", label: "AC2", value: "7,1" },
      { key: "af", label: "AF", value: "-" },
      { key: "sub", label: "Sub", value: "-" },
      { key: "ag", label: "AG", value: "-" },
      { key: "media", label: "Média", value: "-", highlight: true },
    ],
  },
  {
    id: "g-5",
    subject: "Upx - TIC para Cidades Inteligentes",
    cells: [
      { key: "ac1", label: "AC1", value: "6" },
      { key: "ac2", label: "AC2", value: "-" },
      { key: "af", label: "AF", value: "-" },
      { key: "sub", label: "Sub", value: "-" },
      { key: "ag", label: "AG", value: "-" },
      { key: "media", label: "Média", value: "-", highlight: true },
    ],
  },
];

export default function NotasScreen() {
  const { width } = useWindowDimensions();

  // 6 cells per row, always visible on screen.
  const horizontalPadding = 40; // px-5 both sides
  const gap = 8;
  const totalGap = gap * 5;
  const cardWidth = Math.max(48, Math.floor((width - horizontalPadding - totalGap) / 6));

  return (
    <SafeAreaView className="flex-1 bg-black" edges={["top"]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 30 }}
      >
        <View className="px-5 pt-3">
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center">
              <Pressable
                onPress={() => router.back()}
                className="w-9 h-9 items-center justify-center active:opacity-70"
              >
                <ChevronLeft size={30} color="#4B4B50" strokeWidth={2.1} />
              </Pressable>
              <Text className="text-[#A0A0A5] text-[18px] font-medium ml-2">
                Notas
              </Text>
            </View>

            <Pressable className="w-9 h-9 rounded-full bg-[#2A2A2D] items-center justify-center active:opacity-70">
              <CircleHelp size={20} color="#B8B8BC" strokeWidth={2.1} />
            </Pressable>
          </View>
        </View>

        <View className="mt-8 items-center">
          <View className="flex-row items-center gap-8">
            <Pressable className="w-8 h-8 items-center justify-center active:opacity-70">
              <ChevronLeft size={26} color="#75757A" />
            </Pressable>

            <View className="h-[74px] min-w-[138px] rounded-[23px] bg-[#242427] items-center justify-center px-7">
              <Text className="text-[#D0D0D4] text-[18px] font-semibold tracking-wide">
                {TERM_LABEL}
              </Text>
            </View>

            <Pressable className="w-8 h-8 items-center justify-center active:opacity-70">
              <ChevronRight size={26} color="#75757A" />
            </Pressable>
          </View>
        </View>

        <Text className="text-[#6E6E73] text-[13px] mt-7 px-5 font-medium">
          Última sincronização às 13:10
        </Text>

        <View className="px-5 mt-7 gap-6">
          {SUBJECT_GRADES.map((item) => (
            <View key={item.id}>
              <Text className="text-[#9D9DA2] text-[16px] font-semibold leading-[24px] mb-3">
                {item.subject}
              </Text>

              <View className="flex-row justify-between">
                {item.cells.map((cell) => (
                  <View
                    key={cell.key}
                    style={{ width: cardWidth }}
                    className={
                      cell.highlight
                        ? "h-[92px] rounded-[14px] bg-[#3E74B8] px-1.5 py-2.5"
                        : "h-[92px] rounded-[14px] bg-[#242427] px-1.5 py-2.5"
                    }
                  >
                    <Text
                      className={
                        cell.highlight
                          ? "text-[#EFF4FD] text-[10px] font-semibold text-center"
                          : "text-[#D2D2D6] text-[10px] font-semibold text-center"
                      }
                    >
                      {cell.label}
                    </Text>
                    <Text
                      className={
                        cell.highlight
                          ? "text-[#EFF4FD] text-[18px] leading-[24px] text-center mt-3"
                          : "text-[#D2D2D6] text-[18px] leading-[24px] text-center mt-3"
                      }
                    >
                      {cell.value}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
