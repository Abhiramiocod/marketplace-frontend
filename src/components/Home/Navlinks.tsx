export default function Navlinks() {
  return (
    <nav className="hidden md:flex gap-8">
      {["Collections", "New Arrivals", "Sustainability", "Journal"].map(
        (item) => (
          <a
            key={item}
            href="#"
            className={`text-sm font-semibold transition-colors pb-0.5 ${
              item === "Collections"
                ? "text-[#3525cd] border-b-2 border-[#3525cd]"
                : "text-[#464555] hover:text-[#3525cd]"
            }`}
            style={{
              fontFamily: "Geist, sans-serif",
              letterSpacing: "0.02em",
            }}
          >
            {item}
          </a>
        ),
      )}
    </nav>
  );
}
