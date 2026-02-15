import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center space-y-6">
        <h1 className="font-serif text-8xl text-primary/10">404</h1>
        <h2 className="text-2xl font-serif">Page Not Found</h2>
        <p className="text-muted-foreground">The page you are looking for has been moved or deleted.</p>
        <Link href="/">
          <Button className="rounded-none uppercase tracking-widest mt-4">Return Home</Button>
        </Link>
      </div>
    </div>
  );
}
