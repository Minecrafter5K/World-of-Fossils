import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FossilsService } from '../../services/fossils.service';
import { Fossil } from '../../models/fossil';

@Component({
  selector: 'app-explore',
  templateUrl: './explore-fossils.component.html',
  styleUrls: ['./explore-fossils.component.scss']
})
export class ExploreFossilsComponent implements OnInit {
  fossils!: Fossil[];

  currentPage: number = 1;
  currentSort: string = "id";

  constructor(
    private route: ActivatedRoute,
    private FossilService: FossilsService
  ) { }

  ngOnInit(): void {
    this.getFossils();
  }

  getFossils(): void {


    this.route.paramMap.subscribe(async (params) => {
      this.currentPage = parseInt(params.get('page')!);
      this.currentSort = params.get('sortby')!;
      const response = await this.FossilService.getFossils(this.currentPage, 15, this.currentSort);
      const fossils = response.items;
      this.fossils = fossils as unknown as Fossil[];      
    });
  }
}
