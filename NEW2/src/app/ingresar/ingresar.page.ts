
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonItem, IonLabel, IonInput, IonButton, IonCard, IonCardHeader, IonCardTitle, IonCardContent, AlertController } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { SupabaseDbService } from '../../services/supabase-db.service';
import { User } from '@supabase/supabase-js';
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


  constructor(private alertCtrl: AlertController, private router: Router, private supabaseDb: SupabaseDbService, private credencialesService: CredencialesService) { }

  ngOnInit() { }


  async ingresar() {
    // Validar usuario y contraseña contra Supabase
    const { user, valido } = await this.supabaseDb.validarUsuario(this.usuario, this.contrasenia);
    if (valido && user) {
      // Guardar usuario actual en el servicio
      this.credencialesService.setUsuarioActual(user as User);
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