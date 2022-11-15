import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FossilsService } from '../../services/fossils.service';
import { Fossil } from '../../models/fossil';

@Component({
  selector: 'app-explore',
  templateUrl: './explore-fossils.component.html',
  styleUrls: ['./explore-fossils.component.scss']
})
export class ExploreFossilsComponent implements OnInit {
  fossils!: Fossil[];

  constructor(
    private route: ActivatedRoute,
    private FossilService: FossilsService
  ) { }

  ngOnInit(): void {
    this.getFossils();
  }

  getFossils(): void {
    this.route.queryParams.subscribe(async params => {
      const page: number | undefined = params['page'];
      const sort: string | undefined = params['sortby'];
      const response = await this.FossilService.getFossils(page, 15, sort);
      const fossils = response.items;
      this.fossils = fossils as unknown as Fossil[];      
    });
  }
}
