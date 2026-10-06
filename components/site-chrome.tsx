"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { navigationMenus } from "@/lib/navigation";
import { bookUrl, contactUrl } from "@/lib/tour";
import { Icon } from "./icons";

const navigation = [["Destinations", "destinations"], ["Tours", "tours"], ["Stories", "articles"], ["Transport", "transport/land"], ["Contact", "contact"]] as const;
const languages = [["en", "English"], ["fr", "Français"], ["id", "Bahasa Indonesia"], ["de", "Deutsch"], ["es", "Español"], ["it", "Italiano"], ["ru", "Русский"], ["zh-CN", "简体中文"], ["zh-TW", "繁體中文"], ["nl", "Nederlands"], ["pt", "Português"], ["ja", "日本語"], ["ko", "한국어"], ["ar", "العربية"]] as const;

export function SiteHeader({ hidden }: { hidden: boolean }) {
  const [panel, setPanel] = useState<"menu" | "languages" | keyof typeof navigationMenus | null>(null);
  const [region, setRegion] = useState<number | null>(null);
  const closeMenuRef = useRef<HTMLButtonElement>(null);
  const menu = panel === "destinations" || panel === "articles" || panel === "tours" ? navigationMenus[panel] : null;
  const selectedPanel = menu?.panels[region === null ? 0 : region + 1];
  const toggleMenu = (name: "menu" | "languages") => setPanel(panel === name ? null : name);

  useEffect(() => {
    const close = (event: KeyboardEvent) => { if (event.key === "Escape") setPanel(null); };
    window.addEventListener("keydown", close);
    if (panel !== "menu") return () => window.removeEventListener("keydown", close);
    const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeMenuRef.current?.focus();
    return () => { document.body.style.overflow = previousOverflow; previousFocus?.focus({ preventScroll: true }); window.removeEventListener("keydown", close); };
  }, [panel]);

  return <>
    <header onMouseLeave={() => { if (menu) { setPanel(null); setRegion(null); } }} className={`fixed inset-x-0 top-0 z-40 border-b border-ink/10 bg-paper text-ink transition-[transform,opacity] duration-300 ${hidden ? "pointer-events-none -translate-y-full opacity-0" : "opacity-100"}`}>
      <nav aria-label="Primary" className="mx-auto flex h-[60px] max-w-[1400px] items-center gap-8 px-5 md:h-[72px] md:px-10">
        <Link href="/" aria-label="sulawesi.com home" className="shrink-0"><span className="relative inline-block -rotate-2 select-none font-hand font-medium text-[20px] leading-[.9] tracking-[.005em] text-ink [padding:0.05em_0.18em_0.1em_0.05em] md:text-[28px]">sulawesi.com<svg aria-hidden="true" viewBox="0 0 200 8" preserveAspectRatio="none" className="absolute -bottom-1.5 left-0 h-2 w-[94%]"><path d="M2 5 Q50 1 100 4 T198 5" stroke="var(--color-coral)" strokeWidth="2" strokeLinecap="round" fill="none" /></svg></span></Link>
        <ul className="hidden items-center gap-[30px] lg:flex">{navigation.map(([name, path]) => <li key={name}><a href={`https://sulawesi.com/en/${path}`} aria-expanded={path in navigationMenus ? panel === path : undefined} onMouseEnter={() => { if (path in navigationMenus) { setPanel(path as keyof typeof navigationMenus); setRegion(null); } else { setPanel(null); setRegion(null); } }} onFocus={() => { if (path in navigationMenus) { setPanel(path as keyof typeof navigationMenus); setRegion(null); } }} className="relative block py-1 text-[15px] font-bold tracking-[.01em] text-ink-2 transition-opacity hover:opacity-60">{name}{panel === path && <span aria-hidden="true" className="absolute inset-x-0 -bottom-0.5 h-[2px] bg-coral" />}</a></li>)}</ul>
        <div className="ms-auto flex items-center gap-1.5 md:gap-2.5">
          <button type="button" aria-label="Search destinations" className="hidden h-9 w-9 items-center justify-center rounded-full transition-colors md:flex hover:bg-ink/8"><Icon name="search" className="h-5 w-5" /></button>
          <div className="relative hidden md:block"><button type="button" onClick={() => toggleMenu("languages")} aria-expanded={panel === "languages"} aria-haspopup="menu" className="flex h-9 items-center gap-1 rounded-full px-2.5 text-[14px] font-bold tracking-[.04em] transition-colors hover:bg-ink/8">EN<Icon name="chevron" className="h-4 w-4" /></button>{panel === "languages" && <div role="menu" className="absolute end-0 top-10 z-[70] max-h-[70vh] w-48 overflow-y-auto rounded-lg border border-card-line bg-paper-2 p-2 shadow-sheet">{languages.map(([code, name]) => <a key={code} role="menuitem" href={`https://sulawesi.com/${code}/703qix0x6`} className="block rounded px-3 py-2 text-[13px] hover:bg-paper-warm">{name}</a>)}</div>}</div>
          <a href={contactUrl} target="_blank" rel="noreferrer" className="hidden h-10 items-center rounded-full bg-coral px-5 text-[14px] font-bold text-paper transition-colors hover:bg-coral-deep lg:inline-flex">WhatsApp us</a>
          <button type="button" onClick={() => toggleMenu("menu")} aria-label="Open menu" aria-expanded={panel === "menu"} className="flex h-10 w-10 items-center justify-center rounded-full transition-colors lg:hidden hover:bg-ink/8"><Icon name="menu" className="h-6 w-6" /></button>
        </div>
      </nav>
      <div className={`hidden overflow-hidden border-b border-ink/10 bg-paper text-ink transition-[max-height,opacity] duration-200 motion-reduce:transition-none lg:block ${menu ? "max-h-[760px] opacity-100" : "pointer-events-none max-h-0 opacity-0"}`}>
        {menu && selectedPanel && <div className="mx-auto flex max-w-[1400px] gap-10 px-5 py-9 md:px-10">
          <aside className="w-[240px] shrink-0"><a href={`https://sulawesi.com${menu.all.path}`} className="block px-4 text-[14px] font-semibold text-ink transition-colors hover:text-coral">{menu.all.label}</a><ul className="mt-5 flex flex-col gap-1">{menu.labels.map((label, index) => <li key={label}><button type="button" aria-pressed={region === index} onMouseEnter={() => setRegion(index)} onFocus={() => setRegion(index)} onClick={() => setRegion(index)} className={`flex w-full items-center justify-between gap-3 px-4 py-2.5 text-start text-[15px] transition-colors hover:text-coral ${region === index ? "bg-ink/5 font-semibold text-coral" : "text-ink-2"}`}>{label}<Icon name="arrow" className="h-4 w-4" /></button></li>)}</ul></aside>
          <div className="min-w-0 flex-1">{region === null ? <div className="grid gap-8 lg:grid-cols-3">{selectedPanel.features.map((feature) => <NavigationFeature key={feature.path} feature={feature} compact />)}</div> : <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_300px]"><ul className="grid content-start gap-x-10 gap-y-2.5 sm:grid-cols-2">{selectedPanel.links.map((item) => <li key={item.path}><a href={`https://sulawesi.com${item.path}`} className="block text-[15px] leading-snug text-ink-2 transition-colors hover:text-coral">{item.label}</a></li>)}</ul>{selectedPanel.features.map((feature) => <NavigationFeature key={feature.path} feature={feature} />)}</div>}</div>
        </div>}
      </div>
    </header>
    {(menu || panel === "languages") && <button type="button" aria-label="Close navigation panel" tabIndex={-1} onClick={() => { setPanel(null); setRegion(null); }} className="fixed inset-0 z-30 cursor-default bg-ink/25" />}
    {panel === "menu" && <div role="dialog" aria-modal="true" aria-label="Navigation menu" onKeyDown={(event) => {
      if (event.key !== "Tab") return;
      const controls = event.currentTarget.querySelectorAll<HTMLElement>("a[href], button:not([disabled])");
      const first = controls[0];
      const last = controls[controls.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    }} className="fixed inset-0 z-50 flex flex-col bg-ink px-5 py-6 text-paper lg:hidden">
      <div className="flex items-center"><Link href="/" aria-label="sulawesi.com home" className="relative inline-block -rotate-2 select-none font-hand text-[24px] font-medium leading-[.9] tracking-[.005em] text-paper [padding:0.05em_0.18em_0.1em_0.05em] md:text-[28px]">sulawesi.com<svg aria-hidden="true" viewBox="0 0 200 8" preserveAspectRatio="none" className="absolute -bottom-1.5 left-0 h-2 w-[94%]"><path d="M2 5 Q50 1 100 4 T198 5" stroke="var(--color-coral)" strokeWidth="2" strokeLinecap="round" fill="none" /></svg></Link><button ref={closeMenuRef} type="button" onClick={() => setPanel(null)} aria-label="Close menu" className="ms-auto flex h-11 w-11 items-center justify-center rounded-full transition-colors hover:bg-paper/15"><Icon name="close" className="h-6 w-6" /></button></div>
      <ul className="mt-10 flex flex-col gap-1">{navigation.map(([name, path]) => <li key={name}><a href={`https://sulawesi.com/en/${path}`} className="block py-3 font-display text-[28px] font-medium tracking-[-.01em]">{name}</a></li>)}</ul>
      <a href={contactUrl} target="_blank" rel="noreferrer" className="mt-8 flex h-14 items-center justify-center rounded-full bg-coral text-[17px] font-semibold text-paper">WhatsApp us</a><p className="mt-2 text-center text-[13px] opacity-70">We reply 24/7</p>
      <div className="hide-scrollbar mt-auto flex items-center gap-2 overflow-x-auto pt-8">{languages.map(([code, name]) => <a key={code} aria-label={`Switch language to ${name}`} href={code === "en" ? "/en/703qix0x6" : `https://sulawesi.com/${code}/703qix0x6`} className={`shrink-0 rounded-full px-4 py-2 font-mono text-[13px] tracking-[.08em] ${code === "en" ? "bg-paper/15 text-paper" : "text-paper/60"}`}>{code.toUpperCase()}</a>)}</div>
    </div>}
  </>;
}

function NavigationFeature({ feature, compact = false }: { feature: { title: string; path: string; image: string; description: string }; compact?: boolean }) {
  return <a href={`https://sulawesi.com${feature.path}`} className="group/feat block"><span className="relative block aspect-[4/3] w-full overflow-hidden bg-ink/10"><Image src={feature.image} alt="" fill unoptimized sizes="(max-width: 1023px) 100vw, 300px" className="object-cover transition-transform duration-700 group-hover/feat:scale-[1.05]" /></span><span className="mt-4 block text-[16px] font-semibold uppercase tracking-[.04em] transition-colors group-hover/feat:text-coral">{feature.title}</span><span className={`mt-2 block text-[13.5px] leading-relaxed text-mute ${compact ? "line-clamp-2" : "line-clamp-3"}`}>{feature.description}</span><span className="mt-3 flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[.08em] text-coral">Read more<Icon name="arrow" className="h-3.5 w-3.5 transition-transform duration-300 group-hover/feat:translate-x-1.5" /></span></a>;
}

export function SiteFooter() {
  const sections = [
    { heading: "Explore", entries: [["Destinations", "/en/destinations"], ["Tours", "/en/tours"], ["Transport", "/en/transport"], ["Stories", "/en/articles"]] },
    { heading: "Plan", entries: [["Start quiz & get free itinerary", "/en/quiz"], ["Contact", "/en/contact"]] },
    { heading: "Investment", entries: [["All opportunities", "/en/investment"], ["Islands", "/en/investment/islands"], ["Land", "/en/investment/land"], ["Resorts", "/en/investment/resorts"]] },
  ];
  return <>
    <section className="relative overflow-hidden bg-sea-deep text-paper"><Image src="/images/cta-waves.svg" alt="" aria-hidden="true" fill unoptimized sizes="100vw" className="pointer-events-none absolute h-full w-full select-none object-fill" /><div className="relative mx-auto max-w-[1100px] px-5 py-16 text-center md:px-10 md:py-20"><h2 className="font-display text-[30px] font-bold leading-[1.1] tracking-[-.01em] md:text-[44px]">SO, READY TO START?</h2><a href={bookUrl} target="_blank" rel="noreferrer" className="mt-8 inline-flex h-14 items-center bg-ink px-9 text-[14px] font-semibold uppercase tracking-[.1em] text-paper transition-colors hover:bg-coral md:text-[15px]">WhatsApp us</a></div></section>
    <footer className="relative overflow-hidden border-t border-paper/10 bg-night text-paper"><Image src="/images/footer-map.svg" alt="" aria-hidden="true" width={620} height={620} unoptimized className="pointer-events-none absolute right-[-96px] bottom-[-150px] h-[440px] w-auto max-w-none select-none md:right-[-40px] md:h-[620px]" /><div className="relative z-10 mx-auto max-w-[1280px] px-5 pt-16 pb-24 md:px-10 md:pt-20 md:pb-14"><div className="grid gap-x-8 gap-y-12 md:grid-cols-2 lg:grid-cols-[minmax(0,1.15fr)_repeat(4,minmax(0,.55fr))] lg:gap-x-8"><div className="md:col-span-2 lg:col-span-1"><Link href="/" className="relative inline-block -rotate-2 select-none font-hand font-medium text-[24px] leading-[.9] tracking-[.005em] text-paper md:text-[28px]">sulawesi.com<svg aria-hidden="true" viewBox="0 0 200 8" preserveAspectRatio="none" className="absolute -bottom-1.5 left-0 h-2 w-[94%]"><path d="M2 5 Q50 1 100 4 T198 5" stroke="var(--color-coral)" strokeWidth="2" strokeLinecap="round" fill="none" /></svg></Link><p className="mt-6 max-w-[24ch] font-display text-[20px] font-medium leading-[1.25] tracking-[-.01em] text-paper md:text-[22px]">Field notes and curated journeys for the island of Sulawesi.</p><span aria-hidden="true" className="mt-7 block h-[3px] w-12 bg-coral" /></div>{sections.map((section) => <nav key={section.heading} aria-label={section.heading}><p className="font-mono text-[10px] uppercase tracking-[.22em] text-paper/60">{section.heading}</p><ul className="mt-5 space-y-3">{section.entries.map(([name, href]) => <li key={name}><a href={`https://sulawesi.com${href}`} className="group/link inline-flex text-[15px] tracking-tight text-paper/85 transition-colors hover:text-paper"><span className="relative inline-block">{name}<span aria-hidden="true" className="absolute -bottom-[3px] start-0 h-px w-0 bg-coral transition-[width] duration-300 group-hover/link:w-full" /></span></a></li>)}</ul></nav>)}<div><p className="font-mono text-[10px] uppercase tracking-[.22em] text-paper/60">Reach us</p><ul className="mt-5 space-y-3"><li><a href={contactUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-[15px] tracking-tight text-paper/85 hover:text-paper"><Icon name="whatsapp" className="h-[17px] w-[17px] shrink-0 text-paper/50" />WhatsApp us</a></li><li><a href="mailto:welcome@sulawesi.com" className="inline-flex items-center gap-2 text-[15px] tracking-tight text-paper/85 hover:text-paper"><Icon name="mail" className="h-[17px] w-[17px] shrink-0 text-paper/50" />welcome@sulawesi.com</a></li></ul><dl className="mt-6 space-y-2.5 border-t border-paper/10 pt-5"><div className="flex items-baseline justify-between gap-3"><dt className="font-mono text-[10px] uppercase tracking-[.16em] text-paper/60">Hours</dt><dd className="text-[13.5px] tracking-tight text-paper/75">24/7</dd></div><div className="flex items-baseline justify-between gap-3"><dt className="font-mono text-[10px] uppercase tracking-[.16em] text-paper/60">Languages</dt><dd className="text-[13.5px] tracking-tight text-paper/75">EN · ID · FR · DE</dd></div></dl></div></div><div className="mt-14 flex flex-col gap-3 border-t border-paper/12 pt-6 font-mono text-[10px] uppercase tracking-[.22em] text-paper/60 md:mt-16 md:flex-row md:items-center md:justify-between"><span>© 2026 Sulawesi.com</span><div className="flex gap-6"><span>Based in Makassar</span><a href="#main-content" className="inline-flex items-center gap-2 hover:text-paper">Back to top</a></div></div></div></footer>
  </>;
}
