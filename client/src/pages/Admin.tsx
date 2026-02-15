import { useAuth } from "@/hooks/use-auth";
import { useProducts, useCreateProduct, useDeleteProduct } from "@/hooks/use-products";
import { useOrders } from "@/hooks/use-orders";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertProductSchema, type InsertProduct } from "@shared/schema";
import { Loader2, Plus, Trash2, Box } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { z } from "zod";

const formSchema = insertProductSchema.extend({
  price: z.coerce.number().min(1, "Price must be greater than 0"),
  stock: z.coerce.number().min(0, "Stock cannot be negative"),
});

export default function Admin() {
  const { user, isLoading: authLoading } = useAuth();
  const { data: products, isLoading: productsLoading } = useProducts();
  const { data: orders } = useOrders();
  const createProduct = useCreateProduct();
  const deleteProduct = useDeleteProduct();

  const form = useForm<InsertProduct>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      imageUrl: "",
      category: "",
      stock: 0,
      isFeatured: false,
    }
  });

  if (authLoading || productsLoading) return <div className="h-screen flex items-center justify-center"><Loader2 className="animate-spin" /></div>;

  if (!user) {
    window.location.href = "/api/login";
    return null;
  }

  const onSubmit = (data: InsertProduct) => {
    createProduct.mutate(data, {
      onSuccess: () => form.reset()
    });
  };

  return (
    <div className="pt-32 pb-24 min-h-screen bg-muted/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="font-serif text-3xl">Admin Dashboard</h1>
          <div className="flex items-center gap-4">
             <span className="text-sm text-muted-foreground">Logged in as {user.email}</span>
          </div>
        </div>

        <Tabs defaultValue="products" className="w-full">
          <TabsList className="mb-8 w-full justify-start rounded-none border-b border-border bg-transparent p-0">
            <TabsTrigger value="products" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-8 py-3">Products</TabsTrigger>
            <TabsTrigger value="orders" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-8 py-3">Orders</TabsTrigger>
          </TabsList>

          <TabsContent value="products">
            <div className="flex justify-end mb-6">
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="rounded-none"><Plus className="w-4 h-4 mr-2" /> Add Product</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New Product</DialogTitle>
                  </DialogHeader>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                      <FormField control={form.control} name="name" render={({field}) => (
                        <FormItem><FormLabel>Name</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                      )} />
                      <FormField control={form.control} name="description" render={({field}) => (
                         <FormItem><FormLabel>Description</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                      )} />
                      <div className="grid grid-cols-2 gap-4">
                        <FormField control={form.control} name="price" render={({field}) => (
                           <FormItem><FormLabel>Price (cents)</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>
                        )} />
                        <FormField control={form.control} name="stock" render={({field}) => (
                           <FormItem><FormLabel>Stock</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>
                        )} />
                      </div>
                      <FormField control={form.control} name="category" render={({field}) => (
                         <FormItem><FormLabel>Category</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                      )} />
                      <FormField control={form.control} name="imageUrl" render={({field}) => (
                         <FormItem><FormLabel>Image URL</FormLabel><FormControl><Input {...field} placeholder="/images/..." /></FormControl><FormMessage /></FormItem>
                      )} />
                      <Button type="submit" className="w-full" disabled={createProduct.isPending}>
                        {createProduct.isPending ? "Creating..." : "Create Product"}
                      </Button>
                    </form>
                  </Form>
                </DialogContent>
              </Dialog>
            </div>

            <div className="bg-white border border-border rounded-none overflow-hidden">
              <table className="w-full text-left">
                <thead className="bg-muted text-sm uppercase tracking-wider">
                  <tr>
                    <th className="p-4">Product</th>
                    <th className="p-4">Category</th>
                    <th className="p-4">Price</th>
                    <th className="p-4">Stock</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {products?.map((product) => (
                    <tr key={product.id} className="hover:bg-muted/30">
                      <td className="p-4 flex items-center gap-3">
                        <div className="w-10 h-10 bg-muted overflow-hidden">
                          <img src={product.imageUrl} alt="" className="w-full h-full object-cover" />
                        </div>
                        <span className="font-medium">{product.name}</span>
                      </td>
                      <td className="p-4 text-sm">{product.category}</td>
                      <td className="p-4">${(product.price / 100).toFixed(2)}</td>
                      <td className="p-4">{product.stock}</td>
                      <td className="p-4 text-right">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="text-destructive hover:text-destructive hover:bg-destructive/10"
                          onClick={() => deleteProduct.mutate(product.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </TabsContent>

          <TabsContent value="orders">
             <div className="bg-white border border-border rounded-none overflow-hidden">
                {(!orders || orders.length === 0) ? (
                   <div className="p-12 text-center text-muted-foreground flex flex-col items-center">
                     <Box className="w-12 h-12 mb-4 opacity-20" />
                     <p>No orders yet.</p>
                   </div>
                ) : (
                  <table className="w-full text-left">
                    <thead className="bg-muted text-sm uppercase tracking-wider">
                      <tr>
                        <th className="p-4">Order ID</th>
                        <th className="p-4">Date</th>
                        <th className="p-4">Customer</th>
                        <th className="p-4">Total</th>
                        <th className="p-4">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {orders.map((order) => (
                        <tr key={order.id} className="hover:bg-muted/30">
                          <td className="p-4 font-mono text-sm">#{order.id}</td>
                          <td className="p-4 text-sm">{order.createdAt ? new Date(order.createdAt).toLocaleDateString() : '-'}</td>
                          <td className="p-4 text-sm">{order.customerEmail || 'Guest'}</td>
                          <td className="p-4 font-medium">${(order.total / 100).toFixed(2)}</td>
                          <td className="p-4"><span className="inline-block px-2 py-1 bg-yellow-100 text-yellow-800 text-xs uppercase tracking-wider rounded-sm">{order.status}</span></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
             </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
