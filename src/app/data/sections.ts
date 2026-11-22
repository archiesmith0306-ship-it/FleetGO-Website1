// The homepage reads as one story, in this order. Navigation, footer and the numbered
// section labels all come from this list so they can never drift out of order.
export const CHAPTERS = [
  { id: 'why', label: 'Why FleetGO' },
  { id: 'how', label: 'How it works' },
  { id: 'platforms', label: 'Platforms' },
  { id: 'inspection', label: 'Inspection' },
  { id: 'coverage', label: 'Coverage' },
  { id: 'savings', label: 'Fuel savings' },
  { id: 'pricing', label: 'Pricing' },
  { id: 'faq', label: 'FAQ' },
  { id: 'contact', label: 'Contact' },
] as const;

export type ChapterId = (typeof CHAPTERS)[number]['id'];

export const chapterNumber = (id: ChapterId) =>
  String(CHAPTERS.findIndex((c) => c.id === id) + 1).padStart(2, '0');
