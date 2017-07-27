import * as fs from "fs";

const kmeans = require('node-kmeans');

export interface IBar {
    date: Date;
    o: number;
    h: number;
    l: number;
    c: number;
    nextBarProfit: number;
}

let m15: IBar[] = [];

function load_m15() {
    m15 = [];
    let lines = fs.readFileSync(`C:/----A-----/EURUSD15.csv`).toString().split("\n");
    let index = 0;
    for (let line of lines) {
        let words = line.split(",");
        if (!words[1])
            break;
        let date = words[0].split(".");
        let time = words[1].split(":");
        //console.log(line);
        let bar = {
            date: new Date(Number.parseInt(date[0]), Number.parseInt(date[1]), Number.parseInt(date[2]), Number.parseInt(time[0]), Number.parseInt(time[1])),
            o: Number.parseFloat(words[2]),
            h: Number.parseFloat(words[3]),
            l: Number.parseFloat(words[4]),
            c: Number.parseFloat(words[5]),
            nextBarProfit: 0
        };
        m15.push(bar);
        if (index > 0) {
            m15[index - 1].nextBarProfit = (bar.c - bar.o) * 10000;
        }
        index++;
    }
    // console.log(m15[1005]);
    // console.log(m15[1006]);
    // console.log(m15[1007]);
}

load_m15();

let profit = 0;
for (let bar of m15) {
    profit += bar.nextBarProfit;
}
console.log(profit, "avg profit pp:", profit / m15.length);

let data: any[] = [];

for (let i = 0; i < 6000; i++) {
    let bar = m15[i];

    let p0 = bar.date.getHours();
    let p1 = (bar.c - bar.o) * 10000;
    let p2 = (bar.h - bar.l) * 10000;
    let p3 = (bar.c - bar.o) / (bar.h - bar.l) * 10000;
    if ((bar.h - bar.l) === 0)
        p3 = 0;

    data.push([ p1, p2, p3]);
}

for (let k = 50; k <= 50; k++) {


    kmeans.clusterize(data, {k: k}, (err: any, res: any) => {
        if (err) console.error(err);

        console.log(`--------- k= ${k}  ------------`);

        for (let r of res) {
            let sum = 0;
            for (let index of r.clusterInd) {
                sum += m15[index].nextBarProfit;
            }
            if (r.clusterInd.length > 0)
                sum = sum / r.clusterInd.length;
//            console.log(`cluster ${res.indexOf(r)}, avg: ${sum}, count: ${r.clusterInd.length} ${Math.abs(sum)>0.5?"  ++++++++++++ ":""}`);
            if (Math.abs(sum) > 3)
                console.log(`cluster ${res.indexOf(r)}, avg: ${sum}, count: ${r.clusterInd.length} ${r.clusterInd.indexOf(30210) > -1 ? "  ++++++++++++ " : ""}`);
        }

        //console.log(res[0].clusterInd);
        //console.log(res[1].clusterInd);
    });
}
