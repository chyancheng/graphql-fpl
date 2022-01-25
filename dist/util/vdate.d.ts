export default class VDate {
    private date;
    constructor(date?: any, ignoreNegative?: boolean);
    /**
     * @description add n days to current time
     * @method addDay
     * @param {Number} n
     * @returns {vDate}
     */
    addDay(n: any): this;
    /**
     * @description add n months to current time
     * @param {Number} n
     * @returns {vDate}
     */
    addMonth(n: any): this;
    /**
     * @description add n hours to current time
     * @param {Number} n
     * @returns {vDate}
     */
    addHours(n: any): this;
    /**
     * @description add n minutes to current time
     * @param {Number} n
     * @returns {vDate}
     */
    addMinutes(n: any): this;
    /**
     * @description add n seconds to current time
     * @param {Number} n
     * @returns {vDate}
     */
    addSeconds(n: any): this;
    /**
     * @description add n years to current time
     * @param {Number} n
     * @returns {vDate}
     */
    addYear(n: any): this;
    /**
     * @description convert to Beijing timezone
     * @return {VDate}
     */
    toBJZone(): VDate;
    setHours(...args: any[]): this;
    setMinutes(...args: any[]): this;
    /**
     * @description get the native Date object
     * @returns {Date}
     */
    valueOf(): Date;
    /**
     * @description get timestamp
     * @returns {number}
     */
    getTime(): number;
    /**
     * @description get utc string
     */
    toString(): string;
    /**
     * @description
     * @param {String} format
     * @returns {String}
     */
    format(format?: any): any;
    /**
     * @description get the month difference between the input date and current date
     * @param {Date}
     * @return {Number}
     */
    diffMonth(date: any): number;
    /**
     * @description get the year difference between the input date and current date
     * @param {Date}
     * @return {Number}
     */
    diffYear(date: any): number;
    /**
     * @description check is date valid
     * @return {Boolean}
     */
    isValid(): boolean;
    static parse(value: any, isNative?: boolean, ignoreNegative?: any): any;
    /**
     * @description get the minute difference between the two input dates
     * @param ds1
     * @param ds2
     * @returns {number}
     */
    static minuteDiff(ds1: any, ds2: any): number;
    /**
     * @description get the hour difference between the two input dates
     * @param ds1
     * @param ds2
     * @returns {number}
     */
    static hourDiff(ds1: any, ds2: any): number;
    /**
     * @description get the day difference between the two input dates
     * @param {String} ds1
     * @param {String} ds2
     * @returns {Number}
     */
    static dayDiff(ds1: any, ds2: any): number;
    /**
     * @description get the month difference between the two input dates
     * @param d1
     * @param d2
     * @returns {Number|*}
     */
    static diffMonth(d1: any, d2: any): any;
    /**
     * @description get the year difference between the two input dates
     * @param d1
     * @param d2
     * @returns {Number|*}
     */
    static diffYear(d1: any, d2: any): any;
    /**
     * @description check the time is in the input range
     * @param {String} sTime  start time
     * @param {String} eTime  end time
     * @param {String} time
     * @returns {Boolean}
     */
    static timeRange(sTime: any, eTime: any, time: any): boolean;
    /**
     * @description format time to the specified string
     * @param {String} str
     * @returns {String|*}
     */
    static format(date: any, str: any, ignoreNegative?: any): any;
    /**
     * @description handle timezone, default Beijing timezone
     * @param {number} timeStamp
     */
    static handleZone(timeStamp: any): any;
    /**
     * @description transform date to timestamp
     * @eg transform("/Date(1395331200000+0800)/") => 1395331200000
     */
    static transformTimeStamp(dateStr: any): any;
    /**
     * @description transform date to timestamp
     * @param dateStr
     * @returns {*}
     * @eg 2019-03-06T13:30:00.000+08:00 => 1551850200000
     */
    static transformTimeStampISO8601(dateStr: any): number;
    static transformServerDate(timeStamp: any): string;
    static isCrossYear(date: any, ignoreNegative?: any): boolean;
}
