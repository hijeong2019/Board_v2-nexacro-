pForm = nexacro.Form.prototype;
/*
 ===============================================================================
 == Util관련 공통함수들은 여기에 작성한다.
 ===============================================================================
 ● gfn_isNull        		: 입력값이 null에 해당하는 경우 모두를 한번에 체크한다.
 ● gfn_trim 	      		: 입력받은 문자열의 공백을 제거한다
 ● gfn_replaceAll    		: 문자열을 대소문자 구별없이 치환
 ● gfn_posCase       		: 문자열의 위치를 대소문자 구별없이 찾는다
 ● gfn_getLengthB    		: 문자열 BYTE으로 계산해서  길이 반환하는 함수(한글3/영문1/숫자1) *단 한글이 3BYTE or 2BYTE
 ● gfn_setComma      		: 문자열로 넘어온 숫자를 콤마처리하는 함수.
 ● gfn_replace       		: 입력된 문자열의 일부분을 다른 문자열로 치환하는 함수
 ● gfn_toString      		: 입력값을 String으로 변경한다.
 ● gfn_getByteLength 		: 스트링의 자릿수를 Byte 단위로 환산하여 알려준다 영문,영문, 숫자는 1Byte이고 한글은 2Byte이다.
 ● gfn_addDate       		: 입력된 날짜에 OffSet 으로 지정된 만큼의 날짜를 더함
 ● gfn_dateToStr     		: Date Type을 String으로 변환
 ● gfn_strToDate     		: Date String을 Date Type으로 변환(반대)
 ● gfn_addMonth      		: 입력된 날자에 OffSet 으로 지정된 만큼의 달을 더한다.
 ● gfn_isDate        		: 날짜 여부를 확인한다.(년월 or 년월일)
 ● gfn_isYMD         		: 날짜 여부를 확인한다.(YYYYMMDD)
 ● gfn_isYM          		: 날짜 여부를 확인한다.(YYYYMM)
 ● gfn_isTime        		: 시간 형식에 맞는지 Check 한다.
 ● gfn_getDate       		: 현재일자를 구한다. (PC에 현재일자를 구하는 함수)
 ● gfn_getLastDate   		: 년월을 입력받아 마지막 일를 반환한다(년월)
 ● gfn_getFirstDate  		: 현재월 1일 만들기.
 ● gfn_getDay        		: 입력된 날자로부터 요일을 구함
 ● gfn_getDiffDate   		: 두 일자간의 차이 일수 계산
 ● gfn_getDiffMonth  		: 두 일자간의 차이 월수 계산.
 ● gfn_nvl  		  		: 입력값이 null에 해당되면 val2(대체문자열)로 반환한다.
 ● gfn_isEmpty       		: 입력값이 Null에 해당되면 빈값으로 반환한다.
 ● gfn_solarBase     		: 각 월별 음력 기준 정보 (처리가능 기간  1841 - 2043년)
 ● gfn_solarToLunar  		: 양력을 음력으로 변환해주는 함수
 ● gfn_lunarToSolar  		: 음력을 양력으로 변환.
 ● gfn_getWeek       		: 년월일(yyyyMMdd)을 입력하면 해당 주차를 리턴한다.
 ● gfn_makeDate      		: Datetime형식으로 변환  Date Type을 String으로 변환
 ● gfn_isString      		: 데이타형이 스트링 유무체크
 ● gfn_isArray       		: 배열 여부 체크
 ● gfn_isObject      		: object 유무 체크
 ● gfn_isXComponent  		: Component 유무체크
 ● gfn_nvlEmptyStr       	: 입력값을 체크하여 Null인경우 null string으로 반환
 ● gfn_removeSpecialChar 	: 특수문자를 제거한다
 ● gfn_removeHtmlTag     	: HTML TAG 제거 함수 sHtml - 제거대상 문자열 
 ● gfn_isExistInArray    	: 배열에 해당 값이 존재하는지 확인한다. 
 ● gfn_checkJumin    		: 주민번호 유효성 여부
 ● gfn_getCamel      		: 대문자 "_"로 구분된 문자를 카멜타입으로 반환  
 ● gfn_checkURL      		: 입력값이 URL Type인지 체크하는 함수
 ● gfn_checkEmail    		: 입력값이 e-mail Type인지 체크하는 함수
 ● gfn_checkPhone    		: 입력값이 전화번호 format 인지 체크하는 함수
 ● gfn_getFileExt    		: 파일 확장자를 가져온다.
 ● gfn_htmlToChars   		: html형식의 문자열에서 태그문자를 특수문자로 변형
 ● gfn_specToChars   		: 특수문자가 들어있는 문자열에서 html형식의 문자로 변형
 
*/
 
 /**********************************************************************************
 * Function Name: gfn_isNull
 * Description  : 입력값이 null에 해당하는 경우 모두를 한번에 체크한다.
 * Arguments    : val : 체크할 문자열( 예 : null 또는 undefined 또는 "" 또는 "abc" )
 * Return       : Boolean,  Val이 undefined, null, NaN, "", Array.length = 0인 경우 = true 이외의 경우 = false
 **********************************************************************************/ 
pForm.gfn_isNull = function(val)
{
	if (new String(val).valueOf() == "undefined") 
	{
		return true;
	}
	if (val == null) 
	{
		return true;
	}
	if (("x" + val == "xNaN") && (new String(val.length).valueOf() == "undefined")) 
	{
		return true;
	}
	if (val.length == 0) 
	{
		return true;
	}
	return false;
};
/**********************************************************************************
 * Function Name: gfn_trim
 * Description  : 입력받은 문자열의 공백을 제거한다.
 * Arguments    : strText  : 원래문자열
 * Return       : 공백이 제거된 문자열
 **********************************************************************************/  
pForm.gfn_trim = function(strText)
{
	if (strText == null) return "";
	if (new String(strText).valueOf() == "undefined") return "";
	if (new String(strText) == null) return "";
	
    var retVal = (new String(strText)).replace(/^\s+|\s+$/g, '');
    return retVal;
};

/**********************************************************************************
 * Function Name: gfn_replaceAll
 * Description  : 문자열을 대소문자 구별없이 치환
 * Arguments    : sOrg     : 원래문자열
				  sRepFrom : 치환할 문자열
				  sRepTo   : 치환될 문자열
 * Return       : String 문자열
 * Sample       : while(strMsg.indexOf("\\n") > -1)
				 {
					strMsg = this.gfn_replaceAll(strMsg,"\\n", String.fromCharCode(10));
				 }
 **********************************************************************************/
pForm.gfn_replaceAll = function (sOrg, sRepFrom, sRepTo)
{
	var pos	   	= 0;
	var nStart 	= 0
	var sRet 	= "";

	if( this.gfn_isNull(sOrg) )
	{
		return "";
	}
	if( this.gfn_isNull(sRepFrom) )
	{
		return sOrg;
	}

	while( 1 )
	{
		pos = this.gfn_posCase(sOrg, sRepFrom, nStart);
		if (pos < 0)
		{
			sRet += sOrg.substr(nStart);
			break;
		}else
		{
			sRet += sOrg.substr(nStart, pos - nStart);
			sRet += sRepTo;
			nStart = pos + sRepFrom.length;
		}
	}
	return sRet;
};
/**********************************************************************************
 * Function Name: gfn_posCase
 * Description  : 문자열의 위치를 대소문자 구별없이 찾는다
 * Arguments    : sOrg     : 원래문자열
				  sFind    : 치환할 문자열
				  nStart   : 치환될 문자열
 * Return       : Integer 찾고자 하는 문자열의 시작위치
 **********************************************************************************/ 
pForm.gfn_posCase = function (sOrg, sFind, nStart)
{
	if( this.gfn_isNull(sOrg) || this.gfn_isNull(sFind) )
	{
		return -1;
	}
	if( this.gfn_isNull(nStart) )
	{
		nStart = 0;
	}
	return sOrg.toLowerCase().indexOf(sFind.toLowerCase(), nStart);
};
/**********************************************************************************
 * Function Name: gfn_getLengthB(한글3Bitey)
 * Description  : 문자열 BYTE으로 계산해서  길이 반환하는 함수(한글3/영문1/숫자1)
 * Arguments    : sValue         : 문자열
                  nHanglByteSize : 한글 바이트 size 숫자로 등록 한글이3byte:3 2byte:2  
 * Return       : v_cnt          : 숫자 
 **********************************************************************************/  
pForm.gfn_getLengthB = function(sValue,nHanglByteSize) 
{
	if(this.gfn_isNull(sValue))  
	{
		return 0;
	}
    var v_ChkStr = sValue.toString();
    var v_cnt    = 0;
    
    for (var i=0; i<v_ChkStr.length; i++) 
    {
        if (v_ChkStr.charCodeAt(i) > 127) 
        {
            v_cnt += nHanglByteSize;
        } else 
        {
            v_cnt += 1;
        }
    }
	return v_cnt;
}
 
 /**********************************************************************************
 * Function Name: this.gfn_setComma(sNum)
 * Description  : 문자열로 넘어온 숫자를 콤마처리하는 함수.
 * Arguments    : sNum 숫자문자열
 * return       : 숫자문자열 콤마처리해서 넘김
 **********************************************************************************/
 pForm.gfn_setComma = function(sNum)
{
	sNum = this.gfn_replace(sNum, ",", "");
	var ppos,sDigit,nEnd,nStart = 0,sRet = "";
	if (sNum.charAt(0) == "+" || sNum.charAt(0) == "-"){
		sRet += sNum.charAt(0);
		nStart = 1;
	}

	ppos = sNum.indexOf(".", nStart);
	if (ppos < 0){
		nEnd = sNum.length;
	} else {
		nEnd = ppos;
	}

	sDigit = sNum.substr(nStart, nEnd - nStart);
	for (this.getSetter("pos").set(0); this.lookup("pos") < sDigit.length; this.lookupSetter("pos", "set_pos").postInc()){
		if (this.lookup("pos") != 0 && (sDigit.length - this.lookup("pos")) % 3 == 0){
			sRet += ",";
		}
		sRet += sDigit.charAt(this.lookup("pos"));
	}
	sRet += sNum.substr(nEnd);

	return sRet;
};

/**********************************************************************************
 * Function Name: gfn_replace()
 * Description  : 입력된 문자열의 일부분을 다른 문자열로 치환하는 함수
 * Arguments    : strString 원본 문자열.
 *                strOld    원본 문자열에서 찾을 문자열.
 *                strNew    새로 바꿀 문자열.
 * return       : 대체된 문자열
 **********************************************************************************/
