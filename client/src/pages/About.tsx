import { motion } from "framer-motion";

const ABOUT_IMG = "/images/img_4_1769605774165.png";

export default function About() {
  return (
    <div className="pt-32 pb-24 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="font-serif text-5xl md:text-6xl mb-6">Our Philosophy</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto italic">
            "Structure meets emotion through craft."
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="aspect-video w-full overflow-hidden mb-16 bg-muted"
        >
          <img 
            src={ABOUT_IMG} 
            alt="Studio Treta Atelier" 
            className="w-full h-full object-cover"
          />
        </motion.div>

        <div className="space-y-12 leading-loose text-lg text-muted-foreground font-light text-justify">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-serif text-3xl text-foreground mb-4">The Origin</h2>
            <p>
              Studio Treta was born from a desire to reconcile opposites. The masculine and the feminine. 
              The rigid and the fluid. The ancient and the modern. We are an androgynous everyday wear label 
              that doesn't just dress the body, but honors the spirit within.
            </p>
          </motion.div>

          <motion.div
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 0.8 }}
          >
            <h2 className="font-serif text-3xl text-foreground mb-4">The Pillars</h2>
            <ul className="space-y-6">
              <li>
                <strong className="text-foreground block mb-1">Drishti (Vision)</strong>
                How we see the world determines what we create. Our vision is one of inclusivity, sustainability, 
                and timeless elegance. We see fashion not as consumption, but as curation.
              </li>
              <li>
                <strong className="text-foreground block mb-1">Shilp (Craft)</strong>
                The human hand is the ultimate tool. We partner with master artisans who bring generations of 
                knowledge to every seam. Every garment tells a story of patience and skill.
              </li>
              <li>
                <strong className="text-foreground block mb-1">Rasa (Essence)</strong>
                The emotional response to art. We design clothes that evoke feeling—confidence, comfort, and 
                a quiet sense of power.
              </li>
            </ul>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
