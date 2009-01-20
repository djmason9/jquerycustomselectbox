<%@ page language="java" import="java.util.*" pageEncoding="ISO-8859-1"%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
	<head>

		<title>SelectBox Plug-in</title>
		<meta http-equiv="pragma" content="no-cache">
		<meta http-equiv="cache-control" content="no-cache">
		<meta http-equiv="expires" content="0">
		<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
		<meta http-equiv="description" content="This is my page">

		<script type="text/javascript" src='jquery-1.3.js'></script>
		<!-- custom select js -->
		<script type="text/javascript" src='xx_custselect.js'></script>
		<!-- custom select plugin js -->
		<script type="text/javascript" src='cust_select_plugin.js'></script>
		<link rel="stylesheet" type="text/css" href="style.css">
		<!--[if IE]>
			<link rel="stylesheet" type="text/css" href="ie_style.css" >
		<![endif]-->
	</head>

<script>
	$(document).ready( function() {
		 
		//BASIC USE
		$(".select_wrap").custSelectBox({boxtype:"selectboxoptions_check"});
		
		//CHECKBOX USE
		/*
		$(".select_wrap").custSelectBox({
			boxtype:"selectboxoptions_check",
			selectwidth:	150
			});
		*/
		//ADVANCED USE 
		/*
		$(".select_wrap").custSelectBox({
			isscrolling: 	true,				//scrolls long lists
			scrollminitems:	5,					//items before scrolling
			scrollheight:	100,				//height of scrolling window
			preopenselect:	true,				//opens prechecked select boxes
			openspeed:		"slow",			//selectbox open speed "slow","normal","fast" or numbers 1000
			isdisabled:		false,
			});
		*/
	});
</script>

	<body>

		<div class="select_wrap">
			<div class="selectbox">
				<ul>
					<li>
						Sample Status
					</li>
				</ul>
			</div>
			<div class="selectboxoptions_wrap">
				<ul>
					<li class="selected">
					<span class="elmValue">1</span>
						Item One
					</li>
					<li>
					<span class="elmValue">2</span>
						Item Two
					</li>
					<li>
					<span class="elmValue">3</span>
						Item Three
					</li>
					<li>
					<span class="elmValue">4</span>
						Item Four
					</li>
					<li>
					<span class="elmValue">5</span>
						Item Five
					</li>					
				</ul>
			</div>
		</div>
	
	</body>
</html>
