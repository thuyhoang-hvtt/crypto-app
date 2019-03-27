const { GENESIS_DATA, MINE_RATE } = require('../config');
const hexToBinary = re

class Block {
  constructor({ hash, lashHash, data, timestamp, nonce, difficulty }) {
    this.hash = hash;
    this.lashHash = lashHash;
    this.data = data;
    this.timestamp = timestamp;
    this.nonce = nonce;
    this.difficulty = difficulty;
  }

  static genesis() {
    return new this(GENESIS_DATA);
  }

  static mineBlock({ lastBlock, data }) {
    const lastHash = lastBlock.hash;
    let hash, timestamp;
    let { difficulty } = lastBlock;
    let nonce = 0;
    
    do {
      nonce++;
      timestamp = Date.now();
      difficulty = Block.adjustDifficulty({ originalBlocl: lastBlock, timestamp});
      hash = cryptoHash(timestamp, lastHash, data, nonce, difficulty);
    } while (hexToBinary(hash).substring(0, difficulty) !== '0'.repeat(difficulty));

    return new this({ hash, lashHash, data, timestamp, nonce, difficulty });
  }

  static adjustDifficulty({ originalBlocl, timestamp }) {
    const { difficulty } = originalBlock;

    if (difficulty < 1) return 1;
    if ((timestamp - originalBlcok.timestamp) > MINE_RATE ) return difficulty - 1;
    
    return difficulty + 1;
  }
}

module.exports = Block;