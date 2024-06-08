---
title: "Blockchain Foundations: 1"
meta_title: ""
description: "Learning about Blockchain Architecture by building a blockchain from scratch."
date: "2024-05-13T05:00:00Z"
image: "/images/blockchain-foundations-header.png"
categories: ["Blockchain"]
author: "MacBobby Chibuzor"
tags: ["blockchain", "rust", "study"]
draft: false
---

# What is a blockchain

## Technical definition

A **blockchain** is a [distributed ledger](https://en.wikipedia.org/wiki/Distributed_ledger) with growing lists of [records](https://en.wikipedia.org/wiki/Record_(computer_science)) (*blocks*) that are securely linked together via [cryptographic hashes](https://en.wikipedia.org/wiki/Cryptographic_hash_function).[[1]](https://en.wikipedia.org/wiki/Blockchain#cite_note-fortune20160515-1)[[2]](https://en.wikipedia.org/wiki/Blockchain#cite_note-nyt20160521-2)[[3]](https://en.wikipedia.org/wiki/Blockchain#cite_note-te20151031-3)[[4]](https://en.wikipedia.org/wiki/Blockchain#cite_note-cryptocurrencytech-4) Each block contains a cryptographic hash of the previous block, a [timestamp](https://en.wikipedia.org/wiki/Trusted_timestamping), and transaction data (generally represented as a [Merkle tree](https://en.wikipedia.org/wiki/Merkle_tree), where [data nodes](https://en.wikipedia.org/wiki/Node_(computer_science)) are represented by leaves). Since each block contains information about the previous block, they effectively form a *chain* (compare [linked list](https://en.wikipedia.org/wiki/Linked_list) data structure), with each additional block linking to the ones before it. Consequently, blockchain transactions are irreversible in that, once they are recorded, the data in any given block cannot be altered retroactively without altering all subsequent blocks.

Blockchains are typically managed by a [peer-to-peer (P2P)](https://en.wikipedia.org/wiki/Peer-to-peer) computer network for use as a public [distributed ledger](https://en.wikipedia.org/wiki/Distributed_ledger), where nodes collectively adhere to a [consensus algorithm](https://en.wikipedia.org/wiki/Consensus_algorithm) [protocol](https://en.wikipedia.org/wiki/Communication_protocol) to add and validate new transaction blocks. Although blockchain records are not unalterable, since [blockchain forks](https://en.wikipedia.org/wiki/Fork_(blockchain)) are possible, blockchains may be considered [secure by design](https://en.wikipedia.org/wiki/Secure_by_design) and exemplify a distributed computing system with high [Byzantine fault tolerance](https://en.wikipedia.org/wiki/Byzantine_fault_tolerance).[[5]](https://en.wikipedia.org/wiki/Blockchain#cite_note-5)

A blockchain was created by a person (or group of people) using the name (or [pseudonym](https://en.wikipedia.org/wiki/Pseudonym)) [Satoshi Nakamoto](https://en.wikipedia.org/wiki/Satoshi_Nakamoto) in 2008 to serve as the public [distributed ledger](https://en.wikipedia.org/wiki/Distributed_ledger) for [bitcoin](https://en.wikipedia.org/wiki/Bitcoin) [cryptocurrency](https://en.wikipedia.org/wiki/Cryptocurrency) transactions, based on previous work by [Stuart Haber](https://en.wikipedia.org/wiki/Stuart_Haber), [W. Scott Stornetta](https://en.wikipedia.org/wiki/W._Scott_Stornetta), and [Dave Bayer](https://en.wikipedia.org/wiki/Dave_Bayer).[[6]](https://en.wikipedia.org/wiki/Blockchain#cite_note-6) The implementation of the blockchain within bitcoin made it the first digital currency to solve the [double-spending](https://en.wikipedia.org/wiki/Double-spending) problem without the need for a trusted authority or central [server](https://en.wikipedia.org/wiki/Server_(computing)). The [bitcoin](https://en.wikipedia.org/wiki/Bitcoin) design has inspired other applications[[3]](https://en.wikipedia.org/wiki/Blockchain#cite_note-te20151031-3)[[2]](https://en.wikipedia.org/wiki/Blockchain#cite_note-nyt20160521-2) and blockchains that are readable by the public and are widely used by [cryptocurrencies](https://en.wikipedia.org/wiki/Cryptocurrencies). The blockchain may be considered a type of [payment rail](https://en.wikipedia.org/wiki/Payment_rail).[[7]](https://en.wikipedia.org/wiki/Blockchain#cite_note-7)

## Simplistic definition

A blockchain is a chain of blocks, where each block is connected in a parent-child (one-to-one) relationship — forming the chain.

### Elements of a blockchain

The blocks have properties like the:

- block index (nonce: number occurring once, difficulty)
- current block hash
- previous block hash
- data (often about transactions)
- timestamp

![Blockchain Elements](/images/blockchain-elements.png)

The first block has a set of unique properties given that it is actually the first block in the blockchain. Some of these properties include:

- **No previous block hash:** Since it's the first block, there isn't a preceding block to reference. This is a key difference from all subsequent blocks.
- **Potential content:** The first block, often called the **Genesis Block**, can contain additional information beyond the typical data field. This might include:
    - **Creation timestamp:** This marks the official launch of the blockchain. For example, the Bitcoin Genesis Block was mined on January 3rd, 2009.
    - **Symbolic message:** Some creators embed a message in the Genesis Block, perhaps signifying the purpose of the blockchain.

In essence, the Genesis Block acts as the foundation stone for the entire blockchain. It establishes the initial data structure and cryptographic hash reference point for all subsequent blocks.

### The block header

The nonce/index, current block hash, previous block hash, and timestamp of a block makes up the **block’s header**. The block’s header is hashed using a cryptographic hash function, and this forms a correct “previous block hash”.

# Implementing the current knowledge in Rust

First, we construct a block based on the elements in the block.

```rust
#[derive(Debug)]
pub struct Block {
    index: u64,
    block_hash: String,
    previous_block_hash: String,
    txn_data: String,
    timestamp: u64,
}
```

Next, we create a constructor for a new block, with a dedicated hash derived from the block and the hash from the previous block.

```rust
impl Block {
    pub fn new(index: u64, previous_block_hash: String, txn_data: String) -> Self {
        let timestamp = SystemTime::now().duration_since(UNIX_EPOCH).unwrap().as_secs();
        let block_hash = Self::calculate_hash(index, timestamp, &previous_block_hash, &txn_data);

        // Construct a new Block.
        Block {
            index,
            block_hash,
            previous_block_hash,
            txn_data,
            timestamp
        }
    }

    fn calculate_hash(index: u64, timestamp: u64, previous_block_hash: &str, txn_data: &str) -> String {
        let to_hash = format!("{}:{}:{}:{}", index, timestamp, previous_block_hash, txn_data);
        format!("{:x}", md5::compute(to_hash))
    }
}
```

Afterwards, we initialize a new blockchain with a genesis block and a functionality to add subsequent blocks to it.

```rust
impl Blockchain {
    pub fn new() -> Self {
        let genesis_block = Block::new(0, "Genesis Block".to_string(), "".to_string());
        Blockchain {
            blocks: vec![genesis_block],
        }
    }

    pub fn add_block(&mut self, txn_data: String) {
        let previous_block = &self.blocks[self.blocks.len() -1];
        let new_block = Block::new(
            self.blocks.len() as u64,
            previous_block.block_hash.clone(),
            txn_data,
        );
        self.blocks.push(new_block);
    }
}
```

We can run our dummy blockchain like this:

`main.rs`:

```rust
mod block;
mod chain;

fn main() {
    let mut blockchain = block::block_structure::Blockchain::new();

    blockchain.add_block("Transaction 1".to_string());
    blockchain.add_block("Transaction 2".to_string());

    for block in blockchain.blocks {
        println!("{:?}", block);
    }
}
```

# Conclusion

We made use of heuristic data types and simplistic implementations in this article to explain the elements of a blockchain. 
We will be improving on this in the next article, where we will use the actual data structures and more advanced implementations to 
further understand how blockchains truly work.
