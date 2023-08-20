import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FossilsService } from 'src/app/services/fossils.service';

import { Fossil } from 'src/app/models/fossil';
import { environment } from 'src/environments/environment';
import { FossilLikeService } from 'src/app/services/fossil-like.service';

@Component({
  selector: 'app-fossil-details',
  templateUrl: './fossil-details.component.html',
  styleUrls: ['./fossil-details.component.scss'],
})
export class FossilDetailsComponent implements OnInit {
  fossil?: Fossil;
  currentImg: number = 0;
  likesAmount: number = 0;
  isLiked: string = 'unliked';

  constructor(
    private route: ActivatedRoute,
    private fossilService: FossilsService,
    private fossilLikeService: FossilLikeService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.getFossil();
  }

  async getFossil(): Promise<void> {
    this.route.paramMap.subscribe(async (params) => {
      if (params.has('id')) {
        const id: string = params.get('id')!;
        this.fossilService.getFossilDetails(id).then((resp) => {
          if (resp.type === 'success') {
            this.fossil = resp.data;
          } else {
            console.log(resp.error);
            this.router.navigate(['/error'], { skipLocationChange: true, queryParams: { code: "500", message: "unexpected error" } });
          }
        });
      }

      this.fossilLikeService
        .getFossilLikesAmount(this.fossil!.id)
        .then(([amount, isLiked]) => {
          this.likesAmount = amount;
          this.isLiked = isLiked ? 'liked' : 'unliked';
        });
    });
  }

  onLike(): void {
    if (this.isLiked === 'unliked') {
      this.fossilLikeService.likeFossil(this.fossil!.id);
      this.likesAmount++;
      this.isLiked = 'liked';
    }
  }

  nextImg(): void {
    if (this.fossil && this.currentImg < this.fossil.image.length - 1) {
      this.currentImg++;
    }
  }

  beforeImg(): void {
    if (this.fossil && this.currentImg >= 0) {
      this.currentImg--;
    }
  }
}
