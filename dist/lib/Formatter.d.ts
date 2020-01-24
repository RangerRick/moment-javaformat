declare type Moment = any;
export declare const findAbbreviationForOffset: (offset: number) => string;
export declare const getDescriptionForAbbreviation: (abbr: string) => string;
export declare const getZoneForDateTime: (dateTime: any) => string;
export declare const toAbsString: (value: string | number) => string;
export declare const zeroPad: (input: string | number, length: number) => string;
export declare class Token {
    token: string;
    count: number;
    constructor(value: string, count?: number);
    increment(): number;
    equals(token: Token): boolean;
    toString(): string;
}
export declare abstract class Formatter {
    /**
     * Tokenize a format string, given a character or tuple to represent literal values.
     *
     * @param {string} formatString the string to format
     * @param {string[] | string} literalBoundary the boundary values for string literals
     */
    static tokenize(formatString: string, literalBoundary: string[] | string): Array<Token | string>;
    /**
     * Convert a moment into a formatted date string.
     *
     * @param {Moment} moment - the moment to convert
     * @param {string} formatString - the format string
     */
    abstract format(moment: Moment, formatString: string): string;
}
export {};
//# sourceMappingURL=Formatter.d.ts.map