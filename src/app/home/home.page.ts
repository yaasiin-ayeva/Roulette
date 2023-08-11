import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage implements OnInit {

  constructor(
    private toastController: ToastController,
  ) { }
  ngOnInit(): void {
    this.presentSuccessToast('bottom', 'Home Page');
  }

  grid: string[][] = new Array(6).fill([]).map(() => new Array(4).fill(''));
  buttons: string[] = ['+', '-', 'Statistics', 'Table'];

  validateValue(rowIndex: number, colIndex: number) {
    const inputValue = Number(this.grid[rowIndex][colIndex]);
    if (inputValue && inputValue <= 0 && inputValue > 36) {
      this.grid[rowIndex][colIndex] = '';
    }
  }

  handleButtonClick(button: string) {

  }

  async presentSuccessToast(position: 'top' | 'middle' | 'bottom', message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 1500,
      position: position,
      cssClass: 'toast',
      color: 'tertiary',
      mode: 'md'
    });

    await toast.present();
  }
}
