declare module 'rank' {
	export const rankRegex: RegExp;
	export function middle(): string;
	export function after(fromRank: string): string;
	export function before(fromRank: string): string;
	export function between(a: string, b: string): string;
}