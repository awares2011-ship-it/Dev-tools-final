// ================================================================
//  ToolHub Pro — Client-side tool logic
//  All functions are pure / side-effect-free where possible
// ================================================================

// ─── WORD COUNTER ────────────────────────────────────────────────
export function wordCount(text: string) {
  const trimmed = text.trim()
  const words = trimmed === '' ? 0 : trimmed.split(/\s+/).length
  const sentences = (text.match(/[.!?]+/g) || []).length
  const paragraphs = text.split(/\n\s*\n/).filter(p => p.trim()).length || (trimmed ? 1 : 0)
  const lines = text.split('\n').length
  const charsNoSpace = text.replace(/\s/g, '').length
  const unique = new Set((text.toLowerCase().match(/\b\w+\b/g) || [])).size
  const readTime = Math.max(1, Math.ceil(words / 200))
  return { words, chars: text.length, charsNoSpace, sentences, paragraphs, lines, unique, readTime }
}

// ─── TEXT CASE ───────────────────────────────────────────────────
export type CaseType = 'upper'|'lower'|'title'|'sentence'|'camel'|'pascal'|'snake'|'kebab'|'dot'|'constant'

export function convertCase(text: string, type: CaseType): string {
  switch (type) {
    case 'upper':    return text.toUpperCase()
    case 'lower':    return text.toLowerCase()
    case 'title':    return text.replace(/\b\w+/g, w => w[0].toUpperCase() + w.slice(1).toLowerCase())
    case 'sentence': return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase()
    case 'camel':    return text.replace(/(?:^\w|[A-Z]|\b\w)/g, (w, i) => i === 0 ? w.toLowerCase() : w.toUpperCase()).replace(/\s+/g, '')
    case 'pascal':   return text.replace(/(?:^\w|[A-Z]|\b\w)/g, w => w.toUpperCase()).replace(/\s+/g, '')
    case 'snake':    return text.toLowerCase().replace(/[\s-]+/g, '_').replace(/[^\w_]/g, '')
    case 'kebab':    return text.toLowerCase().replace(/[\s_]+/g, '-').replace(/[^a-z0-9-]/g, '')
    case 'dot':      return text.toLowerCase().replace(/[\s_-]+/g, '.').replace(/[^\w.]/g, '')
    case 'constant': return text.toUpperCase().replace(/[\s-]+/g, '_').replace(/[^\w_]/g, '')
    default: return text
  }
}

// ─── SLUG GENERATOR ──────────────────────────────────────────────
export function generateSlug(text: string, separator = '-', lowercase = true): string {
  let s = text.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
  s = s.replace(/[^\w\s-]/g, '')
  s = s.replace(/[\s_]+/g, separator)
  s = s.replace(new RegExp(`${separator}+`, 'g'), separator)
  s = s.replace(new RegExp(`^${separator}|${separator}$`, 'g'), '')
  return lowercase ? s.toLowerCase() : s
}

// ─── TEXT REVERSER ───────────────────────────────────────────────
export function reverseText(text: string, mode: 'chars'|'words'|'lines' = 'chars'): string {
  switch (mode) {
    case 'chars': return text.split('').reverse().join('')
    case 'words': return text.split(/\s+/).reverse().join(' ')
    case 'lines': return text.split('\n').reverse().join('\n')
  }
}

// ─── REMOVE EXTRA SPACES ─────────────────────────────────────────
export function removeExtraSpaces(text: string, opts = { nbsp: true, trim: true, collapse: true }) {
  let s = text
  if (opts.nbsp) s = s.replace(/\u00a0/g, ' ')
  if (opts.collapse) s = s.replace(/[ \t]+/g, ' ')
  if (opts.trim) s = s.split('\n').map(l => l.trim()).join('\n').replace(/\n{3,}/g, '\n\n')
  return s
}

// ─── DUPLICATE LINE REMOVER ──────────────────────────────────────
export function removeDuplicateLines(text: string, caseSensitive = true, trimLines = true): string {
  const lines = text.split('\n')
  const seen = new Set<string>()
  return lines.filter(line => {
    const key = (trimLines ? line.trim() : line)
    const cmp = caseSensitive ? key : key.toLowerCase()
    if (seen.has(cmp)) return false
    seen.add(cmp)
    return true
  }).join('\n')
}

// ─── TEXT COMPARE ────────────────────────────────────────────────
export interface DiffLine { type: 'same'|'added'|'removed'; text: string }
export function diffTexts(a: string, b: string): DiffLine[] {
  const linesA = a.split('\n')
  const linesB = b.split('\n')
  const result: DiffLine[] = []
  const maxLen = Math.max(linesA.length, linesB.length)
  for (let i = 0; i < maxLen; i++) {
    const la = linesA[i], lb = linesB[i]
    if (la === lb) result.push({ type: 'same', text: la ?? '' })
    else {
      if (la !== undefined) result.push({ type: 'removed', text: la })
      if (lb !== undefined) result.push({ type: 'added', text: lb })
    }
  }
  return result
}