pForm.gfn_replace = function(val, strOld, strNew)
{
	val = this.gfn_toString(val);
	val = val.split(eval("/" + strOld + "/g")).join(strNew);
	return val;
};

/*******************************************************************************
 * Function Name: gfn_toString
 * Description  : 입력값을 String으로 변경한다.
 * Arguments    : val
 * Return       : String
 *******************************************************************************/
pForm.gfn_toString = function(val)
{
	if(this.gfn_isNull(val)) 
	{
		return new String();
	}
	return new String(val);
};

/*******************************************************************************
 * Function Name: gfn_getByteLength
 * Description  : 스트링의 자릿수를 Byte 단위로 환산하여 알려준다 영문,영문, 숫자는 1Byte이고 한글은 2Byte이다.
 * Arguments    : sValue(스트링)
 * Return       : String 문자열의 byte 길이
 *******************************************************************************/ 
pForm.gfn_getByteLength = function(sValue)  
{
	var byteLength = 0;
	
	if (this.gfn_isNull(sValue))
	{
		return 0;
	}
	var c;
	for (var i=0; i<sValue.length; i++)
	{
		c = escape(sValue.charAt(i));
		if (c.length == 1)
		{ // when English then 1byte
			byteLength++;
		} else if (c.indexOf("%u") != -1)
		{ // when Korean then 3byte
			byteLength += 2; 				// utf-8 : 3
		} else if (c.indexOf("%") != -1)
		{ 	// else 3byte
			byteLength += c.length/3;
		}
	}
	return byteLength;
}

/*******************************************************************************
 * Function Name  : gfn_addDate
 * Description    : 입력된 날짜에 OffSet 으로 지정된 만큼의 날짜를 더함
 * Arguments      : strDate - 'yyyyMMdd' 형태로 표현된 날짜.
 *                  nOffSet - 날짜로부터 증가 감소값.
 * Return(String) : date의 문자열 (ex. 20080821)
 *******************************************************************************/  
pForm.gfn_addDate = function(strDate, nOffSet)
{
	var date 	= new Date();
	var iYear 	= parseInt(strDate.substr(0, 4));
    var iMonth 	= parseInt(strDate.substr(4, 2) - 1);
    var iDate 	= parseInt(strDate.substr(6, 2)-(nOffSet*-1));
    date.setFullYear(iYear,iMonth,iDate);	
	
	return this.gfn_dateToStr(date);
};

/*******************************************************************************
 * Function Name  : gfn_dateToStr
 * Description    : Date Type을 String으로 변환
 * Arguments      : date Type 날짜
 * Return(String) : date의 문자열 (ex. 20080821)
 *******************************************************************************/   
pForm.gfn_dateToStr = function(date)
{
	var strYear 	= date.getYear().toString();
	var strMonth 	= (date.getMonth()+1).toString();
	var strDate 	= date.getDate().toString();
	
	if(strYear.length==2)
	{
		strYear = '19'+strYear;
	} else if(strYear.length==1)
	{
		strYear = '190'+strYear;
	}	
	
	if(strMonth.length==1)
	{
		strMonth = '0'+strMonth;
	}
	
	if(strDate.length==1)
	{
		strDate = '0'+strDate;
	}
	return strYear+strMonth+strDate;
};

/*******************************************************************************
 * Function Name  : gfn_strToDate
 * Description    : strData(String) Type => Date Type 변환
 * Arguments      : date String Type
 * Return(String) : date의 data Type Return (ex. 20080821)
 *******************************************************************************/    
pForm.gfn_strToDate = function(inDate)
{
  var date =  new Date(parseInt(inDate.substr(0,4)),parseInt(inDate.substr(4,2))-1,parseInt(inDate.substr(6,2)));
  return date;
};

/*******************************************************************************
 * Function Name  : gfn_addMonth
 * Description    : 입력된 월에 OffSet 으로 지정된 만큼의 월을 더함
 * Arguments      : {String} strDate날짜
                    {Number} OffSet - Integer Format
 * Return(String) : date 
 *******************************************************************************/  
pForm.gfn_addMonth = function(strDate, OffSet) 
{	
	var date, d, s, mon, val;

	/**
	 * @class 입력일자 해당월의 마지막 일 <br>
	 * @param {String} strMonth - 'yyyyMMdd' 형태로 표현된 날짜.
	 * @return {Number} 해당월의 마지막일자 2자리
	 */
	var gfn_getMonthLastDate = function(strMonth) {
		var iLastDay;
		var iYear  = parseInt(strMonth.substr(0, 4),10) ;
		var iMonth = parseInt(strMonth.substr(4, 2),10);
		switch(iMonth)
		{
			case 2 :
				if( ((iYear%4)==0) && ((iYear%100)!=0) || ((iYear%400)==0) )
					iLastDay = 29;
				else
					iLastDay = 28;			
				break;
			case 4 :
			case 6 :
			case 9 :
			case 11 :
				iLastDay = 30;
				break;
			default:
				iLastDay = 31;
				break;
		}
		
		return iLastDay;
	};

    if (strDate) {
        date = this.gfn_strToDate(strDate);
        d = (new Date(date)).addMonth(OffSet);
    } else {
    	date = this.gfn_strToDate(this.gfn_getDate());
		d = (new Date(date)).addMonth(OffSet);
    }
    
    if (gfn_getMonthLastDate(strDate) == date.getDate()) {
    	var sY = new Date(d).getFullYear();
    	var sM = new Date(d).getMonth();
    	var eY = date.getFullYear();
    	var eM = date.getMonth();
    	
    	mon = -((eY - sY)* 12 + (eM - sM));
    	
    	if (mon != OffSet) {
   			val = OffSet - mon;
    		d = (new Date(d)).addMonth(-1);
    	}
    	
    	var ld = new Date((new Date(d)).getFullYear() 
    			, (new Date(d)).getMonth()
    			, gfn_getMonthLastDate(this.gfn_dateToStr(new Date(d))));
    	
    	s = (new Date(ld)).getFullYear()
		   + (((new Date(ld)).getMonth() + 1) + "").padLeft(2, '0')
		   + (((new Date(ld)).getDate()) + "").padLeft(2, '0');
    } else {
    	s = (new Date(d)).getFullYear()
		   + (((new Date(d)).getMonth() + 1) + "").padLeft(2, '0')
		   + (((new Date(d)).getDate()) + "").padLeft(2, '0');
    }
	return (s);
};

/*******************************************************************************
 * Function Name  : this.gfn_isDate(strDate)
 * Description    : 날짜 여부를 확인한다.(년월 or 년월일)
 * Arguments      : {String}  strDate - 입력스트링(YYYYMM or YYYYMMDD)
 * Return(String) : {Boolean} true/false 
 *******************************************************************************/ 
pForm.gfn_isDate = function(strDate)
{
	if (this.gfn_isNull(strDate)) 
	{
		return false;
	}
	var retVal;
	switch(strDate.length)
	{
		case 6://년월
			retVal =  this.gfn_isYM(strDate);
			break;
		case 8://년월일
			retVal =  this.gfn_isYMD(strDate);
			break;
		default:
			retVal = false; 
			break;
	}

	return retVal;
};

/*******************************************************************************
 * Function Name  : this.gfn_isYMD(strDate)
 * Description    : 날짜 여부를 확인한다.
 * Arguments      : {String} strDate - 8자리의 숫자로 된 날짜(YYYYMMDD)
 * Return(String) : {Boolean} true/false 
 *******************************************************************************/  
pForm.gfn_isYMD = function(strDate)
{
	var retVal = this.gfn_getDigit(strDate);
	
	if (retVal.length != 8) 
	{
		return false;
	}

	var strYM = strDate.substr(0,6);	//년월
	if (!this.gfn_isYM(strYM)) 
	{
		return false;
	}
	var nDay   = nexacro.toNumber(strDate.substr(6,2));	// 일자
	var nLastDay = nexacro.toNumber(this.gfn_getLastDate(strYM).substr(6,2));//gfn_getLastDay에서 전체 20170331값이 넘어와서 .substr(6,2)추가 20170313
	
	if (nDay < 1 || nDay > nLastDay) 
	{
		return false;
	}
	return true;
};


/*******************************************************************************
 * Function Name  : this.gfn_isYM(strDate)
 * Description    : 날짜 여부를 확인한다.
 * Arguments      : {String} strDate - 6자리의 숫자로 된 날짜(YYYYMM)
 * Return(String) : {Boolean} true/false 
 *******************************************************************************/   
pForm.gfn_isYM = function(strDate)
{
	if(this.gfn_isNull(strDate))
	{
		return false;
	}
	var retVal = this.gfn_getDigit(strDate);

	if (retVal.length != 6) 
	{
		return false;
	}
	var nYear  = nexacro.toNumber(strDate.substr(0,4));	//년도값을 숫자로
	var nMonth = nexacro.toNumber(strDate.substr(4,2));	//월을 숫자로

	if((nMonth < 1) || (nMonth > 12)) 
	{
		return false;
	}
	return true;
};

/*******************************************************************************
 * Function Name  : this.gfn_isTime(strDate)
 * Description    : 시간 형식에 맞는지 Check 한다.
 * Arguments      : strTime - 6자리의 숫자로 된 내부시간형식(HHMMSS)
 * Return(String) : {Boolean} true/false 
 *******************************************************************************/   
pForm.gfn_isTime = function(strTime)
{
	if (strTime.length != 6 || !nexacro.isNumeric(strTime)) 
	{
		return false;
	}

	var t01 = nexacro.toNumber(strTime.slice(0, 2));
	var t02 = nexacro.toNumber(strTime.slice(2, 4));
	var t03 = nexacro.toNumber(strTime.slice(4, 6));

	if((t01 < 0 || t01 > 23) || (t02 < 0 || t02 > 59) || (t03 < 0 || t03 > 59)) 
	{
		return false;
	}else 
	{
		return true;
	}
};

/*******************************************************************************
 * Function Name  : this.gfn_getDate(strDate)   
 * Description    : 현재일자를 구한다. (PC에 현재일자를 구하는 함수)
 * Arguments      : {String} [sGubn] - date/null : 일자, time : 일자+시간, milli : Milliseconds
 * Return(String) : {String} 8/14/16자리 날짜(YYYYMMMDDHHMMSS)문자열 
 *******************************************************************************/   
