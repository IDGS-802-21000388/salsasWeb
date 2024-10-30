import { Component, OnInit } from '@angular/core';
import { EncuestaSatisfaccionService } from '../../../services/encuesta-satisfaccion.service';
import { EncuestaSatisfaccion } from '../../../interfaces/encuesta-satisfaccion';
import { MatDialogRef } from '@angular/material/dialog';
import { VentumService } from '../../../services/ventum.service';
import { EmailService } from '../../../services/email.service';
import { DetalleVentumService } from '../../../services/detalle-ventum.service';
import { Venta, DetalleVentum } from '../../../interfaces/ventaCompleta';

@Component({
  selector: 'app-encuesta-satisfaccion',
  templateUrl: './encuesta-satisfaccion.component.html',
  styleUrls: ['./encuesta-satisfaccion.component.css']
})
export class EncuestaSatisfaccionComponent implements OnInit {

  encuesta: EncuestaSatisfaccion = {
    idEncuesta: 0,
    idUsuario: 0,
    idVenta: 0,
    procesoCompra: 0,
    saborProducto: 0,
    entregaProducto: 0,
    presentacionProducto: 0,
    facilidadUsoPagina: 0,
    fechaEncuesta: new Date().toISOString()
  };

  detallesVenta: DetalleVentum[] = [];
  estrellas: number[] = [1, 2, 3, 4, 5];

  loggedUser: any;
  idUltimaVenta: number | undefined;

  constructor(
    private encuestaService: EncuestaSatisfaccionService,
    private dialogRef: MatDialogRef<EncuestaSatisfaccionComponent>,
    private ventumService: VentumService,
    private detalleVentumService: DetalleVentumService,
    private emailService: EmailService
  ) { }

  ngOnInit(): void {
    const userData = localStorage.getItem('loggedUser');
    this.loggedUser = userData ? JSON.parse(userData) : null;

    this.getUltimaVenta(this.loggedUser.idUsuario);
  }

  getUltimaVenta(idUsuario: number): void {
    this.ventumService.getVentas().subscribe((ventas: Venta[]) => {
      const ventasUsuario = ventas.filter(venta => venta.idUsuario === idUsuario);
      if (ventasUsuario.length > 0) {
        this.idUltimaVenta = ventasUsuario.sort((a, b) => (b.fechaVenta > a.fechaVenta ? 1 : -1))[0].idVenta;
  
        if (this.idUltimaVenta !== undefined) {
          this.encuesta.idVenta = this.idUltimaVenta;
          this.encuesta.idUsuario = this.loggedUser.idUsuario;
          this.getDetallesVenta(this.idUltimaVenta);
        } else {
          console.error('No se encontró la última venta. No se puede asignar idVenta.');
        }
      } else {
        console.error('No hay ventas disponibles para el usuario.');
      }
    });
  }
  

  getDetallesVenta(idVenta: number): void {
    this.detalleVentumService.getDetallesVenta().subscribe((detalles: DetalleVentum[]) => {
      this.detallesVenta = detalles.filter(detalle => detalle.idVenta === idVenta);
    });
  }

  onSubmit(): void {
    this.encuestaService.createEncuesta(this.encuesta).subscribe(response => {
      console.log('Encuesta enviada con éxito', response);
      
      this.sendEmailWithResults();

      this.dialogRef.close();
    }, error => {
      console.error('Error al enviar la encuesta', error);
    });
  }

  sendEmailWithResults(): void {
    const templateParams = {
      to_name: this.loggedUser.nombre,
      from_name: 'Tu nombre o nombre de la tienda',
      email: this.loggedUser.correo,
      message: `Resultados de la encuesta: ${JSON.stringify(this.encuesta)}\nDetalles de la venta: ${JSON.stringify(this.detallesVenta)}`
    };

    this.emailService.sendVerificationCode(templateParams.to_name, templateParams.from_name, templateParams.email, templateParams.message)
      .then(() => {
        console.log('Correo enviado con éxito');
      })
      .catch((error) => {
        console.error('Error al enviar el correo:', error);
      });
  }

  onCancel(): void {
    const fechaActual = new Date().toISOString();
    localStorage.setItem('fechaCancelacionEncuesta', fechaActual);
    
    console.log('Encuesta cancelada. Fecha guardada en Local Storage:', fechaActual);
    
    this.dialogRef.close();
  }
}
