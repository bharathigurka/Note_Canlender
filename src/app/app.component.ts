import { Component } from '@angular/core';
import { CalenderService } from './calender.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public WeekDates = [];
  public selectedNotes: string = '';
  title = 'calender';
  constructor() {}
  ngOnInit() {}
  themeToggle(): void {
    document.body.classList.toggle('dark-theme');
  }
  getWeekArryList(week: []) {
    this.WeekDates = week;
  }
  getSelectedVal(val: string) {
    this.selectedNotes = val;
  }
}
