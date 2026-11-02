import type { APIRoute } from 'astro';
import donkeyOutline from '../../materials/svg/donkey2-outline.svg?raw';

// Site icon: the donkey2 outline in Tailwind red-500, built from the same source SVG as the homepage.
const d = donkeyOutline.match(/ d="([^"]+)"/)?.[1] ?? '';

// The outline is 375 x 285; pad it to a square, and use a heavy stroke so it still reads at 16px.
const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="-12 -57 399 399">
<path d="${d}" fill="none" stroke="#fb2c36" stroke-width="22" stroke-linejoin="round" stroke-linecap="round"/>
</svg>
`;

export const GET: APIRoute = () => new Response(svg, { headers: { 'Content-Type': 'image/svg+xml' } });
