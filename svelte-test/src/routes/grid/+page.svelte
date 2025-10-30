<div class="grid_view">
	<div class="appbar">1</div>
	<div class="sidebar">2</div>
	<div class="content">3</div>
	<div class="footer">4</div>
</div>

<style>
	.grid_view {
		height: 100vh;
		width: 100vw;
		display: grid;
		gap: 10px;
		grid-template-columns: 300px 1fr;
		grid-template-rows: 80px 1fr 80px;
		/* grid-template: */
		/* 	'appbar appbar' */
		/* 	'sidebar content' */
		/* 	'footer footer'; */

		div {
			background: #cfc;
			/* display: grid; */
			/* place-items: center; */
			/* min-height: 0px; */
			/* max-height: 1000px; */
		}

		.appbar {
			grid-area: appbar;
		}

		.sidebar {
			grid-area: sidebar;
		}

		.content {
			grid-area: content;
		}
		.footer {
			grid-area: footer;
		}
	}
</style>
