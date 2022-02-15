# Troubleshouting

## Common build errors

If any errors are detected during the build phase, a message is displayed.
Common causes for such errors are as follows:

`[next] 🕸️ - m2: Failed to generate schema: request to [...] failed, reason: connect ETIMEDOUT`  
Missing MAGENTO_ENDPOINT environment variable in your .env file

`[next] error - Error: Unexpected token < in JSON at position 0`  
Your Magento version is outdated. Make sure you are running 2.4.3 and up

`Error: Invalid src prop ([...]) on 'next/image', hostname "[...]" is not configured under images in your 'next.config.js'`  
Add your
