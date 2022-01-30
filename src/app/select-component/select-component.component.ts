import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { CalenderService } from '../calender.service';

@Component({
  selector: 'app-select-component',
  templateUrl: './select-component.component.html',
  styleUrls: ['./select-component.component.scss'],
})
export class SelectComponentComponent implements OnInit {
  selectedOption = 4;
  dataList: any = [];
  @Output() selectedType = new EventEmitter();
  constructor(private service: CalenderService) {}

  ngOnInit(): void {
    this.service.getNoteLabelList().subscribe((data) => {
      this.dataList = data;
      const newArray = [{ id: 4, text: 'All' }].concat(this.dataList);
      this.dataList = newArray;
    });
    this.selectedType.emit(this.selectedOption);
  }
  selected(event: MatSelectChange) {
    this.selectedOption = event.value;
    this.selectedType.emit(this.selectedOption);
  }
}
