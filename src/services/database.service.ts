import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { HttpClient } from '@angular/common/http';

export const TableName = {
  group_a: 'group_a',
  group_b: 'group_b'
};

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  private database: SQLiteObject = new SQLiteObject('roulette.db');

  constructor(private sqlite: SQLite, private http: HttpClient) {
    this.initDatabase();
  }

  private async initDatabase() {
    try {
      this.database = await this.sqlite.create({
        name: 'roulette.db',
        location: 'default'
      });
      await this.createTables();
    } catch (error) {
      console.error('Error initializing database', error);
    }
  }

  private async createTables() {
    for (const tableName of Object.values(TableName)) {
      const ddlQuery = `

        DROP TABLE IF EXISTS ${tableName};
        CREATE TABLE IF NOT EXISTS ${tableName} (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          one_24 varchar(4),
          two_24 varchar(4),
          Curr_3 varchar(4),
          Target varchar(4)
        );
        
        CREATE INDEX IF NOT EXISTS idx_one_24 ON ${tableName} (one_24);
        CREATE INDEX IF NOT EXISTS idx_two_24 ON ${tableName} (two_24);
        CREATE INDEX IF NOT EXISTS idx_Curr_3 ON ${tableName} (Curr_3);
        CREATE INDEX IF NOT EXISTS idx_Target ON ${tableName} (Target);
      `;

      try {
        await this.database.executeSql(ddlQuery);
      } catch (error) {
        console.error(`Error creating table ${tableName}`, error);
      }
    }
  }

  async seedFromFile(filePath: string, tableName: string): Promise<boolean> {
    const data = await this.readData(filePath);

    if (!data || data.length === 0) {
      console.log('No data found in the file.');
      return false;
    }

    const dmlQuery = `INSERT INTO ${tableName} (one_24, two_24, Curr_3, Target) VALUES (?, ?, ?, ?);`;

    try {
      await this.database.transaction(async tx => {
        for (const row of data) {
          await tx.executeSql(dmlQuery, [row.one_24, row.two_24, row.Curr_3, row.Target]);
        }
      });

      console.log('Data insertion successful.');
      return true;
    } catch (error) {
      console.error('SQLError', error);
      return false;
    }
  }

  private async readData(path: string): Promise<any[]> {
    try {
      return await this.http.get(path).toPromise() as any[];
    } catch (error) {
      console.error('Error reading data', error);
      return [];
    }
  }

  async fetchFromDb(
    one24Value: number,
    two_24Value: number,
    curr3Value: number,
    group: 'group_a' | 'group_b'
  ): Promise<any> {

    const query = `SELECT * FROM ${group} WHERE one_24 = ? AND two_24 = ? AND Curr_3 = ?;`;

    try {
      const result = await this.database.executeSql(query, [one24Value.toString(), two_24Value.toString(), curr3Value.toString()]);
      const data = Array.from({ length: result.rows.length }, (_, i) => result.rows.item(i));

      return {
        "success": true,
        "message": "Data fetched successfully",
        "count": data.length,
        "data": data
      }
    } catch (error) {
      console.error('Error while searching', error);
      return [];
    }
  }
}
