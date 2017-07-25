import {Chromo, IChromoProps} from "./Chromo";
import {InputSet, OutputSet} from "./Input";

export interface IPopulationProps {
    chromos: IChromoProps[];
    bestChromo?: IChromoProps;
}


export class Population {
    constructor(public props: IPopulationProps) {
    }

    evalFitnesses(inputSet: InputSet, outputSet: OutputSet) {

        let chromo = new Chromo(this.props.chromos[0]);

        for (let chromoProps of this.props.chromos) {
            chromo.props = chromoProps;
            chromoProps.fitness = chromo.evalFitness(inputSet, outputSet);

             // if (!this.props.bestChromo || (this.props.bestChromo.fitness! < chromoProps.fitness)) {
             //     this.props.bestChromo = chromoProps;
             // }
        }

        this.props.chromos.sort((a: IChromoProps, b: IChromoProps) => b.fitness! - a.fitness!);
        this.props.bestChromo = this.props.chromos[0];
    }


}