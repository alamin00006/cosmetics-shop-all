import Link from "next/link";
import {
  Mail,
  Phone,
  MapPin,
  Instagram,
  Facebook,
  Twitter,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export const Footer = () => {
  return (
    <footer className="bg-card border-t border-border mt-20">
      {/* Newsletter Section */}
      <div className="bg-primary/5 py-12">
        <div className="container mx-auto px-4 text-center">
          <h3 className="font-display text-2xl font-semibold text-foreground mb-2">
            Join the Beauty Circle
          </h3>
          <p className="text-muted-foreground font-body mb-6 max-w-md mx-auto">
            Subscribe for exclusive offers, beauty tips, and early access to new
            arrivals.
          </p>
          <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Enter your email"
              className="flex-1 h-12 bg-background border-border rounded-full px-6 font-body"
            />
            <Button className="h-12 px-8 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground font-body">
              Subscribe
            </Button>
          </form>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="inline-block">
              <span className="font-display text-2xl font-semibold text-foreground">
                Bella<span className="text-primary">Luxe</span>
              </span>
            </Link>
            <p className="text-muted-foreground text-sm font-body leading-relaxed">
              Your destination for luxury beauty. Discover curated collections
              of premium skincare, makeup, and fragrances.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Shop */}
          <div className="space-y-4">
            <h4 className="font-display font-semibold text-foreground">Shop</h4>
            <ul className="space-y-2">
              {[
                "New Arrivals",
                "Best Sellers",
                "Skincare",
                "Makeup",
                "Fragrance",
                "Sale",
              ].map((item) => (
                <li key={item}>
                  <Link
                    href="/products"
                    className="text-muted-foreground hover:text-primary transition-colors text-sm font-body"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Help */}
          <div className="space-y-4">
            <h4 className="font-display font-semibold text-foreground">Help</h4>
            <ul className="space-y-2">
              {[
                "FAQs",
                "Shipping & Returns",
                "Track Order",
                "Gift Cards",
                "Contact Us",
              ].map((item) => (
                <li key={item}>
                  <Link
                    href="/"
                    className="text-muted-foreground hover:text-primary transition-colors text-sm font-body"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="font-display font-semibold text-foreground">
              Contact
            </h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-muted-foreground text-sm font-body">
                <Mail className="h-4 w-4 text-primary" />
                hello@bellaluxe.com
              </li>
              <li className="flex items-center gap-2 text-muted-foreground text-sm font-body">
                <Phone className="h-4 w-4 text-primary" />
                +1 (800) 555-GLOW
              </li>
              <li className="flex items-center gap-2 text-muted-foreground text-sm font-body">
                <MapPin className="h-4 w-4 text-primary" />
                Beverly Hills, CA
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground text-sm font-body">
            © 2026 BellaLuxe. All rights reserved.
          </p>
          <div className="flex gap-6 text-muted-foreground text-sm font-body">
            <Link href="/" className="hover:text-primary transition-colors">
              Privacy Policy
            </Link>
            <Link href="/" className="hover:text-primary transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
