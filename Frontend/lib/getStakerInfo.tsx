import { getPublicClient } from "./clients"
import { CHAIN_ID, EvilKermitContract } from "./consts"
import handleTxError from "./handleTxError"
import abi from "@/lib/abi/evilkermit.json"

const getStakerInfo = async (tokenAddress, address, periodType) => {
    try {
        const response = await getPublicClient(CHAIN_ID)?.readContract({
            address: EvilKermitContract as `0x${string}`,
            abi,
            functionName: "stakerInfos",
            account: address as `0x${string}`,
            args: [tokenAddress, address, periodType],
          })
    
          return response
    } catch(error) {
        handleTxError(error)
        return {error}
    }
}

export default getStakerInfo