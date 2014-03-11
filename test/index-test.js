/**
 * Created by azu on 2014/03/12.
 * LICENSE : MIT
 */
"use strict";

var fs = require("fs");
var assert = require("assert");
var genSyntaxHTML = require("../").genSyntaxHTML;
describe("GenSyntaxHTML", function () {
    context("with JavaScript code string", function () {
        it("should return string", function () {
            var code = fs.readFileSync(__dirname + "/../example/index.js", "utf-8");
            assert(genSyntaxHTML(code).length > 0);
            assert.equal(typeof genSyntaxHTML(code), "string");
        });
    });

    context("with without string", function () {
        it("should throw", function () {
            assert.throws(function(){
                genSyntaxHTML({});
            });
        });
    })

});
