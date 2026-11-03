"use client"

import Link from "next/link"
import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay, Navigation, Pagination } from "swiper/modules"
import { BookOpen, Library, Sparkles } from "lucide-react"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"

const slides = [
  {
    title: "Your Next Great Read Is Waiting",
    text: "Explore hundreds of classics, thrillers, and fantasy adventures, all in one friendly library.",
    icon: BookOpen,
    bg: "from-indigo-700 to-indigo-950",
  },
  {
    title: "Borrow a Book in Seconds",
    text: "Pick a book, choose 3, 7, or 14 days, and start reading. Return it when you are done.",
    icon: Library,
    bg: "from-violet-700 to-slate-900",
  },
  {
    title: "Share Books With Fellow Readers",
    text: "Own a book others would enjoy? Add it to BookStation and let the community read it too.",
    icon: Sparkles,
    bg: "from-indigo-600 to-fuchsia-900",
  },
]

// Home page banner. Each slide has a title, short text and a button.
export function HeroSlider() {
  return (
    <section
      className="w-full"
      style={
        {
          "--swiper-navigation-color": "#ffffff",
          "--swiper-pagination-color": "#f59e0b",
          "--swiper-pagination-bullet-inactive-color": "#ffffff",
        } as React.CSSProperties
      }
    >
      <Swiper
        modules={[Autoplay, Navigation, Pagination]}
        loop
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        navigation
        pagination={{ clickable: true }}
        className="h-[420px] md:h-[500px]"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.title}>
            <div
              className={cn(
                "relative flex h-full items-center bg-gradient-to-br",
                slide.bg
              )}
            >
              <div className="mx-auto w-full max-w-7xl px-12 md:px-16">
                <div className="max-w-2xl text-white">
                  <h2 className="text-3xl font-bold md:text-5xl">
                    {slide.title}
                  </h2>
                  <p className="mt-4 text-base text-white/85 md:text-lg">
                    {slide.text}
                  </p>
                  <Link
                    href="/books"
                    className={cn(
                      buttonVariants({ size: "lg" }),
                      "mt-8 h-11 bg-amber-500 px-6 text-base text-slate-950 hover:bg-amber-400"
                    )}
                  >
                    Browse Books
                  </Link>
                </div>
              </div>
              <slide.icon className="pointer-events-none absolute right-16 hidden h-56 w-56 text-white/10 md:block" />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  )
}
