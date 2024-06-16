const PhaseButton = ({ children, onClick = () => {}, selected = false }) => (
  <button
    type="button"
    onClick={onClick}
    className={`transition duration-[300ms] hover:scale-[1.05] rounded-[10px] 
    py-2 px-4 font-poppins_medium 
    ${selected ? "bg-green text-white" : "bg-black_3 text-gray_7"} `}
  >
    {children}
  </button>
)

export default PhaseButton