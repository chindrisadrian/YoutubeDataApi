function video( title, description,id, likeCount, dislikeCount, viewCount) {

    
    

//ul
    var ul = document.createElement('ul');
    ul.classList.add('collapsible')
    ul.setAttribute("data-collapsible", "accordion");

    document.getElementsByClassName("video")[0].appendChild(ul);
//video
    var videoContainer = document.createElement('div');
    videoContainer.classList.add('video-container');
    ul.appendChild(videoContainer);

    var youtube = document.createElement('div');
    youtube.classList.add('youtube');
    youtube.setAttribute("data-embed", id);
    videoContainer.appendChild(youtube);

    var playButton = document.createElement('div');
    playButton.classList.add('play-button');
    youtube.appendChild(playButton);
//title
    var titlecardImage = document.createElement('div');
    titlecardImage.classList.add('card');
    ul.appendChild(titlecardImage);
    var titlecardContent = document.createElement('div');
    titlecardContent.classList.add('card-content');
    titlecardImage.appendChild(titlecardContent);

    var span = document.createElement("span");
    span.classList.add("card-title");
    span.innerText = title;
    titlecardContent.appendChild(span);
 //li   
    var li = document.createElement('li');
    ul.appendChild(li);
 //description   
    var collapsibleHeader = document.createElement("div");
    collapsibleHeader.classList.add('collapsible-header');
    li.appendChild(collapsibleHeader);
    var br = document.createElement('br');

    var icon = document.createElement('i');
    icon.classList.add('material-icons');
    icon.setAttribute("style", 'color: #ee6e73');
    icon.innerText = 'message';
    collapsibleHeader.appendChild(icon);

    var descriptionName = document.createElement("div");
    collapsibleHeader.classList.add('description-header');
    descriptionName.innerHTML = 'Description';
    collapsibleHeader.appendChild(descriptionName);
    
    var like = document.createElement('span');
    like.setAttribute("class", 'badge background');
    like.innerText = 'Like: '+likeCount;
    collapsibleHeader.appendChild(like);
    
    var dislike = document.createElement('span');
    dislike.setAttribute("class", 'badge background');
    dislike.innerText = 'Dislike: '+dislikeCount;
    collapsibleHeader.appendChild(dislike);

    var viewss = document.createElement('span');
    viewss.setAttribute("class", 'badge background');
    viewss.innerText = 'Views: '+viewCount;
    collapsibleHeader.appendChild(viewss);


//description Content
    var collapsibleBody = document.createElement('div');
    collapsibleBody.classList.add('collapsible-body');
    li.appendChild(collapsibleBody);

    var p = document.createElement("p");
    p.innerText = description;
    collapsibleBody.appendChild(p);
    
    ( function() {

	var youtube = document.querySelectorAll( ".youtube" );
	
	for (var i = 0; i < youtube.length; i++) {
		
		var source = "https://i.ytimg.com/vi/"+ youtube[i].dataset.embed +"/hqdefault.jpg";
		
		var image = new Image();
				image.src = source;
				image.addEventListener( "load", function() {
					youtube[ i ].appendChild( image );
				}( i ) );
		
				youtube[i].addEventListener( "click", function() {

					var iframe = document.createElement( "iframe" );

							iframe.setAttribute( "frameborder", "0" );
							iframe.setAttribute( "allowfullscreen", "1" );
							iframe.setAttribute( "src", "https://www.youtube.com/embed/"+ this.dataset.embed +"?rel=0&showinfo=0&autoplay=1" );

							this.innerHTML = "";
							this.appendChild( iframe );
				} );	
	};
	
} )();
    
}


$(".button-collapse").sideNav();


function Get(url){
    var Httpreq = new XMLHttpRequest(); // a new request
    Httpreq.open("GET",url,false);
    Httpreq.send(null);
    return Httpreq.responseText;          
}
function functie() {
    var element1 = document.getElementsByClassName("collapsible");
    element1.outerHTML = "";
    delete element1;
    
API = 'AIzaSyCQ-KpN5SPE4q_M0ylRO5HB5ZU7pML1XM8';
var keyword = document.getElementById("input").value;
var maxResults = 10;
var urlJson = 'https://www.googleapis.com/youtube/v3/search?key='+API+'&q='+keyword+'&part=snippet,id&order=date&maxResults='+maxResults;
var js = JSON.parse(Get(urlJson));

    for(i=0;i<js.items.length;i++){

        var id = js.items[i].id.videoId; 
          
        var urlVideo = 'https://www.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id='+id+'&key='+API;
        var jsVideo = JSON.parse(Get(urlVideo));
        var title = jsVideo.items[0].snippet.title;
        var description =jsVideo.items[0].snippet.description;
        var likeCount = numberFormat.format(jsVideo.items[0].statistics.likeCount);
        var dislikeCount = numberFormat.format(jsVideo.items[0].statistics.dislikeCount);
        var viewCount = numberFormat.format(jsVideo.items[0].statistics.viewCount);
        
        video(title, description, id,likeCount, dislikeCount, viewCount);
    }


    
}
var numberFormat = new Intl.NumberFormat('ru-RU');


functie();


