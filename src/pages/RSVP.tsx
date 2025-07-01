
// import Layout from '@/components/Layout';
// import RSVPForm from '@/components/RSVPForm';
// import { motion } from 'framer-motion';

// const RSVP = () => {
//   return (
//     <Layout>
//       <div>
//         <div className="min-h-screen bg-center bg-cover relative grayscale" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80')" }}>
//           <div className="absolute inset-0 bg-black/20"></div>
//           <div className="relative z-10 wedding-container py-20 md:py-28">
//             <motion.h1
//               initial={{ opacity: 0, y: -20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5 }}
//               className="text-5xl md:text-6xl font-serif text-center mb-8 text-wedding-black tracking-wider"
//             >
//               RSVP
//             </motion.h1>
            
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5, delay: 0.2 }}
//               className="text-center max-w-xl mx-auto mb-16"
//             >
//               <p className="text-wedding-gray-700 leading-relaxed">
//                 We can't wait to celebrate our special day with you, and your presence means the world to us! Please let us know if you will be able to join in the joy and festivities by <strong>May 25th, 2025</strong>.
//               </p>
//             </motion.div>
            
//             <motion.div
//               initial={{ opacity: 0, scale: 0.95 }}
//               animate={{ opacity: 1, scale: 1 }}
//               transition={{ duration: 0.5, delay: 0.3 }}
//             >
//               <RSVPForm />
//             </motion.div>
//           </div>
//         </div>
//       </div>
//     </Layout>
//   );
// };

// export default RSVP;
