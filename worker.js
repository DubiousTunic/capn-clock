/* 
	Announces the most recent post number every 100 posts
*/

var params = {
	sephirot : null
}

var links = [ 
	"/audio/67738__tim-kahn__0.wav",
	"/audio/67739__tim-kahn__1.wav",
	"/audio/67750__tim-kahn__2.wav",
	"/audio/67752__tim-kahn__3.wav",
	"/audio/67753__tim-kahn__4.wav",
	"/audio/67754__tim-kahn__5.wav",
	"/audio/67755__tim-kahn__6.wav",
	"/audio/67756__tim-kahn__7.wav",
	"/audio/67757__tim-kahn__8.wav",
	"/audio/67758__tim-kahn__9.wav"
]

queryFortune();
setInterval(queryFortune, 17000);

function queryFortune(){
	fetch('https://boards.4chan.org/pol/', {
	mode: "cors",
	method: 'GET',
  	headers: {
    	Accept: 'application/json',
  	}
	}).then(r =>  r.text().then(data => ({status: r.status, body: data})))
	.then(function(obj){
		var mySubString = obj.body.substring(
		   	obj.body.indexOf('class=\"thread\"') + 1, 
		    obj.body.lastIndexOf("<hr>")
		)
		var mySubString2 = mySubString.substring(
			mySubString.indexOf('\"Reply to this post\">') + 1,
			mySubString.lastIndexOf("</a></span>")
		)

		var mySubString3 = mySubString2.substring(mySubString2.length - 3);

		var myString = mySubString3.charAt(0);

		if(parseInt(myString) !== params.sephirot){
			params.sephirot = parseInt(myString);
			console.log(params.sephirot)			
			playSephirot();
		}
	}
	);
}

function playSephirot(){
	let url = chrome.runtime.getURL(links[params.sephirot]);

    // set this string dynamically in your code, this is just an example
    // this will play success.wav at half the volume and close the popup after a second
    url += '?volume=.77&src=success.wav&length=1000';

    var win = chrome.windows.create({
        type: 'popup',
        focused: false,
        top: 1,
        left: 1,
        height: 1,
        width: 1,
        url
    })
}