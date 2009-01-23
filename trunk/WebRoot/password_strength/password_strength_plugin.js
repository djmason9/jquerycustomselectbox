/**
 * password_strength_plugin.js
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
 * @date 1/23/2009
 * @projectDescription Password Strength Meter is a jQuery plug-in provide you smart algorithm to detect a password strength. Based on Firas Kassem orginal plugin - http://phiras.wordpress.com/2007/04/08/password-strength-meter-a-jquery-plugin/
 * @version 1.0.0
 * 
 * @requires jquery.js (tested with 1.3.1)
 * 
*/
(function($) {
	
	var shortPass = 'Too short';
	var badPass = 'Weak';
	var goodPass = 'Good';
	var strongPass = 'Strong';
	var samePassword = 'Username and Password the same.';
	var resultStyle;
			
	$.fn.passStrength = function(options){
		
		var defaults = {
				shortPass: 		"shortPass",	//optional
				badPass:		"badPass",		//optional
				goodPass:		"goodPass",		//optional
				strongPass:		"strongPass",	//optional
				userid:			"",				//required override
				messageloc:		1				//before == 0 or after == 1
					
			};
		//override defaults
		var opts = $.extend(defaults, options);
		var currElm = $(this);
		
		//FUNCTIONS
		$.fn.checkRepetition = function(pLen,str) {
	    	var res = "";
	        for (var i=0; i<str.length ; i++ ) 
	        {
	            var repeated=true;
	            
	            for (var j=0;j < pLen && (j+i+pLen) < str.length;j++){
	                repeated=repeated && (str.charAt(j+i)==str.charAt(j+i+pLen));
	                }
	            if (j<pLen){repeated=false;}
	            if (repeated) {
	                i+=pLen-1;
	                repeated=false;
	            }
	            else {
	                res+=str.charAt(i);
	            }
	        }
	        return res;
		};
		
		$.fn.teststrength = function(password,username){
			 	var score = 0; 
			    
			    //password < 4
			    if (password.length < 4 ) { resultStyle = opts.shortPass;return shortPass; }
			    
			    //password == user name
			    if (password.toLowerCase()==username.toLowerCase()){resultStyle = opts.badPass;return samePassword;}
			    
			    //password length
			    score += password.length * 4;
			    score += ( $.fn.checkRepetition(1,password).length - password.length ) * 1;
			    score += ( $.fn.checkRepetition(2,password).length - password.length ) * 1;
			    score += ( $.fn.checkRepetition(3,password).length - password.length ) * 1;
			    score += ( $.fn.checkRepetition(4,password).length - password.length ) * 1;
	
			    //password has 3 numbers
			    if (password.match(/(.*[0-9].*[0-9].*[0-9])/)){ score += 5;} 
			    
			    //password has 2 symbols
			    if (password.match(/(.*[!,@,#,$,%,^,&,*,?,_,~].*[!,@,#,$,%,^,&,*,?,_,~])/)){ score += 5 ;}
			    
			    //password has Upper and Lower chars
			    if (password.match(/([a-z].*[A-Z])|([A-Z].*[a-z])/)){  score += 10;} 
			    
			    //password has number and chars
			    if (password.match(/([a-zA-Z])/) && password.match(/([0-9])/)){  score += 15;} 
			    //
			    //password has number and symbol
			    if (password.match(/([!,@,#,$,%,^,&,*,?,_,~])/) && password.match(/([0-9])/)){  score += 15;} 
			    
			    //password has char and symbol
			    if (password.match(/([!,@,#,$,%,^,&,*,?,_,~])/) && password.match(/([a-zA-Z])/)){score += 15;}
			    
			    //password is just a numbers or chars
			    if (password.match(/^\w+$/) || password.match(/^\d+$/) ){ score -= 10;}
			    
			    //verifying 0 < score < 100
			    if ( score < 0 ){score = 0;} 
			    if ( score > 100 ){  score = 100;} 
			    
			    if (score < 34 ){ resultStyle = opts.badPass; return badPass;} 
			    if (score < 68 ){ resultStyle = opts.goodPass;return goodPass;}
			    
			    resultStyle = opts.strongPass;
			    return strongPass;
			    
		};
		
		$(currElm).unbind().keyup(function(){
			
			var results = $.fn.teststrength($(this).val(),$(opts.userid).val());
			
			if(opts.messageloc === 1)
			{
				$(this).next(".testresult").remove();
				$(this).after("<span class=\"testresult "+resultStyle+"\"><span></span></span>");
				$(".testresult").find("span").text(results);
			}
			else
			{
				$(this).prev(".testresult").remove();
				$(this).before("<span class=\"testresult "+resultStyle+"\"><span></span></span>");
				$(".testresult").find("span").text(results);
			}
			
		});
	};
	
})(jQuery);