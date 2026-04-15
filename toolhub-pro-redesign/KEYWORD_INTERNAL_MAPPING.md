# ToolHub Pro — Keyword & Internal Link Mapping

## Primary Target Keywords (Homepage)

| Page | Target Keyword | Search Intent | URL |
|------|---------------|---------------|-----|
| Homepage | json formatter | Informational/Tool | / |
| Homepage | json validator | Informational/Tool | / |
| Homepage | free online tools | Navigational | / |
| Homepage | json beautifier | Tool | / |
| Homepage | format json online | Tool | / |

---

## Category-Level Keyword Mapping

### 👨‍💻 Developer Tools
**URL**: `/tools/category/developer`
**H1**: "Free Online Developer Tools — JSON, Base64, Regex & More"

| Tool | Primary Keyword | Secondary Keywords | URL |
|------|----------------|--------------------|-----|
| JSON Formatter | json formatter online | json validator, json beautifier, format json | /tools/json-formatter |
| Base64 Encoder | base64 encoder decoder | encode base64, decode base64, base64 online | /tools/base64-encoder |
| URL Encoder | url encoder decoder | percent encoding, encode url online | /tools/url-encoder |
| JWT Decoder | jwt decoder | json web token decoder, jwt inspector | /tools/jwt-decoder |
| Regex Tester | regex tester | regular expression tester, test regex online | /tools/regex-tester |
| Markdown to HTML | markdown to html | md to html, markdown converter | /tools/markdown-to-html |
| CSV to JSON | csv to json | convert csv to json, csv parser | /tools/csv-to-json |
| JSON to CSV | json to csv | convert json to csv, json csv converter | /tools/json-to-csv |
| YAML to JSON | yaml to json | convert yaml json, yaml parser | /tools/yaml-to-json |

### ✍️ Text Tools
**URL**: `/tools/category/text`
**H1**: "Free Online Text Tools — Word Counter, Case Converter & More"

| Tool | Primary Keyword | Secondary Keywords | URL |
|------|----------------|--------------------|-----|
| Word Counter | word counter | character counter, word count tool | /tools/word-counter |
| Text Case Converter | text case converter | uppercase converter, camelcase converter | /tools/text-case-converter |
| Slug Generator | slug generator | url slug, permalink generator | /tools/slug-generator |
| Text Reverser | text reverser | reverse string, backwards text | /tools/text-reverser |
| Remove Extra Spaces | remove extra spaces | trim whitespace, clean text | /tools/remove-extra-spaces |
| Duplicate Line Remover | remove duplicate lines | deduplicate text, unique lines | /tools/duplicate-line-remover |
| Text Compare | text compare | diff tool, find differences in text | /tools/text-compare |
| Text Sorter | text sorter | sort lines alphabetically, line sorter | /tools/text-sorter |
| Lorem Ipsum Generator | lorem ipsum generator | placeholder text, dummy text | /tools/random-text-generator |
| Line Break Remover | remove line breaks | remove newlines, join lines | /tools/line-break-remover |
| Character Counter | character counter | twitter character counter, sms character limit | /tools/character-counter |

### 🔐 Security Tools
**URL**: `/tools/category/security`
**H1**: "Free Online Security Tools — Password Generator, Hash Generator"

| Tool | Primary Keyword | Secondary Keywords | URL |
|------|----------------|--------------------|-----|
| Password Generator | password generator | strong password generator, random password | /tools/password-generator |
| Password Strength | password strength checker | password security, password analyzer | /tools/password-strength-checker |
| MD5 Generator | md5 generator | md5 hash, generate md5 online | /tools/md5-generator |
| SHA-256 Generator | sha256 generator | sha256 hash, generate sha256 | /tools/sha256-generator |
| UUID Generator | uuid generator | guid generator, generate uuid v4 | /tools/uuid-generator |
| Encrypt/Decrypt | text encrypt decrypt | aes encryption, encrypt text online | /tools/encrypt-decrypt |

### 🔍 SEO Tools
**URL**: `/tools/category/seo`
**H1**: "Free Online SEO Tools — Meta Tags, Sitemap Generator & More"

| Tool | Primary Keyword | Secondary Keywords | URL |
|------|----------------|--------------------|-----|
| Keyword Density | keyword density checker | keyword frequency, seo keyword analysis | /tools/keyword-density-checker |
| Meta Tag Generator | meta tag generator | seo meta tags, meta description generator | /tools/meta-tag-generator |
| Robots.txt Generator | robots txt generator | create robots txt, googlebot rules | /tools/robots-txt-generator |
| Sitemap Generator | sitemap generator | xml sitemap, google sitemap creator | /tools/sitemap-generator |
| Open Graph Generator | open graph generator | og tags, social media meta tags | /tools/open-graph-generator |
| URL Slug Generator | url slug generator | seo url slug, permalink generator | /tools/url-slug-generator |
| Word Frequency Counter | word frequency counter | most common words, text frequency | /tools/word-frequency-counter |

### 🔄 Converter Tools
**URL**: `/tools/category/converters`
**H1**: "Free Online Converter Tools — CSV to JSON, Unit & Base Converter"

