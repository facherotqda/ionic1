// Función simple para generar un uuid v4
function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SupabaseDbService {
  async validarUsuario(email: string, contrasenia: string): Promise<boolean> {
    const { data, error } = await this.supabase
      .from('usuarios')
      .select('id')
      .eq('email', email)
      .eq('contrasenia', contrasenia)
      .maybeSingle();
    if (error && error.code !== 'PGRST116') throw error;
    return !!data;
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

  async registrarUsuarioSimple(nombre: string, apellido: string, edad: number, email: string, contrasenia: string) {
    const user_auth_id = uuidv4();
    const { error } = await this.supabase
      .from('usuarios')
      .insert([{ nombre, apellido, edad, email, contrasenia, fec_generacion: new Date().toISOString(), user_auth_id }]);
    if (error) throw error;
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
