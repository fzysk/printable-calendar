export interface ColorSettings {
    customEventStyle: Style;
    holidayStyle: Style;
    weekendStyle: Style;
    monthStyle: Style;
}

export interface Style {
    color: string;
    text: TextSettings;
    bold: boolean;
    italic: boolean;
    underline: boolean;
}

export interface TextSettings {
    size: number;
    fontFamily: string;
    placement: TextPlacement;
}

export enum TextPlacement {
    Left,
    Center,
    Right
}

export class DefaultColorSettings implements ColorSettings {
    customEventStyle: Style = { 
        color: "#6202AB", 
        text: {
            size: 12,
            fontFamily: "Arial",
            placement: TextPlacement.Left
        },
        bold: true,
        italic: false,
        underline: false
    };
    holidayStyle: Style = { 
        color: "#bf0000", 
        text: {
            size: 12,
            fontFamily: "Arial",
            placement: TextPlacement.Left
        },
        bold: true,
        italic: false,
        underline: false
    };
    weekendStyle: Style = { 
        color: "#bf0000", 
        text: {
            size: 12,
            fontFamily: "Arial",
            placement: TextPlacement.Left
        },
        bold: true,
        italic: false,
        underline: false
    };
    monthStyle: Style = { 
        color: "#333333", 
        text: {
            size: 15,
            fontFamily: "Arial",
            placement: TextPlacement.Center
        },
        bold: true,
        italic: false,
        underline: false
    };
}

const multiColor = "#CCCCCC";
const allColors = [
    "#1FBC9C", "#1CA085", "#2ECC70", "#27AF60", // green
    "#3398DB", "#2980B9", "#A463BF", "#8E43AD", // blue
    "#3D556E", "#222F3D", "#F2C511", "#F39C19", // black and yellow
    "#E84B3C", "#C0382B", "#DDE6E8", "#BDC3C8",  // red and white
    multiColor                                          // empty for multicolor
];

const titleColors = [
    ...allColors.slice(8, 12), multiColor
]
const holidayColors = [
    allColors[12], allColors[13], allColors[6], allColors[7], multiColor
];
const nonHolidayColors = [
    allColors[14], allColors[15], allColors[10], allColors[11], multiColor
];
const customEventsColors = [
    allColors.slice(4, 8), multiColor
]

export {titleColors, holidayColors, nonHolidayColors, customEventsColors, multiColor};