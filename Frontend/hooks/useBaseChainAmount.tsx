import { useState } from "react"
export const chainsData = [
  {
    link: "/images/usdc.svg",
    symbol: "USDC",
    address: "0xD78CbCc1b2F0D1a10E242Fcac093690480eC8351"
  },
]

const useBaseChainAmount = () => {
  const [baseAmount, setBaseAmount] = useState(0)
  const [selectedChain, setSelectedChain] = useState(chainsData[0])

  const onChangeBaseAmount = (e) => {
    setBaseAmount(e.target.value)
  }
  return {
    baseAmount,
    setBaseAmount,
    onChangeBaseAmount,
    selectedChain,
    setSelectedChain,
  }
}

export default useBaseChainAmount
