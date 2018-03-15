$(document).ready(function(){
	$(".hamburger").click(function(){
		$(this).toggleClass("active");
		$(".nav-dropdown").toggleClass("show-nav-dropdown");
		$(".profile-dropdown").removeClass("show-profile-dropdown");
	});

	$(".profile-top").click(function(){
		$(".profile-dropdown").toggleClass("show-profile-dropdown");
		$(".nav-dropdown").removeClass("show-nav-dropdown");
		$("body").toggleClass("disable-scroll");
	});
});
