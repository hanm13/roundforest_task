const cron = require('node-cron');
const sampleCronTask = require('./tasks/sampleCronTask');

// Add more jobs here...

const runJobs = () => {
    // cron.schedule('*/5 * * * * *', sampleCronTask);
};

module.exports = { runJobs };