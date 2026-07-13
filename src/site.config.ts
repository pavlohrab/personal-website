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
