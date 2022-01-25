/**
 * @param {String} str
 * @param {Number} len
 * @param {String} fill
 * @param {Boolean} pre
 * @example pad('1', 3, '0', true) ==> '001'
 * @example pad('1', 3, '-') ==> '1--'
 */
let pad = function (str, len, fill, pre) {
    str = str.toString()
    if (str.length < len) {
        fill = new Array(len).join(fill || ' ')
        if (pre) {
            str = (fill + str).substr(-len)
        } else {
            str = (str + fill).substring(0, len)
        }
    }
    return str
}
//
let weeks = ['日', '一', '二', '三', '四', '五', '六']
let reg =
    /^(-?(?:[1-9][0-9]*)?[0-9]{4})-(1[0-2]|0[1-9])-(3[01]|0[1-9]|[12][0-9])T(2[0-3]|[01][0-9]):([0-5][0-9]):([0-5][0-9])(\.[0-9]+)?(Z)?((\+|-)?\d{1,2}:00)?$/
export default class VDate {
    private date: Date = new Date('')
    constructor(date?, ignoreNegative = true) {
        /**
         * handle timezone auto when date is null or ms
         * use toBJZone() to convert to Beijing timezone
         */
        let defaultDate = VDate.handleZone(Date.now())
        if (date) {
            if (/^-\d+$/.test(date)) {
                if (ignoreNegative) {
                    // negative timestamp return invalid Date object
                    this.date = new Date('')
                    return this
                }
                date = VDate.handleZone(date)
            } else if (/^\+?\d+$/.test(date)) {
                date = VDate.handleZone(date)
            } else if (typeof date === 'object' && date instanceof VDate) {
                return date
            }
        }
        date = date || defaultDate
        if (typeof date === 'string') {
            let regtime = /^(\d{4})\-?(\d{1,2})(?:\-(\d{1,2}))?/i
            if (date.match(regtime)) {
                date = date.replace(regtime, (_, $1, $2, $3) => {
                    return `${$1}/${$2 || '01'}/${$3 || '01'}`
                })
            }
        }
        this.date = new Date(date)
    }
    /**
     * @description add n days to current time
     * @method addDay
     * @param {Number} n
     * @returns {vDate}
     */
    addDay(n) {
        n = n || 0
        this.date.setDate(this.date.getDate() + n)
        return this
    }
    /**
     * @description add n months to current time
     * @param {Number} n
     * @returns {vDate}
     */
    addMonth(n) {
        n = n || 0
        this.date.setMonth(this.date.getMonth() + n)
        return this
    }
    /**
     * @description add n hours to current time
     * @param {Number} n
     * @returns {vDate}
     */
    addHours(n) {
        n = n || 0
        this.date.setHours(this.date.getHours() + n)
        return this
    }

    /**
     * @description add n minutes to current time
     * @param {Number} n
     * @returns {vDate}
     */
    addMinutes(n) {
        n = n || 0
        this.date.setMinutes(this.date.getMinutes() + n)
        return this
    }
    /**
     * @description add n seconds to current time
     * @param {Number} n
     * @returns {vDate}
     */
    addSeconds(n) {
        n = n || 0
        this.date.setSeconds(this.date.getSeconds() + n)
        return this
    }
    /**
     * @description add n years to current time
     * @param {Number} n
     * @returns {vDate}
     */
    addYear(n) {
        n = n || 0
        this.date.setFullYear(this.date.getFullYear() + n)
        return this
    }
    /**
     * @description convert to Beijing timezone
     * @return {VDate}
     */
    toBJZone() {
        return new VDate(VDate.handleZone(this.date.getTime()))
    }
    setHours(...args) {
        this.date.setHours.apply(this.date, args)
        return this
    }
    setMinutes(...args) {
        this.date.setMinutes.apply(this.date, args)
        return this
    }
    /**
     * @description get the native Date object
     * @returns {Date}
     */
    valueOf() {
        return this.date
    }
    /**
     * @description get timestamp
     * @returns {number}
     */
    getTime() {
        return this.date.valueOf()
    }

