import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  private countryUrl = 'assets/api/country.json';

  constructor(private http: HttpClient) { }

  getCountry(): Observable<any> {
    return this.http.get<any>(this.countryUrl);
  }

  getCountryByValue(value: string): Observable<any> {
    return this.http.get<any>(this.countryUrl).pipe(
      map((data) => data.find((s: { value: string; }) => s.value === value))
    );
  }

  getCountryByText(text: string): Observable<any> {
    return this.http.get<any>(this.countryUrl).pipe(
      map((data) => data.find((s: { text: string; }) => s.text === text))
    );
  }
}
