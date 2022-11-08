import { Injectable } from '@angular/core';
import PocketBase from 'pocketbase';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  client!: PocketBase;

  async authUser(email: string, pass: string): Promise<void> {
    await this.client.users.authViaEmail(email, pass);
  }

  logout(): void {
    this.client.authStore.clear();
  }

  constructor() {
    this.client = new PocketBase('http://127.0.0.1:8090');
   }
}
