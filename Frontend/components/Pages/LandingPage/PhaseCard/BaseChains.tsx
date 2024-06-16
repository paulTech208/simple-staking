import Media from "@/shared/Media"
import { chainsData } from "@/hooks/useBaseChainAmount"
import FadeInWhenVisible from "@/components/FadeInWhenVisible"

const BaseChains = () => {
  return (
    <FadeInWhenVisible className="flex flex-col items-start justify-between bg-black_3 p-[15px] rounded-[10px]">
      <p className="font-poppins_medium text-[10px] text-gray_5">SELECT A PAYMENT METHOD</p>
      <div className="w-full relative mt-[30px]">
        <button
          type="button"
          className="flex w-full gap-2 items-center justify-between
                px-2 bg-black_4 rounded-[10px] font-poppins_medium
                py-1"
        >
          <div className="flex gap-2 items-center texh-white">
            <Media
              type="image"
              link={chainsData[0]?.link}
              blurLink={chainsData[0]?.link}
              containerClasses="w-[20px] aspect-[1/1]"
            />
            <p className="text-white">{chainsData[0]?.symbol}</p>
          </div>
        </button>
      </div>
    </FadeInWhenVisible>
  )
}

export default BaseChains
