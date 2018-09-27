//$(function(){
	//1.获取当前城市的天气信息
	let tianqi
	$.ajax({
		type:"get",
		url:"https://www.toutiao.com/stream/widget/local_weather/data/?city=太原",
		dataType:"jsonp",
		success:function(obj){
			tianqi=obj.data;
			//获取当前城市
			updata(tianqi);
			
		}
	})
    function updata(tianqi){
    	//获取当前城市
    	$(".position li:nth-child(2) span").html(tianqi.city);
//  	获取当前城市的天气状况
        $(".pollution p").html(tianqi.weather.quality_level);
        $(".info li:nth-child(1)").html(tianqi.weather.current_temperature+"°");
        $(".info li:nth-child(2)").html(tianqi.weather.current_condition);
        $(".info li:nth-child(3)").html(tianqi.weather.wind_direction);
        //今天天气
        $(".today li:nth-child(1) span:nth-child(2)").html(tianqi.weather.dat_low_temperature+"/"+
        tianqi.weather.dat_high_temperature+"°C");
        $(".today li:nth-child(2) span:nth-child(1)").html(tianqi.weather.dat_condition);
        $(".todaySun img").attr("src","./img/"+tianqi.weather.dat_weather_icon_id+".png");
        //明天天气
        $(".tomorrow li:nth-child(1) span:nth-child(2)").html(tianqi.weather.tomorrow_low_temperature+"/"+
        tianqi.weather.tomorrow_high_temperature+"°C");
        $(".tomorrow li:nth-child(2) span:nth-child(1)").html(tianqi.weather.tomorrow_condition);
        $(".tomorrowSun img").attr("src","./img/"+tianqi.weather.tomorrow_weather_icon_id+".png");
        //未来24小时
        let hweather=tianqi.weather.hourly_forecast;
        console.log(hweather);
        hweather.forEach(function(v){
        	let str=`
        	    <li>
				    <span>${v.hour}:00</span>
				    <img src="img/${v.weather_icon_id}.png"/>
				    <p>${v.temperature}°C</p>
			    </li>
        	`
            $(".everytimeRoll").append(str);
        })
        //一周天气
        let weekweather=tianqi.weather.forecast_list;
        console.log(weekweather);
        weekweather.forEach(function(v){
        	let str1=`
        	    <li>
			        <span>${(v.date).slice(5,7)}/${(v.date).slice(8,10)}</span>
			        <p>${v.condition}</p>
			        <img src="img/${v.weather_icon_id}.png"/>
		        </li>
        	`
        	$(".sixDays").append(str1);
        	
        	let str2=`
        	    <li>
			        <img src="img/${v.weather_icon_id}.png"/>
			        <p>${v.condition}</p>
			        <span>${v.wind_direction}</span>
			        <span>${v.wind_level}级</span>
		        </li>
        	`
        	$(".sixweather").append(str2);
        })
    }

        $(".position li:nth-child(2)").click(function(){
	    $(".place").css({"display":"block"});
	    $(".everytimeBig").css({"display":"none"});
	    $(".sixdayBig").css({"display":"none"});
	    $(".lineImg").css({"display":"none"});
	    $(".sixweatherBig").css({"display":"none"});
	    $(".tab").css({"display":"none"});
	    $(".icon").css({"display":"none"});
    })
        
    $(".search span").click(function(){
	    $(".place").css({"display":"none"});
	    $(".everytimeBig").css({"display":""});
	    $(".sixdayBig").css({"display":""});
	    $(".lineImg").css({"display":""});
	    $(".sixweatherBig").css({"display":""});
	    $(".tab").css({"display":""});
	    $(".icon").css({"display":""});
    }) 
    let city;
    $.ajax({
    	type:"get",
    	url:"https://www.toutiao.com/stream/widget/local_weather/city/",
    	dataType:"jsonp",
    	success:function(obj){
    		city=obj.data;
    		updataCity(city);
    	}
    })
    let k=0;
    function updataCity(city){
    	for(let i in city){
    		let str3=`
    		    <h3>${i}</h3>
				<ul class="provice">
				</ul>
    		`
    		$(".cityInfo").append(str3);
            for(let j in city[i]){
        	    let str4=`
        	        <li>${j}</li>
        	    `
        	    $(".provice").eq(k).append(str4);
            }
            k++;
    	}
    }
    window.onload=function(){
    	$(".provice li").click(function(){
    		$(".place").css({"display":"none"});
	        $(".everytimeBig").css({"display":""});
	        $(".sixdayBig").css({"display":""});
	        $(".lineImg").css({"display":""});
	        $(".sixweatherBig").css({"display":""});
	        $(".tab").css({"display":""});
	        $(".icon").css({"display":""});
	        let con=$(this).html();
	        ajaxs(con);
	        console.log(con);
    	})
    	function ajaxs(tianqi1){
    		let url1=`https://www.toutiao.com/stream/widget/local_weather/data/?city=${tianqi1}`;
    		$.ajax({
    			type:"get",
    			url:url1,
    			dataType:"jsonp",
    			success:function(obj){
    				let tianqi2=obj.data;
    				$(".everytimeRoll").html("");
    				$(".sixDays").html("");
    				$(".sixweather").html("");
    				updata(tianqi2);
    			}
    		})
    	}
    	 //搜索框内输入内容 取消变搜索
    $(".search input").focus(function(){
    	$(".search span").html("搜索");
    })
    $(".search span").click(function(){
    	if($(".search span").html()=="搜索"){
    		$(".place").css({"display":"none"});
	        $(".everytimeBig").css({"display":""});
	        $(".sixdayBig").css({"display":""});
	        $(".lineImg").css({"display":""});
	        $(".sixweatherBig").css({"display":""});
	        $(".tab").css({"display":""});
	        $(".icon").css({"display":""});
	    let text=$(".search input").val();
	    ajaxs(text);
    	}
    })
    }
   
//})

//
//
//
//
//
//1.获取默认城市的天气信息
//2.获取所有城市的信息
//3.点击每个城市可以获取当前城市的天气信息
//4.搜索框内输入要搜索的城市,点击搜索按钮可以进行搜索

