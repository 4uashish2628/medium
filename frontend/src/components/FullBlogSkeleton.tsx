export const FullBlogSkeleton = () => {
  return (
    <div className="flex justify-center animate-pulse">
      <div className="max-w-2xl w-full pt-10 px-4">

        <div className="h-8 w-3/4 bg-slate-300 rounded mb-6" />

        <div className="flex items-center gap-4 mb-6">
          <div className="w-9 h-9 rounded-full bg-slate-300" />
          <div className="h-4 w-32 bg-slate-300 rounded" />
          <div className="h-4 w-24 bg-slate-200 rounded" />
        </div>

        <div className="space-y-3">
          <div className="h-4 w-full bg-slate-200 rounded" />
          <div className="h-4 w-11/12 bg-slate-200 rounded" />
          <div className="h-4 w-10/12 bg-slate-200 rounded" />
          <div className="h-4 w-full bg-slate-200 rounded" />
          <div className="h-4 w-9/12 bg-slate-200 rounded" />
        </div>
      </div>
    </div>
  );
};
