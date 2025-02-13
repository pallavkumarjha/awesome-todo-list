"use client";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b backdrop-blur-xl">
      <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <h1 className="text-lg font-semibold">Awesome Todo List</h1>
        </div>
      </nav>
    </header>
  );
}