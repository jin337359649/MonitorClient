/* eslint-disable no-constant-condition */
/* eslint-disable semi */
/* eslint-disable one-var */
/* eslint-disable indent */
/* eslint-disable no-array-constructor */
const _RSA_E = '010001'

const _RSA_M = 'BCA104DA671BC46802CD059FDFFE085F11A0F838A08ECE73C6587644966BCD6D25DD71BE7DD775DF62052D17AE7D6D61BCF1C95FCB4FD3F569273ECC94387745962175398CC677F6680D05FC458B18EBC225DA0AC78A54FD55212E3E2A2828D95BC8E19F4D2CB2AB0FAF842788CFB7525D9B919F1361541513052018D2D82A25'

export function RSAEncrypt(pwd) {
  setMaxDigits(131)
  var key = new RSAKeyPair(_RSA_E, '', _RSA_M)
  var pwd_base64 = encode64(utf16to8(pwd))
  return encryptedString(key, pwd_base64)
}

class RSAKeyPair {
  constructor(encryptionExponent, decryptionExponent, modulus) {
    this.e = biFromHex(encryptionExponent)
    this.d = biFromHex(decryptionExponent)
    this.m = biFromHex(modulus)
    this.digitSize = 2 * biHighIndex(this.m) + 2
    this.chunkSize = this.digitSize - 11 // maximum, anything lower is fine

    this.radix = 16
    this.barrett = new BarrettMu(this.m)
  }
}

function encryptedString(key, s) {
  if (key.chunkSize > key.digitSize - 11) {
    return 'Error'
  }

  var sl = s.length
  var a = new Array(sl)

  var i = 0
  while (i < sl) {
    a[i] = s.charCodeAt(i)
    i++
  }

  var al = a.length
  var result = ''
  var j, k, block
  for (i = 0; i < al; i += key.chunkSize) {
    block = new BigInt()
    j = 0
    var x
    var msgLength = (i + key.chunkSize) > al ? al % key.chunkSize : key.chunkSize

    var b = new Array()
    for (x = 0; x < msgLength; x++) {
      b[x] = a[i + msgLength - 1 - x]
        }
    b[msgLength] = 0 // marker
        var paddedSize = Math.max(8, key.digitSize - 3 - msgLength)

        for (x = 0; x < paddedSize; x++) {
      b[msgLength + 1 + x] = Math.floor(Math.random() * 254) + 1 // [1,255]
        }
    // It can be asserted that msgLength+paddedSize === key.digitSize-3
    b[key.digitSize - 2] = 2 // marker
        b[key.digitSize - 1] = 0 // marker

        for (k = 0; k < key.digitSize; ++j) {
      block.digits[j] = b[k++]
            block.digits[j] += b[k++] << 8
        }
    // //////////////////////////////// TYF

    var crypt = key.barrett.powMod(block, key.e)
        var text = key.radix === 16 ? biToHex(crypt) : biToString(crypt, key.radix)
        result += text + ' ';
  }
  return result.substring(0, result.length - 1) // Remove last space.
}

var keyStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
function encode64(input) {
  var output = '';
  var chr1, chr2, chr3 = '';
  var enc1, enc2, enc3, enc4 = '';
  var i = 0
    do {
    chr1 = input.charCodeAt(i++)
        chr2 = input.charCodeAt(i++)
        chr3 = input.charCodeAt(i++)
        enc1 = chr1 >> 2
        enc2 = ((chr1 & 3) << 4) | (chr2 >> 4)
        enc3 = ((chr2 & 15) << 2) | (chr3 >> 6)
        enc4 = chr3 & 63
        if (isNaN(chr2)) {
      enc3 = enc4 = 64
        } else if (isNaN(chr3)) {
      enc4 = 64
        }
    output = output + keyStr.charAt(enc1) + keyStr.charAt(enc2) +
            keyStr.charAt(enc3) + keyStr.charAt(enc4)
        chr1 = chr2 = chr3 = '';
    enc1 = enc2 = enc3 = enc4 = '';
  } while (i < input.length)
    return output
}

