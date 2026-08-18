/**
 * Which canvas background to render behind the site.
 *
 *   'phylogram'        rectangular phylograms — correct tree geometry, amber tips
 *   'alignment'        multiple sequence alignment blocks with conservation shading
 *   'bgc'              antiSMASH-style biosynthetic gene cluster arrow tracks
 *   'phylogram-legacy' the original diagonal/fractal tree animation, kept verbatim
 *   'none'             no background
 *
 * Change the value below, commit, push. It is baked in at build time, so only
 * the chosen variant ships.
 */
export type BackgroundVariant =
	| 'phylogram'
	| 'alignment'
	| 'bgc'
	| 'phylogram-legacy'
	| 'none';

export const BACKGROUND: BackgroundVariant = 'phylogram';

/**
 * Endpoint for the "Ask" (Gemini) mode of site search — the URL of the
 * Cloudflare Worker that proxies Gemini (e.g. 'https://ask-pavlo.<sub>.workers.dev/ask').
 *
 * Leave empty to ship search as Pagefind-only: the "Ask" toggle is hidden and
 * nothing calls out to the Worker. Set it once the Worker is deployed to switch
 * the conversational mode on. Baked in at build time.
 */
export const ASK_ENDPOINT: string = 'https://ask-pavlo.pavlohrab.workers.dev';
