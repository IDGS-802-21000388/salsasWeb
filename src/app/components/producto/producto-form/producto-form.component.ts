import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProductoService } from '../../../services/producto.service';
import { AlertService } from '../../../services/alert.service';
import { Producto } from '../../../interfaces/productos';

@Component({
  selector: 'app-producto-form',
  templateUrl: './producto-form.component.html',
  styleUrls: ['./producto-form.component.css']
})
export class ProductoFormComponent implements OnInit {
  productoForm: FormGroup;
  isEditMode = false;
  productoId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private productoService: ProductoService,
    private dialogRef: MatDialogRef<ProductoFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private alertService: AlertService
  ) {
    this.productoForm = this.fb.group({
      idProducto: [null],
      nombreProducto: ['', Validators.required],
      precioVenta: [0, Validators.required],
      precioProduccion: [0, Validators.required],
      idMedida: [null],
      fotografia: [''],
      estatus: [true, Validators.required]
    });

    if (data && data.producto) {
      this.isEditMode = true;
      this.productoId = data.producto.idProducto;
      this.productoForm.patchValue(data.producto);
    }
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.productoForm.valid) {
      const producto: Producto = this.productoForm.value;
      if (this.isEditMode && this.productoId !== null) {
        this.productoService.updateProducto(this.productoId, producto).subscribe(() => {
          this.dialogRef.close(true);
          this.alertService.success('El producto ha sido actualizado exitosamente.', 'Producto Actualizado');
        }, error => {
          console.error('Update error:', error);
          this.alertService.error(`Error al actualizar el producto: ${error.error.message || error.message}`);
        });
      } else {
        const { idProducto, ...productoData } = producto;
        this.productoService.createProducto(productoData as Producto).subscribe(() => {
          this.dialogRef.close(true);
          this.alertService.success('El producto ha sido creado exitosamente.', 'Producto Creado');
        }, error => {
          console.error('Create error:', error);
          this.alertService.error(`Error al crear el producto: ${error.error.message || error.message}`);
        });
      }
    }
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}
