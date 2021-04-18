const MyTime = {
    convertToUtcTime: function (time) {
        const d = new Date();
        const result = time + d.getTimezoneOffset() * 60000
        return result;
    },
    convertToLocalTime: function (time) {
        const d = new Date();
        const result = time - d.getTimezoneOffset() * 60000
        return result;
    },
};
export default MyTime;
