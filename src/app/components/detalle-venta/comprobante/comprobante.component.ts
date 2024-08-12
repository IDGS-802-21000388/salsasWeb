import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-comprobante',
  templateUrl: './comprobante.component.html',
  styleUrls: ['./comprobante.component.css']
})
export class ComprobanteComponent implements OnInit {
  venta: any;
  detalles: any;
  pago: any;
  envio: any;

  constructor(private router: Router) { }

  ngOnInit(): void {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras.state as { venta: any, detalles: any, pago: any, envio: any };
    
    if (state) {
      this.venta = state.venta;
      this.detalles = state.detalles;
      this.pago = state.pago;
      this.envio = state.envio;
    }
  }

  imprimir() {
    window.print();
  }
}
