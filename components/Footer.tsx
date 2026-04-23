export default function Footer() {
  return (
    <footer className="border-t border-violet-900/20 py-10">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-xl font-bold gradient-text">Sahil Jr.</p>
        <p className="text-slate-500 text-sm text-center">
          Business Development Executive · IT Services · Global Markets
        </p>
        <p className="text-slate-600 text-xs">
          © {new Date().getFullYear()} Sahil Jr. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
