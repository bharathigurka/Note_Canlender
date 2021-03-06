import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatFormFieldControl } from '@angular/material/form-field';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
  providers: [{ provide: MatFormFieldControl, useExisting: DialogComponent }],
})
export class DialogComponent implements OnInit {
  formGroup: FormGroup;
  post: any = '';
  title: string = '';
  summary: String = '';
  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
  ) {
    this.formGroup = this.formBuilder.group({
      id: new FormControl(this.data.id),
      title: new FormControl(this.data.title),
      summary: new FormControl(this.data.summary),
      labels: new FormControl(this.data.labels),
    });
  }
  onCancel(): void {
    this.dialogRef.close(this.post);
  }
  ngOnInit(): void {
    this.post = this.data;
  }

  onSubmit(post: any) {
    this.post = post;
    this.onCancel();
  }
}
