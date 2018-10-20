import OriginToken from '../contracts/OriginToken'
import StandardToken from '../contracts/Token'
import contracts from '../contracts'

import txHelper, { checkMetaMask } from './_txHelper'

async function deployToken(_, args) {
  const web3 = contracts.web3Exec
  await checkMetaMask(web3.eth.defaultAccount)
  const supply = web3.utils.toWei(args.supply, 'ether')
  let tx, Contract

  if (args.type === 'Standard') {
    Contract = new web3.eth.Contract(StandardToken.abi)
    tx = Contract.deploy({
      data: '0x' + StandardToken.data,
      arguments: [args.name, args.symbol, args.decimals, supply]
    })
  } else {
    Contract = new web3.eth.Contract(OriginToken.abi)
    tx = Contract.deploy({
      data: '0x' + OriginToken.data,
      arguments: [supply]
    })
  }

  tx = tx.send({ gas: 4612388, from: args.from })

  return txHelper({
    tx,
    mutation: 'deployToken',
    onReceipt: receipt => {
      let tokens = []
      try {
        tokens = JSON.parse(window.localStorage[`${context.net}Tokens`])
      } catch (e) {
        /* Ignore */
      }
      const tokenDef = {
        type: args.type,
        id: receipt.contractAddress,
        name: args.name,
        symbol: args.symbol,
        decimals: args.decimals,
        supply
      }
      tokens.push(tokenDef)
      localStorage[`${context.net}Tokens`] = JSON.stringify(tokens)

      if (args.type === 'OriginToken') {
        Contract.options.address = receipt.contractAddress
        window.localStorage[`${args.symbol}Contract`] = receipt.contractAddress
        contracts.ogn = Contract
        contracts[receipt.contractAddress] = contracts.ogn
        contracts.tokens.push({
          ...tokenDef,
          contract: Contract,
          contractExec: Contract
        })
      }
    }
  })
}

export default deployToken

/*
mutation deployToken($name: String, $symbol: String, $decimals: Int, $supply: String) {
  deployToken(name: $name, symbol: $symbol, decimals: $decimals, supply: $supply)
}

{ "name": "OriginToken",
 "symbol": "OGN",
 "decimals": 2,
 "supply": "1000000"}

 */
