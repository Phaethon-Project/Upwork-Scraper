var embed;
console.log("scraper injected ... !")
function replaceAll(str, find, replace){
  if(str){
    var re = new RegExp(find, 'g')
    return str.toString().replace(re, '')
  }
  return '';
}

function scrape(){
		var overviews = document.getElementsByClassName("eo-truncate-toggle-text eo-truncate-toggle-text-open ng-binding ng-scope")
		var links = document.getElementsByClassName("jsShortName")
		var freelancers = document.getElementsByClassName("air-card-hover")


		for(var i=0; i<overviews.length; i++){
				overviews[i].click()
		}

		var results = '""';
		for(var i=0; i<freelancers.length; i++){
				//var info = freelancers[i].innerText.replace("less").replace(",", ";;");

				var info = replaceAll(freelancers[i].innerText, "less", "")
				info = replaceAll(info, ",", ";")
        info = replaceAll(info, "Save", "")
        info = replaceAll(info, "Invite To Job", "")

				if(links[i])
					info = info + "https://www.upwork.com" + links[i].getAttribute("href")

        info = info.split('\n').join(",")
        if(info.charAt(0) == ',')
            info = info.substring(1, info.length)
				results += '' + info + '\n'
		}

		console.log(results)
		var csvData = 'data:text/csv;charset=utf-8;base64,' + window.btoa(unescape(encodeURIComponent(results)));
		embed[0].innerHTML += '<br><a href="'+csvData+'" target="_blank">Save</a>'
}


window.onload = function(){
	console.log("dom ready.. appending save")
	embed = document.getElementsByClassName("col-md-2")
	scrape()


}
/*document.addEventListener("DOMContentLoaded", function(){

})*/

function addScrapeButton(){
  embed = document.getElementsByClassName("col-md-2")
  for(var i=0; i<embed.length; i++){
      if(embed[i].innerText === 'Search'){
          console.log("Search found, appending scraper")
          embed[i].innerHTML = embed[i].innerHTML + '<input id="scrape-upwork" class="btn btn-default m-0 pull-right" type="button" value="scrape" onclick="scrape();"/>'
          break
      }
  }
}
