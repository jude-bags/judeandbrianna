import Layout from '@/components/Layout';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
const Registry = () => {
  return <Layout>
      <div className="wedding-container">
        <h1 className="page-title">REGISTRY</h1>
        
        <motion.div initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.5
      }} className="max-w-3xl mx-auto text-center mb-16">
          <p className="mb-8">
            Your presence is the greatest gift, and your well-wishes mean the world to us. If you'd like to celebrate our new journey with a token of love, we've we kindly ask that you consider a monetary gift in lieu of a traditional registry.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.5,
          delay: 0.2
        }} className="flex flex-col items-center text-center mx-[10px] px-0">
            <img alt="Gift Registry" className="w-full h-[250px] object-cover mb-6 grayscale" src="/lovable-uploads/4a1b2244-0f3c-4993-b643-aac101abba5b.jpg" />
            <h2 className="text-2xl font-serif mb-4">GIFT FOR THE COUPLE</h2>
            <p className="mb-6">
              Help us build our dream home <br /> <br />
              Zelle: 385-900-6425. Jude Edwards.
            </p>
            <Link to="#" className="btn">LEARN MORE</Link>
          </motion.div>
          
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.5,
          delay: 0.3
        }} className="flex flex-col items-center text-center mx-[10px]">
            <img alt="Photo Book" src="/lovable-uploads/17bd2496-f49f-49ab-b31a-cb05d7c1e177.jpg" className="w-full h-[250px] object-cover mb-6" />
            <h2 className="text-2xl font-serif mb-4">HONEYMOON FUND</h2>
            <p className="mb-6">
            Contribute to our experiences and adventures as a married couple. <br /> <br />
            Apple Pay : 385-900-6425. Jude Edwards. <br />
             Zelle : 385-900-6425. Jude Edwards.
            </p>
            <Link to="#" className="btn">LEARN MORE</Link>
          </motion.div>
          
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.5,
          delay: 0.4
        }} className="flex flex-col items-center text-center">
            <img alt="Honeymoon Fund" className="w-full h-[250px] object-cover mb-6" src="/lovable-uploads/cd7987cf-9930-4a66-a1ce-61fd2c34fe8e.jpg" />
            <h2 className="text-2xl font-serif mb-4">HONEYMOON FUND</h2>
            <p className="mb-6">
              Contribute to our experiences and adventures as a married couple.
            </p>
            <Link to="#" className="btn">LEARN MORE</Link>
          </motion.div>
        </div>
      </div>
    </Layout>;
};
export default Registry;