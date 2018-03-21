const crypto = require('crypto');

class Block {
    constructor(id, data, timestamp, prevHash = null) {
        this.id = id;
        this.data = data;
        this.timestamp = timestamp;
        this.prevHash = prevHash;
        this.seq = 0;

        this.hash = this.generateHash();
    }

    generateHash() {
        const props = [
            this.id, JSON.stringify(this.data), this.timestamp, this.prevHash, this.seq
        ];
        const propString = props.join('.');
        return Block.sha256(propString);
    }

    isValid() {
        return this.hash === this.generateHash();
    }

    static sha256(message) {
        return crypto.createHash('sha256').update(message).digest('hex')
    }
}

module.exports = Block