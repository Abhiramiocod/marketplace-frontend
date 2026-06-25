import { useState } from "react";

const COLORS = {
  primary: "#3525cd",
  primaryContainer: "#4f46e5",
  onPrimary: "#ffffff",
  surface: "#f7f9fb",
  surfaceContainerLowest: "#ffffff",
  surfaceContainerLow: "#f2f4f6",
  surfaceContainerHigh: "#e6e8ea",
  onSurface: "#191c1e",
  onSurfaceVariant: "#464555",
  outlineVariant: "#c7c4d8",
  outline: "#777587",
};

const GoogleIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
  </svg>
);

const ShoppingBagIcon = ({ size = 32, color = "white" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
    <line x1="3" y1="6" x2="21" y2="6" />
    <path d="M16 10a4 4 0 01-8 0" />
  </svg>
);

const PhoneIcon = ({ color = COLORS.primary }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
    <line x1="12" y1="18" x2="12.01" y2="18" />
  </svg>
);

const AccountIcon = ({ color = COLORS.onSurfaceVariant }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const ArrowRightIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

const ShieldIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.6">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);

const PaymentIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.6">
    <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
    <line x1="1" y1="10" x2="23" y2="10" />
  </svg>
);

const BadgeIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.6">
    <circle cx="12" cy="8" r="6" />
    <path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11" />
  </svg>
);

const ChevronDownIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={COLORS.onSurfaceVariant} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

