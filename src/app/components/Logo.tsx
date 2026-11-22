import logo from '../../assets/brand/fleetgo-logo.webp';

/** The official FleetGO badge, taken from the brand master file (corners made transparent). */
export default function Logo({ className = 'h-8' }: { className?: string }) {
  return (
    <img
      src={logo}
      width={800}
      height={272}
      alt="FleetGO"
      draggable={false}
      className={`${className} w-auto select-none`}
    />
  );
}
