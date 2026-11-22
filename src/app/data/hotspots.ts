export type Hotspot = {
  id: string;
  label: string;
  /** Marker position on the truck. */
  position: [number, number, number];
  /** Where the camera flies to when this hotspot is selected. */
  camera: [number, number, number];
  platform: string;
  /** Platform page slug under /platforms/ */
  slug: string;
  summary: string;
  checks: { title: string; detail: string }[];
};

// Truck space (public/models/fleetgo-truck.glb): +x is the front bumper, -z the driver side,
// wheels sit on y = 0 and the tractor is 7.6 units long.
export const HOTSPOTS: Hotspot[] = [
  {
    id: 'engine',
    label: 'Engine bay',
    position: [3.0, 1.72, 0],
    camera: [8.6, 5.4, -3.3],
    platform: 'PM Monitoring',
    slug: 'pm-monitoring',
    summary:
      'We track every PM interval by mileage and engine hours, then book the shop before the truck is due.',
    checks: [
      { title: 'Oil & filter interval', detail: 'Booked ahead of the due mileage, not after it.' },
      { title: 'Coolant level and leaks', detail: 'Flagged from inspections and fault codes.' },
      { title: 'Belts and hoses', detail: 'Wear noted at each PM and quoted before it fails.' },
      { title: 'Charging system', detail: 'Battery and alternator checked on every service.' },
    ],
  },
  {
    id: 'brakes',
    label: 'Brakes & air system',
    position: [-1.9, 0.55, -1.12],
    camera: [-4.2, 2.2, -7.6],
    platform: 'PTI Monitoring',
    slug: 'pti-monitoring',
    summary:
      'Brake and air-system defects from every pre-trip reach our team the same day.',
    checks: [
      { title: 'Lining thickness', detail: 'Measured at service and logged per wheel end.' },
      { title: 'Slack adjusters', detail: 'Out-of-adjustment reports routed to a shop fast.' },
      { title: 'Air lines and couplings', detail: 'Leaks and chafing caught on the walk-around.' },
      { title: 'Low-air warning', detail: 'Driver reports verified and closed out.' },
    ],
  },
  {
    id: 'tires',
    label: 'Tires & wheels',
    position: [2.6, 0.55, -1.12],
    camera: [5.4, 1.8, -7.4],
    platform: 'PTI Monitoring',
    slug: 'pti-monitoring',
    summary:
      'Tire problems are among the most common roadside calls, so we catch them at the pre-trip, not on the shoulder.',
    checks: [
      { title: 'Tread depth', detail: 'Steer and drive tires checked against DOT minimums.' },
      { title: 'Inflation pressure', detail: 'Low-pressure reports fixed before dispatch.' },
      { title: 'Lug torque', detail: 'Re-torqued after every wheel service.' },
      { title: 'Sidewall damage', detail: 'Cuts and bulges photographed and escalated.' },
    ],
  },
  {
    id: 'lights',
    label: 'Lights & reflectors',
    position: [3.2, 1.0, -0.95],
    camera: [9.2, 2.5, -4.2],
    platform: 'PTI Monitoring',
    slug: 'pti-monitoring',
    summary:
      'Lighting is one of the most cited roadside-inspection violations, so every PTI report gets checked.',
    checks: [
      { title: 'Headlamps and markers', detail: 'Burned-out lamps scheduled for a same-day fix.' },
      { title: 'Turn signals', detail: 'Verified on every pre-trip.' },
      { title: 'Brake lamps', detail: 'Checked before the truck leaves the yard.' },
      { title: 'Reflective tape', detail: 'Conspicuity tape kept to DOT spec.' },
    ],
  },
  {
    id: 'cab',
    label: 'Cab & telematics',
    position: [2.05, 2.6, -0.35],
    camera: [7.9, 5.5, -3.9],
    platform: 'RoadWatch',
    slug: 'roadwatch',
    summary:
      'RoadWatch keeps eyes on cameras, ELDs and safety events around the clock.',
    checks: [
      { title: 'Camera and ELD health', detail: 'Offline devices flagged the same shift.' },
      { title: 'Safety event feed', detail: 'Hard brakes and speeding reviewed by our team.' },
      { title: 'Driver-facing alerts', detail: 'We call the driver when an event needs action.' },
      { title: 'GPS fix quality', detail: 'Location gaps reported before they hide a problem.' },
    ],
  },
  {
    id: 'fuel',
    label: 'Fuel tanks',
    position: [0.0, 0.95, -1.18],
    camera: [0.7, 3.0, -7.9],
    platform: 'Fuel Saving',
    slug: 'fuel-saving',
    summary:
      'Every fill-up is planned against the best-priced stop on the route and matched to the receipt.',
    checks: [
      { title: 'Tank level by unit', detail: 'Stops planned from the real fuel level.' },
      { title: 'Fill-up matched to plan', detail: 'Each purchase checked against the recommendation.' },
      { title: 'Price paid vs median', detail: 'Savings measured per gallon, per stop.' },
      { title: 'Next planned stop', detail: 'Sent to the driver before they need it.' },
    ],
  },
];

/** Opening shot: front three-quarter on the driver side, showing the door logo. */
export const HOME_VIEW = { camera: [7.2, 3.1, -7.6] as [number, number, number], target: [0, 1.45, 0] as [number, number, number] };

export const MODEL_CREDIT = {
  text: 'Truck model by gelber on Sketchfab · CC BY 4.0 · recolored with FleetGO livery',
  url: 'https://sketchfab.com/3d-models/volvo-vnl-2025-70f96b5a3eaa429c8a1097abb1cfd3e9',
};
