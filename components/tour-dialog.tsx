"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { gallery as allPhotos, Tour } from "@/lib/wale-content";
import { Icon } from "./icons";

export function TourDialog({ kind, tour, photos: dayPhotos, photoSources, initialIndex = 0, photoTitle = "Wale Adventure", onClose }: { kind: "photos" | "highlights" | "day"; tour?: Tour; photos?: string[]; photoSources?: { src: string; alt: string }[]; initialIndex?: number; photoTitle?: string; onClose: () => void }) {
  const title = tour?.title ?? "Wale Adventure · North Sulawesi";
  const gallery = photoSources ?? allPhotos;
  const scheduled = tour?.kind === "scheduled" ? tour : undefined;
  const included = scheduled?.included ?? tour?.highlights ?? ["Experienced local guides", "Private tours", "Flexible itineraries", "Personalized service", "Easy booking", "Fast WhatsApp support"];
  const excluded = scheduled?.excluded ?? ["Tell us your preferred destination, travel dates and group size.", "Confirm availability, itinerary, transportation and inclusions with our team before booking.", "Your final price is confirmed via WhatsApp."];
  const dialog = useRef<HTMLDialogElement>(null);
  const [photoIndex, setPhotoIndex] = useState(initialIndex);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    if (kind !== "day") document.body.style.overflow = "hidden";
    if (dialog.current && !dialog.current.open) dialog.current.showModal();
    return () => { document.body.style.overflow = previousOverflow; };
  }, [kind]);

  const photos = kind === "photos";
  const dayLightbox = kind === "day";
  const dayImages = dayPhotos ?? [];

  if (dayLightbox) return <dialog ref={dialog} onClose={onClose} onCancel={onClose} aria-label={photoTitle} onClick={(event) => { if (event.target === event.currentTarget) dialog.current?.close(); }} className="m-auto max-h-none max-w-none bg-transparent p-0 backdrop:bg-ink/90">
    <div className="relative flex w-[min(96vw,1200px)] flex-col items-center">
      <Image src={dayImages[photoIndex]} alt={allPhotos.find((photo) => photo.src === dayImages[photoIndex])?.alt ?? photoTitle} width={dayImages[photoIndex].endsWith(".jpg") || dayImages[photoIndex].includes("tangkoko-macaques") ? 900 : 941} height={dayImages[photoIndex].endsWith(".jpg") || dayImages[photoIndex].includes("tangkoko-macaques") ? 1600 : 705} priority className="max-h-[82vh] w-auto max-w-full rounded-lg object-contain" />
      <button type="button" onClick={() => dialog.current?.close()} aria-label="Close" className="absolute -top-3 -end-3 flex h-11 w-11 items-center justify-center rounded-full bg-paper text-ink shadow-sheet transition-colors hover:text-coral-deep"><Icon name="close" className="h-5 w-5" /></button>
      <button type="button" aria-label="Previous photo" onClick={() => setPhotoIndex((current) => (current + dayImages.length - 1) % dayImages.length)} className="absolute start-3 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-paper/90 text-ink shadow-sheet transition-colors hover:bg-paper hover:text-coral-deep"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="h-6 w-6"><path d="M15.4 4.9 Q10.6 8.4 7.4 12 Q10.6 15.6 15.4 19.1" /></svg></button>
      <button type="button" aria-label="Next photo" onClick={() => setPhotoIndex((current) => (current + 1) % dayImages.length)} className="absolute end-3 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-paper/90 text-ink shadow-sheet transition-colors hover:bg-paper hover:text-coral-deep"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="h-6 w-6"><path d="M8.6 4.9 Q13.4 8.4 16.6 12 Q13.4 15.6 8.6 19.1" /></svg></button>
      <p className="mt-4 font-mono text-[12px] tracking-[.14em] text-paper/80">{photoIndex + 1} / {dayImages.length}</p>
    </div>
  </dialog>;

  return <dialog ref={dialog} onClose={onClose} onCancel={onClose} aria-label={photos ? title : undefined} aria-labelledby={photos ? undefined : "tour-inclusions-title"} className={`tour-dialog fixed inset-0 m-0 h-full max-h-none w-full max-w-none overflow-y-auto p-0 text-ink backdrop:bg-transparent ${photos ? "bg-ink/[.97]" : "flex items-end justify-center bg-ink/45 backdrop-blur-md sm:items-center sm:p-6"}`}>
    <div className={photos ? "min-h-full w-full bg-ink/[.97]" : "flex min-h-full w-full items-end justify-center sm:items-center"} onClick={(event) => { if (!photos && event.target === event.currentTarget) dialog.current?.close(); }}>
      <div className={photos ? "w-full" : "relative max-h-[92vh] w-full max-w-[920px] overflow-y-auto rounded-t-2xl bg-paper shadow-sheet sm:rounded-2xl"}>
        {photos ? <>
          <div className="sticky top-0 z-10 flex justify-end bg-ink/[.97] p-4 md:p-6"><button type="button" onClick={() => dialog.current?.close()} aria-label="Close photos" className="flex h-11 w-11 items-center justify-center rounded-full border border-paper/40 text-paper transition-colors hover:border-coral hover:bg-coral hover:text-on-coral"><Icon name="close" className="h-5 w-5" /></button></div>
          <div className="mx-auto w-full max-w-[1100px] px-4 pb-16 md:px-6"><p className="pb-6 text-center font-serif text-[24px] text-paper md:text-[28px]">{title}</p><div className="grid gap-3 sm:grid-cols-2">{gallery.map((photo) => <div key={photo.src} className="relative block aspect-[4/3] overflow-hidden"><Image src={photo.src} alt={photo.alt} fill sizes="(max-width: 639px) 100vw, 50vw" className="object-cover" /></div>)}</div></div>
        </> : <>
          <div className="sticky top-0 flex items-start justify-between gap-6 border-b border-card-line bg-paper px-6 py-5 md:px-9 md:py-6"><div className="min-w-0"><h2 id="tour-inclusions-title" className="font-serif text-[22px] font-semibold leading-tight text-ink md:text-[27px]">{tour ? "Highlights and inclusions" : "Our Story, Your Adventure"}</h2><p className="mt-1 truncate font-mono text-[10.5px] uppercase tracking-[.12em] text-mute">{title}</p></div><button type="button" onClick={() => dialog.current?.close()} aria-label="Close" className="-me-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-mute transition-colors hover:bg-ink/5 hover:text-coral-deep"><Icon name="close" className="h-5 w-5" /></button></div>
          <div className="grid items-start gap-8 px-6 py-7 md:grid-cols-2 md:gap-10 md:px-9 md:py-8"><div><h3 className="font-serif text-[18px] font-semibold text-ink md:text-[20px]">{scheduled ? "What’s included" : tour ? "Tour highlights" : "Why choose Wale Adventure"}</h3><ul className="mt-4 flex flex-col gap-3">{included.map((item) => <li key={item} className="flex gap-3 text-[14.5px] leading-[1.6] text-ink-2"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-coral-deep"><path d="M4.6 12.4 Q8 15.2 9.9 17.6 Q14.2 9.4 19.6 5.8" /></svg>{item}</li>)}</ul></div><div><h3 className="font-serif text-[18px] font-semibold text-ink md:text-[20px]">{scheduled ? "Not included" : "Plan your adventure"}</h3><ul className="mt-4 flex flex-col gap-3">{excluded.map((item) => <li key={item} className="flex gap-3 text-[14.5px] leading-[1.6] text-mute"><span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-pill-line" />{item}</li>)}</ul></div></div>
        </>}
      </div>
    </div>
  </dialog>;
}
