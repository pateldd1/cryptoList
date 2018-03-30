const { RedisCache } = require('./redis');

const async = require('asyncawait/async');
const await = require('asyncawait/await');

const util = require('util');
require('util.promisify').shim();
const lock = util.promisify(require('redis-lock')(RedisCache));
 
exports.LOCK_PREFIX = {
    OFFERING_NAME: "offering-name-",
}

exports.lock = async(function (prefix, lockKey) {
    const lockName = prefix + lockKey;
    const unlock = await(lock(lockName));
    return unlock;
});