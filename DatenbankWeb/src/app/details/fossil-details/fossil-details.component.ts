import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { FossilsService } from 'src/app/services/fossils.service';

@Component({
  selector: 'app-fossil-details',
  templateUrl: './fossil-details.component.html',
  styleUrls: ['./fossil-details.component.scss']
})
export class FossilDetailsComponent implements OnInit {
  fossil$!: Observable<string>;

  constructor(
    private route: ActivatedRoute,
    private service: FossilsService
  ) { }

  ngOnInit(): void {
    this.fossil$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.service.getFossilDetails(params.get('id')!))
    );
    console.log(this.fossil$);
  }

}
