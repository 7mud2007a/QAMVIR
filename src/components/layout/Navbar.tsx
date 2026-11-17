"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useApp } from "@/context/AppContext";
import { BrandLogo } from "@/components/ui/BrandLogo";
import { ShimmerButton } from "@/components/ui/ShimmerButton";
import { Globe, ArrowUpRight } from "lucide-react";

type GsapTimeline = {
  set(target: Element | null, vars: Record<string, unknown>): GsapTimeline;
  to(
    target: Element | NodeListOf<Element> | null,
    vars: Record<string, unknown>,
    position?: number | string
  ): GsapTimeline;
  play(): GsapTimeline;
  seek(position: number): GsapTimeline;
  kill(): void;
};

type GsapApi = {
  timeline(options: { paused: boolean }): GsapTimeline;
  set(target: Element | null, vars: Record<string, unknown>): void;
};

declare global {
  interface Window {
    gsap?: GsapApi;
  }
}

export const Navbar: React.FC = () => {
  const { language, toggleLanguage, navigation, siteCopy } = useApp();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [menuReady, setMenuReady] = useState(false);
  const [mounted, setMounted] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLElement>(null);
  const openTl = useRef<GsapTimeline | null>(null);
  const closeTl = useRef<GsapTimeline | null>(null);
  const activeRef = useRef(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    let cancelled = false;
    let script = document.querySelector<HTMLScriptElement>('script[data-qamvir-gsap="true"]');
    const initialize = () => {
      if (cancelled || !window.gsap || !menuRef.current) return;
      const gsap = window.gsap;
      const nav = menuRef.current;
      const button = menuButtonRef.current;
      if (!button) return;

      const open = gsap.timeline({ paused: true });
      const close = gsap.timeline({ paused: true });
      const lineIcon = nav.parentElement?.querySelector(".qamvir-menu-line");
      const closeIcon = nav.parentElement?.querySelector(".qamvir-menu-close");
      const buttonBg = button.querySelector(".qamvir-menu-bg");
      const items = nav.querySelectorAll("li");

      gsap.set(lineIcon, { opacity: 1, yPercent: 0 });
      gsap.set(closeIcon, { opacity: 0, yPercent: 125 });

      open
        .set(button, { pointerEvents: "none" })
        .to(nav, {
          clipPath: () => {
            const rect = button.getBoundingClientRect();
            const x = rect.left + rect.width / 2;
            const y = rect.top + rect.height / 2;
            return `circle(200% at ${x}px ${y}px)`;
          },
          duration: 1.5,
          ease: "power4.out",
        }, 0)
        .to(items, {
          x: 0,
          opacity: 1,
          pointerEvents: "all",
          duration: 1.25,
          stagger: 0.1,
          ease: "elastic.out(1.15, .95)",
        }, 0)
        .to(closeIcon, {
          opacity: 1,
          yPercent: -125,
          duration: 1,
          ease: "power4.out",
        }, 0)
        .to(lineIcon, {
          opacity: 0,
          yPercent: -125,
          duration: 1,
          ease: "power4.out",
        }, 0)
        .set(button, { pointerEvents: "all" });

      close
        .set(button, { pointerEvents: "none" })
        .to(items, {
          x: language === "ar" ? 200 : -200,
          opacity: 0,
          pointerEvents: "none",
          duration: 1,
          stagger: 0.1,
          ease: "power4.out",
        }, 0)
        .to(nav, {
          clipPath: () => {
            const rect = button.getBoundingClientRect();
            const x = rect.left + rect.width / 2;
            const y = rect.top + rect.height / 2;
            return `circle(0px at ${x}px ${y}px)`;
          },
          duration: 1.2,
          ease: "power4.out",
        }, "-=1")
        .to(buttonBg, {
          scale: 0.9,
          duration: 0.25,
          ease: "elastic.out",
        }, "-=.9")
        .to(buttonBg, {
          scale: 1,
          duration: 0.25,
          ease: "elastic.out",
        }, "-=.5")
        .to(closeIcon, {
          opacity: 0,
          yPercent: 125,
          duration: 1,
          ease: "power4.out",
        }, 0)
        .to(lineIcon, {
          opacity: 1,
          yPercent: 0,
          duration: 1,
          ease: "power4.out",
        }, 0)
        .set(button, { pointerEvents: "all" });

      openTl.current = open;
      closeTl.current = close;
      setMenuReady(true);
    };

    if (window.gsap) {
      initialize();
    } else {
      if (!script) {
        script = document.createElement("script");
        script.src = "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js";
        script.async = true;
        script.dataset.qamvirGsap = "true";
        document.head.appendChild(script);
      }
      script.addEventListener("load", initialize);
    }

    return () => {
      cancelled = true;
      script?.removeEventListener("load", initialize);
      openTl.current?.kill();
      closeTl.current?.kill();
      openTl.current = null;
      closeTl.current = null;
    };
  }, [language, mounted]);

  const toggleMobileMenu = useCallback(() => {
    if (!menuReady || !openTl.current || !closeTl.current) return;
    if (!activeRef.current) {
      const rect = menuButtonRef.current?.getBoundingClientRect();
      if (!rect) return;
      const x = rect.left + rect.width / 2;
      const y = rect.top + rect.height / 2;
      if (menuRef.current) {
        menuRef.current.style.clipPath = `circle(0px at ${x}px ${y}px)`;
      }
      openTl.current.seek(0).play();
      activeRef.current = true;
      setMobileMenuOpen(true);
    } else {
      closeTl.current.seek(0).play();
      activeRef.current = false;
      setMobileMenuOpen(false);
    }
  }, [menuReady]);

  const closeMenu = useCallback(() => {
    if (!activeRef.current || !closeTl.current) return;
    closeTl.current.seek(0).play();
    activeRef.current = false;
    setMobileMenuOpen(false);
  }, []);

  useEffect(() => {
    if (!mobileMenuOpen) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeMenu();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mobileMenuOpen, closeMenu]);

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

  const menuItems = [
    ...visibleNavItems,
    { label: language === "ar" ? "تواصل معي" : "Contact", href: "#contact" },
  ];

  return (
    <>
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

            <button
              ref={menuButtonRef}
              onClick={toggleMobileMenu}
              disabled={!menuReady}
              className="relative z-[102] flex h-10 w-10 shrink-0 items-center justify-center rounded-[20px] border-0 bg-transparent outline-none disabled:cursor-wait"
              aria-label={mobileMenuOpen ? "Close Navigation Menu" : "Open Navigation Menu"}
              aria-expanded={mobileMenuOpen}
              aria-controls="qamvir-mobile-navigation"
            >
              <span className="qamvir-menu-bg absolute inset-0 rounded-[25%] bg-black shadow-[0_8px_25px_rgba(0,0,0,0.4)] dark:bg-white" />
              <span className="sr-only">{mobileMenuOpen ? "Close menu" : "Open menu"}</span>
              <span className="relative z-10 h-5 w-5 overflow-hidden" aria-hidden="true">
                <svg
                  viewBox="0 0 448 512"
                  className="qamvir-menu-line absolute left-1/2 top-1/2 h-1/2 w-1/2 -translate-x-1/2 -translate-y-1/2 fill-white dark:fill-black"
                >
                  <path d="M0 96C0 78.33 14.33 64 32 64H416C433.7 64 448 78.33 448 96C448 113.7 433.7 128 416 128H32C14.33 128 0 113.7 0 96zM0 256C0 238.3 14.33 224 32 224H416C433.7 224 448 238.3 448 256C448 273.7 433.7 288 416 288H32C14.33 288 0 273.7 0 256zM416 448H32C14.33 448 0 433.7 0 416C0 398.3 14.33 384 32 384H416C433.7 384 448 398.3 448 416C448 433.7 433.7 448 416 448z" />
                </svg>
                <svg
                  viewBox="0 0 320 512"
                  className="qamvir-menu-close absolute left-1/2 top-1/2 h-1/2 w-1/2 -translate-x-1/2 -translate-y-1/2 fill-white dark:fill-black"
                >
                  <path d="M310.6 361.4c12.5 12.5 12.5 32.75 0 45.25C304.4 412.9 296.2 416 288 416s-16.38-3.125-22.62-9.375L160 301.3L54.63 406.6C48.38 412.9 40.19 416 32 416S15.63 412.9 9.375 406.6c-12.5-12.5-12.5-32.75 0-45.25l105.4-105.4L9.375 150.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 210.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-105.4 105.4L310.6 361.4z" />
                </svg>
              </span>
            </button>
          </div>
        </div>
      </header>

      {mounted &&
        createPortal(
          <nav
            ref={menuRef}
            id="qamvir-mobile-navigation"
            aria-hidden={!mobileMenuOpen}
            className="fixed inset-0 z-[99] flex h-[100dvh] w-full items-center overflow-hidden bg-black text-white dark:bg-white dark:text-black"
            dir={language === "ar" ? "rtl" : "ltr"}
            style={{ clipPath: "circle(0px at 0px 0px)" }}
          >
            <ul className="m-0 w-full list-none pl-[12vw] pr-5 md:pl-[8vw] max-[480px]:pl-[6vw]">
              {menuItems.map((item) => (
                <li
                  key={item.href}
                  onClick={closeMenu}
                  className="qamvir-menu-item group relative cursor-pointer py-3"
                  style={{ transform: language === "ar" ? "translateX(200px)" : "translateX(-200px)", opacity: 0, pointerEvents: "none" }}
                >
                  <a
                    href={item.href}
                    tabIndex={mobileMenuOpen ? 0 : -1}
                    className="relative inline-block font-bold uppercase tracking-[-0.02em] text-white/35 no-underline transition-all duration-300 group-hover:translate-x-1 group-hover:tracking-[0.02em] group-hover:text-white group-hover:[text-shadow:0_0_20px_rgba(255,255,255,0.4)] dark:text-black/35 dark:group-hover:text-black dark:group-hover:[text-shadow:0_0_20px_rgba(0,0,0,0.35)]"
                    style={{
                      fontFamily: "'Krona One', sans-serif",
                      fontSize: "clamp(1.8rem, 6vw, 4.5rem)",
                    }}
                  >
                    <span className="absolute -left-10 top-1/2 h-2 w-[25px] -translate-y-1/2 rounded-full bg-white opacity-0 transition-opacity duration-300 group-hover:opacity-100 dark:bg-black" />
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>,
          document.body
        )}
    </>
  );
};
