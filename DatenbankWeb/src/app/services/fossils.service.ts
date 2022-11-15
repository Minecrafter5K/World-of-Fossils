import { Injectable } from '@angular/core';
import PocketBase from 'pocketbase';
import { Record } from "pocketbase";
import { PocketBaseService } from './pocket-base.service';

@Injectable({
  providedIn: 'root'
})
export class FossilsService {

  client: PocketBase;

  constructor(private pocketBaseService: PocketBaseService) {
    this.client = pocketBaseService.client;
   }

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
}
