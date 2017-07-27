import {InputSet, OutputSet} from "./Input";
import {num2base16} from "./num2Base16";
import {Genetic, IGeneticProps} from "./Genetic";

export function a(){
    console.log("start-a");

}

a();

let inputSet: InputSet = [];
let outputSet: OutputSet = [];

for (let i = 0; i < 1000; i++) {
    inputSet.push(num2base16(i));
    outputSet.push(num2base16(i)[5] || num2base16(i)[6] || num2base16(i)[1] || num2base16(i)[2]);
}

let genProps: IGeneticProps = {
    inputSet: inputSet,
    outputSet: outputSet,
    populationSize: 50,
    maxEpoch: 10000,
    noProgressCount: 150,
    crossoverP: 0.2,
    mutateP: 0.2,
};

let gen = new Genetic();
gen.props = genProps;
gen.doOptimize();
console.log(gen.bestChromo.fitness, gen.bestChromo);
