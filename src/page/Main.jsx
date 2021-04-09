import React, { useEffect, useState} from 'react';
import '../assets/css/main.css';
import $ from 'jquery';
import constants from '../lib/constants';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

import ProductListSection from '../component/User/ProductListSection';
import ProductSearch from '../component/User/ProductSearch';
import ProductPageSection from '../component/User/ProductPageSection';
import Header from '../component/Header';


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

    const location = useLocation();


    const [productPageNo, setProductPageNo] = useState(1);
    const [productlist, setProductlist] = useState([]);
    const [productCount, setProductCount] = useState(1);


	useEffect(()=>{
		axios({
			method: `GET`,
			url: constants.BackUrl + `/api/vi/inventory/products/list`,
		}).then((response)=>{
			setProductlist(response.data.list);
			setProductCount(Math.ceil(response.data.list_num / 10));
			setProductPageNo(1);
		}).catch((error)=>{
			console.log(error);
		});
	},[location])

	const onCategoryClickHandler = (category) => {
		axios({
			method: `GET`,
			url: constants.BackUrl + `/api/vi/inventory/products/category?category=${category}`,
		}).then((response)=>{
			setProductlist(response.data.list);
			setProductCount(Math.ceil(response.data.list_num / 10));
			setProductPageNo(1);
		}).catch((error)=>{
			console.log(error);
		});
	}

	return (
		<div>
			<div id="wrapper">
				<div id="main">
					<div className="inner">

						<Header />
						<ProductListSection productlist={productlist} productPageNo={productPageNo} />
                        <ProductSearch setProductlist={setProductlist} setProductCount={setProductCount} setProductPageNo={setProductPageNo}/>
                        <ProductPageSection productPageNo={productPageNo} setProductPageNo={setProductPageNo} productCount={productCount} />

					</div>
				</div>

				<div id="sidebar">
					<div className="inner">

						<nav id="menu">
							<header className="major">
								<h2>Category</h2>
							</header>
							<ul>
								<li><span onClick={()=>{onCategoryClickHandler("컴퓨터")}}>컴퓨터</span></li>
								<li><span onClick={()=>{onCategoryClickHandler("서버")}}>서버</span></li>
								<li><span onClick={()=>{onCategoryClickHandler("네트워크")}}>네트워크</span></li>
								<li><span onClick={()=>{onCategoryClickHandler("주변기기")}}>주변기기</span></li>
								<li><span onClick={()=>{onCategoryClickHandler("센서")}}>센서</span></li>
								<li><span onClick={()=>{onCategoryClickHandler("전기부품")}}>전기부품</span></li>
								<li><span onClick={()=>{onCategoryClickHandler("엑추에이터")}}>엑추에이터</span></li>
								<li><span onClick={()=>{onCategoryClickHandler("오픈소스H/W")}}>오픈소스H/W</span></li>
								<li><span onClick={()=>{onCategoryClickHandler("기타")}}>기타</span></li>

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