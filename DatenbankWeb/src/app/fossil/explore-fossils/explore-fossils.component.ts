import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FossilsService } from '../../services/fossils.service';
import { Fossil } from '../../models/Fossil';

@Component({
  selector: 'app-explore',
  templateUrl: './explore-fossils.component.html',
  styleUrls: ['./explore-fossils.component.scss']
})
export class ExploreFossilsComponent implements OnInit {
  fossils?: Fossil[];

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
      this.fossils = await this.FossilService.getFossils(this.currentPage, 15, this.currentSort);
      console.log(this.fossils); // TODO remove
    });
  }
}
