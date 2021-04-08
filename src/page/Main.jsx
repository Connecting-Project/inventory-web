import React, {useContext} from 'react';
import '../assets/css/main.css';
import $ from 'jquery';

import sesssionStorageCustom from '../lib/sessionStorageCustom';
import { GlobalStateContext } from '../App';
import { GoogleLogout } from 'react-google-login';

function Main() {


/*
	Editorial by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/
	$(function() {

		var	$window = $(window),
			$body = $('body');

		// Disable animations/transitions ...

			// ... until the page has loaded.
				$body.addClass('is-loading');

				$window.on('load', function() {
					setTimeout(function() {
						$body.removeClass('is-loading');
					}, 100);
				});

			// ... when resizing.
				var resizeTimeout;

				$window.on('resize', function() {

					// Mark as resizing.
						$body.addClass('is-resizing');

					// Unmark after delay.
						clearTimeout(resizeTimeout);

						resizeTimeout = setTimeout(function() {
							$body.removeClass('is-resizing');
						}, 100);

				});

		// Fixes.


		// Sidebar.
			var $sidebar = $('#sidebar'),
				$sidebar_inner = $sidebar.children('.inner');


			// Events.

				// Link clicks.
					$sidebar.on('click', 'a', function(event) {


						// Vars.
							var $a = $(this),
								href = $a.attr('href'),
								target = $a.attr('target');

						// Prevent default.
							event.preventDefault();
							event.stopPropagation();

						// Check URL.
							if (!href || href === '#' || href === '')
								return;

						// Hide sidebar.
							$sidebar.addClass('inactive');

						// Redirect to href.
							setTimeout(function() {

								if (target === '_blank')
									window.open(href);
								else
									window.location.href = href;

							}, 500);

					});

				// // Prevent certain events inside the panel from bubbling.
				// 	$sidebar.on('click touchend touchstart touchmove', function(event) {

				// 		// Prevent propagation.
				// 			event.stopPropagation();

				// 	});

				// // Hide panel on body click/tap.
				// 	$body.on('click touchend', function(event) {


				// 		// Deactivate.
				// 			$sidebar.addClass('inactive');

				// 	});

			// Scroll lock.
			// Note: If you do anything to change the height of the sidebar's content, be sure to
			// trigger 'resize.sidebar-lock' on $window so stuff doesn't get out of sync.

				$window.on('load.sidebar-lock', function() {

					var sh, wh;

					// Reset scroll position to 0 if it's 1.
						if ($window.scrollTop() === 1)
							$window.scrollTop(0);

					$window
						.on('scroll.sidebar-lock', function() {

							var x, y;


							// Calculate positions.
								x = Math.max(sh - wh, 0);
								y = Math.max(0, $window.scrollTop() - x);

							// Lock/unlock.
								if ($sidebar_inner.data('locked') === 1) {

									if (y <= 0)
										$sidebar_inner
											.data('locked', 0)
											.css('position', '')
											.css('top', '');
									else
										$sidebar_inner
											.css('top', -1 * x);

								}
								else {

									if (y > 0)
										$sidebar_inner
											.data('locked', 1)
											.css('position', 'fixed')
											.css('top', -1 * x);

								}

						})
						.on('resize.sidebar-lock', function() {

							// Calculate heights.
								wh = $window.height();
								sh = $sidebar_inner.outerHeight() + 30;

							// Trigger scroll.
								$window.trigger('scroll.sidebar-lock');

						})
						.trigger('resize.sidebar-lock');

					});

					$('<a href="#sidebar" class="toggle">Toggle</a>')
					.appendTo($sidebar)
					.on('click', function(event) {
	
						// Prevent default.
							event.preventDefault();
							event.stopPropagation();
	
						// Toggle.
							$sidebar.toggleClass('inactive');
	
					});
			// Menu.
			var $menu = $('#menu'),
				$menu_openers = $menu.children('ul').find('.opener');

			// Openers.
				$menu_openers.each(function() {

					var $this = $(this);

					$this.on('click', function(event) {

						// Prevent default.
							event.preventDefault();

						// Toggle.
							$menu_openers.not($this).removeClass('active');
							$this.toggleClass('active');

						// Trigger resize (sidebar lock).
							$window.triggerHandler('resize.sidebar-lock');

					});

				});
				

	});

    const user = sesssionStorageCustom.getJsonItem('user');
    const { setLoginState } = useContext(GlobalStateContext);
	
	const googleLogout = (e) => {
        setLoginState(false);
        sessionStorage.clear();
    };

	return (
		<div>
			<div id="wrapper">
				<div id="main">
					<div className="inner">

						<header id="header">
							<a href="index.html" className="logo"><strong>Hawaiian-Pizza</strong> INVENTORY</a>
							<ul className="icons">
								<li>{user.name}님 안녕하세요.</li>
								<li className="logout_btn">
									<GoogleLogout
										clientId="462452844066-s6vfip9ifc94hj1jkma2jbe8g5p2ljaj.apps.googleusercontent.com"
										buttonText="로그아웃"
										onLogoutSuccess={googleLogout}
									>
									</GoogleLogout>
								</li>
							</ul>
						</header>
					</div>
				</div>

				<div id="sidebar">
					<div className="inner">

						<section id="search" className="alt">
							<form method="post" action="#">
								<input type="text" name="query" id="query" placeholder="Search" />
							</form>
						</section>

						<nav id="menu">
							<header className="major">
								<h2>Menu</h2>
							</header>
							<ul>
								<li><a href="index.html">Homepage</a></li>
								<li><a href="generic.html">Generic</a></li>
								<li><a href="elements.html">Elements</a></li>
								<li>
									<span className="opener">Submenu</span>
									<ul>
										<li><a href="!#">Lorem Dolor</a></li>
										<li><a href="!#">Ipsum Adipiscing</a></li>
										<li><a href="!#">Tempus Magna</a></li>
										<li><a href="!#">Feugiat Veroeros</a></li>
									</ul>
								</li>
								<li><a href="!#">Etiam Dolore</a></li>
								<li><a href="!#">Adipiscing</a></li>
								<li>
									<span className="opener">Another Submenu</span>
									<ul>
										<li><a href="!#">Lorem Dolor</a></li>
										<li><a href="!#">Ipsum Adipiscing</a></li>
										<li><a href="!#">Tempus Magna</a></li>
										<li><a href="!#">Feugiat Veroeros</a></li>
									</ul>
								</li>
								<li><a href="!#">Maximus Erat</a></li>
								<li><a href="!#">Sapien Mauris</a></li>
								<li><a href="!#">Amet Lacinia</a></li>
							</ul>
						</nav>


						<section>
							<header className="major">
								<h2>Get in touch</h2>
							</header>
							<p>해당 사이트에 대하여 문의하고 싶다면, 다음 이메일로 연락주시길 바랍니다.</p>
							<ul className="contact">
								<li className="fa-envelope-o"><a href="!#">dpfmxlfls95@naver.com</a></li>
							</ul>
						</section>

						<footer id="footer">
							<p className="copyright">&copy; Hawaiian-Pizza. All rights reserved. </p>
						</footer>

					</div>
				</div>

			</div>
		</div>
	);
}

export default Main;