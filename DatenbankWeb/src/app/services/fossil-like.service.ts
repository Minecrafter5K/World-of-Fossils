import { Injectable } from '@angular/core';
import PocketBase from 'pocketbase';
import { AuthService } from './auth.service';
import { PocketBaseService } from './pocket-base.service';
import { FossilLike } from '../models/fossilLike';

@Injectable({
  providedIn: 'root',
})
export class FossilLikeService {
  client: PocketBase;

  constructor(
    private pocketBaseService: PocketBaseService,
    private authService: AuthService
  ) {
    this.client = pocketBaseService.client;
  }

  async getFossilLikesAmount(fossilId: string): Promise<[number, boolean]> {
    const allLikes = (await this.client
      .collection('fossilLikes')
      .getFullList()) as unknown as FossilLike[];
    const likes = allLikes.filter((like) => {
      return like.fossil === fossilId;
    });
    return [likes.length, likes.some((like) => like.user === this.authService.getCurrentUser.model?.id)];
  }

  likeFossil(id: string) {
    if (this.authService.getCurrentUser.model?.id) {
      const fossilLike: FossilLike = {
        fossil: id,
        user: this.authService.getCurrentUser.model?.id,
      };
      this.client.collection('fossilLikes').create(fossilLike);
    }
  }
}
