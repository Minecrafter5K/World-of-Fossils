import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { FossilsService } from '../../services/fossils.service';

@Component({
  selector: 'app-create',
  templateUrl: './create-fossil.component.html',
  styleUrls: ['./create-fossil.component.scss']
})
export class CreateFossilComponent implements OnInit {
  @ViewChild('f') myForm!: NgForm;
  @ViewChild('img') imgForm!: NgForm;
  
  onImageChange(): void {
    const img = this.imgForm.value.img;
    console.log(img);
  }

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
