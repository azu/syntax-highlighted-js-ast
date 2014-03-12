/**
 * Created by azu on 2014/03/11.
 * LICENSE : MIT
 */
"use strict";

function A(a) {
    this.internet = a;
}
var index = "syntax";
var regexp = /promise/;

function asyncFunction() {
    // <1>
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            resolve('Async Hello world');
        }, 16);
    });
}
// <2>
asyncFunction().then(function (value) {
    console.log(value);    // => 'Async Hello world'
}).catch(function (error) {
    console.log(error);
});