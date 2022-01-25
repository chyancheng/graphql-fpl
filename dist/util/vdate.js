"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @param {String} str
 * @param {Number} len
 * @param {String} fill
 * @param {Boolean} pre
 * @example pad('1', 3, '0', true) ==> '001'
 * @example pad('1', 3, '-') ==> '1--'
 */
var pad = function (str, len, fill, pre) {
    str = str.toString();
    if (str.length < len) {
        fill = new Array(len).join(fill || ' ');
        if (pre) {
            str = (fill + str).substr(-len);
        }
        else {
            str = (str + fill).substring(0, len);
        }
    }
    return str;
};
//
var weeks = ['日', '一', '二', '三', '四', '五', '六'];
var reg = /^(-?(?:[1-9][0-9]*)?[0-9]{4})-(1[0-2]|0[1-9])-(3[01]|0[1-9]|[12][0-9])T(2[0-3]|[01][0-9]):([0-5][0-9]):([0-5][0-9])(\.[0-9]+)?(Z)?((\+|-)?\d{1,2}:00)?$/;
var VDate = /** @class */ (function () {
    function VDate(date, ignoreNegative) {
        if (ignoreNegative === void 0) { ignoreNegative = true; }
        this.date = new Date('');
        /**
         * handle timezone auto when date is null or ms
         * use toBJZone() to convert to Beijing timezone
         */
        var defaultDate = VDate.handleZone(Date.now());
        if (date) {
            if (/^-\d+$/.test(date)) {
                if (ignoreNegative) {
                    // negative timestamp return invalid Date object
                    this.date = new Date('');
                    return this;
                }
                date = VDate.handleZone(date);
            }
            else if (/^\+?\d+$/.test(date)) {
                date = VDate.handleZone(date);
            }
            else if (typeof date === 'object' && date instanceof VDate) {
                return date;
            }
        }
        date = date || defaultDate;
        if (typeof date === 'string') {
            var regtime = /^(\d{4})\-?(\d{1,2})(?:\-(\d{1,2}))?/i;
            if (date.match(regtime)) {
                date = date.replace(regtime, function (_, $1, $2, $3) {
                    return "".concat($1, "/").concat($2 || '01', "/").concat($3 || '01');
                });
            }
        }
        this.date = new Date(date);
    }
    /**
     * @description add n days to current time
     * @method addDay
     * @param {Number} n
     * @returns {vDate}
     */
    VDate.prototype.addDay = function (n) {
        n = n || 0;
        this.date.setDate(this.date.getDate() + n);
        return this;
    };
    /**
     * @description add n months to current time
     * @param {Number} n
     * @returns {vDate}
     */
    VDate.prototype.addMonth = function (n) {
        n = n || 0;
        this.date.setMonth(this.date.getMonth() + n);
        return this;
    };
    /**
     * @description add n hours to current time
     * @param {Number} n
     * @returns {vDate}
     */
    VDate.prototype.addHours = function (n) {
        n = n || 0;
        this.date.setHours(this.date.getHours() + n);
        return this;
    };
    /**
     * @description add n minutes to current time
     * @param {Number} n
     * @returns {vDate}
     */
    VDate.prototype.addMinutes = function (n) {
        n = n || 0;
        this.date.setMinutes(this.date.getMinutes() + n);
        return this;
    };
    /**
     * @description add n seconds to current time
     * @param {Number} n
     * @returns {vDate}
     */
    VDate.prototype.addSeconds = function (n) {
        n = n || 0;
        this.date.setSeconds(this.date.getSeconds() + n);
        return this;
    };
    /**
     * @description add n years to current time
     * @param {Number} n
     * @returns {vDate}
     */
    VDate.prototype.addYear = function (n) {
        n = n || 0;
        this.date.setFullYear(this.date.getFullYear() + n);
        return this;
    };
    /**
     * @description convert to Beijing timezone
     * @return {VDate}
     */
    VDate.prototype.toBJZone = function () {
        return new VDate(VDate.handleZone(this.date.getTime()));
    };
    VDate.prototype.setHours = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.date.setHours.apply(this.date, args);
        return this;
    };
    VDate.prototype.setMinutes = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.date.setMinutes.apply(this.date, args);
        return this;
    };
    /**
     * @description get the native Date object
     * @returns {Date}
     */
    VDate.prototype.valueOf = function () {
        return this.date;
    };
    /**
     * @description get timestamp
     * @returns {number}
     */
    VDate.prototype.getTime = function () {
        return this.date.valueOf();
    };
    /**
     * @description get utc string
     */
    VDate.prototype.toString = function () {
        return this.date.toString();
    };
    /**
     * @description
     * @param {String} format
     * @returns {String}
     */
    VDate.prototype.format = function (format) {
        // format = format || 'yyyy-mm-dd';
        // return moment(this.date.valueOf()).format(format||'YYYY-MM-DD')
        var date = this.date;
        format = format || 'YYYY-MM-DD';
        return format.replace(/Y+|M+|D+|H+|m+|s+|w+/g, function (match) {
            var firstChar = match.substr(0, 1);
            var len = match.length;
            switch (firstChar) {
                case 'Y':
                    return date
                        .getFullYear()
                        .toString()
                        .substr(4 - len);
                case 'y':
                    return date
                        .getFullYear()
                        .toString()
                        .substr(4 - len);
                case 'M':
                    return pad(date.getMonth() + 1, len, '0', true);
                case 'D':
                    return pad(date.getDate(), len, '0', true);
                case 'H':
                    return pad(date.getHours(), len, '0', true);
                case 'h':
                    return pad(date.getHours(), len, '0', true);
                case 'm':
                    return pad(date.getMinutes(), len, '0', true);
                case 's':
                    return pad(date.getSeconds(), len, '0', true);
                case 'w':
                    return weeks[date.getDay()];
            }
        });
    };
    /**
     * @description get the month difference between the input date and current date
     * @param {Date}
     * @return {Number}
     */
    VDate.prototype.diffMonth = function (date) {
        var curY = parseInt(this.format('YYYY'), 10);
        var curM = parseInt(this.format('MM'), 10);
        var cdate = new VDate(date);
        var cdateY = parseInt(cdate.format('YYYY'), 10);
        var cdateM = parseInt(cdate.format('MM'), 10);
        return (cdateY - curY) * 12 + (cdateM - curM);
    };
    /**
     * @description get the year difference between the input date and current date
     * @param {Date}
     * @return {Number}
     */
    VDate.prototype.diffYear = function (date) {
        var curY = parseInt(this.format('YYYY'), 10);
        var cdate = new VDate(date);
        var cdateY = parseInt(cdate.format('YYYY'), 10);
        return cdateY - curY;
    };
    /**
     * @description check is date valid
     * @return {Boolean}
     */
    VDate.prototype.isValid = function () {
        return this.date && !isNaN(this.date.getTime());
    };
    VDate.parse = function (value, isNative, ignoreNegative) {
        if (typeof value === 'object') {
            if (value instanceof VDate) {
                value = value.valueOf();
            }
            return isNative ? new Date(value) : new VDate(value);
        }
        value += '';
        if (value.indexOf('Date') > -1) {
            // transform "\/Date(1482394964000+0800)\/" to vdate
            value = value.match(/((\+|-)?\d+)/)[0];
        }
        else if (reg.test(value)) {
            // transform "2019-03-06T13:30:00.000+08:00" to vdate
            value = VDate.transformTimeStampISO8601(value);
        }
        if (!isNaN(value)) {
            value = parseInt(value, 10);
        }
        // timespan
        return isNative
            ? new VDate(value, ignoreNegative).valueOf()
            : new VDate(value, ignoreNegative);
    };
    /**
     * @description get the minute difference between the two input dates
     * @param ds1
     * @param ds2
     * @returns {number}
     */
    VDate.minuteDiff = function (ds1, ds2) {
        var d1 = Number(VDate.parse(ds1, true));
        var d2 = Number(VDate.parse(ds2, true));
        return (d2 - d1) / 60000;
    };
    /**
     * @description get the hour difference between the two input dates
     * @param ds1
     * @param ds2
     * @returns {number}
     */
    VDate.hourDiff = function (ds1, ds2) {
        var d1 = Number(VDate.parse(ds1, true));
        var d2 = Number(VDate.parse(ds2, true));
        return (d2 - d1) / 3600000;
    };
    /**
     * @description get the day difference between the two input dates
     * @param {String} ds1
     * @param {String} ds2
     * @returns {Number}
     */
    VDate.dayDiff = function (ds1, ds2) {
        var d1 = VDate.parse(ds1, true);
        var d2 = VDate.parse(ds2, true);
        d1.setHours(0, 0, 0, 0);
        d2.setHours(0, 0, 0, 0);
        var cd1 = Number(d1);
        var cd2 = Number(d2);
        return (cd2 - cd1) / 86400000;
    };
    /**
     * @description get the month difference between the two input dates
     * @param d1
     * @param d2
     * @returns {Number|*}
     */
    VDate.diffMonth = function (d1, d2) {
        d1 = new VDate(d1);
        return d1.diffMonth(d2);
    };
    /**
     * @description get the year difference between the two input dates
     * @param d1
     * @param d2
     * @returns {Number|*}
     */
    VDate.diffYear = function (d1, d2) {
        d1 = new VDate(d1);
        return d1.diffYear(d2);
    };
    /**
     * @description check the time is in the input range
     * @param {String} sTime  start time
     * @param {String} eTime  end time
     * @param {String} time
     * @returns {Boolean}
     */
    VDate.timeRange = function (sTime, eTime, time) {
        var test1 = VDate.dayDiff(sTime, time);
        var test2 = VDate.dayDiff(time, eTime);
        if (test1 >= 0 && test2 >= 0) {
            return true;
        }
        else {
            return false;
        }
    };
    /**
     * @description format time to the specified string
     * @param {String} str
     * @returns {String|*}
     */
    VDate.format = function (date, str, ignoreNegative) {
        date = this.parse(date, true, ignoreNegative);
        return new VDate(date, ignoreNegative).format(str);
    };
    /**
     * @description handle timezone, default Beijing timezone
     * @param {number} timeStamp
     */
    VDate.handleZone = function (timeStamp) {
        if (!timeStamp || isNaN(timeStamp)) {
            return timeStamp;
        }
        var defaultTimeZone = 8 * 3600 * 1000; // BJ
        var timezoneOffset = new Date().getTimezoneOffset();
        return +timeStamp + timezoneOffset * 60000 + defaultTimeZone;
    };
    /**
     * @description transform date to timestamp
     * @eg transform("/Date(1395331200000+0800)/") => 1395331200000
     */
    VDate.transformTimeStamp = function (dateStr) {
        var match = dateStr.match(/^\/Date\(-?(\d+)(\+|-)\d+\)\/$/);
        if (match) {
            return VDate.handleZone(match[1]);
        }
        else if (dateStr.match(/^(\d{4})\-?(\d{1,2})(?:\-(\d{1,2}))?/i)) {
            return new Date(dateStr).getTime();
        }
        else {
            return dateStr;
        }
    };
    /**
     * @description transform date to timestamp
     * @param dateStr
     * @returns {*}
     * @eg 2019-03-06T13:30:00.000+08:00 => 1551850200000
     */
    VDate.transformTimeStampISO8601 = function (dateStr) {
        var matches = dateStr.match(reg);
        if (matches && matches.length) {
            var year = matches[1];
            var month = matches[2] == undefined ? 0 : matches[2] - 1;
            var day = matches[3];
            var hour = matches[4];
            var minute = matches[5];
            var second = matches[6];
            var date = new Date(year, month, day, hour, minute, second);
            return date.getTime() - 480 * 60000 - new Date().getTimezoneOffset() * 60000;
        }
        return null;
    };
    VDate.transformServerDate = function (timeStamp) {
        timeStamp = VDate.handleZone(timeStamp);
        return '/Date(' + timeStamp + '+0800)/';
    };
    VDate.isCrossYear = function (date, ignoreNegative) {
        date = this.parse(date, true, ignoreNegative);
        var diffYear = VDate.diffYear(date, new VDate());
        return diffYear != 0;
    };
    return VDate;
}());
exports.default = VDate;
