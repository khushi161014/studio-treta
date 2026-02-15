import { Link } from "wouter";

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground py-16 mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-2">
            <h3 className="font-serif text-2xl mb-6">Studio Treta</h3>
            <p className="text-primary-foreground/80 max-w-sm leading-relaxed">
              Where structure meets emotion through craft. An androgynous, everyday wear label rooted in balance.
            </p>
          </div>
          
          <div>
            <h4 className="font-sans text-sm tracking-widest uppercase mb-6 font-bold">Explore</h4>
            <ul className="space-y-4">
              <li><Link href="/shop" className="hover:text-accent transition-colors">Collection</Link></li>
              <li><Link href="/about" className="hover:text-accent transition-colors">Philosophy</Link></li>
              <li><Link href="/contact" className="hover:text-accent transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-sans text-sm tracking-widest uppercase mb-6 font-bold">Connect</h4>
            <ul className="space-y-4">
              <li><a href="#" className="hover:text-accent transition-colors">Instagram</a></li>
              <li><a href="mailto:hello@studiotreta.com" className="hover:text-accent transition-colors">Email Us</a></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-16 pt-8 border-t border-primary-foreground/10 text-center text-sm text-primary-foreground/60">
          <p>&copy; {new Date().getFullYear()} Studio Treta. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
