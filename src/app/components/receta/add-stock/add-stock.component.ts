import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-stock',
  templateUrl: './add-stock.component.html',
  styleUrls: ['./add-stock.component.css']
})
export class AddStockComponent {
  cantidadForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddStockComponent>
  ) {
    this.cantidadForm = this.fb.group({
      cantidad: [10, [Validators.required, Validators.min(10)]]
    });
  }

  confirmar(): void {
    if (this.cantidadForm.valid) {
      this.dialogRef.close(this.cantidadForm.value.cantidad);
    }
  }

  cancelar(): void {
    this.dialogRef.close(null);
  }
}
