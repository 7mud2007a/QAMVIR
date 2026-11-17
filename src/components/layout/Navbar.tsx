"use client";

import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { useApp } from "@/context/AppContext";
import { BrandLogo } from "@/components/ui/BrandLogo";
import { ShimmerButton } from "@/components/ui/ShimmerButton";
import { Globe, ArrowUpRight, Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

export const Navbar: React.FC = () => {
  const { language, toggleLanguage, navigation, siteCopy } = useApp();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [menuOrigin, setMenuOrigin] = useState({ x: 0, y: 0 });
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  const toggleMobileMenu = () => {
    if (mobileMenuOpen) {
      setMobileMenuOpen(false);
      return;
    }

    // Start the circular reveal from the hamburger's current position.
    const rect = menuButtonRef.current?.getBoundingClientRect();
    if (rect) {
      setMenuOrigin({
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
      });
    }
    setMobileMenuOpen(true);
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!mobileMenuOpen) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMobileMenuOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mobileMenuOpen]);

  const visibleNavItems = navigation
    .filter((item) => item.enabled)
    .map((item, index) => ({
      label:
        index === 2
          ? language === "ar"
            ? "أعمالي"
            : "My Work"
          : language === "ar"
            ? item.label_ar
            : item.label_en,
      href: index === 2 ? "#projects" : item.href,
    }));

  const closeMenu = () => setMobileMenuOpen(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-[100] px-4 sm:px-8 py-4 transition-all duration-300">
      <div
        className={`max-w-7xl mx-auto rounded-2xl transition-all duration-300 px-4 sm:px-6 py-3 flex items-center justify-between border ${
          scrolled
            ? "bg-white/90 dark:bg-black/90 backdrop-blur-md border-neutral-300 dark:border-neutral-800 shadow-md"
            : "bg-white/70 dark:bg-black/70 backdrop-blur-sm border-neutral-200 dark:border-neutral-800"
        }`}
      >
        <a href="#hero" className="flex items-center">
          <BrandLogo />
        </a>

        <nav className="hidden md:flex items-center gap-8">
          {visibleNavItems.map((item, idx) => (
            <a
              key={idx}
              href={item.href}
              className="text-sm font-semibold text-neutral-800 dark:text-neutral-200 hover:text-black dark:hover:text-white transition-colors"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden sm:flex items-center gap-3">
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border border-neutral-300 dark:border-neutral-700 bg-neutral-100 dark:bg-neutral-900 hover:bg-neutral-200 dark:hover:bg-neutral-800 text-neutral-900 dark:text-neutral-100 transition-colors"
            aria-label="Toggle Language"
          >
            <Globe className="w-3.5 h-3.5" />
            <span>{language === "ar" ? "English" : "العربية"}</span>
          </button>

          <a href="#contact">
            <ShimmerButton
              variant="primary"
              className="!py-2 !px-4 !text-xs"
              icon={<ArrowUpRight className="w-3.5 h-3.5" />}
            >
              {language === "ar" ? siteCopy.nav_cta_ar : siteCopy.nav_cta_en}
            </ShimmerButton>
          </a>
        </div>

        {/* Keep the language switch and hamburger exactly in their existing header position. */}
        <div className="flex sm:hidden items-center gap-2">
          <button
            onClick={toggleLanguage}
            className="px-2.5 py-1.5 rounded-xl text-xs font-bold border border-neutral-300 dark:border-neutral-700 bg-neutral-100 dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100"
          >
            {language === "ar" ? "EN" : "عربي"}
          </button>

          <button
            ref={menuButtonRef}
            onClick={toggleMobileMenu}
            className="relative z-[102] flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-neutral-300 dark:border-neutral-700 bg-neutral-100 dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 shadow-sm transition-colors"
            aria-label={mobileMenuOpen ? "Close Navigation Menu" : "Open Navigation Menu"}
            aria-expanded={mobileMenuOpen}
            aria-controls="qamvir-mobile-navigation"
          >
            <span className="sr-only">{mobileMenuOpen ? "Close menu" : "Open menu"}</span>
            <span className="relative flex h-5 w-5 items-center justify-center">
              <Menu
                className={
                  "absolute h-5 w-5 transition-all duration-200 " +
                  (mobileMenuOpen
                    ? "rotate-90 scale-75 opacity-0"
                    : "rotate-0 scale-100 opacity-100")
                }
              />
              <X
                className={
                  "absolute h-5 w-5 transition-all duration-200 " +
                  (mobileMenuOpen
                    ? "rotate-0 scale-100 opacity-100"
                    : "-rotate-90 scale-75 opacity-0")
                }
              />
            </span>
          </button>
        </div>
      </div>

      {typeof document !== "undefined" &&
        createPortal(
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                id="qamvir-mobile-navigation"
                className="sm:hidden fixed inset-0 z-[99] flex min-h-[100svh] flex-col overflow-y-auto bg-white text-neutral-950 dark:bg-black dark:text-white"
                initial={{
                  clipPath: `circle(0px at ${menuOrigin.x}px ${menuOrigin.y}px)`,
                }}
                animate={{
                  clipPath: `circle(150vmax at ${menuOrigin.x}px ${menuOrigin.y}px)`,
                }}
                exit={{
                  clipPath: `circle(0px at ${menuOrigin.x}px ${menuOrigin.y}px)`,
                }}
                transition={{
                  duration: 0.95,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <div className="flex min-h-20 items-center justify-between px-6 pt-4">
                  <span className="text-xs font-semibold uppercase tracking-[0.28em] text-neutral-500 dark:text-neutral-400">
                    {language === "ar" ? "القائمة" : "Menu"}
                  </span>
                  <span className="text-xs font-medium tracking-widest text-neutral-400 dark:text-neutral-500">
                    QAMVIR
                  </span>
                </div>

                <nav className="mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center gap-1 px-8 pb-16">
                  {visibleNavItems.map((item, index) => (
                    <motion.a
                      key={item.href}
                      href={item.href}
                      onClick={closeMenu}
                      initial={{ x: language === "ar" ? 40 : -40, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      exit={{ x: language === "ar" ? 40 : -40, opacity: 0 }}
                      transition={{
                        duration: 0.65,
                        delay: 0.22 + index * 0.085,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                      className="block rounded-xl px-3 py-4 text-[clamp(1.8rem,6vw,4.5rem)] font-bold text-neutral-950 transition-colors hover:bg-neutral-100 dark:text-white dark:hover:bg-neutral-900"
                    >
                      {item.label}
                    </motion.a>
                  ))}

                  <motion.a
                    href="#contact"
                    onClick={closeMenu}
                    initial={{ y: 24, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 24, opacity: 0 }}
                    transition={{ duration: 0.55, delay: 0.62, ease: "easeOut" }}
                    className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-black px-5 py-4 text-sm font-bold text-white dark:bg-white dark:text-black"
                  >
                    <span>{language === "ar" ? "تواصل معي" : "Contact Me"}</span>
                    <ArrowUpRight className="h-4 w-4" />
                  </motion.a>
                </nav>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </header>
  );
};
