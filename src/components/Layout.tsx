
import { ReactNode } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface LayoutProps {
  children: ReactNode;
  className?: string;
  withBackground?: boolean;
  backgroundImage?: string;
}

export default function Layout({ children, className, withBackground, backgroundImage }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <motion.main 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.4 }}
        className={cn(
          "flex-grow",
          withBackground && "relative bg-cover bg-center bg-no-repeat",
          className
        )}
        style={backgroundImage ? { backgroundImage: `url(${backgroundImage})` } : {}}
      >
        {withBackground && <div className="absolute inset-0 bg-black/10 z-0"></div>}
        <div className={cn("relative z-10", withBackground ? "text-white" : "")}>
          {children}
        </div>
      </motion.main>
      <Footer />
    </div>
  );
}
