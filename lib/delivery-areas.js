export const DELIVERY_CITIES = [
  {
    slug: "los-angeles",
    name: "Los Angeles",
    state: "California",
    match: ["LA", "Greater LA", "DTLA", "Hollywood", "Mid-City", "Venice", "Melrose", "Westwood", "Fairfax", "Abbot Kinney", "LA Metro"],
  },
  {
    slug: "las-vegas",
    name: "Las Vegas",
    state: "Nevada",
    match: ["Las Vegas", "Henderson"],
  },
  {
    slug: "denver",
    name: "Denver",
    state: "Colorado",
    match: ["Denver", "Aurora", "Boulder"],
  },
  {
    slug: "phoenix",
    name: "Phoenix",
    state: "Arizona",
    match: ["Phoenix", "Scottsdale", "Tempe"],
  },
];

export const MIN_LIVE_SERVICES = 2;

export function shopServesCity(serviceArea, city) {
  const area = String(serviceArea ?? "");
  return city.match.some((token) => {
    const re = new RegExp(`(^|[^A-Za-z])${token.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}([^A-Za-z]|$)`, "i");
    return re.test(area);
  });
}
