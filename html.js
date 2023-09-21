const axios = require("axios");
const cheerio = require("cheerio");
const { cookies } = require("./config");

const expExtractor = async (jobUrl) => {
  let config = {
    method: "get",
    maxBodyLength: Infinity,
    // url: "https://wellfound.com/company-l/innovatily/jobs/2757858-technical-architect-python-data-science",
    url: jobUrl,
    headers: {
      Cookie: cookies[0],
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36 Edg/116.0.1938.54",
      Accept:
        "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
      "Accept-Language": "en-US,en;q=0.9",
    },
  };

  let exp = "NOT FOUND";

  await axios
    .request(config)
    .then((response) => {
      // console.log(JSON.stringify(response.data));
      const $ = cheerio.load(response.data);
      const elements = $(".styles_characteristic__nbbma");
      for (let i = 0; i < elements.length; i++) {
        if (elements.eq(i).find("dt").text().toLowerCase() === "experience") {
          exp = elements.eq(i).find("dd").text();
        }
      }
      console.log(exp);
      //console.log(elements.eq(4).find("dt").text());
    })
    .catch((error) => {
      console.log(error);
    });

  return exp;
};

module.exports = expExtractor;