function utf16to8(str) {
  var out, i, len, c

    out = '';
  len = str.length
    for (i = 0; i < len; i++) {
    c = str.charCodeAt(i)
        if ((c >= 0x0001) && (c <= 0x007F)) {
      out += str.charAt(i)
        } else if (c > 0x07FF) {
      out += String.fromCharCode(0xE0 | ((c >> 12) & 0x0F))
            out += String.fromCharCode(0x80 | ((c >> 6) & 0x3F))
            out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F))
        } else {
      out += String.fromCharCode(0xC0 | ((c >> 6) & 0x1F))
            out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F))
        }
  }
  return out
}

class BarrettMu {
  constructor(m) {
    this.modulus = biCopy(m)
        this.k = biHighIndex(this.modulus) + 1
        var b2k = new BigInt()
        b2k.digits[2 * this.k] = 1 // b2k = b^(2k)
        this.mu = biDivide(b2k, this.modulus)
        this.bkplus1 = new BigInt()
        this.bkplus1.digits[this.k + 1] = 1 // bkplus1 = b^(k+1)
        this.modulo = BarrettMu_modulo
        this.multiplyMod = BarrettMu_multiplyMod
        this.powMod = BarrettMu_powMod
    }
}

function BarrettMu_modulo(x) {
  var q1 = biDivideByRadixPower(x, this.k - 1)
    var q2 = biMultiply(q1, this.mu)
    var q3 = biDivideByRadixPower(q2, this.k + 1)
    var r1 = biModuloByRadixPower(x, this.k + 1)
    var r2term = biMultiply(q3, this.modulus)
    var r2 = biModuloByRadixPower(r2term, this.k + 1)
    var r = biSubtract(r1, r2)
    if (r.isNeg) {
    r = biAdd(r, this.bkplus1)
    }
  var rgtem = biCompare(r, this.modulus) >= 0
    while (rgtem) {
    r = biSubtract(r, this.modulus)
        rgtem = biCompare(r, this.modulus) >= 0
    }
  return r
}

function BarrettMu_multiplyMod(x, y) {
  var xy = biMultiply(x, y)
    return this.modulo(xy)
}

function BarrettMu_powMod(x, y) {
  var result = new BigInt()
    result.digits[0] = 1
    var a = x
    var k = y
    while (true) {
    if ((k.digits[0] & 1) !== 0) result = this.multiplyMod(result, a)
        k = biShiftRight(k, 1)
        if (k.digits[0] === 0 && biHighIndex(k) === 0) break
        a = this.multiplyMod(a, a)
    }
  return result
}

var biRadixBits = 16
var bitsPerDigit = biRadixBits
var biRadix = 1 << 16 // = 2^16 = 65536
var biHalfRadix = biRadix >>> 1
var biRadixSquared = biRadix * biRadix
var maxDigitVal = biRadix - 1
var maxDigits
var ZERO_ARRAY
var bigZero, bigOne

function setMaxDigits(value) {
  maxDigits = value
    ZERO_ARRAY = new Array(maxDigits)
    for (var iza = 0; iza < ZERO_ARRAY.length; iza++) ZERO_ARRAY[iza] = 0
    bigZero = new BigInt()
    bigOne = new BigInt()
    bigOne.digits[0] = 1
}

class BigInt {
    constructor(flag) {
      if (typeof flag === 'boolean' && flag === true) {
        this.digits = null
          } else {
        this.digits = ZERO_ARRAY.slice(0)
          }
      this.isNeg = false
      }
  }

setMaxDigits(20)

function biCopy(bi) {
  var result = new BigInt(true)
    result.digits = bi.digits.slice(0)
    result.isNeg = bi.isNeg
    return result
}

function reverseStr(s) {
  var result = '';
  for (var i = s.length - 1; i > -1; --i) {
    result += s.charAt(i)
    }
  return result
}

var hexatrigesimalToChar = new Array(
  '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
  'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j',
  'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't',
  'u', 'v', 'w', 'x', 'y', 'z'
)

