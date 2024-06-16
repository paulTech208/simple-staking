import Header from "../Header"
import SeoHead from "../SeoHead"
import { ILayout } from "./types"

const BaseLayout = ({ children }: ILayout) => (
  <div className="w-screen">
    <div
      className="fixed w-full top-0 left-0 z-[10] py-8
                bg-[url('/images/bg-kermil.png')] bg-cover bg-no-repeat
                relative w-screen min-h-screen"
    >
      <SeoHead title="Evil Kermit" description="Evil Kermit UI" image="/SEO_LOGO_ICON.png" />
      <Header />
      {children}
    </div>
  </div>
)

export default BaseLayout
