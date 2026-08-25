"use client";

import type { ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createNote } from "@/lib/api/clientApi";
import { useNoteStore } from "@/lib/store/noteStore";

import css from "./NoteForm.module.css";

type CreateNoteData = {
  title: string;
  content: string;
  tag: string;
};

export default function NoteForm() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { draft, setDraft, clearDraft } = useNoteStore();

  const createNoteMutation = useMutation({
    mutationFn: (note: CreateNoteData) => createNote(note),

    onSuccess: () => {
      clearDraft();

      queryClient.invalidateQueries({
        queryKey: ["notes"],
      });

      router.push("/notes/filter/all");
    },
  });

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    createNoteMutation.mutate({
      title: draft.title,
      content: draft.content,
      tag: draft.tag,
    });
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
    <form onSubmit={handleSubmit} className={css.form}>
      <div className={css.formGroup}>
        <label htmlFor="title">Title</label>

        <input
          id="title"
          name="title"
          type="text"
          value={draft.title}
          onChange={handleTitleChange}
          required
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor="content">Content</label>

        <textarea
          id="content"
          name="content"
          value={draft.content}
          onChange={handleContentChange}
          required
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor="tag">Tag</label>

        <select
          id="tag"
          name="tag"
          value={draft.tag}
          onChange={handleTagChange}
          required
        >
          <option value="">Select tag</option>
          <option value="Todo">Todo</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Meeting">Meeting</option>
          <option value="Shopping">Shopping</option>
        </select>
      </div>

      <div className={css.actions}>
        <button
          type="button"
          onClick={() => router.back()}
          disabled={createNoteMutation.isPending}
        >
          Cancel
        </button>

        <button type="submit" disabled={createNoteMutation.isPending}>
          {createNoteMutation.isPending ? "Creating..." : "Create note"}
        </button>
      </div>

      {createNoteMutation.isError && (
        <p>Failed to create note. Please try again.</p>
      )}
    </form>
  );
}
