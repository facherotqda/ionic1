


import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonItem, IonLabel, IonInput, IonButton, IonCard, IonCardHeader, IonCardTitle, IonCardContent, AlertController } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { SupabaseDbService } from '../../services/supabase-db.service';
import { CredencialesService } from '../../services/credenciales.service';

@Component({
  selector: 'app-ingresar',
  templateUrl: './ingresar.page.html',
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, IonItem, IonLabel, IonInput, IonButton, IonCard, IonCardHeader, IonCardTitle, IonCardContent, CommonModule, FormsModule]
})
export class IngresarPage implements OnInit {

  usuario: string = '';
  contrasenia: string = '';

  // Login rápido para usuarios de prueba
  async loginRapido(email: string) {
    this.usuario = email;
    this.contrasenia = '123456';
    await this.ingresar();
  }


  constructor(private alertCtrl: AlertController, private router: Router, private supabaseDb: SupabaseDbService, private credencialesService: CredencialesService) { }

  ngOnInit() { }


  async ingresar() {
    // Login directo a la tabla usuarios
    const { user, valido } = await this.supabaseDb.validarUsuario(this.usuario, this.contrasenia);
    if (valido && user) {
      this.credencialesService.setUsuarioActual(user);
      this.router.navigate(['/home']);
    } else {
      const alert = await this.alertCtrl.create({
        header: 'Error',
        message: 'Usuario o contraseña incorrectos',
        buttons: ['OK'],
      });
      await alert.present();
    }
  }

  goHome() {
    this.router.navigate(['/home']);
  }

  goRegistrar() {
    this.router.navigate(['/registrar']);
  }

}