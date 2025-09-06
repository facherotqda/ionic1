import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SupabaseDbService {
  // Login directo a la tabla usuarios
  async validarUsuario(email: string, contrasenia: string): Promise<{ user: any | null, valido: boolean }> {
    const { data, error } = await this.supabase
      .from('usuarios')
      .select('*')
      .eq('email', email)
      .eq('contrasenia', contrasenia)
      .maybeSingle();
    if (error && error.code !== 'PGRST116') throw error;
    return { user: data || null, valido: !!data };
  }
  async existeEmail(email: string): Promise<boolean> {
    const { data, error } = await this.supabase
      .from('usuarios')
      .select('id')
      .eq('email', email)
      .maybeSingle();
    if (error && error.code !== 'PGRST116') throw error;
    return !!data;
  }
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(environment.apiUrl, environment.publicAnonKey);
  }

  // Registro directo a la tabla usuarios
  async registrarUsuarioSimple(nombre: string, apellido: string, edad: number, email: string, contrasenia: string): Promise<{ user: any }> {
    const user_auth_id = uuidv4();
    const { error } = await this.supabase
      .from('usuarios')
      .insert([{ nombre, apellido, edad, email, contrasenia, fec_generacion: new Date().toISOString(), user_auth_id }]);
    if (error) throw error;
    // Obtener el usuario recién insertado
    const { data, error: errorSelect } = await this.supabase
      .from('usuarios')
      .select('*')
      .eq('email', email)
      .eq('user_auth_id', user_auth_id)
      .maybeSingle();
    if (errorSelect) throw errorSelect;
    return { user: data };
  }
  // Obtener usuario autenticado actual


  // Obtener datos extra del usuario desde la tabla usuarios
  async obtenerDatosUsuario(user_auth_id: string): Promise<any> {
    const { data, error } = await this.supabase
      .from('usuarios')
      .select('*')
      .eq('user_auth_id', user_auth_id)
      .maybeSingle();
    if (error) throw error;
    return data;
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





  getCliente() {
    return this.supabase;
  }
}

// Función simple para generar un uuid v4
function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}