// ─── TEXT SORTER ─────────────────────────────────────────────────
export function sortLines(text: string, mode: 'az'|'za'|'len-asc'|'len-desc'|'numeric', removeEmpty = false): string {
  let lines = text.split('\n')
  if (removeEmpty) lines = lines.filter(l => l.trim())
  switch (mode) {
    case 'az':       lines.sort((a, b) => a.localeCompare(b)); break
    case 'za':       lines.sort((a, b) => b.localeCompare(a)); break
    case 'len-asc':  lines.sort((a, b) => a.length - b.length); break
    case 'len-desc': lines.sort((a, b) => b.length - a.length); break
    case 'numeric':  lines.sort((a, b) => parseFloat(a) - parseFloat(b)); break
  }
  return lines.join('\n')
}

// ─── LINE BREAK REMOVER ──────────────────────────────────────────
export function removeLineBreaks(text: string, separator = ' '): string {
  return text.replace(/\r\n|\r|\n/g, separator).replace(/ +/g, ' ').trim()
}

// ─── LOREM IPSUM ─────────────────────────────────────────────────
const LOREM_WORDS = 'lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt mollit anim id est laborum'.split(' ')

export function generateLorem(type: 'words'|'sentences'|'paragraphs', count = 1): string {
  const randWord = () => LOREM_WORDS[Math.floor(Math.random() * LOREM_WORDS.length)]
  const sentence = () => {
    const len = 8 + Math.floor(Math.random() * 12)
    const words = Array.from({ length: len }, randWord)
    words[0] = words[0].charAt(0).toUpperCase() + words[0].slice(1)
    return words.join(' ') + '.'
  }
  const paragraph = () => Array.from({ length: 4 + Math.floor(Math.random() * 3) }, sentence).join(' ')

  if (type === 'words') return Array.from({ length: count }, randWord).join(' ')
  if (type === 'sentences') return Array.from({ length: count }, sentence).join(' ')
  return Array.from({ length: count }, paragraph).join('\n\n')
}

// ─── JSON FORMATTER ──────────────────────────────────────────────
export interface JSONResult { ok: boolean; output: string; error?: string }

export function formatJSON(input: string, indent = 2): JSONResult {
  try {
    const parsed = JSON.parse(input)
    return { ok: true, output: JSON.stringify(parsed, null, indent) }
  } catch (e: unknown) {
    return { ok: false, output: '', error: (e as Error).message }
  }
}

export function minifyJSON(input: string): JSONResult {
  try {
    return { ok: true, output: JSON.stringify(JSON.parse(input)) }
  } catch (e: unknown) {
    return { ok: false, output: '', error: (e as Error).message }
  }
}

export function validateJSON(input: string): { valid: boolean; message: string } {
  try {
    JSON.parse(input)
    return { valid: true, message: '✅ Valid JSON! No errors found.' }
  } catch (e: unknown) {
    return { valid: false, message: `❌ ${(e as Error).message}` }
  }
}

// ─── BASE64 ──────────────────────────────────────────────────────
export function encodeBase64(input: string): string {
  try { return btoa(unescape(encodeURIComponent(input))) }
  catch { return 'Error: Could not encode input' }
}

export function decodeBase64(input: string): string {
  try { return decodeURIComponent(escape(atob(input.trim()))) }
  catch { return 'Error: Invalid Base64 input' }
}

