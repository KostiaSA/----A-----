import {suite, test, slow, timeout, skip, only} from "mocha-typescript";
import {assert} from "chai";
import {AND, Chromo, NOP, OR, PUSH, XOR} from "../Chromo";
import {InputSet, OutputSet} from "../Input";
import {Population} from "../Population";
import {Genetic, IGeneticProps} from "../Genetic";

@suite("chromo-test")
//@skip
export class Test {


    async before() {
    }


    @test
    async empty() {
        let c = new Chromo({
            prog: []
        });


        assert.equal(c.eval([]), null);
    }

    @test
    async empty1() {
        let c = new Chromo({
            prog: [1]
        });


        assert.equal(c.eval([]), null);
    }

    @test
    async empty2() {
        let c = new Chromo({
            prog: []
        });


        assert.equal(c.eval([true, false]), null);
    }

    @test
    async nop() {
        let c = new Chromo({
            prog: [NOP]
        });


        assert.equal(c.eval([true]), null);
    }

    @test
    async or_1() {
        let c = new Chromo({
            prog: [PUSH + 0, PUSH + 1, OR]
        });

        assert.equal(c.eval([true, true]), true);
        assert.equal(c.eval([true, false]), true);
        assert.equal(c.eval([false, true]), true);
        assert.equal(c.eval([false, false]), false);
    }

    @test
    async and_1() {
        let c = new Chromo({
            prog: [PUSH + 0, PUSH + 1, AND]
        });

        assert.equal(c.eval([true, true]), true);
        assert.equal(c.eval([true, false]), false);
        assert.equal(c.eval([false, true]), false);
        assert.equal(c.eval([false, false]), false);
    }

    @test
    async xor_1() {
        let c = new Chromo({
            prog: [PUSH + 0, PUSH + 1, XOR]
        });

        assert.equal(c.eval([true, true]), true);
        assert.equal(c.eval([true, false]), false);
        assert.equal(c.eval([false, true]), false);
        assert.equal(c.eval([false, false]), true);
    }

    @test
    async eval_fitness() {
        let c = new Chromo({
            prog: [PUSH + 0, PUSH + 1, XOR]
        });

        let inputSet: InputSet = [[true, true], [true, false], [false, true], [false, false]];
        let outputSet: OutputSet = [true, false, false, true];

        let lenKoef = inputSet[0].length / c.props.prog.length;

        assert.equal(c.evalFitness(inputSet, outputSet), 1 * 10 + lenKoef);
        assert.equal(c.evalFitness(inputSet, [false, true, true, false]), 0 * 10 + lenKoef);
        assert.equal(c.evalFitness(inputSet, [true, false, true, false]), 0.5 * 10 + lenKoef);

    }

    @test
    async eval_population_fitnesses() {
        let c1 = new Chromo({
            prog: [PUSH + 0, PUSH + 1, XOR]
        });
        let c2 = new Chromo({
            prog: [PUSH + 0, PUSH + 1, AND]
        });

        let inputSet: InputSet = [[true, true], [true, false], [false, true], [false, false]];
        let outputSet: OutputSet = [true, false, true, false];

        let p = new Population({chromos: [c1.props, c2.props]});
        p.evalFitnesses(inputSet, outputSet);

        let lenKoef = inputSet[0].length / c1.props.prog.length;

        assert.equal(p.props.chromos[0].fitness, 0.75 * 10 + lenKoef);
        assert.equal(p.props.chromos[1].fitness, 0.5 * 10 + lenKoef);

    }

    @test
    async chromo_create_new() {

        for (let i = 0; i < 1000; i++) {
            let c = Chromo.createNew(10);
        }
        //console.log(c.prog);

//        assert.equal(p.props.chromos[1].fitness, 0.75);

    }

    @test
    async genetic_1() {

        let genProps: IGeneticProps = {
            inputSet: [[true, true], [true, false], [false, true], [false, false]],
            outputSet: [true, false, false, true],
            populationSize: 100,
            maxEpoch: 10000
        };

        let gen = new Genetic();
        gen.props = genProps;
        gen.doOptimize();
        console.log(gen.bestChromo.fitness, gen.bestChromo);


//        console.log(gen.currPopulation.props.chromos)
        assert.equal(gen.bestChromo.fitness, 2);

    }
}
