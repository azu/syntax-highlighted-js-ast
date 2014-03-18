/**
 * Created by azu on 2014/03/17.
 * LICENSE : MIT
 */
"use strict";
var fs = require("fs");
var assert = require("assert");
var genSyntaxHTML = require("../index").genSyntaxHTML;
var code = fs.readFileSync(process.argv[2], "utf-8");
assert(genSyntaxHTML(code).length > 0);
console.log(genSyntaxHTML(code));