import { useAccount } from "wagmi"
import { useState } from "react"
import handleTxError from "@/lib/handleTxError"
import { usePhaseCard } from "@/providers/PhaseCardProvder"
import { toast } from "react-toastify"
import useUSDC from "./useUSDC"
import evilkermitStaking from "@/lib/evilkermitStaking"
import { EvilKermitContract } from "@/lib/consts"
import { parseUnits } from "viem"
import getStakerInfo from "@/lib/getStakerInfo"

const useStakeWithUSDC = () => {
  const { address } = useAccount()
  const [loading, setLoading] = useState(false)
  const { baseAmount, periodType } = usePhaseCard()
  const { approve, allowance } = useUSDC()
  const { costAmount } = usePhaseCard()
  const { selectedChain } = usePhaseCard()
  const tokenAddress = selectedChain?.address

  const stakeNow = async () => {
    setLoading(true)
    try {
      if (costAmount === 0) {
        setLoading(false)
        toast.error("Empty amount!")
        return
      }

      const stakerInfo = await getStakerInfo(tokenAddress, address, periodType?.bytes32Value) as any
      const {error: errorOfStakerInfo} = stakerInfo
      if (errorOfStakerInfo) {
        setLoading(false)
        return
      }

      const stakingAmount = parseInt(stakerInfo[0].toString(), 10)
      if (stakingAmount > 0) {
        toast.error("Already staked!")
        setLoading(false)
        return
      }

      const amount = parseUnits(costAmount.toString(), 6)
      const allowanceAmount = await allowance() as any
      const requestAllowance = amount - allowanceAmount;

      if (requestAllowance >= 0) {
        const approveOfResponse = await approve(EvilKermitContract, requestAllowance)
        const { error: errorOfApprove } = approveOfResponse as any
        if (errorOfApprove) {
          setLoading(false)
          return
        }
      }

      const finalAllowanceAmount = await allowance() as any
      if (finalAllowanceAmount < amount) {
        toast.error("Insufficient allowance!")
        setLoading(false)
        return
      }

      const stakingOfResponse = await evilkermitStaking(tokenAddress, periodType?.bytes32Value, address, amount)
      const { error: stakingError } = stakingOfResponse as any
      if (stakingError) {
        setLoading(false)
        return
      }

      setLoading(false)
      toast.success("Success!")
      return true
    } catch (error) {
      handleTxError(error)
      setLoading(false)
      return { error }
    }
  }
  return {
    loading,
    baseAmount,
    stakeNow,
  }
}

export default useStakeWithUSDC
