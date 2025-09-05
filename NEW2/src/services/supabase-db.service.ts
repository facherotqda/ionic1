import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
// Make sure the environment file exists at the specified path.
// If your environment file is actually at 'src/environments/environment', update the import as follows:
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SupabaseDbService {
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(environment.apiUrl, environment.publicAnonKey);
  }

    async obtenerUsuarioActual(userAuthId: string) {
    const { data, error } = await this.supabase
      .from('usuarios')
      .select('*')
      .eq('user_auth_id', userAuthId)
      .single();
    if (error) throw error;
    return data;
  }


 async registrarLoginUsuario(userAuthId: string, email: string) {
    const { error } = await this.supabase
      .from('logins')
      .insert([{ user_auth_id: userAuthId, email, fecha_login: new Date().toISOString() }]);
    if (error) throw error;
  }


  getCliente() {
    return this.supabase;
  }


  }