function biToString(x, radix) {
  var b = new BigInt()
    b.digits[0] = radix
    var qr = biDivideModulo(x, b)
    var result = hexatrigesimalToChar[qr[1].digits[0]]
    while (biCompare(qr[0], bigZero) === 1) {
    qr = biDivideModulo(qr[0], b)
        result += hexatrigesimalToChar[qr[1].digits[0]]
    }
  return (x.isNeg ? '-' : '') + reverseStr(result)
}

var hexToChar = new Array('0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
  'a', 'b', 'c', 'd', 'e', 'f')

function digitToHex(n) {
  var mask = 0xf
    var result = '';
  for (let i = 0; i < 4; ++i) {
    result += hexToChar[n & mask]
        n >>>= 4
    }
  return reverseStr(result)
}

function biToHex(x) {
  var result = '';
    for (var i = biHighIndex(x); i > -1; --i) {
    result += digitToHex(x.digits[i])
    }
  return result
}

function charToHex(c) {
  var ZERO = 48
    var NINE = ZERO + 9
    var littleA = 97
    var littleZ = littleA + 25
    var bigA = 65
    var bigZ = 65 + 25
    var result

    if (c >= ZERO && c <= NINE) {
    result = c - ZERO
    } else if (c >= bigA && c <= bigZ) {
    result = 10 + c - bigA
    } else if (c >= littleA && c <= littleZ) {
    result = 10 + c - littleA
    } else {
    result = 0
    }
  return result
}

function hexToDigit(s) {
  var result = 0
    var sl = Math.min(s.length, 4)
    for (var i = 0; i < sl; ++i) {
    result <<= 4
        result |= charToHex(s.charCodeAt(i))
  }
  return result
}

function biFromHex(s) {
  var result = new BigInt()
    var sl = s.length
    for (var i = sl, j = 0; i > 0; i -= 4, ++j) {
    result.digits[j] = hexToDigit(s.substr(Math.max(i - 4, 0), Math.min(i, 4)))
    }
  return result
}

function biAdd(x, y) {
  var result

    if (x.isNeg !== y.isNeg) {
    y.isNeg = !y.isNeg
        result = biSubtract(x, y)
        y.isNeg = !y.isNeg
    } else {
    result = new BigInt()
        var c = 0
        var n
        for (var i = 0; i < x.digits.length; ++i) {
      n = x.digits[i] + y.digits[i] + c
            result.digits[i] = n % biRadix
            c = Number(n >= biRadix)
        }
    result.isNeg = x.isNeg
    }
  return result
}

function biSubtract(x, y) {
  var result
    if (x.isNeg !== y.isNeg) {
    y.isNeg = !y.isNeg
        result = biAdd(x, y)
        y.isNeg = !y.isNeg
    } else {
    result = new BigInt()
        var n, c
        c = 0
        for (var i = 0; i < x.digits.length; ++i) {
      n = x.digits[i] - y.digits[i] + c
            result.digits[i] = n % biRadix
            // Stupid non-conforming modulus operation.
            if (result.digits[i] < 0) result.digits[i] += biRadix
            c = 0 - Number(n < 0)
        }
    // Fix up the negative sign, if any.
    if (c === -1) {
      c = 0
            // eslint-disable-next-line no-redeclare
            for (var i = 0; i < x.digits.length; ++i) {
        n = 0 - result.digits[i] + c
                result.digits[i] = n % biRadix
                // Stupid non-conforming modulus operation.
                if (result.digits[i] < 0) result.digits[i] += biRadix
                c = 0 - Number(n < 0)
            }
      // Result is opposite sign of arguments.
      result.isNeg = !x.isNeg
        } else {
      // Result is same sign.
      result.isNeg = x.isNeg
        }
  }
  return result
}

function biHighIndex(x) {
  var result = x.digits.length - 1
    while (result > 0 && x.digits[result] === 0)--result
    return result
}

