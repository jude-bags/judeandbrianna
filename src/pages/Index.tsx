import Layout from '@/components/Layout';
import CountdownTimer from '@/components/CountdownTimer';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AspectRatio } from '@/components/ui/aspect-ratio';

const Index = () => {
  const weddingDate = new Date('2025-09-26T00:00:00');

  return (
    <Layout className="bg-white">
      <div className="min-h-screen flex flex-col">

        {/* Header Section */}
        <section className="min-h-screen flex items-center justify-center">
          <div className="wedding-container max-w-[1400px] w-full px-4 py-8">
            <div className="flex flex-col items-center w-full">
              {/* Date Header */}
              <motion.h1
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-5xl font-serif text-slate-950 text-center tracking-[0.2em] font-medium mb-16"
              >
                <span>09</span>
                <span className="mx-2">.</span>
                <span>26</span>
                <span className="mx-2">.</span>
                <span>2025</span>
              </motion.h1>

              {/* Images */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-16 w-full items-center justify-items-center">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="w-full max-w-[210px] self-center"
                >
                  <AspectRatio ratio={3 / 4} className="w-full">
                    <img
                      src="/lovable-uploads/IMG_9071.jpg"
                      alt="Wedding details"
                      className="w-full h-full object-cover filter grayscale"
                    />
                  </AspectRatio>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6 }}
                  className="flex flex-col items-center justify-center col-span-1 w-full"
                >
                  <div className="relative w-full mb-16">
                    <AspectRatio ratio={3 / 4.2} className="w-full max-w-[860px] mx-auto">
                      <img
                        src="/lovable-uploads/ore.jpg"
                        alt="Wedding couple"
                        className="w-full h-full object-cover"
                      />
                    </AspectRatio>
                  </div>

                  <p className="text-center text-sm uppercase tracking-widest mt-8 max-w-md leading-loose -my-6">
                    Join us as we embark on a journey<br />
                    of love, joy, and eternal happiness.
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="w-full max-w-[210px] self-center"
                >
                  <AspectRatio ratio={3 / 4} className="w-full">
                    <img
                      src="/lovable-uploads/IMG_9078.jpg"
                      alt="Wedding dress"
                      className="w-full h-full object-cover filter grayscale"
                    />
                  </AspectRatio>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Schedule Section */}
        <section className="min-h-screen flex items-center justify-center bg-black text-white">
          <div className="wedding-container max-w-[1400px] w-full px-4 flex flex-col items-center">
            <div className="text-center w-full max-w-5xl mx-auto">
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
                className="text-sm uppercase tracking-wider mb-8"
              >
                Here’s a sneak peek of
              </motion.p>

              <motion.h2
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-6xl font-serif mb-24 tracking-wide leading-tight"
              >
                Our Special Day's<br />
                Schedule
              </motion.h2>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
                {[
                  { time: '4:00 PM', label: 'Ceremony' },
                  { time: '5:00 PM', label: 'Cocktail' },
                  { time: '6:30 PM', label: 'Dinner' },
                  { time: '10:00 PM', label: 'Dancing & Fireworks' }
                ].map((item, i) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: i * 0.1 }}
                  >
                    <p className="text-5xl font-serif mb-6">{item.time}</p>
                    <p className="uppercase text-sm tracking-widest">{item.label}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Location Section */}
        <section className="min-h-screen flex items-center justify-center bg-white text-black">
          <div className="wedding-container max-w-[1400px] w-full px-4">
            <div className="text-center w-full max-w-5xl mx-auto">
              <motion.h2
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
                className="text-6xl font-serif mb-24 tracking-wide"
              >
                Location
              </motion.h2>

              <div className="flex flex-col items-center mb-16">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl mx-auto">
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.6 }}
                    className="text-center flex items-center justify-center"
                  >
                    <p className="uppercase text-base tracking-widest font-medium">
                      AG Outdoor Venue
                    </p>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6 }}
                    className="text-center"
                  >
                    <img
                      src="/lovable-uploads/AGvenue.png"
                      alt="AG Outdoor Venue"
                      className="w-full max-w-[480px] h-auto object-cover mx-auto filter grayscale"
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.6 }}
                    className="text-center flex items-center justify-center"
                  >
                    <p className="uppercase text-base tracking-widest font-medium">
                      17439 Self Road<br />
                      Tomball, Texas 77377
                    </p>
                  </motion.div>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="mt-24"
                >
                  <Link
                    to="/travel-stay"
                    className="inline-block bg-black text-white border border-black px-12 py-4 text-sm uppercase tracking-wider hover:bg-white hover:text-black transition-colors"
                  >
                    Travel & Stay
                  </Link>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Countdown Section */}
        <section className="min-h-screen flex items-center justify-center bg-black text-white relative">
          <div className="wedding-container max-w-[1400px] w-full px-4 flex flex-col items-center z-10">
            <div className="text-center w-full max-w-5xl mx-auto">
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
                className="text-lg uppercase tracking-widest mb-16"
              >
                Let the countdown begin
              </motion.p>

              <div className="mb-16">
                <CountdownTimer targetDate={weddingDate} />
              </div>
            </div>
          </div>
        </section>

        {/* Registry + Dress Code Section */}
        <section className="min-h-screen flex items-center justify-center bg-white text-black">
          <div className="wedding-container max-w-[1400px] w-full px-4 py-16">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16">

              {/* Registry */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="flex flex-col items-center"
              >
                <h2 className="text-6xl font-serif mb-8 tracking-wide">Registry</h2>

                <div className="w-full max-w-md mx-auto mb-8">
                  <AspectRatio ratio={1 / 1.2} className="mb-10">
                    <img
                      src="/lovable-uploads/fa8c9102-0513-4479-9f23-bba4a87880d6.jpg"
                      alt="Registry item"
                      className="w-full h-full object-cover filter grayscale"
                    />
                  </AspectRatio>
                </div>

                <p className="text-center max-w-xs mx-auto mb-12 leading-relaxed">
                  Your presence at our wedding is the greatest gift. If you’d like to give more, please visit our registry.
                </p>

                <Link
                  to="/registry"
                  className="inline-block bg-black text-white border border-black px-12 py-4 text-sm uppercase tracking-wider hover:bg-white hover:text-black transition-colors"
                >
                  Registry
                </Link>
              </motion.div>

              {/* Dress Code */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="flex flex-col items-center"
              >
                <h2 className="text-6xl font-serif mb-8 tracking-wide">Dress Code</h2>

                <div className="w-full max-w-md mx-auto mb-8">
                  <AspectRatio ratio={1 / 1.2} className="mb-10">
                    <img
                      src="/lovable-uploads/f54e5570-7e01-4e73-9f3a-2177aebbc288.jpg"
                      alt="Dress code"
                      className="w-full h-full object-cover filter grayscale"
                    />
                  </AspectRatio>
                </div>

                <p className="text-center max-w-xs mx-auto mb-12 leading-relaxed">
                  To celebrate this special day, we kindly ask you to wear formal attire in honor of the occasion.
                </p>

                <Link
                  to="/faqs"
                  className="inline-block bg-black text-white border border-black px-12 py-4 text-sm uppercase tracking-wider hover:bg-white hover:text-black transition-colors"
                >
                  FAQs
                </Link>
              </motion.div>

            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Index;
