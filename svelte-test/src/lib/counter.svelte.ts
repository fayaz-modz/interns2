let count = $state(0);

export function inc() {
	count++;
}

export function dec() {
	count--;
}

export function show() {
	return count;
}
