import { cookies } from "next/headers";

import { api } from "./api";
import type { Note } from "@/types/note";
import type { User } from "@/types/user";

export async function fetchNotes(search?: string, page = 1, tag?: string) {
  const cookieStore = await cookies();

  const { data } = await api.get("/notes", {
    params: {
      search,
      page,
      perPage: 12,
      tag,
    },
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  return data;
}

export async function fetchNoteById(id: string): Promise<Note> {
  const cookieStore = await cookies();

  const { data } = await api.get<Note>(`/notes/${id}`, {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  return data;
}

export async function getMe(): Promise<User> {
  const cookieStore = await cookies();

  const { data } = await api.get<User>("/users/me", {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  return data;
}

export async function checkSession(): Promise<User | null> {
  const cookieStore = await cookies();

  try {
    const { data } = await api.get<User | null>("/auth/session", {
      headers: {
        Cookie: cookieStore.toString(),
      },
    });

    return data;
  } catch {
    return null;
  }
}
