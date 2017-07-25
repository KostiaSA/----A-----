export function num2base16(num: number): boolean[] {
    let ret: boolean[] = [];
    let str = num.toString(2);
    for (let i = 0; i < 16; i++) {
        let c = str.substr(i, 1);
        if (c === "1")
            ret.push(true);
        else
            ret.push(false);
    }
    return ret;
}
