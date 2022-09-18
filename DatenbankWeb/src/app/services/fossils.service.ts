import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FossilsService {

  getFossilDetails (id: string): Observable<string> {
    const returnValue = "test" + id;
    return of(returnValue);
  }

  constructor() { }
}
