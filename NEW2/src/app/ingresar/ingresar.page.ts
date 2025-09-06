
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonItem, IonLabel, IonInput, IonButton, IonCard, IonCardHeader, IonCardTitle, IonCardContent, AlertController } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { SupabaseDbService } from '../../services/supabase-db.service';

@Component({
  selector: 'app-ingresar',
  templateUrl: './ingresar.page.html',
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, IonItem, IonLabel, IonInput, IonButton, IonCard, IonCardHeader, IonCardTitle, IonCardContent, CommonModule, FormsModule]
})
export class IngresarPage implements OnInit {

  usuario: string = '';
  contrasenia: string = '';


  constructor(private alertCtrl: AlertController, private router: Router, private supabaseDb: SupabaseDbService) { }

  ngOnInit() { }


  async ingresar() {
    // Validar usuario y contraseña contra Supabase
  const valido = await this.supabaseDb.validarUsuario(this.usuario, this.contrasenia);
    if (valido) {
      const alert = await this.alertCtrl.create({
        header: 'Ingreso exitoso',
        message: 'Bienvenido/a',
        buttons: ['OK'],
      });
      await alert.present();
      // Redirigir si se desea
      // this.router.navigate(['/home']);
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