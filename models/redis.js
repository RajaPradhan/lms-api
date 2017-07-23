import redis from 'redis';

const redisClient = redis.createClient();

redisClient.on('connect', () => {
  console.log('[Redis]: Connected to Redis');
});

export default redisClient;
