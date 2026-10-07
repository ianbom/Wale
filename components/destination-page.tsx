"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { DestinationDetail } from "@/lib/destination-content";
import { destinations, formatPrice, priceDisclaimer, whatsappUrl } from "@/lib/wale-content";
import { Icon } from "@/components/icons";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";

const sections = [
  ["overview", "Overview"],
  ["trips", "Tours"],
  ["best-visits", "Best visits"],
  ["visitors-say", "Trip notes"],
  ["where-to-stay", "Where to stay"],
  ["plan-visit", "Plan"],
] as const;

function CarouselControls({ label, scroll }: { label: string; scroll: (direction: number) => void }) {
  return <div className="hidden shrink-0 gap-3 sm:flex">
    {[-1, 1].map((direction) => <button key={direction} type="button" onClick={() => scroll(direction)} aria-label={`${direction < 0 ? "Previous" : "Next"} ${label}`} className="flex h-11 w-11 items-center justify-center rounded-full border border-ochre/50 text-ochre transition-colors hover:border-coral hover:bg-coral hover:text-paper">
      <Icon name="arrow" className={`h-5 w-5 ${direction < 0 ? "rotate-180" : ""}`} />
    </button>)}
  </div>;
}

function PlanPrompt({ message, description }: { message: string; description: string }) {
  return <section className="relative overflow-hidden bg-ink text-paper">
    <Image src="/images/cta-waves.svg" alt="" aria-hidden="true" fill unoptimized sizes="100vw" className="pointer-events-none absolute h-full w-full select-none object-cover opacity-30" />
    <div className="relative mx-auto flex max-w-[1280px] flex-col items-start gap-5 px-5 py-9 md:flex-row md:items-center md:justify-between md:gap-10 md:px-10 md:py-10">
      <h2 className="font-serif font-semibold text-[24px] leading-tight md:shrink-0 md:text-[30px]">Ready to plan your adventure?</h2>
      <p className="max-w-[46ch] text-[14.5px] text-paper/75 leading-relaxed md:text-[15.5px]">{description}</p>
      <a href={whatsappUrl(message)} target="_blank" rel="noreferrer" className="shrink-0 rounded-full bg-coral px-7 py-3.5 font-semibold text-[12.5px] text-paper uppercase tracking-[0.08em] transition-colors hover:bg-coral-deep">WhatsApp us</a>
    </div>
  </section>;
}