export default function LuxeMarketLogin() {
  const [activeTab, setActiveTab] = useState("phone");
  const [phone, setPhone] = useState("");
  const [countryCode, setCountryCode] = useState("+1");
  const [phoneInputFocused, setPhoneInputFocused] = useState(false);

  const countries = [
    { flag: "🇺🇸", code: "+1" },
    { flag: "🇬🇧", code: "+44" },
    { flag: "🇫🇷", code: "+33" },
    { flag: "🇩🇪", code: "+49" },
    { flag: "🇯🇵", code: "+81" },
    { flag: "🇮🇳", code: "+91" },
  ];

  return (
    <div style={{ minHeight: "100vh", display: "flex", fontFamily: "Inter, sans-serif", backgroundColor: COLORS.surface }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Geist:wght@100..900&family=Inter:wght@100..900&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .hover-lift { transition: transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275); }
        .hover-lift:hover { transform: translateY(-2px); }
        .tab-btn { transition: all 0.25s ease; cursor: pointer; border: none; background: transparent; }
        .primary-btn:hover { background: #4b4dd8 !important; }
        .google-btn:hover { background: ${COLORS.surfaceContainerLow} !important; }
        .create-link:hover { text-decoration: underline; }
        select { cursor: pointer; }
        input::placeholder { color: ${COLORS.outline}; }
        .phone-focus-ring { transition: border-color 0.3s, box-shadow 0.3s; }
        .select-wrapper { position: relative; display: inline-flex; align-items: center; }
        .select-wrapper select { -webkit-appearance: none; -moz-appearance: none; appearance: none; padding-right: 28px; }
        .select-wrapper .chevron { position: absolute; right: 8px; pointer-events: none; }
        @media (max-width: 767px) {
          .left-panel { display: none !important; }
          .mobile-logo { display: flex !important; }
        }
        @media (min-width: 768px) {
          .mobile-logo { display: none !important; }
        }
      `}</style>

      {/* Left Panel */}
      <div
        className="left-panel"
        style={{
          width: "58%",
          background: COLORS.primary,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Subtle background orbs */}
        <div style={{
          position: "absolute", top: "-80px", right: "-80px",
          width: "400px", height: "400px", borderRadius: "50%",
          background: "rgba(255,255,255,0.05)", pointerEvents: "none",
        }} />
        <div style={{
          position: "absolute", bottom: "60px", left: "-60px",
          width: "280px", height: "280px", borderRadius: "50%",
          background: "rgba(255,255,255,0.04)", pointerEvents: "none",
        }} />

        {/* Top: Logo + Headline */}
        <div style={{ position: "relative", zIndex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "64px" }}>
            <ShoppingBagIcon size={36} color="white" />
            <h1 style={{ fontFamily: "Geist, sans-serif", fontSize: "24px", fontWeight: 600, color: "white", letterSpacing: "-0.01em" }}>
              LuxeMarket
            </h1>
          </div>
          <div style={{ maxWidth: "480px" }}>
            <h2 style={{
              fontFamily: "Geist, sans-serif", fontSize: "clamp(36px, 5vw, 64px)",
              fontWeight: 600, color: "white", lineHeight: 1.1,
              letterSpacing: "-0.04em", marginBottom: "24px",
            }}>
              The world's most curated marketplace.
            </h2>
            <p style={{
              fontFamily: "Inter, sans-serif", fontSize: "18px",
              color: "rgba(255,255,255,0.8)", lineHeight: "28px", fontWeight: 400,
            }}>
              Access exclusive collections from the world's leading artisans and luxury houses. Our intelligence platform ensures every purchase is authenticated and secured at the highest level.
            </p>
          </div>
        </div>

        {/* Bottom: Trust Badges */}
        <div style={{ display: "flex", alignItems: "center", gap: "32px", position: "relative", zIndex: 1 }}>
          {[
            { icon: <ShieldIcon />, label: "SSL SECURE" },
            { icon: <PaymentIcon />, label: "STRIPE" },
            { icon: <BadgeIcon />, label: "ISO 27001" },
          ].map(({ icon, label }) => (
            <div key={label} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              {icon}
              <span style={{
                fontFamily: "Geist, sans-serif", fontSize: "12px", fontWeight: 600,
                color: "rgba(255,255,255,0.6)", letterSpacing: "0.08em",
              }}>
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Right Panel */}
      <div style={{
        flex: 1, display: "flex", flexDirection: "column",
        justifyContent: "center", alignItems: "center",
        padding: "40px 20px", backgroundColor: COLORS.surfaceContainerLowest,
      }}>
        {/* Mobile Logo */}
        <div className="mobile-logo" style={{
          display: "none", alignItems: "center", gap: "10px", marginBottom: "48px",
        }}>
          <ShoppingBagIcon size={28} color={COLORS.primary} />
          <span style={{ fontFamily: "Geist, sans-serif", fontSize: "22px", fontWeight: 600, color: COLORS.onSurface, letterSpacing: "-0.01em" }}>
            LuxeMarket
          </span>
        </div>

        <div style={{ width: "100%", maxWidth: "420px" }}>
          {/* Header */}
          <div style={{ textAlign: "center", marginBottom: "32px" }}>
            <h2 style={{
              fontFamily: "Geist, sans-serif", fontSize: "32px", fontWeight: 600,
              color: COLORS.onSurface, letterSpacing: "-0.02em", marginBottom: "8px",
            }}>
              Welcome back
            </h2>
            <p style={{ fontFamily: "Inter, sans-serif", fontSize: "16px", color: COLORS.onSurfaceVariant }}>
              Login required to continue shopping
            </p>
          </div>

          {/* Glass Card */}
          <div style={{
            background: "rgba(255,255,255,0.7)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: "1px solid rgba(199,196,216,0.4)",
            borderRadius: "16px",
            padding: "32px",
            boxShadow: "0 2px 4px rgba(0,0,0,0.06), 0 10px 25px rgba(0,0,0,0.08)",
          }}>
            {/* Tab Switcher */}
            <div style={{
              display: "flex", background: COLORS.surfaceContainerHigh,
              borderRadius: "10px", padding: "4px", marginBottom: "24px",
            }}>
              {[
                { key: "phone", label: "Phone Number", icon: <PhoneIcon color={activeTab === "phone" ? COLORS.primary : COLORS.onSurfaceVariant} /> },
                { key: "google", label: "Google", icon: <AccountIcon color={activeTab === "google" ? COLORS.primary : COLORS.onSurfaceVariant} /> },
              ].map(({ key, label, icon }) => (
                <button
                  key={key}
                  className="tab-btn"
                  onClick={() => setActiveTab(key)}
                  style={{
                    flex: 1, display: "flex", alignItems: "center", justifyContent: "center",
                    gap: "8px", padding: "10px 12px", borderRadius: "8px",
                    fontFamily: "Geist, sans-serif", fontSize: "14px", fontWeight: 500,
                    letterSpacing: "0.02em",
                    background: activeTab === key ? COLORS.surfaceContainerLowest : "transparent",
                    color: activeTab === key ? COLORS.primary : COLORS.onSurfaceVariant,
                    boxShadow: activeTab === key ? "0 1px 4px rgba(0,0,0,0.1)" : "none",
                  }}
                >
                  {icon}
                  {label}
                </button>
              ))}
            </div>

            {/* Phone Flow */}
            {activeTab === "phone" && (
              <div>
                <div style={{ marginBottom: "16px" }}>
                  <label style={{
                    display: "block", fontFamily: "Geist, sans-serif",
                    fontSize: "14px", fontWeight: 500, color: COLORS.onSurfaceVariant,
                    marginBottom: "8px", marginLeft: "4px",
                  }}>
                    Mobile Number
                  </label>
                  <div style={{ display: "flex", gap: "8px" }}>
                    {/* Country Selector */}
                    <div className="select-wrapper" style={{
                      background: COLORS.surfaceContainerLow, border: `1px solid ${COLORS.outlineVariant}`,
                      borderRadius: "12px",
                    }}>
                      <select
                        value={countryCode}
                        onChange={e => setCountryCode(e.target.value)}
                        style={{
                          background: "transparent", border: "none", outline: "none",
                          padding: "12px 32px 12px 14px", fontFamily: "Inter, sans-serif",
                          fontSize: "16px", color: COLORS.onSurface,
                        }}
                      >
                        {countries.map(c => (
                          <option key={c.code} value={c.code}>{c.flag} {c.code}</option>
                        ))}
                      </select>
                      <span className="chevron"><ChevronDownIcon /></span>
                    </div>

                    {/* Phone Input */}
                    <div
                      className="phone-focus-ring"
                      style={{
                        flex: 1, display: "flex", alignItems: "center",
                        background: COLORS.surfaceContainerLow,
                        border: `1px solid ${phoneInputFocused ? COLORS.primary : COLORS.outlineVariant}`,
                        borderRadius: "12px", padding: "12px 16px",
                        boxShadow: phoneInputFocused ? `0 0 0 4px rgba(53,37,205,0.1)` : "none",
                      }}
                    >
                      <input
                        type="tel"
                        placeholder="000 000 0000"
                        value={phone}
                        onChange={e => setPhone(e.target.value)}
                        onFocus={() => setPhoneInputFocused(true)}
                        onBlur={() => setPhoneInputFocused(false)}
                        style={{
                          width: "100%", background: "transparent", border: "none",
                          outline: "none", fontFamily: "Inter, sans-serif",
                          fontSize: "16px", color: COLORS.onSurface,
                        }}
                      />
                    </div>
                  </div>
                </div>

                {/* Continue Button */}
                <button
                  className="primary-btn hover-lift"
                  style={{
                    width: "100%", background: COLORS.primary, color: "white",
                    border: "none", borderRadius: "12px", padding: "16px",
                    fontFamily: "Geist, sans-serif", fontSize: "14px", fontWeight: 500,
                    letterSpacing: "0.02em", cursor: "pointer",
                    display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
                    boxShadow: "0 4px 14px rgba(53,37,205,0.25)",
                    transition: "background 0.2s, transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                  }}
                >
                  Continue
                  <ArrowRightIcon />
                </button>
              </div>
            )}

            {/* Google Flow */}
            {activeTab === "google" && (
              <div>
                <p style={{
                  fontFamily: "Inter, sans-serif", fontSize: "16px",
                  color: COLORS.onSurfaceVariant, textAlign: "center",
                  lineHeight: "24px", marginBottom: "24px",
                }}>
                  Sign in securely with your Google account to instantly access your cart and orders.
                </p>
                <button
                  className="google-btn hover-lift"
                  style={{
                    width: "100%", display: "flex", alignItems: "center", justifyContent: "center",
                    gap: "12px", padding: "16px",
                    border: `1px solid ${COLORS.outlineVariant}`, borderRadius: "12px",
                    background: COLORS.surfaceContainerLowest, cursor: "pointer",
                    fontFamily: "Geist, sans-serif", fontSize: "14px", fontWeight: 500,
                    color: COLORS.onSurface, letterSpacing: "0.02em",
                    transition: "background 0.2s, transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                  }}
                >
                  <GoogleIcon />
                  Continue with Google
                </button>
              </div>
            )}

            {/* Divider + Sign Up */}
            <div style={{
              marginTop: "24px", paddingTop: "24px",
              borderTop: `1px solid rgba(199,196,216,0.4)`, textAlign: "center",
            }}>
              <p style={{ fontFamily: "Inter, sans-serif", fontSize: "16px", color: COLORS.onSurfaceVariant }}>
                New to LuxeMarket?{" "}
                <a
                  href="#"
                  className="create-link"
                  style={{ color: COLORS.primary, fontWeight: 600, textDecoration: "none" }}
                >
                  Create Account
                </a>
              </p>
            </div>
          </div>

          {/* Footer */}
          <div style={{ marginTop: "40px", textAlign: "center" }}>
            <p style={{
              fontFamily: "Geist, sans-serif", fontSize: "12px", fontWeight: 600,
              color: COLORS.onSurfaceVariant, letterSpacing: "0.08em",
              opacity: 0.6, textTransform: "uppercase",
            }}>
              Trusted by over 50,000 collectors
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}