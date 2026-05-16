export type User = {
  id: string;
  name: string;
  firstName: string;
  course: string;
  cpf: string;
  ra: string;
  validity: string;
  avatarUrl: string | null;
};

export type ClassSession = {
  id: string;
  subject: string;
  teacher: string;
  room: string;
  startsAt: string; // HH:mm
};

export type CanvasActivity = {
  id: string;
  course: string;
  title: string;
  description: string;
};

export type AppEvent = {
  id: string;
  title: string;
  date: string;
  location?: string;
};

export type NewsItem = {
  id: string;
  title: string;
  excerpt: string;
  imageUrl: string;
  publishedAt: string;
};

export type MenuItemKey =
  | "notifications"
  | "settings"
  | "help"
  | "report"
  | "logout";
