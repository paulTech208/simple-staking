import Media from "@/shared/Media"

const Logo = () => (
  <div className="flex justify-between flex items-center gap-[10px] cursor-pointer">
    <Media
      type="image"
      link="/images/evil-logo.svg"
      blurLink="/images/evil-logo.svg"
      containerClasses="w-[50px] aspect-[1/1]"
    />
    <p className="text-[white] text-[32px] font-WAGHU">
      Evil Kermit
    </p>
  </div>
)

export default Logo
