import { Injectable } from '@angular/core';
import PocketBase from 'pocketbase';
import { Record } from "pocketbase";
import { timeInterval } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FossilsService {

  client!: PocketBase;

  // get details from one fossil
  async getFossilDetails(id: string): Promise<Record | undefined> {
    try {
      const fossil = await this.client.records.getOne("fossils", id);
      console.log(fossil);
      
      return fossil;
    } catch (error) {
      console.log("error");
      return undefined;
    }
  }

  // get list of fossils
  async getFossils(page?: number, itemPerPage?: number, sort?: string): Promise<any> {
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

  // create new fossil
  async addFossil(title: string, desc: string): Promise<string> {
    const { id } = await this.client.records.create('fossils', {
      title: title,
      description: desc,
      owner: "tl1ko1ue1zdhfd3"
    })
    return id;
  }

  constructor() {
    this.client = new PocketBase('http://127.0.0.1:8090');
   }
}
