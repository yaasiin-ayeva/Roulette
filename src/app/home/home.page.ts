import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { ComputationService } from 'src/services/computation.service';
import { DatabaseService, TableName } from 'src/services/database.service';

enum Buttons {
  Add = '+',
  Subtract = '-',
  Statistics = 'Statistics',
  Wipe = 'Wipe',
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage implements OnInit {

  values: string[];
  start = 0;
  end = 23;
  buttons = Object.values(Buttons);

  constructor(
    private toastController: ToastController,
    private alertController: AlertController,
    private loadingController: LoadingController,
    private databaseService: DatabaseService,
    private computationService: ComputationService
  ) {
    this.values = new Array(24).fill('');
  }

  async ngOnInit(): Promise<void> {
    await this.seedDatabase();
  }

  async seedDatabase() {
    const loadingController = await this.loadingController.create({
      message: 'Seeding database, wait a moment...',
      mode: 'ios',
      spinner: 'crescent',
      translucent: true,
      showBackdrop: false,
    });

    try {
      const tab = Object.keys(TableName);
      const promises = tab.map(async (group) => {
        await this.databaseService.seedFromFile(`assets/json/${group}.json`, group);
      });

      await Promise.all(promises);
    } catch (error) {
      console.log(error);
    } finally {
      await loadingController.dismiss();
    }
  }

  validateValue(colIndex: number) {
    const inputValue = Number(this.values[colIndex]);
    if (!isNaN(inputValue) && inputValue >= 0 && inputValue <= 36) {
      this.values[colIndex] = inputValue.toString();
    }
  }

  private moveValuesBackward() {
    if (this.start > 0) {
      this.start--;
      this.end--;

      for (let i = this.start; i <= this.end; i++) {
        this.values[i] = this.values[i + 1];
      }
      this.values[this.end + 1] = '';
    }
  }

  handleButtonClick(button: string) {
    if (button === Buttons.Wipe) {
      this.wipeGrid();
    } else if (button === Buttons.Add) {
      this.addValue();
      this.moveValuesBackward();
    } else if (button === Buttons.Statistics) {
      this.computeStatistics();
    }
  }

  onInputChange(event: any, index: number) {
    let inputValue = event.target.value;
    const lastCharacter = inputValue[inputValue.length - 1];

    if (isNaN(lastCharacter)) {
      inputValue = inputValue.slice(0, -1);
    } else {
      let numericValue = Number(inputValue);

      while (numericValue > 36) {
        inputValue = inputValue.slice(0, -1);
        numericValue = Number(inputValue);
      }
    }

    event.target.value = inputValue;
    this.values[index] = inputValue;
  }

  private addValue() {
    if (this.values[this.values.length - 1] === '') {
      return;
    }

    this.values.push('');
  }

  private wipeGrid() {
    this.alertController
      .create({
        header: 'Wipe Grid',
        message: 'Are you sure you want to wipe the grid?',
        mode: 'ios',
        buttons: [
          {
            text: 'No',
            role: 'cancel',
          },
          {
            text: 'Yes',
            handler: () => {
              this.clearGrid();
            },
          },
        ],
      })
      .then((alert) => alert.present());
  }

  private async clearGrid() {
    this.values = new Array(24).fill('');
    await this.presentSuccessToast('bottom', 'Grid Cleared');
  }

  async presentSuccessToast(position: 'top' | 'middle' | 'bottom', message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 1500,
      position: position,
      cssClass: 'toast',
      color: 'medium',
      mode: 'ios',
    });

    await toast.present();
  }

  async computeStatistics() {
    const inputArray: number[] = [
      35, 25, 19, 22,
      9, 1, 12, 35,
      7, 3,
      36, 33, 35, 11,
      20, 34, 22, 29,
      22, 13,
      25, 9, 2, 21,
    ];

    const result = this.computationService.computeValues(inputArray);

    const data = await this.databaseService.fetchFromDb(
      Number(result.group_a.one_24),
      Number(result.group_a.two_24),
      Number(result.group_a.curr_3),
      'group_a'
    );

    console.log('result', JSON.stringify(result));
    console.log('data', JSON.stringify(data));
  }
}
