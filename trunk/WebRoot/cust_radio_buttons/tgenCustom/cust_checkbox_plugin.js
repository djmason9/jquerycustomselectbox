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

 * @author Darren Mason (djmason9@gmail.com)
 * @date 3/13/2009
 * @projectDescription	Replaces the standard HTML form checkbox or radio buttons. Allows for disable, and very customizable.
 * @version 1.0.3
 * 
 * @requires jquery.js (tested with 1.3.2)
 * 
 * @param disable_all:	false,
 * @param wrapperclass:	"group"
 */

(function($) {	
	$.fn.custCheckBox = function(options){
		
		var defaults = {
				disable_all:	false,				//disables all the elements
				wrapperclass:	"group"
			};
		//override defaults
		var opts = $.extend(defaults, options);
		var tmpElmName="";
		var tmpArrayElms=[];
		
		return this.each(function() { 
	 		 var obj = $(this);
	 		 
		$.fn.buildbox = function(thisElm){

			var currElm = $(thisElm);
			
			var isChecked = $(currElm).attr("checked");
			var boxtype = $(currElm).attr("type");
			var disabled = $(currElm).attr("disabled");
			var elmName = $(currElm).attr("name");
			
			$(currElm).css({display:"inline"}).before("<span boxVal=\""+$(currElm).val()+"\" class=\"cust_checkbox\">&nbsp;&nbsp;&nbsp;&nbsp;</span>");
			
			//add class to determine type
			if(boxtype === "checkbox")
			{
				$(currElm).prev("span").addClass("checkbox");
				if(disabled || opts.disable_all){boxtype = "checkbox_disabled";}
			}
			else
			{
				$(currElm).prev("span").addClass("radio");
				if(disabled || opts.disable_all){boxtype = "radio_disabled";}
			}
			//is the radio/checkbox selected
			if(isChecked)
			{
				$(currElm).prev("span").addClass("cust_"+boxtype+"_on");
				$(currElm).attr("checked","checked");

			}
			else
			{
				$(currElm).prev("span").addClass("cust_"+boxtype+"_off");
				$(currElm).val("");
				
				//only checkboxes can all be checked
				if(boxtype === "checkbox")
				{
					$(currElm).attr("checked","checked");
				}
			}
			
			if(opts.disable_all)
			{
				$(currElm).attr("disabled","disabled");
			}
			
				/*if non of the elements are checked after all of them 
				have been gone through check ONE on the way out.
				*/
				if(tmpElmName == elmName || tmpElmName =="" && boxtype ==="radio")
					tmpArrayElms[tmpArrayElms.length++] = $(currElm);
				
				
				//if the moving to new elm check to see if there are any radios checked
				if(tmpElmName !== elmName && tmpElmName !=="")
				{
					var wasChecked=false;
					for(x=0;x<tmpArrayElms.length;x++)
					{
						tmpElm = tmpArrayElms[x];
						
						if($(tmpElm).attr("checked"))
							wasChecked=true;
					}
					//console.log(wasChecked);
					//if not waschecked then check one of them
					if(!wasChecked)
						$(tmpElm).attr("checked","checked");
					
					
				}
				
				if(tmpElmName !== elmName && tmpElmName !=="")
				{
					tmpArrayElms=[];//empty then add
					tmpArrayElms[tmpArrayElms.length++] = $(currElm);
				}
				
				
				tmpElmName = elmName;
			
		};
		
		$.fn.buildbox($(obj));
		
		$("."+ opts.wrapperclass+" label").unbind().click(function(){
			
			if(!opts.disable_all)
			{
				var custbox = $(this).next("span");
				var boxtype = $(custbox).next("input").attr("type");
				var disabled = $(custbox).next("input").attr("disabled");
					
				if($(custbox).hasClass("checkbox"))
				{
					if($(custbox).hasClass("cust_"+boxtype+"_off") && !disabled)
						$(custbox).removeClass("cust_"+boxtype+"_off").addClass("cust_"+boxtype+"_on"); //turn on
					else if(!disabled)
						$(custbox).removeClass("cust_"+boxtype+"_on").addClass("cust_"+boxtype+"_off"); //turn off
				}
				else if(!disabled)
				{
					$(custbox).parent().find(".cust_checkbox").removeClass("cust_"+boxtype+"_on").addClass("cust_"+boxtype+"_off");
					$(custbox).removeClass("cust_"+boxtype+"_off").addClass("cust_"+boxtype+"_on"); //turn on
				}
			}
			
		});
		
		$(".cust_checkbox").unbind().click(function(){
			
			if(!opts.disable_all)
			{
				var boxtype = $(this).next("input").attr("type");
				var disabled = $(this).next("input").attr("disabled");
					
				if($(this).hasClass("checkbox"))//checkbox
				{
					if($(this).hasClass("cust_"+boxtype+"_off") && !disabled)
						$(this).removeClass("cust_"+boxtype+"_off").addClass("cust_"+boxtype+"_on").next("input").val($(this).attr("boxval")); //turn on
					else if(!disabled)
						$(this).removeClass("cust_"+boxtype+"_on").addClass("cust_"+boxtype+"_off").next("input").val(""); //turn off
				}
				else if(!disabled)//radio
				{
					$(this).parent().find(".cust_checkbox").removeClass("cust_"+boxtype+"_on").addClass("cust_"+boxtype+"_off").next("input").val("");
					$(this).removeClass("cust_"+boxtype+"_off").addClass("cust_"+boxtype+"_on").next("input").val($(this).attr("boxval")); //turn on
				}
			}
		});
	}); 
	
};
	
})(jQuery);