// ─── URL ENCODER ─────────────────────────────────────────────────
export function encodeURLComponent(input: string): string {
  return encodeURIComponent(input)
}
export function decodeURLComponent(input: string): string {
  try { return decodeURIComponent(input) }
  catch { return 'Error: Invalid encoded URL' }
}
export function encodeURLFull(input: string): string {
  return input.split('').map(c => /[a-zA-Z0-9\-_.~:/?#\[\]@!$&'()*+,;=%]/.test(c) ? c : encodeURIComponent(c)).join('')
}

// ─── HTML FORMATTER ──────────────────────────────────────────────
export function formatHTML(input: string, indent = 2): string {
  const pad = (n: number) => ' '.repeat(n * indent)
  let level = 0
  return input
    .replace(/>\s*</g, '>\n<')
    .split('\n')
    .map(line => {
      line = line.trim()
      if (!line) return ''
      if (line.match(/^<\/\w/)) level--
      const result = pad(level) + line
      if (line.match(/^<\w[^/]*[^/]>$/) && !line.match(/<\//)) level++
      return result
    })
    .filter(Boolean)
    .join('\n')
}

// ─── CSS MINIFIER ────────────────────────────────────────────────
export function minifyCSS(input: string): string {
  return input
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/\s*([{}:;,>~+])\s*/g, '$1')
    .replace(/\s+/g, ' ')
    .replace(/;\}/g, '}')
    .replace(/0\.(\d)/g, '.$1')
    .replace(/(: *)0(px|em|rem|%|vh|vw)/g, '$10')
    .trim()
}

// ─── JS MINIFIER ─────────────────────────────────────────────────
export function minifyJS(input: string): string {
  return input
    .replace(/\/\/[^\n]*/g, '')
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/\n\s*/g, ' ')
    .replace(/\s{2,}/g, ' ')
    .replace(/\s*([\{\}\(\)\[\];,=+\-*/<>!&|:?])\s*/g, '$1')
    .trim()
}

// ─── SQL FORMATTER ───────────────────────────────────────────────
const SQL_KEYWORDS = ['SELECT','FROM','WHERE','JOIN','LEFT JOIN','RIGHT JOIN','INNER JOIN','OUTER JOIN',
  'ON','GROUP BY','ORDER BY','HAVING','LIMIT','OFFSET','INSERT INTO','VALUES','UPDATE','SET','DELETE',
  'CREATE TABLE','ALTER TABLE','DROP TABLE','AND','OR','NOT','IN','LIKE','IS NULL','IS NOT NULL',
  'BETWEEN','CASE','WHEN','THEN','ELSE','END','UNION','AS','DISTINCT','COUNT','SUM','AVG','MAX','MIN']

export function formatSQL(input: string): string {
  let sql = input.trim()
  // Uppercase keywords
  SQL_KEYWORDS.forEach(kw => {
    sql = sql.replace(new RegExp(`\\b${kw}\\b`, 'gi'), kw)
  })
  // Break on major clauses
  const breakBefore = ['SELECT','FROM','WHERE','LEFT JOIN','RIGHT JOIN','INNER JOIN','JOIN',
    'GROUP BY','ORDER BY','HAVING','LIMIT','UNION','ON']
  breakBefore.forEach(kw => {
    sql = sql.replace(new RegExp(`\\s+${kw}\\b`, 'g'), `\n${kw}`)
  })
  // Indent SELECT columns
  sql = sql.replace(/SELECT\s+/g, 'SELECT\n  ')
  sql = sql.replace(/,(?=\s*\w)/g, ',\n  ')
  return sql.trim()
}

// ─── XML FORMATTER ───────────────────────────────────────────────
export function formatXML(input: string, indent = 2): string {
  const pad = ' '.repeat(indent)
  let level = 0
  let result = ''
  const reg = /(<\/?[^>]+>|[^<]+)/g
  let match
  while ((match = reg.exec(input)) !== null) {
    const token = match[0].trim()
    if (!token) continue
    if (token.startsWith('</')) {
      level--
      result += pad.repeat(level) + token + '\n'
    } else if (token.startsWith('<') && !token.startsWith('<?') && !token.endsWith('/>') && !token.includes('</')) {
      result += pad.repeat(level) + token + '\n'
      level++
    } else {
      result += pad.repeat(level) + token + '\n'
    }
  }
  return result.trim()
}

// ─── JWT DECODER ─────────────────────────────────────────────────
export interface JWTResult {
  header: Record<string, unknown>
  payload: Record<string, unknown>
  signature: string
  expired?: boolean
}

export function decodeJWT(token: string): JWTResult | string {
  try {
    const parts = token.trim().split('.')
    if (parts.length !== 3) return 'Invalid JWT: must have 3 parts separated by dots'
    const b64 = (s: string) => JSON.parse(decodeURIComponent(escape(atob(s.replace(/-/g,'+').replace(/_/g,'/')))))
    const header = b64(parts[0])
    const payload = b64(parts[1])
    const expired = payload.exp ? (payload.exp as number) < Date.now() / 1000 : undefined
    return { header, payload, signature: parts[2], expired }
  } catch (e: unknown) {
    return `Error: ${(e as Error).message}`
  }
}

// ─── REGEX TESTER ────────────────────────────────────────────────
export interface RegexResult {
  matches: RegExpMatchArray[]
  count: number
  error?: string
}

export function testRegex(pattern: string, flags: string, input: string): RegexResult {
  try {
    const re = new RegExp(pattern, flags)
    const matches: RegExpMatchArray[] = []
    let m: RegExpMatchArray | null
    const g = flags.includes('g')
    if (g) {
      while ((m = re.exec(input)) !== null) {
        matches.push(m)
        if (!flags.includes('g')) break
      }
    } else {
      m = re.exec(input)
      if (m) matches.push(m)
    }
    return { matches, count: matches.length }
  } catch (e: unknown) {
    return { matches: [], count: 0, error: (e as Error).message }
  }
}

// ─── PASSWORD GENERATOR ──────────────────────────────────────────
export function generatePassword(opts: {
  length: number
  upper: boolean; lower: boolean; numbers: boolean; symbols: boolean
  count: number
}): string[] {
  const chars = [
    opts.upper   ? 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' : '',
    opts.lower   ? 'abcdefghijklmnopqrstuvwxyz' : '',
    opts.numbers ? '0123456789' : '',
    opts.symbols ? '!@#$%^&*()_+-=[]{}|;:,.<>?' : '',
  ].join('') || 'abcdefghijklmnopqrstuvwxyz'

  const arr = new Uint32Array(opts.length)
  return Array.from({ length: opts.count }, () => {
    crypto.getRandomValues(arr)
    return Array.from(arr, n => chars[n % chars.length]).join('')
  })
}

// ─── PASSWORD STRENGTH ───────────────────────────────────────────
export interface StrengthResult {
  score: 0|1|2|3|4
  label: string
  color: string
  entropy: number
  feedback: string[]
}

export function checkPasswordStrength(pw: string): StrengthResult {
  const feedback: string[] = []
  let charset = 0
  if (/[a-z]/.test(pw)) charset += 26
  if (/[A-Z]/.test(pw)) charset += 26
  if (/[0-9]/.test(pw)) charset += 10
  if (/[^a-zA-Z0-9]/.test(pw)) charset += 32
  const entropy = Math.floor(pw.length * Math.log2(Math.max(charset, 1)))

  if (pw.length < 8)  feedback.push('Use at least 8 characters')
  if (pw.length < 12) feedback.push('12+ characters is recommended')
  if (!/[A-Z]/.test(pw)) feedback.push('Add uppercase letters')
  if (!/[0-9]/.test(pw)) feedback.push('Add numbers')
  if (!/[^a-zA-Z0-9]/.test(pw)) feedback.push('Add symbols (!@#$...)')
  if (/(.)\1{2,}/.test(pw)) feedback.push('Avoid repeated characters')
  if (/^[a-zA-Z]+$/.test(pw)) feedback.push('Mix character types')

  const COMMON = ['password','123456','qwerty','abc123','letmein','welcome','admin','login']
  if (COMMON.includes(pw.toLowerCase())) feedback.push('This is a very common password')

  const score: 0|1|2|3|4 = entropy < 28 ? 0 : entropy < 36 ? 1 : entropy < 60 ? 2 : entropy < 80 ? 3 : 4
  const labels  = ['Very Weak','Weak','Fair','Strong','Very Strong']
  const colors  = ['#E24B4A','#D85A30','#BA7517','#1D9E75','#639922']
  return { score, label: labels[score], color: colors[score], entropy, feedback }
}

// ─── MD5 (pure JS) ───────────────────────────────────────────────
export function md5(input: string): string {
  function safeAdd(x: number, y: number) { const lsw = (x & 0xFFFF) + (y & 0xFFFF); return (((x >> 16) + (y >> 16) + (lsw >> 16)) << 16) | (lsw & 0xFFFF) }
  function bitRotateLeft(num: number, cnt: number) { return (num << cnt) | (num >>> (32 - cnt)) }
  function md5cmn(q: number, a: number, b: number, x: number, s: number, t: number) { return safeAdd(bitRotateLeft(safeAdd(safeAdd(a, q), safeAdd(x, t)), s), b) }
  function md5ff(a:number,b:number,c:number,d:number,x:number,s:number,t:number){return md5cmn((b&c)|((~b)&d),a,b,x,s,t)}
  function md5gg(a:number,b:number,c:number,d:number,x:number,s:number,t:number){return md5cmn((b&d)|(c&(~d)),a,b,x,s,t)}
  function md5hh(a:number,b:number,c:number,d:number,x:number,s:number,t:number){return md5cmn(b^c^d,a,b,x,s,t)}
  function md5ii(a:number,b:number,c:number,d:number,x:number,s:number,t:number){return md5cmn(c^(b|(~d)),a,b,x,s,t)}

  function coremd5(x:number[],len:number){
    x[len>>5] |= 0x80 << (len%32); x[(((len+64)>>>9)<<4)+14] = len
    let a=1732584193,b=-271733879,c=-1732584194,d=271733878
    for(let i=0;i<x.length;i+=16){
      const oa=a,ob=b,oc=c,od=d
      a=md5ff(a,b,c,d,x[i],7,-680876936);d=md5ff(d,a,b,c,x[i+1],12,-389564586);c=md5ff(c,d,a,b,x[i+2],17,606105819);b=md5ff(b,c,d,a,x[i+3],22,-1044525330)
      a=md5ff(a,b,c,d,x[i+4],7,-176418897);d=md5ff(d,a,b,c,x[i+5],12,1200080426);c=md5ff(c,d,a,b,x[i+6],17,-1473231341);b=md5ff(b,c,d,a,x[i+7],22,-45705983)
      a=md5ff(a,b,c,d,x[i+8],7,1770035416);d=md5ff(d,a,b,c,x[i+9],12,-1958414417);c=md5ff(c,d,a,b,x[i+10],17,-42063);b=md5ff(b,c,d,a,x[i+11],22,-1990404162)
      a=md5ff(a,b,c,d,x[i+12],7,1804603682);d=md5ff(d,a,b,c,x[i+13],12,-40341101);c=md5ff(c,d,a,b,x[i+14],17,-1502002290);b=md5ff(b,c,d,a,x[i+15],22,1236535329)
      a=md5gg(a,b,c,d,x[i+1],5,-165796510);d=md5gg(d,a,b,c,x[i+6],9,-1069501632);c=md5gg(c,d,a,b,x[i+11],14,643717713);b=md5gg(b,c,d,a,x[i],20,-373897302)
      a=md5gg(a,b,c,d,x[i+5],5,-701558691);d=md5gg(d,a,b,c,x[i+10],9,38016083);c=md5gg(c,d,a,b,x[i+15],14,-660478335);b=md5gg(b,c,d,a,x[i+4],20,-405537848)
      a=md5gg(a,b,c,d,x[i+9],5,568446438);d=md5gg(d,a,b,c,x[i+14],9,-1019803690);c=md5gg(c,d,a,b,x[i+3],14,-187363961);b=md5gg(b,c,d,a,x[i+8],20,1163531501)
      a=md5gg(a,b,c,d,x[i+13],5,-1444681467);d=md5gg(d,a,b,c,x[i+2],9,-51403784);c=md5gg(c,d,a,b,x[i+7],14,1735328473);b=md5gg(b,c,d,a,x[i+12],20,-1926607734)
      a=md5hh(a,b,c,d,x[i+5],4,-378558);d=md5hh(d,a,b,c,x[i+8],11,-2022574463);c=md5hh(c,d,a,b,x[i+11],16,1839030562);b=md5hh(b,c,d,a,x[i+14],23,-35309556)
      a=md5hh(a,b,c,d,x[i+1],4,-1530992060);d=md5hh(d,a,b,c,x[i+4],11,1272893353);c=md5hh(c,d,a,b,x[i+7],16,-155497632);b=md5hh(b,c,d,a,x[i+10],23,-1094730640)
      a=md5hh(a,b,c,d,x[i+13],4,681279174);d=md5hh(d,a,b,c,x[i],11,-358537222);c=md5hh(c,d,a,b,x[i+3],16,-722521979);b=md5hh(b,c,d,a,x[i+6],23,76029189)
      a=md5hh(a,b,c,d,x[i+9],4,-640364487);d=md5hh(d,a,b,c,x[i+12],11,-421815835);c=md5hh(c,d,a,b,x[i+15],16,530742520);b=md5hh(b,c,d,a,x[i+2],23,-995338651)
      a=md5ii(a,b,c,d,x[i],6,-198630844);d=md5ii(d,a,b,c,x[i+7],10,1126891415);c=md5ii(c,d,a,b,x[i+14],15,-1416354905);b=md5ii(b,c,d,a,x[i+5],21,-57434055)
      a=md5ii(a,b,c,d,x[i+12],6,1700485571);d=md5ii(d,a,b,c,x[i+3],10,-1894986606);c=md5ii(c,d,a,b,x[i+10],15,-1051523);b=md5ii(b,c,d,a,x[i+1],21,-2054922799)
      a=md5ii(a,b,c,d,x[i+8],6,1873313359);d=md5ii(d,a,b,c,x[i+15],10,-30611744);c=md5ii(c,d,a,b,x[i+6],15,-1560198380);b=md5ii(b,c,d,a,x[i+13],21,1309151649)
      a=md5ii(a,b,c,d,x[i+4],6,-145523070);d=md5ii(d,a,b,c,x[i+11],10,-1120210379);c=md5ii(c,d,a,b,x[i+2],15,718787259);b=md5ii(b,c,d,a,x[i+9],21,-343485551)
      a=safeAdd(a,oa);b=safeAdd(b,ob);c=safeAdd(c,oc);d=safeAdd(d,od)
    }
    return [a,b,c,d]
  }
  function str2binl(str:string){const bin:number[]=[],mask=(1<<8)-1;for(let i=0;i<str.length*8;i+=8)bin[i>>5]|=(str.charCodeAt(i/8)&mask)<<(i%32);return bin}
  function binl2hex(binarray:number[]){const chars='0123456789abcdef';let str='';for(let i=0;i<binarray.length*4;i++)str+=chars[(binarray[i>>2]>>((i%4)*8+4))&0xF]+chars[(binarray[i>>2]>>((i%4)*8))&0xF];return str}
  function utf8Encode(str:string){return unescape(encodeURIComponent(str))}
  return binl2hex(coremd5(str2binl(utf8Encode(input)), utf8Encode(input).length*8))
}

// ─── SHA256 (Web Crypto API) ─────────────────────────────────────
export async function sha256(input: string): Promise<string> {
  const encoder = new TextEncoder()
  const data = encoder.encode(input)
  const hashBuffer = await crypto.subtle.digest('SHA-256', data)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
}

// ─── UUID GENERATOR ──────────────────────────────────────────────
export function generateUUID(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    const r = crypto.getRandomValues(new Uint8Array(1))[0] & 15
    return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16)
  })
}

