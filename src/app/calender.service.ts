import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { NoteLabel, Notes } from './calender';

@Injectable({
  providedIn: 'root',
})
export class CalenderService {
  private basicURL = 'https://61ee5f30d593d20017dbad98.mockapi.io/pinguin/api/';

  constructor(private http: HttpClient) {}

  getNotesList(): Observable<Notes> {
    return this.http.get<Notes>(this.basicURL + 'notes');
  }
  getNoteLabelList(): Observable<NoteLabel> {
    return this.http.get<NoteLabel>(this.basicURL + 'noteLabels');
  }
}
