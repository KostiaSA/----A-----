import {InputSet, OutputSet} from "./Input";

export interface IGeneticProps {
    inputSet: InputSet;
    outputSet: OutputSet;
}

export class Genetic {
    props: IGeneticProps;

    doEpoch() {
        if (this.props.inputSet.length !== this.props.outputSet.length || this.props.inputSet.length === 0) {
            throw "this.props.inputSet.length=?"
        }


    }
}