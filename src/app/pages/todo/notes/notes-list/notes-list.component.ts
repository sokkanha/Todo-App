import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NotesDetailsComponent } from '../notes-details/notes-details.component';
import { Notes, NotesService } from '../../../../services/notes.service';

@Component({
  selector: 'app-notes-list',
  standalone: false,
  templateUrl: './notes-list.component.html',
  styleUrl: './notes-list.component.scss'
})
export class NotesListComponent implements OnInit{
  public notesItems:Notes[] = [];
  constructor(
    private dialog: MatDialog,
    private noteService:NotesService
  ) {}

  ngOnInit(): void {
    this.getData();
  }

  private getData() {
    this.noteService.list().subscribe(res => {
      if(!res) {return;}
      this.notesItems = res;
      console.log(res)
    })
  }

  public deleteById(id:any) {
    this.noteService.delete(id).subscribe(() =>{
      this.getData();
    });
  }

  public openDialog(id?: number) {
     const dialogRef = this.dialog.open(NotesDetailsComponent, {
       data: { id: id }
     });
     dialogRef.afterClosed().subscribe(() => {
       this.getData();
     });
   }
}
