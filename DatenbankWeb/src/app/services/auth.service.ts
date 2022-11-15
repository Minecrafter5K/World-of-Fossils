import { Injectable } from '@angular/core';
import PocketBase, { BaseAuthStore } from 'pocketbase';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private client!: PocketBase;

  constructor() {
    this.client = new PocketBase('http://127.0.0.1:8090');
  }
  async authUser(email: string, pass: string): Promise<void> {
    await this.client.users.authViaEmail(email, pass);
  }

  logout(): void {
    this.client.authStore.clear();
  }

  get getUser(): BaseAuthStore {
    return this.client.authStore;
  }  
}
