declare type Moment = any;
export declare const findAbbreviationForOffset: (offset: number) => string | null;
export declare const getDescriptionForAbbreviation: (abbr: string) => string | null;
export declare const getZoneForDateTime: (dateTime: string | Moment) => string | null;
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
     * Tokenize a format string.
     *
     * @param {string} formatString the string to format
     */
    abstract tokenize(formatString: string): Array<Token | string>;
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