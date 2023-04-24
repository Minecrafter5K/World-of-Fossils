import { Injectable } from '@angular/core';
import PocketBase, { BaseAuthStore } from 'pocketbase';
import { LoginCredentials } from '../models/LoginCredentials';
import { SinginCredentials } from '../models/SinginCredentials';
import { PocketBaseService } from './pocket-base.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private client!: PocketBase;

  constructor(private pocketBaseService: PocketBaseService) {
    this.client = pocketBaseService.client;
  }

  async authUser(credentials: LoginCredentials): Promise<void> {
    await this.client.collection('users').authWithPassword(credentials.email, credentials.password);
  }

  // createUser(credentials: SinginCredentials): Promise<User> {
  //   const user = this.client.users.create({
  //     email: credentials.email,
  //     password: credentials.password1,
  //     passwordConfirm: credentials.password2,
  //   });
  //   return user;
  // }

  logout(): void {
    this.client.authStore.clear();
  }

  get getCurrentUser(): BaseAuthStore {
    return this.client.authStore;
  }

  
  public get isUserValid(): boolean {
    return this.client.authStore.isValid;
  }
  

  // getUser(id: string): Promise<User> {
  //   return this.client.users.getOne(id);
  // }
}