pForm.gfn_getDate = function(sGubn) 
{
	if(this.gfn_isNull(sGubn)) 
	{
		sGubn = "date";
	}
	var d = new Date();
	var s;
	
	if (sGubn == "date") 
	{
		s = d.getFullYear()
		  + ((d.getMonth() + 1) + "").padLeft(2, '0')
		  + (d.getDate() + "").padLeft(2, '0');
	
	}else if (sGubn == "time") 
	{
		s = d.getFullYear()
	      + ((d.getMonth() + 1) + "").padLeft(2, '0')
	      + (d.getDate() + "").padLeft(2, '0')
	      + (d.getHours() + "").padLeft(2, '0')
	      + (d.getMinutes() + "").padLeft(2, '0')
	      + (d.getSeconds() + "").padLeft(2, '0');
	
	}else if (sGubn == "milli") 
	{
		s = d.getFullYear()
	      + ((d.getMonth() + 1) + "").padLeft(2, '0')
	      + (d.getDate() + "").padLeft(2, '0')
	      + (d.getHours() + "").padLeft(2, '0')
	      + (d.getMinutes() + "").padLeft(2, '0')
	      + (d.getSeconds() + "").padLeft(2, '0')
		  + (d.getMilliseconds() + "").padLeft(3, '0');
	}
	return (s);
};

/*******************************************************************************
 * Function Name  : this.gfn_getLastDate(strDate)   
 * Description    : 년월을 입력받아 마지막 일를 반환한다(년월)
 * Arguments      : {String} strDate - 6 / 8 자리의 숫자로 된 날짜(YYYYMM)
 * Return(String) : {String} 해당월의 마지막날 8자리
 *******************************************************************************/  
pForm.gfn_getLastDate = function(strDate)
{
	var s = "";
    if (strDate == null) 
	{
	    var date = (new Date()).addMonth(1);
    }else 
	{
	    var date = new Date(parseInt(strDate.substr(0,4)),parseInt(strDate.substr(4,2)),1);
    }

	date = (new Date(date)).addDate((new Date(date)).getDate()*-1);

	s = (new Date(date)).getFullYear()
	  + (((new Date(date)).getMonth() + 1) + "").padLeft(2, '0')
	  + ((new Date(date)).getDate() + "").padLeft(2, '0');

	return (s);
};

/*******************************************************************************
 * Function Name  : this.gfn_getFirstDate(strDate)   
 * Description    : 현재월 1일 만들기.
 * Arguments      : {String} strDate - Date Format YYYYMM / YYYYMMDD
 * Return(String) : {String} date 현재일의 시작일자 리턴
 *******************************************************************************/  
pForm.gfn_getFirstDate = function(strDate)
{
    var s = "";

    if (strDate == null) 
	{
	    s = getToday().substr(0,6) + "01";
    } else 
	{
	    var date = new Date(parseInt(strDate.substr(0,4)),parseInt(strDate.substr(4,2))-1,1);
	    
		s = (new Date(date)).getFullYear()
	      + (((new Date(date)).getMonth()+1)+ "").padLeft(2, '0')
	      + ((new Date(date)).getDate() + "").padLeft(2, '0');
    }
	return (s);
};

/*******************************************************************************
 * Function Name  : this.gfn_getDay(strDate)   
 * Description    : 입력된 날자로부터 요일을 구함
 * Arguments      : {String} strDate - 'yyyyMMdd' 형태로 표현된 날짜.
 * Return(String) : {Number} 0 = 일요일 ~ 6 = 토요일. 오류가 발생할 경우 -1 Return.
 *******************************************************************************/  
pForm.gfn_getDay = function(strDate)
{
    var date = new Date();

    var iYear = parseInt(strDate.substr(0, 4));
    var iMonth = parseInt(strDate.substr(4, 2) - 1);
    var iDate = parseInt(strDate.substr(6, 2));
    
	date.setFullYear(iYear,iMonth,iDate);
    return date.getDay();
};

/*******************************************************************************
 * Function Name  : this.gfn_getDiffDate(sStartDate, sEndDate)
 * Description    : 두 일자간의 차이 일수 계산
 * Arguments      : {String} sStartDate - yyyyMMdd형태의 From 일자 ( 예 : "20121122" )
                    {String} sEndDate - yyyyMMdd형태의 To 일자   ( 예 : "20121202" )
 * Return(String) : {Number} 숫자 형태의 차이일수( 예 : 10 ) 단, sEndDate < sStartDate이면 음수가 return된다.
 *******************************************************************************/  
pForm.gfn_getDiffDate = function(sStartDate, sEndDate)
{
    var vFromDate 	= new Date(parseInt(sEndDate.substring(0,4),  10), parseInt(sEndDate.substring(4,6)-1,  10), parseInt(sEndDate.substring(6,8), 10));
    var vToDate 	= new Date(parseInt(sStartDate.substring(0,4),  10), parseInt(sStartDate.substring(4,6)-1,  10), parseInt(sStartDate.substring(6,8), 10));
    
    return parseInt((vFromDate - vToDate)/(1000*60*60*24));
};

/*******************************************************************************
 * Function Name  : this.gfn_getDiffMonth(sStartDate, sEndDate)
 * Description    : 두 일자간의 차이 월수 계산. 단, sStartDate, sEndDate의 일은 포함하지 않고 계산된다.
 * Arguments      : {String} sStartDate - yyyyMMdd형태의 From 일자 ( 예 : "20121122" )
                    {String} sEndDate - yyyyMMdd형태의 To 일자   ( 예 : "20121202" )
 * Return(String) : {Number} 숫자 형태의 차이월수 ( 예 : 10 ) 단, sEndDate < sStartDate이면 음수가 return된다.
 *******************************************************************************/  
pForm.gfn_getDiffMonth = function(sStartDate, sEndDate)
{
	var nStartMon, nEndMon;
	
	nStartMon 	= parseInt(sStartDate.substr(0,4), 10)*12 + parseInt(sStartDate.substr(4,2), 10);
	nEndMon 	= parseInt(sEndDate.substr(0,4), 10)*12 + parseInt(sEndDate.substr(4,2), 10);
	
	return (nEndMon - nStartMon);
};

/*******************************************************************************
 * Function Name: gfn_nvl
 * Description  : 입력값이 null에 해당되면 val2(대체문자열)로 반환한다.
 * Arguments    : val : 체크할 문자열( 예 : null 또는 undefined 또는 "" 또는 "abc" )
 * Return       : N/A,  val값이 null에 해당하는 경우 val2값으로 대체 반환
 ******************************************************************************/
pForm.gfn_nvl = function(val,val2)
{
    var rtnVal = (this.gfn_isNull(val)) ? val2 : val;
    return rtnVal;
};

/*******************************************************************************
 * Function Name: gfn_isEmpty
 * Description  : 입력값이 Null에 해당되면 빈값으로 반환한다.
 * Arguments    : val : 입력값
 * Return       : N/A, val값이 null에 해당되면 빈값 반환
 *******************************************************************************/
pForm.gfn_isEmpty = function(val)
{
    var rtnVal = (this.gfn_isNull(val)) ? "" : val;
	return rtnVal;
};

/*******************************************************************************
 * Function Name: gfn_solarBase
 * Description  : 각 월별 음력 기준 정보 (처리가능 기간  1841 - 2043년)
 * Arguments    : 없음
 * Return       : {String}
 *******************************************************************************/ 
