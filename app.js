"use strict";

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const weekdays = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

const giveaway = document.querySelector(".giveaway");
const deadline = document.querySelector(".deadline");
const items = document.querySelectorAll(".deadline-format h4");

let tempDate = new Date();
let tempYear = tempDate.getFullYear();
let tempMonth = tempDate.getMonth();
let tempDay = tempDate.getDate();

const futureDay = new Date(tempYear, tempMonth, tempDay + 10, 11, 30, 0);

const year = futureDay.getFullYear();
const hours = futureDay.getHours();
const mins = futureDay.getMinutes();
const month = months[futureDay.getMonth()];
const day = weekdays[futureDay.getDay()];

giveaway.textContent = `giveaway ends on ${day}, 24 ${month} ${year}, ${hours}:${mins}`;

// future time in ms
const futureTime = futureDay.getTime();

function getRemainingTime() {
	const today = new Date().getTime();
	const difTime = futureDay - today;

	// values in ms
	const oneSec = 1000;
	const oneMin = oneSec * 60;
	const oneHour = oneMin * 60;
	const oneDay = oneHour * 24;

	const days = Math.floor(difTime / oneDay);
	const hours = Math.floor( (difTime % oneDay) / oneHour );
	const mins = Math.floor( (difTime % oneHour) / oneMin );
	const secs = Math.floor( (difTime % oneMin) / oneSec );

	// set values in items
	const values = [days, hours, mins, secs];

	function format(item) {
		return item = item < 10 ?  `0${item}` : item;
	}

	items.forEach((item, inx) => {
		item.innerHTML = format(values[inx]);
	});

	if (difTime < 0) {
		clearInterval(countdown);
		deadline.innerHTML = `<h4 class="expired>sorry, this giveaway has expired</h4>"`;
	}
}

// countdown
let countdown = setInterval(getRemainingTime, 1000);

getRemainingTime();
// console.log(futureTime);