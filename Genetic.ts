import {InputSet, OutputSet} from "./Input";
import {IPopulationProps, Population} from "./Population";
import {Chromo, IChromoProps} from "./Chromo";

export interface IGeneticProps {
    inputSet: InputSet;
    outputSet: OutputSet;
    populationSize: number;
    maxEpoch: number;
}

export class Genetic {
    props: IGeneticProps;

    createPopulation(): IPopulationProps {

        let chromos: IChromoProps[] = [];
        let progLen = this.props.inputSet[0].length;

        for (let i = 0; i < this.props.populationSize; i++) {
            chromos.push(Chromo.createNew(progLen));
        }

        return {
            chromos: chromos
        }
    }

    epochCount: number;
    currPopulation: Population;
    bestChromo: IChromoProps;

    doPrepare() {
        if (this.props.inputSet.length !== this.props.outputSet.length || this.props.inputSet.length === 0) {
            throw "this.props.inputSet.length=?";
        }
        this.epochCount = 0;
        this.currPopulation = new Population(this.createPopulation());
    }

    doEpoch() {
        this.currPopulation.evalFitnesses(this.props.inputSet, this.props.outputSet);
        this.bestChromo = this.currPopulation.props.bestChromo!;
        this.epochCount++;
    }

    doOptimize() {
        this.doPrepare();
        while (this.epochCount < this.props.maxEpoch) {
            this.doEpoch();
        }
    }
}