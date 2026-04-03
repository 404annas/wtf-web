import VerticalCard1 from '@/ui/VerticalCard1'
import VerticalCard2 from '@/ui/VerticalCard2'
import VerticalCard3 from '@/ui/VerticalCard3'
import VerticalCard4 from '@/ui/VerticalCard4'
import VerticalCard5 from '@/ui/VerticalCard5'

const VerticalCards = () => {
  return (
    <section className="relative min-h-screen w-full overflow-hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-cover bg-center bg-no-repeat opacity-[0.15]"
          style={{ backgroundImage: "url('/images/noise-bg.webp')" }}
        />
        <div className="relative z-10">
          <VerticalCard1 />
          <VerticalCard2 />
          <VerticalCard3 />
          <VerticalCard4 />
          <VerticalCard5 />
        </div>
    </section>
  )
}

export default VerticalCards
