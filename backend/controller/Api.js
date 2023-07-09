const tradeAlarm = async (req, res) => {
  try {
    console.log(req.body);

    let content = req.body.info;
    let now = req.body.now;

    let responses = {
      success: false,
      tradeLength: 0,
      trades: [],

      //SellDueTimes: SellTimes,
      //BuyDueTimes: BuyTimes,

      // SellTimes: sellArray,
      // BuyTimes: buyArray,
    };

    content = content.replace(/ nextLine /g, "\n");
    console.log(content);

    const currencyRegex = /[Oo]perating\s* [Cc]urrency\s*:\s*[A-Z]{2,5}/gi;
    const coinRegex = /[A-Z]{2,5}/g;
    const fullTimeRegex =
      /([Bb]uy|[Ss]ell)\s* [Tt]ime\s*:?\s*:?\s*(\d{1,2}\s*:\s*\d{2}(\s*[APap][Mm])?)/gi;
    // const sellTimeRegex =/[Ss]ell\s? \s?\s?[Tt]ime\s?\s?\s?:?\s?\s?\s?:?\s?\s?\s?(\d{1,2}\s?\s?\s?:\s?\s?\s?\d{2}\s?\s?\s?[APap][Mm])/gi;
    //const onlyTimeRegex = /(\d{1,2}\s?\s?\s?:\s?\s?\s?\d{2}\s?\s?\s?[APap][Mm])/;
    const twoDigitRegex = /(\d+)\s*:\s*(\d+)/;
    //const twoDigitRegex = /([\d]{1,2})/;
    const peridiumRegex = /[APap][Mm]/;
    //  const SellRegex =
    //  /[Ss]ell\s? [Tt]ime\s?\s?\s?:?\s?\s?\s?:?\s?\s?\s?(\d{1,2}:\d{2}\s?[AP]M)/gi;
    //  const SellRegex_a = /(\d{1,2}:\d{2}\s?[AP]M)/;

    const currency = content.match(currencyRegex);
    console.log("currency", currency);

    const fullTime = content.match(fullTimeRegex);
    console.log("fullTime", fullTime);

    const generateDueTime = (oneTime) => {
      const twoDigits = oneTime.match(twoDigitRegex);
      const hh = twoDigits[1];
      const ss = twoDigits[2];
      console.log("twoDigits", twoDigits);

      const peridium = oneTime.match(peridiumRegex);

      const apm = peridium ? peridium[0].toUpperCase() : "";
      console.log("peridium", peridium);

      var currentDate = new Date();
      var day = currentDate.getDate(); // Returns the day of the month (1-31)
      var month = currentDate.getMonth() + 1; // Returns the month (0-11), so we add 1
      var year = currentDate.getFullYear(); // Returns the year (e.g., 2023)
      const dt = month + " " + day + " " + year;
      console.log(dt);

      const makedTime = `${hh}:${ss}:00 ${apm} ${dt}`;

      let foundTime = new Date(makedTime);
      let timey =
        foundTime.getHours() +
        ":" +
        foundTime.getMinutes() +
        ":" +
        foundTime.getSeconds();

      console.log("found date", foundTime);
      console.log("timey", timey);

      const miliDef = foundTime.getTime() - now * 1000;
      console.log("miliDef", miliDef);

      if (miliDef > 0) {
        let secondDef = Math.floor(miliDef / 1000) - 65;
        console.log("secondDef", secondDef);
        responses.success = true;

        return secondDef;
      }
      responses.success = false;
      return false;
    };

    if (currency[0]) {
      let coin = currency[0].match(coinRegex)[0];

      responses.trades.push({
        coin,
        id: 1,
        buyTime: fullTime[0],
        sellTime: fullTime[1],
        BuyDueTime: generateDueTime(fullTime[0]),
        SellDueTime: generateDueTime(fullTime[1]),
      });
    }
    if (currency[1]) {
      let coin = currency[1].match(coinRegex)[0];
      responses.tradeLength++;

      responses.trades.push({
        coin,
        id: 2,
        buyTime: fullTime[2],
        sellTime: fullTime[3],
        BuyDueTime: generateDueTime(fullTime[2]),
        SellDueTime: generateDueTime(fullTime[3]),
      });
    }
    if (currency[2]) {
      let coin = currency[2].match(coinRegex)[0];
      responses.tradeLength++;

      responses.trades.push({
        coin,
        id: 3,
        buyTime: fullTime[4],
        sellTime: fullTime[5],
        BuyDueTime: generateDueTime(fullTime[4]),
        SellDueTime: generateDueTime(fullTime[5]),
      });
    }
    if (currency[3]) {
      let coin = currency[3].match(coinRegex)[0];
      responses.tradeLength++;

      responses.trades.push({
        coin,
        id: 4,
        buyTime: fullTime[6],
        sellTime: fullTime[7],
        BuyDueTime: generateDueTime(fullTime[6]),
        SellDueTime: generateDueTime(fullTime[7]),
      });
    }

    console.log(responses);
    return res.send(responses);
  } catch (e) {
    console.log(e);
    return res.send({
      success: false,
      error:e
    });
  }
};
const testserver = async (req, res) => {
  try {
    res.send("<h1>Server Working... <h1>");
  } catch (e) {
    console.log("testserver error :", e);
  }
};
module.exports = { tradeAlarm, testserver };
