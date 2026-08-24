import axios from "axios";

const baseURL = `${process.env.NEXT_PUBLIC_API_URL}/api`;

export const api = axios.create({
  baseURL: "https://notehub-api.goit.study",
  withCredentials: true,
});

export async function getNotes() {
  const { data } = await api.get("/notes");
  return data;
}

export async function getNote(id: string) {
  const { data } = await api.get(`/notes/${id}`);
  return data;
}

export async function createNote(note: {
  title: string;
  content: string;
  tag: string;
}) {
  const { data } = await api.post("/notes", note);
  return data;
}

export async function updateNote(
  id: string,
  note: {
    title?: string;
    content?: string;
    tag?: string;
  }
) {
  const { data } = await api.patch(`/notes/${id}`, note);
  return data;
}

export async function deleteNote(id: string): Promise<void> {
  await api.delete(`/notes/${id}`);
}
