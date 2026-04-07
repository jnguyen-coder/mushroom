import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import Hero from './components/hero/Hero'
import ShopSection from './components/shop/ShopSection'
import MobileOrderBar from './components/shop/MobileOrderBar'
import HowItWorks from './components/sections/HowItWorks'
import PickupDelivery from './components/sections/PickupDelivery'
import About from './components/sections/About'
import FAQ from './components/sections/FAQ'
import FinalCTA from './components/sections/FinalCTA'
import ClickBurst from './components/ui/ClickBurst'

export default function App() {
  return (
    <div className="min-h-screen bg-white">
      <a href="#shop" className="skip-link">Skip to shop</a>
      <Header />
      <main>
        <Hero />
        <ShopSection />
        <HowItWorks />
        <PickupDelivery />
        <About />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
      <MobileOrderBar />
      <ClickBurst />
    </div>
  )
}
