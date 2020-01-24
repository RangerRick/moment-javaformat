declare type Moment = any;
import { Formatter } from '../Formatter';
export default class DateTimeFormatter extends Formatter {
    /**
     * Convert a moment into a formatted date string, using the format tokens defined at: https://docs.oracle.com/javase/8/docs/api/java/time/format/DateTimeFormatter.html
     *
     * @param {Moment} moment - the moment to convert
     * @param {string} formatString - the format string
     */
    format(moment: Moment, formatString: string): string;
}
export {};
//# sourceMappingURL=DateTimeFormatter.d.ts.map