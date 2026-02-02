export const BlogCardSkeleton = () => {
  return (
    <div className="w-full max-w-2xl mx-auto px-4 py-6 border-b border-slate-200 animate-pulse">
      
      <div className="flex items-center gap-3 mb-3">
        <div className="w-6 h-6 rounded-full bg-slate-300" />
        <div className="h-3 w-32 bg-slate-300 rounded" />
      </div>

      <div className="h-5 w-3/4 bg-slate-300 rounded mb-2" />
      <div className="h-5 w-1/2 bg-slate-300 rounded mb-4" />

      <div className="space-y-2">
        <div className="h-3 w-full bg-slate-200 rounded" />
        <div className="h-3 w-5/6 bg-slate-200 rounded" />
        <div className="h-3 w-2/3 bg-slate-200 rounded" />
      </div>

      <div className="flex gap-4 mt-4">
        <div className="h-3 w-20 bg-slate-200 rounded" />
        <div className="h-4 w-4 bg-slate-300 rounded" />
        <div className="h-4 w-4 bg-slate-300 rounded" />
      </div>
    </div>
  );
};
