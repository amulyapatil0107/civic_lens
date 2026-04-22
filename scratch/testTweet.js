import { TwitterApi } from 'twitter-api-v2';
import dotenv from 'dotenv';

dotenv.config();

const client = new TwitterApi({
  appKey: process.env.TWITTER_API_KEY,
  appSecret: process.env.TWITTER_API_SECRET,
  accessToken: process.env.TWITTER_ACCESS_TOKEN,
  accessSecret: process.env.TWITTER_ACCESS_SECRET,
});

async function testPost() {
  try {
    console.log('🔑 Testing Twitter API credentials...');
    console.log(`   API Key: ${process.env.TWITTER_API_KEY?.slice(0, 8)}...`);
    console.log(`   Access Token: ${process.env.TWITTER_ACCESS_TOKEN?.slice(0, 15)}...`);
    
    const { data } = await client.v2.tweet(
      '🏗️ CivicLens Test — This is an automated test post from the CivicLens civic transparency platform. #CivicLens #TestPost'
    );

    console.log('✅ Tweet posted successfully!');
    console.log(`   Tweet ID: ${data.id}`);
    console.log(`   URL: https://twitter.com/i/web/status/${data.id}`);
  } catch (error) {
    console.error('❌ Tweet failed!');
    console.error(`   Error: ${error.message}`);
    if (error.data) {
      console.error(`   Details:`, JSON.stringify(error.data, null, 2));
    }
  }
}

testPost();
