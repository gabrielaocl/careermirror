'use client';

import Link from 'next/link';
import { Sparkles } from 'lucide-react';
import { useState, useEffect } from 'react';

type User = {
  id: string;
  email: string;
  name: string;
  createdAt: string;
};

export default function Header() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <Link href={user ? "/dashboard" : "/"} className="flex items-center gap-2 hover:opacity-80 transition">
          <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-green-600 rounded-lg flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold text-emerald-600">CareerMirror</span>
        </Link>
        <Link href="/" className="text-blue-600 hover:text-blue-700 hover:underline font-medium transition">
          {user ? "← Back to Home" : "Back to Home"}
        </Link>
      </div>
    </header>
  );
}
