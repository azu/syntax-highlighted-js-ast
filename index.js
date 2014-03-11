/**
 * Created by azu on 2014/03/11.
 * LICENSE : MIT
 */
"use strict";
var rocambole = require("rocambole");
var estraverse = require("estraverse");
var esprima = require("esprima");
var fs = require("fs");
// return matched nodes in nodeRangeList
function nodeStartToken(nodeRangeList, token) {
    var tokenStart = token.range[0];
    var result = nodeRangeList.filter(function (obj) {
        return obj.range[0] === tokenStart;
    });
    return result.map(function (node) {
        return "<" + node.type + ">";
    });
}

function nodeEndToken(nodeRangeList, token) {
    var tokenEnd = token.range[1];
    var result = nodeRangeList.filter(function (obj) {
        return obj.range[1] === tokenEnd;
    });
    return result.map(function (node) {
        return "</" + node.type + ">";
    });
}


function tokenElement(token) {
    return token.value;
}
function genSyntaxHTML(src) {
    var ast = rocambole.parse(src);
    // 一番depthが深い所から上と下に分けて探索する
    var deeperNode;
    // nodeのtypeとrangeのリストを作成
    var nodeRangeList = [];

    rocambole.moonwalk(ast, function (node) {
        nodeRangeList.push({
            type: node.type,
            range: node.range
        });
        if (deeperNode) {
            return;
        }
        deeperNode = node;
    });

    var html = [];
    // ↑ seeking
    var token = deeperNode.startToken;
    while (token !== ast.startToken.prev) {
        nodeEndToken(nodeRangeList, token).forEach(function (matchNode) {
            html.unshift(matchNode);
        });
        html.unshift(tokenElement(token));
        nodeStartToken(nodeRangeList, token).forEach(function (matchNode) {
            html.unshift(matchNode);
        });
        token = token.prev;
    }
    // ↓ seeking
    token = deeperNode.startToken.next;
    while (token !== ast.endToken.next) {
        nodeStartToken(nodeRangeList, token).forEach(function (matchNode) {
            html.push(matchNode);
        });
        html.push(tokenElement(token));
        nodeEndToken(nodeRangeList, token).forEach(function (matchNode) {
            html.push(matchNode);
        });
        token = token.next;
    }
    return html;
}

var code = fs.readFileSync(__dirname + "/example/index.js", "utf-8");
console.log(genSyntaxHTML(code).join(""));
module.exports = genSyntaxHTML;