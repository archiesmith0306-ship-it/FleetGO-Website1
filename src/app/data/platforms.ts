// Single source of truth for platforms, pricing, and company facts.
// No client company names or driver names appear anywhere in this file.

export const COMPANY = {
  name: 'FleetGO',
  phone: '(331) 336-5707',
  phoneHref: 'tel:+13313365707',
  email: 'main@myfleetgo.com',
  address: '1811 W Diehl Road, Suite 200, Naperville, IL 60563',
  portalUrl: 'https://pti-guardian-bot.lovable.app/auth',
};

export const STATS = {
  carriers: 13,
  trucks: 400,
  specialists: 14,
  serviceLocations: '1,000+',
  statesCovered: 48,
  coverage: '24/7',
};

/** Core plan — Fleet Management. Price is per truck, per month. */
export const CORE_TIERS = [
  { range: '1–10 Trucks', price: '$100', unit: '/truck/mo', popular: false },
  { range: '11–20 Trucks', price: '$90', unit: '/truck/mo', popular: true },
  { range: '21–30 Trucks', price: '$80', unit: '/truck/mo', popular: false },
  { range: '31–50 Trucks', price: '$70', unit: '/truck/mo', popular: false },
  { range: '51+ Trucks', price: 'Negotiable', unit: '', popular: false },
];

/** Everything bundled into the core plan. */
export const CORE_INCLUDES = [
  'PM Monitoring — preventative maintenance scheduling',
  'PTI Monitoring — pre-trip inspection compliance',
  'Cases — maintenance case tracking end to end',
  'Follow-ups — on-time case closure and escalation',
  'Work orders issued per customer at case close',
  'Weekly maintenance expense statement',
  '24/7 dedicated support team',
  'Dedicated account manager',
];

export type Platform = {
  slug: string;
  name: string;
  tagline: string;
  summary: string;
  billing: 'included' | 'addon';
  priceLabel: string;
  priceDetail?: string;
  capabilities: { title: string; description: string }[];
  stats?: { value: string; label: string }[];
};

