import { Injectable } from '@angular/core';
import PocketBase from 'pocketbase';
import { Record } from "pocketbase";

@Injectable({
  providedIn: 'root'
})
export class FossilsService {

  client!: PocketBase;

  async getFossilDetails (id: string): Promise<Record | undefined> {
    try {
      const fossil = await this.client.records.getOne("fossils", id);
      return fossil;
    } catch (error) {
      console.log("zes");
      return undefined;
    }
  }

  constructor() {
    this.client = new PocketBase('http://127.0.0.1:8090');
   }
}
