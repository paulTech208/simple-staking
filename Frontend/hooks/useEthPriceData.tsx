import { useState, useEffect } from "react"
import getCoinPrice from "../lib/getCoinPrice"

const useEthPriceData = () => {
  const [coinType, setCoinType] = useState("USDC")
  const [coinPrice, setCoinPrice] = useState(0)

  useEffect(() => {
    const fetchCoinPrice = async () => {
      try {
        const price = await getCoinPrice(coinType)
        setCoinPrice(price)
      } catch (error) {
        console.error("Error fetching coin price:", error)
        setCoinPrice(0)
      }
    }

    fetchCoinPrice()
  }, [coinType])

  return {
    coinPrice,
    setCoinType,
  }
}

export default useEthPriceData
