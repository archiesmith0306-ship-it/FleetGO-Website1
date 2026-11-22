// Real product screenshots per platform. All images were checked for client and
// driver names before inclusion; demo accounts (e.g. "Northstar Logistics") only.
const files = import.meta.glob('../../assets/platforms/*/*.{png,jpg,jpeg,webp}', {
  eager: true,
  import: 'default',
}) as Record<string, string>;

const CAPTIONS: Record<string, string[][]> = {
  'fuel-saving': [
    ['5.webp', 'Plan a fuel route — every stop priced at your real card rate'],
    ['4.webp', 'Never-fuel-here map — fuel cost, route risk and tax by state'],
    ['3.webp', 'Live fleet view — fuel level and location for every unit'],
    ['2.webp', 'Price trends — diesel by chain and the biggest state movers'],
    ['1.webp', 'Records — every recommendation matched to the actual fill-up'],
  ],
  roadwatch: [
    ['roadwatch-safety-dashboard.png', 'Safety dashboard — events, response time and escalations'],
    ['roadwatch-alert-exclusions.png', 'Alert exclusions — tune out the noise per driver or unit'],
    ['roadwatch-company-settings.png', 'Company settings — sheets, Telegram and automation per fleet'],
  ],
  'pm-monitoring': [
    ['shot-2.png', 'Upcoming maintenance — service booked before it becomes a breakdown'],
    ['shot-1.png', 'Truck roster — every unit with its ELD connection and dispatcher'],
    ['shot-3.png', 'Per-fleet maintenance view with intervals and miles remaining'],
  ],
  'pti-monitoring': [
    ['shot-4.jpg', 'PTI overview — inspections logged, issues found and CSA points prevented'],
    ['shot-6.jpg', 'Inspections — every walk-around on record'],
    ['shot-7.jpg', 'Issues — defects tracked from report to fix'],
    ['shot-5.jpg', 'Reports — build a custom PTI report in plain language'],
    ['shot-1.jpg', 'Driver app — walk-around video submitted and reviewed'],
    ['shot-2.jpg', 'Guided checklist — tires, coupling and departure checks'],
  ],
  cases: [['shot-1.jpg', 'Case board — every maintenance case from first report to final proof']],
  'follow-ups': [
    ['slide-03.png', 'One operating layer, three connected tools'],
    ['slide-04.png', 'A repeatable case lifecycle, end to end'],
    ['slide-06.png', 'ETA-aware scheduling — follow up exactly when the update is due'],
    ['slide-07.png', 'Shift-aware coordination, day and night'],
    ['slide-08.png', 'Telegram updates — natural replies or a structured template'],
    ['slide-09.png', 'Case visibility inside Telegram'],
    ['slide-05.png', "Status visible in each fleet's own sheet"],
    ['slide-02.png', 'Why maintenance support needs continuity'],
  ],
};

export type Shot = { src: string; caption: string };

export function galleryFor(slug: string): Shot[] {
  return (CAPTIONS[slug] ?? [])
    .map(([file, caption]) => ({
      src: files[`../../assets/platforms/${slug}/${file}`],
      caption,
    }))
    .filter((s): s is Shot => Boolean(s.src));
}
