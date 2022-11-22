import { Injectable } from '@angular/core';
import PocketBase from 'pocketbase';
import { Record } from "pocketbase";
import { AuthService } from './auth.service';
import { PocketBaseService } from './pocket-base.service';

@Injectable({
  providedIn: 'root'
})
export class FossilsService {

  client: PocketBase;

  constructor(
    private pocketBaseService: PocketBaseService,
    private authService: AuthService,
    ) {
    this.client = pocketBaseService.client;
   }

  // get details from one fossil
  async getFossilDetails(id: string): Promise<Record> {
    try {
      const fossil: Record = await this.client.records.getOne("fossils", id);
      return fossil;
    } catch (error) {
      console.log("error");
      return new Record();
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
      owner: this.authService.getCurrentUser
    })
    return id;
  }
}
