
import useIsMobile from "@/hooks/useIsMobile"
import MobileMenu from "../MobileMenu"
import DesktopMenu from "../DesktopMenu"
import Logo from "./Logo"

const Header = () => {
  const isMobile = useIsMobile()
  return (
    <div
      className="p-[12px] flex justify-between mr-5"
    >
      <Logo />
      {isMobile && <MobileMenu />}
      {!isMobile && <DesktopMenu />}
    </div>

  )
}

export default Header
