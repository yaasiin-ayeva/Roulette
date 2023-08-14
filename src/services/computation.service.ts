import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ComputationService {

    private inputData: number[] = [];

    constructor() {
    }

    public computeValues(inputData: any[]) {

        this.inputData = [];
        inputData.forEach((value) => {
            if (isNaN(value)) {
                throw new Error('Invalid input');
            }
            this.inputData.push(Number(value));
        });

        const group_a = this.computeGroupA(this.inputData);
        const group_b = this.computeGroupB(this.inputData);

        return { group_a, group_b };
    }

    private verify(index: number): { yes: number, no: number } {

        const values_yes: number[] = [
            0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1,
            1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8, 1.9, 2,
            2.1, 2.2, 2.3, 2.4
        ];

        const values_no: number[] = [
            0.05, 0.06, 0.07, 0.08, 0.09, 0.1, 0.11, 0.12, 0.13, 0.14,
            0.15, 0.16, 0.17, 0.18, 0.19, 0.2, 0.21, 0.22, 0.23, 0.24,
            0.25, 0.26, 0.27, 0.28
        ];
        let yes: number = values_yes[index];
        let no: number = values_no[index];

        return { yes, no };
    }

    private computeGroupA(inputArray: number[]) {
        const groupA: number[] = Array.from({ length: 12 }, (_, i) => i + 1);

        const groupB: number[] = Array.from({ length: 12 }, (_, i) => i + 13);

        let sum_one = 0;
        let sum_two = 0;
        let curr_3 = 0;

        for (let i = 0; i < inputArray.length; i++) {
            const value = inputArray[i];
            const { yes, no } = this.verify(i);

            if (groupA.includes(value)) {
                sum_one += yes;
                sum_two += no;
            } else if (groupB.includes(value)) {
                sum_one += no;
                sum_two += yes;
            } else {
                sum_one += no;
                sum_two += no;
            }

            if (i === 23) {
                curr_3 = groupA.includes(value) ? 1 : (groupB.includes(value) ? 2 : 0);
            }
        }

        return {
            one_24: sum_one.toFixed(1),
            two_24: sum_two.toFixed(1),
            curr_3: curr_3
        };
    }

    private computeGroupB(inputArray: number[]) {
        const groupA = Array.from({ length: 12 }, (_, i) => (i + 1) * 3);
        const groupB = Array.from({ length: 12 }, (_, i) => (i + 1) * 3 - 1);
        let sum_one = 0;
        let sum_two = 0;
        let curr_3 = 0;

        for (let i = 0; i < inputArray.length; i++) {
            const value = inputArray[i];
            const { yes, no } = this.verify(i);

            if (groupA.includes(value)) {
                sum_one += yes;
                sum_two += no;
            } else if (groupB.includes(value)) {
                sum_one += no;
                sum_two += yes;
            } else {
                sum_one += no;
                sum_two += no;
            }

            if (i === 23) {
                curr_3 = groupA.includes(value) ? 1 : groupB.includes(value) ? 2 : 0;
            }
        }

        return {
            one_24: sum_one.toFixed(1),
            two_24: sum_two.toFixed(1),
            curr_3: curr_3
        }
    }
}