import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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
      id: this.data.id,
      title: this.data.title,
      summary: this.data.summary,
      labels: this.data.labels,
    });
  }
  onCancel(): void {
    this.dialogRef.close(this.post);
  }
  ngOnInit(): void {}

  onSubmit(post: any) {
    this.post = post;
    this.onCancel();
  }
}
