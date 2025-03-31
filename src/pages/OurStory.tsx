
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
              <img alt="Jude and Brianna by the lake with their dogs" src="/lovable-uploads/IMG_9073.jpg" className="w-full aspect-[4/5] object-cover filter" />
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
              Our journey began like any other day — we met at a volleyball social, where we were both selected for the same team. We shared a passion for staying active and, of course, for winning. On that court, something just clicked. It was a seemingly ordinary moment that sparked an extraordinary love story.
            </p>
            
            <div className="grid grid-cols-2 gap-6">
              <img alt="Jude and Brianna walking" src="/lovable-uploads/IMG_9074.jpg" className="w-full aspect-square object-cover filter grayscale" />
              <img alt="Jude and Brianna by the lake" src="/lovable-uploads/IMG_9077.jpg" className="w-full aspect-square object-cover filter" />
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
          She set high, and he spiked down, and together we dominated the game. At the end, we high-fived and, in that split second, looked into each other's eyes. That’s when we both thought, "This could really be something".
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
            <img alt="Jude with the dogs" src="/lovable-uploads/nsm.jpg" className="w-full aspect-square object-cover filter" />
          </motion.div>
          
          <p className="text-base leading-relaxed mt-16 mb-8 max-w-xs mx-auto">
          Since then, we've faced challenges, celebrated wins, and learned from life's ups and downs. Through it all, we’ve grown stronger in love, learning to put God first and cherish each day together. Our journey has been filled with laughter, joy, and countless beautiful moments.
          </p>
          
          <p className="text-base leading-relaxed mt-16 max-w-xs mx-auto">
          Now, we invite you to share in what might be our most beautiful moment yet. As we embark on this new chapter, we can’t wait to celebrate with family and friends. <br />
          
          See you in Houston, TX!


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
          <img alt="Close-up of Jude and Brianna" src="/lovable-uploads/IMG_9080.JPG" className="w-full aspect-[3/4] object-cover filter grayscale" />
        </motion.div>
      </div>
    </Layout>;
};
export default OurStory;
