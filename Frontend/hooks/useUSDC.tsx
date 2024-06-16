import handleTxError from "@/lib/handleTxError"
import { erc20ABI, useAccount, useWalletClient } from "wagmi"
import { CHAIN, CHAIN_ID, EvilKermitContract } from "@/lib/consts"
import { usePhaseCard } from "@/providers/PhaseCardProvder"
import { getPublicClient } from "@/lib/clients"

const useUSDC = () => {
  const { selectedChain } = usePhaseCard()
  const tokenAddress = selectedChain?.address
  const { data: walletClient } = useWalletClient()
  const { address } = useAccount()

  const approve = async (spender, amount) => {
    try {
      const hash = await walletClient?.writeContract({
        address: tokenAddress as `0x${string}`,
        abi: erc20ABI,
        functionName: "approve",
        account: address as `0x${string}`,
        chain: CHAIN,
        args: [spender, amount]
      })
      const transaction = await getPublicClient(CHAIN_ID).waitForTransactionReceipt({
        hash,
      })
      return transaction
    } catch (error) {
      handleTxError(error)
      return { error }
    }
  }

  const allowance = async () => {
    try {
      const response = await getPublicClient(CHAIN_ID)?.readContract({
        address: tokenAddress as `0x${string}`,
        abi: erc20ABI,
        functionName: "allowance",
        account: address as `0x${string}`,
        args: [address, EvilKermitContract],
      })

      return response
    } catch(error) {
      handleTxError(error)
      return {error}
    }
  }

  return {
    approve,
    allowance
  }
}

export default useUSDC
