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