    /**
     * @description get utc string
     */
    toString() {
        return this.date.toString()
    }
    /**
     * @description
     * @param {String} format
     * @returns {String}
     */
    format(format?) {
        // format = format || 'yyyy-mm-dd';
        // return moment(this.date.valueOf()).format(format||'YYYY-MM-DD')
        let date = this.date
        format = format || 'YYYY-MM-DD'
        return format.replace(/Y+|M+|D+|H+|m+|s+|w+/g, function (match) {
            let firstChar = match.substr(0, 1)
            let len = match.length
            switch (firstChar) {
                case 'Y':
                    return date
                        .getFullYear()
                        .toString()
                        .substr(4 - len)
                case 'y':
                    return date
                        .getFullYear()
                        .toString()
                        .substr(4 - len)
                case 'M':
                    return pad(date.getMonth() + 1, len, '0', true)
                case 'D':
                    return pad(date.getDate(), len, '0', true)
                case 'H':
                    return pad(date.getHours(), len, '0', true)
                case 'h':
                    return pad(date.getHours(), len, '0', true)
                case 'm':
                    return pad(date.getMinutes(), len, '0', true)
                case 's':
                    return pad(date.getSeconds(), len, '0', true)
                case 'w':
                    return weeks[date.getDay()]
            }
        })
    }
    /**
     * @description get the month difference between the input date and current date
     * @param {Date}
     * @return {Number}
     */
    diffMonth(date) {
        let curY = parseInt(this.format('YYYY'), 10)
        let curM = parseInt(this.format('MM'), 10)
        let cdate = new VDate(date)
        let cdateY = parseInt(cdate.format('YYYY'), 10)
        let cdateM = parseInt(cdate.format('MM'), 10)

        return (cdateY - curY) * 12 + (cdateM - curM)
    }

    /**
     * @description get the year difference between the input date and current date
     * @param {Date}
     * @return {Number}
     */
    diffYear(date) {
        let curY = parseInt(this.format('YYYY'), 10)
        let cdate = new VDate(date)
        let cdateY = parseInt(cdate.format('YYYY'), 10)

        return cdateY - curY
    }

    /**
     * @description check is date valid
     * @return {Boolean}
     */
    isValid() {
        return this.date && !isNaN(this.date.getTime())
    }

    public static parse(value: any, isNative?: boolean, ignoreNegative?): any {
        if (typeof value === 'object') {
            if (value instanceof VDate) {
                value = value.valueOf()
            }
            return isNative ? new Date(value) : new VDate(value)
        }
        value += ''
        if (value.indexOf('Date') > -1) {
            // transform "\/Date(1482394964000+0800)\/" to vdate
            value = value.match(/((\+|-)?\d+)/)[0]
        } else if (reg.test(value)) {
            // transform "2019-03-06T13:30:00.000+08:00" to vdate
            value = VDate.transformTimeStampISO8601(value)
        }
        if (!isNaN(value)) {
            value = parseInt(value, 10)
        }
        // timespan
        return isNative
            ? new VDate(value, ignoreNegative).valueOf()
            : new VDate(value, ignoreNegative)
    }
    /**
     * @description get the minute difference between the two input dates
     * @param ds1
     * @param ds2
     * @returns {number}
     */
    public static minuteDiff(ds1, ds2) {
        let d1 = Number(VDate.parse(ds1, true))
        let d2 = Number(VDate.parse(ds2, true))
        return (d2 - d1) / 60000
    }
    /**
     * @description get the hour difference between the two input dates
     * @param ds1
     * @param ds2
     * @returns {number}
     */
    public static hourDiff(ds1, ds2) {
        let d1 = Number(VDate.parse(ds1, true))
        let d2 = Number(VDate.parse(ds2, true))
        return (d2 - d1) / 3600000
    }
    /**
     * @description get the day difference between the two input dates
     * @param {String} ds1
     * @param {String} ds2
     * @returns {Number}
     */
    public static dayDiff(ds1, ds2) {
        let d1 = VDate.parse(ds1, true)
        let d2 = VDate.parse(ds2, true)
        d1.setHours(0, 0, 0, 0)
        d2.setHours(0, 0, 0, 0)
        let cd1 = Number(d1)
        let cd2 = Number(d2)
        return (cd2 - cd1) / 86400000
    }
    /**
     * @description get the month difference between the two input dates
     * @param d1
     * @param d2
     * @returns {Number|*}
     */
    public static diffMonth(d1, d2) {
        d1 = new VDate(d1)
        return d1.diffMonth(d2)
    }

