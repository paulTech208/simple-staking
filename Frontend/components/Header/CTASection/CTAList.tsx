import Link from "next/link"

const CTAList = () => (
  <div className="flex gap-[30px]">
    <Link href="/">
      <div className="cursor-pointer font-mainFont text-[18px] text-white flex items-center min-w-[100px]">
        <span className="w-[7px] h-[7px] rounded-full bg-green_4 mr-[10px]"></span>
        <p className="hover:text-green_4">HOME</p>
      </div>
    </Link>
    <Link href="/">
    <div className="cursor-pointer font-mainFont text-[18px] text-white flex items-center min-w-[100px]">
        <span className="w-[7px] h-[7px] rounded-full mr-[10px]"></span>
        <p className="hover:text-green_4">ABOUT</p>
      </div>
    </Link>
    <Link href="/">
    <div className="cursor-pointer font-mainFont text-[18px] text-white flex items-center min-w-[100px]">
        <span className="w-[7px] h-[7px] rounded-full mr-[10px]"></span>
        <p className="hover:text-green_4">TOKENOMICS</p>
      </div>
    </Link>
    <Link href="/">
    <div className="cursor-pointer font-mainFont text-[18px] text-white flex items-center min-w-[100px]">
        <span className="w-[7px] h-[7px] rounded-full mr-[10px]"></span>
        <p className="hover:text-green_4">ROADMAP</p>
      </div>
    </Link>
    <Link href="/">
    <div className="cursor-pointer font-mainFont text-[18px] text-white flex items-center min-w-[100px]">
        <span className="w-[7px] h-[7px] rounded-full mr-[10px]"></span>
        <p className="hover:text-green_4">WHITEPAPER</p>
      </div>
    </Link>
  </div>
)

export default CTAList
