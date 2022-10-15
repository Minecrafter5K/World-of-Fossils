import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { FossilsService } from 'src/app/services/fossils.service';

import { Fossil } from 'src/app/stuff/fossil';

@Component({
  selector: 'app-fossil-details',
  templateUrl: './fossil-details.component.html',
  styleUrls: ['./fossil-details.component.scss']
})
export class FossilDetailsComponent implements OnInit {
  fossil!: Fossil;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: FossilsService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(async (params) => {
      const id: string = params.get('id')!;
      const fossil = await this.service.getFossilDetails(id);

      if (typeof fossil != 'undefined') {
        this.fossil = fossil as unknown as Fossil;
      } else {
        this.router.navigate(['404'], {skipLocationChange: true});
      }
    });
  }
}
