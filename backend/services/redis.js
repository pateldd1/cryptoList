let await = require('asyncawait/await');
let asynchronous = require('asyncawait/async');
const redis = require("redis");
let bluebird = require('bluebird');
bluebird.promisifyAll(redis.RedisClient.prototype);
let RedisCache;

if (!RedisCache) {
    if (process.env.NODE_ENV === 'production') {
        RedisCache = redis.createClient(process.env.REDISCLOUD_URL);
    } else {
        RedisCache = redis.createClient();
    }
    RedisCache.on("error", function (err) {
        console.log("Error " + err);
    });
}

exports.getFromTheCache = asynchronous(function (key) {
    let myCacheValue;
    myCacheValue = await(RedisCache.getAsync(key));
    if (myCacheValue) {
        return JSON.parse(myCacheValue);
    }
    return null;
});

exports.setInCache = asynchronous(function (key, value, secondsExpiry=600) {
    RedisCache.set(key, JSON.stringify(value), 'EX', secondsExpiry);
});

exports.removeFromCache = function (key) {
    RedisCache.delAsync(key).then((response) => {
        console.log(response);
    })
};

exports.RedisCache = RedisCache;