export type VectorPropProps = {
  className?: string;
  size?: number;
  rotation?: number;
  accent?: "blue" | "green" | "red" | "orange" | "yellow";
};

const accentMap = {
  blue: "#1baee8",
  green: "#20c98a",
  red: "#ff5664",
  orange: "#ff8a4d",
  yellow: "#ffd457",
};

export function useAccent(accent?: VectorPropProps["accent"], fallback = "#2d3036") {
  return accent ? accentMap[accent] : fallback;
}
