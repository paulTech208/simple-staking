import { motion } from "framer-motion"
import Link from "next/link"

const MenuList = ({
  handleClose = () => {}
}) => (
  <div className="w-screen h-screen fixed left-0 top-[0px] 3md:top-[115px] z-[2] bg-[rgba(0,0,0,.5)]">
    <motion.div
      className="w-full h-full bg-white text-[16px] font-radikal_light text-black cursor-pointer overflow-y-auto
          shadow-[0_0_1rem_rgba(0,0,0,.2)]"
      initial={{
        x: "100%",
      }}
      animate={{
        x: "0%",
      }}
      exit={{
        x: "0%",
      }}
      transition={{
        duration: 0.2,
      }}
    >
      <div className="w-full">
        <button type="button" className="px-3 py-2 border border-1px m-2" onClick={handleClose}>X</button>
      </div>
      <div>
        <Link href="/">
          <div className="px-[32px] py-[20px] border-b border-b-gray hover:bg-gray_1">HOME</div>
        </Link>
        <Link href="/">
          <div className="px-[32px] py-[20px] border-b border-b-gray hover:bg-gray_1">ABOUT</div>
        </Link>
        <Link href="/">
          <div className="px-[32px] py-[20px] border-b border-b-gray hover:bg-gray_1">TOKENOMICS</div>
        </Link>
        <Link href="/">
          <div className="px-[32px] py-[20px] border-b border-b-gray hover:bg-gray_1">ROADMAP</div>
        </Link>
        <Link href="/">
          <div className="px-[32px] py-[20px] border-b border-b-gray hover:bg-gray_1">WHITEPAPER</div>
        </Link>
        <Link href="/">
          <div className="px-[32px] py-[20px] border-b border-b-gray hover:bg-gray_1">Connect</div>
        </Link>
      </div>
    </motion.div>
  </div>
)

export default MenuList
