import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FossilsService } from '../services/fossils.service';
import { Fossil } from '../stuff/fossil';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.scss']
})
export class ExploreComponent implements OnInit {
  fossils!: Fossil[];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private FossilService: FossilsService
  ) { }

  ngOnInit(): void {
    this.getFossils();
  }

  getFossils(): void {
    this.route.queryParams.subscribe(async params => {
      const page: number | undefined = params['page'];
      const sort: string | undefined = params['sortby'];
      const response = await this.FossilService.getFossils(page, 2, sort);
      const fossils = response.items;
      this.fossils = fossils as unknown as Fossil[];      
    });
  }
}
