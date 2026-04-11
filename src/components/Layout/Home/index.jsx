import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { Truck, RotateCcw, ShieldCheck, BadgeCheck } from 'lucide-react';

const FeaturesBar = () => {
  const features = [
    { icon: Truck, title: "FREE SHIPPING", desc: "Order via Campaign" },
    { icon: BadgeCheck, title: "BEST PRICE", desc: "Quality products" },
    { icon: RotateCcw, title: "FREE RETERN", desc: "Within 7 days returns" },
    { icon: ShieldCheck, title: "SECURE PAYMENT", desc: "100% secure payment" },
  ];

  return (
    <div className="bg-[#F9FAFB] border-y border-gray-100 py-10">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map((f, i) => (
          <div key={i} className="flex items-center gap-4 justify-center">
            <div className="text-[#00aaff]">
              <f.icon size={40} strokeWidth={1.5} />
            </div>
            <div>
              <h4 className="font-bold text-gray-800 text-sm uppercase tracking-wider">{f.title}</h4>
              <p className="text-gray-500 text-xs">{f.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-white flex flex-col overflow-x-hidden">
      <Navbar />
      <main className="flex-grow">
        {children}
      </main>
      <FeaturesBar />
      <Footer />
    </div>
  );
};

export default Layout;
