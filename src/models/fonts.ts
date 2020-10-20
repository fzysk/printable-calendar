export class Font {
	familyName: string;
	genericFamily: string;

	constructor(familyName: string, genericFamily: string) {
		this.familyName = familyName;
		this.genericFamily = genericFamily;
	}

	public toFriendlyName() {
		const names = this.familyName.split(",", 3);
		return names[0].replace(/"/g, "");
	}

	public toCssEntry() {
		return this.familyName + ", " + this.genericFamily;
	}
}

export const knownFonts: Font[] = [
	// serif fonts
	new Font("Georgia", "serif"),
	new Font('Palatino Linotype", "Book Antiqua", Palatino', "serif"),
	new Font('"Times New Roman", Times', "serif"),

	// sans-serif
	new Font("Arial, Helvetica", "sans-serif"),
	new Font('"Arial Black", Gadget', "sans-serif"),
	new Font('"Comic Sans MS", cursive', "sans-serif"),
	new Font("Impact, Charcoal", "sans-serif"),
	new Font('"Lucida Sans Unicode", "Lucida Grande"', "sans-serif"),
	new Font("Tahoma, Geneva", "sans-serif"),
	new Font('"Trebuchet MS", Helvetica', "sans-serif"),
	new Font("Verdana, Geneva", "sans-serif"),

	// monospace
	new Font('"Courier New", Courier', "monospace"),
	new Font('"Lucida Console", Monaco', "monospace")
]