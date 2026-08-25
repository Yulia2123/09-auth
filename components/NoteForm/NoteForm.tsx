"use client";

import type { ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";

import { createNote } from "@/lib/api/clientApi";
import { useNoteStore } from "@/lib/store/noteStore";

import css from "./NoteForm.module.css";

export default function NoteForm() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { draft, setDraft, clearDraft } = useNoteStore();

  const handleSubmit = async (formData: FormData) => {
    const title = String(formData.get("title") ?? "");
    const content = String(formData.get("content") ?? "");
    const tag = String(formData.get("tag") ?? "Todo");

    await createNote({
      title,
      content,
      tag,
    });

    clearDraft();

    queryClient.invalidateQueries({
      queryKey: ["notes"],
    });

    router.push("/notes/filter/all");
  };

  const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setDraft({
      title: event.target.value,
    });
  };

  const handleContentChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setDraft({
      content: event.target.value,
    });
  };

  const handleTagChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setDraft({
      tag: event.target.value,
    });
  };

  return (
    <form action={handleSubmit} className={css.form}>
      <div className={css.formGroup}>
        <label htmlFor="title">Title</label>

        <input
          id="title"
          name="title"
          type="text"
          defaultValue={draft.title}
          onChange={handleTitleChange}
          required
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor="content">Content</label>

        <textarea
          id="content"
          name="content"
          defaultValue={draft.content}
          onChange={handleContentChange}
          required
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor="tag">Tag</label>

        <select
          id="tag"
          name="tag"
          defaultValue={draft.tag}
          onChange={handleTagChange}
        >
          <option value="Todo">Todo</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Meeting">Meeting</option>
          <option value="Shopping">Shopping</option>
        </select>
      </div>

      <div className={css.actions}>
        <button type="button" onClick={() => router.back()}>
          Cancel
        </button>

        <button type="submit">Create note</button>
      </div>
    </form>
  );
}
