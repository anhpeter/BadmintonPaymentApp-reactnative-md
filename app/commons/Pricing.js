import Price from "../constants/Price";
import Helper from "./Helper";

const Pricing = {
    // yard
    getTimeStampPrice: function (playingTimes) {
        const playingTimeStatistic = Helper.count(playingTimes);
        const descPlayingTimes = Object.keys(playingTimeStatistic).sort(
            (a, b) => b - a
        );
        let timestampPrice = {};
        let playerQty = 0;
        descPlayingTimes.forEach((item, index) => {
            let plaTime = item;
            let nextPlaTime = descPlayingTimes[index + 1] || 0;
            let middleGapTime = plaTime - nextPlaTime;
            playerQty += playingTimeStatistic[`${item}`];
            timestampPrice[item] =
                Helper.getYardPrice(middleGapTime) / playerQty;
        });
        return timestampPrice;
    },

    getTotalPriceForEachTimestamp: function (
        currentTimestamp,
        timestamps,
        timestampPrice
    ) {
        const timePayments = timestamps.filter((item) => {
            item = Number.parseInt(item);
            return item <= currentTimestamp;
        });
        const price = timePayments.reduce((prev, current) => {
            return prev + timestampPrice[`${current}`];
        }, 0);
        return price;
    },

    getPlayingTimePayments: function (playingTimes) {
        const playingTimePayment = {};
        const timestampPrice = this.getTimeStampPrice(playingTimes);
        const timestamps = Object.keys(timestampPrice);
        timestamps.forEach((time) => {
            playingTimePayment[time] = Math.round(
                this.getTotalPriceForEachTimestamp(
                    Number.parseInt(time),
                    timestamps,
                    timestampPrice
                )
            );
        });
        return playingTimePayment;
    },

    // cock
    getPlayingCockStatistic: function (totalCock, users) {
        const playingCockStatistic = {};
        for (let i = 1; i <= totalCock; i++) {
            playingCockStatistic[i] = users.filter((user) => {
                return user.cock >= i;
            }).length;
        }
        return playingCockStatistic;
    },

    getUserCockPayments: function (totalCock, users) {
        const cockPayment = {};
        const playingCockStatistic = this.getPlayingCockStatistic(
            totalCock,
            users
        );
        users.forEach((user) => {
            for (
                let i = Object.keys(playingCockStatistic).length;
                i >= 1;
                i--
            ) {
                if (user.cock >= i) {
                    cockPayment[user.username] =
                        cockPayment[user.username] || 0;
                    cockPayment[user.username] += Math.round(
                        Price.cockPrice / playingCockStatistic[i]
                    );
                }
            }
        });
        return cockPayment;
    },

    // user
    getTotalOtherPrice: function (users) {
        return users.length > 0
            ? users.reduce((previous, current) => {
                  return previous + current.otherPrice;
              }, 0)
            : 0;
    },
};
export default Pricing;
