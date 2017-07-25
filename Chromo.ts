//  0 - nop
//  1 - not
//  2 - or
//  3 - and
//  4 - xor
import {Input, InputSet, OutputSet} from "./Input";
import {getRandomInt} from "./getRandom";

export const NOP = 0;
export const NOT = 1;
export const OR = 2;
export const AND = 3;
export const XOR = 4;
export const POP = 5;

export const MAX_COMMAND = POP;

export const PUSH = 1000000;

//  1000000+N - push
//  2000000+N - pop

export interface IChromoProps {
    prog: number[];
    fitness?: number;
}

export class Chromo {
    constructor(public props: IChromoProps) {

    }

    // 1 млн в сек. для 10 входов
    static createNew(inputLen: number): IChromoProps {
        let progLen = getRandomInt(2, inputLen * 5);
        let ret: IChromoProps = {prog: []};
        for (let i = 0; i < progLen; i++) {
            if (Math.random() < 0.5) {  // команда
                let cmd = getRandomInt(0, MAX_COMMAND);
                ret.prog.push(cmd);
            }
            else {  // PUSH
                let operandIndex = getRandomInt(0, inputLen - 1);
                ret.prog.push(PUSH + operandIndex);
            }
        }
        return ret;
    }

    evalFitness(inputSet: InputSet, outputSet: OutputSet): number {
        let totFitness = 0;
        inputSet.forEach((input, index) => {
            totFitness += this.eval(input) === outputSet[index] ? 1 : 0;
        });

        return totFitness / inputSet.length + this.props.prog.length / inputSet[0].length;
    }

    eval(input: Input): boolean | null {
        let stack: boolean[] = [];

        for (let cmd of this.props.prog) {
            if (cmd === POP) {
                stack.pop();
            }
            else if (cmd >= PUSH) {
                let inputIndex = cmd - PUSH;
                let value = input[inputIndex];
                if (value === undefined)
                    throw "index error 1";
                stack.push(value);
            }
            else if (cmd === NOT) { //not
                let stackIndex = stack.length - 1;
                stack[stackIndex] = !stack[stackIndex];
            }
            else if (cmd === OR) {
                if (stack.length < 2)
                    return null;
                stack.push(stack.pop()! || stack.pop()!);
            }
            else if (cmd === AND) {
                if (stack.length < 2)
                    return null;
                stack.push(stack.pop()! && stack.pop()!);
            }
            else if (cmd === XOR) {
                if (stack.length < 2)
                    return null;
                stack.push(!(stack.pop()! !== stack.pop()!));
            }
            else if (cmd === 0) {

            }
            else
                throw "invalid command " + cmd;

        }
        let ret = stack.pop();
        if (ret === undefined)
            return null;
        else
            return ret;
    }
}