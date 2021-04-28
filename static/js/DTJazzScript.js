window.onpagehide = function () {
	audio.pause();
};

var modalVisible = false;
var $modal = $(".modal");

$(document).ready(function () {
	loadGigs();
	$(".scroll").on("click", function (e) {
		e.preventDefault();

		var target = this.dataset.loc;
		var $target = $(target);

		$("html, body")
			.stop()
			.animate(
				{
					scrollTop: $target.offset().top,
				},
				900,
				"swing",
				function () {
					window.location.hash = target;
				}
			);
	});
});

$(".gigs-tab").click(function () {
	if (!$(this).hasClass("active-tab")) {
		$(".gigs-tab").toggleClass("active-tab");
		$(".past-gigs").toggle();
		$(".upcoming-gigs").toggle();
	}
});

$(".gallery img").click(function (e) {
	let loc = $(this).data("loc");
	$modal.html("<img src=" + loc + " class='modal-img'>");
	$modal.fadeIn(200);
	modalVisible = true;
});

$(".modal").click(function (e) {
	let $img = $(".modal-img").get(0);
	if (e.target != $img && modalVisible) {
		$modal.fadeOut(200);
		modalVisible = false;
	}
});

function gigSort(g1, g2) {
	var d1 = new Date(g1.Date);
	var d2 = new Date(g2.Date);
	if (d1 > d2) return -1;
	else if (d1 < d2) return 1;
	else return 0;
}

function loadGigs()
{
	let upcomingGigs = document.getElementById("upcomingGigs");
	let pastGigs = document.getElementById("pastGigs");
	let now = Date.now();
	gigs.sort(gigSort);
	gigs.forEach((gig) => {
		let date = new Date(gig.Date);
		let gigElm = createGigElm(gig);
		if (date >= now) upcomingGigs.append(gigElm);
		else pastGigs.append(gigElm);
	});
}

function createGigElm(gigObj) {
	let row = document.createElement("div");
	row.classList = "gig-item row";

	row.appendChild(createGigDetail("Date: " + gigObj.Date ?? ""));
	row.appendChild(createGigDetail("Time: " + gigObj.Time ?? ""));
	row.appendChild(createGigDetail("Location: " + gigObj.Location ?? ""));
	row.appendChild(createGigDetail(gigObj.Details ?? ""));
	return row;
}

function createGigDetail(text) {
	let detail = document.createElement("div");
	detail.classList.add("col-xs-6");
	detail.innerText = text;
	return detail;
}
