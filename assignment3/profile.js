//for nav bar this function is used
//when nav tab is pressed
$(".tab").on("click",function(){
	//show the current tab that is pressed by adding a class 'active'
	$(this).addClass("active");
	//remove active class if present in next sibbling

	$(this).next().removeClass("active");

	//renove active class if present in previous sibbling
	$(this).prev().removeClass("active");
	//since only two tabs are present either one of its prev or next will exist
	// i.e each tab will not have previous sibbling and next sibbling
});

function loadFeed(json,itertor){
	console.log(json.data[itertor].id)
	$.ajax('https://graph.facebook.com/'+json.data[itertor].id+'?fields=full_picture&access_token='+accesstoken,{
						success:function(feed){
												
							if(json.data[itertor].picture){
								
								
									$("#post"+itertor).attr("src",feed.full_picture);
						}
					
						//console.log(feed.full_picture)
						//dont know who it worked!it just worked. dont mess with this
						//i guess some logic problem here
						
				
							
						}
					})
				

}


var url='https://graph.facebook.com/me?access_token=';//API url
//put Accestoken here
var accesstoken='EAACEdEose0cBAEjg8TiZA6pUBBQBw8ktwMxU3ZCBdmKxMwtybmgbsqvTgQL6so3nSXv5qDYszLQ2le5BHFbIgZCgkQVZAqxgOLmdeu8RscHz5fhXhe5mYZCC54UXdkeneuUIKmd5v71xx90L79p5L9X880lyEybijXWkCOoWY0Rj9IbHl6gcfBIR1hfL4n5IZD';//access token it gets expired in 24 hrs if api doesnt load this can be reason
$(".jumbotron,.loadFeed").hide();
var profileReq=function(){
	
	$(".jumbotron").show();
$.ajax(url+accesstoken,{
	success:function(data){
		//paste the data in appropriate ids
		//plug the basic info values in profile page
		$("#name").text("Hi I am " +data.first_name+" "+data.last_name);
		if(data.location)
		$("#location").text("lives in "+data.location.name);
		
		$("#birthday").text("born on "+data.birthday);
		$("#profilePic").attr("src","http://graph.facebook.com/"+data.id+"/picture?type=large");
		if(data.education){
			$("#school").text(data.education[0].school.name);
			$("#passingYear").text(data.education[0].year.name);
			$("#college").text(data.work[0].employer.name);
			$("#university").text(data.education[1].school.name);
			$("#field").text(data.education[1].concentration[0].name);
			$("#job").text(data.work[0].employer.name);
		}
		else{
			$(".intro").hide();
		}

		//fetch friends information
		//only friends having app with higher than v2.0 will be visible
		$.ajax('https://graph.facebook.com/'+data.id+'/friends?access_token='+accesstoken,{
		success:function(json){
			
			for(var i=0;i<json.data.length;i++){
				$(".friends").append('<img id="'+i+'" src="unknown.jpg" alt="">');
				//appends friends div in html
				$("#"+i).attr("src","http://graph.facebook.com/"+json.data[i].id+"/picture?type=large");
				// pasting  large image of friends

			}
		}
	});
		
			//loading  feed part
			$.ajax('https://graph.facebook.com/'+data.id+'/feed?access_token='+accesstoken,{
			success:function(json){
				
				for(var i=0;i<json.data.length;i++){
					//if feed data has an image
					if(json.data[i].picture){

					$(".loadFeed").append('<div class="timeline line'+i+' posts"><p class="title'+i+' text-success text-center"></p><hr><img id="post'+i+'" src="" alt="" ><br><br><strong><small style="overflow:hidden; "id="description'+i+'" class="description "></small></strong></div><hr>');
					$(".timeline").css({"height": "61%",
    					"background-color": "white"
    				})
					loadFeed(json,i);

					
					}
					//if feed data doesnt have an image
					else{
						$(".loadFeed").append('<div class="noImg timeline  line'+i+' posts"><p class="title'+i+'  text-success text-center"></p><br><br><br><br><strong><small id="description'+i+'" class=" description"></small></strong></div><hr>');
						$(".noImg p").css({"position":"relative","top":"26%"});
						$(".timeline").css({"height": "64%",
    					"background-color": "white"
    				})
						$(".noImg").css({
							"height":"30%"
						})

					}

					//filling description ,title and all	
					i				
					$(".title"+i).text(json.data[i].story);
					if(json.data[i].description!=undefined){
						//if post has description increase height of div to contain description text
					$(".line"+i).removeClass("timeline");
					$('.line'+i).addClass("timeline2");
							if(json.data[i].description.length<100)
							$("#description"+i).text(json.data[i].description)
						}


				}
			}

		});

		
		
		
	}
	
});
	
	
	
}
//to toggle between profile and feed
$(".profile").on("click",profileReq);
$(".feed").on("click",function(){
	$(".loadFeed").show();
})
$(".profile").on("click",function(){
	$(".loadFeed").hide();

});