import {suite, test, slow, timeout, skip, only} from "mocha-typescript";
import {assert} from "chai";
import {Genetic, IGeneticProps} from "../Genetic";
import {num2base16} from "../num2Base16";
import {InputSet, OutputSet} from "../Input";


@suite("train-1")
//@skip
export class Test {


    async before() {
    }

    @test
    async num2base16() {
        //   console.log(num2base16(100));
    }

    @test
    async genetic_2() {

        let inputSet: InputSet = [];
        let outputSet: OutputSet = [];

        for (let i = 0; i < 500; i++) {
            inputSet.push(num2base16(i));
            outputSet.push((num2base16(i)[5] || num2base16(i)[8]) || num2base16(i)[1]);
        }

        let genProps: IGeneticProps = {
            inputSet: inputSet,
            outputSet: outputSet,
            populationSize: 100,
            maxEpoch: 10000,
            noProgressCount: 50,
            crossoverP: 0.2,
            mutateP: 0.2,
        };

        let gen = new Genetic();
        gen.props = genProps;
        gen.doOptimize();
        console.log(gen.bestChromo.fitness, gen.bestChromo);


//        console.log(gen.currPopulation.props.chromos)
//        assert.equal(gen.bestChromo.fitness, 10 + 2 / 3);

    }

}