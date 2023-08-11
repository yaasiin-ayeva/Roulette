import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage {

  constructor() {}

  grid: string[][] = new Array(6).fill([]).map(() => new Array(4).fill(''));
  buttons: string[] = ['Button 1', 'Button 2', 'Button 3', 'Button 4'];

  validateValue(rowIndex: number, colIndex: number) {
    const inputValue = Number(this.grid[rowIndex][colIndex]);
    if (inputValue && inputValue <= 0 && inputValue > 36) {
      // Reset the input if the value is not allowed
      this.grid[rowIndex][colIndex] = '';
    }
  }

  handleButtonClick(button: string) {
    // Handle button click logic here
    console.log('Button clicked:', button);
  }

}
