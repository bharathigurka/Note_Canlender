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
        let start = this.convertUnixFormat(a.startDate);
        let end = this.convertUnixFormat(a.endDate);
        this.forMattedData.push({
          ...a,
          startDateFormatted:
            new Date(start).getDate() +
            '.' +
            Number(new Date(start).getMonth() + 1),
          endDateFormatted:
            new Date(end).getDate() +
            '.' +
            Number(new Date(end).getMonth() + 1),
          durationInDays: this.getDuration(start, end),
        });
      });
      this.service.getNoteLabelList().subscribe((noteLabel: NoteLabel) => {
        this.dataList = noteLabel;
        this.dataSourceTwo = this.dataList;
        this.filterData(this.forMattedData, this.WeekDates, this.dataList);
      });
    });
  }

  convertUnixFormat(val: number) {
    return val * 1000;
  }
  getDuration(start: number, end: number) {
    //  duration for some of the events are 'zero' , i m making it plus one
    //  1+  Math.ceil(
    //     (this.convertUnixFormat(a.endDate) - this.convertUnixFormat(a.startDate)) / (1000 * 60 * 60 * 24),
    //   ),
    let inDays = 1 + Math.floor((end - start) / 86400000);
    let weeks = Math.floor(inDays / 7);
    let days = inDays - weeks * 2;

    var startDay = new Date(start).getDay();
    let endDay = new Date(end).getDay();

    if (startDay - endDay > 1) days = days - 2;
    if (startDay == 0 && endDay != 6) days = days - 1;
    if (endDay == 6 && startDay != 0) days = days - 1;

    return days;
  }
  ngOnChanges() {
    this.filterData(this.forMattedData, this.WeekDates, this.dataList);
  }
  filterData(data: [], date: string[] = [], labels: []) {
    let segregatedDataList: any = [];
    labels.forEach((eachLabel: any) => {
      segregatedDataList.push({
        labelId: eachLabel.id,
        data: data.filter((e: any) => {
          if (
            date.indexOf(e.startDateFormatted) > -1 &&
            e.labels.indexOf(eachLabel.id) > -1
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
    const elements = document.getElementsByClassName('dummyCls');
    while (elements.length > 0) {
      elements[0]?.parentNode?.removeChild(elements[0]);
    }
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
    let dialogRef = this.dialog.open(DialogComponent, {
      width: '50%',
      data: list,
    });
    dialogRef.afterClosed().subscribe((result) => {
      let data: any = this.dataSource;
      data[result.labels[0] - 1].data.forEach((x: any) => {
        if (x.id == result.id) {
          x.title = result.title;
          x.summary = result.summary;
        }
      });
    });
  }
}