pForm.gfn_solarBase = function ()
{
	var sBase;
			
	//1841
	sBase = "1,2,4,1,1,2,1,2,1,2,2,1,";
	sBase += "2,2,1,2,1,1,2,1,2,1,2,1,";
	sBase += "2,2,2,1,2,1,4,1,2,1,2,1,";
	sBase += "2,2,1,2,1,2,1,2,1,2,1,2,";
	sBase += "1,2,1,2,2,1,2,1,2,1,2,1,";
	sBase += "2,1,2,1,5,2,1,2,2,1,2,1,";
	sBase += "2,1,1,2,1,2,1,2,2,2,1,2,";
	sBase += "1,2,1,1,2,1,2,1,2,2,2,1,";
	sBase += "2,1,2,3,2,1,2,1,2,1,2,2,";
	sBase += "2,1,2,1,1,2,1,1,2,2,1,2,";
	//1851
	sBase += "2,2,1,2,1,1,2,1,2,1,5,2,";
	sBase += "2,1,2,2,1,1,2,1,2,1,1,2,";
	sBase += "2,1,2,2,1,2,1,2,1,2,1,2,";
	sBase += "1,2,1,2,1,2,5,2,1,2,1,2,";
	sBase += "1,1,2,1,2,2,1,2,2,1,2,1,";
	sBase += "2,1,1,2,1,2,1,2,2,2,1,2,";
	sBase += "1,2,1,1,5,2,1,2,1,2,2,2,";
	sBase += "1,2,1,1,2,1,1,2,2,1,2,2,";
	sBase += "2,1,2,1,1,2,1,1,2,1,2,2,";
	sBase += "2,1,6,1,1,2,1,1,2,1,2,2,";
	//1861
	sBase += "1,2,2,1,2,1,2,1,2,1,1,2,";
	sBase += "2,1,2,1,2,2,1,2,2,3,1,2,";
	sBase += "1,2,2,1,2,1,2,2,1,2,1,2,";
	sBase += "1,1,2,1,2,1,2,2,1,2,2,1,";
	sBase += "2,1,1,2,4,1,2,2,1,2,2,1,";
	sBase += "2,1,1,2,1,1,2,2,1,2,2,2,";
	sBase += "1,2,1,1,2,1,1,2,1,2,2,2,";
	sBase += "1,2,2,3,2,1,1,2,1,2,2,1,";
	sBase += "2,2,2,1,1,2,1,1,2,1,2,1,";
	sBase += "2,2,2,1,2,1,2,1,1,5,2,1,";
	//1871
	sBase += "2,2,1,2,2,1,2,1,2,1,1,2,";
	sBase += "1,2,1,2,2,1,2,1,2,2,1,2,";
	sBase += "1,1,2,1,2,4,2,1,2,2,1,2,";
	sBase += "1,1,2,1,2,1,2,1,2,2,2,1,";
	sBase += "2,1,1,2,1,1,2,1,2,2,2,1,";
	sBase += "2,2,1,1,5,1,2,1,2,2,1,2,";
	sBase += "2,2,1,1,2,1,1,2,1,2,1,2,";
	sBase += "2,2,1,2,1,2,1,1,2,1,2,1,";
	sBase += "2,2,4,2,1,2,1,1,2,1,2,1,";
	sBase += "2,1,2,2,1,2,2,1,2,1,1,2,";
	//1881
	sBase += "1,2,1,2,1,2,5,2,2,1,2,1,";
	sBase += "1,2,1,2,1,2,1,2,2,1,2,2,";
	sBase += "1,1,2,1,1,2,1,2,2,2,1,2,";
	sBase += "2,1,1,2,3,2,1,2,2,1,2,2,";
	sBase += "2,1,1,2,1,1,2,1,2,1,2,2,";
	sBase += "2,1,2,1,2,1,1,2,1,2,1,2,";
	sBase += "2,2,1,5,2,1,1,2,1,2,1,2,";
	sBase += "2,1,2,2,1,2,1,1,2,1,2,1,";
	sBase += "2,1,2,2,1,2,1,2,1,2,1,2,";
	sBase += "1,5,2,1,2,2,1,2,1,2,1,2,";
	//1891
	sBase += "1,2,1,2,1,2,1,2,2,1,2,2,";
	sBase += "1,1,2,1,1,5,2,2,1,2,2,2,";
	sBase += "1,1,2,1,1,2,1,2,1,2,2,2,";
	sBase += "1,2,1,2,1,1,2,1,2,1,2,2,";
	sBase += "2,1,2,1,5,1,2,1,2,1,2,1,";
	sBase += "2,2,2,1,2,1,1,2,1,2,1,2,";
	sBase += "1,2,2,1,2,1,2,1,2,1,2,1,";
	sBase += "2,1,5,2,2,1,2,1,2,1,2,1,";
	sBase += "2,1,2,1,2,1,2,2,1,2,1,2,";
	sBase += "1,2,1,1,2,1,2,5,2,2,1,2,";
	//1901
	sBase += "1,2,1,1,2,1,2,1,2,2,2,1,";
	sBase += "2,1,2,1,1,2,1,2,1,2,2,2,";
	sBase += "1,2,1,2,3,2,1,1,2,2,1,2,";
	sBase += "2,2,1,2,1,1,2,1,1,2,2,1,";
	sBase += "2,2,1,2,2,1,1,2,1,2,1,2,";
	sBase += "1,2,2,4,1,2,1,2,1,2,1,2,";
	sBase += "1,2,1,2,1,2,2,1,2,1,2,1,";
	sBase += "2,1,1,2,2,1,2,1,2,2,1,2,";
	sBase += "1,5,1,2,1,2,1,2,2,2,1,2,";
	sBase += "1,2,1,1,2,1,2,1,2,2,2,1,";
	//1911
	sBase += "2,1,2,1,1,5,1,2,2,1,2,2,";
	sBase += "2,1,2,1,1,2,1,1,2,2,1,2,";
	sBase += "2,2,1,2,1,1,2,1,1,2,1,2,";
	sBase += "2,2,1,2,5,1,2,1,2,1,1,2,";
	sBase += "2,1,2,2,1,2,1,2,1,2,1,2,";
	sBase += "1,2,1,2,1,2,2,1,2,1,2,1,";
	sBase += "2,3,2,1,2,2,1,2,2,1,2,1,";
	sBase += "2,1,1,2,1,2,1,2,2,2,1,2,";
	sBase += "1,2,1,1,2,1,5,2,2,1,2,2,";
	sBase += "1,2,1,1,2,1,1,2,2,1,2,2,";
	//1921
	sBase += "2,1,2,1,1,2,1,1,2,1,2,2,";
	sBase += "2,1,2,2,3,2,1,1,2,1,2,2,";
	sBase += "1,2,2,1,2,1,2,1,2,1,1,2,";
	sBase += "2,1,2,1,2,2,1,2,1,2,1,1,";
	sBase += "2,1,2,5,2,1,2,2,1,2,1,2,";
	sBase += "1,1,2,1,2,1,2,2,1,2,2,1,";
	sBase += "2,1,1,2,1,2,1,2,2,1,2,2,";
	sBase += "1,5,1,2,1,1,2,2,1,2,2,2,";
	sBase += "1,2,1,1,2,1,1,2,1,2,2,2,";
	sBase += "1,2,2,1,1,5,1,2,1,2,2,1,";
	//1931
	sBase += "2,2,2,1,1,2,1,1,2,1,2,1,";
	sBase += "2,2,2,1,2,1,2,1,1,2,1,2,";
	sBase += "1,2,2,1,6,1,2,1,2,1,1,2,";
	sBase += "1,2,1,2,2,1,2,2,1,2,1,2,";
	sBase += "1,1,2,1,2,1,2,2,1,2,2,1,";
	sBase += "2,1,4,1,2,1,2,1,2,2,2,1,";
	sBase += "2,1,1,2,1,1,2,1,2,2,2,1,";
	sBase += "2,2,1,1,2,1,4,1,2,2,1,2,";
	sBase += "2,2,1,1,2,1,1,2,1,2,1,2,";
	sBase += "2,2,1,2,1,2,1,1,2,1,2,1,";
	//1941
	sBase += "2,2,1,2,2,4,1,1,2,1,2,1,";
	sBase += "2,1,2,2,1,2,2,1,2,1,1,2,";
	sBase += "1,2,1,2,1,2,2,1,2,2,1,2,";
	sBase += "1,1,2,4,1,2,1,2,2,1,2,2,";
	sBase += "1,1,2,1,1,2,1,2,2,2,1,2,";
	sBase += "2,1,1,2,1,1,2,1,2,2,1,2,";
	sBase += "2,5,1,2,1,1,2,1,2,1,2,2,";
	sBase += "2,1,2,1,2,1,1,2,1,2,1,2,";
	sBase += "2,2,1,2,1,2,3,2,1,2,1,2,";
	sBase += "2,1,2,2,1,2,1,1,2,1,2,1,";
	//1951
	sBase += "2,1,2,2,1,2,1,2,1,2,1,2,";
	sBase += "1,2,1,2,4,2,1,2,1,2,1,2,";
	sBase += "1,2,1,1,2,2,1,2,2,1,2,2,";
	sBase += "1,1,2,1,1,2,1,2,2,1,2,2,";
	sBase += "2,1,4,1,1,2,1,2,1,2,2,2,";
	sBase += "1,2,1,2,1,1,2,1,2,1,2,2,";
	sBase += "2,1,2,1,2,1,1,5,2,1,2,2,";
	sBase += "1,2,2,1,2,1,1,2,1,2,1,2,";
	sBase += "1,2,2,1,2,1,2,1,2,1,2,1,";
	sBase += "2,1,2,1,2,5,2,1,2,1,2,1,";
	//1961
	sBase += "2,1,2,1,2,1,2,2,1,2,1,2,";
	sBase += "1,2,1,1,2,1,2,2,1,2,2,1,";
	sBase += "2,1,2,3,2,1,2,1,2,2,2,1,";
	sBase += "2,1,2,1,1,2,1,2,1,2,2,2,";
	sBase += "1,2,1,2,1,1,2,1,1,2,2,1,";
	sBase += "2,2,5,2,1,1,2,1,1,2,2,1,";
	sBase += "2,2,1,2,2,1,1,2,1,2,1,2,";
	sBase += "1,2,2,1,2,1,5,2,1,2,1,2,";
	sBase += "1,2,1,2,1,2,2,1,2,1,2,1,";
	sBase += "2,1,1,2,2,1,2,1,2,2,1,2,";
	//1971
	sBase += "1,2,1,1,5,2,1,2,2,2,1,2,";
	sBase += "1,2,1,1,2,1,2,1,2,2,2,1,";
	sBase += "2,1,2,1,1,2,1,1,2,2,2,1,";
	sBase += "2,2,1,5,1,2,1,1,2,2,1,2,";
	sBase += "2,2,1,2,1,1,2,1,1,2,1,2,";
	sBase += "2,2,1,2,1,2,1,5,2,1,1,2,";
	sBase += "2,1,2,2,1,2,1,2,1,2,1,1,";
	sBase += "2,2,1,2,1,2,2,1,2,1,2,1,";
	sBase += "2,1,1,2,1,6,1,2,2,1,2,1,";
	sBase += "2,1,1,2,1,2,1,2,2,1,2,2,";
	//1981
	sBase += "1,2,1,1,2,1,1,2,2,1,2,2,";
	sBase += "2,1,2,3,2,1,1,2,2,1,2,2,";
	sBase += "2,1,2,1,1,2,1,1,2,1,2,2,";
	sBase += "2,1,2,2,1,1,2,1,1,5,2,2,";
	sBase += "1,2,2,1,2,1,2,1,1,2,1,2,";
	sBase += "1,2,2,1,2,2,1,2,1,2,1,1,";
	sBase += "2,1,2,2,1,5,2,2,1,2,1,2,";
	sBase += "1,1,2,1,2,1,2,2,1,2,2,1,";
	sBase += "2,1,1,2,1,2,1,2,2,1,2,2,";
	sBase += "1,2,1,1,5,1,2,1,2,2,2,2,";
	//1991
	sBase += "1,2,1,1,2,1,1,2,1,2,2,2,";
	sBase += "1,2,2,1,1,2,1,1,2,1,2,2,";
	sBase += "1,2,5,2,1,2,1,1,2,1,2,1,";
	sBase += "2,2,2,1,2,1,2,1,1,2,1,2,";
	sBase += "1,2,2,1,2,2,1,5,2,1,1,2,";
	sBase += "1,2,1,2,2,1,2,1,2,2,1,2,";
	sBase += "1,1,2,1,2,1,2,2,1,2,2,1,";
	sBase += "2,1,1,2,3,2,2,1,2,2,2,1,";
	sBase += "2,1,1,2,1,1,2,1,2,2,2,1,";
	sBase += "2,2,1,1,2,1,1,2,1,2,2,1,";
	//2001
	sBase += "2,2,2,3,2,1,1,2,1,2,1,2,";
	sBase += "2,2,1,2,1,2,1,1,2,1,2,1,";
	sBase += "2,2,1,2,2,1,2,1,1,2,1,2,";
	sBase += "1,5,2,2,1,2,1,2,2,1,1,2,";
	sBase += "1,2,1,2,1,2,2,1,2,2,1,2,";
	sBase += "1,1,2,1,2,1,5,2,2,1,2,2,";
	sBase += "1,1,2,1,1,2,1,2,2,2,1,2,";
	sBase += "2,1,1,2,1,1,2,1,2,2,1,2,";
	sBase += "2,2,1,1,5,1,2,1,2,1,2,2,";
	sBase += "2,1,2,1,2,1,1,2,1,2,1,2,";
	//2011
	sBase += "2,1,2,2,1,2,1,1,2,1,2,1,";
	sBase += "2,1,6,2,1,2,1,1,2,1,2,1,";
	sBase += "2,1,2,2,1,2,1,2,1,2,1,2,";
	sBase += "1,2,1,2,1,2,1,2,5,2,1,2,";
	sBase += "1,2,1,1,2,1,2,2,2,1,2,2,";
	sBase += "1,1,2,1,1,2,1,2,2,1,2,2,";
	sBase += "2,1,1,2,3,2,1,2,1,2,2,2,";
	sBase += "1,2,1,2,1,1,2,1,2,1,2,2,";
	sBase += "2,1,2,1,2,1,1,2,1,2,1,2,";
	sBase += "2,1,2,5,2,1,1,2,1,2,1,2,";
	//2021
	sBase += "1,2,2,1,2,1,2,1,2,1,2,1,";
	sBase += "2,1,2,1,2,2,1,2,1,2,1,2,";
	sBase += "1,5,2,1,2,1,2,2,1,2,1,2,";
	sBase += "1,2,1,1,2,1,2,2,1,2,2,1,";
	sBase += "2,1,2,1,1,5,2,1,2,2,2,1,";
	sBase += "2,1,2,1,1,2,1,2,1,2,2,2,";
	sBase += "1,2,1,2,1,1,2,1,1,2,2,2,";
	sBase += "1,2,2,1,5,1,2,1,1,2,2,1,";
	sBase += "2,2,1,2,2,1,1,2,1,1,2,2,";
	sBase += "1,2,1,2,2,1,2,1,2,1,2,1,";
	//2031
	sBase += "2,1,5,2,1,2,2,1,2,1,2,1,";
	sBase += "2,1,1,2,1,2,2,1,2,2,1,2,";
	sBase += "1,2,1,1,2,1,5,2,2,2,1,2,";
	sBase += "1,2,1,1,2,1,2,1,2,2,2,1,";
	sBase += "2,1,2,1,1,2,1,1,2,2,1,2,";
	sBase += "2,2,1,2,1,4,1,1,2,1,2,2,";
	sBase += "2,2,1,2,1,1,2,1,1,2,1,2,";
	sBase += "2,2,1,2,1,2,1,2,1,1,2,1,";
	sBase += "2,2,1,2,5,2,1,2,1,2,1,1,";
	sBase += "2,1,2,2,1,2,2,1,2,1,2,1,";
	//2041
	sBase += "2,1,1,2,1,2,2,1,2,2,1,2,";
	sBase += "1,5,1,2,1,2,1,2,2,2,1,2,";
	sBase += "1,2,1,1,2,1,1,2,2,1,2,2";
	
	var arrBase = [];
	arrBase = sBase.split(",");
	
	return arrBase;
};

