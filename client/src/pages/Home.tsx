import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { ScrollAnimation } from "@/components/scroll-animation";

// Image imports (using public path as requested)
const PHILOSOPHY_IMG_1 = "/images/img_2_1769605774160.png";
const PHILOSOPHY_IMG_2 = "/images/img_3_1769605774163.png";

export default function Home() {
  return (
    <div className="relative w-full">
      {/* Scroll Animation as a Section */}
      <ScrollAnimation totalFrames={116} framePrefix="ezgif-frame-" frameExtension=".jpg" />
      
      {/* Rest of the content */}
      <div className="relative z-10 bg-background">
        {/* Philosophy Section */}
        <section className="py-24 bg-background border-t">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
              {['Drishti', 'Shilp', 'Rasa'].map((item, index) => (
                <motion.div 
                  key={item}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  className="space-y-4"
                >
                  <h3 className="font-serif text-3xl text-primary">{item}</h3>
                  <div className="h-px w-12 bg-primary/20 mx-auto" />
                  <p className="text-muted-foreground leading-relaxed">
                    {item === 'Drishti' && "Vision. Seeing beyond the ordinary to find beauty in structure."}
                    {item === 'Shilp' && "Craftsmanship. The dedicated hand of the artisan in every stitch."}
                    {item === 'Rasa' && "Soul. The emotional resonance of fabric against skin."}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Collection Preview */}
        <section className="py-24 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <motion.div 
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="relative aspect-[3/4] overflow-hidden group"
              >
                <img 
                  src={PHILOSOPHY_IMG_1} 
                  alt="Collection Preview" 
                  className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
                />
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="space-y-8 md:pl-12"
              >
                <h2 className="font-serif text-4xl md:text-5xl text-primary">The State of Becoming</h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Our latest collection explores the liminal space between who we are and who we are becoming. 
                  Fluid silhouettes meet structured tailoring in a palette of earth and sky.
                </p>
                <Link href="/shop">
                  <div className="inline-flex items-center space-x-2 text-primary border-b border-primary pb-1 cursor-pointer hover:opacity-70 transition-opacity">
                    <span className="uppercase tracking-widest text-sm font-medium">View Lookbook</span>
                    <ArrowRight className="h-4 w-4" />
                  </div>
                </Link>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Second Feature */}
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
               <motion.div 
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="order-2 md:order-1 space-y-8 md:pr-12"
              >
                <h2 className="font-serif text-4xl md:text-5xl text-primary">Conscious Craft</h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  We believe in slow fashion. Every piece is meticulously crafted to last, using sustainable materials 
                  and ethical practices. Studio Treta is a commitment to the planet as much as to style.
                </p>
                <Link href="/about">
                  <Button variant="outline" className="rounded-none border-primary text-primary hover:bg-primary hover:text-white px-8">
                    Read Our Story
                  </Button>
                </Link>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="order-1 md:order-2 relative aspect-[3/4] overflow-hidden group"
              >
                <img 
                  src={PHILOSOPHY_IMG_2} 
                  alt="Craft Detail" 
                  className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
                />
              </motion.div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
