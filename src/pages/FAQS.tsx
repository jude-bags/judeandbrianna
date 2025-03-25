
import Layout from '@/components/Layout';
import { motion } from 'framer-motion';

const FAQS = () => {
  return (
    <Layout>
      <div>
        <div className="h-[60vh] relative bg-center bg-cover grayscale" style={{ backgroundImage: "url('/lovable-uploads/fe7ff843-51cc-4d36-886f-af301b5b3734.png')" }}>
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <h1 className="text-6xl md:text-7xl font-serif text-wedding-black tracking-wide text-center">
              FREQUENTLY ASKED<br />QUESTIONS
            </h1>
          </div>
        </div>
        
        <div className="py-20 px-16 max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-20 gap-y-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="md:col-span-1"
            >
              <h2 className="text-5xl font-serif tracking-wide">DRESS CODE</h2>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="md:col-span-2 space-y-14"
            >
              <div>
                <h3 className="font-serif text-xl mb-6">• WHAT DOES "FORMAL ATTIRE" MEAN?</h3>
                <p className="text-base leading-relaxed">
                  Formal attire typically includes elegant gowns, suits, tuxedos, or cocktail dresses. Think of it as dressing for a special occasion, similar to what you might wear to a sophisticated evening event.
                </p>
              </div>
              
              <div>
                <h3 className="font-serif text-xl mb-6">• ARE SPECIFIC COLORS REQUIRED FOR THE DRESS CODE?</h3>
                <p className="text-base leading-relaxed">
                  No, there are no specific color requirements. Feel free to express your personal style and wear colors that make you feel comfortable and confident.
                </p>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="md:col-span-1 pt-10"
            >
              <h2 className="text-5xl font-serif tracking-wide">CHILDREN</h2>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="md:col-span-2 space-y-14 pt-10"
            >
              <div>
                <h3 className="font-serif text-xl mb-6">• ARE CHILDREN WELCOME AT THE WEDDING?</h3>
                <p className="text-base leading-relaxed">
                  Absolutely! We welcome children and have arranged for a designated kids' area with entertainment to ensure they have a great time during the celebration.
                </p>
              </div>
              
              <div>
                <h3 className="font-serif text-xl mb-6">• IS THERE A SPECIFIC AGE LIMIT FOR CHILDREN ATTENDING?</h3>
                <p className="text-base leading-relaxed">
                  There's no age limit for children. We want the whole family to be a part of our special day, from the littlest ones to the oldest.
                </p>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="md:col-span-1 pt-10"
            >
              <h2 className="text-5xl font-serif tracking-wide">FOOD OPTIONS</h2>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="md:col-span-2 space-y-14 pt-10"
            >
              <div>
                <h3 className="font-serif text-xl mb-6">• DO YOU ACCOMMODATE DIETARY RESTRICTIONS?</h3>
                <p className="text-base leading-relaxed">
                  Yes, we're committed to ensuring that all our guests have a delightful dining experience. We offer vegan, vegetarian, and gluten-free food options. Please indicate your dietary preferences in your RSVP, and we'll make sure you're catered to accordingly.
                </p>
              </div>
              
              <div>
                <h3 className="font-serif text-xl mb-6">• CAN WE REQUEST SPECIFIC DISHES FOR DIETARY RESTRICTIONS?</h3>
                <p className="text-base leading-relaxed">
                  While we'll have a variety of dishes to accommodate different dietary needs, if you have specific requests or severe allergies, please let us know in advance, and we'll do our best to accommodate them.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default FAQS;
