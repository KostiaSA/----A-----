import {suite, test, slow, timeout, skip, only} from "mocha-typescript";
import {assert} from "chai";
import {Chromo, NOP, OR, PUSH} from "../Chromo";

@suite("chromo-test")
//@skip
export class Test {


    async before() {
    }


    @test
    async empty() {
        let c = new Chromo({
            prog: []
        });


        assert.equal(c.eval([]), null);
    }

    @test
    async empty1() {
        let c = new Chromo({
            prog: [1]
        });


        assert.equal(c.eval([]), null);
    }

    @test
    async empty2() {
        let c = new Chromo({
            prog: []
        });


        assert.equal(c.eval([true, false]), null);
    }

    @test
    async nop() {
        let c = new Chromo({
            prog: [NOP]
        });


        assert.equal(c.eval([true]), null);
    }

    @test
    async or_1() {
        let c = new Chromo({
            prog: [PUSH + 0, PUSH + 1, OR]
        });


        assert.equal(c.eval([true, true]), true);
        assert.equal(c.eval([true, false]), true);
        assert.equal(c.eval([false, true]), true);
        assert.equal(c.eval([false, false]), false);
    }
}

