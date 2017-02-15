### Promise
promise的三种状态

- fulfilled
- rejected
- pending

其他术语

- settled: if it is not pending, either fulfilled or rejected
- resolved: if it is settled or if it has been locked in to match the state of another promise

attempting to resolve or reject a resolved promise has no effect.

### jquery deferred
- $.ajax
- animate
- $("p")

##### $.ajax demo
	$.when($.ajax('http://google.com'), $.ajax('http://yahoo.com')).then(function(googlePage, yahooPage) {
		// Both URLs have been fetched
	});
##### animate demo
    var promise = $('#label').animate({opacity: 0.25}, 100).promise();
	promise.done(function() {
		// Animation done.
	});

	var promise1 = $("#label-1").animate({opacity: 0.25}, 100).promise();
	var promise2 = $("#label-2").animate({opacity: 0.75}, 200).promise();
	$.when(promise1, promise2).done(function() {
		// Both animations are done
	});

##### $("p")
	$("div").each(function(i) {
		$(this).fadeIn().fadeOut(1000 * (i + 1));
	});
	$("div").promise().done(function() {
		// All <div> animations are finished.
	});






