// MOCK CRON JOB.
async function sampleCronTask() {
  try {
    console.log('Im doing Sample Cron Task!');
  } catch (e) {
    console.log(`Error during sampleCronTask : ${JSON.stringify(e.message || e, null, 2)}`, {});
  }
}


module.exports = sampleCronTask;