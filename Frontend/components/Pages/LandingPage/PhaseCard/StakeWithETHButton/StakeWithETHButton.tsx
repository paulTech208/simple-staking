import useStakeWithUSDC from "@/hooks/useStakeWithUSDC"

const StakeWithETHButton = () => {
  const { loading, stakeNow } = useStakeWithUSDC()

  return (
    <button
      className="w-full flex justify-center items-center 
            rounded-[30px] p-2 border border-black_2 
            mt-4 transition duration-[300ms] hover:scale-[1.1]"
      type="button"
      onClick={stakeNow}
      disabled={loading}
    >
      <div
        className="w-full bg-green py-2 px-6 
            text-white rounded-[20px] font-poppins text-center"
      >
        {loading ? "Pending..." : "Stake Now"}
      </div>
    </button>
  )
}

export default StakeWithETHButton
