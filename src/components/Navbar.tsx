import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const headerBgClass = isScrolled ? 'bg-black/60 backdrop-blur-md' : 'bg-black/50 backdrop-blur-sm';

  return (
    <motion.header 
      initial={{
        y: -20,
        opacity: 0
      }} 
      animate={{
        y: 0,
        opacity: 1
      }} 
      transition={{
        duration: 0.4
      }} 
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${headerBgClass}`}
    >
      <div className="max-w-[1400px] mx-auto px-8">
        <div className="flex justify-between items-center py-8">
          <nav className="hidden md:flex space-x-8">
            <Link to="/our-story" className={`nav-link text-xs tracking-wider text-black ${isActive('/our-story') ? 'border-b border-black pb-1' : ''}`}>
              OUR STORY
            </Link>
            <Link to="/travel-stay" className={`nav-link text-xs tracking-wider text-black ${isActive('/travel-stay') ? 'border-b border-black pb-1' : ''}`}>
              TRAVEL & STAY
            </Link>
            <Link to="/registry" className={`nav-link text-xs tracking-wider text-black ${isActive('/registry') ? 'border-b border-black pb-1' : ''}`}>
              REGISTRY
            </Link>
          </nav>
          
          <Link to="/" className="text-5xl font-serif tracking-wide text-center mx-auto text-black">
            JUDE & BRIANNA
          </Link>
          
          <nav className="hidden md:flex items-center space-x-8" style={{
            minWidth: "240px"
          }}>
            <Link to="/faqs" className={`nav-link text-xs tracking-wider text-black ${isActive('/faqs') ? 'border-b border-black pb-1' : ''}`}>
              FAQS
            </Link>
            <Link to="/rsvp" className="nav-link text-xs tracking-wider border border-black px-6 py-3 text-black">
              RSVP
            </Link>
          </nav>
          
          <button onClick={toggleMobileMenu} className="md:hidden p-2 text-black focus:outline-none" aria-label="Toggle menu">
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        
        {mobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-4 space-y-3">
              <Link to="/our-story" className={`block py-2 nav-link text-black ${isActive('/our-story') ? 'border-b border-black' : ''}`} onClick={() => setMobileMenuOpen(false)}>
                OUR STORY
              </Link>
              <Link to="/travel-stay" className={`block py-2 nav-link text-black ${isActive('/travel-stay') ? 'border-b border-black' : ''}`} onClick={() => setMobileMenuOpen(false)}>
                TRAVEL & STAY
              </Link>
              <Link to="/registry" className={`block py-2 nav-link text-black ${isActive('/registry') ? 'border-b border-black' : ''}`} onClick={() => setMobileMenuOpen(false)}>
                REGISTRY
              </Link>
              <Link to="/faqs" className={`block py-2 nav-link text-black ${isActive('/faqs') ? 'border-b border-black' : ''}`} onClick={() => setMobileMenuOpen(false)}>
                FAQS
              </Link>
              <Link to="/rsvp" className="block py-2 nav-link text-black" onClick={() => setMobileMenuOpen(false)}>
                RSVP
              </Link>
            </div>
          </div>
        )}
      </div>
    </motion.header>
  );
}
