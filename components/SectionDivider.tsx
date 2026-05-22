export default function SectionDivider({ flip = false }: { flip?: boolean }) {
  return (
    <div
      className="w-full h-12 bg-charcoal"
      style={{
        clipPath: flip
          ? 'polygon(0 100%, 100% 0, 100% 100%)'
          : 'polygon(0 0, 100% 0, 100% 100%)',
      }}
    />
  );
}
