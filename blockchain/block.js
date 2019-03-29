const { GENESIS_DATA, MINE_RATE } = require('../config');
const hexToBinary = require('hex-to-binary');
const { cryptoHash } = require('../util/');

class Block {
  constructor({ hash, lastHash, data, timestamp, nonce, difficulty }) {
    this.hash = hash;
    this.lastHash = lastHash;
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
      difficulty = Block.adjustDifficulty({ originalBlock: lastBlock, timestamp});
      hash = cryptoHash(timestamp, lastHash, data, nonce, difficulty);
    } while (hexToBinary(hash).substring(0, difficulty) !== '0'.repeat(difficulty));

    return new this({ hash, lastHash, data, timestamp, nonce, difficulty });
  }

  static adjustDifficulty({ originalBlock, timestamp }) {
    const { difficulty } = originalBlock;

    if (difficulty < 1) return 1;
    if ((timestamp - originalBlock.timestamp) > MINE_RATE ) return difficulty - 1;
    
    return difficulty + 1;
  }
}

module.exports = Block;