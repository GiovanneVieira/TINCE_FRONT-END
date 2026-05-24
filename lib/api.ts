import type { ClassSession, CanvasActivity, AppEvent, NewsItem } from "@/types";

export const api = {
  async fetchClasses(): Promise<ClassSession[]> {
    return [];
  },

  async fetchCanvas(): Promise<CanvasActivity[]> {
    return [];
  },

  async fetchEvents(): Promise<AppEvent[]> {
    return [];
  },

  async fetchNews(): Promise<NewsItem[]> {
    return [];
  },

  async sendEmergency(payload: {
    location?: string;
    message: string;
  }): Promise<{ ok: true; id: string }> {
    void payload;
    throw new Error("Emergency endpoint not configured");
  },
};
