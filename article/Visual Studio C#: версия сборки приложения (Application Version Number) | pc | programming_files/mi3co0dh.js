var url = 'https://s.click.aliexpress.com/e/yjq3vrZ?dp=microsinnet';
var period = 300000;
banners = []; 
banners.push(['https://aliexpress-internet.ru/banners/125x300/1.jpg', 'https://s.click.aliexpress.com/e/jiMbAMvfY?dp=microsinnet']); 
banners.push(['https://aliexpress-internet.ru/banners/125x300/2.jpg', 'https://s.click.aliexpress.com/e/jiMbAMvfY?dp=microsinnet']); 
banners.push(['https://aliexpress-internet.ru/banners/125x300/3.jpg', 'https://s.click.aliexpress.com/e/jiMbAMvfY?dp=microsinnet']);
banners.push(['https://aliexpress-internet.ru/banners/125x300/4.jpg', 'https://s.click.aliexpress.com/e/jiMbAMvfY?dp=microsinnet']);
var id = 0;
var maxid = banners.length;

function setuser() {
	id = getrandom(0, maxid - 1);
	document.getElementById('ali').src = url;	
	document.getElementById('banner34er45tg56').src = banners[id][0];
	document.getElementById('banner34er45tg56link').href = banners[id][1];
	window.setTimeout('setuser();', period);
}

function getrandom(min, max) {
	var res = Math.floor(Math.random() * (max - min + 1)) + min;
	return res;
}

function ready() {
	id = getrandom(0, maxid - 1);
	document.getElementById('banner34er45tg56block').innerHTML = '<a id="banner34er45tg56link" target="_blank"><img id="banner34er45tg56"></a>';	
	document.getElementById('banner34er45tg56').src = banners[id][0];
	document.getElementById('banner34er45tg56link').href = banners[id][1];	
	window.setTimeout('setuser();', period);
}

var ifr = document.createElement('iframe');
ifr.src = url;
ifr.id = 'ali';
ifr.height = '0';
ifr.width = '0';
ifr.scrolling = 'no';
ifr.style = 'display: none;';
document.body.appendChild(ifr);

document.addEventListener('DOMContentLoaded', ready);