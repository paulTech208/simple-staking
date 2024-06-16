import FadeInWhenVisible from "@/components/FadeInWhenVisible"
import Media from "@/shared/Media"

const PhaseFeature = () => {
  return (
    <FadeInWhenVisible className="w-full h-full rounded-[24px] overflow-hidden relative border border-[3px] border-dashed border-green_5 min-h-[400px]">
      <div
        className="w-full h-full px-[30px] py-[50px]
        flex flex-col justify-between
         bg-center bg-cover z-[2] absolute"
      >
        <div className="flex flex-col">
          <div className="text-[20px] font-poppins_semibold text-white ">
            Invest in the Future of <span className="text-green_5 text-[25px] font-WAGHU">AI</span>
            <br />
            <span className="text-green text-[25px] font-WAGHU">EvilKermit</span> Staking of the Year.
          </div>
        </div>
      </div>
      
      <div className="absolute left-[50%] translate-x-[-50%] z-[1] rounded-[20px] overflow-hidden bottom-[0px] md:bottom-[50px]">
        <Media
          type="image"
          blurLink="/images/kermit2.png"
          link="/images/kermit2.png"
          containerClasses="w-[304px] aspect-[1/1] z-[2]"
        />
      </div>
    </FadeInWhenVisible>
  )
}

export default PhaseFeature
