"use client";
"use client";
'use client'
import dynamic from 'next/dynamic'

const WordCounter        = dynamic(() => import('./WordCounter'))
const JsonFormatter      = dynamic(() => import('./JsonFormatter'))
const PasswordGenerator  = dynamic(() => import('./PasswordGenerator'))
const Base64Tool         = dynamic(() => import('./Base64Tool'))
const UrlEncoder         = dynamic(() => import('./UrlEncoder'))
const SlugGenerator      = dynamic(() => import('./SlugGenerator'))
const HexToRgb           = dynamic(() => import('./HexToRgb'))
const UuidGenerator      = dynamic(() => import('./UuidGenerator'))
const CssGradient        = dynamic(() => import('./CssGradient'))
const MetaTagGenerator   = dynamic(() => import('./MetaTagGenerator'))
const TextCaseConverter  = dynamic(() => import('./TextCaseConverter'))
const PasswordStrength   = dynamic(() => import('./PasswordStrength'))
const CsvToJson          = dynamic(() => import('./CsvToJson'))
const JsonToCsv          = dynamic(() => import('./JsonToCsv'))
const UnitConverter      = dynamic(() => import('./UnitConverter'))
const TimezoneConverter  = dynamic(() => import('./TimezoneConverter'))
const NumberBaseConverter= dynamic(() => import('./NumberBaseConverter'))
const TextReverser       = dynamic(() => import('./TextReverser'))
const TextSorter         = dynamic(() => import('./TextSorter'))
const DuplicateRemover   = dynamic(() => import('./DuplicateRemover'))
const LineBreakRemover   = dynamic(() => import('./LineBreakRemover'))
const RemoveSpaces       = dynamic(() => import('./RemoveSpaces'))
const WordFrequency      = dynamic(() => import('./WordFrequency'))
const KeywordDensity     = dynamic(() => import('./KeywordDensity'))
const RobotsTxtGen       = dynamic(() => import('./RobotsTxtGen'))
const SitemapGenerator   = dynamic(() => import('./SitemapGenerator'))
const OpenGraphGen       = dynamic(() => import('./OpenGraphGen'))
const JwtDecoder         = dynamic(() => import('./JwtDecoder'))
const RegexTester        = dynamic(() => import('./RegexTester'))
const Md5Generator       = dynamic(() => import('./Md5Generator'))
const Sha256Generator    = dynamic(() => import('./Sha256Generator'))
const EncryptDecrypt     = dynamic(() => import('./EncryptDecrypt'))
const ImageToBase64      = dynamic(() => import('./ImageToBase64'))
const Base64ToImage      = dynamic(() => import('./Base64ToImage'))
const TextCompare        = dynamic(() => import('./TextCompare'))
const MarkdownToHtml     = dynamic(() => import('./MarkdownToHtml'))
const LoremGenerator     = dynamic(() => import('./LoremGenerator'))
const PercentageCalc     = dynamic(() => import('./PercentageCalc'))
const GenericTool        = dynamic(() => import('./GenericTool'))

interface Props { toolId: string; accent?: string }

const TOOL_MAP: Record<string, React.ComponentType<{ accent?: string }>> = {
  'word-counter':             WordCounter,
  'json-formatter':           JsonFormatter,
  'password-generator':       PasswordGenerator,
  'base64-encoder':           Base64Tool,
  'url-encoder':              UrlEncoder,
  'slug-generator':           SlugGenerator,
  'hex-to-rgb':               HexToRgb,
  'uuid-generator':           UuidGenerator,
  'css-gradient-generator':   CssGradient,
  'meta-tag-generator':       MetaTagGenerator,
  'text-case-converter':      TextCaseConverter,
  'password-strength-checker':PasswordStrength,
  'csv-to-json':              CsvToJson,
  'json-to-csv':              JsonToCsv,
  'unit-converter':           UnitConverter,
  'timezone-converter':       TimezoneConverter,
  'number-base-converter':    NumberBaseConverter,
  'text-reverser':            TextReverser,
  'text-sorter':              TextSorter,
  'duplicate-line-remover':   DuplicateRemover,
  'line-break-remover':       LineBreakRemover,
  'remove-extra-spaces':      RemoveSpaces,
  'word-frequency-counter':   WordFrequency,
  'keyword-density-checker':  KeywordDensity,
  'robots-txt-generator':     RobotsTxtGen,
  'sitemap-generator':        SitemapGenerator,
  'open-graph-generator':     OpenGraphGen,
  'jwt-decoder':              JwtDecoder,
  'regex-tester':             RegexTester,
  'md5-generator':            Md5Generator,
  'sha256-generator':         Sha256Generator,
  'encrypt-decrypt':          EncryptDecrypt,
  'image-to-base64':          ImageToBase64,
  'base64-to-image':          Base64ToImage,
  'text-compare':             TextCompare,
  'markdown-to-html':         MarkdownToHtml,
  'random-text-generator':    LoremGenerator,
  'percentage-calculator':    PercentageCalc,
}

export default function ToolUI({ toolId, accent }: Props) {
  const Component = TOOL_MAP[toolId] ?? GenericTool
  return <Component accent={accent} />
}
