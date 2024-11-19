import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Producto } from '../../../interfaces/productos';
import { CartService } from '../../../services/cart.service'; // Verifica la ruta

@Component({
  selector: 'app-producto-modal',
  templateUrl: './producto-modal.component.html',
  styleUrls: ['./producto-modal.component.css']
})
export class ProductoModalComponent {
  productos: Producto[] = [];
  salsaKey: string;
  selectedProducto: Producto | null = null; // Producto seleccionado
  cantidadSeleccionada: number = 1; // Cantidad para productos individuales
  cantidadCajas: number = 1; // Cantidad para cajas
  esCaja: boolean = false; // Bandera para saber si seleccionaron caja
  tipoCajaSeleccionada: number | null = null; // Tamaño de la caja seleccionada (6, 12, 24)

  constructor(
    public dialogRef: MatDialogRef<ProductoModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private cartService: CartService
  ) {
    this.productos = data.productos;
    this.salsaKey = data.salsaKey;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  // Cuando se selecciona un producto (tamaño de salsa)
  onSizeSelected(producto: Producto): void {
    this.selectedProducto = producto;
    this.cantidadSeleccionada = 1; // Resetear cantidad para salsas individuales
    this.esCaja = false; // Resetear caja si se selecciona una salsa individual
    this.tipoCajaSeleccionada = null; // Resetear tamaño de caja
  }

  // Cuando se selecciona el tipo de producto (Individual o Caja)
  onTipoProductoSeleccionado(tipo: string): void {
    this.esCaja = tipo === 'caja';
    this.tipoCajaSeleccionada = null; // Resetear tamaño de caja
    this.cantidadCajas = 1; // Resetear cantidad de cajas
    this.cantidadSeleccionada = 1; // Resetear cantidad de salsas
  }

  // Cuando se selecciona un tamaño de caja (6, 12, 24)
  setCaja(tamano: number): void {
    this.tipoCajaSeleccionada = tamano;
  }

  // Método para agregar al carrito
  addToCart(): void {
    let cantidadFinal = this.cantidadSeleccionada;
    if (this.esCaja && this.tipoCajaSeleccionada !== null) {
      cantidadFinal = this.cantidadCajas * this.tipoCajaSeleccionada; // Calcular cantidad total de salsas
    }

    if (this.selectedProducto) {
      this.cartService.addToCart(this.selectedProducto, cantidadFinal);
      this.dialogRef.close();
    }
  }

  // Validar la entrada de números en el campo de cantidad
  validateInput(event: KeyboardEvent): void {
    const charCode = event.which ? event.which : event.keyCode;
    // Permitir solo números (0-9) y teclas de control como "Backspace"
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      event.preventDefault();
    }
  }

  // Función para obtener la unidad de la cantidad de producto
  getUnit(cantidad: number): string {
    return Number.isInteger(cantidad) ? 'g' : 'lt';
  }

}
