import Layout from '@/components/Layout';
import CountdownTimer from '@/components/CountdownTimer';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AspectRatio } from '@/components/ui/aspect-ratio';
const Index = () => {
  // Wedding date - September 26, 2025
  const weddingDate = new Date('2025-09-26T00:00:00');
  return <Layout className="bg-white">
      <div className="min-h-screen flex flex-col">
        {/* Header Section with Main Image */}
        <section className="min-h-screen flex items-center justify-center">
          <div className="wedding-container max-w-[1400px] w-full px-4 py-8">
            <div className="flex flex-col items-center">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-16 w-full items-center justify-items-center">
                <motion.div initial={{
                opacity: 0,
                y: 20
              }} animate={{
                opacity: 1,
                y: 0
              }} transition={{
                duration: 0.6,
                delay: 0.2
              }} className="w-full max-w-[210px] self-center">
                  <AspectRatio ratio={3 / 4} className="w-full">
                    <img alt="Wedding details" className="w-full h-full object-cover filter grayscale" src="/lovable-uploads/ee43a86a-ec15-431a-b6ee-ddb03545e9ea.jpg" />
                  </AspectRatio>
                </motion.div>

                <motion.div initial={{
                opacity: 0,
                scale: 0.95
              }} animate={{
                opacity: 1,
                scale: 1
              }} transition={{
                duration: 0.6
              }} className="flex flex-col items-center justify-center col-span-1 w-full">
                  <div className="relative w-full mb-16">
                    <AspectRatio ratio={3 / 4.2} className="w-full max-w-[860px] mx-auto">
                      <img alt="Wedding couple" className="w-full h-full object-cover filter grayscale" src="/lovable-uploads/28383d05-5581-46ac-bc24-e9f51af72c7a.jpg" />
                    </AspectRatio>
                  </div>
                  
                  <p className="text-center text-sm uppercase tracking-widest mt-8 max-w-md leading-loose my-[-23px] py-0 mx-0">
                    JOIN US AS WE EMBARK ON A JOURNEY<br />
                    OF LOVE, JOY, AND ETERNAL HAPPINESS.
                  </p>
                </motion.div>

                <motion.div initial={{
                opacity: 0,
                y: 20
              }} animate={{
                opacity: 1,
                y: 0
              }} transition={{
                duration: 0.6,
                delay: 0.4
              }} className="w-full max-w-[210px] self-center relative">
                  {/* Date heading positioned over the right image - moved 10rem upwards */}
                  <div className="absolute -top-[10rem] -left-12 -right-12 z-10">
                    <h1 className="text-5xl font-serif text-slate-950 text-center tracking-[0.2em] flex justify-between items-center font-medium py-0 my-0 md:text-5xl px-0 mx-0">
                      <span>09</span>
                      <span className="mx-2">.</span>
                      <span>26</span>
                      <span className="mx-2">.</span>
                      <span>2025</span>
                    </h1>
                  </div>
                  
                  <AspectRatio ratio={3 / 4} className="w-full">
                    <img alt="Wedding dress" className="w-full h-full object-cover filter grayscale" src="/lovable-uploads/0a551e8d-e935-40f7-9fc0-c953364dc7bd.jpg" />
                  </AspectRatio>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Schedule Section - Full Height with Clean Black Background */}
        <section className="min-h-screen flex items-center justify-center bg-black text-white py-0 my-0">
          <div className="wedding-container max-w-[1400px] w-full px-4 py-0 my-0 flex flex-col items-center justify-center">
            <div className="text-center w-full max-w-5xl mx-auto">
              <motion.p initial={{
              opacity: 0
            }} whileInView={{
              opacity: 1
            }} transition={{
              duration: 0.6
            }} className="text-sm uppercase tracking-wider mb-8">
                HERE'S A SNEAK PEEK OF
              </motion.p>
              
              <motion.h2 initial={{
              opacity: 0
            }} whileInView={{
              opacity: 1
            }} transition={{
              duration: 0.6,
              delay: 0.2
            }} className="text-6xl font-serif text-center mb-24 tracking-wide leading-tight">
                OUR SPECIAL DAY'S<br />
                SCHEDULE
              </motion.h2>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center w-full max-w-5xl mx-auto mb-4">
                <motion.div initial={{
                opacity: 0,
                y: 20
              }} whileInView={{
                opacity: 1,
                y: 0
              }} transition={{
                duration: 0.6,
                delay: 0
              }}>
                  <p className="text-5xl font-serif mb-6">4:00 PM</p>
                  <p className="uppercase text-sm tracking-widest">CEREMONY</p>
                </motion.div>
                
                <motion.div initial={{
                opacity: 0,
                y: 20
              }} whileInView={{
                opacity: 1,
                y: 0
              }} transition={{
                duration: 0.6,
                delay: 0.1
              }}>
                  <p className="text-5xl font-serif mb-6">5:00 PM</p>
                  <p className="uppercase text-sm tracking-widest">COCKTAIL</p>
                </motion.div>
                
                <motion.div initial={{
                opacity: 0,
                y: 20
              }} whileInView={{
                opacity: 1,
                y: 0
              }} transition={{
                duration: 0.6,
                delay: 0.2
              }}>
                  <p className="text-5xl font-serif mb-6">6:30 PM</p>
                  <p className="uppercase text-sm tracking-widest">DINNER</p>
                </motion.div>
                
                <motion.div initial={{
                opacity: 0,
                y: 20
              }} whileInView={{
                opacity: 1,
                y: 0
              }} transition={{
                duration: 0.6,
                delay: 0.3
              }}>
                  <p className="text-5xl font-serif mb-6">10:00 PM</p>
                  <p className="uppercase text-sm tracking-widest">DANCING & FIREWORKS</p>
                </motion.div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Location Section - Full Height with White Background */}
        <section className="min-h-screen flex items-center justify-center bg-white text-black py-0 my-0">
          <div className="wedding-container max-w-[1400px] w-full px-4 py-0 my-0">
            <div className="text-center w-full max-w-5xl mx-auto">
              <motion.h2 initial={{
              opacity: 0
            }} whileInView={{
              opacity: 1
            }} transition={{
              duration: 0.6
            }} className="text-6xl font-serif text-center mb-24 tracking-wide">
                LOCATION
              </motion.h2>
              
              <div className="flex flex-col items-center justify-center mb-16">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl mx-auto">
                  <motion.div initial={{
                  opacity: 0
                }} whileInView={{
                  opacity: 1
                }} transition={{
                  duration: 0.6
                }} className="text-center flex items-center justify-center">
                    <p className="uppercase text-base tracking-widest font-medium">
                      DUNHAVEN CASTLE<br />
                      HOTEL & RESTAURANT
                    </p>
                  </motion.div>
                  
                  <motion.div initial={{
                  opacity: 0,
                  scale: 0.95
                }} whileInView={{
                  opacity: 1,
                  scale: 1
                }} transition={{
                  duration: 0.6
                }} className="text-center">
                    <img src="/lovable-uploads/7e006d2f-542f-44d6-b173-b432e0624fef.png" alt="Dunhaven Castle" className="w-full max-w-[480px] h-auto object-cover mx-auto filter grayscale" />
                  </motion.div>
                  
                  <motion.div initial={{
                  opacity: 0
                }} whileInView={{
                  opacity: 1
                }} transition={{
                  duration: 0.6
                }} className="text-center flex items-center justify-center">
                    <p className="uppercase text-base tracking-widest font-medium">
                      GLENCAIRN ROAD COUNTY<br />
                      KERRY, IRELAND
                    </p>
                  </motion.div>
                </div>
                
                <motion.div initial={{
                opacity: 0,
                y: 20
              }} whileInView={{
                opacity: 1,
                y: 0
              }} transition={{
                duration: 0.6,
                delay: 0.3
              }} className="mt-24">
                  <Link to="/travel-stay" className="inline-block bg-black text-white border border-black px-12 py-4 text-sm uppercase tracking-wider hover:bg-white hover:text-black transition-colors">
                    TRAVEL & STAY
                  </Link>
                </motion.div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Countdown Section - Full Viewport with Black Background and No Background Image */}
        <section className="min-h-screen flex items-center justify-center bg-black text-white py-0 my-0 relative">
          <div className="wedding-container max-w-[1400px] w-full px-4 py-0 my-0 flex flex-col items-center justify-center z-10">
            <div className="text-center w-full max-w-5xl mx-auto bg-black">
              <motion.p initial={{
              opacity: 0
            }} whileInView={{
              opacity: 1
            }} transition={{
              duration: 0.6
            }} className="text-lg uppercase tracking-widest mb-16">
                LET THE COUNTDOWN BEGIN
              </motion.p>
              
              {/* Customized CountdownTimer will be used here */}
              <div className="mb-16">
                <CountdownTimer targetDate={weddingDate} />
              </div>
            </div>
          </div>
        </section>
        
        {/* Registry and Dress Code Section - Full Viewport with Side-by-Side Layout */}
        <section className="min-h-screen flex items-center justify-center bg-white text-black py-0 my-0">
          <div className="wedding-container max-w-[1400px] w-full px-4 py-16 my-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 w-full">
              {/* Registry Side */}
              <motion.div initial={{
              opacity: 0,
              x: -20
            }} whileInView={{
              opacity: 1,
              x: 0
            }} transition={{
              duration: 0.6
            }} className="flex flex-col items-center">
                <h2 className="text-6xl font-serif mb-8 tracking-wide">REGISTRY</h2>
                
                <div className="w-full max-w-md mx-auto mb-8">
                  <AspectRatio ratio={1 / 1.2} className="mb-10">
                    <img src="/lovable-uploads/fa8c9102-0513-4479-9f23-bba4a87880d6.jpg" alt="Registry item" className="w-full h-full object-cover filter grayscale" />
                  </AspectRatio>
                </div>
                
                <p className="text-center max-w-xs mx-auto mb-12 leading-relaxed">
                  While your presence at our wedding is the greatest gift, if you wish to share in our joy through a gift, please visit our registry.
                </p>
                
                <Link to="/registry" className="inline-block bg-black text-white border border-black px-12 py-4 text-sm uppercase tracking-wider hover:bg-white hover:text-black transition-colors">
                  REGISTRY
                </Link>
              </motion.div>
              
              {/* Dress Code Side */}
              <motion.div initial={{
              opacity: 0,
              x: 20
            }} whileInView={{
              opacity: 1,
              x: 0
            }} transition={{
              duration: 0.6,
              delay: 0.2
            }} className="flex flex-col items-center">
                <h2 className="text-6xl font-serif mb-8 tracking-wide">DRESS CODE</h2>
                
                <div className="w-full max-w-md mx-auto mb-8">
                  <AspectRatio ratio={1 / 1.2} className="mb-10">
                    <img src="/lovable-uploads/f54e5570-7e01-4e73-9f3a-2177aebbc288.jpg" alt="Dress code" className="w-full h-full object-cover filter grayscale" />
                  </AspectRatio>
                </div>
                
                <p className="text-center max-w-xs mx-auto mb-12 leading-relaxed">
                  For this grand celebration of love, we kindly request that you embrace the elegance of the occasion by wearing formal attire.
                </p>
                
                <Link to="/faqs" className="inline-block bg-black text-white border border-black px-12 py-4 text-sm uppercase tracking-wider hover:bg-white hover:text-black transition-colors">
                  FAQS
                </Link>
              </motion.div>
            </div>
          </div>
        </section>
      </div>
    </Layout>;
};
export default Index;
