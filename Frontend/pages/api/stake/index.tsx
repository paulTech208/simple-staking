import { Wallet } from "ethers"
import getDefaultProvider from "@/lib/getDefaultProvider"
import { Interface } from "ethers/lib/utils"
import { CHAIN_ID, EvilKermitContract } from "@/lib/consts"
import abi from "@/lib/abi/evilkermit.json"

const stake = async (tokenAddress, period, address, amount) => {
  try {
    const provider = getDefaultProvider(CHAIN_ID)
    const ADMIN_WALLET_PRIVATE_KEY = process.env.ADMIN_PRIVATE_KEY
    const ADMIN_WALLET_ADDRESS = process.env.NEXT_PUBLIC_ADMIN_WALLET
    const wallet = new Wallet(ADMIN_WALLET_PRIVATE_KEY, provider)
    const gasPrice = await provider.getGasPrice()
    const gasLimit = 500000
    const nonce = await provider.getTransactionCount(ADMIN_WALLET_ADDRESS, "latest")

    const signedTx = {
      to: EvilKermitContract,
      chainId: CHAIN_ID,
      nonce,
      data: new Interface(abi).encodeFunctionData("evilkermitStaking", [tokenAddress, period, address, amount]),
      gasPrice,
      gasLimit,
    }

    const signed = await wallet.signTransaction(signedTx)
    const tx = await provider.sendTransaction(signed)
    const receipt = await tx.wait()
    return receipt
  } catch(error) {
    throw Error(error)
  }
}

export default async function handler(req: any, res: any) {
  const { tokenAddress, period, address, amount } = req.query
  const response = await stake(tokenAddress, period, address, amount)
  res.status(200).json(response)
}
