// ...existing code...


import { Injectable } from '@angular/core';
import { SupabaseClient } from '@supabase/supabase-js';
import { SupabaseDbService } from './supabase-db.service';


export interface Usuario {
	id: number;
	nombre: string;
	apellido: string;
	edad: number;
	email: string;
	contrasenia: string;
	fec_generacion: string;
	user_auth_id: string;
}

@Injectable({ providedIn: 'root' })
export class CredencialesService {
	private supabase: SupabaseClient;
		private usuarioActual: Usuario | null = null;
	private datosExtra: any = null;

		constructor(private dbService: SupabaseDbService) {
			this.supabase = dbService.getCliente();
			// Recuperar usuarioActual de localStorage si existe
			const userStr = localStorage.getItem('usuarioActual');
			if (userStr) {
				try {
					this.usuarioActual = JSON.parse(userStr);
				} catch (e) {
					this.usuarioActual = null;
				}
			}
		}



			setUsuarioActual(user: Usuario | null) {
				this.usuarioActual = user;
				if (user) {
					localStorage.setItem('usuarioActual', JSON.stringify(user));
				} else {
					localStorage.removeItem('usuarioActual');
				}
			}

		getUsuarioActual(): Usuario | null {
			return this.usuarioActual;
		}

		setDatosExtra(datos: any) {
			this.datosExtra = datos;
		}

		getDatosExtra(): any {
			return this.datosExtra;
		}

	// ...otros métodos y propiedades...
}
