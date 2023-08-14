import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

export const TableName = {
  group_a: 'group_a',
  group_b: 'group_b'
}

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {
  }

  async apiFetch(
    one24Value: number,
    two_24Value: number,
    curr3Value: number,
    group: 'group_a' | 'group_b'
  ) {

    const data = {
      one_24: one24Value,
      two_24: two_24Value,
      Curr_3: curr3Value
    }

    const url = `${this.apiUrl}/${group}`;

    let resultData: any;

    try {
      resultData = await this.http.post(url, data).toPromise();

      console.log(resultData);

    } catch (error) {
      console.log(error);

    }

    return resultData;
  }
}