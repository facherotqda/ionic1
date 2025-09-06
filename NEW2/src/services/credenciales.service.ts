// ...existing code...


import { Injectable } from '@angular/core';
import { SupabaseClient, User } from '@supabase/supabase-js';
import { SupabaseDbService } from './supabase-db.service';

@Injectable({ providedIn: 'root' })
export class CredencialesService {
	private supabase: SupabaseClient;
	private usuarioActual: User | null = null;

	constructor(private dbService: SupabaseDbService) {
		this.supabase = dbService.getCliente();
	}

	setUsuarioActual(user: User | null) {
		this.usuarioActual = user;
	}

	getUsuarioActual(): User | null {
		return this.usuarioActual;
	}

	// ...otros métodos y propiedades...
}