export const PLATFORMS: Platform[] = [
  {
    slug: 'fuel-saving',
    name: 'Fuel Saving Platform',
    tagline: 'Every gallon counts. We prove it.',
    summary:
      'Route-aware fuel planning that prices every stop at what you actually pay — discounted where you are on-network, net of state tax — then proves the saving on every fill-up.',
    billing: 'addon',
    priceLabel: '25% of verified monthly savings',
    priceDetail: 'No savings, no fee. 24/7 monitoring included.',
    capabilities: [
      { title: 'Plan a fuel route', description: 'Enter start and end, set a corridor, and get ranked stops priced at your real card rate — with truck routing that avoids tolls, tunnels, dirt roads and ferries.' },
      { title: 'Never fuel here', description: 'A live state-by-state map of fuel cost, route risk and tax rate that automatically flags the most expensive states to skip.' },
      { title: 'Live fleet view', description: 'Every unit on one map with fuel level, last-known location and low-fuel alerts — plan a fuel stop straight from any truck.' },
      { title: 'Price trends', description: 'Average diesel by chain with 14 days of history, plus the biggest state-level movers versus yesterday and last week.' },
      { title: 'Proven savings ledger', description: 'Every recommendation logged and matched to the actual fill-up, so each dollar saved is auditable and exportable to CSV.' },
    ],
    stats: [
      { value: '1,584', label: 'Stations priced' },
      { value: '24/7', label: 'Monitoring' },
      { value: '25%', label: 'Of savings only' },
    ],
  },
  {
    slug: 'roadwatch',
    name: 'RoadWatch',
    tagline: 'Unsafe driving, caught and corrected in minutes.',
    summary:
      'A 24/7 monitoring team watches every safety alert as it fires and calls the driver immediately — then tracks every event, response and outcome in one dashboard.',
    billing: 'addon',
    priceLabel: '$50 / truck / month',
    priceDetail: '1–50 trucks. $35 per truck at 51+. Integrates with Samsara and Motive.',
    capabilities: [
      { title: 'Live alert monitoring', description: 'Speeding, rolling stops, cell phone use, lane changes, drowsiness and seat-belt events surfaced the moment they happen.' },
      { title: 'Immediate driver contact', description: 'Our team calls the driver as the alert fires — correction happens on the road, not at the next review.' },
      { title: 'Response tracking', description: 'Median response time, events within target, open items and escalations, all measured against the previous period.' },
      { title: 'Alert exclusions', description: 'Tune out the noise per company so your team only sees events that genuinely matter.' },
      { title: 'Telematics integration', description: 'Flexible integration with Samsara and Motive — no rip-and-replace of your existing hardware.' },
    ],
    stats: [
      { value: '12 min', label: 'Median response' },
      { value: '24/7', label: 'Live monitoring' },
      { value: '6', label: 'Event types tracked' },
    ],
  },
  {
    slug: 'pm-monitoring',
    name: 'PM Monitoring',
    tagline: 'Preventative maintenance that never slips.',
    summary:
      'Every unit tracked against its service interval, so oil changes and scheduled work happen before they become breakdowns.',
    billing: 'included',
    priceLabel: 'Included in the core plan',
    capabilities: [
      { title: 'Service interval tracking', description: 'Each truck monitored against its PM schedule with status visible at a glance.' },
      { title: 'Proactive scheduling', description: 'Work is booked ahead of the due date, around your dispatch plan rather than against it.' },
      { title: 'Shift coverage', description: 'Coverage around the clock so nothing waits for business hours to be actioned.' },
    ],
  },
  {
    slug: 'pti-monitoring',
    name: 'PTI Monitoring',
    tagline: 'Pre-trip inspections, actually enforced.',
    summary:
      'Pre-trip inspection compliance monitored continuously, with defects routed into the case system the moment they are reported.',
    billing: 'included',
    priceLabel: 'Included in the core plan',
    capabilities: [
      { title: 'Inspection compliance', description: 'PTI completion monitored across the fleet, with gaps flagged rather than discovered at audit.' },
      { title: 'Defect routing', description: 'Reported defects open a maintenance case automatically, so nothing is lost between driver and shop.' },
      { title: 'DOT readiness', description: 'A continuous record that stands up to inspection instead of a scramble before one.' },
    ],
  },
  {
    slug: 'cases',
    name: 'Cases',
    tagline: 'From the first report to the final proof.',
    summary:
      'Our main operating platform. Every maintenance case tracked in detail — what happened, who is on it, what it cost, and how it was resolved.',
    billing: 'included',
    priceLabel: 'Included in the core plan',
    capabilities: [
      { title: 'End-to-end case tracking', description: 'One record per issue from first report through final repair, with full history attached.' },
      { title: 'Vendor coordination', description: 'Shops, towing and parts coordinated from inside the case instead of across phone and email.' },
      { title: 'Cost capture', description: 'Every cost recorded against the case, feeding breakdown and budget analysis.' },
    ],
  },
  {
    slug: 'follow-ups',
    name: 'Follow-ups',
    tagline: 'Nothing sits open.',
    summary:
      'Keeps every case moving from the moment it opens until it closes — then issues the work order and a weekly maintenance expense statement.',
    billing: 'included',
    priceLabel: 'Included in the core plan',
    capabilities: [
      { title: 'On-time chasing', description: 'Each open case is pushed on schedule so repairs do not stall in a vendor queue.' },
      { title: 'Work orders at close', description: 'When a case closes, the work order is shared with that customer automatically.' },
      { title: 'Weekly expense statement', description: 'A detailed maintenance expense statement delivered every week, per customer.' },
    ],
  },
];

/** Paid add-ons beyond the core per-truck plan. */
export const ADDONS = [
  { name: 'RoadWatch Safety Monitoring', price: '$50', unit: '/truck/mo', detail: '1–50 trucks · $35/truck at 51+' },
  { name: 'Fuel Saving Platform', price: '25%', unit: 'of savings', detail: 'Of verified monthly savings · 24/7 monitoring included' },
  { name: 'Trailer Tracking & Control', price: '$30', unit: '/trailer', detail: '1–25 trailers · $20/trailer at 26+' },
  { name: 'Supply Chain Procurement', price: '50%', unit: 'of fee', detail: 'Of the first-time supplier fee per contract' },
];
