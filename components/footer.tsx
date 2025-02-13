"use client";

export default function Footer() {
  return (
    <footer className="w-full border-t bg-black text-white fixed bottom-0 left-0 right-0">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <p className="text-sm font-medium">This looks like an awesome todo app</p>
        </div>
        <div className="flex items-center gap-4">
          <p
            className="px-4 py-2 text-sm font-medium transition-colors"
          >
            No Copyright
          </p>
        </div>
      </div>
    </footer>
  )
}