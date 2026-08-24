import { create } from "zustand";

type NoteDraft = {
  title: string;
  content: string;
  tag: string;
};

type NoteStore = {
  draft: NoteDraft;

  setDraft: (draft: Partial<NoteDraft>) => void;

  clearDraft: () => void;
};

const initialDraft: NoteDraft = {
  title: "",
  content: "",
  tag: "",
};

export const useNoteStore = create<NoteStore>((set) => ({
  draft: initialDraft,

  setDraft: (draft) =>
    set((state) => ({
      draft: {
        ...state.draft,
        ...draft,
      },
    })),

  clearDraft: () =>
    set({
      draft: initialDraft,
    }),
}));
