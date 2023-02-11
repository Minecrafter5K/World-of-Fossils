import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FossilsService } from 'src/app/services/fossils.service';

import { Fossil } from 'src/app/models/fossil';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-fossil-details',
  templateUrl: './fossil-details.component.html',
  styleUrls: ['./fossil-details.component.scss']
})
export class FossilDetailsComponent implements OnInit {
  fossil!: Fossil;
  // fossilOwner?: User;
  currentImg: number = 0;
  
  imgUrl?: string;
  
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fossilService: FossilsService,
    private authService: AuthService,
    ) { }
    
    ngOnInit(): void {
      this.route.paramMap.subscribe(async (params) => {
        const id: string = params.get('id')!;
        const fossil = await this.fossilService.getFossilDetails(id);

        if (typeof fossil != 'undefined') {
          this.fossil = fossil as unknown as Fossil;
          this.imgUrl = environment.pocketbase_url + "api/files/fossils/" + this.fossil.id + "/" + this.fossil.image[this.currentImg];
        } else {
          this.router.navigate(['404'], {skipLocationChange: true});
        }
      });
      // this.initialize();
    }
    
  //   async initialize(): Promise<void> {
  //     setTimeout(async () => {
  //     this.fossilOwner = await this.authService.getUser(this.fossil.owner_id);
  //     console.log(this.fossilOwner);
  //     console.log("SIS");
  //   }, 2000);
  // }

  nextImg(): void {
    if (this.currentImg < this.fossil.image.length - 1) {
      this.currentImg ++;
      this.imgUrl = environment.pocketbase_url + "api/files/fossils/" + this.fossil.id + "/" + this.fossil.image[this.currentImg];
    }
  }
  beforeImg(): void {
    if (this.currentImg >= 0) {
      this.currentImg --;
      this.imgUrl = environment.pocketbase_url + "api/files/fossils/" + this.fossil.id + "/" + this.fossil.image[this.currentImg];
    }    
  }
}
