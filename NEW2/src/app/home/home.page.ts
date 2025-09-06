import { Component, OnInit } from '@angular/core';
import { CredencialesService } from '../../services/credenciales.service';
import { IonicModule, NavController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonicModule],
})
export class HomePage implements OnInit {
  usuarioActual: any = null;
  nombreCompleto: string = '';

  constructor(
    private credencialesService: CredencialesService,
    private navCtrl: NavController
  ) {}

  ngOnInit(): void {
    this.usuarioActual = this.credencialesService.getUsuarioActual();
    if (this.usuarioActual) {
      this.nombreCompleto = (this.usuarioActual.nombre || '') + ' ' + (this.usuarioActual.apellido || '');
    }
    console.log('Usuario actual:', this.usuarioActual);
  }

  cerrarSesion() {
    this.credencialesService.setUsuarioActual(null);
    this.navCtrl.navigateRoot(['/ingresar']);
  }
}
