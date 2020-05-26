export interface ColorSettings {
    customEventStyle: Style;
    holidayStyle: Style;
    weekendStyle: Style;
    monthStyle: Style;
}

export interface Style {
    color: String;
    text: TextSettings;
    bold: boolean;
    italic: boolean;
    underline: boolean;
}

export interface TextSettings {
    size: number;
    fontFamily: String;
    placement: TextPlacement;
}

export enum TextPlacement {
    Left,
    Center,
    Right
}