import { post } from 'utils/ipfsHash'
import txHelper, { checkMetaMask } from './_txHelper'
import contracts from '../contracts'

async function withdrawOffer(_, data) {
  await checkMetaMask(data.from)
  const ipfsHash = await post(contracts.ipfsRPC, data)
  const tx = contracts.marketplaceExec.methods
    .withdrawOffer(data.listingID, data.offerID, ipfsHash)
    .send({
      gas: 4612388,
      from: data.from || web3.eth.defaultAccount
    })

  return txHelper({ tx, mutation: 'withdrawOffer' })
}

export default withdrawOffer
