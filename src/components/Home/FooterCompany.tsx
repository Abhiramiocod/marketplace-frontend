export default function FooterCompany() {
  return (
    <div className="space-y-4">
      <h4
        className="text-sm font-semibold text-[#191c1e]"
        style={{ fontFamily: "Geist, sans-serif" }}
      >
        Company
      </h4>
      <ul className="space-y-2">
        {["Privacy Policy", "Terms of Service"].map((item) => (
          <li key={item}>
            <a
              href="#"
              className="text-xs text-[#464555] hover:text-[#3525cd] transition-colors font-semibold uppercase tracking-wider"
              style={{ fontFamily: "Geist, sans-serif" }}
            >
              {item}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
