const Block = require('./block');
const {GENESIS_DATA} = require('../config');

describe('Block', () => {
  const hash = 'foo-hash';
  const lastHash = 'bar-hash';
  const data = ['data', 'anotherdata', 'etc'];
  const timestamp = 'a-data';
  const nonce = 1;
  const difficulty = 1;
  const block = new Block(
    {
      hash,
      lastHash,
      data,
      timestamp,
      nonce,
      difficulty
    }
  );

  it('has a hash, lastHash, data and, timestamp property', () => {
    expect(block.timestamp).toEqual(timestamp);
    expect(block.hash).toEqual(hash);
    expect(block.lastHash).toEqual(lastHash); 
    expect(block.data).toEqual(data);
    expect(block.nonce).toEqual(nonce);
    expect(block.difficulty).toEqual(difficulty);
  });

  describe('genesis()', () => {
    const genesisBlock = Block.genesis();

    it('returns a Block instance', () => {
      expect(genesisBlock instanceof Block).toBe(true);
    });

    it('returns the genesis data', () => {
      expect(genesisBlock).toEqual(GENESIS_DATA);
    });
  });

  describe('mineBlock()', () => {
    const lastBlock = Block.genesis();
    const data = 'mined data';
    const minedBlock = Block.mineBlock({ lastBlock, data });

    it('return a Block instance', () => {
      expect(minedBlock instanceof Block).toBe(true);
    });

    it('sets the `lastHash` to be the `hash` of the lastBlock', () => {
      expect(minedBlock.lastHash).toEqual(lastBlock.hash);
    });

    it('sets the `data`', () => {
      expect(minedBlock.data).toEqual(data);
    });

    it('sets the `timestamp`', () => {
      expect(minedBlock.timestamp).not.toEqual(undefined);
    });

    
  });
});