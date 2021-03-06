import {InputSet, OutputSet} from "./Input";
import {IPopulationProps, Population} from "./Population";
import {Chromo, IChromoProps, Prog} from "./Chromo";
import {getRandomInt} from "./getRandom";

export interface IGeneticProps {
    inputSet: InputSet;
    outputSet: OutputSet;
    populationSize: number;
    maxEpoch: number;
    crossoverP: number;
    mutateP: number;
    noProgressCount: number;
}

export class Genetic {
    props: IGeneticProps;

    createPopulation(): IPopulationProps {

        let chromos: IChromoProps[] = [];
        let progLen = this.props.inputSet[0].length;

        for (let i = 0; i < this.props.populationSize; i++) {
            chromos.push(Chromo.createNew(progLen, this.bestProgs));
        }

        return {
            chromos: chromos
        }
    }

    epochCount: number;
    currPopulation: Population;
    bestChromo: IChromoProps;
    bestProgs: Prog[];

    noProgressCount: number;

    doPrepare() {
        if (this.props.inputSet.length !== this.props.outputSet.length || this.props.inputSet.length === 0) {
            throw "this.props.inputSet.length=?";
        }
        this.bestProgs = [];
        this.epochCount = 0;
        this.noProgressCount = 0;
        this.currPopulation = new Population(this.createPopulation());
    }

    doEpoch() {
        this.currPopulation.evalFitnesses(this.props.inputSet, this.props.outputSet);
        if (!this.bestChromo || this.bestChromo.fitness! < this.currPopulation.props.bestChromo!.fitness!) {
            this.bestChromo = this.currPopulation.props.bestChromo!;
            this.noProgressCount = 0;
            //if (this.bestChromo.fitness! > 500 && this.bestChromo.fitness! < 900) {
                console.log("add prog:", this.bestChromo.fitness);
                this.bestProgs.push(this.bestChromo.prog);
            //}
            console.log("best:", this.bestChromo.fitness);
        }
        else
            this.noProgressCount += 1;

        console.log("epoch",this.epochCount,this.noProgressCount);

        let newPopulation = new Population({chromos: []});

        let oldCromos = this.currPopulation.props.chromos;
        let newCromos = newPopulation.props.chromos;

        for (let i = 0; i < oldCromos.length; i++) {
            if (i < oldCromos.length / 100) {
                newCromos.push(oldCromos[i]);
            }
            else {
                // let P = Math.random();
                // if (P < this.props.mutateP) {
                //     newCromos.push(Chromo.mutate(oldCromos[i], this.props.inputSet[0].length, this.bestProgs));
                //
                // }
                // else if (P < this.props.mutateP + this.props.crossoverP) {
                //     let oldIndex2 = getRandomInt(0, oldCromos.length / 2);
                //     newCromos.push(Chromo.crossover(oldCromos[i], oldCromos[oldIndex2]));
                // }
                // else
                    newCromos.push(Chromo.createNew(this.props.inputSet[0].length, this.bestProgs));
            }
        }

        this.currPopulation = newPopulation;
        this.epochCount++;
    }

    doOptimize() {
        this.doPrepare();
        while (this.epochCount < this.props.maxEpoch && this.noProgressCount < this.props.noProgressCount) {
            this.doEpoch();
        }
    }
}