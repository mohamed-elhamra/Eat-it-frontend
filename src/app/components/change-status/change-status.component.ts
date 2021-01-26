import { OrderService } from './../../services/order.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-change-status',
  templateUrl: './change-status.component.html',
  styleUrls: ['./change-status.component.css'],
})
export class ChangeStatusComponent implements OnInit {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private orderService: OrderService,
    private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data,
    public dialogRef: MatDialogRef<ChangeStatusComponent>
  ) {}

  ngOnInit(): void {
    console.log(this.data.orderId);
    this.form = this.fb.group({
      status: ['', [Validators.required]],
    });
  }

  onSave() {
    this.orderService
      .updateStatus(this.data.orderId, this.status.value)
      .subscribe(
        (res) => {
          this.toastr.success(
            `Order status was updated successfully`,
            'Eat it'
          );
        },
        (err) => {
          this.toastr.error('Something went wrong, try later', 'Eat it');
        }
      );
    this.dialogRef.close(this.status.value);
  }

  onClose() {
    this.dialogRef.close();
  }

  get status() {
    return this.form.get('status');
  }
}
