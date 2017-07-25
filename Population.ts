import {IChromoProps} from "./Chromo";

export interface IPopulationProps {
    chromos: IChromoProps[];
    totalFitness: number;
}


export class Population<P extends IPopulationProps>{
    constructor(public props: P) {
    }


}