/*******************************************************************************
 * Function Name: gfn_solarToLunar
 * Description  : 양력을 음력으로 변환해주는 함수
 * Arguments    : {String | Date} value - yyyyMMdd형태의 양력일자 ( 예 : "20121122" )
 * Return       : {String} Flag(평달 = "0", 윤달 = "1") + 'yyyyMMdd'형태의 음력일자
 * Example      :  var dt = this.gfn_strToDate("20130331");
 *                 var str = this.solarToLunar(dt);
 *                 trace(str); // output : 020130220
 *                 var str1 = "20130331";
 *                 var str = this.solarToLunar(str1);
 *                 trace(str); // output : 020130220
 *******************************************************************************/  
pForm.gfn_solarToLunar =  function(value) 
{
	var sMd         = "31,0,31,30,31,30,31,31,30,31,30,31";
	var arrMd       = [];
	var arrBaseInfo = [];
	var arrDt       = [];	// 매년의 음력일수를 저장할 배열 변수
	var nTd;		    			// 음력일을 계산하기 위해 양력일과의 차이를 저장할 변수
	var nTd1;			    		// 1840년까지의 날수
	var nTd2;				    	// 현재까지의 날수
	var nTemp;					    // 임시변수
	var nLy, nLm, nLd;			    // 계산된 음력 년, 월, 일을 저장할 변수
	var sLyoon;					    // 현재월이 윤달임을 표시

	var nY, nM, nD;

	nY = parseInt(value.substr(0,4), 10);
	nM = parseInt(value.substr(4,2), 10);
	nD = parseInt(value.substr(6,2), 10);
	
	
	if (nY < 1841 || nY > 2043)	
	{
		return null;
	}

	arrBaseInfo = this.gfn_solarBase();
	arrMd       = sMd.split(",");
	arrMd[1]    = 28;
		
	//윤년여부 확인
	if ((nY % 4) == 0) 
	{
		if ((nY % 100) != 0 || (nY % 400) == 0)
		{ 
			arrMd[1] = 29;
		}
	} 

	// 672069 = 1840 * 365 + 1840/4 - 1840/100 + 1840/400 + 23  //1840년까지 날수
	nTd1 = 672069; 	 
		
	// 1841년부터 작년까지의 날수
	nTd2 = (nY - 1) * 365 + parseInt((nY - 1)/4) - parseInt((nY - 1)/100) + parseInt((nY - 1)/400);
		
	// 전월까지의 날수를 더함
	for (var i = 0; i <= nM - 2; i++)
	{
		nTd2 = nTd2 + parseInt(arrMd[i]);
	}

	// 현재일까지의 날수를 더함
	nTd2 = nTd2 + nD;

	// 양력현재일과 음력 1840년까지의 날수의 차이
	nTd = nTd2 - nTd1 + 1;
	
	// 1841년부터 음력날수를 계산
	for (var i = 0; i <= nY - 1841; i++)
	{
		arrDt[i] = 0;
		for (var j = 0; j <= 11; j++)
		{
			switch (parseInt(arrBaseInfo[i * 12 + j]))
			{
				case 1 : nTemp = 29;
						 break;
				case 2 : nTemp = 30;
						 break;				
				case 3 : nTemp = 58;	// 29 + 29
						 break;				
				case 4 : nTemp = 59;	// 29 + 30
						 break;				
				case 5 : nTemp = 59;	// 30 + 29
						 break;				
				case 6 : nTemp = 60;	// 30 + 30
						 break;				
			}
			
			arrDt[i] = arrDt[i] + nTemp;
		}
	}
		
	// 1840년 이후의 년도를 계산 - 현재까지의 일수에서 위에서 계산된 1841년부터의 매년 음력일수를 빼가면수 년도를 계산
	nLy = 0;
	do
	{
		nTd = nTd - arrDt[nLy];
		nLy = nLy + 1;
	}
	while(nTd > arrDt[nLy]);
	
	nLm    = 0;
	sLyoon = "0";	// 현재월이 윤달임을 표시할 변수 - 기본값 평달
	do
	{

		if (parseInt(arrBaseInfo[nLy * 12 + nLm]) <= 2)
		{
			nTemp = parseInt(arrBaseInfo[nLy * 12 + nLm]) + 28;
			if (nTd > nTemp)
			{
				nTd = nTd - nTemp;
				nLm = nLm + 1;
			}
			else
			{
				break;
			}
		}
		else
		{
			switch (parseInt(arrBaseInfo[nLy * 12 + nLm]))
			{
				case 3 :
					m1 = 29;
					m2 = 29;
					break;
				case 4 : 
					m1 = 29;
					m2 = 30;
					break;					
				case 5 : 
					m1 = 30;
					m2 = 29;
					break;					
				case 6 : 
					m1 = 30;
					m2 = 30;
					break;					
			}

			if (nTd > m1)
			{
				nTd = nTd - m1;
				if (nTd > m2)
				{
					nTd = nTd - m2;
					nLm = nLm + 1;
				}
				else
				{
					sLyoon = "1";
				}
			}
			else
			{
				break;
			}
		}
	}
	while(1);
	
	nLy = nLy + 1841;
	nLm = nLm + 1;
	nLd = nTd;

	var sRtn = sLyoon + nLy; 
	sRtn = sRtn + nLm.toString().padLeft(2, "0"); 
	sRtn = sRtn + nLd.toString().padLeft(2, "0");    
	return sRtn;
};		

/*******************************************************************************
 * Function Name  : gfn_lunarToSolar
 * Description    : 음력을 양력으로 변환.
 * Arguments      : {String | Date} value - yyyyMMdd형태의 음력일자 ( 예 : "20121122" ).
                    leapMonth - 윤달 여부.
 * Return(String) : 'yyyyMMdd'형태의 양력일자
 *******************************************************************************/     
