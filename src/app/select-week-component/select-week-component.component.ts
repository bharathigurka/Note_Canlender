import { Component, EventEmitter, OnInit, Output } from '@angular/core';

declare global {
  interface Date {
    getDate(): number;
    getTime(): number;
    setDate(date: number): number;
    getWeek: any;
  }
}

Date.prototype.getWeek = function () {
  let target: any = new Date(this.valueOf());
  let dayNr = (this.getDay() + 6) % 7;
  target.setDate(target.getDate() - dayNr + 3);
  let firstThursday = target.valueOf();
  target.setMonth(0, 1);
  if (target.getDay() != 4) {
    target.setMonth(0, 1 + ((4 - target.getDay() + 7) % 7));
  }
  return 1 + Math.ceil((firstThursday - target) / 604800000);
};

@Component({
  selector: 'app-select-week-component',
  templateUrl: './select-week-component.component.html',
  styleUrls: ['./select-week-component.component.scss'],
})
export class SelectWeekComponentComponent implements OnInit {
  public weekNum: number = 2;
  forweek: any;
  @Output() weekChange = new EventEmitter();
  constructor() {}

  ngOnInit(): void {
    this.getDateRangeOfWeek('right', this.weekNum);
  }
  changeWeek(clickType: string) {}

  getDateRangeOfWeek(clickType: string, weekNo: number) {
    if (clickType === 'left') {
      weekNo = weekNo - 1;
      this.weekNum = weekNo;
    } else if (clickType === 'right') {
      weekNo = weekNo + 1;
      this.weekNum = weekNo;
    }
    let d1: Date = new Date();
    let numOfdaysPastSinceLastMonday = d1.getDay() - 1;
    d1.setDate(d1.getDate() - numOfdaysPastSinceLastMonday);
    let weekNoToday: number = d1.getWeek();
    let weeksInTheFuture: number = weekNo - weekNoToday;
    d1.setDate(d1.getDate() + 7 * weeksInTheFuture);
    this.forweek = [];
    for (let i = 0; i <= 4; i++) {
      let c = new Date(d1.getTime() + i * 3600 * 1000 * 24);
      this.forweek.push(c.getDate() + '.' + (c.getMonth() + 1));
    }
    this.weekChange.emit(this.forweek);
    return this.forweek;
  }
}
