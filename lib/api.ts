import type { ClassSession, CanvasActivity, AppEvent, NewsItem } from "@/types";

const wait = (ms = 400) => new Promise((r) => setTimeout(r, ms));

export const api = {
  async fetchClasses(): Promise<ClassSession[]> {
    await wait();
    return [
      {
        id: "c1",
        subject: "Engenharia de Software",
        teacher: "Andreia Leles",
        room: "C34",
        startsAt: "19:00",
      },
      {
        id: "c2",
        subject: "Engenharia de Dados",
        teacher: "Carlos Oliveira",
        room: "B12",
        startsAt: "20:30",
      },
    ];
  },

  async fetchCanvas(): Promise<CanvasActivity[]> {
    await wait();
    return [
      {
        id: "a1",
        course: "Upx - TIC para Cidades Inteligentes",
        title: "Atividade 01",
        description:
          'Atividade 01 - Masterclass "Crise climática e justiça social, com Daffa Pratitya"',
      },
      {
        id: "a2",
        course: "Upx - TIC para Cidades Inteligentes",
        title: "Atividade 02",
        description: "Atividade 02 - Discussão sobre possibilidades de impacto",
      },
    ];
  },

  async fetchEvents(): Promise<AppEvent[]> {
    await wait();
    return [
      {
        id: "e1",
        title: "Semana de Tecnologia",
        date: "2026-05-22T19:00:00",
        location: "Auditório principal",
      },
    ];
  },

  async fetchNews(): Promise<NewsItem[]> {
    await wait();
    return [
      {
        id: "n1",
        title:
          "Conecta 2030: Projeto pioneiro de mobilidade avança em pesquisas com inteligência artificial",
        excerpt:
          "Iniciativa une universidade e indústria para soluções urbanas.",
        imageUrl:
          "https://images.unsplash.com/photo-1581094271901-8022df4466f9?w=600",
        publishedAt: "2026-05-10",
      },
      {
        id: "n2",
        title:
          "UniFacens participa de solenidade de abertura da edição 2026 dos Jogos",
        excerpt: "Comitiva representou a instituição no evento inaugural.",
        imageUrl:
          "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=600",
        publishedAt: "2026-05-08",
      },
    ];
  },

  async sendEmergency(payload: {
    location?: string;
    message: string;
  }): Promise<{ ok: true; id: string }> {
    await wait(600);
    return { ok: true, id: `emg_${Date.now()}` };
  },
};
