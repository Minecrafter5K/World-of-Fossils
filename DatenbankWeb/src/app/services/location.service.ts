import { Injectable } from '@angular/core';
import * as ExifReader from 'exifreader';
import { Location } from '../models/location';
import { ErrorableResponse } from '../models/errors';

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  constructor() {}

  getLocation() {
    return new Promise((resolve) => {
      navigator.geolocation.getCurrentPosition(
        (resp) => {
          resolve({
            type: "success",
            data: {
              lng: resp.coords.longitude.toString(),
              lat: resp.coords.latitude.toString(),
            },
          });
        },
        (err) => {
          resolve({
            type: "error",
            error: err,
          });
        }
      );
    }) as Promise<ErrorableResponse<Location, GeolocationPositionError>>;
  }

  async getLocationFromImage(imageFile: File): Promise<ErrorableResponse<Location, Error>> {
    const tags = await ExifReader.load(imageFile);

    if (!tags.GPSLatitude || !tags.GPSLongitude) {
      return {
        type: 'error',
        error: new Error('no gps data found'),
      };
    }

    return {
      type: 'success',
      data: {
        lat: tags.GPSLatitude.description,
        lng: tags.GPSLongitude.description,
      },
    };
  }
}
