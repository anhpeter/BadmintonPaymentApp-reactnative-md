const MyTime = {
    convertToUtcTime: function (time) {
        const result = time + this.timeOffsetInMilliseconds();
        return result;
    },
    convertToLocalTime: function (time) {
        const result = time - this.timeOffsetInMilliseconds();
        return result;
    },
    timeOffsetInMilliseconds: function () {
        const d = new Date();
        return d.getTimezoneOffset() * 60000 - 3600000;
    },
};
export default MyTime;
