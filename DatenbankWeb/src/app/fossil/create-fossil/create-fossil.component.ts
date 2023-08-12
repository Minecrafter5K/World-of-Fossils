import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { FossilsService } from '../../services/fossils.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-create',
  templateUrl: './create-fossil.component.html',
  styleUrls: ['./create-fossil.component.scss'],
})
export class CreateFossilComponent implements OnInit {
  @ViewChild('f') myForm!: NgForm;

  imageFile!: File;
  modelFile!: File;
  loading: boolean = false;
  uploadError: boolean = false;
  uploadErrorMessage: string = '';

  constructor(
    private FossilService: FossilsService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {}

  async onFormSubmit(): Promise<void> {
    const userId = this.authService.getUserId;

    if (!userId) {console.log("you need to be logged in"); return};

    const values = this.myForm.value;
    const newFossil = new FormData();

    newFossil.append('title', values.title);
    newFossil.append('description', values.description);
    newFossil.append('age', values.age);
    newFossil.append('owner', userId);
    newFossil.append('image', this.imageFile);
    newFossil.append('model', this.modelFile);

    this.FossilService.addFossil(newFossil).then((id) => {
      this.router.navigate(['/', 'fossil', id]);
    }).catch((error) => {
      this.uploadError = true;
      this.uploadErrorMessage = error.status;
    });

    this.loading = true;
  }

  onImageSelected(event: any) {
    this.imageFile = event.target.files[0];
  }
  onModelSelected(event: any) {
    this.modelFile = event.target.files[0];
  }
}
