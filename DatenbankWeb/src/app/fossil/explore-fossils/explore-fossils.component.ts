import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FossilsService } from '../../services/fossils.service';
import { Fossil } from '../../models/fossil';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-explore',
  templateUrl: './explore-fossils.component.html',
  styleUrls: ['./explore-fossils.component.scss'],
})
export class ExploreFossilsComponent implements OnInit {
  fossils?: Fossil[];
  sortBy = new FormControl('');

  currentPage: number = 1;
  currentSort: string = 'id';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private FossilService: FossilsService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(async (params) => {
      this.currentPage = parseInt(params.get('page')!);
      this.currentSort = params.get('sortby')!;
      this.sortBy.setValue(this.currentSort);
    });
    this.getFossils();
    this.onFilterChanges();
  }

  async getFossils(): Promise<void> {
    this.fossils = await this.FossilService.getFossils(
      this.currentPage,
      15,
      this.currentSort
    );
    console.log(this.fossils); // TODO remove
  }

  onFilterChanges(): void {
    this.sortBy.valueChanges.subscribe((value) => {
      if (value) this.currentSort = value;
      this.router.navigate(['explore', this.currentPage, this.currentSort]);
      this.getFossils();
    });
  }
}
