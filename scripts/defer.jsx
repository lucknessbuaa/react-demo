import React from "react";
import ReactDom from "react-dom";
import $ from "jquery";
import "bootstrap/dist/css/bootstrap.min.css";
import "../less/promise.less";

class DeferDemo extends React.Component {
	constructor() {
		super();
		this.state = {
			first: "",
			second: "",
			third: ""
		}
		this.makeSinglePromise = this.makeSinglePromise.bind(this);
		this.makeMultiplePromise = this.makeMultiplePromise.bind(this);
		this.clickHandler = this.clickHandler.bind(this);
		this.chainHandler = this.chainHandler.bind(this);
	}

	makeSinglePromise(url) {
		let deferred = $.Deferred();

		$.get(`/datas/${url}`).then(res => {
			deferred.resolve(res.data);
		}).fail(error => {
			deferred.reject(error);
		});

		return deferred.promise();
	}

	makeMultiplePromise() {
		let promises = Array.prototype.map.call(arguments, value => {
			return this.makeSinglePromise(value);
		});
		return $.when.apply(null, promises);
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
			this.makeMultiplePromise.apply(this, names).then(function() {
				let states = {};
				let res = Array.prototype.slice.apply(arguments);
				res.forEach((value, index) => {
					states[names[index]] = value;
				});
				this.setState(states);
			}.bind(this)).catch(error => {
				console.log("catch", error);
			});
		}
	}

	chainHandler() {
	    this.makeSinglePromise("first").then(res => {
			console.log("chainHandler1", res);
			return this.makeSinglePromise("second");
		}).then(res => {
			console.log("chainHandler2", res);
		});

		this.makeSinglePromise("first").then(res => {
			console.log("chainHandler21", res);
			return "resolved" + res;
		}).then(res => {
			console.log("chainHandler22", res);
		});
	}

	render() {
		return (
			<div className="container">
				<div className="row">
					<button className="btn btn-default" onClick={this.clickHandler.bind(this, ["first"])}>
						first
					</button>
					<button className="btn btn-default" onClick={this.clickHandler.bind(this, ["second", "third"])}>
						second and third
					</button>

					<button className="btn btn-default" onClick={this.chainHandler}>
						chain thenable
					</button>
				</div>
				<div>{this.state.first}</div>
				<div>{this.state.second}</div>
				<div>{this.state.third}</div>
			</div>
		)	
	}
}

ReactDom.render(<DeferDemo />, document.getElementById('main'));