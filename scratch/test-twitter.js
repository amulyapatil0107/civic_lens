import { TwitterApi } from 'twitter-api-v2';
import dotenv from 'dotenv';
dotenv.config();

async function testTwitter() {
  const client = new TwitterApi({
    appKey: process.env.TWITTER_API_KEY,
    appSecret: process.env.TWITTER_API_SECRET,
    accessToken: process.env.TWITTER_ACCESS_TOKEN,
    accessSecret: process.env.TWITTER_ACCESS_SECRET,
  });

  try {
    console.log("Testing Twitter credentials...");
    const user = await client.v1.verifyCredentials();
    console.log("✅ Success! Authenticated as:", user.screen_name);
    
    try {
      const tweet = await client.v2.tweet(`Diagnostic test (v2): CivicLens check at ${new Date().toISOString()}`);
      console.log("🚀 v2 Post Success! Tweet ID:", tweet.data.id);
    } catch (v2Error) {
      console.error("❌ v2 Post Failed!");
      console.error("v2 Error Detail:", v2Error.data || v2Error.message);
      console.log("\nTrying v1.1 Fallback...");
      const tweetV1 = await client.v1.tweet(`Diagnostic test (v1.1): CivicLens check at ${new Date().toISOString()}`);
      console.log("🚀 v1.1 Post Success! Tweet ID:", tweetV1.id_str);
    }
    console.log("You can delete the test tweet now.");
  } catch (error) {
    console.error("❌ Action Failed!");
    console.error("Error Detail:", error.data || error.message);
    if (error.code === 401) {
      console.error("\nTIP: This usually means your API Key/Secret or Access Token/Secret are wrong, OR you haven't enabled OAuth 1.0a in the developer portal.");
    }
    if (error.code === 403) {
      console.error("\nTIP: This means you successfully logged in, but you don't have WRITE permissions. You must change your App permissions to 'Read and Write' in the Developer Portal AND then regenerate your tokens.");
    }
  }
}

testTwitter();
