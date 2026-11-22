export type Hotspot = {
  id: string;
  label: string;
  /** Marker position on the truck. */
  position: [number, number, number];
  /** Where the camera flies to when this hotspot is selected. */
  camera: [number, number, number];
  platform: string;
  checks: string[];
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
    checks: ['Oil & filter interval', 'Coolant level and leaks', 'Belts and hoses', 'Charging system'],
  },
  {
    id: 'brakes',
    label: 'Brakes & air system',
    position: [-1.9, 0.55, -1.12],
    camera: [-4.2, 2.2, -7.6],
    platform: 'PTI Monitoring',
    checks: ['Lining thickness', 'Slack adjusters', 'Air lines and couplings', 'Low-air warning'],
  },
  {
    id: 'tires',
    label: 'Tires & wheels',
    position: [2.6, 0.55, -1.12],
    camera: [5.4, 1.8, -7.4],
    platform: 'PTI Monitoring',
    checks: ['Tread depth', 'Inflation pressure', 'Lug torque', 'Sidewall damage'],
  },
  {
    id: 'lights',
    label: 'Lights & reflectors',
    position: [3.2, 1.0, -0.95],
    camera: [9.2, 2.5, -4.2],
    platform: 'PTI Monitoring',
    checks: ['Headlamps and markers', 'Turn signals', 'Brake lamps', 'Reflective tape'],
  },
  {
    id: 'cab',
    label: 'Cab & telematics',
    position: [2.05, 2.6, -0.35],
    camera: [7.9, 5.5, -3.9],
    platform: 'RoadWatch',
    checks: ['Camera and ELD health', 'Safety event feed', 'Driver-facing alerts', 'GPS fix quality'],
  },
  {
    id: 'fuel',
    label: 'Fuel tanks',
    position: [0.0, 0.95, -1.18],
    camera: [0.7, 3.0, -7.9],
    platform: 'Fuel Saving',
    checks: ['Tank level by unit', 'Fill-up matched to plan', 'Price paid vs median', 'Next planned stop'],
  },
];

/** Opening shot: front three-quarter on the driver side, showing the door logo. */
export const HOME_VIEW = { camera: [7.2, 3.1, -7.6] as [number, number, number], target: [0, 1.45, 0] as [number, number, number] };

export const MODEL_CREDIT = {
  text: 'Truck model by gelber on Sketchfab · CC BY 4.0 · recolored with FleetGO livery',
  url: 'https://sketchfab.com/3d-models/volvo-vnl-2025-70f96b5a3eaa429c8a1097abb1cfd3e9',
};