export function formatUUID(uuid: string, fmt: 'standard'|'upper'|'no-hyphens'|'braces'): string {
  switch (fmt) {
    case 'upper':      return uuid.toUpperCase()
    case 'no-hyphens': return uuid.replace(/-/g, '')
    case 'braces':     return `{${uuid}}`
    default:           return uuid
  }
}

// ─── CSV ↔ JSON ──────────────────────────────────────────────────
export function csvToJSON(csv: string, delimiter = ','): Record<string, string>[] | string {
  try {
    const lines = csv.trim().split('\n').map(l => l.replace(/\r$/, ''))
    if (lines.length < 2) return 'CSV needs at least a header row and one data row'
    const headers = parseCSVLine(lines[0], delimiter)
    return lines.slice(1).filter(l => l.trim()).map(line => {
      const vals = parseCSVLine(line, delimiter)
      const obj: Record<string, string> = {}
      headers.forEach((h, i) => { obj[h.trim()] = vals[i]?.trim() ?? '' })
      return obj
    })
  } catch (e: unknown) { return (e as Error).message }
}

function parseCSVLine(line: string, delimiter: string): string[] {
  const results: string[] = []
  let current = '', inQuotes = false
  for (let i = 0; i < line.length; i++) {
    if (line[i] === '"') { inQuotes = !inQuotes }
    else if (line[i] === delimiter && !inQuotes) { results.push(current); current = '' }
    else current += line[i]
  }
  results.push(current)
  return results
}

