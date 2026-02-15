import { useCart } from "@/hooks/use-cart";
import { Button } from "@/components/ui/button";
import { Trash2, Minus, Plus } from "lucide-react";
import { Link } from "wouter";
import { useCreateOrder } from "@/hooks/use-orders";

export default function Cart() {
  const { items, removeItem, updateQuantity, total, clearCart } = useCart();
  const createOrder = useCreateOrder();

  const handleCheckout = () => {
    createOrder.mutate({
      items: items.map(item => ({ productId: item.id, quantity: item.quantity, price: item.price })),
      total: total(),
      status: "pending"
    }, {
      onSuccess: () => {
        clearCart();
      }
    });
  };

  if (items.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center pt-32">
        <h1 className="font-serif text-3xl mb-4">Your bag is empty</h1>
        <p className="text-muted-foreground mb-8">Looks like you haven't added any pieces yet.</p>
        <Link href="/shop">
          <Button className="rounded-none uppercase tracking-widest">Continue Shopping</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="font-serif text-4xl mb-12">Shopping Bag</h1>
        
        <div className="space-y-8">
          {items.map((item) => (
            <div key={item.id} className="flex gap-6 py-6 border-b border-border">
              <div className="w-24 h-32 flex-shrink-0 bg-muted">
                <img 
                  src={item.imageUrl} 
                  alt={item.name} 
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="flex-1 flex flex-col justify-between">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-serif text-xl">{item.name}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{item.category}</p>
                  </div>
                  <p className="font-medium">${(item.price / 100).toFixed(2)}</p>
                </div>

                <div className="flex justify-between items-end">
                  <div className="flex items-center border border-border">
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="p-2 hover:bg-muted"
                      disabled={item.quantity <= 1}
                    >
                      <Minus className="h-3 w-3" />
                    </button>
                    <span className="w-8 text-center text-sm">{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="p-2 hover:bg-muted"
                    >
                      <Plus className="h-3 w-3" />
                    </button>
                  </div>
                  
                  <button 
                    onClick={() => removeItem(item.id)}
                    className="text-muted-foreground hover:text-destructive transition-colors"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-end space-y-6">
          <div className="text-right space-y-2">
            <div className="flex justify-between w-64 text-sm">
              <span className="text-muted-foreground">Subtotal</span>
              <span>${(total() / 100).toFixed(2)}</span>
            </div>
            <div className="flex justify-between w-64 text-sm">
              <span className="text-muted-foreground">Shipping</span>
              <span>Free</span>
            </div>
            <div className="flex justify-between w-64 text-xl font-serif pt-4 border-t border-border">
              <span>Total</span>
              <span>${(total() / 100).toFixed(2)}</span>
            </div>
          </div>
          
          <Button 
            size="lg" 
            className="w-64 rounded-none uppercase tracking-widest h-12"
            onClick={handleCheckout}
            disabled={createOrder.isPending}
          >
            {createOrder.isPending ? "Processing..." : "Checkout"}
          </Button>
        </div>
      </div>
    </div>
  );
}
