const Block = require('./block');

const { cryptoHash } = require('../util');
const { REWARD_INPUT, MINING_REWARD } = require('../config');

class BlockChain {
  constructor() {
    this.chain = [Block.genesis()];
  }

  addBlock({ data }) {
    const newBlock = Block.mineBlock(
      {
        lastBlock: this.chain[this.chain.length - 1],
        data
      }
    );

    this.chain.push(newBlock);
  }

}