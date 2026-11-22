export type Hotspot = {
  id: string;
  label: string;
  position: [number, number, number];
  platform: string;
  checks: string[];
};

// Positions are in the truck's local space: +x is the front bumper, +z the driver-visible side.
export const HOTSPOTS: Hotspot[] = [
  {
    id: 'engine',
    label: 'Engine bay',
    position: [2.45, 2.15, 0],
    platform: 'PM Monitoring',
    checks: ['Oil & filter interval', 'Coolant level and leaks', 'Belts and hoses', 'Charging system'],
  },
  {
    id: 'brakes',
    label: 'Brakes & air system',
    position: [-2.45, 0.5, 1.4],
    platform: 'PTI Monitoring',
    checks: ['Lining thickness', 'Slack adjusters', 'Air lines and couplings', 'Low-air warning'],
  },
  {
    id: 'tires',
    label: 'Tires & wheels',
    position: [2.6, 0.5, 1.4],
    platform: 'PTI Monitoring',
    checks: ['Tread depth', 'Inflation pressure', 'Lug torque', 'Sidewall damage'],
  },
  {
    id: 'lights',
    label: 'Lights & reflectors',
    position: [3.5, 1.2, 0.85],
    platform: 'PTI Monitoring',
    checks: ['Headlamps and markers', 'Turn signals', 'Brake lamps', 'Reflective tape'],
  },
  {
    id: 'cab',
    label: 'Cab & telematics',
    position: [0.75, 2.75, 1.25],
    platform: 'RoadWatch',
    checks: ['Camera and ELD health', 'Safety event feed', 'Driver-facing alerts', 'GPS fix quality'],
  },
  {
    id: 'fuel',
    label: 'Fuel tanks',
    position: [-0.15, 0.9, 1.65],
    platform: 'Fuel Saving',
    checks: ['Tank level by unit', 'Fill-up matched to plan', 'Price paid vs median', 'Next planned stop'],
  },
];
