import { Suspense, lazy } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Stats from '../components/Stats';
import Services from '../components/Services';
import Footer from '../components/Footer';
import FloatingWhatsApp from '../components/FloatingWhatsApp';

// Lazy load heavy sections
const OurWork = lazy(() => import('../components/OurWork'));
const Contact = lazy(() => import('../components/Contact'));
const InfiniteMarquee = lazy(() => import('../components/InfiniteMarquee'));
const AvailableEquipment = lazy(() => import('../components/AvailableEquipment'));

// Custom Loading Skeletons matching layouts to prevent CLS
function MarqueeSkeleton() {
  return <div className="h-[74px] bg-slate-950/60 border-t border-b border-slate-900 animate-pulse w-full"></div>;
}

// Custom Loading Skeletons matching layouts to prevent CLS
function OurWorkSkeleton() {
  return (
    <div className="py-24 px-4 sm:px-6 lg:px-8 bg-slate-950 border-t border-slate-900 animate-pulse min-h-[800px]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="h-4 bg-slate-900/60 w-24 mx-auto rounded mb-3"></div>
          <div className="h-10 bg-slate-900/60 w-64 mx-auto rounded mb-4"></div>
          <div className="h-4 bg-slate-900/60 w-96 mx-auto rounded"></div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-[400px] mb-20">
          <div className="lg:col-span-7 bg-slate-900/40 rounded-3xl border border-slate-900 animate-pulse"></div>
          <div className="lg:col-span-5 bg-slate-900/40 rounded-3xl border border-slate-900 p-8 flex flex-col justify-between animate-pulse">
            <div className="space-y-4">
              <div className="h-6 bg-slate-900/60 w-1/3 rounded-full"></div>
              <div className="h-8 bg-slate-900/60 w-3/4 rounded"></div>
              <div className="h-16 bg-slate-900/60 w-full rounded"></div>
            </div>
            <div className="space-y-3">
              <div className="h-4 bg-slate-900/60 w-full rounded"></div>
              <div className="h-4 bg-slate-900/60 w-5/6 rounded"></div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((n) => (
            <div key={n} className="rounded-3xl bg-slate-900/40 border border-slate-900 p-4 h-[280px] animate-pulse">
              <div className="w-full h-40 rounded-2xl bg-slate-900/60 mb-4"></div>
              <div className="h-5 bg-slate-900/60 w-3/4 rounded mb-2"></div>
              <div className="h-4 bg-slate-900/60 w-1/2 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ContactSkeleton() {
  return (
    <div className="py-24 px-4 sm:px-6 lg:px-8 bg-slate-950 border-t border-slate-900 animate-pulse min-h-[600px]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="h-4 bg-slate-900/60 w-24 mx-auto rounded mb-3"></div>
          <div className="h-10 bg-slate-900/60 w-56 mx-auto rounded mb-4"></div>
          <div className="h-4 bg-slate-900/60 w-96 mx-auto rounded"></div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-6xl mx-auto">
          <div className="lg:col-span-5">
            <div className="h-[380px] bg-slate-900/40 border border-slate-900 rounded-3xl animate-pulse"></div>
          </div>
          <div className="lg:col-span-7">
            <div className="h-[380px] bg-slate-900/40 border border-slate-900 rounded-3xl animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

function AvailableEquipmentSkeleton() {
  return (
    <div className="py-24 px-4 sm:px-6 lg:px-8 bg-slate-950 border-t border-slate-900 animate-pulse min-h-[500px]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="h-4 bg-slate-900/60 w-24 mx-auto rounded mb-3"></div>
          <div className="h-10 bg-slate-900/60 w-64 mx-auto rounded mb-4"></div>
          <div className="h-4 bg-slate-900/60 w-80 mx-auto rounded"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-16">
          {[1, 2, 3].map((n) => (
            <div key={n} className="rounded-3xl bg-slate-900/40 border border-slate-900 p-3.5 h-[280px]">
              <div className="w-full aspect-video rounded-2xl bg-slate-900/60 mb-4"></div>
              <div className="h-3 bg-slate-900/60 w-1/4 rounded mb-2 ml-1"></div>
              <div className="h-5 bg-slate-900/60 w-3/4 rounded ml-1"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-orange-500 selection:text-white">
      {/* Sticky Navigation Bar */}
      <Navbar />

      {/* Main Content */}
      <main className="flex-grow">
        <Hero />
        <Stats />
        <Services />
        <Suspense fallback={<MarqueeSkeleton />}>
          <InfiniteMarquee />
        </Suspense>

        <Suspense fallback={<OurWorkSkeleton />}>
          <OurWork />
        </Suspense>
        <Suspense fallback={<ContactSkeleton />}>
          <Contact />
        </Suspense>
        <Suspense fallback={<AvailableEquipmentSkeleton />}>
          <AvailableEquipment />
        </Suspense>
      </main>

      {/* Footer Section */}
      <Footer />

      {/* Global Floating Action Button */}
      <FloatingWhatsApp />
    </div>
  );
}
