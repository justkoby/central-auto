// Side-view EVs drawn as flat tone steps (a lit face and a shaded face, no gradients).
// Used only where no photograph of an electric vehicle exists in the project.
const bodies = {
  city: {
    label: 'Compact electric hatchback',
    body: 'M152 296 L150 242 C150 228 158 218 170 212 L246 160 C264 144 288 132 320 130 L520 130 C568 132 600 154 644 198 L724 214 C766 224 828 236 846 258 C850 268 850 282 850 296 Z',
    glassA: 'M268 198 L304 150 C312 142 324 140 336 140 L440 140 L440 198 Z',
    glassB: 'M458 140 L520 140 C550 142 572 158 606 198 L458 198 Z',
    shut: [448, 140, 296],
    wheels: [272, 712], r: 40, lamp: 832,
  },
  crossover: {
    label: 'Electric family crossover',
    body: 'M118 300 L116 240 C116 224 126 212 142 204 L236 152 C262 120 302 100 352 98 L604 98 C664 100 704 128 742 182 L810 198 C854 208 888 226 896 258 C900 272 900 288 900 300 Z',
    glassA: 'M262 192 L300 140 C316 120 336 112 360 112 L470 112 L470 192 Z',
    glassB: 'M490 112 L600 112 C640 114 668 134 700 192 L490 192 Z',
    shut: [480, 112, 300],
    wheels: [252, 766], r: 44, lamp: 884,
  },
};

// Teaser treatment: the car is a dark shape lit from behind, with a rim light along the roofline.
// It deliberately does not imitate photography.
export default function EvDrawing({ variant = 'city', body = '#03211a', glass = '#07342a', edge = '#8fe3c4', ring = '#0c3b30', className = '' }) {
  const d = bodies[variant];
  const cy = 320 - d.r;
  const front = d.wheels[1];
  const id = `clip-${variant}`;
  return (
    <svg className={className} viewBox="0 0 1000 340" role="img" aria-label={d.label} xmlns="http://www.w3.org/2000/svg">
      <defs><clipPath id={id}><rect x="0" y="0" width="1000" height="214" /></clipPath></defs>
      <ellipse cx="500" cy="322" rx="440" ry="12" fill="#000" opacity=".45" />
      <path d={d.body} fill={body} />
      <path d={d.glassA} fill={glass} />
      <path d={d.glassB} fill={glass} />
      <path d={d.body} fill="none" stroke={edge} strokeWidth="3.5" strokeLinejoin="round" clipPath={`url(#${id})`} />
      <path d={`M${d.shut[0]} ${d.shut[1] + 56} L${d.shut[0]} ${d.shut[2]}`} stroke={glass} strokeWidth="3" />
      {/* lamps and charge port */}
      <path d={`M${d.lamp - 24} 226 L${d.lamp + 2} 232 L${d.lamp + 4} 244 L${d.lamp - 24} 238 Z`} fill="#fff4d6" />
      <rect x={d.wheels[0] - d.r - 46} y="222" width="14" height="26" fill="#ed6739" />
      <circle cx={front + 66} cy="216" r="6" fill="#7ee0b5" />
      {d.wheels.map((x) => (
        <g key={x}>
          <circle cx={x} cy={cy} r={d.r + 10} fill="#010203" />
          <circle cx={x} cy={cy} r={d.r} fill="#05080c" />
          <circle cx={x} cy={cy} r={d.r * 0.62} fill={ring} />
          <circle cx={x} cy={cy} r={d.r * 0.2} fill="#05080c" />
        </g>
      ))}
    </svg>
  );
}
