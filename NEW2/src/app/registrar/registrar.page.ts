  import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonItem, IonLabel, IonInput, IonButton } from '@ionic/angular/standalone';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.page.html',
  styleUrls: ['./registrar.page.scss'],
  standalone: true,
  imports: [
    IonContent, IonHeader, IonTitle, IonToolbar,
    IonCard, IonCardHeader, IonCardTitle, IonCardContent,
    IonItem, IonLabel, IonInput, IonButton,
    CommonModule, FormsModule
  ]
})
export class RegistrarPage implements OnInit {
  nombre: string = '';
  apellido: string = '';
  edad: number | null = null;
  email: string = '';
  contrasena: string = '';
  errores: { [key: string]: string } = {};

  validarEmail() {
    let mensaje = '';
    if (!this.email.includes('@')) {
      mensaje += 'Debe contener @ ';
    }
    if (!this.email.endsWith('.com')) {
      mensaje += 'Debe terminar en .com.';
    }
    if (mensaje) {
      this.errores['email'] = mensaje.trim();
    } else {
      delete this.errores['email'];
    }
  }

  constructor(private router: Router) { }

  ngOnInit() {}

  validarEdad() {
    if (this.edad === null || isNaN(Number(this.edad)) || this.edad < 18 || this.edad > 110) {
      this.errores['edad'] = 'Debe ser un número entre 18 y 110.';
    } else {
      delete this.errores['edad'];
    }
  }

  registrar() {
    this.errores = {};
    // Validar nombre y apellido: solo letras y espacios
    const soloLetras = /^[A-Za-zÁÉÍÓÚáéíóúÑñ ]+$/;
    if (!this.nombre.match(soloLetras)) {
      this.errores['nombre'] = 'Solo letras y espacios.';
    }
    if (!this.apellido.match(soloLetras)) {
      this.errores['apellido'] = 'Solo letras y espacios.';
    }
    // Edad: solo números y >= 18
    if (this.edad === null || isNaN(Number(this.edad)) || this.edad < 18 || this.edad > 110) {
      this.errores['edad'] = 'Debe ser un número entre 18 y 110.';
    }
    // Correo: debe tener @
    if (!/^\S+@\S+\.com$/.test(this.email)) {
      this.errores['email'] = 'El correo debe contener @ y terminar en .com';
    }
    // Contraseña: alfanumérica (puede contener letras y números)
    if (!/^[A-Za-z0-9]+$/.test(this.contrasena)) {
      this.errores['contrasena'] = 'Solo letras y números.';
    }
    if (Object.keys(this.errores).length > 0) {
      return;
    }
    // Aquí irá la lógica de registro
    console.log('Datos:', this.nombre, this.apellido, this.edad, this.email, this.contrasena);
  }

  soloLetrasInput(event: any, campo: 'nombre' | 'apellido') {
    const input = event?.target as HTMLInputElement;
    if (!input) return;
    const valor = input.value;
    // Solo letras y espacios
    const soloLetras = /^[A-Za-zÁÉÍÓÚáéíóúÑñ ]*$/;
    if (!soloLetras.test(valor)) {
      // Eliminar los caracteres no válidos
      input.value = valor.replace(/[^A-Za-zÁÉÍÓÚáéíóúÑñ ]/g, '');
      if (campo === 'nombre') this.nombre = input.value;
      if (campo === 'apellido') this.apellido = input.value;
    }
  }

  goIngresar() {
    this.router.navigate(['/ingresar']);
  }
}
