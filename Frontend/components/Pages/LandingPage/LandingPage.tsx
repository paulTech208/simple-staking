import Container from "@/components/Container"
import Layout from "@/components/Layout"
import PhaseCardProvider from "@/providers/PhaseCardProvder"
import PhaseFeature from "./PhaseFeature"
import PhaseCard from "./PhaseCard"
import FadeInWhenVisible from "@/components/FadeInWhenVisible"

const LandingPage = () => (
  <Layout type="base">
    <Container containerClassName="flex mt-1" contentClassName="grid grid-cols-1 md:grid-cols-12 gap-[50px] mt-6" >
      <FadeInWhenVisible className="md:col-span-7 ">
        <PhaseCardProvider>
          <PhaseCard />
        </PhaseCardProvider>
      </FadeInWhenVisible>
      <FadeInWhenVisible className="md:col-span-5">
        <PhaseFeature />
      </FadeInWhenVisible>
    </Container>
  </Layout>
)

export default LandingPage
