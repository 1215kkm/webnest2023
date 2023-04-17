$(document).ready(function(){
	

	$('.gnb').click(function(){
		$('.st0').attr('d','M-0.73,65.15C-0.73,65.15-3.8,0,70.35,0S194,0,194,0s0,239.3,0,268.85c0,100.54-18.2,200.13-42.26,200.13s-7.24,0-39.33,0s-38.35,28.17-38.35,39.13c0,29.93-24.46,33.85-30.91,33.85s-43.9,0-43.9,0L-0.73,65.15z');
	})

	$('body').mousemove(function(e){
		var moveX = e.pageX;
		var moveY = e.pageY;
		$('.circle1').css({marginLeft:-moveX/4, marginTop:-moveY/4})
		$('.circle2').css({marginLeft:-moveX/8, marginTop:-moveY/6})
		$('.circle3').css({marginLeft:-moveX/6, marginTop:moveY/8})
	})


	
	var sec1Top = $('#section1').offset().top;
	var sec2H2Top = $('#section2 h2').offset().top;
	var sec1Height = $('#section1').height();
	var sec2Height = $('#section2').height();
	var sec2H2MarginTop = parseInt($('#section2 h2').css('marginTop'));
	var start = true;

	$(window).scroll(function(){
		var scrT = $(this).scrollTop();
		
		if(scrT >= sec1Top-$(window).height()*0.7){
			$('#section1 .left h2').css({background:'#c57776'});
		}

		//최근게시글
		if(scrT >= sec1Top - 100 && scrT < sec1Top + 300){
			$('#section1').css({position:'fixed', top:'100px'});
			$('#section2').css({top:sec1Height});
		} else if (scrT >= sec1Top + 300){
			$('#section1').css({position:'absolute', top:sec1Top + 400});
		} else {
			$('#section1').css({position:'', top:''});
		}

		//그래프애니메이션
		if(scrT >= sec2H2Top-sec1Height && scrT < sec2H2Top + 400){
			$('.graph_box').addClass('active');
			$('#section2').css({position:'fixed', top:-sec2H2MarginTop, left:'50%', transform:'translateX(-50%)', width:'1500px'});
			$('#section3').css({marginTop:sec2Height + 400});

			setTimeout(function(){
				$('.graph_box > div h3 span').show();
				if(start == true){
					gogo()
					start = false;
				}
			},1000)

		} else if (scrT > sec2H2Top + 400){
			$('#section2').css({position:'absolute', top:sec2H2Top + 400 - sec2H2MarginTop, left:'50%', transform:'translateX(-50%)', width:'1500px'});
		} else {
			$('#section2').css({position:'', top:'', left:'', transform:'', width:''});
			$('#section3').css({marginTop:''});
		}
	});


	


	var i = 0;
	var max = 0;
	var priceCount;

	$('.graph_box h3 i').each(function(){
		var price = parseInt($(this).attr('data-rate'));
		if (max < price) {		//개체의 data-num 값이 max 변수의 값 보다 큰 경우
			max = price;			//해당 개체의 data-num 값을 max 값으로 적용한다.
		}
	})

	function gogo(){

		priceCount = setInterval(function(){
			i++;

			$('.graph_box h3 i').each(function(){
				var price = $(this).attr('data-rate');
				
				if(i < price){
					$(this).text(i+1);
				}
				
				console.log(i)
			})
			if (i >= max) {							//개체의 data-num 최대값에 도달했다면..
				clearInterval(priceCount);					//타이머를 중지한다.
			}
		},10)
	}
});