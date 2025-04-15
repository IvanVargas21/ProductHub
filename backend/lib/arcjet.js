import arcjet, { tokenBucket, shield, detectbot} from '@arcjet/node'

// imports config function
// loads env variables from .env file into process.env
import "dotenv/config";

// init arcjet library
export const aj = arcjet ({
    key: process.env.ARCJET_KEY,
    characteristics: ["ip.src"],  // Track req by IP
    rules: [
      // shield protects your app from common attack e.g., SQL injection, XSS, CSRF attacks.
      shield({mode:"LIVE"}),
      detectbot({
        mode:"LIVE", // Blocks reqs. Use "DRY_RUN" to log only
        // block all bots excet engines
        allow:[
          "CATEGORY:SEARCH_ENGINE" // Google, Bing, etc.
          //  see the full list at https://arcjet.com/bot-list.
          
        ]
        
      }),
       // Create a token bucket rate limit. 
      tokenBucket({
        mode: "LIVE",
        refillRate: 5,  // Refill 5 tokens per interval
        interval: 10,   // Refill every 10 secs
        capacity: 10,   // Bucket Capacity of 10 tokens
      }),
    ]
})