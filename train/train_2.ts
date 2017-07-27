import {suite, test, slow, timeout, skip, only} from "mocha-typescript";
import {assert} from "chai";
import {Genetic, IGeneticProps} from "../Genetic";
import {num2base10, num2base16} from "../num2Base16";
import {InputSet, OutputSet} from "../Input";


@suite("train-2")
//@skip
export class Test {


    async before() {
    }

    // @test
    // async num2base16() {
    //     for (let i = 0; i < 1000; i++) {
    //         console.log(("000000000000000" + i.toString(2)).slice(-15));
    //         //outputSet.push((num2base16(i)[5] || num2base16(i)[8]) || num2base16(i)[1]);
    //     }
    //     //   console.log(num2base16(100));
    // }
    //
    @test
    async k() {

//         const data = [
//             {'company': 'Microsoft', 'size': 91259, 'revenue': 60420},
//             {'company': 'IBM', 'size': 400000, 'revenue': 98787},
//             {'company': 'Skype', 'size': 700, 'revenue': 716},
//             {'company': 'SAP', 'size': 48000, 'revenue': 11567},
//             {'company': 'Yahoo!', 'size': 14000, 'revenue': 6426},
//             {'company': 'eBay', 'size': 15000, 'revenue': 8700},
//         ];
//
// // Create the data 2D-array (vectors) describing the data
//         let vectors = [];
//         for (let i = 0; i < data.length; i++) {
//             vectors[i] = [data[i]['size'], data[i]['revenue']];
//         }
        let data: any = [];

        for (let i = 0; i < 1000; i++) {
            data.push(num2base10(i));
            //console.log(("000000000000000" + i.toString(2)).slice(-10));
            //outputSet.push((num2base16(i)[5] || num2base16(i)[8]) || num2base16(i)[1]);
        }


        data = [
            [0, 0, 0, 0, 0, 0, 0, 0, 1,],
            [0, 0, 0, 1, 1, 1, 1, 0, 0,],
            [0, 1, 0, 0, 0, 0, 0, 0, 0,],
            [0, 0, 0, 0, 0, 1, 0, 0, 0,],
            [0, 0, 1, 1, 1, 1, 0, 0, 0,],
            [0, 0, 0, 1, 0, 0, 0, 0, 0,],
        ];

        const kmeans = require('node-kmeans');
        kmeans.clusterize(data, {k: 3}, (err: any, res: any) => {
            if (err) console.error(err);
            else console.log('%o', res);
        });
    }
}