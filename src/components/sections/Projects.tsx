"use client";

import React from "react";
import { motion } from "framer-motion";
import { useApp } from "@/context/AppContext";
import { ArrowUpLeft, CarFront, Armchair, Building2, PlugZap, Home, Zap } from "lucide-react";

const projects = [
  {
    name: "Veltrion Motors",
    descriptionAr: "منصة عصرية وفاخرة لعالم السيارات",
    descriptionEn: "A modern, premium automotive experience",
    url: "https://veltrion-motors.onrender.com/",
    preview: "https://image.thum.io/get/width/1100/noanimate/wait/5/https://veltrion-motors.onrender.com/",
    icon: CarFront,
    categoryAr: "سيارات",
    categoryEn: "AUTOMOTIVE",
  },
  {
    name: "R3 Car",
    descriptionAr: "واجهة عصرية لعروض السيارات",
    descriptionEn: "A modern interface for car listings",
    url: "https://r3-car-a4n2.onrender.com",
    preview: "https://image.thum.io/get/width/1100/noanimate/https://r3-car-a4n2.onrender.com/",
    icon: CarFront,
    categoryAr: "سيارات",
    categoryEn: "AUTOMOTIVE",
  },
  {
    name: "LIVORA",
    descriptionAr: "معرض أثاث بتجربة رقمية راقية",
    descriptionEn: "A premium furniture showroom",
    url: "https://livora-7u3a.onrender.com",
    preview: "https://image.thum.io/get/width/1100/noanimate/https://livora-7u3a.onrender.com/",
    icon: Armchair,
    categoryAr: "أثاث",
    categoryEn: "FURNITURE",
  },
  {
    name: "Titan Motors",
    descriptionAr: "منصة متخصصة بعالم السيارات",
    descriptionEn: "A dedicated automotive platform",
    url: "https://titan-motors.onrender.com",
    preview: "https://image.thum.io/get/width/1100/noanimate/https://titan-motors.onrender.com/",
    icon: CarFront,
    categoryAr: "سيارات",
    categoryEn: "AUTOMOTIVE",
  },
  {
    name: "Zadona",
    descriptionAr: "موقع إلكتروني بهوية عصرية",
    descriptionEn: "A modern branded website",
    url: "https://zadona-syr.onrender.com",
    preview: "https://image.thum.io/get/width/1100/noanimate/https://zadona-syr.onrender.com/",
    icon: Building2,
    categoryAr: "موقع إلكتروني",
    categoryEn: "WEBSITE",
  },
  {
    name: "Alhaytham Electric",
    descriptionAr: "حلول وخدمات كهربائية",
    descriptionEn: "Electrical products and services",
    url: "https://alhaytham-electric-03cl.onrender.com",
    preview: "https://image.thum.io/get/width/1100/noanimate/https://alhaytham-electric-03cl.onrender.com/",
    icon: PlugZap,
    categoryAr: "كهربائيات",
    categoryEn: "ELECTRICAL",
  },
  {
    name: "Pianno Home",
    descriptionAr: "تجربة تسوق للأثاث والمنزل",
    descriptionEn: "A home and furniture experience",
    url: "https://pianno-home.onrender.com",
    preview: "https://image.thum.io/get/width/1100/noanimate/https://pianno-home.onrender.com/",
    icon: Home,
    categoryAr: "منزل وأثاث",
    categoryEn: "HOME",
  },
];

