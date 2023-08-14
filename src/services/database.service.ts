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

  private groupaJsonData: any[] = [];
  private groupbJsonData: any[] = [];
  private apiUrl = 'http://197.253.123.12:9009/api/v1/roulette';

  constructor(private http: HttpClient) {
  }

  private async readFileData(path: string): Promise<any[]> {
    try {
      const res = await this.http.get(path).toPromise();
      return res as any[];
    } catch (error) {
      console.error('Error reading file data', error);
      return [];
    }
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

    console.log("API URL", url);
    console.log("Data", data);

    const result = await this.http.post(url, data).toPromise();

    console.log("REMOTE RESULT", result);
    

    return result;
  }

  async fetch(
    one24Value: number,
    two_24Value: number,
    curr3Value: number,
    group: 'group_a' | 'group_b'
  ): Promise<any> {

    console.log('Entries: ', one24Value, two_24Value, curr3Value, group);

    let result: any[] = [];
    let tab: any[] = [];

    if (group === TableName.group_a) {
      tab = this.groupaJsonData;
      console.log('tab.length', tab.length);

    } else if (group === TableName.group_b) {
      tab = this.groupbJsonData;
      console.log('tab.length', tab.length);
    }

    for await (const entry of tab) {
      if (entry.one_24 === one24Value && entry.two_24 === two_24Value && entry.curr_3 === curr3Value) {
        result.push(entry);
      }
    }

    return result;
  } catch(error: any) {
    console.error('Error while searching', error);
    return [];
  }

  async seedData(filePath: string, tableName: string) {
    try {

      const data = await this.readFileData(filePath);

      console.log(data);


      if (!data || data.length === 0) {
        console.log('No data found in the file.');
        return false;
      }

      if (tableName === TableName.group_a) {
        this.groupaJsonData = data;
      } else if (tableName === TableName.group_b) {
        this.groupbJsonData = data;
      }

      return true;

    } catch (error) {
      return false;
    }
  }
}