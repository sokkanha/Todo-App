import { Component, Inject, OnInit } from '@angular/core';
import { NotesService } from '../../../../services/notes.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-notes-details',
  standalone: false,
  templateUrl: './notes-details.component.html',
  styleUrl: './notes-details.component.scss'
})
export class NotesDetailsComponent implements OnInit{
  public notesData = { 
    title: '', 
    date: new Date().toString(), 
    text: ''
  }
  private noteId: any;
  constructor(
    private NotesService: NotesService,
    @Inject(MAT_DIALOG_DATA) public data: {id: number}
  ){
    this.noteId = data.id;
  }

  ngOnInit(): void {
    if(this.noteId) {
      this.getById(this.noteId);
    }
  }

  public save() {
    if(!this.notesData) {
      return;
    }
    this.noteId ? this.edit() : this.add();
  }

  private add() {
    this.NotesService.create(this.notesData).subscribe(res => {
      if(!res) {return;}
    })
  }

  private edit() {
    this.NotesService.update(this.noteId, this.notesData).subscribe((res)=> {
      if(!res) {return;}
    });
  }

  private getById(id:number) {
    this.NotesService.getById(id).subscribe((res) => {
      this.notesData = {
        title: res.title,
        text: res.text,
        date: res.date
      }
    })
  }
}
