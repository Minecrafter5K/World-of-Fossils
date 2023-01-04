import { Injectable } from '@angular/core';
import PocketBase, { BaseAuthStore, User } from 'pocketbase';
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

  async createUser(email: string, password: string, passwordConfirm: string): Promise<string> {
    const user = await this.client.users.create({
      email: email,
      password: password,
      passwordConfirm: passwordConfirm,
    });
    return user.id;
  }

  logout(): void {
    this.client.authStore.clear();
  }

  get getCurrentUser(): BaseAuthStore {
    return this.client.authStore;
  }

  getUser(id: string): Promise<User> {
    return this.client.users.getOne(id);
  }
}
