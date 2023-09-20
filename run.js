const {
  keywords,
  cookies,
  generateHeaderConfig,
  generateData,
} = require("./config");
const axios = require("axios");
const { Job } = require("./models/job.model");

const startScraping = async () => {
  for (let track in keywords) {
    let jobTitles = keywords[track];
    let currPageNumber = 1;

    let hasNextPage = true;

    while (hasNextPage) {
      console.log(jobTitles);
      let data = generateData(currPageNumber, jobTitles);
      let config = generateHeaderConfig(cookies[0], data);
      await axios
        .request(config)
        .then(async (response) => {
          console.log(
            `=====================================${track} Page No. ${currPageNumber}=============================`
          );
          // console.log(JSON.stringify(response.data));
          const companies =
            response.data.data.talent.jobSearchResults.startups.edges;
          for (let company of companies) {
            let companyId = company.node.id;
            let companyLogo = company.node.logoUrl;
            let companyName = company.node.name;
            let companySlug = company.node.slug;
            let companySize = company.node.companySize;
            let jobs = company.node.highlightedJobListings;

            for (let job of jobs) {
              let jobDescription = job.description;
              let jobId = job.id;
              let jobType = job.jobType;
              let isRemote = job.remote;
              let jobTitle = job.title;
              let jobSlug = job.slug;
              let jobUrl = `https://wellfound.com/jobs/${jobId}-${jobSlug}`;
              let jobCompensation = job.compensation;
              let equity = job.equity;
              let jobLocationNames = job.locationNames;
              let jobPostedAt = job.liveStartAt;
              let jobProcessedAt = job.lastRespondedAt;
              let primaryRoleTitle = job.primaryRoleTitle;
              await publishJob(
                track,
                jobId,
                jobType,
                jobSlug,
                jobTitle,
                jobUrl,
                isRemote,
                jobCompensation,
                equity,
                jobLocationNames,
                jobPostedAt,
                jobProcessedAt,
                primaryRoleTitle,
                jobDescription,
                companyId,
                companySize,
                companyName,
                companySlug,
                companyLogo
              );
            }
          }
          currPageNumber++;
          hasNextPage = response.data.data.talent.jobSearchResults.hasNextPage;
          //await publishJob();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }
};

const publishJob = async (
  track,
  jobId,
  jobType,
  jobSlug,
  jobTitle,
  jobUrl,
  isRemote,
  jobCompensation,
  equity,
  jobLocationNames,
  jobPostedAt,
  jobProcessedAt,
  primaryRoleTitle,
  jobDescription,
  companyId,
  companySize,
  companyName,
  companySlug,
  companyLogo
) => {
  //   const isAlreadyPresent = await Job.find({ jobId: jobId });
  //   if (isAlreadyPresent) {
  //     console.log(
  //       "========================================Job Already Exists================================================="
  //     );
  //     return;
  //   }
  // console.log("here");
  try {
    await axios
      .post("http://127.0.0.1:4000/api/v1", {
        track: track,
        jobId: jobId,
        jobType: jobType,
        jobSlug: jobSlug,
        jobTitle: jobTitle,
        jobUrl: jobUrl,
        isRemote: isRemote,
        jobCompensation: jobCompensation,
        equity: equity,
        jobLocationNames: jobLocationNames,
        jobPostedAt: jobPostedAt,
        jobProcessedAt: jobProcessedAt,
        primaryRoleTitle: primaryRoleTitle,
        jobDescription: jobDescription,
        companyId: companyId,
        companySize: companySize,
        companyName: companyName,
        companySlug: companySlug,
        companyLogo: companyLogo,
      })
      .then((res) => console.log(res.data.success));
  } catch (e) {
    console.log("Failure");
    console.log(equity);
    throw new Error(e);
  }
};

startScraping();
