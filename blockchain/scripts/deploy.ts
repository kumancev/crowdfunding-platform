import { ethers, run } from 'hardhat'

import { CrowdFunding__factory } from '../typechain-types'

async function main() {
  const [signer] = await ethers.getSigners()

  const crowdFunding = await new CrowdFunding__factory(signer).deploy()

  await crowdFunding.deployed()

  console.log('CrowdFunding contract deployed to:', crowdFunding.address)

  await run('verify:verify', {
    address: crowdFunding.address,
    contract: 'contracts/CrowdFunding.sol:CrowdFunding'
  })
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})