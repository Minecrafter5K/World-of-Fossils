import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FossilsService } from 'src/app/services/fossils.service';

import { Fossil } from 'src/app/models/Fossil';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-fossil-details',
  templateUrl: './fossil-details.component.html',
  styleUrls: ['./fossil-details.component.scss']
})
export class FossilDetailsComponent implements OnInit {
  fossil?: Fossil;
  currentImg: number = 0;

  constructor(
    private route: ActivatedRoute,
    private fossilService: FossilsService,
    ) { }

    ngOnInit(): void {
      this.getFossil()
    }

    async getFossil(): Promise<void> {
      this.route.paramMap.subscribe(async (params) => {
        const id: string = params.get('id')!;
        this.fossil = await this.fossilService.getFossilDetails(id);
        console.log(this.fossil);

      });
    }


  nextImg(): void {
    if (this.fossil && this.currentImg < this.fossil.image.length - 1) {
      this.currentImg ++;
    }
  }

  beforeImg(): void {
    if (this.fossil && this.currentImg >= 0) {
      this.currentImg --;
    }
  }
}
