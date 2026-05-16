import { useQuery, useMutation } from "@tanstack/react-query";
import { api } from "@/lib/api";

export const queryKeys = {
  classes: ["classes"] as const,
  canvas: ["canvas"] as const,
  events: ["events"] as const,
  news: ["news"] as const,
};

export function useClasses() {
  return useQuery({
    queryKey: queryKeys.classes,
    queryFn: api.fetchClasses,
  });
}

export function useCanvas() {
  return useQuery({
    queryKey: queryKeys.canvas,
    queryFn: api.fetchCanvas,
  });
}

export function useEvents() {
  return useQuery({
    queryKey: queryKeys.events,
    queryFn: api.fetchEvents,
  });
}

export function useNews() {
  return useQuery({
    queryKey: queryKeys.news,
    queryFn: api.fetchNews,
  });
}

export function useEmergencyMutation() {
  return useMutation({
    mutationFn: api.sendEmergency,
  });
}
