import { Injectable } from '@angular/core';
import PocketBase, { ClientResponseError, Record } from 'pocketbase';
import { environment } from 'src/environments/environment';
import { Fossil } from '../models/fossil';
import { AuthService } from './auth.service';
import { PocketBaseService } from './pocket-base.service';
import { ErrorableResponse } from '../models/errors';
import { parse, string } from 'valibot';
import { locationSchema } from '../models/location';

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
  async getFossilDetails(id: string): Promise<ErrorableResponse<Fossil, unknown>> {
    try {
      const fossil: Record = await this.client.collection('fossils').getOne(id);
      fossil['imageURL'] = this.getImgURLs(fossil.id, fossil['image']);
      fossil['owner'] = await this.authService.getUser(fossil['owner']);

      try {
        fossil['location'] = parse(locationSchema, fossil['location'])
      } catch (error) {
        fossil['location'] = undefined;
      }

      return {
        type: 'success',
        data: fossil as unknown as Fossil,
      };
    }
    catch (error) {
      console.log('error', error);
      return {
        type: 'error',
        error: error,
      };
    }
  }

  // get list of fossils
  async getFossils(
    page?: number,
    itemPerPage?: number,
    sort?: string
  ): Promise<Fossil[]> {
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
  }

  // create new fossil
  async addFossil(newFossil: FormData): Promise<ErrorableResponse<string, ClientResponseError>> {
    const res = await this.client
      .collection('fossils')
      .create(newFossil)
      .then((response) => {
        return {
          type: 'success',
          data: response.id,
        } satisfies ErrorableResponse<string, ClientResponseError>;
      })
      .catch((error: ClientResponseError) => {
        return {
          type: 'error',
          error: error,
        } satisfies ErrorableResponse<string, ClientResponseError>;
      });
    return res;
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
