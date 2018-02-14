const crypto = require('crypto');
const hash = crypto.createHash('sha256');

const block = (index, timestamp, data, previousHash) => {
    const hashBlock = () => {
        const hash = crypto.createHash('sha256')

        hash.update(index.toString())
        hash.update(timestamp.toString())
        hash.update(data);
        hash.update(previousHash)

        return hash.digest('hex')
    }

    return {
        index,
        timestamp,
        data,
        previousHash,
        hash: hashBlock()
    }
}

const createGenesisBlock = () => block(0, new Date(), 'Genesis Block', '0');

const nextBlock = ({ index, hash }) => block(index + 1, new Date(), `Block No. ${index}`, hash)

const blockchain = [createGenesisBlock()]
let previousBlock = blockchain[0]

const blockchainLength = 20;

for (let i = 0; i < blockchainLength; i++) {
    const blockToAdd = nextBlock(previousBlock)

    blockchain.push(blockToAdd)

    previousBlock = blockToAdd
    
    console.log(`Block ${blockToAdd.index} has been added to the blockchain`)
    console.log(`Hash: ${blockToAdd.hash}`)
}