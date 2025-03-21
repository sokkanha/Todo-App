import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { notesColor } from '../data/notes-color';
import { map } from 'rxjs';

export interface Notes {
  id?: number;
  title: string;
  text: string,
  date: string;
  color?: { bg: string; color: string };
}

@Injectable({
  providedIn: 'root'
})

export class NotesService {
  private url = 'http://localhost:8080/notes';

  constructor(
    private http:HttpClient
  ) { }

  list() {
    return this.http.get<Notes[]>(this.url).pipe(
      map((notes) => {
        let colorIndex = 0; // Start from the first color
        return notes.map((note) => {
          const color = notesColor[colorIndex]; // Assign current color
          colorIndex = (colorIndex + 1) % notesColor.length; // Move to next color
          return { ...note, color }; // Add color to note
        });
      })
    );
  }
  
  create(data: Notes) {
    return this.http.post<Notes>(this.url, data);
  }
  
  update(id: number, data: Notes) {
    return this.http.put<Notes>(`${this.url}/${id}`, data);
  }  

  delete(id:number) {
    return this.http.delete<Notes>(`${this.url}/${id}`);
  }

  getById(id:number) {
    return this.http.get<Notes>(`${this.url}/${id}`);
  }
}
