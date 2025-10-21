import axios from "axios";
import type { Note, NoteTag } from "../types/note";

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export interface CreateNoteRequest {
  title: string;
  content: string;
  tag: NoteTag;
}

axios.defaults.baseURL = "https://notehub-public.goit.study/api";
axios.defaults.headers.common["Authorization"] = `Bearer ${
  process.env.NEXT_PUBLIC_NOTEHUB_TOKEN
}`;

export const fetchNotes = async (
  search: string,
  page: number,
  perPage: number
): Promise<FetchNotesResponse> => {
  const { data } = await axios.get<FetchNotesResponse>(
    `/notes?search=${search}&page=${page}&perPage=${perPage}`
  );
  return data;
};

export const createNote = async (request: CreateNoteRequest) => {
  const { data } = await axios.post<Note>("/notes", request);
  return data;
};

export const deleteNote = async (id: string) => {
  const { data } = await axios.delete<Note>(`/notes/${id}`);
  return data;
};

export const fetchNoteById = async (id: string) => {
  const { data } = await axios.get<Note>(`/notes/${id}`);
  return data;
};