pForm.gfn_lunarToSolar = function(value, leapMonth)
{

	var sMd         = "31,0,31,30,31,30,31,31,30,31,30,31";
	var arrMd       = [];	
	var arrBaseInfo = [];
	var nTd         = 0;
	var nSy, nSm, nSd;			    // 계산된 양력 년, 월, 일을 저장할 변수
	var nY1, nM1, nY2, nY3, nTemp;	// 임시변수	
	var nLeap;    
		
	var nLy, nLm, nLd;

	nLy = parseInt(value.substr(0,4), 10);
	nLm = parseInt(value.substr(4,2), 10);
	nLd = parseInt(value.substr(6,2), 10);
	

	if (nLy < 1841 || nLy > 2043)	
	{
		return null;
	}	

	arrBaseInfo = this.gfn_solarBase();
	arrMd       = sMd.split(",");
	arrMd[1]    = 28;
	
	//윤년여부 확인
	if ((nLy % 4) == 0) 
	{
		if ((nLy % 100) != 0 || (nLy % 400) == 0)
		{ 
			arrMd[1] = 29;
		}
	} 
		
	nY1   = nLy - 1841; //176
	nM1   = nLm - 1; //02
	nLeap = 0;
	
	if (parseInt(arrBaseInfo[nY1 * 12 + nM1]) > 2)
	{
		//윤년여부 확인
		if ((nLy % 4) == 0) 
		{
			if ((nLy % 100) != 0 || (nLy % 400) == 0)
			{ 
				nLeap = 1;
			}
		} 
	}
	if (nLeap == 1)
	{
		switch (parseInt(arrBaseInfo[nY1 * 12 + nM1]))
		{
			case 3 : nTemp = 29;
					 break;
			case 4 : nTemp = 30;
					 break;			
			case 5 : nTemp = 29;
					 break;			
			case 6 : nTemp = 30;
					 break;
		}
	}
	else
	{
		switch (parseInt(arrBaseInfo[nY1 * 12 + nM1]))
		{
			case 1 : nTemp = 29;
					 break;			
			case 2 : nTemp = 30;
					 break;			
			case 3 : nTemp = 29;
					 break;			
			case 4 : nTemp = 29;
					 break;			
			case 5 : nTemp = 30;
					 break;			
			case 6 : nTemp = 30;
					 break;			
		}
	}
	
	var tempY1 = nY1 - 1;
	for (var i = 0; i <= tempY1; i++)
	{
		for (var j = 0; j <= 11; j++)
		{
			switch (parseInt(arrBaseInfo[i * 12 + j]))
			{
				case 1 : nTd = nTd + 29;
						 break;
				case 2 : nTd = nTd + 30;
						 break;				
				case 3 : nTd = nTd + 58;
						 break;				
				case 4 : nTd = nTd + 59;
						 break;				
				case 5 : nTd = nTd + 59;
						 break;				
				case 6 : nTd = nTd + 60;
						 break;				
			}
		}
	}

	var tempM1 = nM1 - 1;
	for (var j = 0; j <= tempM1; j++)
	{
		switch (parseInt(arrBaseInfo[nY1 * 12 + j]))
		{
			case 1 : nTd = nTd + 29;
					 break;			
			case 2 : nTd = nTd + 30;
					 break;						
			case 3 : nTd = nTd + 58;
					 break;						
			case 4 : nTd = nTd + 59;
					 break;						
			case 5 : nTd = nTd + 59;
					 break;						
			case 6 : nTd = nTd + 60;
					 break;						
		}
	}

	if (nLeap == 1)
	{
		switch (parseInt(arrBaseInfo[nY1 * 12 + nM1]))
		{
			case 3 : nTemp = 29;
					 break;						
			case 4 : nTemp = 29;
					 break;						
			case 5 : nTemp = 30;
					 break;						
			case 6 : nTemp = 30;
					 break;						
		}
	}
	
	nTd = nTd + nLd + 22;
	
	if (leapMonth)
	{
		switch (parseInt(arrBaseInfo[nY1 * 12 + nM1]))
		{
			case 3 : nTd = nTd + 29;
					 break;						
			case 4 : nTd = nTd + 30;
					 break;						
			case 5 : nTd = nTd + 29;
					 break;						
			case 6 : nTd = nTd + 30;
					 break;						
		}
	}
	
	nY1 = 1840;
	do
	{
		nY1 = nY1 + 1;
		
		nLeap = 0;
		
		//윤년여부 확인
		if ((nY1 % 4) == 0) 
		{
			if ((nY1 % 100) != 0 || (nY1 % 400) == 0)
			{ 
				nLeap = 1;
			}
		} 

		if (nLeap == 1)
		{
			nY2 = 366;
		}
		else
		{
			nY2 = 365;
		}

		if( nTd <= nY2 )
		{
			break;
		}
			
		nTd = nTd - nY2;
	}
	while(1);

	nSy      = nY1;
	arrMd[1] = nY2 - 337;
	nM1      = 0;
	
	do
	{
		nM1 = nM1 + 1;
		if (nTd <= parseInt(arrMd[nM1-1]))
		{
			break;
		}
		nTd = nTd - parseInt(arrMd[nM1-1]);
	}
	while(1);
	
	nSm = nM1;
	nSd = nTd;
	nY3 = nSy;
	nTd = nY3 * 365 + parseInt(nY3/4) - parseInt(nY3/100) + parseInt(nY3/400);
	
	var tempSm = nSm - 1;
	for (var i = 0; i <= tempSm; i++)
	{
		nTd = nTd + parseInt(arrMd[i]);
	}

	nTd = nTd + nSd;

	var sRtn = nY3;
	sRtn = sRtn + nSm.toString().padLeft(2, "0"); 
	sRtn = sRtn + nSd.toString().padLeft(2, "0");    

	return sRtn;	
};

/*******************************************************************************
 * Function Name  : gfn_getWeek
 * Description    : 년월일(yyyyMMdd)을 입력하면 해당 주차를 리턴한다.
 * Arguments      : {String} strDate - 8자리 년월일(yyyyMMdd)
 * Return(String) : {String} 6자리 년도주차(yyyyWW)
 *******************************************************************************/   
pForm.gfn_getWeek = function(strDate) 
{
	if (strDate.length != 8 || !this.gfn_isDigit(strDate)) {
		return "";
	}
	
	var year  = parseInt(strDate.substr(0,4));
	var month = parseInt(strDate.substr(4,2));
	var day   = parseInt(strDate.substr(6,8));

	var startAt = 1; ///////////// 일요일 표시 부분 / 0 : 일요일(일월화...) / 1 : 월요일(...금토일)

	if(startAt == 0) {
		day = day + 1;
	}

	var a    = Math.floor((14-month) / 12);
	var y    = year + 4800 - a;
	var m    = month + (12 * a) - 3;
	var b    = Math.floor(y/4) - Math.floor(y/100) + Math.floor(y/400);
	var J    = day + Math.floor(((153 * m) + 2) / 5) + (365 * y) + b - 32045;
	var d4   = (((J + 31741 - (J % 7)) % 146097) % 36524) % 1461;
	var L    = Math.floor(d4 / 1460);
	var d1   = ((d4 - L) % 365) + L;
	var week = Math.floor(d1/7) + 1;
		week = week.toString();
	return year+week.padLeft(2,"0");			
};

/*******************************************************************************
 * Function Name  : gfn_makeDate
 * Description    : Datetime형식으로 변환  Date Type을 String으로 변환
 * Arguments      : nYear (년도)
                    nMonth(월)
					nDate(일)
 * Return(String) : String, 조합한 날짜를 리턴
 *******************************************************************************/    
pForm.gfn_makeDate = function (nYear, nMonth, nDate)
{
	if (this.gfn_isNull(nYear) || this.gfn_isNull(nMonth) || this.gfn_isNull(nDate)){
		return "";
	}

	var objDate = new Date(nYear, nMonth - 1, nDate);
	var sYear = objDate.getFullYear().toString();
	var sMonth = this.gfn_getRight("0" + (objDate.getMonth() + 1), 2);
	var sDate = this.gfn_getRight("0" + objDate.getDate(), 2);
	
	return sYear + sMonth + sDate;
}

/*******************************************************************************
 * Function Name   : gfn_isString
 * Description     : 데이타형이 스트링 유무체크
 * Arguments       : String(문자열:value)
 * Return(Boolean) : true/false
 *******************************************************************************/  
pForm.gfn_isString = function(value) 
{
	return typeof value === 'string';
};

/*******************************************************************************
 * Function Name   : gfn_isArray
 * Description     : 배열 여부 체크
 * Arguments       : {object} arr array
 * Return(Boolean) : true/false
 *******************************************************************************/ 
pForm.gfn_isArray = function(arr){
	if ( arr == null ) 
	{
		return false;
	}
	
	if (new String(arr).valueOf() == "undefined")
	{
		return false;
	}
	
	return Array.isArray(arr) ? true : false;
};

/*******************************************************************************
 * Function Name   : gfn_isObject
 * Description     : object 유무 체크
 * Arguments       : {object} Dataset
 * Return(Boolean) : true/false
 *******************************************************************************/ 
pForm.gfn_isObject = function(value)
{
	if ( value === null || value === undefined ) 
	{
		return false;
	}
	
	// nexacro Component
	if ( this.gfn_isXComponent(value) ) 
	{
		return false;
	}
	
	// nexacro Object (e.g. Dataset)
	if( value instanceof nexacro.Object ) 
	{
		return false;
	}
	return typeof value == "object" && 
		   'constructor' in value &&
		   value.constructor === Object;
};

/*******************************************************************************
 * Function Name   : gfn_isXComponent
 * Description     : Component 유무체크
 * Arguments       : nexacro Component
 * Return(Boolean) : true/false
 *******************************************************************************/  
pForm.gfn_isXComponent = function(value) 
{
	if ( value === null || value === undefined  ) 
	{
		return false;
	}
	return value instanceof nexacro.Component;
};

/*******************************************************************************
 * Function Name   : gfn_nvlEmptyStr
 * Description     : 입력값을 체크하여 Null인경우 null string으로 반환
 * Arguments       : {String} inVal 
 * Return(Boolean) : {String} 입력값이 Null인경우 null string으로 반환
 *******************************************************************************/   
pForm.gfn_nvlEmptyStr = function(inVal)
{
	if(inVal == null || inVal === undefined) 
	{
		inVal = "";
	}
	return inVal;
};

/*******************************************************************************
 * Function Name   : gfn_removeSpecialChar
 * Description     : 특수문자를 제거한다
 * Arguments       : {String} strValue
 * Return(Boolean) :{ String} 특수문자를 제거한 문자열
 *******************************************************************************/    
pForm.gfn_removeSpecialChar = function(strValue)
{
   var strSpecial = "~!@#$%^&*-+/=_`{|}()\\?<>',";
   
	for (i = 0; i < strValue.length; i++) 
	{
		for (j = 0; j < strSpecial.length; j++) 
		{
			if (strValue.charAt(i) == strSpecial.charAt(j)) 
			{
				strValue = strValue.replace(strValue.charAt(i), "");
			}
		}
	}
    return strValue;
};

/*******************************************************************************
 * Function Name   : gfn_removeHtmlTag
 * Description     : HTML TAG 제거 함수
 * Arguments       : sHtml - 제거대상 문자열
                     sTag - 제거할 tag(없으면 전체 tag제거)
 * Return(String)  : {String} 문자열
 * Example         :  var str = this.gfn_removeHtmlTag("정상적으로<BR>처리되었습니다.");
 *******************************************************************************/  
