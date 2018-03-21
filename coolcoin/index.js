global._ = require('lodash');
const { Block, BlockChain } = require('./chain');

console.time(`::TIMER:`);

const now   = _.now()
const chain = new BlockChain({ complexity: 0 });

const onSuccessCallback = (block) => {
    // console.log(JSON.stringify(block, null, 2));
    console.log('::CHAIN:: chain.balance : ', chain.balance());
    console.log('::CHAIN:: chain.length  : ', chain.size());
    console.log('::CHAIN:: chain.isValid : ', chain.isValid() ? 'Yes' : 'No');
}


_.range(1, 15).forEach((i) => {
    console.time(`::TIMER:: mining.block.${i}`);
    
    chain.setComplexity(_.random(1,5))
    console.log('\n\n::CHAIN:: chain.complexity : ', chain.complexity);
    chain.mine(new Block(i, { amount: _.random(true) }, _.uniqueId() + now), onSuccessCallback)
    
    console.timeEnd(`::TIMER:: mining.block.${i}`);
})

console.timeEnd(`::TIMER:`);