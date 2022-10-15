import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { FossilsService } from '../services/fossils.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  @ViewChild('f') myForm!: NgForm;
  
  async onFormSubmit(): Promise<void> {
    const vaules = this.myForm.value;

    const id = await this.FossilService.addFossil(vaules.title, vaules.desc);
    this.router.navigate(['/', 'fossil', id]);
  }

  constructor(
    private FossilService: FossilsService,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

}
