import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import * as papa from 'papaparse';
import { HttpClient } from '@angular/common/http';

interface CsvDataRow {
  name: string;
  value: number;
}

export const TableName = {
  group_a: 'group_a',
  group_b: 'group_b'
}

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  private database: SQLiteObject = new SQLiteObject('roulette.db');
  private csvData: any[] = [];

  constructor(private sqlite: SQLite, private http: HttpClient) {
  }

  public async initDatabase() {
    this.database = await this.sqlite.create({
      name: 'roulette.db',
      location: 'default'
    });
  }

  async seedFromCsv(csvFilePath: string, tableName: string): Promise<boolean> {

    this.readCsvData(csvFilePath);
    const data = this.csvData as CsvDataRow[];

    try {

      const ddlQuery = `
        CREATE TABLE IF NOT EXISTS ${tableName} (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          one_24 REAL,
          two_24 REAL,
          Curr_3 INTEGER,
          Target INTEGER
        );
        
        CREATE INDEX idx_one_24 ON ${tableName} (one_24);
        CREATE INDEX idx_two_24 ON ${tableName} (two_24);
        CREATE INDEX idx_Curr_3 ON ${tableName} (Curr_3);
        CREATE INDEX idx_Target ON ${tableName} (Target);
      `;

      const dmlQuery = `INSERT INTO ${tableName} (one_24, two_24, Curr_3, Target) VALUES (?, ?, ?, ?)`

      this.database.transaction(tx => {

        tx.executeSql(`DROP TABLE IF EXISTS ${tableName}`);
        tx.executeSql(ddlQuery);

        data.forEach((row: any) => {
          tx.executeSql(dmlQuery, [row.one_24, row.two_24, row.Curr_3, row.Target], (tx: any, resultSet: any) => {
            console.log('resultSet.rowsAffected: ' + resultSet.rowsAffected);
          }, (error: any) => {
            console.log('INSERT error: ' + error.message);
          });
        })
      }).then(() => {
        console.log('Data inserted');
      }).catch(e => {
        console.log(e);
        throw e
      })

      return true;

    } catch (error) {
      console.error('Error while inserting', JSON.stringify(error));
      return false;
    }
  }

  private readCsvData(path: string) {
    this.http.get(path, { responseType: 'text' })
      .subscribe(
        (data: string) => {
          this.extractData(data);
        },
        (err: any) => this.handleError(err)
      );
  }

  private handleError(err: any) {
    console.log('something went wrong: ', JSON.stringify(err));
  }

  private extractData(res: any) {
    let csvData = res['_body'] || '';
    let parsedData = papa.parse(csvData, { header: false }).data;
    this.csvData = parsedData;
  }

  async searchThroughGroup(
    one24Value: number,
    two_24Value: number,
    curr3Value: number,
    group: 'group_a' | 'group_b'
  ): Promise<any[]> {
    try {

      const query = `SELECT * FROM ${group} WHERE one_24 = ? AND two_24 = ? AND Curr_3 = ?`;
      const result = await this.database.executeSql(query, [one24Value, two_24Value, curr3Value]);

      console.log('result', result);

      const data = [];
      for (let i = 0; i < result.rows.length; i++) {
        data.push(result.rows.item(i));
      }

      return data;

    } catch (error) {
      console.error('Error while searching', error);
      return [];
    }
  }
}