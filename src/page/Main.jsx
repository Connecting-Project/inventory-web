import React from 'react';


import '../assets/css/main.css';

function Main() {

    return(
        <div>
			<div id="wrapper">

					<div id="main">
						<div class="inner">

								<header id="header">
									<a href="index.html" class="logo"><strong>Hawaiian-Pizza</strong> INVENTORY</a>
									<ul class="icons">
										<li><a href="#" class="icon fa-twitter"><span class="label">Twitter</span></a></li>
										<li><a href="#" class="icon fa-facebook"><span class="label">Facebook</span></a></li>
										<li><a href="#" class="icon fa-snapchat-ghost"><span class="label">Snapchat</span></a></li>
										<li><a href="#" class="icon fa-instagram"><span class="label">Instagram</span></a></li>
										<li><a href="#" class="icon fa-medium"><span class="label">Medium</span></a></li>
									</ul>
								</header>
						</div>
					</div>

					<div id="sidebar">
						<div class="inner">

								<section id="search" class="alt">
									<form method="post" action="#">
										<input type="text" name="query" id="query" placeholder="Search" />
									</form>
								</section>

								<nav id="menu">
									<header class="major">
										<h2>Menu</h2>
									</header>
									<ul>
										<li><a href="index.html">Homepage</a></li>
										<li><a href="generic.html">Generic</a></li>
										<li><a href="elements.html">Elements</a></li>
										<li>
											<span class="opener">Submenu</span>
											<ul>
												<li><a href="#">Lorem Dolor</a></li>
												<li><a href="#">Ipsum Adipiscing</a></li>
												<li><a href="#">Tempus Magna</a></li>
												<li><a href="#">Feugiat Veroeros</a></li>
											</ul>
										</li>
										<li><a href="#">Etiam Dolore</a></li>
										<li><a href="#">Adipiscing</a></li>
										<li>
											<span class="opener">Another Submenu</span>
											<ul>
												<li><a href="#">Lorem Dolor</a></li>
												<li><a href="#">Ipsum Adipiscing</a></li>
												<li><a href="#">Tempus Magna</a></li>
												<li><a href="#">Feugiat Veroeros</a></li>
											</ul>
										</li>
										<li><a href="#">Maximus Erat</a></li>
										<li><a href="#">Sapien Mauris</a></li>
										<li><a href="#">Amet Lacinia</a></li>
									</ul>
								</nav>

								
								<section>
									<header class="major">
										<h2>Get in touch</h2>
									</header>
									<p>해당 사이트에 대하여 문의하고 싶다면, 다음 이메일로 연락주시길 바랍니다.</p>
									<ul class="contact">
										<li class="fa-envelope-o"><a href="#">dpfmxlfls95@naver.com</a></li>
									</ul>
								</section>

								<footer id="footer">
									<p class="copyright">&copy; Hawaiian-Pizza. All rights reserved. </p>
								</footer>

						</div>
					</div>

			</div>
        </div>
    );
}

export default Main;