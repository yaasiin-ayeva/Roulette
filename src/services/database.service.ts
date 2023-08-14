import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export const TableName = {
  group_a: 'group_a',
  group_b: 'group_b'
}

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  private apiUrl = 'http://197.253.123.12:9009/api/v1/roulette';

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
    const result = await this.http.post(url, data).toPromise();
    
    return result;
  }
}