import { useEthersSigner } from "@/hooks/useEthersSigner"
import WalletConnectButton from "@/components/WalletConnectButton"
import ConnectButton from "../ConnectButton"
import StakeWithETHButton from "../StakeWithETHButton"

const StakeButton = () => {
  const signer = useEthersSigner()

  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {signer ? (
        <StakeWithETHButton />
      ) : (
        <WalletConnectButton>
          <ConnectButton />
        </WalletConnectButton>
      )}
    </>
  )
}

export default StakeButton
