export default function LoadingState() {
  return (
    <div className="flex flex-col items-center justify-center py-20 animate-fade-in">
      <div className="relative">
        <div className="w-12 h-12 border-4 border-gray-200 rounded-full animate-spin border-t-claret"></div>
      </div>
      <p className="mt-4 text-sm text-gray-500 font-medium">Loading...</p>
    </div>
  );
}
