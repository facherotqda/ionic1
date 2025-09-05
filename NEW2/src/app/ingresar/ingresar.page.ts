
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonItem, IonLabel, IonInput, IonButton, IonCard, IonCardHeader, IonCardTitle, IonCardContent, AlertController } from '@ionic/angular/standalone';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ingresar',
  templateUrl: './ingresar.page.html',
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, IonItem, IonLabel, IonInput, IonButton, IonCard, IonCardHeader, IonCardTitle, IonCardContent, CommonModule, FormsModule]
})
export class IngresarPage implements OnInit {

  usuario: string = '';
  contrasena: string = '';


  constructor(private alertCtrl: AlertController, private router: Router) { }

  ngOnInit() { }


  async ingresar() {
    const alert = await this.alertCtrl.create({
      header: 'Datos ingresados',
      message: `Usuario: ${this.usuario}<br>Contraseña: ${this.contrasena}`,
      buttons: ['OK'],
    });
    await alert.present();
  }

  goHome() {
    this.router.navigate(['/home']);
  }

  goRegistrar() {
    this.router.navigate(['/registrar']);
  }

}