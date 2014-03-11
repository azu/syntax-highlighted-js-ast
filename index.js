/**
 * Created by azu on 2014/03/11.
 * LICENSE : MIT
 */
"use strict";
var rocambole = require("rocambole");
var estraverse = require("estraverse");
var esprima = require("esprima");
var fs = require("fs");
function synx(src) {
    var ast = rocambole.parse(src);
    var token = ast.startToken;
    var html = [];
    while (token !== ast.endToken.next) {
        var element = tokenElement(token);
        html.push(element);
        token = token.next;
    }
    return html;
}
function synxB(src) {
    var html = [];
    var depth = 0;
    var ast = esprima.parse(src, {range: true});

    estraverse.traverse(ast, {
        enter: function (node, parent) {
            var code;
            if(node.expression) {
                code =  (node.range) ? src.substring(node.range[0], node.range[1]) : "";
            }
            html.push("<" + node.type + ">" + code);
        },
        leave: function (node, parent) {
            html.push("</" + node.type + ">");
        }
    });
    return html;
}

function tokenElement(token) {
    return "<" + token.type + ">" + token.value + "</" + token.type + ">";
}
var code = fs.readFileSync(__dirname + "/example/index.js", "utf-8");
var results = synx(code);
console.log(results.join(""));
