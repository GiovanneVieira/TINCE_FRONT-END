import type { AppEvent, CanvasActivity, ClassSession, NewsItem } from "@/types";

const BASE_URL = "https://nfc-api-w40n.onrender.com";
const APP_ORIGIN = "http://localhost:8081";

export type MateriaResponseDTO = {
  id: string;
  codigo: string;
  nome: string;
  faltaLimite: number | null;
  professorId: string | null;
  professorNome?: string;
  createdAt: string;
};

export type AulaResponseDTO = {
  id: string;
  materiaId: string;
  materiaNome?: string;
  professorNome?: string | null;
  dataHora: string;
  sala: string | null;
  status: "ABERTA" | "FECHADA";
  createdAt: string;
};

export type MatriculaResponseDTO = {
  id: string;
  alunoId: string;
  materiaId: string;
  active: boolean;
  createdAt: string;
  materiaCodigo?: string;
  materiaNome?: string;
};

export type FrequenciaResponseDTO = {
  alunoId: string;
  materiaId: string;
  totalAulasFechadas: number;
  totalPresencas: number;
  frequencia: number;
};

export type FaltaResponseDTO = {
  materiaId: string;
  materiaNome: string;
  codigo: string;
  faltas: number;
  limite: number | null;
};

export type NotaResponseDTO = {
  id: string;
  alunoId: string;
  materiaId: string;
  materiaNome?: string;
  codigo?: string;
  term: string;
  ac1: number | null;
  ac2: number | null;
  af: number | null;
  sub: number | null;
  ag: number | null;
  media: number | null;
  createdAt: string;
};

export type UserResponseDTO = {
  id: string;
  email: string;
  name: string;
  firstName: string;
  RA: string;
  role: "STUDENT" | "TEACHER";
  course: string | null;
  cpf: string | null;
  validity: string | null;
  avatarUrl: string | null;
  createdAt: string;
};

export type SignInInput = {
  email: string;
  password: string;
};

async function http<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${BASE_URL}${path}`, {
    ...init,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers ?? {})
    },
  });

  if (!response.ok) {
    throw new Error(`API error ${response.status}: ${path}`);
  }

  return response.json() as Promise<T>;
}

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

  async getMaterias(): Promise<MateriaResponseDTO[]> {
    return http<MateriaResponseDTO[]>("/materia");
  },

  async getAulasByMateria(materiaId: string): Promise<AulaResponseDTO[]> {
    return http<AulaResponseDTO[]>(`/aula/materia/${materiaId}`);
  },

  async getAulasMe(): Promise<AulaResponseDTO[]> {
    return http<AulaResponseDTO[]>("/aula/me");
  },

  async getMatriculasByAluno(alunoId: string): Promise<MatriculaResponseDTO[]> {
    return http<MatriculaResponseDTO[]>(`/matricula/aluno/${alunoId}`);
  },

  async getFrequencia(
    alunoId: string,
    materiaId: string
  ): Promise<FrequenciaResponseDTO> {
    return http<FrequenciaResponseDTO>(`/presenca/frequencia/${alunoId}/${materiaId}`);
  },

  async getFaltasMe(): Promise<FaltaResponseDTO[]> {
    return http<FaltaResponseDTO[]>("/presenca/faltas/me");
  },

  async getNotasMe(term?: string): Promise<NotaResponseDTO[]> {
    const query = term ? `?term=${encodeURIComponent(term)}` : "";
    return http<NotaResponseDTO[]>(`/nota/me${query}`);
  },

  async getMe(): Promise<UserResponseDTO> {
    return http<UserResponseDTO>("/user/me");
  },

  async signIn(input: SignInInput): Promise<void> {
    await http("/api/auth/sign-in/email", {
      method: "POST",
      headers: {
        Origin: BASE_URL,
      },
      body: JSON.stringify(input),
    });
  },

  async signOut(): Promise<void> {
    await http("/api/auth/sign-out", {
      method: "POST",
      headers: {
        Origin: BASE_URL,
      },
      body: JSON.stringify({}),
    });
  },
};
