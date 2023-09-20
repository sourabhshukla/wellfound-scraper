const cookies = [
  '_fbp=fb.1.1692899367902.1242967212; _gcl_au=1.1.849020089.1692899368; _ga=GA1.1.1476347584.1692899368; _hjSessionUser_1444722=eyJpZCI6IjgyNzYwNmU5LTJjOWYtNTNkYS04MDc5LWUzZGEzZjExMjkyMSIsImNyZWF0ZWQiOjE2OTI4OTkzNjc4ODgsImV4aXN0aW5nIjp0cnVlfQ==; _ga_705F94181H=deleted; g_state={"i_p":1695553733823,"i_l":4}; _hjIncludedInSessionSample_1444722=0; _hjSession_1444722=eyJpZCI6IjQ3ZDVmNTVjLTY5MWUtNDcwMy04MTcyLWQwZDdlYzU0Yjk5NyIsImNyZWF0ZWQiOjE2OTMzMDUxNDA3NzAsImluU2FtcGxlIjpmYWxzZX0=; _hjAbsoluteSessionInProgress=0; ln_or=eyIzNjQ2NjQ0IjoiZCJ9; ajs_anonymous_id=b33fa9f8-8b88-4e65-9da5-5e1af2a82684; _wellfound=ffc11bcb98a001659769f4b3e6ac71d3; logged_in=true; ajs_user_id=16894998; _hjHasCachedUserAttributes=true; iterableEmailCampaignId=1189758; iterableTemplateId=1661515; iterableMessageId=6bc32ed3161a47ff86c72c75e473fd67; iterableEndUserId=s87451004%40gmail.com; _ga_705F94181H=GS1.1.1693305141.17.1.1693305377.40.0.0; datadome=0RDWiXb_c8CaqJFnnpZD1q3V-3Z3oZRh5y9QHzgP8a1XI_brWSUtA1To3qFdJZmiF4HZkZpkq5VuUi6ULYK8WlCO3pMKPeJ-w48wogGk85g8msO9faXjMxDM0K7Ip9db; _mkra_stck=4306bf61ead7ad25d647d5e6f31d903e%3A1693307601.1750877; _wellfound=ffc11bcb98a001659769f4b3e6ac71d3; datadome=Xxa_45N_0DIHIkOmUymBXegpNnkVH4ZUsov42n71ChUbcpNi6fYwPdITxSd4Rcqc9yNkhk-9UKK3btHfOW~qlWjW8~VpBpbWPJzO2KgslkDGEHnW-UeoZrg7rtWreDr',
];

//const keywords = ["react", "reactjs", "react.js"];

const keywords = {
  qa: ["selenium"],
  frontend: ["react"],
  fdt: ["mern"],
  bdt: ["java", "nodejs"],
};

const generateHeaderConfig = (cookie, data) => {
  return {
    method: "post",
    maxBodyLength: Infinity,
    url: "https://wellfound.com/graphql?fallbackAOR=talent",
    headers: {
      "Accept-Language": "en-US,en;q=0.9",
      "Content-Type": "application/json",
      Cookie: cookie,
      Pragma: "no-cache",
      "Sec-Ch-Device-Memory": "8",
      "Sec-Ch-Ua":
        '"Not/A)Brand";v="99", "Microsoft Edge";v="115", "Chromium";v="115"',
      "Sec-Ch-Ua-Arch": '"x86"',
      "Sec-Ch-Ua-Full-Version-List":
        '"Not/A)Brand";v="99.0.0.0", "Microsoft Edge";v="115.0.1901.203", "Chromium";v="115.0.5790.171"',
      "Sec-Ch-Ua-Mobile": "?0",
      "Sec-Ch-Ua-Model": '""',
      "Sec-Ch-Ua-Platform": '"Windows"',
      "Sec-Fetch-Dest": "empty",
      "Sec-Fetch-Mode": "same-origin",
      "Sec-Fetch-Site": "same-origin",
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36 Edg/115.0.1901.203",
      "X-Angellist-Dd-Client-Referrer-Resource": "/jobs",
      "X-Requested-With": "XMLHttpRequest",
    },
    data: data,
  };
};

const generateData = (
  page_number,
  customJobTitles,
  locationsTagIds = ["1647"],
  remoteCompanyLocationTagIds = ["153509"],
  equity = [null, null],
  // remotePreference = "NO_REMOTE",
  remotePreference = "REMOTE_OPEN",
  salary = [null, null],
  exp = [null, null]
) => {
  return JSON.stringify({
    operationName: "JobSearchResultsX",
    variables: {
      filterConfigurationInput: {
        page: page_number,
        customJobTitles: customJobTitles,
        locationTagIds: locationsTagIds,
        remoteCompanyLocationTagIds: remoteCompanyLocationTagIds,
        equity: {
          min: equity[0],
          max: equity[1],
        },
        remotePreference: remotePreference,
        salary: {
          min: salary[0],
          max: salary[1],
        },
        yearsExperience: {
          min: exp[0],
          max: exp[1],
        },
      },
    },
    extensions: {
      operationId:
        "tfe/b898ee628dd3385e1b8c467e464a0261ad66c478eda6e21e10566b0ca4ccf1e9",
    },
  });
};

module.exports = { keywords, cookies, generateHeaderConfig, generateData };