export default function DestinationPage({ destination }: { destination: DestinationDetail }) {
  const [scrollY, setScrollY] = useState(0);
  const [activeSection, setActiveSection] = useState<string>("overview");
  const [activeNote, setActiveNote] = useState(0);
  const [showBookingBar, setShowBookingBar] = useState(false);
  const galleryRef = useRef<HTMLUListElement>(null);
  const visitsRef = useRef<HTMLUListElement>(null);
  const visiblePhotos = destination.photos.length ? destination.photos : [{ src: destination.image, alt: destination.alt }];
  const gallery = Array.from({ length: 4 }, (_, index) => visiblePhotos[index % visiblePhotos.length]);
  const nearby = destination.nearby.length ? destination.nearby : destinations.filter((item) => ["togean", "luwuk"].includes(item.slug));
  const note = destination.notes[activeNote];
  const bookingMessage = `Hello Wale Adventure, I'm interested in planning a trip to ${destination.title}. Please confirm availability and details for my travel dates and group size.`;

  useEffect(() => {
    const update = () => {
      setScrollY(window.scrollY);
      const hero = document.getElementById("destination-hero");
      setShowBookingBar(Boolean(hero && hero.getBoundingClientRect().bottom < 0));
    };
    const observer = new IntersectionObserver((entries) => {
      const current = entries.filter((entry) => entry.isIntersecting).sort((first, second) => second.intersectionRatio - first.intersectionRatio)[0];
      if (current) setActiveSection(current.target.id);
    }, { rootMargin: "-90px 0px -65% 0px", threshold: [0, 0.2, 0.5, 0.8] });
    sections.forEach(([id]) => {
      const target = document.getElementById(id);
      if (target) observer.observe(target);
    });
    window.addEventListener("scroll", update, { passive: true });
    update();
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", update);
    };
  }, []);

  const scrollCarousel = (ref: typeof galleryRef, direction: number) => ref.current?.scrollBy({ left: direction * ref.current.clientWidth * 0.82, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
  const selectNote = (direction: number) => setActiveNote((previous) => (previous + direction + destination.notes.length) % destination.notes.length);
  const facts = [
    { icon: "calendar" as const, label: "Typical stay · sample", value: destination.stay },
    { icon: "pin" as const, label: "Suggested base · sample", value: destination.bases[0] },
    { icon: "compass" as const, label: "Province", value: destination.region },
    { icon: "users" as const, label: "Stay options", value: "Confirm before booking" },
    { icon: "pace" as const, label: "Travel dates", value: "Plan with our team" },
  ];

  return <>
    <SiteHeader hidden={scrollY > 75} overlay />
    <main id="main-content" className="bg-paper-2">
      <header id="destination-hero" className="relative flex h-[62vh] min-h-[440px] items-center justify-center overflow-hidden md:h-[78vh] md:min-h-[520px] md:max-h-[760px] bg-ink">
        <Image src={destination.image} alt={destination.alt} fill priority sizes="100vw" className="absolute inset-0 h-full w-full object-cover" />
        <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.58)_0%,rgba(0,0,0,0.60)_60%,rgba(0,0,0,0.45)_100%)]" />
        <div className="relative mx-auto max-w-[900px] animate-[destination-reveal_650ms_ease-out_both] px-5 text-center md:px-10">
          <p className="font-semibold text-[12px] text-paper uppercase tracking-[0.18em] md:text-[14px]">{destination.region}</p>
          <h1 className="mt-4 font-display font-bold text-[clamp(36px,7vw,64px)] text-paper uppercase leading-[1.02] tracking-[-0.01em]">{destination.title}</h1>
          <p className="mt-4 text-[13px] text-paper/90 uppercase leading-relaxed tracking-[0.1em] md:text-[15px]">{destination.subtitle}</p>
        </div>
      </header>

      <nav aria-label="Sections" className={`sticky top-0 z-30 border-b border-card-line bg-paper-2 transition-shadow ${scrollY > 700 ? "shadow-tile-soft" : ""}`}>
        <div className="mx-auto flex max-w-[1280px] items-center gap-4 px-5 md:px-10">
          <ul className="hide-scrollbar flex min-w-0 flex-1 justify-start gap-5 overflow-x-auto md:justify-center md:gap-8">
            {sections.map(([id, label]) => <li key={id} className="shrink-0"><a href={`#${id}`} aria-current={activeSection === id ? "location" : undefined} className={`group/tab relative block py-4 font-semibold text-[13px] uppercase tracking-[0.1em] transition-colors md:text-[14px] ${activeSection === id ? "text-coral" : "text-ink-2 hover:text-ink"}`}>{label}<span aria-hidden="true" className={`absolute inset-x-0 bottom-0 h-[2px] bg-coral transition-opacity ${activeSection === id ? "opacity-100" : "opacity-0 group-hover/tab:opacity-30"}`} /></a></li>)}
          </ul>
          <a href={whatsappUrl(bookingMessage)} target="_blank" rel="noreferrer" className="hidden shrink-0 items-center gap-2 bg-coral px-5 py-2.5 font-semibold text-[13px] text-paper uppercase tracking-[0.08em] transition-colors hover:bg-coral-deep sm:inline-flex">WhatsApp us</a>
        </div>
      </nav>

      <nav aria-label="Breadcrumb" className="border-b border-card-line bg-paper-2">
        <ol className="mx-auto flex max-w-[1280px] items-center gap-2 overflow-x-auto px-5 py-3 text-[12.5px] md:px-10">
          <li><Link href="/" className="text-mute underline underline-offset-2 hover:text-coral">Home</Link></li><li aria-hidden="true" className="text-faint">/</li>
          <li><Link href="/destinations" className="text-mute underline underline-offset-2 hover:text-coral">Destinations</Link></li><li aria-hidden="true" className="text-faint">/</li>
          <li><Link href={`/destinations#${destination.region.toLowerCase().replaceAll(" ", "-")}`} className="text-mute underline underline-offset-2 hover:text-coral">{destination.region}</Link></li><li aria-hidden="true" className="text-faint">/</li><li className="truncate text-ink" aria-current="page">{destination.title}</li>
        </ol>
      </nav>

      <section id="overview" className="scroll-mt-24">
        <div className="border-b border-card-line bg-paper"><ul className="mx-auto grid max-w-[1280px] gap-x-6 gap-y-8 px-5 py-10 sm:grid-cols-2 md:px-10 lg:grid-cols-5">
          {facts.map((fact) => <li key={fact.label} className="flex flex-col items-center text-center"><span className="flex h-11 w-11 items-center justify-center text-ochre"><Icon name={fact.icon} className="h-7 w-7" /></span><span className="mt-2.5 font-semibold text-[15px] text-ink leading-snug">{fact.label}</span><span className="mt-1 text-[13.5px] text-mute leading-snug">{fact.value}</span></li>)}
        </ul></div>
        <div className="mx-auto max-w-[1280px] px-5 py-12 md:px-10 md:py-16">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] lg:gap-16">
            <div><p className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-coral">{destination.region}</p><h2 className="mt-3 font-serif font-semibold text-[32px] text-ink leading-tight md:text-[42px]">{destination.title}</h2><p className="mt-5 max-w-[66ch] text-[16px] text-ink-2 leading-[1.75] md:text-[16.5px]">{destination.tour.overview}</p><p className="mt-4 max-w-[66ch] text-[16px] text-ink-2 leading-[1.75] md:text-[16.5px]">Share your dates, group size and interests with Wale Adventure. Confirm access, transport and local arrangements with the team before booking. You can also discuss the pace and places you want to include.</p><p className="mt-4 max-w-[66ch] border-s-2 border-coral ps-4 text-[13px] text-mute leading-[1.65]">Sample content: suggested stay lengths, visit ideas and stay areas on this page are illustrative, not confirmed inclusions or bookable listings.</p></div>
            <div><h3 className="font-serif font-semibold text-[24px] text-ink md:text-[28px]">Highlights</h3><ul className="mt-5 flex flex-col">{destination.visits.slice(0, 4).map((visit) => <li key={visit} className="flex gap-3.5 border-b border-card-line py-4 first:border-t"><span aria-hidden="true" className="mt-[7px] h-[7px] w-[7px] shrink-0 rounded-full border border-ochre" /><span className="min-w-0"><span className="block text-[14px] font-semibold text-ink-2 leading-snug">{visit}</span><span className="mt-1 block font-mono text-[10px] text-mute uppercase tracking-[0.08em]">Sample visit idea · confirm details</span></span></li>)}</ul></div>
          </div>
        </div>
        <div className="relative pb-14"><div className="mx-auto flex max-w-[1280px] justify-end gap-3 px-5 pb-4 md:px-10"><CarouselControls label="destination photos" scroll={(direction) => scrollCarousel(galleryRef, direction)} /></div>
          <ul ref={galleryRef} aria-label={`${destination.title} illustrative photos`} className="hide-scrollbar flex snap-x snap-mandatory gap-5 overflow-x-auto pe-5 ps-[max(20px,calc((100vw_-_1280px)/2_+_20px))] md:pe-10 md:ps-[max(40px,calc((100vw_-_1280px)/2_+_40px))]">
            {gallery.map((photo, index) => <li key={`${photo.src}-${index}`} className={`w-[260px] shrink-0 snap-start sm:w-[340px] lg:w-[400px] ${index % 2 ? "translate-y-7 md:translate-y-10" : ""}`}><span className="relative block aspect-[4/3] w-full overflow-hidden rounded-lg bg-ink/10"><Image src={photo.src} alt={`${destination.title}: ${photo.alt} (illustrative regional image)`} fill sizes="(max-width: 640px) 260px, (max-width: 1024px) 340px, 400px" className="object-cover" /></span></li>)}
          </ul>
        </div>
      </section>

      <PlanPrompt message={bookingMessage} description="Tell us what you want to see and we’ll help plan a route around your dates." />

      <section className="py-12 md:py-16"><div className="mx-auto max-w-[880px] px-5 text-center md:px-0"><svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="mx-auto h-7 w-7 text-coral/50"><path d="M9.6 5.4c-3.2 1.3-5.4 4.2-5.4 7.9 0 3.1 1.9 5.3 4.5 5.3 2.3 0 3.9-1.7 3.9-3.8 0-2-1.4-3.5-3.3-3.5-.4 0-.8.06-1 .13.35-1.8 2-3.3 3.9-4.1L9.6 5.4Zm10.1 0c-3.2 1.3-5.4 4.2-5.4 7.9 0 3.1 1.9 5.3 4.5 5.3 2.3 0 3.9-1.7 3.9-3.8 0-2-1.4-3.5-3.3-3.5-.4 0-.8.06-1 .13L19.7 5.4Z" /></svg><p className="mt-5 text-balance font-serif text-[26px] text-ink leading-[1.28] tracking-[-0.01em] md:text-[38px]">{destination.story}</p></div></section>

      <section id="trips" className="scroll-mt-24 bg-paper py-14 md:py-18"><div className="mx-auto max-w-[1280px] px-5 md:px-10"><div className="text-center"><h2 className="font-serif font-semibold text-[30px] text-ink leading-tight md:text-[40px]">Tours that go to {destination.title}</h2><span aria-hidden="true" className="mx-auto mt-5 block h-px w-[110px] bg-ochre/60" /><p className="mx-auto mt-6 max-w-[56ch] text-[15.5px] text-mute leading-relaxed">Start with this private itinerary, then confirm timing, inclusions and availability with Wale Adventure.</p></div>
          <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"><li><Link href={`/tours/${destination.tour.slug}`} className="group/tour flex h-full flex-col overflow-hidden rounded-lg bg-card shadow-tile-soft transition-shadow hover:shadow-sheet"><span className="relative block aspect-[16/10] w-full overflow-hidden bg-ink"><Image src={destination.tour.image} alt={destination.tour.imageAlt} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" className="object-cover transition-transform duration-500 group-hover/tour:scale-[1.05] motion-reduce:transition-none" /></span><span className="flex flex-1 flex-col items-center px-6 py-6 text-center"><span className="flex items-center gap-1.5 font-mono text-[11px] text-ochre uppercase tracking-[0.12em]">{destination.tour.kind === "custom" ? "Custom itinerary" : destination.tour.duration}</span><span className="mt-2.5 font-serif font-semibold text-[22px] text-ink leading-snug transition-colors group-hover/tour:text-coral">{destination.tour.title}</span><span className="mt-3 max-w-[42ch] text-[14px] text-mute leading-relaxed">{destination.tour.description}</span><span className="mt-auto pt-6"><span className="inline-flex items-center rounded-full border border-ink px-5 py-2.5 font-semibold text-[11px] text-ink uppercase tracking-[0.08em] transition-colors group-hover/tour:border-coral group-hover/tour:text-coral">Explore tour</span></span></span></Link></li></ul>
        </div></section>

      <PlanPrompt message={bookingMessage} description="Not sure where to start? Tell our local team what matters to you." />

      <section id="best-visits" className="scroll-mt-24 bg-paper-warm py-14 md:py-18"><div className="mx-auto flex max-w-[1280px] items-end justify-between gap-6 px-5 md:px-10"><div><p className="font-mono text-[10px] text-mute uppercase tracking-[0.14em]">Sample ideas · confirm before travel</p><h2 className="mt-2 font-serif font-semibold text-[30px] text-ink leading-tight md:text-[40px]">Best visits</h2></div><CarouselControls label="visit ideas" scroll={(direction) => scrollCarousel(visitsRef, direction)} /></div>
        <ul ref={visitsRef} className="hide-scrollbar mt-9 flex snap-x snap-mandatory gap-5 overflow-x-auto pe-5 pb-2 ps-[max(20px,calc((100vw_-_1280px)/2_+_20px))] md:pe-10 md:ps-[max(40px,calc((100vw_-_1280px)/2_+_40px))]">
          {destination.visits.map((visit, index) => <li key={visit} className="w-[270px] shrink-0 snap-start sm:w-[320px]"><article className="group/spot flex h-full flex-col overflow-hidden rounded-lg bg-card shadow-tile-soft transition-shadow hover:shadow-sheet"><span className="relative block aspect-[4/5] w-full overflow-hidden bg-ink/10"><Image src={visiblePhotos[index % visiblePhotos.length].src} alt={`${visiblePhotos[index % visiblePhotos.length].alt} — illustrative image for ${visit}`} fill sizes="(max-width: 640px) 270px, 320px" className="object-cover transition-transform duration-500 group-hover/spot:scale-[1.05] motion-reduce:transition-none" /><span className="absolute top-3 start-3 rounded-full bg-[#4a5a2e] px-3 py-1 font-mono text-[9.5px] text-paper uppercase tracking-[0.12em]">Sample</span></span><div className="flex flex-1 flex-col p-5"><h3 className="font-serif font-semibold text-[18px] text-ink leading-snug transition-colors group-hover/spot:text-coral md:text-[20px]">{visit}</h3><p className="mt-1.5 font-mono text-[11px] text-mute tracking-[0.04em]">{destination.region}</p><p className="mt-auto pt-5 text-[12px] text-mute">Suggested idea; confirm route and access.</p></div></article></li>)}
        </ul>
      </section>

      <section id="visitors-say" className="relative scroll-mt-24 overflow-hidden bg-paper py-16 md:py-20"><Image src="/images/cta-waves.svg" alt="" aria-hidden="true" width={1280} height={500} unoptimized className="pointer-events-none absolute inset-0 h-full w-full select-none object-fill brightness-0 opacity-50" /><div className="relative mx-auto max-w-[1000px] px-5 text-center md:px-10"><h2 className="font-mono text-[11px] text-mute uppercase tracking-[0.18em]">Travel notes about {destination.title}</h2><div className="mt-8 flex items-center gap-4 md:gap-10"><button type="button" onClick={() => selectNote(-1)} aria-label="Previous sample travel note" className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-ochre/50 text-ochre transition-colors hover:border-coral hover:bg-coral hover:text-paper"><Icon name="arrow" className="h-5 w-5 rotate-180" /></button><div className="min-w-0 flex-1" aria-live="polite"><p className="text-balance font-serif font-semibold text-[27px] text-ink leading-[1.15] tracking-[-0.01em] md:text-[44px]">{note.title}</p><p className="mx-auto mt-5 max-w-[62ch] text-[15px] text-ink-2 leading-[1.75] md:text-[16.5px]">{note.text}</p></div><button type="button" onClick={() => selectNote(1)} aria-label="Next sample travel note" className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-ochre/50 text-ochre transition-colors hover:border-coral hover:bg-coral hover:text-paper"><Icon name="arrow" className="h-5 w-5" /></button></div><div className="mt-8 flex flex-col items-center gap-2"><p className="max-w-[54ch] text-[12px] text-mute leading-snug">Sample editorial content; this is not a customer review.</p><p className="mt-1 max-w-[54ch] text-[12.5px] text-mute leading-snug">Experiences depend on local access and availability. Confirm trip arrangements before booking.</p><Link href="#where-to-stay" className="font-semibold text-[11.5px] text-coral uppercase tracking-[0.08em] underline underline-offset-4 transition-colors hover:text-coral-deep">See sample stay areas</Link></div><div className="mt-9 flex justify-center gap-2">{destination.notes.map((item, index) => <button key={item.title} type="button" onClick={() => setActiveNote(index)} aria-label={`Show sample travel note ${index + 1}`} aria-current={activeNote === index ? "true" : undefined} className={`h-2 w-2 rounded-full transition-colors ${activeNote === index ? "bg-ochre" : "bg-faint hover:bg-mute"}`} />)}</div></div></section>

      <section id="where-to-stay" className="relative scroll-mt-24 overflow-hidden bg-ink text-paper"><Image src="/images/footer-map.svg" alt="" aria-hidden="true" width={620} height={620} unoptimized className="pointer-events-none absolute right-[-96px] bottom-[-150px] h-[440px] w-auto max-w-none select-none opacity-30 md:right-[-40px] md:h-[620px]" /><div className="relative mx-auto max-w-[1280px] px-5 py-14 md:px-10 md:py-16"><h2 className="font-mono text-[12px] text-paper/70 uppercase tracking-[0.16em]">Where to stay</h2><p className="mt-3 max-w-[60ch] text-[12.5px] text-paper/70 leading-snug">Sample planning areas only. Wale Adventure has not verified or listed individual accommodation here.</p><ul className="hide-scrollbar mt-8 flex snap-x gap-5 overflow-x-auto pb-2">
          {destination.bases.map((base, index) => <li key={base} className="w-[74vw] shrink-0 snap-start sm:w-[280px]"><article><span className="relative block aspect-[3/4] w-full overflow-hidden bg-paper/10"><Image src={visiblePhotos[index % visiblePhotos.length].src} alt={`${visiblePhotos[index % visiblePhotos.length].alt} (illustrative image for sample stay planning near ${base})`} fill sizes="(max-width: 640px) 74vw, 280px" className="object-cover" /><span aria-hidden="true" className="absolute inset-0 bg-ink/10 transition-opacity duration-300" /><span className="absolute top-3 start-3 bg-ink/80 px-2.5 py-1 font-mono text-[10px] text-paper uppercase tracking-[0.12em] backdrop-blur-sm">Sample area</span></span><span className="mt-4 line-clamp-1 block font-mono text-[11.5px] text-paper/55 uppercase tracking-[0.14em]">{destination.region}</span><h3 className="mt-1.5 font-serif text-[22px] text-paper leading-tight">{base}</h3><p className="mt-2 text-[12px] text-paper/70">Example base area; verify transport and availability.</p><a href={whatsappUrl(bookingMessage)} target="_blank" rel="noreferrer" className="mt-3 inline-block border-paper/40 border-b pb-1 font-semibold text-[12px] text-paper uppercase tracking-[0.1em] transition-colors hover:border-coral hover:text-coral">Ask Wale Adventure</a></article></li>)}
        </ul></div></section>

      <section id="plan-visit" className="relative scroll-mt-24 overflow-hidden bg-coral text-paper"><Image src="/images/cta-waves.svg" alt="" aria-hidden="true" fill unoptimized sizes="100vw" className="pointer-events-none absolute inset-y-0 end-0 h-full w-[52%] select-none object-cover opacity-45" /><div className="relative mx-auto max-w-[1100px] px-5 py-14 md:px-10 md:py-16"><h2 className="font-mono text-[12px] text-paper/80 uppercase tracking-[0.16em]">Plan your visit</h2><div className="mt-6 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between lg:gap-12"><div className="min-w-0"><p className="font-mono text-[12px] text-paper/75 uppercase tracking-[0.14em]">Sample itinerary · confirm before booking</p><p className="mt-3 font-display font-bold text-[32px] leading-[1.05] tracking-[-0.01em] md:text-[42px]">Explore {destination.title}</p><p className="mt-4 max-w-[54ch] text-[16px] text-paper/85 leading-relaxed md:text-[17px]">Discuss your dates, route and inclusions with Wale Adventure before booking.</p><ul className="mt-6 flex flex-wrap gap-2.5"><li className="border border-paper/40 px-3.5 py-1.5 font-mono text-[12px] text-paper uppercase tracking-[0.1em]">Private group</li><li className="border border-paper/40 px-3.5 py-1.5 font-mono text-[12px] text-paper uppercase tracking-[0.1em]">Schedule on request</li><li title={priceDisclaimer} className="border border-paper/40 px-3.5 py-1.5 font-mono text-[12px] text-paper uppercase tracking-[0.1em]">{formatPrice(destination.tour.startingPriceIdr)} · indicative</li></ul></div><Link href={`/tours/${destination.tour.slug}`} className="group/plan inline-flex h-14 shrink-0 items-center gap-3 bg-paper px-7 font-semibold text-[15px] text-ink uppercase tracking-[0.08em] transition-colors hover:bg-ink hover:text-paper md:text-[16px]">Explore our tours<Icon name="arrow" className="h-5 w-5 transition-transform group-hover/plan:translate-x-1" /></Link></div></div></section>

      <section className="border-t border-card-line bg-paper-2 py-14 md:py-18"><div className="mx-auto max-w-[1280px] px-5 text-center md:px-10"><h2 className="font-serif font-semibold text-[30px] text-ink leading-tight md:text-[40px]">Nearby</h2><p className="mx-auto mt-4 max-w-[62ch] text-[14px] text-mute leading-relaxed">Ideas for adding another stop to a wider Sulawesi journey. Confirm distances and connections before choosing your route.</p><ul className="mt-10 grid gap-6 text-start sm:grid-cols-2 lg:grid-cols-3">{nearby.slice(0, 2).map((item) => <li key={item.slug || item.title}><Link href={item.slug ? `/destinations/${item.slug}` : "/destinations"} className="group/nearby flex h-full flex-col overflow-hidden rounded-lg bg-card shadow-tile-soft transition-shadow hover:shadow-sheet"><span className="relative block aspect-[3/2] w-full overflow-hidden bg-ink"><Image src={item.image} alt={item.alt} fill sizes="(max-width: 640px) 100vw, 33vw" className="object-cover transition-transform duration-500 group-hover/nearby:scale-[1.04] motion-reduce:transition-none" /></span><span className="flex flex-1 flex-col p-5 md:p-6"><span className="font-mono text-[10.5px] text-ochre uppercase tracking-[0.12em]">{item.region}</span><span className="mt-2 font-serif font-semibold text-[22px] text-ink leading-tight transition-colors group-hover/nearby:text-coral md:text-[24px]">{item.title}</span><span className="mt-auto flex items-center gap-2 pt-5 font-semibold text-[11.5px] text-coral uppercase tracking-[0.08em]">Explore<Icon name="arrow" className="h-4 w-4" /></span></span></Link></li>)}</ul></div></section>
    </main>

    <div aria-hidden={!showBookingBar} className={`pointer-events-none fixed inset-x-0 bottom-0 z-30 flex rounded-t-2xl border-card-line border-t bg-card shadow-sheet transition-transform duration-300 motion-reduce:transition-none lg:rounded-none lg:border-paper/10 lg:bg-ink/95 lg:shadow-none lg:backdrop-blur ${showBookingBar ? "translate-y-0" : "translate-y-full"}`}>
      <div inert={!showBookingBar} className="pointer-events-auto mx-auto flex w-full max-w-[1280px] items-center gap-4 px-5 py-3.5 md:gap-6 md:px-10 md:py-4 lg:text-paper">
        <div className="min-w-0 flex-1 text-start md:text-end"><p className="line-clamp-2 text-[13.5px] font-semibold leading-tight md:truncate md:text-[17px]">{destination.title}</p><p className="mt-0.5 text-[12px] text-coral md:text-[13.5px]">{destination.region} · sample itinerary</p></div>
        <a href={whatsappUrl(bookingMessage)} target="_blank" rel="noreferrer" className="flex shrink-0 items-center justify-center rounded-full bg-coral px-5 py-2.5 text-[11.5px] font-semibold text-paper uppercase tracking-[0.08em] transition-colors hover:bg-coral-deep md:px-7 md:py-3 md:text-[12.5px]">WhatsApp us</a>
      </div>
    </div>
    {showBookingBar && <a href={whatsappUrl(bookingMessage)} target="_blank" rel="noreferrer" aria-label={`Chat with Wale Adventure about ${destination.title}`} className="fixed end-4 bottom-24 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-coral text-paper shadow-sheet transition-transform hover:scale-[1.07] md:end-6 md:bottom-28 lg:bottom-6"><Icon name="whatsapp" className="h-6 w-6" /></a>}
    <SiteFooter />
  </>;
}
