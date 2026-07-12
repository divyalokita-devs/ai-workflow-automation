const Navbar = () => {
  return (
    <header className="h-16 bg-white shadow flex items-center justify-between px-6">
      <h2 className="text-xl font-semibold text-slate-700">
        Dashboard
      </h2>

      <div className="flex items-center gap-4">
        <button className="text-xl">🔔</button>

        <div className="w-10 h-10 rounded-full bg-cyan-500 flex items-center justify-center text-white font-bold">
          D
        </div>
      </div>
    </header>
  );
};

export default Navbar;