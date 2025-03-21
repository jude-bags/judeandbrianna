
import Layout from '@/components/Layout';
import { motion } from 'framer-motion';
const OurStory = () => {
  return <Layout>
      <div className="max-w-[1200px] mx-auto px-5 pt-16 pb-28">
        <h1 className="text-5xl md:text-6xl font-serif text-center mb-16 tracking-wide">OUR STORY</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 mb-40 relative">
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.5
        }}>
            <div className="relative">
              <img alt="Jude and Brianna by the lake with their dogs" src="https://images.squarespace-cdn.com/content/v1/67bc3eee49fd994193e92d94/1740390132924-XISRZGX3DUQD9UNHT04R/olga-solodilova-OK62mLojtY4-unsplash.jpg?format=2500w" className="w-full aspect-[4/5] object-cover filter" />
            </div>
          </motion.div>
          
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.5,
          delay: 0.2
        }} className="flex flex-col justify-start pt-8">
            <p className="text-base leading-relaxed mb-12 max-w-md">
              Our journey began like any other day, two paths converging at the crossroads of life. In a city filled with countless faces, it was a seemingly ordinary moment that ignited our extraordinary love story.
            </p>
            
            <div className="grid grid-cols-2 gap-6">
              <img alt="Jude and Brianna walking" src="https://images.squarespace-cdn.com/content/v1/67bc3eee49fd994193e92d94/1740390132933-7HFYYX20Q1BECZFEA2WG/olga-solodilova-7CkaGO6DiJQ-unsplash.jpg?format=2500w" className="w-full aspect-square object-cover filter grayscale" />
              <img alt="Jude and Brianna by the lake" src="https://images.squarespace-cdn.com/content/v1/67bc3eee49fd994193e92d94/1740390132929-QY5PFNSPUFYJ33VFR4YU/olga-solodilova-f7ibaLlie6w-unsplash.jpg?format=2500w" className="w-full aspect-square object-cover filter" />
            </div>
          </motion.div>

          <div className="absolute bottom-0 left-0 w-full -mb-28 z-10">
            <h2 className="text-[100px] font-serif leading-none tracking-wide px-0 font-semibold md:text-8xl mx-[50px] my-[68px] text-[#8c8d8a]/[0.32]">
              JUDE <span className="font-serif">&</span> BRIANNA
            </h2>
          </div>
        </div>
        
        <div className="max-w-2xl mx-auto text-center mb-20">
          <p className="text-base leading-relaxed mb-16 max-w-sm mx-auto">
            Our love story wouldn't be complete without mentioning our two loyal Dalmatian dogs, Max and Blue. They've been with us through thick and thin, bringing joy and laughter to our lives with their antics and wagging tails.
          </p>
          
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.5
        }}>
            <img alt="Jude with the dogs" src="https://images.squarespace-cdn.com/content/v1/67bc3eee49fd994193e92d94/1740390132938-DP4YG57H36VTVJ0O0BNC/olga-solodilova-5RjqNf7a49E-unsplash.jpg?format=2500w" className="object-contain grayscale" />
          </motion.div>
          
          <p className="text-base leading-relaxed mt-16 mb-8 max-w-xs mx-auto">
            Together, we faced life's challenges head-on, learning from each obstacle and celebrating each triumph. Our love and bond only grew stronger with time.
          </p>
          
          <p className="text-base leading-relaxed mt-16 max-w-xs mx-auto">
            Today, as we stand on the precipice of our new chapter, we are excited to unite the rest of our story together. Our love has deepened, our adventures have multiplied, and our hearts are forever entwined.
          </p>
        </div>
        
        <motion.div initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.5
      }} className="max-w-md mx-auto">
          <img alt="Close-up of Jude and Brianna" src="https://images.squarespace-cdn.com/content/v1/67bc3eee49fd994193e92d94/1740390132941-7OHS9K91TVEI1NHI0T0N/olga-solodilova--Dc0PI6XWAc-unsplash.jpg?format=2500w" className="w-full aspect-[3/4] object-cover filter grayscale" />
        </motion.div>
      </div>
    </Layout>;
};
export default OurStory;
