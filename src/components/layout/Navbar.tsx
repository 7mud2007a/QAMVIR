"use client";

import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { useApp } from "@/context/AppContext";
import { BrandLogo } from "@/components/ui/BrandLogo";
import { ShimmerButton } from "@/components/ui/ShimmerButton";
import { Globe, ArrowUpRight } from "lucide-react";
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
  const menuItems = [
    ...visibleNavItems,
    { label: language === "ar" ? "تواصل معي" : "Contact", href: "#contact" },
  ];

  const menuVariants = {
    closed: {
      clipPath: `circle(0px at ${menuOrigin.x}px ${menuOrigin.y}px)`,
      transition: { duration: 1.2, ease: [0.76, 0, 0.24, 1] },
    },
    open: {
      clipPath: `circle(200% at ${menuOrigin.x}px ${menuOrigin.y}px)`,
      transition: { duration: 1.5, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const listVariants = {
    closed: {
      transition: { staggerChildren: 0.1, staggerDirection: -1 },
    },
    open: {
      transition: { delayChildren: 0.05, staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    closed: {
      x: language === "ar" ? 200 : -200,
      opacity: 0,
      transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
    },
    open: {
      x: 0,
      opacity: 1,
      transition: { duration: 1.15, ease: [0.34, 1.56, 0.64, 1] },
    },
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-[100] px-4 sm:px-8 py-4 transition-all duration-300">
      <style>{'@import url("https://fonts.googleapis.com/css2?family=Krona+One&display=swap");'}</style>
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

        <div className="flex sm:hidden items-center gap-2">
          <button
            onClick={toggleLanguage}
            className="px-2.5 py-1.5 rounded-xl text-xs font-bold border border-neutral-300 dark:border-neutral-700 bg-neutral-100 dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100"
          >
            {language === "ar" ? "EN" : "عربي"}
          </button>

          <motion.button
            ref={menuButtonRef}
            onClick={toggleMobileMenu}
            className="relative z-[102] flex h-10 w-10 shrink-0 items-center justify-center rounded-[20px] border-0 bg-transparent text-white outline-none"
            aria-label={mobileMenuOpen ? "Close Navigation Menu" : "Open Navigation Menu"}
            aria-expanded={mobileMenuOpen}
            aria-controls="qamvir-mobile-navigation"
          >
            <motion.span
              className="absolute inset-0 rounded-[25%] bg-black shadow-[0_8px_25px_rgba(0,0,0,0.4)] dark:bg-white"
              animate={
                mobileMenuOpen
                  ? { scale: [1, 0.9, 1] }
                  : { scale: 1 }
              }
              transition={{ duration: 0.5, times: [0, 0.5, 1], ease: "easeOut" }}
            />
            <span className="sr-only">{mobileMenuOpen ? "Close menu" : "Open menu"}</span>
            <span className="relative z-10 h-5 w-5 overflow-hidden" aria-hidden="true">
              <motion.svg
                viewBox="0 0 448 512"
                className="absolute left-1/2 top-1/2 h-1/2 w-1/2 -translate-x-1/2 -translate-y-1/2 fill-white dark:fill-black"
                animate={{ y: mobileMenuOpen ? "-125%" : "-50%", opacity: mobileMenuOpen ? 0 : 1 }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              >
                <path d="M0 96C0 78.33 14.33 64 32 64H416C433.7 64 448 78.33 448 96C448 113.7 433.7 128 416 128H32C14.33 128 0 113.7 0 96zM0 256C0 238.3 14.33 224 32 224H416C433.7 224 448 238.3 448 256C448 273.7 433.7 288 416 288H32C14.33 288 0 273.7 0 256zM416 448H32C14.33 448 0 433.7 0 416C0 398.3 14.33 384 32 384H416C433.7 384 448 398.3 448 416C448 433.7 433.7 448 416 448z" />
              </motion.svg>
              <motion.svg
                viewBox="0 0 320 512"
                className="absolute left-1/2 top-1/2 h-1/2 w-1/2 -translate-x-1/2 -translate-y-1/2 fill-white dark:fill-black"
                animate={{ y: mobileMenuOpen ? "-50%" : "125%", opacity: mobileMenuOpen ? 1 : 0 }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              >
                <path d="M310.6 361.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L160 301.3 54.7 406.7c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L114.7 256 9.4 150.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 210.7l105.3-105.4c12.5-12.5 32.8-12.5 45.3 0s12.5 32.8 0 45.3L205.3 256l105.3 105.4z" />
              </motion.svg>
            </span>
          </motion.button>
        </div>
      </div>

      {typeof document !== "undefined" &&
        createPortal(
          <AnimatePresence initial={false}>
            {mobileMenuOpen && (
              <motion.div
                id="qamvir-mobile-navigation"
                className="fixed inset-0 z-[99] flex h-[100dvh] w-full items-center overflow-hidden bg-black text-white dark:bg-white dark:text-black"
                dir={language === "ar" ? "rtl" : "ltr"}
                variants={menuVariants}
                initial="closed"
                animate="open"
                exit="closed"
              >
                <motion.ul
                  className="m-0 w-full list-none px-0 pl-[12vw] pr-5 md:pl-[8vw] max-[480px]:pl-[6vw]"
                  variants={listVariants}
                >
                  {menuItems.map((item) => (
                    <motion.li
                      key={item.href}
                      variants={itemVariants}
                      onClick={closeMenu}
                      className="group relative cursor-pointer py-3"
                    >
                      <a
                        href={item.href}
                        className="relative inline-block font-bold uppercase tracking-[-0.02em] text-white/35 no-underline transition-all duration-300 group-hover:translate-x-1 group-hover:tracking-[0.02em] group-hover:text-white group-hover:[text-shadow:0_0_20px_rgba(255,255,255,0.4)] dark:text-black/35 dark:group-hover:text-black dark:group-hover:[text-shadow:0_0_20px_rgba(0,0,0,0.35)]"
                        style={{
                          fontFamily: "'Krona One', sans-serif",
                          fontSize: "clamp(1.8rem, 6vw, 4.5rem)",
                        }}
                      >
                        <span className="absolute -left-10 top-1/2 h-2 w-[25px] -translate-y-1/2 rounded-full bg-white opacity-0 transition-opacity duration-300 group-hover:opacity-100 dark:bg-black" />
                        {item.label}
                      </a>
                    </motion.li>
                  ))}
                </motion.ul>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </header>
  );
};
