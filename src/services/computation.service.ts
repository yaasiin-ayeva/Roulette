import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ComputationService {

    private readonly values_yes: number[] = [
        0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1,
        1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8, 1.9, 2,
        2.1, 2.2, 2.3, 2.4
    ];

    private readonly values_no: number[] = [
        0.05, 0.06, 0.07, 0.08, 0.09, 0.1, 0.11, 0.12, 0.13, 0.14,
        0.15, 0.16, 0.17, 0.18, 0.19, 0.2, 0.21, 0.22, 0.23, 0.24,
        0.25, 0.26, 0.27, 0.28
    ];

    constructor() {
    }

    public computeValues(inputData: any[]) {
        const processedData = this.processInputData(inputData);

        const group_a = this.computeGroup(processedData, this.values_yes, this.values_no, 0);
        const group_b = this.computeGroup(processedData, this.values_no, this.values_yes, 12);

        return { group_a, group_b };
    }

    private processInputData(inputData: any[]): number[] {
        return inputData.map(value => {
            if (isNaN(value)) {
                throw new Error('Invalid input');
            }
            return Number(value);
        });
    }

    private computeGroup(inputArray: number[], values_one: number[], values_two: number[], offset: number) {
        const group: number[] = Array.from({ length: 12 }, (_, i) => i + 1 + offset);

        let sum_one = 0;
        let sum_two = 0;
        let curr_3 = 0;

        for (let i = 0; i < inputArray.length; i++) {
            const value = inputArray[i];
            const { yes, no } = this.verify(i);

            if (group.includes(value)) {
                sum_one += values_one[i];
                sum_two += values_two[i];
            } else {
                sum_one += no;
                sum_two += no;
            }

            if (i === 23) {
                curr_3 = group.includes(value) ? 1 : 0;
            }
        }

        return {
            one_24: this.roundToFixed(sum_one),
            two_24: this.roundToFixed(sum_two),
            curr_3: curr_3
        };
    }

    private verify(index: number): { yes: number, no: number } {
        const yes = this.values_yes[index];
        const no = this.values_no[index];
        return { yes, no };
    }

    private roundToFixed(value: number): string {
        return (Math.round(value * 10) / 10).toFixed(1);
    }
}