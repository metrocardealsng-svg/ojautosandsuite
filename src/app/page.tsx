import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ScrollFilm from "@/components/ScrollFilm";
import Experience from "@/components/Experience";
import Suites from "@/components/Suites";
import RoomRates from "@/components/RoomRates";
import FoodDrinks from "@/components/FoodDrinks";
import Nightlife from "@/components/Nightlife";
import BookingForm from "@/components/BookingForm";
import Location from "@/components/Location";
import Footer from "@/components/Footer";
import StickyBook from "@/components/StickyBook";

export default function Home() {
  return (
    <>
      <Header />
      <main id="main">
        <Hero />
        <ScrollFilm />
        <Experience />
        <Suites />
        <RoomRates />
        <FoodDrinks />
        <Nightlife />
        <BookingForm />
        <Location />
      </main>
      <Footer />
      <StickyBook />
    </>
  );
}
