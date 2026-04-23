import Navbar from "@/components/Navbar";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Experience from "@/components/sections/Experience";
import Services from "@/components/sections/Services";
import Process from "@/components/sections/Process";
import Achievements from "@/components/sections/Achievements";
import Tools from "@/components/sections/Tools";
import Markets from "@/components/sections/Markets";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0a0a0f]">
      <Navbar />
      <Hero />
      <hr className="section-divider" />
      <About />
      <hr className="section-divider" />
      <Experience />
      <hr className="section-divider" />
      <Services />
      <hr className="section-divider" />
      <Process />
      <hr className="section-divider" />
      <Achievements />
      <hr className="section-divider" />
      <Tools />
      <hr className="section-divider" />
      <Markets />
      <hr className="section-divider" />
      <Contact />
      <Footer />
    </main>
  );
}
