import { Injectable } from '@angular/core';
import emailjs from 'emailjs-com';

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  private userId = 'iHxcTIEwE1O5f0qF0'; // Reemplaza con tu User ID de EmailJS

  constructor() { }

  sendVerificationCode(to_name: string, from_name: string, email: string, code: string): Promise<any> {
    const templateParams = {
      to_name,
      from_name,
      message: `Tu código de verificación es: ${code}`,
      email_id: email
    };

    return emailjs.send('service_1409sl5', 'template_masvj9v', templateParams, this.userId)
      .then((response) => {
        console.log('Email sent successfully:', response);
      }, (error) => {
        console.error('Error sending email:', error);
        throw new Error('Error al enviar el correo electrónico.');
      });
  }
}
