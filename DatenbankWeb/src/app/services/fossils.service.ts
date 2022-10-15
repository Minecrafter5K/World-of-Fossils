import { Injectable } from '@angular/core';
import PocketBase from 'pocketbase';
import { Record } from "pocketbase";

@Injectable({
  providedIn: 'root'
})
export class FossilsService {

  client!: PocketBase;

  // get details from one fossil
  async getFossilDetails (id: string): Promise<Record | undefined> {
    try {
      const fossil = await this.client.records.getOne("fossils", id);
      return fossil;
    } catch (error) {
      console.log("error");
      return undefined;
    }
  }

  // get list of fossils
  async getFossils (page?: number, itemPerPage?: number, sort?: string): Promise<any> {
    try {
      const fossils = await this.client.records.getList('fossils', page, itemPerPage, {
        sort: sort
      })
      return fossils;
    } catch (error) {
      console.log("error");
      return undefined;
    }
  }

  constructor() {
    this.client = new PocketBase('http://127.0.0.1:8090');
   }
}
