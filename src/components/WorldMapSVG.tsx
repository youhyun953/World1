import { Check, Lock, Plane } from 'lucide-react';
import { Country } from '../types/game';

interface WorldMapSVGProps {
  countries: Country[];
  selectedCountryId: string;
  unlockedCountries: string[];
  visitedCountries: string[];
  unlockAllMode: boolean;
  continentFilter: string;
  onSelectCountry: (countryId: string) => void;
}

// Equirectangular projection into 1000x500 viewBox
function projectCoords(lat: number, lng: number): { x: number; y: number } {
  const x = ((lng + 180) / 360) * 1000;
  const y = ((90 - lat) / 180) * 500;
  return { x, y };
}

// Continent viewBox focus presets for zoom clarity
const CONTINENT_VIEWBOX: Record<string, string> = {
  전체: '0 20 1000 450',
  유럽: '410 45 200 135',
  아시아: '620 65 320 200',
  북아메리카: '80 40 320 200',
  아프리카: '420 140 240 210',
};

export function WorldMapSVG({
  countries,
  selectedCountryId,
  unlockedCountries,
  visitedCountries,
  unlockAllMode,
  continentFilter,
  onSelectCountry,
}: WorldMapSVGProps) {
  const viewBox = CONTINENT_VIEWBOX[continentFilter] || CONTINENT_VIEWBOX['전체'];

  const isUnlocked = (id: string) => unlockAllMode || unlockedCountries.includes(id);

  // Build flight route arcs between sequential countries
  const routeArcs = countries
    .slice(0, -1)
    .map((country, idx) => {
      const next = countries[idx + 1];
      const p1 = projectCoords(country.coordinates.lat, country.coordinates.lng);
      const p2 = projectCoords(next.coordinates.lat, next.coordinates.lng);
      const midX = (p1.x + p2.x) / 2;
      const dist = Math.hypot(p2.x - p1.x, p2.y - p1.y);
      const midY = Math.min(p1.y, p2.y) - Math.min(60, dist * 0.22);
      const active = isUnlocked(country.countryId) && isUnlocked(next.countryId);
      return {
        key: `${country.countryId}-${next.countryId}`,
        d: `M ${p1.x} ${p1.y} Q ${midX} ${midY} ${p2.x} ${p2.y}`,
        active,
      };
    });

  return (
    <div className="relative w-full overflow-hidden rounded-xl border border-slate-200 bg-sky-50">
      <svg
        viewBox={viewBox}
        className="w-full h-auto min-h-[280px] sm:min-h-[380px] lg:min-h-[440px] transition-all duration-500 select-none"
        role="img"
        aria-label="세계지도 탐험 인터랙티브 맵"
      >
        <defs>
          <linearGradient id="oceanGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#E0F2FE" />
            <stop offset="100%" stopColor="#F0F9FF" />
          </linearGradient>
        </defs>

        {/* Ocean Background */}
        <rect x="0" y="0" width="1000" height="500" fill="url(#oceanGrad)" />

        {/* Latitude / Longitude Graticule */}
        <g stroke="#BAE6FD" strokeWidth="0.7" strokeDasharray="3 4" opacity="0.8">
          <line x1="0" y1="250" x2="1000" y2="250" stroke="#7DD3FC" strokeWidth="1" />
          <line x1="500" y1="0" x2="500" y2="500" stroke="#7DD3FC" strokeWidth="1" />
          <line x1="0" y1="125" x2="1000" y2="125" />
          <line x1="0" y1="375" x2="1000" y2="375" />
          <line x1="250" y1="0" x2="250" y2="500" />
          <line x1="750" y1="0" x2="750" y2="500" />
        </g>

        {/* Simplified Geographically Accurate Continent Silhouettes */}
        <g fill="#E2E8F0" stroke="#CBD5E1" strokeWidth="1.1" strokeLinejoin="round">
          {/* North America */}
          <path d="M 70 72 L 155 58 L 238 56 L 315 74 L 348 104 L 325 136 L 296 164 L 274 192 L 245 212 L 222 218 L 210 198 L 185 186 L 166 154 L 138 134 L 94 114 L 68 92 Z" />
          {/* Greenland */}
          <path d="M 332 34 L 392 26 L 418 52 L 385 82 L 342 74 Z" />
          {/* Central America / Caribbean */}
          <path d="M 224 218 L 252 222 L 270 242 L 254 248 L 234 234 Z" />
          {/* South America */}
          <path d="M 268 248 L 318 250 L 366 286 L 382 326 L 352 384 L 320 434 L 296 446 L 284 402 L 272 342 L 258 292 Z" />
          {/* Europe */}
          <path d="M 455 138 L 462 110 L 492 84 L 540 72 L 582 78 L 594 106 L 574 134 L 548 148 L 532 162 L 512 150 L 488 158 L 468 152 Z" />
          {/* UK & Ireland */}
          <path d="M 476 104 L 494 96 L 502 114 L 482 122 Z" />
          {/* Africa */}
          <path d="M 452 170 L 506 164 L 560 174 L 596 208 L 622 238 L 598 286 L 576 336 L 546 356 L 520 330 L 508 282 L 472 254 L 444 218 Z" />
          {/* Madagascar */}
          <path d="M 608 310 L 624 302 L 626 336 L 610 340 Z" />
          {/* Asia */}
          <path d="M 580 78 L 664 62 L 775 64 L 882 82 L 928 110 L 892 146 L 856 184 L 818 214 L 784 226 L 748 228 L 714 218 L 680 236 L 642 204 L 606 196 L 574 168 L 562 134 Z" />
          {/* Japan Archipelago */}
          <path d="M 874 136 L 896 124 L 906 144 L 886 164 L 868 160 Z" />
          {/* Southeast Asia Islands */}
          <path d="M 762 246 L 802 242 L 826 264 L 788 272 Z" />
          {/* Australia */}
          <path d="M 812 318 L 876 306 L 924 334 L 916 382 L 866 394 L 818 372 Z" />
          {/* New Zealand */}
          <path d="M 946 378 L 962 368 L 964 398 L 948 402 Z" />
        </g>

        {/* Subtle Landmass Highlight for Active Target Continent */}
        <g fill="none">
          {routeArcs.map((arc) => (
            <path
              key={arc.key}
              d={arc.d}
              stroke={arc.active ? '#0D9488' : '#94A3B8'}
              strokeWidth={arc.active ? 1.8 : 1.1}
              strokeDasharray="5 5"
              className={arc.active ? 'animate-flight-dash' : ''}
              opacity={arc.active ? 0.75 : 0.4}
            />
          ))}
        </g>

        {/* Country Pins */}
        {countries.map((country) => {
          const { x, y } = projectCoords(country.coordinates.lat, country.coordinates.lng);
          const unlocked = isUnlocked(country.countryId);
          const visited = visitedCountries.includes(country.countryId);
          const selected = selectedCountryId === country.countryId;
          const dimmedByFilter =
            continentFilter !== '전체' && country.continent !== continentFilter;

          return (
            <g
              key={country.countryId}
              transform={`translate(${x}, ${y})`}
              onClick={() => onSelectCountry(country.countryId)}
              className="cursor-pointer"
              opacity={dimmedByFilter ? 0.35 : 1}
              role="button"
              tabIndex={0}
              aria-label={`${country.countryName} (${unlocked ? '탐험 가능' : '잠김'})`}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onSelectCountry(country.countryId);
                }
              }}
            >
              {/* Selection halo */}
              {selected && (
                <circle r={continentFilter === '전체' ? 17 : 10} fill="#0D9488" opacity={0.18} />
              )}

              {/* Pin Circle */}
              <circle
                r={continentFilter === '전체' ? (selected ? 10 : 8) : selected ? 6.5 : 5}
                fill={
                  visited
                    ? '#0D9488'
                    : unlocked
                    ? '#0284C7'
                    : '#94A3B8'
                }
                stroke="#FFFFFF"
                strokeWidth={continentFilter === '전체' ? 2.2 : 1.5}
              />

              {/* Label pill-free crisp text */}
              <text
                y={continentFilter === '전체' ? -13 : -9}
                textAnchor="middle"
                fontSize={continentFilter === '전체' ? 11 : 6.5}
                fontWeight={selected ? 700 : 600}
                fill={selected ? '#0F766E' : unlocked ? '#0F172A' : '#64748B'}
                style={{ paintOrder: 'stroke', stroke: '#F0F9FF', strokeWidth: continentFilter === '전체' ? 3.5 : 2 }}
              >
                {country.flag} {country.countryName}
              </text>
            </g>
          );
        })}
      </svg>

      {/* Map Legend Strip */}
      <div className="bg-white/95 border-t border-slate-200 px-4 py-2.5 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-600">
        <div className="flex flex-wrap items-center gap-4">
          <span className="inline-flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-teal-600 inline-flex items-center justify-center">
              <Check className="w-2 h-2 text-white" aria-hidden="true" />
            </span>
            <span>방문 완료</span>
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-sky-600 inline-flex items-center justify-center">
              <Plane className="w-2 h-2 text-white" aria-hidden="true" />
            </span>
            <span>탐험 가능</span>
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-slate-400 inline-flex items-center justify-center">
              <Lock className="w-2 h-2 text-white" aria-hidden="true" />
            </span>
            <span>잠김</span>
          </span>
        </div>
        <span className="text-slate-500">국가를 클릭하여 지리 정보와 여행 미션을 확인하세요</span>
      </div>
    </div>
  );
}
