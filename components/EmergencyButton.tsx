import { useState } from "react";
import { Alert, Modal, Text, TextInput, View } from "react-native";
import { useForm } from "@tanstack/react-form";
import { z } from "zod";
import { AlertTriangle } from "lucide-react-native";
import { Button } from "@/components/ui/button";
import { useEmergencyMutation } from "@/queries";

const schema = z.object({
  location: z.string(),
  message: z.string().min(3, "Descreva brevemente a situaÃ§Ã£o"),
});

export function EmergencyButton() {
  const [open, setOpen] = useState(false);
  const mutation = useEmergencyMutation();

  const form = useForm({
    defaultValues: { location: "", message: "" },
    validators: {
      onChange: schema
    },
    onSubmit: async ({ value }) => {
      try {
        await mutation.mutateAsync(value);
        setOpen(false);
        Alert.alert(
          "Acionamento enviado",
          "A equipe de seguranÃ§a foi notificada.",
        );
        form.reset();
      } catch {
        Alert.alert("Erro", "NÃ£o foi possÃ­vel enviar. Tente novamente.");
      }
    },
  });

  return (
    <>
      <Button
        variant="danger"
        size="lg"
        onPress={() => setOpen(true)}
        leftIcon={<AlertTriangle size={20} color="#fff" />}
        className="my-3"
      >
        BotÃ£o de EmergÃªncia
      </Button>

      <Modal
        visible={open}
        transparent
        animationType="slide"
        onRequestClose={() => setOpen(false)}
      >
        <View className="flex-1 bg-black/70 justify-end">
          <View className="bg-surface rounded-t-3xl p-6 gap-4">
            <Text className="text-foreground text-xl font-bold">
              BotÃ£o de EmergÃªncia
            </Text>
            <Text className="text-muted-foreground">
              Sua localizaÃ§Ã£o e mensagem serÃ£o enviadas para a equipe de
              seguranÃ§a.
            </Text>

            <form.Field name="location">
              {(field) => (
                <View>
                  <Text className="text-muted-foreground mb-2">
                    LocalizaÃ§Ã£o (opcional)
                  </Text>
                  <TextInput
                    value={field.state.value}
                    onChangeText={field.handleChange}
                    placeholder="Ex.: Bloco C, prÃ³ximo Ã  cantina"
                    placeholderTextColor="#666"
                    className="bg-surface-elevated text-foreground rounded-xl px-4 py-3"
                  />
                </View>
              )}
            </form.Field>

            <form.Field name="message">
              {(field) => (
                <View>
                  <Text className="text-muted-foreground mb-2">
                    O que estÃ¡ acontecendo?
                  </Text>
                  <TextInput
                    value={field.state.value}
                    onChangeText={field.handleChange}
                    placeholder="Descreva a situaÃ§Ã£o"
                    placeholderTextColor="#666"
                    multiline
                    numberOfLines={3}
                    className="bg-surface-elevated text-foreground rounded-xl px-4 py-3 min-h-[80px]"
                  />
                  {field.state.meta.errors?.[0] && (
                    <Text className="text-danger text-sm mt-1">
                      {String(field.state.meta.errors[0])}
                    </Text>
                  )}
                </View>
              )}
            </form.Field>

            <View className="flex-row gap-3 mt-2">
              <Button
                variant="surface"
                className="flex-1"
                onPress={() => setOpen(false)}
              >
                Cancelar
              </Button>
              <Button
                variant="danger"
                className="flex-1"
                loading={mutation.isPending}
                onPress={() => form.handleSubmit()}
              >
                Enviar
              </Button>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
}

