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

  constructor(
    private FossilService: FossilsService,
    private router: Router,
    ) { }
    
    ngOnInit(): void {
    }

    async onFormSubmit(): Promise<void> {
      const values = this.myForm.value;
 
      const id = await this.FossilService.addFossil({
        title: values.title,
        description: values.description,
        age: values.age,
        owner: "gc7irch4qhq8jz0"
      });
      this.router.navigate(['/', 'fossil', id]);
    }
}
