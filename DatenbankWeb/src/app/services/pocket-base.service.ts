import { Injectable } from '@angular/core';
import PocketBase from 'pocketbase';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PocketBaseService {
  client: PocketBase;

  constructor() {
    this.client = new PocketBase(environment.pocketbase_url);
  }
}
