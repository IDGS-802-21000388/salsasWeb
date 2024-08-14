import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-pedido-detalle-modal',
  template: `
    <mat-card class="m-4 border rounded-lg relative" style="background-color: #f7f5f2; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
      <button class="close-button" style="position: absolute; top: 10px; right: 10px; background: none; border: none; font-size: 1.5rem; cursor: pointer; color: #e4007c;" (click)="onClose()">
        &times;
      </button>
      <mat-card-title class="underline m-4" style="color: #217765; font-size: 1.25rem;">Detalles del Pedido</mat-card-title>
      <mat-card-content>
        <div class="m-4" style="display: flex; flex-direction: column; gap: 1rem;">
          <div>
            <strong style="color: #217765;">Cliente:</strong> {{ data.detalle.nombreCliente }}
          </div>
          <div>
            <strong style="color: #217765;">Domicilio:</strong> {{ data.detalle.domicilio }}
          </div>
          <div>
            <strong style="color: #217765;">Productos:</strong>
            <ul>
              <li *ngFor="let producto of data.detalle.productos.split(', ')">{{ producto }}</li>
            </ul>
          </div>
          <div>
            <strong style="color: #217765;">Total:</strong> {{ data.detalle.total | currency }}
          </div>
        </div>
        <div class="flex justify-end mt-4" style="gap: 1rem;">
          <button class="mr-2 mb-2" mat-button (click)="onClose()" style="color: #e4007c;">Cerrar</button>
        </div>
      </mat-card-content>
    </mat-card>
  `,
  styles: []
})
export class PedidoDetalleModalComponent {
  constructor(
    public dialogRef: MatDialogRef<PedidoDetalleModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onClose(): void {
    this.dialogRef.close();
  }
}