export function jsonToCSV(input: string): string {
  try {
    const data = JSON.parse(input)
    if (!Array.isArray(data) || data.length === 0) return 'Input must be a non-empty JSON array'
    const keys = [...new Set(data.flatMap(obj => Object.keys(obj)))]
    const csvLine = (obj: Record<string, unknown>) =>
      keys.map(k => { const v = String(obj[k] ?? ''); return v.includes(',') ? `"${v}"` : v }).join(',')
    return [keys.join(','), ...data.map(csvLine)].join('\n')
  } catch (e: unknown) { return (e as Error).message }
}

// ─── UNIT CONVERTER ──────────────────────────────────────────────
export type UnitCategory = 'length'|'weight'|'temperature'|'speed'|'area'
export interface UnitDef { label: string; toBase: number; fromBase?: (v: number) => number; toBaseFn?: (v: number) => number }

export const UNITS: Record<UnitCategory, Record<string, UnitDef>> = {
  length: {
    m:  { label: 'Meter (m)',      toBase: 1 },
    km: { label: 'Kilometer (km)', toBase: 1000 },
    cm: { label: 'Centimeter (cm)',toBase: 0.01 },
    mm: { label: 'Millimeter (mm)',toBase: 0.001 },
    mi: { label: 'Mile (mi)',      toBase: 1609.344 },
    yd: { label: 'Yard (yd)',      toBase: 0.9144 },
    ft: { label: 'Foot (ft)',      toBase: 0.3048 },
    in: { label: 'Inch (in)',      toBase: 0.0254 },
  },
  weight: {
    kg: { label: 'Kilogram (kg)', toBase: 1 },
    g:  { label: 'Gram (g)',      toBase: 0.001 },
    lb: { label: 'Pound (lb)',    toBase: 0.453592 },
    oz: { label: 'Ounce (oz)',    toBase: 0.0283495 },
    t:  { label: 'Tonne (t)',     toBase: 1000 },
  },
  temperature: {
    C: { label: '°Celsius',    toBase: 1, toBaseFn: v => v, fromBase: v => v },
    F: { label: '°Fahrenheit', toBase: 1, toBaseFn: v => (v - 32) * 5/9, fromBase: v => v * 9/5 + 32 },
    K: { label: 'Kelvin',      toBase: 1, toBaseFn: v => v - 273.15, fromBase: v => v + 273.15 },
  },
  speed: {
    mps:  { label: 'm/s',  toBase: 1 },
    kmh:  { label: 'km/h', toBase: 1/3.6 },
    mph:  { label: 'mph',  toBase: 0.44704 },
    knot: { label: 'knot', toBase: 0.514444 },
  },
  area: {
    m2:  { label: 'm²',   toBase: 1 },
    km2: { label: 'km²',  toBase: 1e6 },
    ha:  { label: 'ha',   toBase: 1e4 },
    acre:{ label: 'acre', toBase: 4046.86 },
    ft2: { label: 'ft²',  toBase: 0.092903 },
  },
}

