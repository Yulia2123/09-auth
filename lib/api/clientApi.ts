import { api } from "./api";
import type { Note } from "@/types/note";
import type { User } from "@/types/user";

export interface NotesResponse {
  notes: Note[];
  totalPages: number;
}

export interface RegisterRequest {
  email: string;
  password: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface UpdateMeRequest {
  username: string;
}

export async function fetchNotes(
  search?: string,
  page = 1,
  tag?: string
): Promise<NotesResponse> {
  const { data } = await api.get<NotesResponse>("/notes", {
    params: {
      search,
      page,
      perPage: 12,
      tag,
    },
  });

  return data;
}

export async function fetchNoteById(id: string): Promise<Note> {
  const { data } = await api.get<Note>(`/notes/${id}`);

  return data;
}

export async function createNote(note: {
  title: string;
  content: string;
  tag: string;
}): Promise<Note> {
  const { data } = await api.post<Note>("/notes", note);

  return data;
}

export async function deleteNote(id: string): Promise<Note> {
  const { data } = await api.delete<Note>(`/notes/${id}`);

  return data;
}

export async function register(credentials: RegisterRequest): Promise<User> {
  const { data } = await api.post<User>("/auth/register", credentials);

  return data;
}

export async function login(credentials: LoginRequest): Promise<User> {
  const { data } = await api.post<User>("/auth/login", credentials);

  return data;
}

export async function logout(): Promise<void> {
  await api.post("/auth/logout");
}

export async function checkSession(): Promise<User | null> {
  try {
    const { data } = await api.get<User | null>("/auth/session");

    return data;
  } catch {
    return null;
  }
}

export async function getMe(): Promise<User> {
  const { data } = await api.get<User>("/users/me");

  return data;
}

export async function updateMe(username: string): Promise<User> {
  const { data } = await api.patch<User>("/users/me", {
    username,
  });

  return data;
}
