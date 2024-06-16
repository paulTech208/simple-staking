import FadeInWhenVisible from "@/components/FadeInWhenVisible"
import useIsMobile from "@/hooks/useIsMobile"
import { usePhaseCard } from "@/providers/PhaseCardProvder"
import Media from "@/shared/Media"

const Cost = () => {
  const { costAmount } = usePhaseCard()
  const isMobile = useIsMobile()
  return (
    <FadeInWhenVisible className="flex flex-col items-start justify-content-center bg-black_3 p-[15px] rounded-[10px]">
      <div className="w-full flex justify-between items-start">
        <p className="text-gray_5 text-[10px] font-poppins_medium">YOU WILL GET</p>
        <div className="flex flex-col items-end text-gray_5 text-[10px] font-poppins_medium">
          <span className="">USD COST</span>
          <span className="font-poppins_medium text-gray_6 text-[10px]">$0.00</span>
        </div>
      </div>
      <div className="w-full flex justify-between items-center mt-[20px]">
        {!isMobile && <Media
          type="image"
          link="/images/evilkermit1.svg"
          blurLink="/images/evilkermit1.png"
          containerClasses="w-[25px] aspect-[15/15]"
        />}
        <div
          className="w-full bg-black_4 flex justify-between items-center max-w-[250px] 
            text-white px-2 py-1 rounded-[10px] gap-[10px]"
        >
          <div className="flex">
            <Media
              type="image"
              link="/images/evilkermit1.svg"
              blurLink="/images/evil-logo.svg"
              containerClasses="w-[25px] aspect-[1/1]"
            />
          </div>
          <div className="flex-grow max-w-[200px] min-w-[100px]">
            <input type="text" className="w-full bg-black_4 !outline-none !border-none
            !text-right text-white !font-poppins_medium" value={costAmount} placeholder="0" readOnly/>
          </div>
        </div>
      </div>
    </FadeInWhenVisible>
  )
}

export default Cost