pForm.gfn_removeHtmlTag = function(sHtml, sTag)
{
	if(this.gfn_isEmpty(sTag))
	{
	    sHtml = nexacro.replaceAll(sHtml, "<br>","\n");	
		sHtml = nexacro.replaceAll(sHtml, "<BR>","\n");	
	    var regExp = new RegExp("<(/)?([0-9a-zA-Z]*)(\\s[0-9a-zA-Z]*=[^>]*)?(\\s)*(/)?>","g"); 
	    sHtml = sHtml.replace(regExp, "");
	} else if(sTag.toUpperCase() == "<BR>")
	{
	    sHtml = nexacro.replaceAll(sHtml, "<br>","\n");	
		sHtml = nexacro.replaceAll(sHtml, "<BR>","\n");	
	} else
	{
	    sHtml = nexacro.replaceAll(sHtml, sTag.toUpperCase(),"");	
		sHtml = nexacro.replaceAll(sHtml, sTag.toLowerCase(),"");	
	}
	return sHtml;
};

/*******************************************************************************
 * Function Name   : gfn_isExistInArray
 * Description     : 배열에 해당 값이 존재하는지 확인한다. 
 * Arguments       : {Array} arrVal
                     {String} varVal - 값
 * Return(Boolean) : true/false
 *******************************************************************************/   
pForm.gfn_isExistInArray = function(arrVal, varVal) 
{
	var retVal = false;
	var nCnt = arrVal.length;
	for(var i=0; i<nCnt; i++) 
	{
		if (arrVal[i] == varVal) 
		{
			retVal = true;
			break;
		}
	}
	return retVal;
};

 /**********************************************************************************
 * Function Name: gfn_checkJumin(p_juminno)
 * Description  : 주민번호 유효성 여부
 * Arguments    : p_juminno (String) //주민번호
 * return       : 맞는 주민번호:TRUE, 틀린 주민번호:FALSE
 **********************************************************************************/
pForm.gfn_checkJumin = function(p_juminno) {
    try {
        // 파라미터로 전달받은 p_juminno가 공백이거나, 13자리를 넘어가거나, 숫자가 아닐경우 false 리턴
        if(p_juminno == '' || p_juminno.length != 13 || typeof(Number(p_juminno)) != 'number') {
            return false;
        }
        
        var isKorean = true;
        // 주민번호 뒷자리 첫번째 수가 4보다 크거나, 9보다 작으면 외국인
        if(Number(p_juminno.charAt(6)) > 4 && Number(p_juminno.charAt(6)) < 9) {
            isKorean = false;
        }
        
        // 아래부터는 검증 로직임.
        var check = 0;
        for(var i=0; i<12; i++) {
            if(isKorean) {
                check = check + ((i % 8 + 2) * Number(p_juminno.charAt(i)));
            } else {
                check = check + ((9 - i % 8) * Number(p_juminno.charAt(i)));
            }
        }
        if(isKorean) {
            check = 11 - (check % 11);
            check = check % 10;
        } else {
            var remainder = check % 11;
            if(remainder == 0) {
                check = 1;
            } else if(remainder==10) {
                check = 0;
            } else {
                check = remainder;
            }
            var check2 = check + 2;
            if(check2 > 9) {
                check = check2 - 10;
            } else {
                check = check2;
            }
        }
     if(check == Number(p_juminno.charAt(12))) {
            return true;
        } else {
            return false;
        }
    } catch(e) {
        alert(e.description);
        return false;
    }
    return true;
};

/******************************************************************************
 * Function Name: gfn_getCamel
 * Description  : 대문자 "_"로 구분된 문자를 카멜타입으로 반환
 * argument     : 문자열  : ex ) ITEM_CD
 * return       : 카멜타입으로 변경된 문자열
 ******************************************************************************/
pForm.gfn_getCamel = function(sVal)
{
    var sRtnVal;
    if(this.gfn_isNull(sVal)) return sVal;    
    if(typeof(sVal) != "string") return sVal;
    sVal =  sVal.toLowerCase();
    sVal = sVal.replace("_","-");
    sRtnVal = Base.string.camelize(sVal);
    return sRtnVal;  
};

/********************************************************************************
 * Function Name: gfn_checkURL
 * Description  : 입력값이 URL Type인지 체크하는 함수
 * Arguments	: strValue(String)
 * Return 		: true = 입력값이 URL형태일 경우
 ********************************************************************************/
pForm.gfn_checkURL = function(strValue)
{
	if (this.gfn_isNull(strValue)) 
	{
		return false;
	
	}else if (strValue.indexOf(".") == -1) 
	{
		return false;
	}else 
	{
		return true;
	}
};

/********************************************************************************
 * Function Name: gfn_checkEmail
 * Description  : 입력값이 e-mail Type인지 체크하는 함수
 * Arguments	: strValue(String)
 * Return 		: true = 입력값이 email형태일 경우
 ********************************************************************************/
pForm.gfn_checkEmail = function(strValue)
{
	if (this.gfn_isNull(strValue)) 
	{
		return false;
	}

	var nIndexOfAt = strValue.indexOf("@");
	var nIndexOfDot = strValue.indexOf(".");
	var nLength = strValue.length;

	// "@" 이 하나도 없거나 맨 끝에 위치한  경우
	if (nIndexOfAt <= 0 || nIndexOfAt == nLength) 
	{
		return false;
	}

	// "." 이 하나도 없거나 맨 끝에 위치한 경우
	if (nIndexOfDot <= 0 || nIndexOfDot == nLength) 
	{
		return false;
	}

	// "@"이 두개 이상 존재하는 경우
	if (strValue.indexOf("@", nIndexOfAt + 1) != -1) 
	{
		return false;
	}

	// ".@" 인 경우 또는 "@."인 경우
	if (strValue.substr(nIndexOfAt - 1, 1) == "." || strValue.substr(nIndexOfAt + 1, 1) == ".") 
	{
		return false;
	}

	// "@" 이후에 "."이 존재하지 않는 경우
	if (strValue.indexOf(".", (nIndexOfAt + 2)) == -1) 
	{
		return false;
	}
	// 공백문자가 존재하는 경우
	if (strValue.indexOf(" ") != -1) 
	{
		return false;
	}
	return true;
};

/********************************************************************************
 * Function Name: gfn_checkPhone
 * Description	: 입력값이 전화번호 format 인지 체크하는 함수
 * Arguments	: strValue(String)
 * Return 		: true = 입력값이 전화번호 형태일 경우
 ********************************************************************************/
pForm.gfn_checkPhone = function(strValue)
{
	// null 이거나 "-"이 존재하지 않는 경우
	if (this.gfn_isNull(strValue) || (!this.gfn_isNull(strValue) && strValue.indexOf("-") == -1)) 
	{
		return false;
	}
	else if (strValue.indexOf(".") >= 0) 
	{
		return false;
	}
	else 
	{
		// "-" 사이의 값이 숫자가 아닌 경우
		var arrNumbers = strValue.split("-");
		for (var i = 0; i < arrNumbers.length; i++) 
		{
			if (!TOBE.isNumeric(arrNumbers[i])) 
			{
				return false;
			}
		}
	}
	return true;
};

/********************************************************************************
 * Function Name: gfn_getFileExt
 * Description  : 파일 확장자를 가져온다.
 * Arguments	: 파일명
 * Return 		: String, 파일 확장자
 ********************************************************************************/
pForm.gfn_getFileExt = function(strFileName)
{
	strFileName = "" + strFileName;
	var arrFileName = strFileName.split(".");
	var strFileExt = arrFileName[arrFileName.length - 1];

	return strFileExt.trim();
};

/********************************************************************************
 * Function Name: gfn_htmlToChars
 * Description  : html형식의 문자열에서 태그문자를 특수문자로 변형
 * Arguments	: html형식 문자열
 * Return 		: String, 변형문자열
 ********************************************************************************/
pForm.gfn_htmlToChars = function(str)
{
	str = "" + str;
	if (this.gfn_isNull(str)) 
	{
		return "";
	}
	str = this.gfn_replace(str, "\&", '&amp;');
	str = this.gfn_replace(str, "\'", '&apos;');
	str = this.gfn_replace(str, "\"", '&quot;');
	str = this.gfn_replace(str, "\'", '&#39;');
	str = this.gfn_replace(str, "<", '&lt;');
	str = this.gfn_replace(str, ">", '&gt;');
	return str;
};

/********************************************************************************
 * Function Name: gfn_specToChars
 * Description  : 특수문자가 들어있는 문자열에서 html형식의 문자로 변형
 * Arguments	: 특수문자 형식 문자열
 * Return 		: String, 파일 확장자
 ********************************************************************************/
pForm.gfn_specToChars = function(str)
{
	str = "" + str;
	if (this.gfn_isNull(str)) 
	{
		return "";
	}
	str = this.gfn_replace(str, "\&amp;", '&');
	str = this.gfn_replace(str, "\&quot;", '"');
	str = this.gfn_replace(str, "\&#39;", '\'');
	str = this.gfn_replace(str, "\&lt;", '<');
	str = this.gfn_replace(str, "\&gt;", '>');
	return str;
};

 /**********************************************************************************
 * 함수명       : gfn_dupCheck
 * 설명         : 데이터셋에서 지정한 컬럼값의 중복 체크
 * Arguments    : objDataSet    데이타셋
 *                sFindStr	 	체크할 문자열 ==>sFindStr = "CMP_CD == '" + cmpCd  + 
                                                         "' && GIF_TYPE == '" + gifType + 
                                                         "' && GIF_KIND == '" + gifKind + 
                                                         "' && GIF_VRTY == '" + gifVrty + "'"  
 * return Type  :
 **********************************************************************************/
pForm.gfn_dupCheck = function ( ObjDs , sFindStr )
 {
    var rowCnt = ObjDs.getCaseCount(sFindStr);
    
    return rowCnt;
 };
 
 /**
 * @class 입력 문자열중 숫자값만 남긴다. <br>
 * @param {String} strValue - 입력문자열
 * @return {String} 숫자문자열
 */
pForm.gfn_getDigit = function(strValue)
{
	var regExp = new RegExp("\\D","g");
	var strRet = strValue.replace(regExp,"");

	return strRet;
};


/**
 * @class 법정공휴일 구하기 <br>
 * @param {Number} nYear - yyyy
 * @return {Array} 휴일정보
 * @example : 
 */
