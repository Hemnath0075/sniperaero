import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TrustSection from './components/TrustSection';
import Services from './components/Services';
import Training from './components/Training';
import Research from './components/Research';
import LearningHub from './components/LearningHub';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="relative">
      <Navbar />
      <Hero />
      <TrustSection />
      <Services />
      <Training />
      <Research />
      <LearningHub />
      <Contact />
      <Footer />
    </div>
  );
}
