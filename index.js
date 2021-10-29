/* eslint-disable no-bitwise, require-jsdoc, require-unicode-regexp */
import {customAlphabet} from 'nanoid';

const alpha = '0123456789abcdefghijklmnopqrstuvwxyz';
const alphaReverse = [];
const alphaLength = alpha.length;
const rankLength = 64;

export const rankRegex = new RegExp('^[' + alpha + ']{' + rankLength + '}$');
const nanoid = customAlphabet(alpha, rankLength);

for(let i = 0; i < alphaLength; i++) {
	alphaReverse[alpha[i]] = i;
}

export function middle() {
	return (alpha[alphaLength / 2 << 0] + nanoid()).substr(0, rankLength);
}

export function after(fromRank) {
	const newRank = step(fromRank, 1);

	if(newRank <= fromRank) {
		throw new Error('Failed rank: ' + newRank);
	}

	return newRank;
}

export function before(fromRank) {
	const newRank = step(fromRank, -1);

	if(newRank >= fromRank) {
		throw new Error('Failed rank: ' + newRank);
	}

	return newRank;
}

export function between(a, b) {
	verifyRank(a);
	verifyRank(b);

	if(a === b) {
		throw new Error('Ranks are identical - there is nothing between.');
	}

	let newRank = '';

	for(let i = 0; i < rankLength; i++) {
		const ai = alphaReverse[a[i]];
		const bi = alphaReverse[b[i]];

		if(bi - ai < 2) {
			newRank += a[i];
		}
		else {
			const newIndex = (ai < bi ? (ai + bi) : (ai + alphaLength)) / 2;

			newRank += alpha[newIndex << 0];
			break;
		}
	}

	newRank = (newRank + nanoid()).substr(0, rankLength);

	if(newRank <= a || newRank >= b) {
		throw new Error('Failed rank: ' + newRank);
	}

	return newRank;
}

function step(fromRank, steps) {
	verifyRank(fromRank);

	let toRank = '';
	let i = rankLength / 2 << 0;

	while(i--) {
		const newChar = alpha[alphaReverse[fromRank[i]] + steps];

		if(newChar) {
			toRank = newChar + toRank;
			break;
		}
	}

	return (fromRank.substring(0, i) + toRank + nanoid()).substr(0, rankLength);
}

function verifyRank(rank) {
	if(typeof rank !== 'string' || rank.length !== rankLength || !rankRegex.test(rank)) {
		throw new Error('Invalid rank: ' + rank);
	}
}