function biNumBits(x) {
  var n = biHighIndex(x)
    var d = x.digits[n]
    var m = (n + 1) * bitsPerDigit
    var result
    for (result = m; result > m - bitsPerDigit; --result) {
    if ((d & 0x8000) !== 0) break
        d <<= 1
    }
  return result
}

function biMultiply(x, y) {
  var result = new BigInt()
    var c
    var n = biHighIndex(x)
    var t = biHighIndex(y)
    var uv, k

    for (var i = 0; i <= t; ++i) {
    c = 0
        k = i
        for (let j = 0; j <= n; ++j, ++k) {
      uv = result.digits[k] + x.digits[j] * y.digits[i] + c
            result.digits[k] = uv & maxDigitVal
            c = uv >>> biRadixBits
        }
    result.digits[i + n + 1] = c
    }
  result.isNeg = x.isNeg !== y.isNeg
    return result
}

function biMultiplyDigit(x, y) {
  var n, c, uv

    const result = new BigInt()
    n = biHighIndex(x)
    c = 0
    for (var j = 0; j <= n; ++j) {
    uv = result.digits[j] + x.digits[j] * y + c
        result.digits[j] = uv & maxDigitVal
        c = uv >>> biRadixBits
    }
  result.digits[1 + n] = c
    return result
}

function arrayCopy(src, srcStart, dest, destStart, n) {
  var m = Math.min(srcStart + n, src.length)
    for (var i = srcStart, j = destStart; i < m; ++i, ++j) {
    dest[j] = src[i]
    }
}

var highBitMasks = new Array(0x0000, 0x8000, 0xC000, 0xE000, 0xF000, 0xF800,
  0xFC00, 0xFE00, 0xFF00, 0xFF80, 0xFFC0, 0xFFE0,
  0xFFF0, 0xFFF8, 0xFFFC, 0xFFFE, 0xFFFF)

function biShiftLeft(x, n) {
  var digitCount = Math.floor(n / bitsPerDigit)
    var result = new BigInt()
    arrayCopy(x.digits, 0, result.digits, digitCount,
    result.digits.length - digitCount)
    var bits = n % bitsPerDigit
    var rightBits = bitsPerDigit - bits
    for (var i = result.digits.length - 1, i1 = i - 1; i > 0; --i, --i1) {
    result.digits[i] = ((result.digits[i] << bits) & maxDigitVal) |
            ((result.digits[i1] & highBitMasks[bits]) >>>
                (rightBits))
    }
  result.digits[0] = ((result.digits[i] << bits) & maxDigitVal)
    result.isNeg = x.isNeg
    return result
}

var lowBitMasks = new Array(0x0000, 0x0001, 0x0003, 0x0007, 0x000F, 0x001F,
  0x003F, 0x007F, 0x00FF, 0x01FF, 0x03FF, 0x07FF,
  0x0FFF, 0x1FFF, 0x3FFF, 0x7FFF, 0xFFFF)

function biShiftRight(x, n) {
  var digitCount = Math.floor(n / bitsPerDigit)
    var result = new BigInt()
    arrayCopy(x.digits, digitCount, result.digits, 0,
    x.digits.length - digitCount)
    var bits = n % bitsPerDigit
    var leftBits = bitsPerDigit - bits
    for (var i = 0, i1 = i + 1; i < result.digits.length - 1; ++i, ++i1) {
    result.digits[i] = (result.digits[i] >>> bits) |
            ((result.digits[i1] & lowBitMasks[bits]) << leftBits)
    }
  result.digits[result.digits.length - 1] >>>= bits
    result.isNeg = x.isNeg
    return result
}

function biMultiplyByRadixPower(x, n) {
  var result = new BigInt()
    arrayCopy(x.digits, 0, result.digits, n, result.digits.length - n)
    return result
}

function biDivideByRadixPower(x, n) {
  var result = new BigInt()
    arrayCopy(x.digits, n, result.digits, 0, result.digits.length - n)
    return result
}

function biModuloByRadixPower(x, n) {
  var result = new BigInt()
    arrayCopy(x.digits, 0, result.digits, 0, n)
    return result
}

