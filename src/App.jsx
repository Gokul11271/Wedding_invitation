import { useEffect, useRef, useState, useLayoutEffect } from 'react';
import Lenis from 'lenis';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Camera, Sun, User, CarFront, Puzzle } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import confetti from 'canvas-confetti';

gsap.registerPlugin(ScrollTrigger);

// Assets
const ASSETS = {
  coverBg: "https://framerusercontent.com/images/uQ5GdDW5jaPT8LYNBYabSn2bj0.png?width=1168&height=12275",
  landingBg: "https://framerusercontent.com/images/cyIPT3IPm257uiP1lpxhaxTt8E.png?width=1386&height=5741",
  lantern: "https://framerusercontent.com/images/nc35y7b0Zuw1Gp5B9Uyd0lzjxKM.png?scale-down-to=1024&width=1024&height=1536",
  godIcon: "https://framerusercontent.com/images/tjsmDC8g305SmMs98B3ABqR5QE.png?width=279&height=296",
  frame: "https://framerusercontent.com/images/z8fNGgEf83GUW8GN7ddabomNq0.png?width=774&height=952",
  frameFlower: "https://framerusercontent.com/images/FLSOOveTOLX34LMuvOegzZoZ2eo.png?scale-down-to=1024&width=1094&height=1166",
  bgGroomFrame: "https://framerusercontent.com/images/54JwjUrKR8txnFhN4dFmme3FzoQ.png?width=506&height=758",
  pinkBg: "https://framerusercontent.com/images/CxMq9eNVYFWeipRkOH7L6BF7EV4.png?width=1350&height=3716",
  blueCar: "https://framerusercontent.com/images/O07fRruEj5em3moPWz2blxIGqRI.png?width=520&height=779",
  blackCar: "https://framerusercontent.com/images/22xXcSSm9sQYXLb74vUWOaNwXY.png?width=738&height=738",
  footerTemple: "https://framerusercontent.com/images/7Rkp2TXFX8Lomrn68coHcBaIdpY.png?width=1536&height=1625"
};

const LANTERNS = [
  // ... (existing lanterns)
  { size: 90, left: '5%', top: '10%', delay: 0 },
  { size: 60, left: '18%', top: '5%', delay: 0.5 },
  { size: 100, left: '25%', top: '25%', delay: 1 },
  { size: 50, left: '35%', top: '8%', delay: 1.5 },
  { size: 80, left: '65%', top: '12%', delay: 0.8 },
  { size: 120, left: '85%', top: '5%', delay: 0.2 },
  { size: 70, left: '92%', top: '22%', delay: 1.2 },
  { size: 95, left: '10%', top: '45%', delay: 0.3 },
  { size: 65, left: '28%', top: '40%', delay: 1.1 },
  { size: 110, left: '72%', top: '42%', delay: 0.7 },
  { size: 45, left: '85%', top: '50%', delay: 1.4 },
  { size: 85, left: '8%', top: '75%', delay: 0.6 },
  { size: 100, left: '20%', top: '85%', delay: 1.3 },
  { size: 55, left: '35%', top: '80%', delay: 0.9 },
  { size: 90, left: '60%', top: '88%', delay: 0.4 },
  { size: 115, left: '82%', top: '82%', delay: 1 },
  { size: 60, left: '90%', top: '70%', delay: 0.1 },
  { size: 75, left: '45%', top: '65%', delay: 0.8 },
];


function Thoranam() {
  return (
    <div className="absolute top-0 left-0 w-full flex justify-around pointer-events-none z-30 opacity-60">
      {Array.from({ length: 12 }).map((_, i) => (
        <motion.div
          key={i}
          animate={{ rotate: [-2, 2, -2] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: i * 0.2 }}
          className="flex flex-col items-center origin-top h-32"
        >
          <div className="w-[1px] h-12 bg-green-800/40"></div>
          <div className="w-6 h-16 bg-green-700/80 rounded-b-full shadow-lg" style={{ clipPath: 'polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)' }}></div>
        </motion.div>
      ))}
    </div>
  );
}

