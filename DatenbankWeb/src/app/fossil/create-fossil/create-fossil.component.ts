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

  imageFile!: File;
  modelFile!: File;

  constructor(
    private FossilService: FossilsService,
    private router: Router,
    ) { }
    
    ngOnInit(): void {
    }

    async onFormSubmit(): Promise<void> {
      const values = this.myForm.value;
      const newFossil = new FormData();
      
      newFossil.append("title", values.title);
      newFossil.append("description", values.description)
      newFossil.append("age", values.age)
      newFossil.append("owner", "gc7irch4qhq8jz0")
      newFossil.append("image", this.imageFile);
      newFossil.append("model", this.modelFile);

      const id = await this.FossilService.addFossil(newFossil)

      this.router.navigate(['/', 'fossil', id]);
    }

    onImageSelected(event:any) {
      this.imageFile = event.target.files[0];
    }
    onModelSelected(event:any) {
      this.modelFile = event.target.files[0];
    }
}
