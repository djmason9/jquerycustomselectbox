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
		var preCSS = "cust_checkbox_";
		
		var defaults = {
				elmType: 			"checkbox",
				defaultAllstate: 	"off"
		};
		
		var opts = $.extend(defaults, options);
		
		$(this).css({display:"none"}).wrap("<span class=\"cust_checkbox "+preCSS+opts.defaultAllstate+"\">&nbsp;&nbsp;&nbsp;&nbsp;</span>");
		
		console.log($(this).html());
		
		var isChecked = $(this).attr("checked");

		if(isChecked){
			$(this).find(".cust_checkbox").addClass(preCSS + "on");
		}
		
		
		$(".cust_checkbox").unbind().click(function(){
			
			if($(this).hasClass(preCSS + "off"))
			{
				$(this).removeClass(preCSS + "off").addClass(preCSS + "on");
			}
			else
			{
				$(this).removeClass(preCSS + "on").addClass(preCSS + "off");
			}
			
		});
		
	};
	
})(jQuery);
