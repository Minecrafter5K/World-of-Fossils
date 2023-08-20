import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { error } from 'src/app/models/errors';

@Component({
  selector: 'app-not-found',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss'],
})
export class ErrorComponent implements OnInit {
  error: error = { code: '404', message: 'not found' };

  constructor(
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(async (params) => {
      if (params.has('code') && params.has('message')) {
        this.error.code = params.get('code')!;
        this.error.message = params.get('message')!;
        console.log(params.get('code')!, params.get('message')!);
      }
      console.log("wow");
      console.log(params);

    });
  }
}
