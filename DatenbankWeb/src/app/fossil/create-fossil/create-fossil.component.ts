import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { FossilsService } from '../../services/fossils.service';
import { AuthService } from 'src/app/services/auth.service';
import { LocationService } from 'src/app/services/location.service';
import { Location } from 'src/app/models/location';

@Component({
  selector: 'app-create',
  templateUrl: './create-fossil.component.html',
  styleUrls: ['./create-fossil.component.scss'],
})
export class CreateFossilComponent implements OnInit {
  @ViewChild('f') myForm!: NgForm;

  imageFile!: File;
  modelFile!: File;
  location: Location | undefined;
  loading: boolean = false;
  uploadError: boolean = false;
  uploadErrorMessage: string = '';

  constructor(
    private FossilService: FossilsService,
    private router: Router,
    private authService: AuthService,
    private locationService: LocationService
  ) {}

  ngOnInit(): void {}

  async onFormSubmit(): Promise<void> {
    this.uploadError = false;

    const userId = this.authService.getUserId;

    if (!userId) {
      console.log('you need to be logged in');

      this.uploadError = true;
      this.uploadErrorMessage = 'you need to be logged in';

      return;
    }

    const values = this.myForm.value;
    const newFossil = new FormData();

    newFossil.append('title', values.title);
    newFossil.append('description', values.description);
    newFossil.append('age', values.age);

    if (this.location) {
      newFossil.append('location', JSON.stringify(this.location));
    }

    newFossil.append('owner', userId);
    newFossil.append('image', this.imageFile);
    newFossil.append('model', this.modelFile);

    this.FossilService.addFossil(newFossil).then((res) => {
      if (res.type === 'error') {
        this.uploadError = true;
        this.uploadErrorMessage = res.error.message;
        this.loading = false;

        const errors = res.error.data['data'];

        for (const [k, v] of Object.entries(errors)) {
          const value = v as any;
          this.uploadErrorMessage += `\n ${k}: ${value.message}`;
        }

        return;
      }
      this.router.navigate(['/', 'fossil', res.data]);
    });

    this.loading = true;
  }

  onImageSelected(event: any) {
    this.imageFile = event.target.files[0];
  }
  onModelSelected(event: any) {
    this.modelFile = event.target.files[0];
  }

  getCurrentLocation() {
    this.locationService.getLocation().then((resp) => {
      if (resp.type === 'error') {
        this.uploadError = true;
        this.uploadErrorMessage = resp.error.message;
        return;
      }
      this.location = {
        lng: resp.data.lng,
        lat: resp.data.lat,
      }
    });
  }
  getLocationFromImage() {
    this.locationService.getLocationFromImage(this.imageFile).then((resp) => {
      if (resp.type === 'error') {
        this.uploadError = true;
        this.uploadErrorMessage = resp.error.message;
        return;
      }
      this.location = {
        lng: resp.data.lng,
        lat: resp.data.lat,
      }
    });
  }
}