export function convertUnit(value: number, fromUnit: string, toUnit: string, cat: UnitCategory): number {
  const units = UNITS[cat]
  const from = units[fromUnit], to = units[toUnit]
  if (!from || !to) return NaN
  if (cat === 'temperature') {
    const celsius = from.toBaseFn!(value)
    return to.fromBase!(celsius)
  }
  const base = value * from.toBase
  return base / to.toBase
}

// ─── NUMBER BASE CONVERTER ───────────────────────────────────────
export function convertBase(value: string, fromBase: number, toBase: number): string {
  try {
    const decimal = parseInt(value.replace(/\s/g, ''), fromBase)
    if (isNaN(decimal)) return 'Invalid input for base ' + fromBase
    return decimal.toString(toBase).toUpperCase()
  } catch { return 'Conversion error' }
}

// ─── HEX TO RGB ──────────────────────────────────────────────────
export interface ColorResult { hex: string; rgb: string; hsl: string; rgba: string; r: number; g: number; b: number }

export function hexToRGB(hex: string): ColorResult | null {
  let h = hex.replace('#', '').trim()
  if (h.length === 3) h = h.split('').map(c => c+c).join('')
  if (!/^[0-9A-Fa-f]{6}$/.test(h)) return null
  const r = parseInt(h.slice(0,2),16)
  const g = parseInt(h.slice(2,4),16)
  const b = parseInt(h.slice(4,6),16)
  const rn=r/255, gn=g/255, bn=b/255
  const max=Math.max(rn,gn,bn), min=Math.min(rn,gn,bn), d=max-min
  let hue=0, sat=0; const lit=(max+min)/2
  if (d) {
    sat = d / (1 - Math.abs(2*lit-1))
    hue = max===rn ? ((gn-bn)/d+6)%6 : max===gn ? (bn-rn)/d+2 : (rn-gn)/d+4
    hue /= 6
  }
  return {
    hex: '#'+h.toUpperCase(),
    rgb: `rgb(${r}, ${g}, ${b})`,
    rgba: `rgba(${r}, ${g}, ${b}, 1)`,
    hsl: `hsl(${Math.round(hue*360)}, ${Math.round(sat*100)}%, ${Math.round(lit*100)}%)`,
    r, g, b,
  }
}

