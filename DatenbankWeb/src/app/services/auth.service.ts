import { Injectable } from '@angular/core';
import PocketBase, { BaseAuthStore } from 'pocketbase';
import { environment } from 'src/environments/environment';
import { PocketBaseService } from './pocket-base.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private client!: PocketBase;

  constructor(private pocketBaseService: PocketBaseService) {
    this.client = pocketBaseService.client;
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
