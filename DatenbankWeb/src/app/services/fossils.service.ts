import { Injectable } from '@angular/core';
import PocketBase from 'pocketbase';
import { Record } from "pocketbase";
import { environment } from 'src/environments/environment';
import { Fossil } from '../models/fossil';
import { NewFossil } from '../models/newFossil';
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
      const fossil: Record = await this.client.collection('fossils').getOne(id);
      return fossil;
    } catch (error) {
      console.log("error");
      return new Record();
    }
  }

  // get list of fossils
  async getFossils(page?: number, itemPerPage?: number, sort?: string): Promise<Fossil[]> {
    try {
      const response = await this.client.collection('fossils').getList(page, itemPerPage, { sort: sort });

      console.log(response);

      const fossils = response.items.map(fossil => {
        fossil['imageURL'] = this.getImgURLs(fossil.id, fossil['image'], "?thumb=120x120");
        return fossil;
      });

      return fossils as unknown as Fossil[];
    } catch (error) {
      console.log("error in getFossils");
      return [];
    }
  }

  // create new fossil
  async addFossil(formData: NewFossil): Promise<string> {
    const { id } = await this.client.collection('fossils').create(formData);
    return id;
  }

  getImgURLs(fossilID: string, imgNames: string[], thumb: string): string[] {
    return imgNames.map(imgName => {
      return environment.pocketbase_url + "api/files/fossils/" + fossilID + "/" + imgName + thumb;
    });
  }
}
