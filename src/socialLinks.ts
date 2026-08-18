import type { iconPaths } from './components/IconPaths';

/** Social / academic profile links, shown in the footer. */
export const socialLinks: { label: string; href: string; icon: keyof typeof iconPaths }[] = [
	{ label: 'GitHub', href: 'https://github.com/pavlohrab', icon: 'github-logo' },
	{ label: 'LinkedIn', href: 'https://linkedin.com/in/phrab', icon: 'linkedin-logo' },
	{ label: 'Google Scholar', href: 'https://scholar.google.com/citations?user=VKJQl6UAAAAJ', icon: 'scholar-logo' },
	{ label: 'ResearchGate', href: 'https://researchgate.net/profile/Pavlo-Hrab-2', icon: 'researchgate-logo' },
	{ label: 'ORCID', href: 'https://orcid.org/0000-0002-0742-8478', icon: 'orcid-logo' },
];
