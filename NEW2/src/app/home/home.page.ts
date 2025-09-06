import { Component, OnInit } from '@angular/core';
import { CredencialesService } from '../../services/credenciales.service';
import { User } from '@supabase/supabase-js';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonicModule],
})
export class HomePage implements OnInit {
  usuarioActual: User | null = null;

  constructor(private credencialesService: CredencialesService) {}

  ngOnInit(): void {
    this.usuarioActual = this.credencialesService.getUsuarioActual();
    console.log('Usuario actual:', this.usuarioActual);
  }
}
