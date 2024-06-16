import useBaseChainAmount from "@/hooks/useBaseChainAmount"
import useCostAmount from "@/hooks/useCostAmount"
import { toUtf8Bytes } from "ethers/lib/utils"
import { createContext, useMemo, useContext, useState, useEffect } from "react"
import { keccak256 } from "viem"
import { useAccount } from "wagmi"

export const periods = [
  {
    bytes32Value: keccak256(toUtf8Bytes("ONE_MONTH")),
    label: "30 days"
  },
  {
    bytes32Value: keccak256(toUtf8Bytes("THREE_MONTH")),
    label: "90 days"
  },
  {
    bytes32Value: keccak256(toUtf8Bytes("HALF_YEAR")),
    label: "180 days"
  },
  {
    bytes32Value: keccak256(toUtf8Bytes("ONE_YEAR")),
    label: "365 days"
  }
]
const PhaseCardContext = createContext(null)

const PhaseCardProvider = ({ children }) => {
  const [periodType, setPeriodType] = useState(periods[0])
  const baseChainData = useBaseChainAmount()
  const costData = useCostAmount(baseChainData.baseAmount)
  const [evmAddress, setEvmAddress] = useState("")
  const { address } = useAccount()

  useEffect(() => {
    setEvmAddress(address)
  }, [address])

  const value = useMemo(
    () => ({
      evmAddress,
      setEvmAddress,
      ...baseChainData,
      ...costData,
      periodType,
      setPeriodType
    }),
    [baseChainData, costData, evmAddress, setEvmAddress, periodType, setPeriodType],
  )

  return <PhaseCardContext.Provider value={value}>{children}</PhaseCardContext.Provider>
}

export const usePhaseCard = () => {
  const context = useContext(PhaseCardContext)
  if (!context) {
    throw new Error("usePhaseCard must be used within a PhaseCardProvider")
  }
  return context
}

export default PhaseCardProvider
