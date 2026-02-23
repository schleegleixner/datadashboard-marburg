# Connect the Dashboard with a CMS

Compared to [https://klimadashboard.ms/](Klimadashboard Münster), this setup uses a CMS for nearly all of its content. The goal is to minimize the need for frontend updates and allow users to create new tiles without a web developer’s assistance.

All data from the CMS is downloaded and stored locally in the `assets/cache` folder. Only live data (e.g., weather or traffic) is requested on page load. If you anticipate high traffic, consider using a more robust caching solution.

The CMS is not part of the open source project but if you need access consider getting in touch with us.

## Bring Your Own CMS

You can also supply the data from a different CMS by providing your own application inteface but you will need to recreate or rewrite the various endpoints to maintain functionality. A good starting point is the `lib/cms.ts` file.