function ParchmentScroll({ href }) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noreferrer"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="group relative flex flex-col items-center cursor-pointer pointer-events-auto"
    >
      {/* Scroll Handles */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[110%] h-4 bg-gradient-to-r from-[#8b4513] via-yellow-600 to-[#8b4513] rounded-full z-20 shadow-lg"></div>
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[110%] h-4 bg-gradient-to-r from-[#8b4513] via-yellow-600 to-[#8b4513] rounded-full z-20 shadow-lg"></div>

      {/* Scroll Body */}
      <div className="w-48 h-64 bg-[#fbf3d5] border-x-8 border-[#8b4513]/20 shadow-2xl relative overflow-hidden flex flex-col items-center justify-center p-4 transition-all duration-500 group-hover:h-72">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: `url(${ASSETS.pinkBg})`, backgroundSize: 'cover' }}></div>
        
        {/* Faded Map Icon */}
        <div className="relative z-10 opacity-30 group-hover:opacity-60 transition-opacity mb-4">
           <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="#8b4513" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
             <path d="M3 6l6 3 6-3 6 3v15l-6-3-6 3-6-3V6z" />
             <path d="M9 9v12" />
             <path d="M15 6v12" />
           </svg>
        </div>

        <div className="relative z-10 flex flex-col items-center text-center">
          <motion.div 
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-2xl mb-2"
          >
            📍
          </motion.div>
          <span className="font-serif text-[#8b4513] text-[10px] tracking-[0.3em] font-medium uppercase mb-1">Click to open</span>
          <span className="font-serif text-[#8b4513] text-lg font-bold uppercase tracking-widest">Google Map</span>
          <div className="w-12 h-[1px] bg-[#8b4513]/40 mt-3"></div>
        </div>
      </div>
      
      {/* Side Shadow */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/5 via-transparent to-black/5 pointer-events-none"></div>
    </motion.a>
  );
}

function RibbonScroll({ href }) {
  const [isUnrolling, setIsUnrolling] = useState(false);

  const handleClick = (e) => {
    e.preventDefault();
    setIsUnrolling(true);
    setTimeout(() => {
      window.open(href, '_blank');
      setIsUnrolling(false);
    }, 1200);
  };

  return (
    <div 
      onClick={handleClick}
      className="fixed bottom-10 right-6 md:right-12 z-[100] group cursor-pointer"
    >
      <motion.div
        animate={isUnrolling ? { rotate: [0, -10, 5, 0], scale: 1.1 } : { y: [0, -10, 0] }}
        transition={isUnrolling ? { duration: 0.5 } : { duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="relative flex flex-col items-center"
      >
        {/* The Scroll Body (Rolled) */}
        <motion.div 
           className="w-10 md:w-12 bg-[#fbf3d5] rounded-lg border-2 border-[#8b4513]/30 shadow-2xl overflow-hidden relative"
           animate={isUnrolling ? { height: '180px', width: '140px', x: -60, y: -60 } : { height: '100px', width: '45px' }}
           transition={{ duration: 0.8, ease: "circOut" }}
        >
          {/* Paper Texture */}
          <div className="absolute inset-0 opacity-20" style={{ backgroundImage: `url(${ASSETS.pinkBg})`, backgroundSize: 'cover' }}></div>
          
          {/* Scroll Content (Visible only when unrolling) */}
          <AnimatePresence>
            {isUnrolling && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center"
              >
                <div className="text-xl mb-1">📍</div>
                <span className="text-[#8b4513] font-serif text-[8px] uppercase tracking-tighter leading-none">Directions</span>
                <span className="text-[#8b4513] font-serif text-sm font-bold uppercase tracking-tight mt-1">Venue Map</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Wooden Ends */}
          <div className="absolute top-0 w-full h-3 bg-gradient-to-r from-[#8b4513] via-yellow-600 to-[#8b4513]"></div>
          <div className="absolute bottom-0 w-full h-3 bg-gradient-to-r from-[#8b4513] via-yellow-600 to-[#8b4513]"></div>
        </motion.div>

        {/* RED RIBBON */}
        <AnimatePresence>
          {!isUnrolling && (
            <motion.div
              exit={{ y: 50, opacity: 0, rotate: 45, transition: { duration: 0.5 } }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-4 bg-red-600 shadow-lg z-10 flex items-center justify-center"
            >
              {/* Ribbon Bow Knot */}
              <div className="w-6 h-6 bg-red-700 rounded-full border border-red-400 flex items-center justify-center">
                 <div className="w-1 h-1 bg-yellow-400 rounded-full"></div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Floating Label */}
        <motion.span 
          animate={{ opacity: isUnrolling ? 0 : 1 }}
          className="mt-3 text-yellow-500 font-sans text-[8px] md:text-[10px] tracking-[0.3em] uppercase whitespace-nowrap bg-black/40 backdrop-blur-md px-3 py-1 rounded-full border border-yellow-500/20"
        >
          View Map
        </motion.span>
      </motion.div>
    </div>
  );
}

function Kolam() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, rotate: -45 }}
      whileInView={{ opacity: 0.15, scale: 1, rotate: 0 }}
      transition={{ duration: 2 }}
      className="absolute pointer-events-none select-none"
    >
      <svg width="400" height="400" viewBox="0 0 400 400" className="stroke-yellow-500 fill-none opacity-50">
        <path d="M200 40 L360 200 L200 360 L40 200 Z" strokeWidth="1" />
        <circle cx="200" cy="200" r="140" strokeWidth="1" strokeDasharray="10 5" />
        <path d="M200 60 Q260 140 200 200 Q140 140 200 60" strokeWidth="1" />
        <path d="M200 340 Q260 260 200 200 Q140 260 200 340" strokeWidth="1" />
        <path d="M60 200 Q140 260 200 200 Q140 140 60 200" strokeWidth="1" />
        <path d="M340 200 Q260 260 200 200 Q260 140 340 200" strokeWidth="1" />
      </svg>
    </motion.div>
  );
}

