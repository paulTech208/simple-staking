import FadeInWhenVisible from "@/components/FadeInWhenVisible"
import { usePhaseCard } from "@/providers/PhaseCardProvder"
import Media from "@/shared/Media"

const BaseChains = () => {
  const { baseAmount, onChangeBaseAmount } = usePhaseCard()

  return (
    <FadeInWhenVisible className="flex flex-col items-start justify-between bg-black_3 p-[15px] rounded-[10px]">
      <p className="font-poppins_medium text-[10px] text-gray_5">
        INPUT THE AMOUNT YOU WANT TO STAKE
      </p>
      <div className="w-full relative mt-[20px]">
        <div className="flex flex-col items-end">
          <span className="text-[10px] font-poppins_medium text-gray_6">Max.</span>
          <div
            className="flex w-full gap-2 items-center justify-between
                 bg-black_4 rounded-[10px] px-2 py-1 text-[16px]"
          >
            <Media
              type="image"
              link="/images/usdc.svg"
              blurLink="/images/usdc.png"
              containerClasses="w-[20px] aspect-[1/1]"
            />
            <input
              type="text"
              value={baseAmount}
              className="bg-black_4 !max-w-[120px] 
              !outline-none !border-none text-[16px]
              !text-right text-white !font-poppins_medium"
              placeholder="Enter amount"
              onChange={onChangeBaseAmount}
            />
          </div>
        </div>
      </div>
    </FadeInWhenVisible>
  )
}

export default BaseChains
