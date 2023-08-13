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

  async fetch(
    one24Value: number,
    two_24Value: number,
    curr3Value: number,
    group: 'group_a' | 'group_b'
  ): Promise<any> {

    let result: any[] = [];

    const tab = (group === 'group_a') ? this.groupaJsonData : this.groupbJsonData;

    tab.forEach((item) => {
      if (item.one_24 === one24Value && item.two_24 === two_24Value && item.Curr_3 === curr3Value) {
        result.push(item);
      }
    });

    return result;
  } catch(error: any) {
    console.error('Error while searching', error);
    return [];
  }

  async seedData(filePath: string, tableName: string) {
    try {

      const data = await this.readFileData(filePath);

      if (!data || data.length === 0) {
        console.log('No data found in the file.');
        return false;
      }

      (tableName === TableName.group_a) ? this.groupaJsonData = data : this.groupbJsonData = data;

      console.log(this.groupaJsonData);
      console.log(this.groupbJsonData);

      return true;
    } catch (error) {
      return false;
    }
  }
}