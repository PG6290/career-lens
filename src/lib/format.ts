export function formatDate(iso: string) {
  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(iso));
}

export function timeAgo(iso: string) {
  const delta = Date.now() - new Date(iso).getTime();
  const hours = Math.round(delta / 36e5);
  if (hours < 24) return `${Math.max(1, hours)}h ago`;
  const days = Math.round(hours / 24);
  if (days < 14) return `${days}d ago`;
  return formatDate(iso);
}

export function matchTone(score: number) {
  if (score >= 80) return "high";
  if (score >= 60) return "mid";
  return "low";
}

export function initials(name: string) {
  return name
    .split(" ")
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}
