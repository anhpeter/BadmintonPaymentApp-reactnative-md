import Price from "../constants/Price";

const Helper = {
    strPad: function (str, length, character, position) {
        let result = str;
        if (str.length < length) {
            const appendingStr = character.repeat(length - str.length);
            result =
                position === "l"
                    ? `${appendingStr}${str}`
                    : `${str}${appendingStr}`;
        }
        return result;
    },
    roundPrice: function (price, n) {
        let result = price;
        if (`${price}`.length > n) {
            result = Math.round(price / Math.pow(10, n)) * Math.pow(10, n);
        }
        return result;
    },

    count: function (arr) {
        const result = {};
        arr.forEach((item) => {
            if (result[item]) result[item]++;
            else result[item] = 1;
        });
        return result;
    },
    getPriceFormat: function (number, isShowSymbol = false) {
        if (number > 0) {
            const numberString = `${number}`;
            const firstGroupQty = numberString.length % 3 || 3;
            const firstGroup = numberString.slice(0, firstGroupQty);
            const leftString = numberString.slice(firstGroupQty);
            const leftStringGroups = leftString.match(/.{1,3}/g);
            const result = `${firstGroup},${leftStringGroups.join(",")}${
                isShowSymbol ? " vnd" : ""
            }`;
            return result;
        }
        return '0';
    },
    getYardPrice: function (time) {
        const playingTime = time / (60 * 60 * 1000);
        const yardPrice = Math.floor(playingTime * Price.yardPricePerHour);
        return yardPrice;
    },
};
export default Helper;
