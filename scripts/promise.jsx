/**
 * Created by liushuangshuang on 2017/2/13
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise
 * 1.basic promise and promise.all
 * 2.promise 错误处理:then中的错误处理和catch的区别
 * 3.随时都可以添加then句柄
 * 4.chainable promise
 * 5.每次then都会返回一个新的promise对象
 */

import React from "react";
import ReactDom from "react-dom";
import $ from "jquery";
import "bootstrap/dist/css/bootstrap.min.css";
import "../less/promise.less";

class PromiseDemo extends React.Component {
	constructor(props) {
		super();
		this.state = {
			first: "",
			second: "",
			third: "",
			fourth: ""

		};
		this.makeSinglePromise = this.makeSinglePromise.bind(this);
		this.makeMultiplePromise = this.makeMultiplePromise.bind(this);
		this.clickHandler = this.clickHandler.bind(this);
		this.clearHandler = this.clearHandler.bind(this);
		this.addThenSlower = this.addThenSlower.bind(this);
		this.chainHandler = this.chainHandler.bind(this);
		this.singlePromiseProve = this.singlePromiseProve.bind(this);
		this.errorPromiseDeal = this.errorPromiseDeal.bind(this);
	}

	makeSinglePromise(url) {
		return new Promise((resolve, reject) => {
			return $.get(`/datas/${url}`).then(res => {
				console.log("makeSinglePromise", res.data);
				resolve(res.data);
			}).fail(error => {
				reject(error);
			});
		});
	}

	makeMultiplePromise() {
		let promises = Array.prototype.map.call(arguments, value => {
			return this.makeSinglePromise(value);
		});
		return Promise.all(promises);
	}

	clickHandler(names) {
		let length = names.length;
		if (length === 1) {
			let name = names[0];
			this.makeSinglePromise(name).then(res => {
				this.setState({[name]: res});
			}).catch(error => {
				console.log(error);
			});
		} else {
			// then中的error捕获和catch中的error捕获的区别
			this.makeMultiplePromise.apply(this, names).then(res => {
				let states = {};
				res.forEach((value, index) => {
					states[names[index]] = value;
				});
				this.setState(states);

				// error = 5;
			}, error => {
				console.log("then", error);
			}).catch(error => {
				console.log("catch", error);
			});
		}
	}

	// prove there is no race condition berween an asynchronous operation completing and its handlers being attached
	addThenSlower() {
		let promise = this.makeSinglePromise("slower");
		setTimeout(() => {
			console.log("start bind then");
			promise.then(res => {
				console.log("slower", res);
				return "resolved " + res;
			});
		}, 3000);
		setTimeout(() => {
			console.log("start bind then second time");
			promise.then(res => {
				console.log("slower", res);
			})
		}, 6000);
	}

	chainHandler() {
		this.makeSinglePromise("first").then(res => {
			console.log("chainHandler1", res);
			return this.makeSinglePromise("second");
		}).then(res => {
			console.log("chainHandler2", res);
		});

		this.makeSinglePromise("first").then(res => {
			console.log("chainHandler1", res);
			return "resolved" + res;
		}).then(res => {
			console.log("chainHandler2", res);
		});
	}

	singlePromiseProve() {
		/*
		 * then must return a promise
		 * promise2 = promise1.then(onFulfilled, onRejected)
		 * promise1 !== promise2 !== promise3
		 */
		let promise1 = this.makeSinglePromise("first");
		let promise2 = promise1.then(function(res) {
			console.log(promise1, res);
			return "resolved1" + res;
			// return Promise.resolve("resolved1" + res);
		});
		let promise3 = promise2.then(function(res) {
			console.log(promise2, res);
			return "resolved2" + res;
		});

		/*
		 * 没有返回值的时候是undefined，但是promise的状态已经变为fulfilled
		 */
		// let promise1 = this.makeSinglePromise("first");
		// let promise2 = promise1.then(res => {
		// 	console.log(promise1, res);
		// });
		// let promise3 = promise2.then(res => {
		// 	console.log(promise2, res);
		// });
	}

	errorPromiseDeal() {
		let promise1 = this.makeSinglePromise("first");
		let promise2 = promise1.then(() => {
			throw new Error("exception");
		});
		let promise3 = promise2.then(res => {
			console.log("promise3", res);
		});
		let promise4 = promise3.catch(error => {
			console.log("promise4", error, promise2, promise3, promise4);
			return "hello";
		});
		let promise5 = promise4.then(res => {
			console.log("promise5", promise4);
		})
	}

	clearHandler() {
		this.setState({
			first: "",
			second: "",
			third: "",
			fourth: ""
		})
	}

	render() {
		return (
			<div className="container">
				<div className="row">
					<button className="btn btn-default" onClick={this.clickHandler.bind(this, ['first'])}>
						first promise
					</button>
					<button className="btn btn-default" onClick={this.clickHandler.bind(this, ['second'])}>
						second promise
					</button>
					<button className="btn btn-default" onClick={this.clickHandler.bind(this, ['third', 'fourth'])}>
						third and fourth promise
					</button>
					<button className="btn btn-default" onClick={this.clearHandler}>
						clear
					</button>

					{/*
						<button className="btn btn-default" onClick={this.clickHandler.bind(this, ['error'])}>
							error promise
						</button>

						<button className="btn btn-default" onClick={this.clickHandler.bind(this, ['error', 'third'])}>
							error and third promise
						</button>
					*/}
					{/*
						<button className="btn btn-default" onClick={this.addThenSlower}>
							add then slower
						</button>
					*/}
					{/*
						<button className="btn btn-default" onClick={this.chainHandler}>
							chain handler and Promise.resolve
						</button>
					*/}

					{/*
						<button className="btn btn-default" onClick={this.singlePromiseProve}>
							singlePromiseProve
						</button>
					*/}
					{/*
						<button className="btn btn-default" onClick={this.errorPromiseDeal}>
							error promise deal
						</button>
					*/}
				</div>
				
				<div>{this.state.first}</div>
				<div>{this.state.second}</div>
				<div>{this.state.third}</div>
				<div>{this.state.fourth}</div>
			</div>
		)
	}
}

ReactDom.render(<PromiseDemo />, document.querySelector("#main"));