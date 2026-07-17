import logoAsset from "@/assets/norvenxa-logo.jpeg.asset.json";

export function Logo({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <img
      src="/favicon.png"
      alt="NORVENXA"
      className={className}
      loading="eager"
      decoding="async"
    />
  );
}
