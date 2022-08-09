import { svg01, svg02, svg03 } from './svg.js'

const wrap = document.querySelector('.wrap');
const modalBg = document.querySelector('.modalBlock')
const startModal = document.querySelector('.start-box');
const finishModal = document.querySelector('.finish-box');
const modalButton = document.querySelector('.startButton');
const levelButton = document.querySelectorAll('.levelTab');
const fireArray = [];

const finishText = document.createElement('p');
finishText.classList.add('finish-text');

let count = 0;
let level = 3000;

const min = 10;
const max = 80;
const borderMin = 30;
const borderTopLeftMax = 50;
const borderTopRightMax = 50;
const borderBottomLeftMax = 50;
const borderBottomRightMax = 50;

for (let i = 0; i < 10; i++) {
	const numTop = Math.floor(Math.random() * (max + 1 - min) + min),
		numLeft = Math.floor(Math.random() * (max + 1 - min) + min);
	const numTopLeft = Math.floor(Math.random() * (borderTopLeftMax + 1 - borderMin) + borderMin),
		numTopRight = Math.floor(Math.random() * (borderTopRightMax + 1 - borderMin) + borderMin),
		numBottomLeft = Math.floor(Math.random() * (borderBottomLeftMax + 1 - borderMin) + borderMin),
		numBottomRight = Math.floor(Math.random() * (borderBottomRightMax + 1 - borderMin) + borderMin);
	const rColor = Math.floor(Math.random() * 256),
		gColor = Math.floor(Math.random() * 256),
		bColor = Math.floor(Math.random() * 256);
	const bgColor = 'rgb(' + rColor + ',' + gColor + ',' + bColor + ')';
	const ball = document.createElement('div');
	const fireBox = document.createElement('div');
	const fire01 = document.createElement('span');
	const fire02 = document.createElement('span');
	const fire03 = document.createElement('span');
	ball.classList.add('ball');
	fireBox.classList.add('fire-box');
	fire01.classList.add('fire01');
	fire02.classList.add('fire02');
	fire03.classList.add('fire03');
	fire01.innerHTML = svg01;
	fire02.innerHTML = svg02;
	fire03.innerHTML = svg03;
	const fire01SVG = fire01.querySelectorAll('.st0');
	const fire02SVG = fire02.querySelectorAll('.st0');
	const fire03SVG = fire03.querySelectorAll('.st0');
	for (let i = 0; i < fire01SVG.length; i++) {
		fire01SVG[i].style.fill = bgColor;
		fire02SVG[i].style.fill = bgColor;
		fire03SVG[i].style.fill = bgColor;
	}
	ball.style.top = numTop + '%';
	ball.style.left = numLeft + '%';
	ball.style.borderRadius = numTopLeft + '%', numTopRight + '%', numBottomRight + '%', numBottomLeft + '%';
	ball.style.backgroundColor = bgColor;
	fireArray.push([ball, fireBox, fire01, fire02, fire03]);
}

const finishElm = fireArray.slice(-1)[0][4];

function counter() {
	count += 1;
	console.log(count);
}

function tabSwitch() {
	const checked = document.getElementsByClassName('checked');
	checked[0].classList.remove('checked');
	this.classList.add('checked');
	if (levelButton[0].classList.contains('checked')) {
		return level = 6000;
	} else if (levelButton[1].classList.contains('checked')) {
		return level = 3000;
	} else if (levelButton[2].classList.contains('checked')) {
		return level = 1000;
	}
}

for (const level of levelButton) {
	level.addEventListener('click', tabSwitch, false);
}

modalButton.addEventListener('click', function () {
	while (startModal.lastChild) {
		startModal.removeChild(startModal.lastChild);
	}
	startModal.classList.add('close');
	modalBg.style.zIndex = 0;
});

startModal.addEventListener('animationend', function () {
	for (let i = 0; i < fireArray.length; i++) {
		let clickFlag = false;
		let countFlag = false;
		setTimeout(function () {
			let ball = fireArray[i][0];
			let fireBox = fireArray[i][1];
			let fire01 = fireArray[i][2];
			let fire02 = fireArray[i][3];
			let fire03 = fireArray[i][4];
			ball.classList.add('fadein');
			wrap.append(ball);
			ball.append(fireBox);
			fireBox.append(fire01);
			fireBox.append(fire02);
			fireBox.append(fire03);
			ball.addEventListener('click', function () {
				ball.classList.remove('fadein');
				ball.classList.add('clickout');
				clickFlag = true;
				if (!countFlag) {
					counter();
					countFlag = true;
				}
			});
			ball.addEventListener('animationend', function () {
				if (clickFlag) {
					fire01.classList.add('pop01');
					fire02.classList.add('pop02');
					fire03.classList.add('pop03');
				}
			});
			if (!clickFlag) {
				setTimeout(function () {
					ball.classList.remove('fadein');
					ball.classList.add('fadeout');
					fire01.classList.add('pop01');
					fire02.classList.add('pop02');
					fire03.classList.add('pop03');
					countFlag = true;
				}, 6000);
			}
		}, i * level);
	}
});

finishElm.addEventListener('animationend', function () {
	finishModal.classList.add('open');
	console.log(finishElm);
});