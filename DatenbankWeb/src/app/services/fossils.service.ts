import { Injectable } from '@angular/core';
import PocketBase, { Record } from 'pocketbase';
import { environment } from 'src/environments/environment';
import { Fossil } from '../models/fossil';
import { AuthService } from './auth.service';
import { PocketBaseService } from './pocket-base.service';

@Injectable({
  providedIn: 'root',
})
export class FossilsService {
  client: PocketBase;

  constructor(
    private pocketBaseService: PocketBaseService,
    private authService: AuthService
  ) {
    this.client = pocketBaseService.client;
  }

  // get details from one fossil
  async getFossilDetails(id: string): Promise<Fossil | undefined> {
    try {
      const fossil: Record = await this.client.collection('fossils').getOne(id);
      fossil['imageURL'] = this.getImgURLs(fossil.id, fossil['image']);
      fossil['owner'] = await this.authService.getUser(fossil['owner']);
      return fossil as unknown as Fossil;
    } catch (error) {
      console.log('error', error);
      return undefined;
    }
  }

  // get list of fossils
  async getFossils(
    page?: number,
    itemPerPage?: number,
    sort?: string
  ): Promise<Fossil[] | undefined> {
    try {
      const response = await this.client
        .collection('fossils')
        .getList(page, itemPerPage, { sort: sort });

      const fossils = response.items.map(async (fossil) => {
        fossil['imageURL'] = this.getImgURLs(
          fossil.id,
          fossil['image'],
          '?thumb=120x120'
        );
        fossil['owner'] = await this.authService.getUser(fossil['owner']);
        return fossil;
      });

      return (await Promise.all(fossils)) as unknown as Fossil[];
    } catch (error) {
      console.warn('error in getFossils: ', error);
      return undefined;
    }
  }

  // create new fossil
  async addFossil(newFossil: FormData): Promise<string> {
    const { id } = await this.client.collection('fossils').create(newFossil);
    debugger;
    return id;
  }

  getImgURLs(
    fossilID: string,
    imgNames: string[],
    thumb: string = ''
  ): string[] {
    return imgNames.map((imgName) => {
      return (
        environment.pocketbase_url +
        'api/files/fossils/' +
        fossilID +
        '/' +
        imgName +
        thumb
      );
    });
  }
}