export const ProjectsSection: React.FC = () => {
  const { language } = useApp();
  const isAr = language === "ar";

  return (
    <section id="projects" className="py-16 px-3 sm:px-6 relative overflow-hidden bg-transparent border-t border-neutral-200 dark:border-neutral-900">
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-9">
          <span className="text-[10px] font-mono tracking-widest text-neutral-800 dark:text-neutral-300 uppercase bg-neutral-100 dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-800 px-3 py-1 rounded-full">
            {isAr ? "معرض الأعمال" : "PORTFOLIO"}
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-neutral-950 dark:text-white mt-3 mb-2">
            {isAr ? "أعمالنا" : "Our Projects"}
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400 text-sm sm:text-base">
            {isAr ? "تصفّح بعض المواقع التي صممناها وطوّرناها" : "Explore websites we've designed and built"}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:gap-5">
          {projects.map((project, idx) => {
            const ProjectIcon = project.icon;
            return (
              <motion.a
                key={project.name}
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${isAr ? "زيارة الموقع" : "Visit website"}: ${project.name}`}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: (idx % 2) * 0.06 }}
                className="group min-w-0 block overflow-hidden rounded-xl sm:rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/60 shadow-sm hover:shadow-lg hover:-translate-y-0.5 hover:border-neutral-400 dark:hover:border-neutral-600 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-500"
              >
                <div className="relative overflow-hidden bg-neutral-200 dark:bg-neutral-800">
                  <div className="flex h-6 sm:h-8 items-center gap-1 border-b border-neutral-200 dark:border-neutral-700 bg-neutral-100 dark:bg-neutral-800 px-2 sm:px-3">
                    <span className="h-1.5 w-1.5 rounded-full bg-neutral-400/70" />
                    <span className="h-1.5 w-1.5 rounded-full bg-neutral-400/70" />
                    <span className="h-1.5 w-1.5 rounded-full bg-neutral-400/70" />
                    <span className="ms-1 min-w-0 flex-1 truncate rounded bg-white dark:bg-neutral-900 px-1.5 py-0.5 text-[7px] sm:text-[9px] font-mono text-neutral-500">{project.url.replace("https://", "")}</span>
                  </div>
                  <div className="relative aspect-[16/9] overflow-hidden bg-gradient-to-br from-neutral-300 to-neutral-100 dark:from-neutral-800 dark:to-neutral-950 flex items-center justify-center">
                    <ProjectIcon className="absolute h-9 w-9 sm:h-12 sm:w-12 text-neutral-500/60 dark:text-neutral-500/50" />
                    <img
                      src={project.preview}
                      alt={isAr ? `معاينة لموقع ${project.name}` : `Preview of ${project.name} website`}
                      loading="lazy"
                      onError={(event) => { event.currentTarget.style.display = "none"; }}
                      className="relative z-[1] h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.04]"
                    />
                  </div>
                  <div className="absolute bottom-2 end-2 flex h-7 w-7 translate-y-1 items-center justify-center rounded-full bg-white/95 text-neutral-950 opacity-0 shadow transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 dark:bg-black/90 dark:text-white">
                    <ArrowUpLeft className="h-4 w-4" />
                  </div>
                </div>

                <div className="p-2.5 sm:p-4">
                  <div className="mb-2 flex items-center justify-between gap-1">
                    <span className="truncate rounded-full border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 px-2 py-0.5 text-[7px] sm:text-[9px]] font-mono tracking-wide text-neutral-500 dark:text-neutral-400">
                      {isAr ? project.categoryAr : project.categoryEn}
                    </span>
                    <span className="shrink-0 text-[8px] sm:text-[10px] font-mono text-neutral-400 dark:text-neutral-500">{String(idx + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}</span>
                  </div>
                  <div className="flex min-w-0 items-center gap-2">
                    <div className="flex h-7 w-7 sm:h-9 sm:w-9 shrink-0 items-center justify-center rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800">
                      <ProjectIcon className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-neutral-900 dark:text-white" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="truncate text-xs sm:text-base font-bold text-neutral-950 dark:text-white">{project.name}</h3>
                      <p className="mt-0.5 line-clamp-1 text-[9px] sm:text-xs text-neutral-600 dark:text-neutral-400">{isAr ? project.descriptionAr : project.descriptionEn}</p>
                    </div>
                  </div>
                </div>
              </motion.a>
            );
          })}
        </div>
      </div>
    </section>
  );
};
