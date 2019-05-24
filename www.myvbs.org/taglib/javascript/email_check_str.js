function email_check_str(emailStr){
	emailStr=emailStr.trim();
	emailPat=/^(.+)@(.+)$/
	specialChars="\\(\\)<>@,;:\\\\\\\"\\.\\[\\]"
	validChars="\[^\\s" + specialChars + "\]"
	quotedUser="(\"[^\"]*\")"
	ipDomainPat=/^\[(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})\]$/
	atom=validChars + '+'
	word="(" + atom + "|" + quotedUser + ")"
	userPat=new RegExp("^" + word + "(\\." + word + ")*$")
	domainPat=new RegExp("^" + atom + "(\\." + atom +")*$")
	matchArray=emailStr.match(emailPat)
	if(matchArray==null){
	  return("Your e-mail address seems incorrect (check @ and .'s)");
	}
	user=matchArray[1]
	domain=matchArray[2]
	if(user.match(userPat)==null){
	  return("The username doesn't seem to be valid.");
	}
	IPArray=domain.match(ipDomainPat)
	if(IPArray!=null){
	  for (i=1;i<=4;i++){
	    if (IPArray[i]>255){
	      return("Destination IP address is invalid!");
	    }
	  }
	}
	domainArray=domain.match(domainPat)
	if(domainArray==null){
	  return("Your domain name doesn't seem to be valid.");
	}
	atomPat=new RegExp(atom,"g");
	domArr=domain.match(atomPat);
	len=domArr.length;
	if(domArr[domArr.length-1].length<2){
	  return("Your e-mail address must end in a valid domain.");
	}
	if(len<2){
	  return("Your address is missing a hostname!");
	}
	return '';
}

function email_check(emailStr){
	return email_check_str(emailStr);
}
