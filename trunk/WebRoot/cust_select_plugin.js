(function($) {

	$.fn.custSelectBox = function(options){
		//css names
		var defaultboxtype = "selectboxoptions_radio";
		var classselectbox = "selectbox";
		var selectbox = "." + classselectbox;
		var selectboxoptions_wrap = ".selectboxoptions_wrap";
		var hideitem = "hideitem";
		var classselected = "selected";
		var classselectboxopen = "selectboxopen";
		var selectboxfoot = ".selectboxfoot";
		var elmValue = ".elmValue";
		
		var defaults = {
				boxtype: 		defaultboxtype,		//box type selectboxoptions_radio or selectboxoptions_check
				isscrolling: 	false,				//scrolls long lists
				scrollminitems:	15,					//items before scrolling
				scrollheight:	150,				//height of scrolling window
				preopenselect:	true,				//opens prechecked select boxes
				hoverstyle:		"hover",			//css hover style name
				openspeed:		"normal",			//selectbox open speed "slow","normal","fast" or numbers 1000
				isdisabled:		false,				//disables the selectbox
				selectwidth:	"auto",				//set width of selectbox
				selectname:		"selectName"		//name of the selectbox input tag(s)
			};
		//override defaults
		var opts = $.extend(defaults, options);
		$(this).find(selectboxoptions_wrap +" ul").append("<div class=\"selectboxfoot\"><div></div></div>"); //add footer
		//set width
		if(opts.selectwidth === 'auto')
		{
			$(this).find(selectboxoptions_wrap +" ul").attr("class",opts.boxtype).css({width:($(selectbox + " ul").width()+57) + "px"});
			$(selectboxfoot + " div").css({width:$(selectbox + " ul").width() + "px"});
		}else
		{
			$(selectbox + " ul").css({width:opts.selectwidth});
			$(this).find(selectboxoptions_wrap +" ul").attr("class",opts.boxtype).css({width:(opts.selectwidth+57) + "px"});
			$(selectboxfoot + " div").css({width:opts.selectwidth + "px"});
		}
		//bind item clicks
		$("." + opts.boxtype + " li").unbind().click( function() {
			
			var id;
			if(opts.boxtype == defaultboxtype)
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
		}).mouseover(function(){
			$(this).addClass(opts.hoverstyle);
		}).mouseout(function(){
			$(this).removeClass(opts.hoverstyle);
		});

		//bind sliding open
		$(this).find(selectbox).unbind().toggle(
				function() {
					if(opts.isscrolling){$.fn.scrolling($(this),true);}
					//unhide li
					$(this).parent().find("li").removeClass(hideitem);
					//makes the arrow go up or down
					$(this).removeClass(classselectbox).addClass(classselectboxopen);
					//slides the options down
					$(this).parent().find(selectboxoptions_wrap).slideDown(opts.openspeed);
				},
				function() {
					if($(this).parent().find("." +opts.boxtype).find("li").hasClass(classselected))
					{
						$(this).parent().find("." +opts.boxtype).find("li").addClass(hideitem);
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
		
			$.fn.scrolling = function (theElm, isOpen)
			{
				if(isOpen)
				{
					if($(theElm).parent().find("." +opts.boxtype).find("li").length >= opts.scrollminitems){
						$(theElm).parent().find("." +opts.boxtype).css("height",opts.scrollheight).addClass("setScroll");
					}
				}
				else{
					$(theElm).parent().find("." +opts.boxtype).css("height","auto").removeClass("setScroll");
				}
			};
			
			$.fn.disable = function(thisElm){
				
				for(var i=0;i<$(thisElm).find("." +opts.boxtype).find("li").length;i++)
				{
					if($($(thisElm).find("." +opts.boxtype).find("li").get(i)).hasClass(classselected))
					{
						$($(thisElm).find("." +opts.boxtype).find("li").get(i)).addClass("selected_disable");
					}
					$($(thisElm).find("." +opts.boxtype).find("li").get(i)).unbind();
					$($(thisElm).find("." +opts.boxtype).get(i)).find("input").attr("disabled","disabled");
				}				
			};
			
			//adds form elements to the selectbox
			$.fn.addformelms = function(thisElm){
				
				if(opts.boxtype == defaultboxtype)
				{
					$(thisElm).find(selectboxoptions_wrap).append("<input type=\"hidden\" id=\""+opts.selectname+"\" name=\""+opts.selectname+"\" value=\"\">");
				}
				else
				{
					for(var i=0;i<$(thisElm).find(selectboxoptions_wrap + " li").length;i++)
					{
						$($(thisElm).find(selectboxoptions_wrap + " li").get(i)).append("<input type=\"hidden\" id=\""+opts.selectname +"_"+ i+"\" name=\""+opts.selectname +"_"+ i+"\" value=\"\">");
						
						if($($(thisElm).find(selectboxoptions_wrap + " li").get(i)).hasClass(classselected))
						{
							var elmVal = $($(thisElm).find(selectboxoptions_wrap + " li").get(i)).find(elmValue).text();
							$($(thisElm).find(selectboxoptions_wrap + " li").get(i)).find("input").val(elmVal);
						}
					}
				}
			}
			
			//opens selectboxs if they have pre selected options
			$.fn.openSelectBoxsThatArePrePopulated = function()
			{
				for(var i=0;i<$(selectbox).length;i++)
				{
					if($($(selectbox).get(i)).parent().find("." +opts.boxtype).find("li").hasClass(classselected))
					{
						$($(selectbox).get(i)).addClass(classselectboxopen);
						$($(selectbox).get(i)).parent().find(selectboxoptions_wrap).slideDown("normal");
						$($(selectbox).get(i)).parent().find("." +opts.boxtype).find("li").addClass(hideitem);
					}
				}
			};
			
			$.fn.addformelms();
			if(opts.preopenselect){ $.fn.openSelectBoxsThatArePrePopulated();}
			if(opts.isdisabled){$.fn.disable($(this));}
	};
	
})(jQuery);

