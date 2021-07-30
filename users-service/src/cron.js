"use strict";

const cron = require('node-cron');
const config = require('./config');
const { redeemPoint,notifyMe,updateDealofDay,minimumInventory,expireRedeemPoint } = require('./cronjobs');

// Ref: https://www.npmjs.com/package/node-cron
/**
 * SAMPLE SCHEDULERS EXAMPLES
 * Schedule in every 1 minute:   *\1 * * * *
 * Schedule in every 1 hour:     * *\1 * * *
 * Schedule In every 12 hours:   0 *\12 * * *
 * Schedule In 7:00 AM Daily:    0 7 * * *
*/

var cronOptions = {
   scheduled: true,
   timezone: config.timeZone
};

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

/**
 * Schedule Time: In every 1 hour
 * Schedule Task: To transfer referral amount to user
*/
//cron.schedule('* */1 * * *', UserReferral.transferReferralAmount, cronOptions);

/**
 * Schedule Time: In every 1 hour
 * Schedule Task: To transfer reward points to user
*/
//cron.schedule('* */1 * * *', UserRewards.transferRewardPoints, cronOptions);

/**
 * Schedule Time: In every 1 hour
 * Schedule Task: To transfer promocode cashback to user
*/
cron.schedule(`0 */12 * * *`, redeemPoint, cronOptions);
cron.schedule('*/1 * * * *', notifyMe, cronOptions);
cron.schedule('*/1 * * * *', updateDealofDay, cronOptions);
cron.schedule('*/1 * * * *', minimumInventory, cronOptions);
cron.schedule('*/1 * * * *', expireRedeemPoint, cronOptions);
