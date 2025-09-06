  import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SupabaseDbService } from '../../services/supabase-db.service';
import { User } from '@supabase/supabase-js';
import { CredencialesService } from '../../services/credenciales.service';
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
  contrasenia: string = '';
  errores: { [key: string]: string } = {};

  mensajeTexto: string = '';
  mensajeTipo: 'success' | 'error' = 'success';
  mensajeVisible: boolean = false;

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

  constructor(private router: Router, private supabaseDb: SupabaseDbService, private credencialesService: CredencialesService) { }

  ngOnInit() {}

  validarEdad() {
    if (this.edad === null || isNaN(Number(this.edad)) || this.edad < 18 || this.edad > 110) {
      this.errores['edad'] = 'Debe ser un número entre 18 y 110.';
    } else {
      delete this.errores['edad'];
    }
  }

  async registrar() {
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
    // Correo: debe tener @ y terminar en .com
    if (!this.email.includes('@') || !this.email.endsWith('.com')) {
      let mensaje = '';
      if (!this.email.includes('@')) mensaje += 'Debe contener @ ';
      if (!this.email.endsWith('.com')) mensaje += 'Debe terminar en .com.';
      this.errores['email'] = mensaje.trim();
    }
    // Contraseña: alfanumérica (puede contener letras y números)
    if (!/^[A-Za-z0-9]+$/.test(this.contrasenia)) {
      this.errores['contrasenia'] = 'Solo letras y números.';
    }
    if (Object.keys(this.errores).length > 0) {
      return;
    }

    // Validar si el email ya existe en la base de datos
    try {
      const existe = await this.supabaseDb.existeEmail(this.email);
      if (existe) {
        this.errores['email'] = 'El email ya está registrado.';
        return;
      }
      // Registrar usuario en Supabase
      const { user } = await this.supabaseDb.registrarUsuarioSimple(
        this.nombre,
        this.apellido,
        this.edad!,
        this.email,
        this.contrasenia
      );
      // Guardar usuario actual en el servicio
      this.credencialesService.setUsuarioActual(user as User);
      this.mensajeTexto = 'Registro exitoso. Redirigiendo a inicio...';
      this.mensajeTipo = 'success';
      this.mensajeVisible = true;
      setTimeout(() => {
        this.router.navigate(['/home']);
      }, 1200);
    } catch (e: any) {
      this.mensajeTexto = e.message || 'Ocurrió un error inesperado.';
      this.mensajeTipo = 'error';
      this.mensajeVisible = true;
    }
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
