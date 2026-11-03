export type Story = { id: string; timestamp: string; expiresAt: string; mediaType: 'IMAGE' | 'VIDEO'; mediaUrl: string; permalink: string; thumbnailUrl?: string };
export const storyLifetime: number;
export function safeInstagramUrl(value: unknown, media?: boolean): string | null;
export function currentStories(snapshot: unknown, now?: number): Story[];
