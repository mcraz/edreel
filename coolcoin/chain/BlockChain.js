const Block = require('./Block');

class BlockChain {
    constructor(options) {
        options = _.assign({
            
            complexity: 1

        }, options);

        this.complexity = options.complexity;
        this.blocks = [];

        this.startBlockChain();
    }

    setComplexity(value) {
        this.complexity = value;
        
        return this;
    }

    size() {
        return this.blocks.length;
    }

    startBlockChain() {
        this.addBlock(null, {}, '01-01-2018')
    }

    mine(block, onSuccessCb = () => { }) {
        let inserted = false;

        while (!inserted) {
            const generatedHash = block.generateHash();

            if (block.seq % 100 == 0) {
                process.stdout.clearLine()
                process.stdout.cursorTo(0)
                process.stdout.write(`::MINE :: seq(${block.seq}).hash(${generatedHash})`);
            }

            block.hash = generatedHash;
            const hasPassableSignature = generatedHash.substr(0, this.complexity) === _.repeat('0', this.complexity);

            if (!hasPassableSignature) {
                block.seq++;
                continue;
            }

            this.blocks.push(block);

            onSuccessCb(block)

            inserted = true;
        }
    }

    addBlock(...args) {
        this.mine(this.createNewBlock(args));
    }

    createNewBlock(args) {
        const prevHash = this.blocks.length > 2 ? this.blocks[this.blocks.length - 1].generateHash() : null;
        return new Block(...args, prevHash);
    }

    isValid() {
        for (let i = 1; i < this.blocks.length; i++) {
            const currentBlock = this.blocks[i];
            const previousBlock = this.blocks[i - 1];

            if (currentBlock.hash !== currentBlock.generateHash()) {
                return false;
            }

            if (currentBlock.prevHash !== null && currentBlock.prevHash !== previousBlock.hash) {
                return false;
            }
        }

        return true;
    }

    balance() {
        return _.sumBy(this.blocks, block => block.data.amount)
    }
}

module.exports = BlockChain