export default function App() {
  const [isOpened, setIsOpened] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const lenisRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
    });

    lenisRef.current = lenis;

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    if (!isOpened) {
      lenis.stop();
      window.scrollTo(0, 0);
    }

    return () => {
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    if (lenisRef.current) {
      if (isOpened) lenisRef.current.start();
      else lenisRef.current.stop();
    }
  }, [isOpened]);

  const { scrollY } = useScroll();
  const yHeroText = useTransform(scrollY, [0, 1000], [0, 600]);
  const yHeroCandles = useTransform(scrollY, [0, 1000], [0, 400]);

  useLayoutEffect(() => {
    if (!isOpened) return;

    gsap.from(".reveal-line", {
      scrollTrigger: {
        trigger: "#footer-reveal-container",
        start: "top 80%",
        toggleActions: "play none none reverse"
      },
      y: 50,
      opacity: 0,
      duration: 1.5,
      stagger: 0.5,
      ease: "power4.out"
    });
  }, [isOpened]);

  return (
    <>
      <RibbonScroll href="https://share.google/xbCtrxVL6cO7AGYJq" />
      {/* ROYAL SCROLL OPENING OVERLAY */}
      <AnimatePresence>
        {!isOpened && (
          <motion.div
            className="fixed inset-0 z-[1000] flex items-center justify-center bg-[#0a0f1b]"
            exit={{ opacity: 0, transition: { duration: 1, delay: 0.8 } }}
          >
            {/* Scroll Container */}
            <div className="relative flex flex-col items-center">
              {/* Top Handle */}
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '80vw' }}
                transition={{ duration: 1.5, ease: "circOut" }}
                className="h-6 bg-gradient-to-r from-[#8b4513] via-yellow-600 to-[#8b4513] rounded-full flex items-center justify-between px-2 relative z-20 shadow-2xl"
              >
                <div className="w-8 h-8 rounded-full bg-yellow-500 border-2 border-yellow-800 -ml-4"></div>
                <div className="w-8 h-8 rounded-full bg-yellow-500 border-2 border-yellow-800 -mr-4"></div>
              </motion.div>

              {/* Scroll Body (Expanding Paper) */}
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: '70vh', opacity: 1 }}
                transition={{ duration: 1.5, delay: 1, ease: "circOut" }}
                className="w-[75vw] bg-[#fbf3d5] relative overflow-hidden border-x-[15px] border-[#8b4513]/10"
                style={{ backgroundImage: `url(${ASSETS.pinkBg})`, backgroundSize: 'cover', backgroundBlendMode: 'multiply' }}
              >
                <div className="absolute inset-0 bg-yellow-500/5"></div>
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 2, duration: 1.2 }}
                  className="relative h-full flex flex-col items-center justify-center p-8 text-center"
                >
                  <img src={ASSETS.godIcon} className="w-24 mb-6 opacity-30 invert" alt="" />
                  <h2 className="text-[#8b4513] font-serif text-3xl md:text-5xl tracking-[0.2em] uppercase mb-4">
                    The Royal Invitation
                  </h2>
                  <div className="w-32 h-[1px] bg-[#8b4513]/30 mb-8"></div>
                  <h3 className="text-[#8b4513] font-serif text-xl md:text-2xl italic tracking-wider mb-12">
                    A sacred union awaits your presence...
                  </h3>

                  <button
                    onClick={() => setIsOpened(true)}
                    className="relative px-10 py-4 bg-[#8b4513] text-[#fbf3d5] font-serif tracking-[0.3em] uppercase rounded-sm overflow-hidden group"
                  >
                    <span className="relative z-10">Unroll the Day</span>
                    <div className="absolute inset-0 bg-yellow-600 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500"></div>
                  </button>
                </motion.div>

                {/* Scroll Bottom Texture Shadow */}
                <div className="absolute bottom-0 w-full h-12 bg-gradient-to-t from-black/10 transition-to-transparent"></div>
              </motion.div>

              {/* Bottom Handle */}
              <motion.div
                initial={{ width: 0, y: 0 }}
                animate={{ width: '80vw', y: 0 }}
                transition={{ duration: 1.5, ease: "circOut" }}
                className="h-6 bg-gradient-to-r from-[#8b4513] via-yellow-600 to-[#8b4513] rounded-full flex items-center justify-between px-2 relative z-20 shadow-2xl"
              >
                <div className="w-8 h-8 rounded-full bg-yellow-500 border-2 border-yellow-800 -ml-4"></div>
                <div className="w-8 h-8 rounded-full bg-yellow-500 border-2 border-yellow-800 -mr-4"></div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="relative w-full overflow-hidden bg-[#0a0f1b]">
        {/* Tall Background Image Layer with Parallax */}
        <motion.div
          className="absolute top-0 left-0 w-full z-0 pointer-events-none"
          style={{
            height: '5741px',
            y: useTransform(scrollY, [0, 5741], [0, -400])
          }}
        >
          <img
            src={ASSETS.landingBg}
            alt="Background Texture"
            className="w-full h-full object-cover object-top"
          />
        </motion.div>

        <div className="relative z-10 w-full flex flex-col items-center">
          {/* HERO SECTION WRAPPER - Scales to literally match the Temple background height on ALL devices */}
          <div className="relative w-full" style={{ height: 'max(1550px, 111.8vw)' }}>
            <section className="sticky top-0 w-full h-screen flex flex-col justify-center items-center overflow-hidden">
              {/* Background parallax layer with mouse movement */}
              <motion.div
                className="absolute inset-0 z-0 scale-110"
                style={{
                  x: mousePos.x * -0.5,
                  y: (mousePos.y * -0.5)
                }}
              >
                <div className="absolute inset-0 bg-[#0a0f1b]/20 z-10"></div>
              </motion.div>

              {/* Floating Lanterns Layer with Parallax and Mouse tilt */}
              <motion.div
                className="absolute inset-0 pointer-events-none"
                style={{
                  y: yHeroCandles,
                  x: mousePos.x * 0.8
                }}
              >
                {LANTERNS.map((lantern, i) => (
                  <motion.img
                    key={i}
                    src={ASSETS.lantern}
                    className="absolute opacity-80 drop-shadow-[0_0_15px_rgba(255,200,100,0.6)] object-contain"
                    style={{
                      width: `clamp(40px, ${lantern.size}px, 15vw)`,
                      left: lantern.left,
                      top: lantern.top,
                    }}
                    animate={{
                      y: [0, -15, 0],
                      x: [0, 10, 0],
                      rotate: [0, 5, 0]
                    }}
                    transition={{
                      duration: 4 + Math.random() * 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: lantern.delay
                    }}
                  />
                ))}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  y: yHeroText,
                  x: mousePos.x * 1.2
                }}
                className="flex flex-col items-center z-20 text-center mt-[-10vh]"
              >
                <motion.div
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                >
                  <h1 className="font-serif text-6xl md:text-8xl lg:text-9xl text-yellow-500 tracking-[0.1em] font-medium drop-shadow-[0_10px_30px_rgba(0,0,0,0.5)] uppercase text-shimmer">
                    Tamil
                  </h1>
                  <div className="flex items-center justify-center gap-6 my-6">
                    <div className="h-[1px] w-12 bg-yellow-500/40"></div>
                    <p className="font-serif text-2xl md:text-4xl text-yellow-200 italic lowercase opacity-80">
                      weds
                    </p>
                    <div className="h-[1px] w-12 bg-yellow-500/40"></div>
                  </div>
                  <h1 className="font-serif text-6xl md:text-8xl lg:text-9xl text-yellow-500 tracking-[0.1em] font-medium drop-shadow-[0_10px_30px_rgba(0,0,0,0.5)] uppercase text-shimmer">
                    Sowmi
                  </h1>
                </motion.div>
              </motion.div>

              {/* Decorative Scroll indicator */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.5, duration: 1 }}
                className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
              >
                <span className="text-yellow-500/40 font-sans text-[10px] tracking-[0.3em] uppercase">Scroll to explore</span>
                <motion.div
                  animate={{ y: [0, 8, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-[1px] h-12 bg-gradient-to-b from-yellow-500/60 to-transparent"
                />
              </motion.div>
            </section>
          </div>

          {/* GREEN PANEL - EXACT MATCH FOR SCREENSHOT WITH STAGGERED ANIMATIONS */}
          <section className="relative w-full z-10 flex flex-col items-center px-4 font-serif text-[#f2e7c3] text-center" style={{ paddingTop: '679px' }}>

            {/* 1. Sree Seetharama... */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 1 }}
              className="text-[10px] md:text-[12px] tracking-[0.4em] font-sans uppercase mb-6 text-yellow-500/80"
            >
              Shree Ganeshay Namah
            </motion.p>

            {/* 2. God Image with Thoranam */}
            <div className="relative w-full flex flex-col items-center justify-center pt-24 mb-16">
              <Thoranam />
              <motion.img
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 1.5, delay: 0.2 }}
                src={ASSETS.godIcon}
                alt="Ganesha"
                className="w-[12rem] relative z-20 drop-shadow-[0_0_20px_rgba(255,200,100,0.4)]"
              />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 scale-150">
                <Kolam />
              </div>
            </div>

            {/* 3. Heavenly Blessings */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 1 }}
              className="italic tracking-[0.2em] mb-4 opacity-80 text-sm md:text-base font-serif"
            >
              With the divine blessings of our ancestors
            </motion.p>

            {/* 4. Parent Names 1 */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 1, delay: 0.1 }}
              className="font-medium tracking-wide mb-6 text-sm md:text-base lg:text-lg"
            >
              Smt. Parvathi Ammal & Shri Krishnan Iyer
            </motion.p>

            {/* 5. Divider Line */}
            <motion.div
              initial={{ opacity: 0, width: 0 }}
              whileInView={{ opacity: 0.4, width: "64px" }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="h-[1px] bg-[#f2e7c3] my-2"
            ></motion.div>

            {/* 6. Parent Names 2 */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 1 }}
              className="font-medium tracking-wide mt-6 mb-16 text-sm md:text-base lg:text-lg"
            >
              Smt. Kamakshi Ammal & Shri Srinivasan Iyer
            </motion.p>

            {/* 7. INVITE text */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 1 }}
              className="relative py-12"
            >
              <h2 className="text-4xl md:text-6xl tracking-[0.3em] font-medium font-serif uppercase">
                Wedding Invitation
              </h2>
              <div className="absolute -inset-4 border border-yellow-500/10 rounded-full scale-110 pointer-events-none"></div>
            </motion.div>

            {/* 8. To join us... */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 1 }}
              className="text-base md:text-xl tracking-[0.1em] mb-16 px-4 font-serif italic max-w-2xl text-center leading-relaxed"
            >
              We cordially invite you to join us as our children embark on a new journey together. Your presence is the most cherished gift of all.
            </motion.p>

            {/* 9. Tamil& Sowmi Container */}
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 1.2 }}
              className="flex flex-col items-center mb-10"
            >
              <h1 className="text-6xl md:text-7xl lg:text-8xl text-[#f5df9a] drop-shadow-md tracking-wide mb-2">Tamil</h1>
              <span className="text-4xl md:text-5xl text-[#f5df9a] italic mb-2">&</span>
              <h1 className="text-6xl md:text-7xl lg:text-8xl text-[#f5df9a] drop-shadow-md tracking-wide">Sowmi</h1>
            </motion.div>

            {/* 10. Daughter of */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 1 }}
              className="text-sm md:text-base mb-2 opacity-90"
            >
              Daughter of
            </motion.p>

            {/* 11. Final Parent Names */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 1, delay: 0.1 }}
              className="font-medium tracking-wide mb-20 text-sm md:text-base lg:text-lg"
            >
              Smt. Parvathi & Shri K. Ramaswamy
            </motion.p>

            {/* 12. On the following events */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 1 }}
              className="text-sm md:text-base mb-16 opacity-90"
            >
              On the following events
            </motion.p>
          </section>

          {/* EVENTS GRID */}
          <section className="relative w-full z-10 flex flex-col items-center mb-48 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-20 w-full"
            >
              <h2 className="font-serif text-[#f2e7c3] text-4xl md:text-5xl uppercase tracking-[0.3em] font-light">Events</h2>
              <div className="h-[1px] w-32 bg-yellow-500/30 mx-auto mt-6"></div>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-x-16 md:gap-y-20 w-full max-w-6xl px-6">
              {[
                { title: "MEHENDI", date: "Friday, March 9th 2026", loc1: "Rambagh, Jaipur", loc2: "6pm Onwards" },
                { title: "HALDI", date: "Friday, March 10th 2026", loc1: "Rambagh, Jaipur", loc2: "6pm Onwards" },
                { title: "SANGEET", date: "Friday, March 10th 2026", loc1: "Rambagh, Jaipur", loc2: "6pm Onwards" },
                { title: "ENGAGEMENT", date: "Friday, March 11th 2026", loc1: "Rambagh, Jaipur", loc2: "6pm Onwards" },
                { title: "MUHURTHAM", date: "Friday, March 12th 2026", loc1: "Rambagh, Jaipur", loc2: "6pm Onwards" },
                { title: "RECEPTION", date: "Friday, March 17th 2026", loc1: "Rambagh, Jaipur", loc2: "6pm Onwards" }
              ].map((event, idx) => (
                <motion.div
                  key={event.title}
                  initial={{ opacity: 0, y: 100, rotateX: 45 }}
                  whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 1.2, delay: (idx % 3) * 0.2, ease: [0.16, 1, 0.3, 1] }}
                  className="group relative w-full perspective-1000"
                >
                  <div className="relative w-full flex flex-col items-center justify-center p-8 sm:p-10 transition-all duration-700 ease-out preserve-3d group-hover:scale-[1.03] group-hover:-translate-y-4" style={{ aspectRatio: '4/5' }}>

                    {/* Premium Card Background */}
                    <div className="absolute inset-0 bg-[#358579]/5 backdrop-blur-[2px] border border-yellow-500/20 rounded-2xl group-hover:bg-[#358579]/10 group-hover:border-yellow-500/40 transition-all duration-500"></div>

                    <img src={ASSETS.frame} alt="Oval Frame" className="absolute inset-0 w-full h-full object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.4)] pointer-events-none opacity-90 group-hover:opacity-100 transition-opacity" />

                    {/* Corner Flowers with floating animation */}
                    <motion.img
                      animate={{ y: [0, -5, 0], rotate: [0, 5, 0] }}
                      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                      src={ASSETS.frameFlower} alt="Flowers" className="absolute -top-[10%] -right-[12%] w-[65%] object-contain drop-shadow-2xl pointer-events-none z-20 group-hover:scale-110 transition-transform duration-500"
                    />
                    <motion.img
                      animate={{ y: [0, 5, 0], rotate: [180, 185, 180] }}
                      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                      src={ASSETS.frameFlower} alt="Flowers" className="absolute -bottom-[10%] -left-[12%] w-[65%] object-contain drop-shadow-2xl pointer-events-none z-20 group-hover:scale-110 transition-transform duration-500"
                    />

                    <div className="absolute inset-0 z-10 flex flex-col items-center justify-center p-10">
                      <h3 className="font-serif text-[#358579] text-3xl md:text-4xl tracking-[0.15em] uppercase font-light mb-8 group-hover:scale-110 transition-transform duration-500">
                        {event.title}
                      </h3>

                      <div className="flex flex-col items-center text-center text-[#358579]/90 font-serif font-light leading-relaxed space-y-2">
                        <p className="text-[15px] md:text-lg tracking-wide font-medium">{event.date}</p>
                        <p className="text-sm md:text-base tracking-wide opacity-80">{event.loc1}</p>
                        <p className="text-sm md:text-base tracking-wide opacity-80 mb-6">{event.loc2}</p>

                        <a
                          href="https://share.google/xbCtrxVL6cO7AGYJq"
                          target="_blank"
                          rel="noreferrer"
                          className="relative inline-block mt-4 text-[13px] tracking-[0.2em] font-sans uppercase text-[#358579] group-hover:text-[#1a4a44] transition-colors"
                        >
                          <span className="relative z-10">See the route</span>
                          <motion.div className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#358579] group-hover:w-full transition-all duration-500"></motion.div>
                        </a>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* ROUTE SECTION - (Now simplified since we have the floating ribbon scroll) */}
          <section className="relative w-full z-10 flex flex-col items-center mb-32 text-[#f2e7c3] text-center px-6">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <h2 className="font-serif text-3xl md:text-5xl uppercase tracking-[0.25em] mb-4 leading-tight">
                Celebrate With Us
              </h2>
              <div className="h-[1px] w-24 bg-yellow-500/20 mx-auto mb-10"></div>
            </motion.div>
            
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="font-sans text-[10px] tracking-[0.4em] uppercase opacity-40 max-w-xs"
            >
              Use the golden scroll on the right to navigate to the venue
            </motion.p>
          </section>

          {/* PINK BRIDE AND GROOM SECTION */}
          <section className="relative w-full z-10 flex flex-col items-center pt-24 md:pt-32 pb-0">
            {/* Thoranam Garland */}
            <Thoranam />

            {/* Pink Pattern Background Layer with Parallax */}
            <motion.div
              className="absolute inset-0 w-full h-[120%] z-0 pointer-events-none"
              style={{ y: useTransform(scrollY, [3000, 6000], [0, -100]) }}
            >
              <img src={ASSETS.pinkBg} alt="Pink Texture" className="w-full h-full object-cover object-top scale-125 saturate-[0.8]" />
              <div className="absolute inset-0 bg-pink-100/5 pointer-events-none"></div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.2 }}
              className="relative z-10 flex flex-col items-center text-center px-6 mt-16 md:mt-24 mb-32"
            >
              <h3 className="font-serif text-[#fef1f8] text-[12px] md:text-base tracking-[0.3em] uppercase mb-6 font-medium">
                The Eternal Bond
              </h3>
              <h2 className="font-serif text-[#fef1f8] text-5xl md:text-6xl lg:text-7xl tracking-[0.1em] uppercase font-light drop-shadow-md leading-tight mb-16">
                Our Journey<br /><span className="italic lowercase text-pink-200/60">begins</span>
              </h2>

              <p className="font-sans text-[#fef1f8] text-[12px] md:text-base max-w-[95%] md:max-w-3xl leading-[2] tracking-widest font-light mb-24 opacity-95 mx-auto bg-black/5 p-8 rounded-2xl backdrop-blur-sm border border-white/5">
                Two souls, one destiny. We are incredibly grateful to our families for their
                unwavering love and to all of you for being part of our story. As we step into
                this sacred union, we seek your presence and prayers to make our celebration
                complete and our path ahead blessed.
              </p>

              {/* Photo Frame Container */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1.2, delay: 0.2 }}
                className="relative w-[85%] sm:w-[50%] md:w-[40%] max-w-[500px]"
              >
                <img src={ASSETS.bgGroomFrame} alt="Ornate Frame" className="relative z-20 w-full h-auto drop-shadow-2xl" />

                {/* Decorative Deepams around the frame */}
                <motion.div
                  animate={{ opacity: [0.4, 0.8, 0.4] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute -left-4 top-[40%] text-2xl z-30 drop-shadow-lg"
                >🪔</motion.div>
                <motion.div
                  animate={{ opacity: [0.4, 0.8, 0.4] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                  className="absolute -right-4 top-[40%] text-2xl z-30 drop-shadow-lg"
                >🪔</motion.div>

                {/* Photo container fitting the mirror */}
                <div
                  className="absolute z-10 overflow-hidden bg-[#2a1a1f] flex items-center justify-center"
                  style={{
                    top: '18%',
                    bottom: '8%',
                    left: '17%',
                    right: '17%',
                    borderRadius: '50% 50% 12% 12% / 30% 30% 6% 6%'
                  }}
                >
                  <div className="flex flex-col items-center gap-2 opacity-30">
                    <span className="text-white font-serif italic tracking-[0.2em] text-lg">Tamil & Sowmi</span>
                    <span className="text-white/50 font-sans tracking-[0.2em] text-[10px] uppercase">Cherished Moments</span>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </section>

          {/* FOOTER SECTION & GRAND CELEBRATION */}
          <footer
            className="relative w-full z-20 flex flex-col items-center justify-end overflow-hidden -mt-20"
            style={{ height: '110vh' }}
            onMouseEnter={() => {
              const count = 200;
              const defaults = { origin: { y: 0.7 } };
              function fire(particleRatio, opts) {
                confetti({ ...defaults, ...opts, particleCount: Math.floor(count * particleRatio) });
              }
              fire(0.25, { spread: 26, startVelocity: 55 });
              fire(0.2, { spread: 60 });
              fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
              fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
              fire(0.1, { spread: 120, startVelocity: 45 });
            }}
          >
            {/* Footer Background Image with Parallax */}
            <div className="absolute inset-0 z-0">
              <motion.img
                initial={{ scale: 1.15, y: "10%" }}
                whileInView={{ scale: 1, y: "0%" }}
                viewport={{ margin: "200px" }}
                transition={{ duration: 2.5, ease: "circOut" }}
                src={ASSETS.footerTemple}
                alt="Footer Background"
                className="w-full h-full object-cover object-bottom"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f1b] via-[rgba(10,15,27,0.2)] to-transparent"></div>
              <div className="absolute inset-0 bg-black/10 mix-blend-multiply"></div>
            </div>

            <div className="relative z-10 flex flex-col items-center text-center pb-12 md:pb-20 px-6 max-w-4xl">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                className="mb-6"
              >
                <h2 className="text-shimmer font-serif text-3xl md:text-5xl uppercase tracking-[0.4em] mb-4">
                  Grand Celebration
                </h2>
                <div className="h-[1px] w-48 bg-yellow-500/20 mx-auto mt-4"></div>
              </motion.div>

              <div id="footer-reveal-container" className="mb-10 px-4">
                <p className="font-serif text-[#f2e7c3] text-lg md:text-2xl italic tracking-wide mb-6 reveal-line opacity-0 translate-y-12">
                  "As the sun sets and the stars light up our path,
                  we invite you to grace the occasion with your presence and blessings."
                </p>
                <p className="font-serif text-[#f2e7c3]/80 text-sm md:text-lg tracking-widest uppercase mb-12 reveal-line opacity-0 translate-y-12">
                  Join us for Dinner & Festivities thereafter.
                </p>
              </div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, delay: 0.8 }}
                className="flex flex-col items-center"
              >
                <h2 className="font-serif text-yellow-500 text-6xl md:text-8xl lg:text-[10rem] tracking-widest uppercase drop-shadow-[0_15px_30px_rgba(0,0,0,0.6)] leading-none mb-10">
                  நன்றி
                </h2>
                <div className="h-[1px] w-48 bg-gradient-to-r from-transparent via-yellow-500/40 to-transparent mb-12"></div>
                <div className="flex flex-col items-center gap-3">
                  <p className="text-shimmer text-3xl md:text-4xl lg:text-5xl tracking-[0.15em] uppercase font-serif font-medium">
                    Tamil <span className="lowercase italic font-light text-2xl md:text-3xl mx-2 opacity-60">and</span> Sowmi
                  </p>
                  <p className="text-yellow-500/40 font-sans tracking-[0.6em] text-[10px] md:text-xs uppercase mt-6">
                    #TamilWedsSowmi
                  </p>
                </div>
              </motion.div>
            </div>
          </footer>
        </div>
      </main>
    </>
  );
}