// ─── CSS GRADIENT ────────────────────────────────────────────────
export interface GradientOpts {
  type: 'linear'|'radial'|'conic'
  colors: { color: string; stop: number }[]
  angle: number
  shape?: 'circle'|'ellipse'
}

export function buildGradientCSS(opts: GradientOpts): string {
  const stops = opts.colors.map(c => `${c.color} ${c.stop}%`).join(', ')
  switch (opts.type) {
    case 'linear': return `linear-gradient(${opts.angle}deg, ${stops})`
    case 'radial':  return `radial-gradient(${opts.shape ?? 'circle'}, ${stops})`
    case 'conic':   return `conic-gradient(from ${opts.angle}deg, ${stops})`
  }
}

// ─── KEYWORD DENSITY ─────────────────────────────────────────────
export interface KWEntry { word: string; count: number; density: string }

export function keywordDensity(text: string, minLen = 3, stopWords = true): KWEntry[] {
  const STOP = new Set('the a an and or but in on at to for of with by from is are was were be been being have has had do does did will would could should may might shall can this that these those i me my we our you your he she it its they them their'.split(' '))
  const words = (text.toLowerCase().match(/\b[a-z]+\b/g) || [])
    .filter(w => w.length >= minLen && (!stopWords || !STOP.has(w)))
  const total = words.length
  const freq: Record<string, number> = {}
  words.forEach(w => { freq[w] = (freq[w] || 0) + 1 })
  return Object.entries(freq)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 30)
    .map(([word, count]) => ({
      word, count,
      density: ((count / total) * 100).toFixed(2) + '%',
    }))
}

// ─── META TAG GENERATOR ──────────────────────────────────────────
export interface MetaTagInput {
  title: string; description: string; keywords: string; author: string; url: string; image: string; type: string
}

export function generateMetaTags(opts: MetaTagInput): string {
  return `<!-- Primary Meta Tags -->
<title>${opts.title}</title>
<meta name="title" content="${opts.title}">
<meta name="description" content="${opts.description}">
<meta name="keywords" content="${opts.keywords}">
<meta name="author" content="${opts.author}">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="index, follow">

<!-- Open Graph / Facebook -->
<meta property="og:type" content="${opts.type}">
<meta property="og:url" content="${opts.url}">
<meta property="og:title" content="${opts.title}">
<meta property="og:description" content="${opts.description}">
<meta property="og:image" content="${opts.image}">

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:url" content="${opts.url}">
<meta name="twitter:title" content="${opts.title}">
<meta name="twitter:description" content="${opts.description}">
<meta name="twitter:image" content="${opts.image}">`
}

// ─── ROBOTS TXT ──────────────────────────────────────────────────
export interface RobotsRule { userAgent: string; disallow: string[]; allow: string[]; crawlDelay?: number }
export function generateRobotsTxt(rules: RobotsRule[], sitemap: string): string {
  const lines: string[] = []
  rules.forEach(r => {
    lines.push(`User-agent: ${r.userAgent}`)
    r.disallow.forEach(d => d && lines.push(`Disallow: ${d}`))
    r.allow.forEach(a => a && lines.push(`Allow: ${a}`))
    if (r.crawlDelay) lines.push(`Crawl-delay: ${r.crawlDelay}`)
    lines.push('')
  })
  if (sitemap) lines.push(`Sitemap: ${sitemap}`)
  return lines.join('\n').trim()
}

