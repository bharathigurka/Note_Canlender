import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { CalenderService } from '../calender.service';
import { DialogComponent } from '../dialog/dialog.component';
import { NewNote, NoteLabel, Notes } from '../calender';

@Component({
  selector: 'app-categorie-component',
  templateUrl: './categorie-component.component.html',
  styleUrls: ['./categorie-component.component.scss'],
})
export class CategorieComponentComponent implements OnInit {
  public segregatedData: any = [];
  forMattedData: any = [];
  dataList: any = [];
  @Input() WeekDates: any;
  @Input() selectedNote: any;
  displayedColumns: string[] = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
  displayedColumns1: string[] = ['Types'];

  dataSource = new MatTableDataSource<NewNote>();
  dataSourceTwo = new MatTableDataSource<NoteLabel>();

  constructor(public dialog: MatDialog, private service: CalenderService) {}

  ngOnInit(): void {
    this.service.getNotesList().subscribe((data: Notes) => {
      let bh = data;
      bh.notes.forEach((a) => {
        this.forMattedData.push({
          ...a,
          startDateFormatted:
            new Date(a.startDate).getDate() +
            '.' +
            Number(new Date(a.startDate).getMonth() + 1),
          durationInDays: Math.ceil(
            (a.endDate - a.startDate) / 1000 / 60 / 60 / 24,
          ),
        });
      });
      this.service.getNoteLabelList().subscribe((noteLabel: NoteLabel) => {
        this.dataList = noteLabel;
        this.dataSourceTwo = this.dataList;
        this.filterData(this.forMattedData, this.WeekDates, this.dataList);
      });
    });
  }
  ngOnChanges() {}
  filterData(data: [], date: string[] = [], labels: []) {
    let segregatedDataList: any = [];
    labels.forEach((eachLabel: any) => {
      segregatedDataList.push({
        labelId: eachLabel.id,
        data: data.filter((e: any) => {
          if (
            date.indexOf(e.startDateFormatted) > -1 &&
            e.labels.indexOf(eachLabel.id) > -1 &&
            e.durationInDays != 0
          ) {
            return e;
          }
        }),
      });
    });
    this.dataSource = segregatedDataList;

    return segregatedDataList;
  }

  cardWrap(col: string, ele: string, id: string) {
    let oldID = col + ele;
    let newID = '' + id + '' + ele;
    let fragment = document.createDocumentFragment();
    fragment.appendChild(<HTMLElement>document.getElementById(newID));
    let te = <HTMLElement>document.getElementById(oldID);
    te.prepend(fragment);
  }

  pntNote(id: number) {
    console.log(id);
  }

  deleteNote(id: number, ele: number) {
    let data: any = this.dataSource;
    data.forEach((x: any) => {
      if (x.labelId == ele) {
        x.data = x.data.filter((item: any) => item.id != id);
      }
    });
  }
  editNote(list: any, ele: number) {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '50%',
      data: list,
    });
    dialogRef.afterClosed().subscribe((result) => {
      let data: any = this.dataSource;
      data[result.labels - 1].data.forEach((x: any) => {
        if (x.id == result.id) {
          x.title = result.title;
          x.summary = result.title;
        }
      });
    });
  }
}