function biCompare(x, y) {
  if (x.isNeg !== y.isNeg) {
    return 1 - 2 * Number(x.isNeg)
    }
  for (var i = x.digits.length - 1; i >= 0; --i) {
    if (x.digits[i] !== y.digits[i]) {
      if (x.isNeg) {
        return 1 - 2 * Number(x.digits[i] > y.digits[i])
            } else {
        return 1 - 2 * Number(x.digits[i] < y.digits[i])
            }
    }
  }
  return 0
}

function biDivideModulo(x, y) {
  var nb = biNumBits(x)
    var tb = biNumBits(y)
    var origYIsNeg = y.isNeg
    var q, r
    if (nb < tb) {
    // |x| < |y|
    if (x.isNeg) {
      q = biCopy(bigOne)
            q.isNeg = !y.isNeg
            x.isNeg = false
            y.isNeg = false
            r = biSubtract(y, x)
            // Restore signs, 'cause they're references.
            x.isNeg = true
            y.isNeg = origYIsNeg
        } else {
      q = new BigInt()
            r = biCopy(x)
        }
    return new Array(q, r)
    }

  q = new BigInt()
    r = x

    // Normalize Y.
    var t = Math.ceil(tb / bitsPerDigit) - 1
    var lambda = 0
    while (y.digits[t] < biHalfRadix) {
    y = biShiftLeft(y, 1)
        ++lambda
        ++tb
        t = Math.ceil(tb / bitsPerDigit) - 1
    }
  // Shift r over to keep the quotient constant. We'll shift the
  // remainder back at the end.
  r = biShiftLeft(r, lambda)
    nb += lambda // Update the bit count for x.
    var n = Math.ceil(nb / bitsPerDigit) - 1

    var b = biMultiplyByRadixPower(y, n - t)
    while (biCompare(r, b) !== -1) {
    ++q.digits[n - t]
        r = biSubtract(r, b)
    }
  for (var i = n; i > t; --i) {
    var ri = (i >= r.digits.length) ? 0 : r.digits[i]
        var ri1 = (i - 1 >= r.digits.length) ? 0 : r.digits[i - 1]
        var ri2 = (i - 2 >= r.digits.length) ? 0 : r.digits[i - 2]
        var yt = (t >= y.digits.length) ? 0 : y.digits[t]
        var yt1 = (t - 1 >= y.digits.length) ? 0 : y.digits[t - 1]
        if (ri === yt) {
      q.digits[i - t - 1] = maxDigitVal
        } else {
      q.digits[i - t - 1] = Math.floor((ri * biRadix + ri1) / yt)
        }

    var c1 = q.digits[i - t - 1] * ((yt * biRadix) + yt1)
        var c2 = (ri * biRadixSquared) + ((ri1 * biRadix) + ri2)
        while (c1 > c2) {
      --q.digits[i - t - 1]
            c1 = q.digits[i - t - 1] * ((yt * biRadix) | yt1)
            c2 = (ri * biRadix * biRadix) + ((ri1 * biRadix) + ri2)
        }

    b = biMultiplyByRadixPower(y, i - t - 1)
        r = biSubtract(r, biMultiplyDigit(b, q.digits[i - t - 1]))
        if (r.isNeg) {
      r = biAdd(r, b)
            --q.digits[i - t - 1]
        }
  }
  r = biShiftRight(r, lambda)
    // Fiddle with the signs and stuff to make sure that 0 <= r < y.
    q.isNeg = x.isNeg !== origYIsNeg
    if (x.isNeg) {
    if (origYIsNeg) {
      q = biAdd(q, bigOne)
        } else {
      q = biSubtract(q, bigOne)
        }
    y = biShiftRight(y, lambda)
        r = biSubtract(y, r)
    }
  // Check for the unbelievably stupid degenerate case of r === -0.
  if (r.digits[0] === 0 && biHighIndex(r) === 0) r.isNeg = false

    return new Array(q, r)
}

function biDivide(x, y) {
  return biDivideModulo(x, y)[0]
}
