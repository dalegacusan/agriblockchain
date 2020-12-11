# To run tests using truffle
(Truffle Develop: An interactive console that also spawns a development blockchain)
```bash
truffle develop
```

Execute tests on the truffle console
```bash
truffle(develop)> test
```

# To deploy to Ganache
1) Open Ganache

2) Create New Workspace (Ethereum)

3) Workspace Tab: Add truffle-config.js as truffle project

    You may leave the other settings as default

4) Click save workspace

5) Go to the truffle directory in command line

6) Deploy the smart contract by running:
```bash
truffle migrate
```

It should output something like this:

```bash
Compiling your contracts...
===========================
> Compiling .\contracts\Crowdfunding.sol
> Artifacts written to C:\Users\Minnie\Documents\Projects\UBX\agriblockchain\truffle\build\contracts
> Compiled successfully using:
   - solc: 0.5.16+commit.9c3226ce.Emscripten.clang



Starting migrations...
======================
> Network name:    'ganache'
> Network id:      5777
> Block gas limit: 6721975 (0x6691b7)


1_initial_migration.js
======================

   Replacing 'Migrations'
   ----------------------
   > transaction hash:    0x5abeb0e65981718fd1affeb04c3a641bbc1fb5c3c17e9cad2134f0bc991f4597
   > Blocks: 0            Seconds: 0
   > contract address:    0xba02d0C640395506DAb5787Ba67eA946B163e2f8
   > block number:        1
   > block timestamp:     1607706664
   > account:             0x3FdD9A81380b00409979765E4215e2Ab7c1A41e0
   > balance:             99.99616114
   > gas used:            191943 (0x2edc7)
   > gas price:           20 gwei
   > value sent:          0 ETH
   > total cost:          0.00383886 ETH


   > Saving migration to chain.
   > Saving artifacts
   -------------------------------------
   > Total cost:          0.00383886 ETH


2_simple_storage_migration.js
=============================

   Replacing 'SimpleStorage'
   -------------------------
   > transaction hash:    0x33c5d0ddfa3fa38038cc506ddd71db21ce788331a4f403e389fffb80855a792a
   > Blocks: 0            Seconds: 0
   > contract address:    0xb49A9c0ca4C8A9e39Baaba30c275eA1E369Eb0ff
   > block number:        3
   > block timestamp:     1607706664
   > account:             0x3FdD9A81380b00409979765E4215e2Ab7c1A41e0
   > balance:             99.99295504
   > gas used:            117967 (0x1cccf)
   > gas price:           20 gwei
   > value sent:          0 ETH
   > total cost:          0.00235934 ETH


   > Saving migration to chain.
   > Saving artifacts
   -------------------------------------
   > Total cost:          0.00235934 ETH


3_crowdfunding.js
=================

   Replacing 'Crowdfunding'
   ------------------------
   > transaction hash:    0x8a6105531dd4bb76359125d799f375b5df91a7a9292ad4dc113cfd76c6d7713f   
   > Blocks: 0            Seconds: 0
   > contract address:    0x18adBAc1b598B26040431a4d692CF14e789867f2
   > block number:        5
   > block timestamp:     1607706665
   > account:             0x3FdD9A81380b00409979765E4215e2Ab7c1A41e0
   > balance:             99.936876
   > gas used:            2776614 (0x2a5e26)
   > gas price:           20 gwei
   > value sent:          0 ETH
   > total cost:          0.05553228 ETH


   > Saving migration to chain.
   > Saving artifacts
   -------------------------------------
   > Total cost:          0.05553228 ETH


Summary
=======
> Total deployments:   3
> Final cost:          0.06173048 ETH
```

7) In Ganache, you should be able to see the transactions and info that the contract is deployed.
