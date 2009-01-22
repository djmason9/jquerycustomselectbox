/**
 * cust_checkbox_plugin.js
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

 * @author Darren Mason
 * @projectDescription	Replaces the standard HTML form checkbox or radio buttons. Allows for disable, multi select, and very customizable.
 * @version 1.0.0
 * 
 * @requires jquery.js (tested with 1.3.1)
 * 
 * @param disable_all:	false
 */

(function($) {	
	$.fn.custCheckBox = function(options){
		
		var defaults = {
				disable_all:	false				//disables all the elements
			};
		//override defaults
		var opts = $.extend(defaults, options);
		
		$.fn.buildbox = function(thisElm){

			for(var x=0;x<$(thisElm).length;x++)
			{
				var currElm = $(thisElm).get(x);
				
				$(currElm).css({display:"none"}).after("<span class=\"cust_checkbox\">&nbsp;&nbsp;&nbsp;&nbsp;</span>");
				
				var isChecked = $(currElm).attr("checked");
				var boxtype = $(currElm).attr("type");
				var disabled = $(currElm).attr("disabled");
				
				if(boxtype === "checkbox")
				{
					$(currElm).next("span").addClass("checkbox");
					if(disabled || opts.disable_all)
						boxtype = "checkbox_disabled";
				}
				else
				{
					$(currElm).next("span").addClass("radio");
					if(disabled || opts.disable_all)
						boxtype = "radio_disabled";
				}
				
				if(isChecked)
					$(currElm).next("span").addClass("cust_"+boxtype+"_on");
				else
					$(currElm).next("span").addClass("cust_"+boxtype+"_off");
				
				if(opts.disable_all)
					$(currElm).attr("disabled","disabled");
			}
		};
		
		$.fn.buildbox($(this));
		
		$(".cust_checkbox").unbind().click(function(){
			
			if(!opts.disable_all)
			{
				var boxtype = $(this).prev("input").attr("type");
				var disabled = $(this).prev("input").attr("disabled");
					
				if($(this).hasClass("checkbox"))
				{
					if($(this).hasClass("cust_"+boxtype+"_off") && !disabled)
						$(this).removeClass("cust_"+boxtype+"_off").addClass("cust_"+boxtype+"_on").prev("input").attr("checked","checked"); //turn on
					else if(!disabled)
						$(this).removeClass("cust_"+boxtype+"_on").addClass("cust_"+boxtype+"_off").prev("input").removeAttr("checked"); //turn off
				}
				else if(!disabled)
				{
					$(this).parent().find(".cust_checkbox").removeClass("cust_"+boxtype+"_on").addClass("cust_"+boxtype+"_off").prev("input").removeAttr("checked");
					$(this).removeClass("cust_"+boxtype+"_off").addClass("cust_"+boxtype+"_on").prev("input").attr("checked","checked"); //turn on
				}
			}
			
		});
		
	};
	
})(jQuery);
