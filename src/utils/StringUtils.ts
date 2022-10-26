export class StringUtils {
	static replaceAll(
		value: string,
		replaceThis: string,
		replaceFrom: string
	): string {
		let currentValue = value;
		while (currentValue.includes(replaceThis)) {
			currentValue = currentValue.replace(replaceThis, replaceFrom);
		}
		return currentValue;
	}
}
