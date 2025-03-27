
import { Button } from '@/components/ui/button';
import Layout from '@/components/Layout';
import { Card } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { Separator } from '@/components/ui/separator';

const TravelAndStay = () => {
  return <Layout>
      <div>
        {/* Hero Section with Banner */}
        <div className="h-screen relative overflow-hidden">
          {/* Outer container background - completely separate */}
          <div className="absolute inset-0 bg-gray-50" style={{
          zIndex: 5
        }}></div>
          
          {/* Image container - positioned above background */}
          <div className="absolute inset-x-[5%] inset-y-0 m-8" style={{
          zIndex: 10
        }}>
            <img src="/lovable-uploads/AGvenue.png" alt="Travel background" className="w-full h-full object-cover filter grayscale" />
          </div>
          
          {/* Text overlay - positioned above everything but with reduced opacity */}
          <div style={{
          zIndex: 15
        }} className="absolute inset-0 flex items-center justify-center bg-white/40">
            <h1 className="text-5xl md:text-6xl font-serif text-black tracking-wide">TRAVEL & STAY</h1>
          </div>
        </div>
        
        {/* GETTING HERE Section - Full Viewport Height */}
        <div className="min-h-screen flex items-center bg-gray-50">
          <div className="max-w-[1400px] w-[90%] mx-auto px-8 py-24 md:py-0 grid grid-cols-1 md:grid-cols-2 gap-16">
            {/* Left Column - Title and Introduction */}
            <div className="flex flex-col justify-center">
              <motion.div initial={{
              opacity: 0,
              y: 20
            }} animate={{
              opacity: 1,
              y: 0
            }} transition={{
              duration: 0.6
            }} className="max-w-[500px]">
                <h2 className="text-5xl md:text-6xl font-serif mb-12 tracking-wide">
                  GETTING<br />HERE
                </h2>
                <p className="text-base mb-8 leading-relaxed">
                We are so excited to celebrate this special day with you! To help make your journey as smooth as possible, here are some details on how to get to our celebration in Houston, TX. Whether you're coming from near or far, we can't wait to share this unforgettable day with you. Safe travels, and hope to see you soon!
                </p>
              </motion.div>
            </div>
            
            {/* Right Column - Travel Options with Bullet Points */}
            <motion.div initial={{
            opacity: 0,
            x: 20
          }} animate={{
            opacity: 1,
            x: 0
          }} transition={{
            duration: 0.5,
            delay: 0.2
          }} className="flex flex-col justify-center space-y-12">
              <div>
                <h3 className="font-serif text-lg mb-4">• BY AIR:</h3>
                <p className="leading-relaxed">
                The nearest major airport is George Bush Intercontinental (IAH), located approximately 27 miles from AG Outdoor Venue. From there, you can easily arrange transportation to the venue, whether by car rental, taxi, rideshare, or shuttle service.
                </p>
              </div>
              
              <div>
                <h3 className="font-serif text-lg mb-4">• BY CAR:</h3>
                <p className="leading-relaxed">
                  If you're traveling by car, you can simply use GPS coordinates or follow local road signs to AG Outdoor Venue.
                </p>
              </div>
              
              <div>
                <h3 className="font-serif text-lg mb-4">• PUBLIC TRANSPORT:</h3>
                <p className="leading-relaxed">
                  Unfortunately, public transport is not available at this time
                </p>
              </div>
            </motion.div>
          </div>
        </div>
        
        {/* WHERE TO STAY Section */}
        <div className="py-20 px-8 bg-white">
          <div className="max-w-[1400px] mx-auto">
            {/* Section Title */}
            <h2 className="text-6xl font-serif text-center mb-10 tracking-wide">WHERE TO STAY</h2>
            
            {/* Introduction paragraph */}
            <p className="text-center max-w-[1000px] mx-auto mb-20 text-base leading-relaxed">
              As our wedding day approaches, we are excited to celebrate this special occasion with you. 
              To ensure we can finalize all the details, we kindly ask that you please RSVP by May 25, 2025 and let us know if you will need a hotel room for the night of the event.
              our response will help us determine how many rooms we need to reserve, ensuring a comfortable stay for all of our guests.
              Thank you so much, and we can’t wait to celebrate with you!
              {/* To ensure your comfort during your stay, we've curated a list of accommodations in the vicinity of 
              Dunhaven Castle. Whether you're looking for a cozy inn or a luxury hotel, there's something for everyone. */}
            </p>
            
            {/* Hotel Listing 1 - Castleview Hotel & Spa - Reduced to 70% width and centered */}
            <div className="flex flex-col lg:flex-row mb-32 w-full lg:w-[70%] mx-auto">
              {/* Left side - Image */}
              <div className="lg:w-1/2 pr-0 lg:pr-20">
                <img src="https://images.unsplash.com/photo-1433086966358-54859d0ed716?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80" alt="Castleview Hotel & Spa" className="w-full h-[500px] object-cover filter grayscale" />
              </div>
              
              {/* Right side - Text */}
              <div className="lg:w-1/2 pt-10 lg:pt-20">
                <h3 className="font-serif text-2xl mb-6 tracking-wide">Hotel Coming soon</h3>
                <p className="mb-6 leading-relaxed max-w-[500px]">
                  We are Actively putting together hotel options for your convenience, Stay Tuned!
                  {/* Situated in close proximity to Dunhaven Castle, this hotel provides well-appointed rooms, a tranquil spa, a fine 
                  dining restaurant, and stunning views of the Irish countryside. */}
                </p>
                <Button variant="outline" className="text-xs uppercase tracking-wider h-12 px-8 border-black hover:bg-black hover:text-white">
                  {/* Visit Website */}
                </Button>
              </div>
            </div>
            
            {/* Hotel Listing 2 - Dunhaven Manor Hotel - Reduced to 70% width and centered */}
            <div className="flex flex-col-reverse lg:flex-row w-full lg:w-[70%] mx-auto">
              {/* Left side - Text */}
              <div className="lg:w-1/2 pt-10 lg:pt-20 pr-0 lg:pr-20">
                <h3 className="font-serif text-2xl mb-6 tracking-wide">Hotel Coming soon</h3>
                <p className="mb-6 leading-relaxed max-w-[500px]">
                  We are Actively putting together hotel options for your convenience, Stay Tuned!
                  {/* Nestled in the heart of County Kerry, Dunhaven Manor Hotel offers luxury 
                  accommodations with breathtaking views of the surrounding countryside. */}
                </p>
                <Button variant="outline" className="text-xs uppercase tracking-wider h-12 px-8 border-black hover:bg-black hover:text-white">
                  {/* Visit Website */}
                </Button>
              </div>
              
              {/* Right side - Image */}
              <div className="lg:w-1/2">
                <img src="/lovable-uploads/AGvenue.png" alt="Dunhaven Manor Hotel" className="w-full h-[500px] object-cover filter grayscale" />
              </div>
            </div>
          </div>
        </div>
        
        {/* Special Notes Section - Enhanced with better styling */}
        <motion.div initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.5
      }} className="py-24 px-8 bg-gray-50">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-serif text-center mb-12 tracking-wide">IMPORTANT INFORMATION</h2>
            
            <Card className="p-12 border border-gray-300 bg-white shadow-sm">
              <div className="space-y-8">
                <div className="flex items-start space-x-6">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center text-white">
                      <span className="text-lg">↻</span>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-serif text-xl mb-2 tracking-wide">Transportation to the Wedding</h3>
                    <p className="leading-relaxed text-gray-800">
                      I've had the best experience renting from Sixt Car Rental, but any other car rental company is also okay. Uber and Lyft are also options.
                    </p>
                  </div>
                </div>
                
                <Separator className="bg-gray-200" />
                
                <div className="flex items-start space-x-6">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center text-white">
                      <span className="text-lg">⛰</span>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-serif text-xl mb-2 tracking-wide">Local Activities</h3>
                    <p className="leading-relaxed text-gray-800">
                      Coming Soon! Stay Tuned!!
                    </p>
                  </div>
                </div>
                
                <Separator className="bg-gray-200" />
                
                <div className="flex items-start space-x-6">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center text-white">
                      <span className="text-lg">☂</span>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-serif text-xl mb-2 tracking-wide">Weather Considerations</h3>
                    <p className="leading-relaxed text-gray-800">
                      Please note that Houston weather can be hot and humid. We recommend packing lighter clothes and maybe an umbrella, even during summer months.
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </motion.div>
        
        {/* Contact Section */}
        <motion.div initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.5,
        delay: 0.2
      }} className="py-16 px-8 text-center">
          <p className="mb-6 text-lg">
            If you have any questions or need assistance with travel arrangements, please don't hesitate to contact us.
          </p>
          <Button className="bg-black text-white hover:bg-gray-800 text-xs uppercase tracking-wider h-12 px-8">
            Email: judeandbriannaedwards@gmail.com
          </Button>
        </motion.div>
      </div>
    </Layout>;
};

export default TravelAndStay;
