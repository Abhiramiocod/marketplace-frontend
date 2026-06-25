interface NewsLetterFooterProps {
  email: string;
  setEmail: (email: string) => void;
}

export default function NewsLetterFooter({
  email,
  setEmail,
}: NewsLetterFooterProps) {
  return (
    <div className="space-y-4">
      <h4
        className="text-sm font-semibold text-[#191c1e]"
        style={{ fontFamily: "Geist, sans-serif" }}
      >
        Newsletter
      </h4>
      <div className="flex">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter email"
          className="bg-[#f2f4f6] border border-gray-200 rounded-l-xl px-4 py-2.5 w-full text-sm focus:outline-none focus:ring-2 focus:ring-[#3525cd]/20 focus:border-[#3525cd] transition-all"
        />
        <button
          className="bg-[#3525cd] text-white px-4 py-2.5 rounded-r-xl text-xs font-bold hover:bg-[#2a1db0] transition-colors"
          style={{ fontFamily: "Geist, sans-serif" }}
        >
          Join
        </button>
      </div>
    </div>
  );
}
