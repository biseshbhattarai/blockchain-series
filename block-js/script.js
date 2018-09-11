const HASH = require('crypto-js/sha256')


class Block{
	constructor(index, timestamp, data, previousHash = ""){
		this.index = index;
		this.previousHash = previousHash;
		this.timestamp = timestamp;
		this.data = data;
		this.hash = this.calculateHash();
	}

	calculateHash(){
        return HASH(this.index + this.previousHash + this.timestamp + this.data).toString();
        
    }
    
}

class BlockChain{
    constructor(){
        this.chain = [this.createGenesis()];
    }

    createGenesis(){
        return new Block(0 , "01/23/2075", "Genesis Block", "0");
    }

    getLatestBlock(){
        return this.chain[this.chain.length -1];
    }

    addBlock(newBlock){
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.hash = newBlock.calculateHash();
        this.chain.push(newBlock)
    }
}

//Create a instance
let biscoin = new BlockChain();
biscoin.addBlock(new Block(1, "30/04/2007", {amount : 1233}))
biscoin.addBlock(new Block(2, "23/06/2075", {amount : 444}))
console.log(JSON.stringify(biscoin, null, 4 ))