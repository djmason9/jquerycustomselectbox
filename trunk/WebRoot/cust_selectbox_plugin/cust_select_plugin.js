/**
 * cust_select_plugin.js
 * Copyright (c) 2009 myPocket technologies (www.mypocket-technologies.com)
 
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.

 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.

 * View the GNU General Public License <http://www.gnu.org/licenses/>.

 * @author Darren Mason (djmason9@gmail.com)
 * @date 1/22/2009
 * @projectDescription Replaces the standard HTML form selectbox with a custom looking selectbox. Allows for disable, multiselect, scrolling, and very customizable.
 * @version 2.0.0
 * 
 * @requires jquery.js (tested with 1.3.1)
 * 
 * @param isscrolling: 		false,				//scrolls long lists
 * @param scrollminitems:	15,					//items before scrolling
 * @param scrollheight:		150,				//height of scrolling window
 * @param preopenselect:	true,				//opens prechecked select boxes
 * @param hoverstyle:		"hover",			//css hover style name
 * @param openspeed:		"normal",			//selectbox open speed "slow","normal","fast" or numbers 1000
 * @param alldisabled:		false,				//disables all the selectbox
 * @param selectwidth:		"auto",				//set width of selectbox
 * @param wrappername:		".select_wrap"		//class name of the wrapper tag
*/
(function($) {

	$.fn.custSelectBox = function(options){
		
		//css names
		var classselectbox = "selectbox";
		var selectbox = "." + classselectbox;
		var selectboxoptions_wrap = ".selectboxoptions_wrap";
		var hideitem = "hideitem";
		var classselected = "selected";
		var classselectboxopen = "selectboxopen";
		var classselectboxfoot ="selectboxfoot";
		var selectboxfoot = "." +classselectboxfoot;
		var elmValue = ".elmValue";
		
		var defaults = {
				isscrolling: 	true,				//scrolls long lists
				scrollminitems:	15,					//items before scrolling
				scrollheight:	150,				//height of scrolling window
				preopenselect:	true,				//opens prechecked select boxes
				hoverstyle:		"hover",			//css hover style name
				openspeed:		"normal",			//selectbox open speed "slow","normal","fast" or numbers 1000
				alldisabled:	false,				//disables the selectbox
				selectwidth:	"auto",				//set width of selectbox
				wrappername:	".select_wrap"
			};
		//override defaults
		var opts = $.extend(defaults, options);

		
		/** FUNCTIONS **/
		$.fn.disable = function(thisElm){

			for(var i=0;i<$(thisElm).find("ul").find("li").length;i++)
			{
				if($($(thisElm).find("ul").find("li").get(i)).hasClass(classselected))
				{
					$($(thisElm).find("ul").find("li").get(i)).addClass("selected_disable");
				}
				$($(thisElm).find("ul").find("li").get(i)).unbind();
				$($(thisElm).find("ul").get(i)).find("input").attr("disabled","disabled");
			}				
		};
	
		//adds form elements to the selectbox
		$.fn.addformelms = function(thisElm){
			
			for(var x=0;x<$(thisElm).length;x++)
			{
				var currElm = $(thisElm).get(x); 
				var boxtype = $($(thisElement).get(x)).find(selectboxoptions_wrap+ " ul").attr("class");
				
				if(boxtype.indexOf("selectboxoptions_radio") >-1)
				{
					var radioVal = $(currElm).find("."+classselected+" span").text();
					$(currElm).find(selectboxoptions_wrap).append("<input type=\"hidden\" id=\""+$(currElm).attr("id")+"\" name=\""+$(currElm).attr("id")+"\" value=\""+radioVal+"\">");
				}
				else
				{
					for(var i=0;i<$(currElm).find(selectboxoptions_wrap + " li").length;i++)
					{
						var currInnerElm = $(currElm).find(selectboxoptions_wrap + " li").get(i);
						
						$(currInnerElm).append("<input type=\"hidden\" id=\""+$(currElm).attr("id") +"_"+ i+"\" name=\""+$(currElm).attr("id") +"_"+ i+"\" value=\"\">");
						
						if($(currInnerElm).hasClass(classselected))
						{
							var checkVal = $(currInnerElm).find("span").text();
							$($(currElm).find(selectboxoptions_wrap + " li").get(i)).find("input").val(checkVal);
						}
					}
				}
			}
		};
		
		//opens selectboxs if they have pre selected options
		$.fn.openSelectBoxsThatArePrePopulated = function()
		{
			for(var i=0;i<$(selectbox).length;i++)
			{
				var boxtype = $($(selectbox).get(i)).parent().find(selectboxoptions_wrap+ " ul").attr("class");
				
				if($($(selectbox).get(i)).parent().find("." +boxtype).find("li").hasClass(classselected))
				{
					$($(selectbox).get(i)).addClass(classselectboxopen);
					$($(selectbox).get(i)).parent().find(selectboxoptions_wrap).slideDown("normal");
					$($(selectbox).get(i)).parent().find("." +boxtype).find("li").addClass(hideitem);
				}
			}
		};
		
		$.fn.scrolling = function (theElm, isOpen)
		{
			if(isOpen)
			{
				if($(theElm).parent().find(selectboxoptions_wrap+ " ul li").length >= opts.scrollminitems){
					$(theElm).parent().find(selectboxoptions_wrap+ " ul").css("height",opts.scrollheight).addClass("setScroll");
				}
			}
			else{
				$(theElm).parent().find(selectboxoptions_wrap+ " ul").css("height","auto").removeClass("setScroll");
			}
		};
		/** FUNCTIONS **/
		
		//BUILD HTML TO CREATE CUSTOM SELECT BOX
		for(var x=0;x<$(this).length;x++)
		{
			var currElm = $(this).get(x);
			var wrapperElm = $(currElm).parent();
			var name = "";
			var select_options = $(currElm).find("option");
			var opts_str="";
			var isDisabled = $(currElm).attr("disabled");
			var isMulti = $(currElm).attr("multiple");
			var boxtype = "selectboxoptions_radio";
			var disabled = "";
			
			if(isMulti){boxtype = "selectboxoptions_check";}
			if(isDisabled){disabled="disabled";}
			for(var i=0;i<select_options.length;i++)
			{
				var checked="";
				var currOption = $(select_options).get(i);
				
				if(i===0){
					name =$(currOption).text();
				}
				else
				{
					if($(currOption).attr("selected")){checked ="selected";}

					opts_str = opts_str + "<li class=\""+checked +" "+disabled+"\"><span class=\"elmValue\">"+$(currOption).val()+"</span>"+$(currOption).text()+"</li>";
				}
			}
			
			$(wrapperElm).empty().html("<div class=\"selectbox\"><ul><li>"+name+"</li></ul></div><div class=\"selectboxoptions_wrap\">");
			$(wrapperElm).find(selectboxoptions_wrap).empty().html("<ul class=\""+boxtype+"\">"+opts_str+"</ul></div></div>");
			$(wrapperElm).find(selectboxoptions_wrap +" ul").after("<div class=\""+classselectboxfoot+"\"><div></div></div>"); //add footer
			
			if("auto" != opts.selectwidth)
			{
				$(wrapperElm).find(selectbox + " ul").css({width:opts.selectwidth});
				$(wrapperElm).find(selectboxoptions_wrap + " ul").attr("class",boxtype).css({width:(opts.selectwidth+57) + "px"});
				$(wrapperElm).find(selectboxfoot + " div").css({width:opts.selectwidth + "px"});
			}else
			{
				$(wrapperElm).find(selectboxoptions_wrap + " ul").attr("class",boxtype).css({width:($(wrapperElm).find(selectbox + " ul").width()+57) + "px"});
				$(wrapperElm).find(selectboxfoot + " div").css({width:$(wrapperElm).find(selectbox + " ul").width() + "px"});
			}
			
			if(isDisabled){$.fn.disable($(selectboxoptions_wrap).get(x));}
		}
		
		var thisElement = $(opts.wrappername);

		//bind item clicks
		$(selectboxoptions_wrap+ " ul li").unbind().click( function() {
			
			if($(this).attr("class").indexOf("disabled") < 0)
			{
				var id;
				var boxtype = $(this).parent().attr("class");
				
				if(boxtype.indexOf("selectboxoptions_radio") >-1)
				{
					if(!$(this).hasClass(classselected))
					{
						id = $(this).find(elmValue).text();
						$(this).parent().find("." + classselected).removeClass(classselected);
						$(this).addClass(classselected);
						$(this).parent().parent().find("input").val($(this).find(elmValue).text());
					}
					else
					{
						$(this).parent().find("." + classselected).removeClass(classselected);
						$(this).parent().parent().find("input").val("");
					}
				}
				else //checkbox
				{
					if($(this).hasClass(classselected))
					{
						//turn off the checkbox
						$(this).removeClass(classselected);
						//blank out the value
						$(this).find("input").val("");
					}
					else
					{
						//gets the value of the element
						id = $(this).find(elmValue).text();			
						$(this).addClass(classselected);
						$(this).find("input").val(id);
					}
				}
			}
		}).mouseover(function(){
			$(this).addClass(opts.hoverstyle);
		}).mouseout(function(){
			$(this).removeClass(opts.hoverstyle);
		});

		//bind sliding open
		$(thisElement).find(selectbox).unbind().toggle(
				function() {
					if(opts.isscrolling){$.fn.scrolling($(this),true);}
					//unhide li
					$(this).parent().find(selectboxoptions_wrap+ " ul li").removeClass(hideitem);
					//makes the arrow go up or down
					$(this).removeClass(classselectbox).addClass(classselectboxopen);
					//slides the options down
					$(this).parent().find(selectboxoptions_wrap).slideDown(opts.openspeed);
				},
				function() {
					var boxtype = $(this).parent().find(selectboxoptions_wrap+ " ul").attr("class");
					if($(this).parent().find(selectboxoptions_wrap+ " ul li").hasClass(classselected))
					{
						$(this).parent().find(selectboxoptions_wrap+ " ul li").addClass(hideitem);
					}	
					else
					{
						//makes the arrows go up or down
						$(this).removeClass(classselectboxopen).addClass(classselectbox);
						//slides the options up
						$(this).parent().find(selectboxoptions_wrap).slideUp("normal");
					}
					
					if(opts.isscrolling){$.fn.scrolling($(this),false);}
				});
		
			
			$.fn.addformelms($(thisElement));
			if(opts.preopenselect){ $.fn.openSelectBoxsThatArePrePopulated();}
			if(opts.alldisabled){$.fn.disable($(thisElement));}
		
	};
	
})(jQuery);

