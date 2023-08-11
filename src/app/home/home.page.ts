import { Component, OnInit } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage implements OnInit {

  values: string[];
  start: number = 0;
  end: number = 23;

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

  private moveValuesBackward() {
    if (this.start > 0) {
      this.start--;
      this.end--;

      for (let i = 0; i < this.values.length; i++) {
        if (i >= this.start && i <= this.end) {
          this.values[i] = this.values[i + 1];
        }
      }
      this.values[this.end + 1] = '';
    }
  }

  handleButtonClick(button: string) {
    if (button === 'Wipe') {
      console.log('Wipe');
      this.wipeGrid();
    } else if (button === '+') {
      console.log('+');
      console.log('values', this.values);
      
      this.addValue();
      this.moveValuesBackward(); // Ajoutez cette ligne pour déplacer les valeurs
      console.log('values', this.values);
      
    }
  }

  onInputChange(event: any, index: number) {
    let value = event.target!.value;

    const lastLetter = value[value.length - 1];

    if (isNaN(lastLetter)) {
      value = value.slice(0, -1);
    } else {
      let inputValue = Number(value);

      while (inputValue > 36) {
        value = value.slice(0, -1);
        inputValue = Number(value);
      }
    }
    event.target.value = value;
    this.values[index] = value;

    console.log('inputValue', value);
  }

  // private addValue() {
  //   console.log('values', this.values);

  //   if (this.values[this.values.length - 1] === '') {
  //     return;
  //   }

  //   let newArray = new Array(this.values.length).fill('');

  //   this.values.forEach((value, index) => {
  //     newArray[index] = value;
  //   });

  //   this.values = newArray;
  //   this.values.push('');

  //   this.start = this.start + 1;
  //   this.end = this.end + 1;

  //   console.log('values', this.values);

  // }

  private addValue() {
    if (this.values[this.values.length - 1] === '') {
      return;
    } 
  
    this.values.push('');
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