| Tool | Primary Keyword | Secondary Keywords | URL |
|------|----------------|--------------------|-----|
| CSV to JSON | csv to json converter | convert csv to json, csv parser online | /tools/csv-to-json |
| JSON to CSV | json to csv converter | export json to csv, json to spreadsheet | /tools/json-to-csv |
| Unit Converter | unit converter | length converter, weight converter | /tools/unit-converter |
| Timezone Converter | timezone converter | world time converter, convert timezones | /tools/timezone-converter |
| Number Base Converter | number base converter | binary converter, hex converter | /tools/number-base-converter |
| Roman Numeral | roman numeral converter | roman to arabic, convert roman numerals | /tools/roman-numeral-converter |

### 🎨 Utility Tools
**URL**: `/tools/category/utility`
**H1**: "Free Online Utility Tools — Color Converter, CSS Gradient & More"

| Tool | Primary Keyword | Secondary Keywords | URL |
|------|----------------|--------------------|-----|
| Image to Base64 | image to base64 | convert image base64, data uri image | /tools/image-to-base64 |
| Base64 to Image | base64 to image | decode base64 image, base64 image viewer | /tools/base64-to-image |
| Hex to RGB | hex to rgb | hex color converter, rgb to hex | /tools/hex-to-rgb |
| CSS Gradient | css gradient generator | gradient maker, linear gradient css | /tools/css-gradient-generator |
| Percentage Calculator | percentage calculator | percent calculator, calculate percentage | /tools/percentage-calculator |
| Color Palette Generator | color palette generator | color scheme generator, css color palette | /tools/color-palette-generator |
| Countdown Timer | countdown timer | online timer, countdown clock | /tools/countdown-timer |

---

## Internal Linking Strategy

### Rule 1: Each Tool Page Links To
- ✅ 3 related tools (same category, listed in `relatedTools` array)
- ✅ Category page
- ✅ Homepage (via breadcrumb + CTA)
- ✅ 4 more tools in same category (bottom section)

### Rule 2: Category Pages Link To
- ✅ All tools in that category
- ✅ All other category pages
- ✅ Homepage (via breadcrumb)

### Rule 3: Homepage Links To
- ✅ All 50+ tool cards
- ✅ All 6 category pages
- ✅ Latest blog articles

### Rule 4: Footer Tag Cloud
- ✅ Every tool name → `/tools/{id}` (ensures every page crawled)
- ✅ Every category → `/tools/category/{id}`

---

## SEO Structure Per Page

```
<html lang="en">
  <head>
    <title>Free {Tool Name} Online — ToolHub Pro | {Category} Tools</title>
    <meta name="description" content="{tool.longDesc truncated to 155 chars}">
    <link rel="canonical" href="https://toolhubpro.com/tools/{id}">
    <meta property="og:title" content="...">
    <meta property="og:description" content="...">
    <!-- JSON-LD WebApplication schema -->
    <!-- JSON-LD FAQPage schema -->
  </head>
```

### Schema Markup Applied

| Page Type | Schema |
|-----------|--------|
| Homepage | WebSite + SoftwareApplication + FAQPage |
| Tool page | WebApplication + FAQPage |
| Category page | ItemList (tools) |
| Blog post | Article |

---

## AdSense Placement Map

| Position | Format | Slot ID | Notes |
|----------|--------|---------|-------|
| Below header (all pages) | Horizontal 728×90 | `1234567890` | Top banner — high visibility |
| After JSON tool (homepage) | Horizontal 728×90 | `0987654321` | **Highest CTR zone** |
| After tool section 2 | Horizontal 728×90 | `ad-between-1` | Between Dev + Text groups |
| After tool section 4 | Horizontal 728×90 | `ad-between-3` | Between Security + SEO groups |
| Sidebar (tool pages) | Rectangle 300×250 | `tool-sidebar` | Sticky desktop sidebar |
| After tool widget | Horizontal 728×90 | `tool-after` | Post-engagement high CTR |
| Bottom (before footer) | Horizontal 728×90 | `9876543210` | Bottom fallback |

### AdSense Setup (Production)
1. Add to `layout.tsx` `<head>`:
```html
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXX" crossorigin="anonymous"></script>
```
2. Replace `<!-- Production AdSense -->` comments in `AdBanner.tsx` with real `<ins>` tags
3. Use Auto Ads as supplement for mobile gap filling

---

## Keyword Density Target
- **Homepage H1**: Contains "JSON Formatter" + "Validator" (primary keywords)
- **Body**: JSON mentioned 6–10 times naturally (within 1–2% density)
- **Each tool page**: Tool name in H1, first paragraph, and 2+ H2s
- **No keyword stuffing**: All mentions are contextual and natural

---

## Sitemap Priority Map

| URL Pattern | Priority | Change Freq |
|-------------|----------|-------------|
| / | 1.0 | weekly |
| /tools/{id} | 0.9 | monthly |
| /tools/category/{cat} | 0.8 | weekly |
| /blog/{id} | 0.7 | monthly |
| /blog | 0.6 | weekly |
| /about, /contact, etc. | 0.3 | yearly |
