import TargetBar from "./TargetBar"
import BaseChains from "../BaseChains"
import Amount from "../Amount"
import Cost from "../Cost"
import StakeButton from "./StakeButton"
import PhaseButton from "./PhaseButton"
import { periods, usePhaseCard } from "@/providers/PhaseCardProvder"

const PhaseContent = () => {
  const { setPeriodType, periodType } = usePhaseCard()

  return (
    <>
      <TargetBar />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-[20px] gap-y-[10px] md:mt-[10px]">
        <BaseChains />
        <Amount />
        <div className="md:col-span-2">
          <Cost />
        </div>
        <div className="grid gap-[10px] grid-cols-1 md:grid-cols-4 md:col-span-2 flex w-full justify-between mt-2">
          
        </div>
      </div>
      <StakeButton />
    </>
  )
}

export default PhaseContent
