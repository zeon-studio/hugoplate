---
title: "Hey, I am MacBobby Chibuzor!"
meta_title: "About"
description: "Learn more about MacBobby Chibuzor, a software engineer with a passion for FinTech and blockchain solutions."
image: "/images/avatar.png"
draft: false
---

### My Passion for Mathematics and Computation

I have a profound interest in the intersection of mathematics, computation, and philosophy.
The excitement of integrating complex mathematical concepts into my software projects is unparalleled.
For instance, I recently applied the Sum of Series formula to distribute funds between multiple Solana wallets:


```rust
/// Calculate distributions for each wallet based on the target amount.
fn calculate_wallet_distributions(total_wallet_balance: f64, wallet_count: usize) -> Vec<f64> {
    println!("Calculating distributions for wallets...");
    let total_parts: usize = (wallet_count * (wallet_count + 1)) / 2; // Using Sum of Series formula n(n+1)/2
    let part_value = total_wallet_balance / total_parts as f64;
    let mut distributions = Vec::new();

    for i in 1..=wallet_count {
        let wallet_share = part_value * i as f64; // Calculate each wallet's share based on their position in the sequence
        distributions.push(wallet_share);
    }
    println!("Distributions calculated: {:?}", distributions);
    distributions
}
```

I am interested in building quantitative financial models and researching trading algorithms for both crypto and synthetic assets.

### Academic Background and Aspirations
I pursued Mechatronics Engineering at the university, inspired by the vision of becoming a roboticist like Tony Stark.
This journey led me to enjoy working with Arduino and Raspberry Pi microcontrollers and
fostered a dream of founding a company that redefines domesticated robotics.

### Philosophy on Software Engineering
I view software engineering as a powerful enabler.
To me, programming is the art of commanding digital technology to realize my visions.
I am tool-agnostic, choosing whatever tools necessary to achieve my goals, driven by the desire to make my ideas come to life.

### Beyond Software Engineering
Outside of software engineering, I enjoy tinkering with microcontrollers, trading in financial markets,
exploring the crypto space, and sharing my knowledge at technical events and workshops.
As the Lead of the Open Source Community Africa Abeokuta chapter, I am deeply involved in the open-source community.

### What Books I Have Enjoyed Reading

Throughout my career and personal development, I have found inspiration and valuable insights from the following books:

- [x] The Almanack of Naval Ravikant by Eric Jorgenssen
- [x] The Rudest Book Ever by Shwetabh Gangwar
- [x] Elon Musk: A Biography by Ashlee Vance

Feel free to explore my portfolio and connect with me through my GitHub and LinkedIn profiles.
