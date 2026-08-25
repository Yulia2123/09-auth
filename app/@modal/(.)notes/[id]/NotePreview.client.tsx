"use client";

type Props = {
  id: string;
};

export default function NotePreview({ id }: Props) {
  return (
    <div>
      <h1>Note preview</h1>
      <p>Note ID: {id}</p>
    </div>
  );
}
