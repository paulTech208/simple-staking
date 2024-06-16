import axios from "axios"
import handleTxError from "./handleTxError"

const evilkermitStaking = async (tokenAddress, period, address, amount) => {
  try {
    const response = await axios.get("/api/stake", {
      params: {
        tokenAddress,
        period,
        address,
        amount
      },
    })

    return response
  } catch (error) {
    handleTxError(error)
    return { error }
  }
}

export default evilkermitStaking
