interface NavPageProps {
  page: number;
  onNextPage: () => void;
  onPrevPage: () => void;
}

function NavPage({ page, onNextPage, onPrevPage }: NavPageProps) {
  return (
    <header className="flex justify-center items-center gap-6 mb-8 mt-8">
      <button 
        onClick={onPrevPage}
        disabled={page === 1}
        className="px-6 py-2 bg-gradient-to-r from-green-400 to-emerald-500 text-white font-semibold rounded-lg hover:from-green-500 hover:to-emerald-600 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed transition-all shadow-lg border-2 border-green-300/50"
      >
        ← Prev
      </button>
      <p className="text-xl font-bold text-slate-800 bg-white/80 px-4 py-2 rounded-lg shadow-md">Page: {page}</p>
      <button 
        onClick={onNextPage}
        className="px-6 py-2 bg-gradient-to-r from-green-400 to-emerald-500 text-white font-semibold rounded-lg hover:from-green-500 hover:to-emerald-600 transition-all shadow-lg border-2 border-green-300/50"
      >
        Next →
      </button>
    </header> 
  );
}

export default NavPage;
