import { ShoppingCart } from "lucide-react";

interface CartProps {
  cartOpen: boolean;
  setCartOpen: (value: boolean) => void;
}

export default function Cart({ cartOpen, setCartOpen }: CartProps) {
  return (
    <button
      onClick={() => setCartOpen(!cartOpen)}
      className="flex items-center gap-1.5 text-sm font-semibold text-[#464555] hover:text-[#3525cd] transition-colors"
      style={{ fontFamily: "Geist, sans-serif" }}
    >
      <ShoppingCart className="w-5 h-5 fill-none stroke-current stroke-[1.5]" />
      <span className="hidden sm:inline">Cart</span>
    </button>
  );
}
