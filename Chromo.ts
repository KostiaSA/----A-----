//  0 - nop
//  1 - not
//  2 - or
//  3 - and
//  4 - xor
import {Input, InputSet, OutputSet} from "./Input";
import {getRandomInt} from "./getRandom";

//export const NOP = 0;
export const NOT = 0;
export const OR = 1;
export const AND = 2;
export const XOR = 3;
export const POP = 4;

export const MAX_COMMAND = POP;

export const PUSH = 1000000;

//  1000000+N - push
//  2000000+N - pop

export type ProgCmd = number | number[];
export type Prog = ProgCmd[];

export interface IChromoProps {
    prog: ProgCmd[]; // если массив, то это программа
    fitness?: number;
}

export class Chromo {
    constructor(public props: IChromoProps) {

    }

    // 1 млн в сек. для 10 входов
    static createNew(inputLen: number, progs: Prog[]): IChromoProps {
        let progLen = 6;//getRandomInt(3, 6);
        let ret: IChromoProps = {prog: []};
        for (let i = 0; i < progLen; i++) {
            if (progs.length > 0 && Math.random() < 0.5) {
                ret.prog.push(progs[getRandomInt(0, progs.length - 1)] as any);
            }
            else if (Math.random() < 0.5) {  // команда
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

    static crossover(c1: IChromoProps, c2: IChromoProps): IChromoProps {

        let index = Math.round(Math.min(c1.prog.length, c2.prog.length) / 2);

        return {prog: [...c1.prog.slice(0, index), ...c2.prog.slice(index + 1)]};
    }

    static mutate(c1: IChromoProps, len: number, prog: Prog[]): IChromoProps {
        let c2 = Chromo.createNew(len, prog);
        return Chromo.crossover(c1, c2);
    }

    evalFitness(inputSet: InputSet, outputSet: OutputSet): number {
        let totFitness = 0;
        inputSet.forEach((input, index) => {
            totFitness += this.eval(input) === outputSet[index] ? 1 : 0;
        });

//        return totFitness / inputSet.length * 1000 + inputSet[0].length / this.props.prog.length;
        return totFitness / inputSet.length * 1000 + 1 / JSON.stringify(this.props.prog).length;
    }

    eval(input: Input): boolean | null {
        let stack: boolean[] = [];

        for (let cmd of this.props.prog) {
            if (Array.isArray(cmd)) {
                let c = new Chromo({prog: cmd});
                stack.push(c.eval(input)!);
            }
            else if (cmd === POP) {
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