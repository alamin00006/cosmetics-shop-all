import { Home, Tag, Heart, User, Sparkles } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

const navItems = [
  { icon: Home, label: "Home", to: "/" },
  { icon: Sparkles, label: "New", to: "/products?filter=new" },
  { icon: Tag, label: "Offers", to: "/products?filter=offers" },
  { icon: Heart, label: "Wishlist", to: "/wishlist" },
  { icon: User, label: "Account", to: "#" },
];

const MobileBottomNav = () => {
  const { pathname } = useParams();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border shadow-[0_-2px_10px_rgba(0,0,0,0.05)] lg:hidden">
      <div className="flex items-center justify-around h-16 px-2">
        {navItems.map((item) => {
          const isActive = item.to === "/" ? pathname === "/" : "";
          //   const isActive = item.to === "/" ? pathname === "/" : pathname.startsWith(item.to.split("?")[0]) && item.to !== "#";
          return (
            <Link
              key={item.label}
              href={item.to}
              className={`flex flex-col items-center justify-center gap-0.5 px-3 py-1 rounded-xl transition-colors ${
                isActive
                  ? "bg-foreground text-background"
                  : "text-foreground/50 hover:text-foreground"
              }`}
            >
              <item.icon size={20} strokeWidth={isActive ? 2.5 : 1.5} />
              <span className="text-[10px] font-heading font-semibold">
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default MobileBottomNav;
