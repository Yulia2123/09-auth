"use client";

type Props = {
  id: string;
};

export default function NoteDetails({ id }: Props) {
  return (
    <div>
      <h1>Note details</h1>
      <p>Note ID: {id}</p>
    </div>
  );
}
