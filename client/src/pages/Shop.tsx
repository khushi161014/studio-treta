import { useProducts } from "@/hooks/use-products";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function Shop() {
  const { data: products, isLoading } = useProducts();
  const [category, setCategory] = useState("All");

  const categories = ["All", "Outerwear", "Tops", "Bottoms", "Accessories"];

  const filteredProducts = category === "All" 
    ? products 
    : products?.filter(p => p.category === category);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <h1 className="font-serif text-5xl mb-6">The Collection</h1>
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`text-sm tracking-widest uppercase transition-colors ${
                  category === cat 
                    ? 'text-primary border-b border-primary pb-1' 
                    : 'text-muted-foreground hover:text-primary'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-12">
          {filteredProducts?.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link href={`/product/${product.id}`}>
                <div className="group cursor-pointer">
                  <div className="aspect-[3/4] overflow-hidden bg-muted mb-4 relative">
                    <img 
                      src={product.imageUrl} 
                      alt={product.name}
                      className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
                    />
                    {product.stock === 0 && (
                      <div className="absolute inset-0 bg-white/60 flex items-center justify-center">
                        <span className="bg-black text-white px-3 py-1 text-xs uppercase tracking-widest">Sold Out</span>
                      </div>
                    )}
                  </div>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-serif text-lg group-hover:text-primary/70 transition-colors">{product.name}</h3>
                      <p className="text-sm text-muted-foreground mt-1">{product.category}</p>
                    </div>
                    <span className="font-medium font-sans">
                      ${(product.price / 100).toFixed(2)}
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {filteredProducts?.length === 0 && (
          <div className="text-center py-24 text-muted-foreground">
            <p>No products found in this category.</p>
            <Button variant="link" onClick={() => setCategory("All")}>View All Products</Button>
          </div>
        )}
      </div>
    </div>
  );
}
