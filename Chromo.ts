//  0 - nop
//  1 - not
//  2 - or
//  3 - and
//  4 - xor
export const NOP=0;
export const NOT=1;
export const OR=2;
export const AND=3;
export const XOR=4;
export const PUSH=1000000;
export const POP=2000000;

//  1000000+N - push
//  2000000+N - pop

export interface IChromoProps {
    prog: number[];
}

export class Chromo<T extends IChromoProps> {
    constructor(public props: T) {

    }

    eval(inputs: boolean[]): boolean | null {
        let stack: boolean[] = [];

        for (let cmd of this.props.prog) {
            if (cmd >= POP) {
                stack.pop();
            }
            else if (cmd >= PUSH) {
                let inputIndex = cmd - PUSH;
                let value = inputs[inputIndex];
                if (!value)
                    throw "index error 1";
                stack.push(value);
            }
            else if (cmd === 1) { //not
                let stackIndex = stack.length - 1;
                stack[stackIndex] = !stack[stackIndex];
            }
            else if (cmd === 2) {
                if (stack.length < 2)
                    return null;
                stack.push(stack.pop()! || stack.pop()!);
            }
            else if (cmd === 3) {
                if (stack.length < 2)
                    return null;
                stack.push(stack.pop()! && stack.pop()!);
            }
            else if (cmd === 4) {
                if (stack.length < 2)
                    return null;
                stack.push(!(stack.pop()! !== stack.pop()!));
            }
            else if (cmd === 0) {

            }
            else
                throw "invalid command " + cmd;

        }
        return stack.pop() || null;
    }
}