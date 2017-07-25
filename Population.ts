import {Chromo, IChromoProps} from "./Chromo";
import {InputSet, OutputSet} from "./Input";

export interface IPopulationProps {
    chromos: IChromoProps[];
}


export class Population {
    constructor(public props: IPopulationProps) {
    }

    evalFitnesses(inputSet: InputSet, outputSet: OutputSet) {

        let chromo = new Chromo(this.props.chromos[0]);

        for (let chromoProps of this.props.chromos) {
            chromo.props = chromoProps;
            chromoProps.fitness = chromo.evalFitness(inputSet, outputSet);
        }

    }


}