// ─── SITEMAP GENERATOR ───────────────────────────────────────────
export interface SitemapURL { loc: string; lastmod?: string; changefreq?: string; priority?: string }
export function generateSitemap(urls: SitemapURL[]): string {
  const entries = urls.map(u => `  <url>
    <loc>${u.loc}</loc>${u.lastmod ? `\n    <lastmod>${u.lastmod}</lastmod>` : ''}${u.changefreq ? `\n    <changefreq>${u.changefreq}</changefreq>` : ''}${u.priority ? `\n    <priority>${u.priority}</priority>` : ''}
  </url>`).join('\n')
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries}
</urlset>`
}

// ─── WORD FREQUENCY ──────────────────────────────────────────────
export function wordFrequency(text: string, stopWords = false): { word: string; count: number; percent: string }[] {
  const STOP = new Set('the a an and or but in on at to for of with by from is are was were be been'.split(' '))
  const words = (text.toLowerCase().match(/\b[a-z'-]+\b/g) || []).filter(w => !stopWords || !STOP.has(w))
  const total = words.length
  const freq: Record<string, number> = {}
  words.forEach(w => { freq[w] = (freq[w] || 0) + 1 })
  return Object.entries(freq)
    .sort((a, b) => b[1] - a[1])
    .map(([word, count]) => ({ word, count, percent: ((count/total)*100).toFixed(1)+'%' }))
}

// ─── MARKDOWN TO HTML ────────────────────────────────────────────
export function markdownToHTML(md: string): string {
  return md
    .replace(/^#{6}\s(.+)/gm, '<h6>$1</h6>')
    .replace(/^#{5}\s(.+)/gm, '<h5>$1</h5>')
    .replace(/^#{4}\s(.+)/gm, '<h4>$1</h4>')
    .replace(/^#{3}\s(.+)/gm, '<h3>$1</h3>')
    .replace(/^#{2}\s(.+)/gm, '<h2>$1</h2>')
    .replace(/^#{1}\s(.+)/gm, '<h1>$1</h1>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/`(.+?)`/g, '<code>$1</code>')
    .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2">$1</a>')
    .replace(/^- (.+)/gm, '<li>$1</li>')
    .replace(/(<li>.*<\/li>\n?)+/g, '<ul>$&</ul>')
    .replace(/\n\n/g, '</p><p>')
    .replace(/^(?!<[hul])/gm, '')
}

// ─── NUMBER BASE (extended) ──────────────────────────────────────
export function toAllBases(decimal: number) {
  return {
    binary:  decimal.toString(2),
    octal:   decimal.toString(8),
    decimal: decimal.toString(10),
    hex:     decimal.toString(16).toUpperCase(),
    base32:  decimal.toString(32).toUpperCase(),
  }
}

// ─── PERCENTAGE CALCULATOR ───────────────────────────────────────
export function calcPercentOf(pct: number, total: number) { return (pct / 100) * total }
export function calcWhatPct(part: number, total: number)  { return (part / total) * 100 }
export function calcPctChange(from: number, to: number)   { return ((to - from) / Math.abs(from)) * 100 }

// ─── ROMAN NUMERALS ──────────────────────────────────────────────
export function toRoman(num: number): string {
  if (num < 1 || num > 3999) return 'Out of range (1–3999)'
  const vals = [1000,900,500,400,100,90,50,40,10,9,5,4,1]
  const syms = ['M','CM','D','CD','C','XC','L','XL','X','IX','V','IV','I']
  let result = ''
  vals.forEach((v, i) => { while (num >= v) { result += syms[i]; num -= v } })
  return result
}

export function fromRoman(roman: string): number | string {
  const map: Record<string, number> = {I:1,V:5,X:10,L:50,C:100,D:500,M:1000}
  const str = roman.toUpperCase()
  let result = 0, prev = 0
  for (let i = str.length - 1; i >= 0; i--) {
    const curr = map[str[i]]
    if (!curr) return 'Invalid Roman numeral'
    result += curr < prev ? -curr : curr
    prev = curr
  }
  return result
}

// ─── ENCRYPT / DECRYPT (AES-GCM) ────────────────────────────────
export async function encryptText(text: string, password: string): Promise<string> {
  const enc = new TextEncoder()
  const salt = crypto.getRandomValues(new Uint8Array(16))
  const iv   = crypto.getRandomValues(new Uint8Array(12))
  const keyMaterial = await crypto.subtle.importKey('raw', enc.encode(password), 'PBKDF2', false, ['deriveKey'])
  const key = await crypto.subtle.deriveKey(
    { name: 'PBKDF2', salt, iterations: 100000, hash: 'SHA-256' },
    keyMaterial,
    { name: 'AES-GCM', length: 256 },
    false, ['encrypt']
  )
  const encrypted = await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, key, enc.encode(text))
  const combined = new Uint8Array(salt.length + iv.length + encrypted.byteLength)
  combined.set(salt, 0); combined.set(iv, 16); combined.set(new Uint8Array(encrypted), 28)
  return btoa(String.fromCharCode(...combined))
}

export async function decryptText(ciphertext: string, password: string): Promise<string> {
  const enc = new TextEncoder()
  const combined = Uint8Array.from(atob(ciphertext), c => c.charCodeAt(0))
  const salt = combined.slice(0, 16)
  const iv   = combined.slice(16, 28)
  const data = combined.slice(28)
  const keyMaterial = await crypto.subtle.importKey('raw', enc.encode(password), 'PBKDF2', false, ['deriveKey'])
  const key = await crypto.subtle.deriveKey(
    { name: 'PBKDF2', salt, iterations: 100000, hash: 'SHA-256' },
    keyMaterial,
    { name: 'AES-GCM', length: 256 },
    false, ['decrypt']
  )
  const decrypted = await crypto.subtle.decrypt({ name: 'AES-GCM', iv }, key, data)
  return new TextDecoder().decode(decrypted)
}
