---
'@graphcommerce/next-ui': patch
---

Fix two bugs in `toDate`:

- ISO datetime strings with a timezone offset (e.g. `2024-01-15T10:30:00-05:00`) were being corrupted into `Invalid Date`, because `replace(/-/g, '/')` was applied to every string instead of only to plain `YYYY-MM-DD` dates
- Strings in Magento's `DATETIME_SLASH_PHP_FORMAT` (`d/m/Y H:i:s`) were misparsed as `MM/DD/YYYY` by the native `Date` constructor, silently producing the wrong date or `undefined`
