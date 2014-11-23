/**
 * Author: Bien Ly - Agilsun Co., Ltd
 * Email: bienly@agilsun.com
 * Version: 0.0.1
 */
if (!String.prototype.endsWith) {
    String.prototype.endsWith = function(suffix) {
        return this.indexOf(suffix, this.length - suffix.length) !== -1;
    };
}

if (!String.prototype.contains) {
    String.prototype.contains = function() {
        return String.prototype.indexOf.apply( this, arguments ) !== -1;
    };
}

/**
 * Number.prototype.format(n, x)
 * 
 * @param integer n: length of decimal
 * @param integer x: length of sections
 */
if (!Number.prototype.format) {
    Number.prototype.format = function(n, x) {
        var re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\.' : '$') + ')';
        return this.toFixed(Math.max(0, ~~n)).replace(new RegExp(re, 'g'), '$&,');
    };
    /*
    1234..format();           // "1,234"
    12345..format(2);         // "12,345.00"
    123456.7.format(3, 2);    // "12,34,56.700"
    123456.789.format(2, 4);  // "12,3456.79"*/
}

function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function encodeHtml(data) {
    if (data && data.replace) {
        return data.replace(/"/g, '&quot;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;');
    }
    return data;
}

function decodeHtml(data) {
    if (data && data.replace) {
        return data.replace(/&quot;/g, '"')
            .replace(/&lt;/g, '<')
            .replace(/&gt;/g, '>');
    }
    return data;
}

function refactorText(txt) {
    txt.value = $.trim(txt.value);
}

function copyObject(from) {
    var result = {};
    for (var k in from) {
        result[k] = from[k];
    }
    return result;
}

function ellipsis(str, maxLength) {
    if (isOutOfLenght(str, maxLength)) {
        return str.substring(0, maxLength - 3) + '...';
    }
    return str;
}

function isOutOfLenght(str, maxLength) {
    if (str && str.length) {
        if (str.length > maxLength) {
            return true;
        }
    }
    return false;
}

function randomUUID() {
    // http://www.ietf.org/rfc/rfc4122.txt
    var s = [];
    var hexDigits = "0123456789abcdef";
    for (var i = 0; i < 36; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
    s[8] = s[13] = s[18] = s[23] = "-";

    var uuid = s.join("");
    return uuid;
}

function isEmpty(val) {
    if (val) {
        return val === '';
    }
    return true;
}

function alertMessage(title, message, cssClass, fn) {
    cssClass = cssClass ? 'cus-alert ' + cssClass : 'cus-alert';
    alertify.alert('<div class="my-dialog">' +
        '<div class="title">' + title + '</div>' +
        '<div class="alertmsg">' + message + '</div>' +
        '</div>', fn, cssClass);
}

function getProvinceById(id) {
    var provinces = SETTINGS.provinces;
    for (var i = 0; i < provinces.length; i++) {
        var p = provinces[i];
        if (p.id == id) {
            return p;
        }
    }
    return null;
}