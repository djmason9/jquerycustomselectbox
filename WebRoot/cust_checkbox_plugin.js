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
 * @version 1.0.2
 * 
 * @requires jquery.js (tested with 1.3.0)
 * 
 * @param elmType: 			defaultElmType
 */

(function($) {	
	$.fn.custCheckBox = function(options){
		var cssoff = "cust_checkbox_off";
		var csson ="cust_checkbox_on";
		
		$.fn.buildbox = function(thisElm){

			for(var x=0;x<$(thisElm).length;x++)
			{
				var currElm = $(thisElm).get(x);
				
				$(currElm).css({display:"none"}).after("<span class=\"cust_checkbox\">&nbsp;&nbsp;&nbsp;&nbsp;</span>");
				
				var isChecked = $(currElm).attr("checked");
				
				var boxtype = $(currElm).attr("type");
				
				if(boxtype === "checkbox"){
					$(currElm).next("span").addClass("checkbox");
				}
				else{
					$(currElm).next("span").addClass("radio");
				}
				
				if(isChecked){
					$(currElm).next("span").addClass(csson);
				}
				else{
					$(currElm).next("span").addClass(cssoff);
				}
			}
		};
		
		$.fn.buildbox($(this));
		
		$(".cust_checkbox").unbind().click(function(){
			
			if($(this).hasClass("checkbox"))
			{
				if($(this).hasClass(cssoff))
				{
					$(this).removeClass(cssoff).addClass(csson); //turn on
				}
				else
				{
					$(this).removeClass(csson).addClass(cssoff); //turn off
				}
			}
			else
			{
				$(this).parent().find(".cust_checkbox").removeClass(csson).addClass(cssoff);
				$(this).removeClass(cssoff).addClass(csson); //turn on
			}
			
		});
		
	};
	
})(jQuery);
