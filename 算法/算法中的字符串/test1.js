/**
 * @description 翻转字符串里的单词
 * 
 * 无空格字符构成一个单词。
 * 输入字符串可以在前面或者后面包含多余的空格，但是反转后的字符不能包括。
 * 如果两个单词间有多余的空格，将反转后单词间的空格减少到只含一个。
 * */ 
var reverseWords = function (s) {
    return s.trim().replace(/\s+/g, ' ').split(' ').reverse().join(' ');
}



/**
 * @description 最长公共前缀
 * 
 * 如果不存在公共前缀，返回空字符串 ""
*/
// 方法一，直接比较截取
var longestCommonWords1 = function(s) {
    if (s === null || s.length === 0) return '';
    let prevs = s[0];
    for(let i = 1; i < s.length; i++) {
        let j = 0;
        for(; j < s[i].length; j++) {
            if (prevs.charAt(j) !== s[i].charAt(j)) break; 
        }
        prevs = prevs.substring(0, j);
        if (prevs === '') return '';
    }
    return prevs;
}
// 方法二，构建Trie树（字典树）
// 构建一个字典树，字符串数组的最长公共序列就为从根节点开始遍历树，直到：遍历节点存在超过一个子节点的节点 或 遍历节点为一个字符串的结束字符
var longestCommonWords2 = function(s) {
    if (s === null || s.length === 0) return '';
    // 初始化字典树
    let trie = new Trie();
    // 构建字典树
    for(let i = 0; i < s,length; i++) {
        if (!trie.insert(s[i])) return '';
    }
    return trie.searchLongestWords();
};
var Trie = function () {
    this.root = new TrieNode();
}
var TrieNode = function () {
    // next放入当前节点的子节点
    this.next = {};
    // 当前是否为结束节点
    this.isEnd = false;
}
Trie.prototype.insert = function(word) {
    if (!word) return false;
    let node = this.root;
    for (let i = 0; i < word.length; i++) {
        if (!node.next[word[i]]) {
            node.next[word[i]] = new TrieNode();
        }
        node = node.next[word[i]];
    }
    node.isEnd = true;
    return true;
}

Trie.prototype.searchLongestWords = function() {
    
}



