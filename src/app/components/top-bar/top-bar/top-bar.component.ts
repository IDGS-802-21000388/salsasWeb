// top-bar.component.ts
import { Component, Input, OnInit } from '@angular/core';
import { Producto } from '../../../interfaces/productos';
import { MatDialog } from '@angular/material/dialog';
import { CartService } from '../../../services/cart.service';
import { CartComponent } from '../../cart/cart/cart.component';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent implements OnInit {
  @Input() cartItems: Producto[] = [];

  constructor(private dialog: MatDialog, private cartService: CartService) { }

  ngOnInit(): void {
    this.cartItems = this.cartService.getCartItems();
  }

  get cartCount(): number {
    return this.cartItems.length;
  }

  openCart(): void {
    const dialogRef = this.dialog.open(CartComponent, {
      width: '400px',
      data: { cartItems: this.cartItems }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.cartItems = this.cartService.getCartItems();
      }
    });
  }
}