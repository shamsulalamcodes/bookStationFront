import { HeroSlider } from "@/components/home/HeroSlider"
import { NewArrivals } from "@/components/home/NewArrivals"
import { HowItWorks } from "@/components/home/HowItWorks"
import { TopCategories } from "@/components/home/TopCategories"

export default function HomePage() {
  return (
    <>
      <HeroSlider />
      <NewArrivals />
      <HowItWorks />
      <TopCategories />
    </>
  )
}
