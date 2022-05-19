// Scrolling Header
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
	if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
		document.querySelector("#header").classList.add("sticky");
	} else {
		document.querySelector("#header").classList.remove("sticky");
	}
}
// Mobile Navigation Toggle
function toggleNav() {
	document.querySelector("nav.main").classList.toggle("active");
	document.querySelector("main").classList.toggle("active");
	document.querySelector("body").classList.toggle("active");
}
// Close Menu Dropdown
function closeDropdown() {
	var dropdown = document.querySelectorAll('li.has-submenu.open');
	Array.prototype.forEach.call(dropdown, function(el, i){
		el.classList.remove("open");
		el.setAttribute("aria-expanded", "false");
	});
}
// Close Dropdown on Click Outside
document.addEventListener('click', function (event) {
    if (event.target.closest('li.has-submenu')) return;
    closeDropdown();
}, false);
// Close Switcher & Dropdown on escape key
document.addEventListener('keydown', function (event) {
	var press = event || window.event;
	if (press.keyCode === 27) {
		closeDropdown();
	}
});
window.addEventListener('load', function() {
	
	// Menu Dropdowns
	var menuItems = document.querySelectorAll('li.has-submenu');
	var timer;
	Array.prototype.forEach.call(menuItems, function(el, i){
		// // Mouse
		// el.addEventListener("mouseover", function(event){
		// 	this.className = "has-submenu open";
		// 	clearTimeout(timer);
		// });
		// el.addEventListener("mouseout", function(event){
		// 	timer = setTimeout(function(event){
		// 		document.querySelector(".has-submenu.open").className = "has-submenu";
		// 	}, 250);
		// });

		// Keyboard
		el.querySelector('a').addEventListener("click",  function(event){
			if (this.parentNode.className == "has-submenu") {
				closeDropdown();
				this.parentNode.className = "has-submenu open";
				this.setAttribute('aria-expanded', "true");
			} else {
				this.parentNode.className = "has-submenu";
				this.setAttribute('aria-expanded', "false");
			}
			event.preventDefault();
			return false;
		});
	});
});