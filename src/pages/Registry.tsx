import Layout from '@/components/Layout';
import { motion } from 'framer-motion';
import { useState } from 'react';

const Registry = () => {
  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    alert(`Copied: ${text}`);
  };

  return (
    <Layout>
      <div className="wedding-container">
        <h1 className="page-title">REGISTRY</h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <p className="mb-8">
            Your presence is the greatest gift, and your well-wishes mean the world to us. If you'd like to celebrate our new journey with a token of love, we kindly ask that you consider a monetary gift in lieu of a traditional registry.
          </p>
        </motion.div>

        <div className="flex justify-center">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20 max-w-5xl">
            {/* Gift for the Couple */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-col items-center text-center mx-[10px] px-0"
            >
              <img
                alt="Gift Registry"
                className="w-full h-[250px] object-cover mb-6 grayscale"
                src="/lovable-uploads/4a1b2244-0f3c-4993-b643-aac101abba5b.jpg"
              />
              <h2 className="text-2xl font-serif mb-4">GIFT FOR THE COUPLE</h2>
              <img
                src="/logos/zelle.png"
                alt="Zelle Logo"
                className="h-10 mb-2"
              />
              <p className="mb-4">
                Help us build our future together.
                <br />
                <span className="inline-flex items-center gap-2">
                  Zelle: 385-900-6425
                  <button onClick={() => handleCopy('385-900-6425')} className="text-sm text-blue-600 underline">
                    Copy
                  </button>
                </span>
                <br />
                <span className="inline-flex items-center gap-2">
                  Zelle: 315-771-4087
                  <button onClick={() => handleCopy('315-771-4087')} className="text-sm text-blue-600 underline">
                    Copy
                  </button>
                </span>
              </p>
              <a
                href="https://www.zellepay.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-purple-600 text-white px-6 py-2 rounded-full hover:bg-purple-700 transition"
              >
                Send via Zelle
              </a>
            </motion.div>

            {/* Honeymoon Fund */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col items-center text-center mx-[10px]"
            >
              <img
                alt="Photo Book"
                src="/lovable-uploads/17bd2496-f49f-49ab-b31a-cb05d7c1e177.jpg"
                className="w-full h-[250px] object-cover mb-6"
              />
              <h2 className="text-2xl font-serif mb-4">HONEYMOON FUND</h2>
              <img
                src="/logos/apple-pay.png"
                alt="Apple Pay Logo"
                className="h-10 mb-2"
              />
              <p className="mb-4">
                Contribute to our experiences and adventures as a married couple.
                <br />
                <span className="inline-flex items-center gap-2">
                  Apple Pay: 385-900-6425
                  <button onClick={() => handleCopy('385-900-6425')} className="text-sm text-blue-600 underline">
                    Copy
                  </button>
                </span>
                <br />
                <span className="inline-flex items-center gap-2">
                  Apple Pay: 315-771-4087
                  <button onClick={() => handleCopy('315-771-4087')} className="text-sm text-blue-600 underline">
                    Copy
                  </button>
                </span>
              </p>
              <a
                href="https://www.apple.com/apple-pay/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-black text-white px-6 py-2 rounded-full hover:bg-gray-800 transition"
              >
                Send via Apple Pay
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Registry;