    /**
     * @description get the year difference between the two input dates
     * @param d1
     * @param d2
     * @returns {Number|*}
     */
    public static diffYear(d1, d2) {
        d1 = new VDate(d1)
        return d1.diffYear(d2)
    }

    /**
     * @description check the time is in the input range
     * @param {String} sTime  start time
     * @param {String} eTime  end time
     * @param {String} time 
     * @returns {Boolean}
     */
    public static timeRange(sTime, eTime, time) {
        let test1 = VDate.dayDiff(sTime, time)
        let test2 = VDate.dayDiff(time, eTime)
        if (test1 >= 0 && test2 >= 0) {
            return true
        } else {
            return false
        }
    }
    /**
     * @description format time to the specified string
     * @param {String} str
     * @returns {String|*}
     */
    public static format(date, str, ignoreNegative?) {
        date = this.parse(date, true, ignoreNegative)
        return new VDate(date, ignoreNegative).format(str)
    }
    /**
     * @description handle timezone, default Beijing timezone
     * @param {number} timeStamp
     */
    public static handleZone(timeStamp) {
        if (!timeStamp || isNaN(timeStamp)) {
            return timeStamp
        }
        let defaultTimeZone = 8 * 3600 * 1000 // BJ
        let timezoneOffset = new Date().getTimezoneOffset()
        return +timeStamp + timezoneOffset * 60000 + defaultTimeZone
    }
    /**
     * @description transform date to timestamp
     * @eg transform("/Date(1395331200000+0800)/") => 1395331200000
     */
    public static transformTimeStamp(dateStr) {
        let match = dateStr.match(/^\/Date\(-?(\d+)(\+|-)\d+\)\/$/)
        if (match) {
            return VDate.handleZone(match[1])
        } else if (dateStr.match(/^(\d{4})\-?(\d{1,2})(?:\-(\d{1,2}))?/i)) {
            return new Date(dateStr).getTime()
        } else {
            return dateStr
        }
    }
    /**
     * @description transform date to timestamp
     * @param dateStr
     * @returns {*}
     * @eg 2019-03-06T13:30:00.000+08:00 => 1551850200000
     */
    public static transformTimeStampISO8601(dateStr) {
        let matches = dateStr.match(reg)
        if (matches && matches.length) {
            let year = matches[1]
            let month = matches[2] == undefined ? 0 : matches[2] - 1
            let day = matches[3]
            let hour = matches[4]
            let minute = matches[5]
            let second = matches[6]
            let date = new Date(year, month, day, hour, minute, second)
            return date.getTime() - 480 * 60000 - new Date().getTimezoneOffset() * 60000
        }
        return null
    }

    public static transformServerDate(timeStamp) {
        timeStamp = VDate.handleZone(timeStamp)
        return '/Date(' + timeStamp + '+0800)/'
    }

    public static isCrossYear(date, ignoreNegative?) {
        date = this.parse(date, true, ignoreNegative)
        let diffYear = VDate.diffYear(date, new VDate())
        return diffYear != 0
    }
}
