import { CHAPTERS, chapterNumber, type ChapterId } from '../data/sections';

/** "03 — Platforms": tells visitors where they are in the page story. */
export default function SectionLabel({ id, className = 'mb-5' }: { id: ChapterId; className?: string }) {
  const label = CHAPTERS.find((c) => c.id === id)?.label;
  return (
    <span className={`inline-flex items-center gap-2.5 font-mono uppercase tracking-[0.18em] text-[11px] text-[#c8970d] ${className}`}>
      <span className="font-bold">{chapterNumber(id)}</span>
      <span className="w-6 h-px bg-[#c8970d]/60" />
      <span>{label}</span>
    </span>
  );
}
