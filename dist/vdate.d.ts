export default class VDate {
    private date;
    constructor(date?: any, ignoreNegative?: boolean);
    /**
     * @description 当前时间加n天
     * @method addDay
     * @param {Number} n
     * @returns {vDate}
     */
    addDay(n: any): this;
    /**
     * @description 当前时间加n月
     * @param {Number} n
     * @returns {vDate}
     */
    addMonth(n: any): this;
    /**
     * @description 当前时间加n个小时
     * @param {Number} n
     * @returns {vDate}
     */
    addHours(n: any): this;
    /**
     * 当前时间基础上增加n分
     * @param {Number} n
     * @returns {vDate}
     */
    addMinutes(n: any): this;
    /**
     * 当前时间基础上增加n秒
     * @param {Number} n
     * @returns {vDate}
     */
    addSeconds(n: any): this;
    /**
     * @description 当前时间加n年
     * @param {Number} n
     * @returns {vDate}
     */
    addYear(n: any): this;
    /**
     * 转换为北京时区
     * return {VDate} 新的Vdate实例
     */
    toBJZone(): VDate;
    /**
     * @description 设置当前时间的小时，分，秒
     */
    setHours(...args: any[]): this;
    /**
     * @description 设置当前时间分 秒 毫秒
     */
    setMinutes(...args: any[]): this;
    /**
     * 获得原生Date对象
     * @returns {Date}
     */
    valueOf(): Date;
    /**
     * 获得毫秒数
     * @returns {number} 毫秒
     */
    getTime(): number;
    /**
     * 获得utc时间字符串
     */
    toString(): string;
    /**
     * @description
     * @param {String} format
     * @returns {String}
     */
    format(format?: any): any;
    /**
     * @description 返回输入Date的相差的月份数
     * @param {Date} 要计算的时间
     * @return {Number} 月数
     */
    diffMonth(date: any): number;
    /**
    * @description 返回输入Date的相差的年份数
    * @param {Date} 要计算的时间
    * @return {Number} 年数
    */
    diffYear(date: any): number;
    /**
     * @description 返回日期是否合法
     * @return {Boolean}
     */
    isValid(): boolean;
    static parse(value: any, isNative?: boolean, ignoreNegative?: any): any;
    /**
     * 返回两个日期相差分钟数
     * @param ds1
     * @param ds2
     * @returns {number}
     */
    static minuteDiff(ds1: any, ds2: any): number;
    /**
     * 返回两个日期相差小时数
     * @param ds1
     * @param ds2
     * @returns {number}
     */
    static hourDiff(ds1: any, ds2: any): number;
    /**
     * 返回两个日期相差的天数
     * @static
     * @param {String} ds1  日期1
     * @param {String} ds2  日期2
     * @returns {Number} num 相差天数
     */
    static dayDiff(ds1: any, ds2: any): number;
    /**
     * 计算两个时间的相隔月份数
     * @static
     * @param d1
     * @param d2
     * @returns {Number|*}
     */
    static diffMonth(d1: any, d2: any): any;
    /**
     * 计算两个时间的相隔年份数
     * @static
     * @param d1
     * @param d2
     * @returns {Number|*}
     */
    static diffYear(d1: any, d2: any): any;
    /**
     * 判断一个日期是否在一个时间区间内
     * @static
     * @param {String} sTime  时间区间，start
     * @param {String} eTime  时间区间，end
     * @param {String} time  时间
     * @returns {Boolean} true、false 在 or 不在
     */
    static timeRange(sTime: any, eTime: any, time: any): boolean;
    /**
     * 日期类型格式化为指定字符串
     * @static
     * @param {String} str
     * @returns {String|*}
     */
    static format(date: any, str: any, ignoreNegative?: any): any;
    /**
     * @static
     * param {number} timeStamp
     * +0800接口返回的时区不准确，默认北京时区
     * 做时区offset
     */
    static handleZone(timeStamp: any): any;
    /**
     * 转换为js可识别的时间戳
     * @eg transform("/Date(1395331200000+0800)/") => 1395331200000
     */
    static transformTimeStamp(dateStr: any): any;
    /**
     * 转换Java服务输出的日期格式（ISO 8601）为时间戳
     * 2019-03-06T13:30:00.000+08:00 => 1551850200000
     * @param dateStr
     * @returns {*}
     */
    static transformTimeStampISO8601(dateStr: any): number;
    static transformServerDate(timeStamp: any): string;
    static isCrossYear(date: any, ignoreNegative?: any): boolean;
}
