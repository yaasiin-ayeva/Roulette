import { Component, OnInit } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage implements OnInit {

  values: string[];

  constructor(
    private toastController: ToastController,
    private alertController: AlertController
  ) {
    this.values = new Array(24).fill('');
  }

  ngOnInit(): void {
    this.presentSuccessToast('bottom', 'Home Page');
  }

  buttons: string[] = ['+', '-', 'Statistics', 'Wipe'];

  validateValue(colIndex: number) {

    const inputValue = Number(this.values[colIndex]);

    if (!isNaN(inputValue) && inputValue >= 0 && inputValue <= 36) {
      this.values[colIndex] = inputValue.toString();
    }
  }

  handleButtonClick(button: string) {
    if (button === 'Wipe') {
      console.log('Wipe');
      this.wipeGrid();
    }
  }

  getRegexPattern(): string {
    return '^(?:[0-9]|[1-2][0-9]|3[0-6])$';
  }

  onChange(event: any, index: number) {
    const input = event.target as HTMLInputElement;
    const newValue = input.value;
    const pattern = /^(?:[0-9]|[1-2][0-9]|3[0-6])$/;

    if (!pattern.test(newValue)) {
      input.value = this.values[index];
    } else {
      this.values[index] = newValue;
    }
  }

  private wipeGrid() {
    this.alertController.create({
      header: 'Wipe Grid',
      message: 'Are you sure you want to wipe the grid?',
      mode: 'ios',
      buttons: [
        {
          text: 'No',
          role: 'cancel'
        },
        {
          text: 'Yes',
          handler: () => {
            this.values = new Array(24).fill('');
            this.presentSuccessToast('bottom', 'Grid Cleared');
          }
        }
      ]
    }).then(alert => alert.present());
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
}
