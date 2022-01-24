/*
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
let weeks = ["日", "一", "二", "三", "四", "五", "六"];
let reg = /^(-?(?:[1-9][0-9]*)?[0-9]{4})-(1[0-2]|0[1-9])-(3[01]|0[1-9]|[12][0-9])T(2[0-3]|[01][0-9]):([0-5][0-9]):([0-5][0-9])(\.[0-9]+)?(Z)?((\+|-)?\d{1,2}:00)?$/;
class VDate {
    //ignoreNegative 表示是否忽略负数日期
    constructor(date, ignoreNegative = true) {
        /**
         * 在date为空和毫秒值时会自动处理时区问题
         * 如果需要强制转换为北京时区，可以使用toBJZone方法
         */
        let defaultDate = VDate.handleZone(Date.now())
        if (date) {
            if (/^-\d+$/.test(date)) {
                if (ignoreNegative) {
                    // 负数的timestamp返回一个非法的日期对象
                    this.date = new Date('')
                    return this
                }
                date = VDate.handleZone(date)
            } else if (/^\+?\d+$/.test(date)) {
                date = VDate.handleZone(date)
            } else if (typeof date === 'object' && date instanceof VDate) {
                return (this.date = date)
            }
        }
        date = date || defaultDate
        //处理date.parse在ios下缺少dd时的兼容性问题
        if (typeof date === 'string') {
            let regtime = /^(\d{4})\-?(\d{1,2})(?:\-(\d{1,2}))?/i
            if (date.match(regtime)) {
                date = date.replace(regtime, (str, $1, $2, $3) => {
                    //如果只有yyyy-mm，需要补充dd，否则在safari下会报错
                    return `${$1}/${$2 || '01'}/${$3 || '01'}`
                })
            }
        }
        this.date = new Date(date)
    }
    /**
     * @description 当前时间加n天
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
     * @description 当前时间加n月
     * @param {Number} n
     * @returns {vDate}
     */
    addMonth(n) {
        n = n || 0
        this.date.setMonth(this.date.getMonth() + n)
        return this
    }
    /**
     * @description 当前时间加n个小时
     * @param {Number} n
     * @returns {vDate}
     */
    addHours(n) {
        n = n || 0
        this.date.setHours(this.date.getHours() + n)
        return this
    }

    /**
     * 当前时间基础上增加n分
     * @param {Number} n
     * @returns {vDate}
     */
    addMinutes(n) {
        n = n || 0
        this.date.setMinutes(this.date.getMinutes() + n)
        return this
    }
    /**
     * 当前时间基础上增加n秒
     * @param {Number} n
     * @returns {vDate}
     */
    addSeconds(n) {
        n = n || 0
        this.date.setSeconds(this.date.getSeconds() + n)
        return this
    }
    /**
     * @description 当前时间加n年
     * @param {Number} n
     * @returns {vDate}
     */
    addYear(n) {
        n = n || 0
        this.date.setYear(this.date.getFullYear() + n)
        return this
    }
    /**
     * 转换为北京时区
     * return {VDate} 新的Vdate实例
     */
    toBJZone() {
        return new VDate(VDate.handleZone(this.date.getTime()))
    }
    /**
     * @description 设置当前时间的小时，分，秒
     */
    setHours() {
        this.date.setHours.apply(this.date, arguments)
        return this
    }
    /**
     * @description 设置当前时间分 秒 毫秒
     */
    setMinutes() {
        this.date.setMinutes.apply(this.date, arguments)
        return this
    }
    /**
     * 获得原生Date对象
     * @returns {Date}
     */
    valueOf() {
        return this.date
    }
    /**
     * 获得毫秒数
     * @returns {number} 毫秒
     */
    getTime() {
        return this.date.valueOf()
    }

    /**
     * 获得utc时间字符串
     */
    toString() {
        return this.date.toString()
    }
    /**
     * @description
     * @param {String} format
     * @returns {String}
     */
    format(format) {
        // format = format || 'yyyy-mm-dd';
        // return moment(this.date.valueOf()).format(format||'YYYY-MM-DD')
        let date = this.date
        format = format || 'YYYY-MM-DD'
        return format.replace(/Y+|M+|D+|H+|m+|s+|w+/g, function (match) {
            let firstChar = match.substr(0, 1),
                len = match.length
            switch (firstChar) {
                case 'Y':
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
     * @description 返回输入Date的相差的月份数
     * @param {Date} 要计算的时间
     * @return {Number} 月数
     */
    diffMonth(date) {
        let curY = parseInt(this.format('YYYY'), 10),
            curM = parseInt(this.format('MM'), 10),
            cdate = new VDate(date),
            cdateY = parseInt(cdate.format('YYYY'), 10),
            cdateM = parseInt(cdate.format('MM'), 10)

        return (cdateY - curY) * 12 + (cdateM - curM)
    }

    /**
     * @description 返回日期是否合法
     * @return {Boolean}
     */
    isValid() {
        return this.date && !isNaN(this.date.getTime())
    }
}
//静态方法
Object.assign(VDate, {
    /**
     * @description 格式化
     *  @static
     * @param {isNative} 是否原生Date or vdate
     */
    parse(value, isNative, ignoreNegative) {
        if (typeof value === 'object') {
            if (value instanceof VDate) {
                value = value.valueOf()
            }
            return isNative ? new Date(value) : new VDate(value)
        }
        value += ''
        if (value.indexOf('Date') > -1) {
            //服务下发的 "\/Date(1482394964000+0800)\/" 转换为 vdate
            value = value.match(/((\+|-)?\d+)/)[0]
        } else if (reg.test(value)) {
            //服务下发的 "2019-03-06T13:30:00.000+08:00" 转换为 vdate
            value = VDate.transformTimeStampISO8601(value)
        }
        if (!isNaN(value)) {
            value = parseInt(value)
        }
        //2017-10-01 or 2017/10/01 类型
        // if (typeof value === 'string') {
        //     value = value.replace(/[-]/g, "/");
        // }
        //timespan类型
        return isNative ? new VDate(value, ignoreNegative).valueOf() : new VDate(value, ignoreNegative)
    },
    /**
     * 返回两个日期相差分钟数
     * @param ds1
     * @param ds2
     * @returns {number}
     */
    minuteDiff(ds1, ds2) {
        let d1 = VDate.parse(ds1, true)
        let d2 = VDate.parse(ds2, true)
        return (d2 - d1) / 60000
    },
    /**
     * 返回两个日期相差小时数
     * @param ds1
     * @param ds2
     * @returns {number}
     */
    hourDiff(ds1, ds2) {
        let d1 = VDate.parse(ds1, true)
        let d2 = VDate.parse(ds2, true)
        return (d2 - d1) / 3600000
    },
    /**
     * 返回两个日期相差的天数
     * @static
     * @param {String} ds1  日期1
     * @param {String} ds2  日期2
     * @returns {Number} num 相差天数
     */
    dayDiff(ds1, ds2) {
        let d1 = VDate.parse(ds1, true)
        let d2 = VDate.parse(ds2, true)
        d1.setHours(0, 0, 0, 0)
        d2.setHours(0, 0, 0, 0)
        return parseInt((d2 - d1) / 86400000)
    },
    /**
     * 计算两个时间的相隔月份数
     * @static
     * @param d1
     * @param d2
     * @returns {Number|*}
     */
    diffMonth(d1, d2) {
        d1 = new VDate(d1)
        return d1.diffMonth(d2)
    },
    /**
     * 判断一个日期是否在一个时间区间内
     * @static
     * @param {String} sTime  时间区间，start
     * @param {String} eTime  时间区间，end
     * @param {String} time  时间
     * @returns {Boolean} true、false 在 or 不在
     */
    timeRange(sTime, eTime, time) {
        // 时间可为时间戳格式，也可为‘YYYY-MM-DD’格式
        let test1 = VDate.dayDiff(sTime, time)
        let test2 = VDate.dayDiff(time, eTime)
        return test1 >= 0 && test2 >= 0
    },
    /**
     * 日期类型格式化为指定字符串
     * @static
     * @param {String} str
     * @returns {String|*}
     */
    format: function (date, str, ignoreNegative) {
        date = this.parse(date, true, ignoreNegative)
        return new VDate(date, ignoreNegative).format(str)
    },
    /**
     *@static
     *param {number} timeStamp
     *+0800接口返回的时区不准确，默认北京时区
     *做时区offset
     **/
    handleZone: function (timeStamp) {
        if (!timeStamp || isNaN(timeStamp)) {
            return timeStamp
        }
        var defaultTimeZone = 8 * 3600 * 1000 //BJ
        var timezoneOffset = new Date().getTimezoneOffset()
        return +timeStamp + timezoneOffset * 60000 + defaultTimeZone
    },
    /**
     *转换为js可识别的时间戳
     *@eg transform("/Date(1395331200000+0800)/") => 1395331200000
     **/
    transformTimeStamp: function (dateStr) {
        var match = dateStr.match(/^\/Date\(-?(\d+)(\+|-)\d+\)\/$/)
        if (match) {
            return VDate.handleZone(match[1])
        } else if (dateStr.match(/^(\d{4})\-?(\d{1,2})(?:\-(\d{1,2}))?/i)) {
            return new Date(dateStr).getTime()
        } else {
            return dateStr
        }
    },
    /**
     * 转换Java服务输出的日期格式（ISO 8601）为时间戳
     * 2019-03-06T13:30:00.000+08:00 => 1551850200000
     * @param dateStr
     * @returns {*}
     */
    transformTimeStampISO8601: function (dateStr) {
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
    },
    transformServerDate: function (timeStamp) {
        timeStamp = VDate.handleZone(timeStamp);
        return "/Date(" + timeStamp + "+0800)/";
    }

})

module.exports = VDate