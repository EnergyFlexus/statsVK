/**
 * Склоняет слово в зависимости от числа
 * @param {number} n - Число, с которым нужно просклонять слово
 * @param {Array.<string>} text_forms - Массив слов, склоняемых с 1, 4, 5 (Например [сообщение, сообщения, сообщений])
 * @returns {string} Склоненное слово
 */
export default function declinationOfNum(n, text_forms) {  
    n = Math.abs(n) % 100; 
    var n1 = n % 10;
    if (n > 10 && n < 20) { return text_forms[2]; }
    if (n1 > 1 && n1 < 5) { return text_forms[1]; }
    if (n1 === 1) { return text_forms[0]; }
    return text_forms[2];
}
