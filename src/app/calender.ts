export interface NewNote {
  label: number;
  data: Array<Note>;
}
export interface Note {
  id: number;
  title: string;
  summary?: string;
  labels: number[];
  startDate: number;
  endDate: number;
  startDateFormatted: string;
}
export interface Notes {
  notes: [Note];
}
export interface NoteLabel {
  id: number;
  text: string;
}
