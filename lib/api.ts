import axios from 'axios';
import type { Note } from '@/types/note';

const API_URL = 'https://notehub.net.ua/api/notes';
const token = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
  currentPage: number;
}

export interface CreateNoteBody {
  title: string;
  content: string;
  tag?: string;
}

export interface UpdateNoteBody {
  title?: string;
  content?: string;
  tag?: string;
}

// Експорт з псевдонімом для сумісності
export type CreateNotePayload = CreateNoteBody;
export type UpdateNotePayload = UpdateNoteBody;

// Отримання списку нотаток з фільтрацією, пошуком та пагінацією
export async function fetchNotes(params?: {
  page?: number;
  perPage?: number;
  search?: string;
  tag?: string;
}): Promise<FetchNotesResponse> {
  const { page = 1, perPage = 12, search, tag } = params || {};
  const response = await axios.get<FetchNotesResponse>(API_URL, {
    params: {
      page,
      perPage,
      ...(search && { search }),
      ...(tag && { tag }),
    },
  });
  return response.data;
}

// Отримання однієї нотатки за ID
export async function fetchNoteById(id: string): Promise<Note> {
  const response = await axios.get<Note>(`${API_URL}/${id}`);
  return response.data;
}

// Створення нової нотатки
export async function createNote(body: CreateNoteBody): Promise<Note> {
  const response = await axios.post<Note>(API_URL, body);
  return response.data;
}

// Оновлення нотатки
export async function updateNote(
  id: string,
  body: UpdateNoteBody
): Promise<Note> {
  const response = await axios.patch<Note>(`${API_URL}/${id}`, body);
  return response.data;
}

// Видалення нотатки
export async function deleteNote(id: string): Promise<void> {
  await axios.delete<void>(`${API_URL}/${id}`);
}