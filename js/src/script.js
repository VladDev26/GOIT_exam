'use strict';

//SLIDER callback
;(function(){
	$('.slider').unslider({
		nav: false,
		keys: false
	});
})();

// get JSON
;(function(){
	var text, query;
	$('.searchform__subm').on('click', function(){
		text = $('.searchform__text').val();
		statement();
		return false;
	});
	//search form keypress 'enter' event
	$('.searchform__text').keypress(function(event){
		if(event.which == 13){
			text = $('.searchform__text').val();
			statement();
			event.preventDefault();
		}
	});

	function statement(){
		if(text === undefined || text == ""){
			console.log('undefined or empty query');
			return false;
			// query = 'https://pixabay.com/api/?key=2696808-a99aca4232c52551e38c21475'+
					// '&image_type=photo';
			// getImgs(query);
		}else{
			query = 'https://pixabay.com/api/?key=2696808-a99aca4232c52551e38c21475'+
					'&q='+ text +
					'&image_type=photo';
			getImgs(query);
		}
	}
	statement();
	
	function queryError(){
		alert('Nothing is found. You should change your query word(s).');
	}

	function getImgs(query){
		var XHR = ("onload" in new XMLHttpRequest()) ? XMLHttpRequest : XDomainRequest;
		var xhr = new XHR();		

		xhr.open('GET', query, true);
		xhr.onload = function(){
			var urls = [];
			var data = JSON.parse(this.responseText);
			console.log(data.hits);

			if(data.hits.length<7){
				console.log(data.hits.length);
				queryError();
				return false;
			}

			for(var i=0; i<8; i++){urls.push(data.hits[i].webformatURL);}
			// console.log(urls);
			console.log('obj');
			for(var j=0; j<urls.length; j++){
				$('.acts__link', '.acts--big').eq(j).css({
					// 'width': data.hits[j].webformatWidth/2,
					// 'height': data.hits[j].webformatHeight,
					'background': 'url("' + urls[j] + '")',
					'background-repeat': 'no-repeat',
					'background-size': 'cover',
					// 'background-size': '100% 100%',
					'background-position': 'center'
				});
			}
			for(var k=0; k<urls.length; k++){
				$('.acts__link', '.acts--small').eq(k).css({
					'background': 'url("'+ urls[k] +'")',
					'background-repeat': 'no-repeat',
					'background-size': 'cover',
					'background-position': 'center'
				});
			}

			// $('.acts').masonry({
			// 	// columnWidth: 100,
			// 	itemSelector: '.acts__elem',
			// 	// true - если все блоки одинаковой ширины
			// 	singleMode: false,

			// 	isResizable: true,

			// 	isAnimated: false

			// 	// gutter: 10
			// });
		}
		xhr.send();
	}
})();