pForm.gfn_getHolidays = function(nYear)
{
	var nYear;
	var aHoliday = new Array();

	/////// 음력 체크
	// 구정
	aHoliday[0] 	= this.gfn_lunarToSolar((nYear-1) + "1230", false) + "설날";
	aHoliday[1] 	= this.gfn_addDate(aHoliday[0].substring(0, 8), 1) + "설날";
	aHoliday[2] 	= this.gfn_addDate(aHoliday[1].substring(0, 8), 1) + "설날";
	// 석가탄신일
	aHoliday[3] 	= this.gfn_lunarToSolar(nYear + "0408", false) + "석가탄신일";
	// 추석
	aHoliday[4] 	= this.gfn_lunarToSolar(nYear + "0814", false) + "추석";
	aHoliday[5] 	= this.gfn_addDate(aHoliday[4].substring(0, 8), 1) + "추석";
	aHoliday[6] 	= this.gfn_addDate(aHoliday[5].substring(0, 8), 1) + "추석";	

	/////// 양력 체크
	aHoliday[7] 	= nYear+"0101" + "신정";
	aHoliday[8] 	= nYear+"0301" + "삼일절";
	aHoliday[9] 	= nYear+"0505" + "어린이날";	
	aHoliday[10] 	= nYear+"0606" + "현충일";		
	aHoliday[11] 	= nYear+"0815" + "광복절";	
	aHoliday[12] 	= nYear +"1003" + "개천절";
	aHoliday[13] 	= nYear +"1009" + "한글날";
	aHoliday[14] 	= nYear+"1225" + "성탄절";			
	
	return aHoliday.sort();
};


/**
 * @class 문자열의 우측부터 지정한 길이만큼 가져오는 함수 <br>
 * @param {String} sOrg - 원본 문자열
 * @param {Number} nSize - 출력될 문자열의 길이
 * @return {String} 결과값
 */
pForm.gfn_getRight = function(sOrg, nSize)
{
	if ( this.gfn_isNull(sOrg) || this.gfn_isNull(nSize) )	
	{
		return "";
	}
	if ( sOrg.length < nSize )
	{
		return sOrg;
	}else
	{
		return sOrg.substr(sOrg.length-nSize, nSize);
	}
};

/*
 * Function Name : fn_round
 * Description   : Numeric value to Round Processing
 * Parameter     : Numerice Value, The number of decimal places
 * Return        : Numerice Value after Round
 * Example       : fn_round(234.569, 2);
 */
pForm.gfn_setRound = function(sValue, sDigit)
{
    var nValue = Number(sValue);
    var nDigit = Number(sDigit);    
    var nRound = 1;
    
    for (var i = 0; i < nDigit; i++) 
    {
        nRound = nRound * 10;
    }

    var nRtn = nValue * nRound;
    nRtn = Math.round(nRtn);
    nRtn = nRtn / nRound;
    return nRtn;
};


/*
 * Function Name : gfn_getStrinMid
 * Discription   : This function returns String from the given position and the position as much as you want
 * Parameter     : The source string, Index of the first character, Receiving text size
 * Return        : String
 * Example       : gfn_getStrinMid("XPLATFORM", 2, 4);
 */
pForm.gfn_getStrinMid = function(sString, nIndex, nSize)
{
    var nStart;
    var nEnd;

    // Starting position validation
    if (nIndex == null)
    {
        nStart = 0;
    }else
    {
        if (nIndex.toString().length <= 0)
        {
            nStart = 0;
        }
        else
        {
            nStart = nIndex - 1;
        }
    }
    
    // Verifying the String
    if (nSize == null)
    {
        nEnd = sString.toString().length;
    }else 
    {
        if (nSize.toString().length <= 0)
        {
            nEnd = sString.toString().length
        }
        else
        {
            nEnd = nSize
        }
    }    
    
    var sRtn = sString.substr(nStart, nEnd);
    return sRtn;
};

/////////////////////////// 권한 탭설정 START///////////////////////////////
pForm.gfn_setAuthTabpage = function(obj)
{	
	var sType = "";
	
	if(obj.valueOf() == "[object Tab]")
	{
		sType = "T";
	
	}else if(obj.valueOf() == "[object Div]")
	{
		sType = "B";
	}
	
	var oDs = new Dataset;
	this.addChild("ds_tabAuth", oDs);
		
//	var sMenuId = this.gfn_getMenuId();
//	nexacro.getApplication().gds_menuTabAuth.filter("MENU_ID=='"+sMenuId+"'");
	nexacro.getApplication().gds_menuTabAuth.filter("MENU_ID=='MSSO000001'");
	oDs.copyData(nexacro.getApplication().gds_menuTabAuth, true);
	nexacro.getApplication().gds_menuTabAuth.filter("");	
	
	//탭권한제어
	if(sType == "B")
	{   
		//Button
		this._gfn_makeTabMenu_btn(oDs, obj);
	
	}else if(sType == "T")
	{   
		//Tab
		this._gfn_makeTabMenu_tab(oDs, obj);
	}
}
 
pForm._gfn_makeTabMenu_btn = function (oDs, oDiv)
{
	//div scroll 제거 
	oDiv.form.set_scrollbartype("none");
	
	var nLeft     = 0;	
	var oFirstBtn = "";
		
	for(var i=0; i<oDs.rowcount; i++)
	{
		var sTabId     = oDs.getColumn(i,"TAB_ID");
		var sMainYN    = oDs.getColumn(i,"MAIN_TAB_YN");
		var objTabpage = oDiv.form.components[sTabId];
	
		objTabpage.set_left(nLeft);
		objTabpage.set_visible(true);
		if(sMainYN == 1)
		{
			objTabpage.set_width(objTabpage.getOffsetWidth() + 22);
			objTabpage.set_cssclass("");
			objTabpage.set_cssclass("btn_WF_defaultKeyTab");
		}	
		
		nLeft += objTabpage.getOffsetWidth();
		
		if(i == 0) 
		{
			oFirstBtn = objTabpage;
		}
	}
	if(nLeft > oDiv.getOffsetWidth())
	{
		this.btn_next.set_enable(true);
	
	}else
	{
		this.btn_next.set_enable(false);
	}
	this.resetScroll();
	
	//첫Tab 탭
	oFirstBtn.click();
}

pForm._gfn_makeTabMenu_tab = function(oDs, obj)
{
	var nCnt = obj.getTabpageCount();

	//Tabpage권한적용. 삭제는 뒤부터
	for (var i = nCnt-1; i >=0; i--)
	{
		var sTabId = obj.tabpages[i].name;
		var nRow   = oDs.findRow("TAB_ID", sTabId);
		
		if(nRow == -1)
		{  //권한없는 Tabpage삭제
			obj.removeTabpage(i);
		}
		
	}
	var sTabpageId = obj.tabpages[0].name;
	this.Tab03.set_tabindex(0);
	this.lookupFunc("fn_afterTabInit").call(sTabpageId);
	
	
}

pForm.gfn_prevTabOnClick = function(oDiv, oPrevBtn, oNextBtn)
{	
	this._gfn_moveFirst(this._gfn_getFirstTabIndex(oDiv) - 1 , oDiv);
	this._gfn_setMoveBtn(oDiv, oPrevBtn, oNextBtn);
}

pForm.gfn_nextTabOnClick = function(oDiv, oPrevBtn, oNextBtn)
{
	this._gfn_moveFirst(this._gfn_getFirstTabIndex(oDiv) + 1, oDiv);
	this._gfn_setMoveBtn(oDiv, oPrevBtn, oNextBtn);
}

pForm._gfn_getFirstTabIndex = function (oDiv)
{	
	for( var i=0; i<this.ds_tabAuth.rowcount; i++){
		var tabId = this.ds_tabAuth.getColumn(i, "TAB_ID");
			//tabId = this.fv_tabbtnPrefix + tabId;
		
		var tabobj = this._gfn_findButton(tabId, oDiv);
		if( 0 <= tabobj.left) return i;
	}
	return -1;
};

pForm._gfn_findButton = function (strId, oDiv)
{
	return oDiv.form.components[strId];
};

pForm._gfn_setMoveBtn = function (oDiv, oPrevBtn, oNextBtn)
{
	var tabObj;
	var tabId;
	if( this.ds_tabAuth.rowcount == 0){
		oPrevBtn.set_enable(false);
		oNextBtn.set_enable(true);
		return;
	}
	tabId = this.ds_tabAuth.getColumn(this.ds_tabAuth.rowcount-1, "TAB_ID");
	//tabId = this.fv_tabbtnPrefix + tabId;
	tabObj = this._gfn_findButton(tabId, oDiv);
	
	if( oDiv.getOffsetWidth() < tabObj.getOffsetRight()){
		oNextBtn.set_enable(true);
	}else{
		oNextBtn.set_enable(false);
	}
	
	tabId = this.ds_tabAuth.getColumn(0, "TAB_ID");
	//tabId = this.fv_tabbtnPrefix + tabId;
	tabObj = this._gfn_findButton(tabId, oDiv);
	
	if( tabObj.getOffsetLeft() <= 0){
		oPrevBtn.set_enable(true);
	}else{
		oPrevBtn.set_enable(false);
	}
};

pForm._gfn_moveFirst = function (nMoveIdx, oDiv)
{
	var nIndex;
	var tabId;
	var tabObj;
	var tabFirstObj;
	nIndex = this._gfn_getFirstTabIndex(oDiv);
	if(nIndex < 0) return;
	if( nMoveIdx < 0 ) return;
	if( nMoveIdx >= this.ds_tabAuth.rowcount) return;
	
	tabId = this.ds_tabAuth.getColumn(nIndex, "TAB_ID");
	//tabId = this.fv_tabbtnPrefix + tabId;
	tabFirstObj = this._gfn_findButton(tabId, oDiv);
	
	tabId = this.ds_tabAuth.getColumn(nMoveIdx, "TAB_ID");
	//tabId = this.fv_tabbtnPrefix + tabId;
	tabObj = this._gfn_findButton(tabId, oDiv);
	
	var n_movePos = tabObj.getOffsetLeft() - tabFirstObj.getOffsetLeft();
		
	for( var i=0; i<this.ds_tabAuth.rowcount; i++){
		tabId = this.ds_tabAuth.getColumn(i, "TAB_ID");
		//tabId = this.fv_tabbtnPrefix + tabId;
		tabObj = this._gfn_findButton(tabId, oDiv);
		tabObj.move(tabObj.getOffsetLeft() - n_movePos, 0);
	}
};
/////////////////////////// 권한 탭설정 END///////////////////////////////