/**
 * =======================================================================================
 * 공통 사용 스크립트 모음
 * ---------------------------------------------------------------------------------------
 * object 접근형
 * ---------------------------------------------------------------------------------------
 * 	- isEmpty							공백 체크(NULL 포함)
 * 	- getBytes							데이터 byte 환산
 * 	- minLength							최소 입력 길이 제한
 * 	- maxLength							최대 입력 길이 제한
 * 	- unComma							숫자 콤마 삭제(1,234,567 -> 1234567)
 * 	- isNumber							숫자만 입력 가능
 * 	- alphanumeric						영문+숫자 입력 가능
 * 	- specialSymbol						특수문자 사용 금지
 * 	- xss								크로스 사이트 스크립팅 체크
 *  - cleanObject						UI 상의 오브젝트 데이터를 초기화 시킴
 *  - cvtDateDefault					날자 형식 변경(yyyyMMdd or yyyy?MM?dd -> yyyyMMdd)
 * 	- cvtDateHyphen						날자 형식 변경(yyyyMMdd -> yyyy-MM-dd)
 * 	- cvtDateDot						날자 형식 변경(yyyyMMdd -> yyyy.MM.dd)
 * 	- cvtDateSlash						날자 형식 변경(yyyyMMdd -> yyyy/MM/dd)
 * 	- cvtDateFormat						날자 형식 변경(yyyyMMdd -> yyyy?MM?dd)
 * ---------------------------------------------------------------------------------------
 * function 호출형
 * ---------------------------------------------------------------------------------------
 * 	- cf_isEmpty(val)					공백 체크(NULL 포함)
 *  - cf_cvtComma(val)					숫자 콤마 적용 (정적)
 * 	- cf_setComma(obj)					숫자 콤마 적용 (동적)
 *  - cf_cvtHyphen(val, option)			하이픈 옵션 적용 (option : jumin, mobile, tel)
 *  - cf_cvtNumSplit(val, option)		옵션에 맞는 Map형태로 데이터 분할 후 리턴 (option : jumin, mobile, tel)
 *  - cf_serializeHyphenObject();		하이픈을 적용하여 Object 생성
 * 	- cf_termDate(term, date)			기간 이후 날짜 정보
 * 	- cf_cvtDateFormat(date, format)	날자 형식 변경(yyyyMMdd -> yyyy?MM?dd)
 * 	- cf_xssFilter(val)					XSS Filter (< , > -> &lt; , &gt;)
 *  - cf_cbAll(obj)						체크박스 모두 선택/해제
 *  - cf_delTblRow(obj_id, resizing_cnt)테이블의 체크된 행 삭제
 *  - cf_bizGetEncode(send_data)		비지니스와 API 통신시 데이터 컨버팅 GET
 *  - cf_bizPostEncode(send_data)		비지니스와 API 통신시 데이터 컨버팅 POST
 *  - cf_masking
 *  - cf_appendZero
 * =======================================================================================
 */



/**
 * =======================================================================================
 * 공백 체크(NULL 포함)
 * =======================================================================================
 */
$.fn.isEmpty = function() {

	if($(this).is('select')) {
		// null check
		if( $(this).children('option:selected').val() == null ) {
			alert( $(this).attr('data-valid-title') + '은(는) 필수 입력(선택) 항목 입니다.' );
			$(this).focus();
			return false;
		}
		
		// space check
		if ( $.trim($(this).children('option:selected').val()) == '' ) {
			alert( $(this).attr('data-valid-title') + '은(는) 필수 입력(선택) 항목 입니다.' );
			$(this).focus();
			return false;
		}
	}
	else {
		// input type : radio
		if ($(this).attr('type') === 'radio') {
			if( $('input:radio[name='+$(this).attr('name')+']:checked').length < 1) {
				alert( $(this).attr('data-valid-title') + '은(는) 필수 입력(선택) 항목 입니다.' );
				$(this).focus();
				return false;
			}
		}
		else {
			// null check
			if( $(this).val() == null ) {
				alert( $(this).attr('data-valid-title') + '은(는) 필수 입력(선택) 항목 입니다.' );
				$(this).focus();
				return false;
			}
			
			// space check
			if ( $.trim($(this).val()) == '' ) {
				alert( $(this).attr('data-valid-title') + '은(는) 필수 입력(선택) 항목 입니다.' );
				$(this).focus();
				return false;
			}
		}
	}
	
	return true;
};


/**
 * =======================================================================================
 * 비밀번호 패턴 체크
 * =======================================================================================
 */
function cf_chkPwdPatten(val) {
	// 영문 + 특문 + 숫자 조합으로 8~12자리 패턴 체크
	var regexp = /^.*(?=^.{8,12}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/;
	return regexp.test(val);
}


/**
 * =======================================================================================
 * 데이터 byte 환산
 * =======================================================================================
 */
$.fn.getBytes = function() {
	
	var value = $.trim($(this).val());
	var _bytes = 0;
	var str;
	
	for(var i = 0; i < value.length; i++) {
		str = value.charAt(i);
		// 한글 3바이트 계산
		if( escape(str).length > 4 ) {
			_bytes += 3;
		}
		// 그 외 1바이트 계산
		else {
			_bytes++;
		}
	}
	
	return _bytes;
};

/**
 * =======================================================================================
 * 데이터 byte 환산 (Trim 함수 사용안함)
 * =======================================================================================
 */
$.fn.getBytesNoTrim = function() {
	
	var value = $(this).val();
	var _bytes = 0;
	var str;
	
	for(var i = 0; i < value.length; i++) {
		str = value.charAt(i);
		// 한글 3바이트 계산
		if( escape(str).length > 4 ) {
			_bytes += 3;
		}
		// 그 외 1바이트 계산
		else {
			_bytes++;
		}
	}
	
	return _bytes;
};


/**
 * =======================================================================================
 * 최소 입력 길이 제한
 * =======================================================================================
 */
$.fn.minLength = function() {	
	
	var min_len = $(this).attr('data-valid-min');
	
	// min-length check
	if( parseInt($(this).getBytes()) < parseInt(min_len) ) {
		alert( $(this).attr('data-valid-title') + '은(는) 최소' + min_len + 'byte 이상 입니다.' );
		$(this).focus();
		return false;
	}
	
	return true;
};


/**
 * =======================================================================================
 * 최대 입력 길이 제한
 * =======================================================================================
 */
$.fn.maxLength = function() {
	
	var max_len = $(this).attr('data-valid-max');
	
	// max-length check
	if( parseInt($(this).getBytes()) > parseInt(max_len) ) {
		alert( $(this).attr('data-valid-title') + '은(는) 최대' + max_len + 'byte 입니다.' );
		$(this).focus();
		return false;
	}
	
	return true;
};


/**
 * =======================================================================================
 * 숫자 콤마 삭제(1,234,567 -> 1234567)
 * =======================================================================================
 */
$.fn.unComma = function() {
	return ( ($(this).val()).replace(/\,/g,'') );
};


/**
 * =======================================================================================
 * 숫자만 입력 가능(세자리마다 콤마 찍을때 사용)
 * =======================================================================================
 */
$.fn.isNumber = function() {
	
	var regexp = /[^0-9]/gi;
	
    if ( regexp.test( $(this).unComma() ) == true ) {
    	alert( $(this).attr('data-valid-title') + '숫자만 입력 가능 합니다.' );
    	$(this).focus();
    	return false;
    }

	return true;
};

/**
 * =======================================================================================
 * 숫자만 입력 가능(오로지 숫자 표시할때 사용)
 * =======================================================================================
 */
$.fn.isOnlyNumber = function() {
	
	var regexp = /[^0-9]/gi;
	
    if ( regexp.test($(this).val()) == true ) {
    	alert( $(this).attr('data-valid-title') + '은(는) 숫자만 입력 가능 합니다.' );
    	$(this).focus();
    	return false;
    }

	return true;
};

/**
 * ==================================================================================
 * 숫자 최소값 크기 제한
 * ----------------------------------------------------------------------------------
 * 1. min-num check
 * ==================================================================================
 */
$.fn.minNum = function() {
	
	var value = $.trim($(this).val());
	var min_num = $(this).attr('data-valid-minnum');
	
	// max-length check
	if( parseInt(value) < parseInt(min_num) ) {
		alert( $(this).attr('data-valid-title') + '의 최소값은' + min_num + '입니다.' );
		$(this).focus();
		return false;
	}
	
	return true;
};


/**
 * ==================================================================================
 * 숫자 최대값 크기 제한
 * ----------------------------------------------------------------------------------
 * 1. max-num check
 * ==================================================================================
 */
$.fn.maxNum = function() {
	
	var value = $.trim($(this).val());
	var max_num = $(this).attr('data-valid-maxnum');
	
	// max-length check
	if( parseInt(value) > parseInt(max_num) ) {
		alert( $(this).attr('data-valid-title') + '의 최대값은' + max_num + '입니다.' );
		$(this).focus();
		return false;
	}
	
	return true;
};


/**
 * =======================================================================================
 * 영문+숫자 입력 가능
 * =======================================================================================
 */
$.fn.alphanumeric = function() {
	
	var regexp = /^[A-Za-z0-9]+$/;
	
	// english and number use only check
	if( regexp.test($(this).val()) != true ) {
		alert( $(this).attr('data-valid-title') + '은(는) 영문자와 숫자만 가능합니다.' );
		$(this).focus();
		return false;
	}
	
	// space check
	if( $(this).val().indexOf(' ') > -1 ) {
		alert(  $(this).attr('data-valid-title') + ' 공백은 사용하실수 없습니다.' );
		$(this).focus();
		return false;
	}
	
	return true;
};


/**
 * =======================================================================================
 * 특수문자 사용 금지
 * =======================================================================================
 */
$.fn.specialSymbol = function() {
	
	var regexp = /[`~!@#$^&*|\\\'\";:\/]/gi;
	
	if( regexp.test( $(this).val()) == true ){
		alert( $(this).attr('data-valid-title') + '은(는) 특수문자를 사용하실 수 없습니다.' );
		$(this).focus();
		return false;
	}

	return true;
};


/**
 * =======================================================================================
 * 이메일 유효성 체크
 * =======================================================================================
 */
$.fn.email = function() {
	
	var regexp = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i;
	
	if( regexp.test($(this).val()) != true ){ 
		alert( $(this).attr('data-valid-title') + '이 올바른 형식이 아닙니다. 다시한번 확인해 주시기 바랍니다.' );
		$(this).focus();
		return false;
	}
	
	return true;
}


/**
 * =======================================================================================
 * 크로스 사이트 스크립팅 체크
 * =======================================================================================
 */
$.fn.xss = function() {
	
	// cross site scripting data check
	if( $(this).val().toLowerCase().indexOf("script") != -1 ) {
		alert( $(this).attr('data-valid-title') + '에 XSS 위반 문자는 사용하실 수 없습니다.' );
		$(this).focus();
		return false;
	}
	
	return true;
};


/**
 * =======================================================================================
 * 날자 형식 변경
 * ---------------------------------------------------------------------------------------
 * 1. yyyyMMdd - > yyyyMMdd
 * 2. yyyy?MM?dd - > yyyyMMdd
 * =======================================================================================
 */
$.fn.cvtDateDefault = function() {

	var value = $(this).val();
	
	if(value.length > 8) {
		
		var yyyy = value.substr(0,4);
		var mm = value.substr(5,2);
		var dd = value.substr(8,2);
		
		if(parseInt(mm) < 10) {
			mm = '0'+parseInt(mm);
		}
		if(parseInt(dd) < 10) {
			dd = '0'+parseInt(dd);
		}

		return yyyy + mm + dd;
	} 
	else {
		return value;
	}
};


/**
 * =======================================================================================
 * 날자 형식 변경
 * ---------------------------------------------------------------------------------------
 * 1. yyyyMMdd - > yyyy-MM-dd
 * =======================================================================================
 */
$.fn.cvtDateHyphen = function() {

	var value = $(this).cvtDateDefault();
	var yyyy = value.substr(0,4);
	var mm = value.substr(4,2);
	var dd = value.substr(6,2);
	
	return yyyy + "-" + mm + "-" + dd;
	
};


/**
 * =======================================================================================
 * 날자 형식 변경
 * ---------------------------------------------------------------------------------------
 * 1. yyyyMMdd - > yyyy.MM.dd
 * =======================================================================================
 */
$.fn.cvtDateDot = function() {

	var value = $(this).cvtDateDefault();
	var yyyy = value.substr(0,4);
	var mm = value.substr(4,2);
	var dd = value.substr(6,2);
	
	return yyyy + "." + mm + "." + dd;
	
};


/**
 * =======================================================================================
 * 날자 형식 변경
 * ---------------------------------------------------------------------------------------
 * 1. yyyyMMdd - > yyyy/MM/dd
 * =======================================================================================
 */
$.fn.cvtDateSlash = function() {

	var value = $(this).cvtDateDefault();
	var yyyy = value.substr(0,4);
	var mm = value.substr(4,2);
	var dd = value.substr(6,2);
	
	return yyyy + "/" + mm + "/" + dd;
	
};


/**
 * =======================================================================================
 * 날자 형식 변경
 * ---------------------------------------------------------------------------------------
 * 1. yyyyMMdd - > yyyyMMdd
 * 2. yyyyMMdd - > yyyy/MM/dd
 * 3. yyyyMMdd - > yyyy-MM-dd
 * 4. yyyyMMdd - > yyyy.MM.dd
 * =======================================================================================
 */
$.fn.cvtDateFormat = function() {

	var format = $(this).attr('data-date-format');
	var cvt_date_value;

	if( format == 'yyyyMMdd' ) {
		cvt_date_value = $(this).cvtDateDefault();
	}
	else if( format == 'yyyy/MM/dd' ) {
		cvt_date_value = $(this).cvtDateSlash();
	}
	else if( format == 'yyyy-MM-dd' ) {
		cvt_date_value = $(this).cvtDateHyphen();
	}
	else if( format == 'yyyy.MM.dd' ) {
		cvt_date_value = $(this).cvtDateDot();
	}
	else {
		cvt_date_value = this.value;
	}
	
	return cvt_date_value;
	
};


/**
 * =======================================================================================
 * 폼 오브젝트 클린
 * ---------------------------------------------------------------------------------------
 * UI 상의 오브젝트 데이터를 초기화 시킴
 * =======================================================================================
 */
$.fn.cleanObject = function() {

	$(this).find('input[type="text"], input[type="number"], input[type="checkbox"]:checked, select, textarea').each(function() {
		
		if ($(this).is('select')) {
			$(this).find('option:eq(0)').prop("selected", true);
		}
		else if ($(this).attr('type') == 'checkbox'){
			$(this).prop("checked", false);
		}
		else {
			$(this).val("");
		}
		
	});
};


/**
 * =======================================================================================
 * 공백 체크(NULL 포함)
 * ---------------------------------------------------------------------------------------
 * 데이터가 있으면 true
 * 데이터가 없으면 false
 * ---------------------------------------------------------------------------------------
 * @param val
 * @returns {Boolean}
 * =======================================================================================
 */
function cf_isEmpty(val) {
	if( val == null || val == '' || $.trim(val) == '' ) {
		return false;
	}
	else {
		return true;
	}
}


/**
 * =======================================================================================
 * 숫자 콤마 적용 (정적)
 * ---------------------------------------------------------------------------------------
 * 데이터의 값을 x,xxx,xxx,xxx 형태로 변경 시킨다.
 * ---------------------------------------------------------------------------------------
 * @param val
 * @returns
 * =======================================================================================
 */
function cf_cvtComma(val, subfix) {
	
	if(val == 0 || val == '0') {
		if(typeof subfix != 'undefined') {
			return '0 ' + subfix;
		}
		else {
			return '0';
		}
	}
	
	if(typeof val == null || val == null || val == 'null' || val == '' ) {
		return '';
	}
	
	var regexp = /(^[+-]?\d+)(\d{3})/;
	
	val += '';
	while (regexp.test(val)) {
		val = val.replace(regexp, '$1' + ',' + '$2');
	}
	
	if(typeof subfix != 'undefined') {
		val = val + ' ' + subfix;
	}
	
    return val;
}


/**
 * =======================================================================================
 * 숫자 콤마 적용 (동적:실시간용)
 * ---------------------------------------------------------------------------------------
 * 데이터의 값을 x,xxx,xxx,xxx 형태로 변경 시킨다.
 * ---------------------------------------------------------------------------------------
 * @param obj
 * @param subfix - DB 테이블에서 수수료 값을 number(8,2)로 type 정하여 오류나지 않도록 validation
 * @returns
 * =======================================================================================
 */
function cf_setComma(obj, subfix) {
  
	var formnum = $(obj).val();
	var num_length = formnum.length;
	var firstNum = formnum.substr(0,1);
	var firstNum2 = formnum.substr(1,num_length);
   
	if(firstNum == "0"){
		alert("입력숫자는 0 으로 시작할 수 없습니다.");
		formnum = firstNum2;
		return firstNum2;
	}

	regexp = /^\$|,/g; 
	formnum = formnum.replace(regexp, ""); 
    
	var fieldnum = '' + formnum;

	if (isNaN(fieldnum)) {
        alert("숫자만 입력하실 수 있습니다.");        
        $(obj).val("");
        $(obj).focus();
        return "";
	}
	else {
		var comma = new RegExp('([0-9])([0-9][0-9][0-9][,.])');
		var data = fieldnum.split('.');

		if(subfix == 'charge' && data[0].length > 6) {
			alert("정수는 6자리, 소수는 2째자리 까지만 입력하실 수 있습니다.");        
			$(obj).val("");
			$(obj).focus();
			return "";
		}

		data[0] += '.';
		do {
			data[0] = data[0].replace(comma, '$1,$2');
		} while (comma.test(data[0]));

		if (data.length > 1) {
			if(subfix == 'charge' && (data[0].length > 8 || data[1].length > 2) ) {
				alert("정수는 6자리, 소수는 2째자리 까지만 입력하실 수 있습니다.");        
				$(obj).val("");
				$(obj).focus();
				return "";
			}
		}
		if (data.length > 1) {
			return data.join('');
		}
		else {
			return data[0].split('.')[0];
		}
	}
}

/**
 * =======================================================================================
 * 숫자 콤마 적용 (동적:실시간용 & 앞자리 '0' 허용)
 * ---------------------------------------------------------------------------------------
 * 데이터의 값을 x,xxx,xxx,xxx 형태로 변경 시킨다.
 * ---------------------------------------------------------------------------------------
 * @param obj
 * @returns
 * =======================================================================================
 */
function cf_setCommaUseZero(obj, subfix) {
  
	var formnum = $(obj).val();
	var num_length = formnum.length;
	var firstNum2 = formnum.substr(1,num_length);
	
	
	regexp = /^\$|,/g;
	formnum = formnum.replace(regexp, "");
    
	var fieldnum = '' + formnum;

	if (isNaN(fieldnum)) {
		alert("숫자만 입력하실 수 있습니다.");
        $(obj).val("");
        $(obj).focus();
        return "";
	}
    else {
    	var comma = new RegExp('([0-9])([0-9][0-9][0-9][,.])');
        var data = fieldnum.split('.');
        
        if(subfix == 'charge' && data[0].length > 6) {
			alert("정수는 6자리, 소수는 2째자리 까지만 입력하실 수 있습니다.");        
			$(obj).val("");
			$(obj).focus();
			return "";
		}
        
        data[0] += '.';
    	do {
    		data[0] = data[0].replace(comma, '$1,$2');
    	} while (comma.test(data[0]));

    	if (data.length > 1) {
			if(subfix == 'charge' && (data[0].length > 8 || data[1].length > 2) ) {
				alert("정수는 6자리, 소수는 2째자리 까지만 입력하실 수 있습니다.");        
				$(obj).val("");
				$(obj).focus();
				return "";
			}
		}
    	if (data.length > 1) {
    		return data.join('');
    	}
        else {
        	return data[0].split('.')[0];
        }
    }
}


/**
 * =======================================================================================
 * 값을 하이픈을 넣어 옵션 형태대로 변환
 * ---------------------------------------------------------------------------------------
 * - jumin : 주민등록번호 형태로 변환
 * - mobile : 모바일번호 형태로 변환
 * - tel : 일반 전화번호 형태로 변환
 * ---------------------------------------------------------------------------------------
 * @param val
 * @param opt
 * @returns {String}
 * =======================================================================================
 */
function cf_cvtHyphen(val, opt) {
	if(opt == 'jumin') {
		// 사용 하면 그때 구현 예정 중
	}
	else if(opt == 'mobile') {
		
		if(val.length == 10) {
			var m1 = val.substr(0,3);
			var m2 = val.substr(3,3);
			var m3 = val.substr(6,4);
			var rtn = m1 + '-' + m2 + '-' + m3;
			return rtn;
		}
		else if(val.length == 11) {
			var m1 = val.substr(0,3);
			var m2 = val.substr(3,4);
			var m3 = val.substr(7,4);
			var rtn = m1 + '-' + m2 + '-' + m3;
			return rtn;
		}
		else {
			return val;
		}
		
	}
	else if(opt == 'tel') {
		if(val.length == 9 ) {
			var t1 = val.substr(0,2);
			var t2 = val.substr(2,3);
			var t3 = val.substr(5,4);
			var rtn = t1 + '-' + t2 + '-' + t3;
			return rtn;
		}
		else if(val.length == 10) {
			var tmp = val.substr(0,2);
			if(tmp == '02') {
				var t1 = val.substr(0,2);
				var t2 = val.substr(2,4);
				var t3 = val.substr(6,4);
				var rtn = t1 + '-' + t2 + '-' + t3;
				return rtn;
			}
			else {
				var t1 = val.substr(0,3);
				var t2 = val.substr(3,3);
				var t3 = val.substr(6,4);
				var rtn = t1 + '-' + t2 + '-' + t3;
				return rtn;
			}
		}
		else if(val.length == 11 ) {
			var t1 = val.substr(0,3);
			var t2 = val.substr(3,4);
			var t3 = val.substr(7,4);
			var rtn = t1 + '-' + t2 + '-' + t3;
			return rtn;
		}
		else {
			return val;
		}
	}
	else if(opt == 'zip') {
		if(val.length == 6 ) {
			var t1 = val.substr(0,3);
			var t2 = val.substr(3,6);
			var rtn = t1 + '-' + t2;
			return rtn;
		}
		else if(val.length == 5) {
			// 추후 다섯자리 사용으로 변경시 작업
		}
		else {
			return val;
		}
	}
	else {
		return val;
	}
}

/**
 * =======================================================================================
 * 값을 옵션 기준으로 배열로 정보 반환
 * ---------------------------------------------------------------------------------------
 * - jumin : 주민등록번호 형태로 반환
 * - mobile : 모바일번호 형태로 반환
 * - tel : 일반 전화번호 형태로 반환
 * ---------------------------------------------------------------------------------------
 * @param val
 * @param opt
 * @returns {String}
 * =======================================================================================
 */
function cf_cvtNumSplit(val, opt) {
	
	if(val == null || val == '') {
		val = '--';
	}
	
	var rtn = {};
	
	if(opt == 'jumin') {
		// 사용 하면 그때 구현 예정 중
	}
	else if(opt == 'mobile' || opt == 'tel') {
		
		var tmp = val.split('-');
		
		rtn['f_num'] = tmp[0];
		rtn['m_num'] = tmp[1];
		rtn['l_num'] = tmp[2];
		
		return rtn;
	}
	else {
		return val;
	}
}


/**
 * =======================================================================================
 * 하이픈을 적용하여 오브젝트 생성
 * ---------------------------------------------------------------------------------------
 * - objList 대상 오브젝트 리스트
 * - rtn 리턴 스트링
 * ---------------------------------------------------------------------------------------
 * @param objList
 * @returns {String}
 * =======================================================================================
 */
function cf_serializeHyphenObject(objList) {
	
	var rtn = '';
	
	$.each(objList, function (i, item) {
		
		if(!cf_isEmpty($(item).val())) {
			return false;
		}
		
		if(i == 0) {
			rtn += $(item).val();
		}
		else {
			rtn += '-' + $(item).val();
		}
	});
	return rtn;
}


/**
 * =======================================================================================
 * 현재 날짜 정보
 * ---------------------------------------------------------------------------------------
 * 현재 날짜를 yyyy-MM-dd 형태로 반환
 * ---------------------------------------------------------------------------------------
 * @returns {String}
 * =======================================================================================
 */
function cf_toDate() {
	var to = new Date();
	var yyyy = to.getFullYear();
	var mm = to.getMonth()+1;
	var dd = to.getDate();
	
	if(parseInt(mm) < 10) {
		mm = '0'+parseInt(mm);
	}
	if(parseInt(dd) < 10) {
		dd = '0'+parseInt(dd);
	}
	
	return yyyy + "-" + mm + "-" + dd;
}

/**
 * =======================================================================================
 * 현재 월 정보
 * ---------------------------------------------------------------------------------------
 * 현재 월 yyyy-MM 형태로 반환
 * ---------------------------------------------------------------------------------------
 * @returns {String}
 * =======================================================================================
 */
function cf_toMonthDate() {
	var to = new Date();
	var yyyy = to.getFullYear();
	var mm = to.getMonth()+1;
	
	if(parseInt(mm) < 10) {
		mm = '0'+parseInt(mm);
	}
	
	return yyyy + "-" + mm;
}


/**
 * =======================================================================================
 * 기간 이후 날짜 정보
 * ---------------------------------------------------------------------------------------
 *  - term : 날짜 사이 기간 정보
 *  - date : 기준 날짜 정보 (입력값이 없으면 현재 날짜 기준으로 데이터 생성)
 * ---------------------------------------------------------------------------------------
 * @param term
 * @param date
 * @returns {String}
 * =======================================================================================
 */
function cf_termDate(term, date) {
	
	var base_date;
	
	if(typeof date == 'undefined') {
		base_date = cf_toDate();
	} else {
		base_date = date;
	}
	
	var date_array = base_date.split('-');
	
	var rtn_date = new Date(date_array[0], (date_array[1]-1), date_array[2]);
	
	rtn_date.setDate(rtn_date.getDate() + term);

	var yyyy = rtn_date.getFullYear();
	var mm = rtn_date.getMonth()+1;
	var dd = rtn_date.getDate();
	
	if(parseInt(mm) < 10) {
		mm = '0'+parseInt(mm);
	}
	if(parseInt(dd) < 10) {
		dd = '0'+parseInt(dd);
	}
	
	return yyyy + "-" + mm + "-" + dd;
}

/**
 * =======================================================================================
 * 기간 이후 월 정보
 * ---------------------------------------------------------------------------------------
 *  - term : 월 사이 기간 정보
 *  - date : 기준 월 정보 (입력값이 없으면 현재 월 기준으로 데이터 생성)
 * ---------------------------------------------------------------------------------------
 * @param term
 * @param date
 * @returns {String}
 * =======================================================================================
 */
function cf_termMonthDate(term, date) {
	
	var base_date;
	
	if(typeof date == 'undefined') {
		base_date = cf_toMonthDate();
	} else {
		base_date = date;
	}
	
	var date_array = base_date.split('-');
	var rtn_date = new Date(date_array[0], (date_array[1]-1));
	
	rtn_date.setMonth(rtn_date.getMonth() + term);

	var yyyy = rtn_date.getFullYear();
	var mm = rtn_date.getMonth()+1;
	
	if(parseInt(mm) < 10) {
		mm = '0'+parseInt(mm);
	}
	
	return yyyy + "-" + mm;
}


/**
 * =======================================================================================
 * 날짜 포멧 변경
 * ---------------------------------------------------------------------------------------
 * date -> 스트링 형태 yyyyMMdd 또는 yyyy?MM?dd
 * 사용 가능 format
 * 	- yyyyMMdd
 * 	- yyyy/MM/dd
 * 	- yyyy-MM-dd
 * 	- yyyy.MM.dd
 * ---------------------------------------------------------------------------------------
 * @param date
 * @param format
 * @returns
 * =======================================================================================
 */
function cf_cvtDateFormat(date, format) {
	
	if(typeof date == null || date == null || date == 'null' || date == '' ) {
		return '';
	}
	
	var tmp_obj = $('<input>');
	tmp_obj.attr('type','hidden');
	tmp_obj.attr('name','tmp');
	tmp_obj.attr('data-date-format',format);
	tmp_obj.val(date);
	
	var rtn_date = tmp_obj.cvtDateFormat();
	tmp_obj.remove();
	
	return rtn_date;
}

/**
 * =======================================================================================
 * XSS 필터
 * ---------------------------------------------------------------------------------------
 * 값 중 < 와 > 를 &lt; , &gt;로 변경 처리
 * ---------------------------------------------------------------------------------------
 * @param val
 * @returns
 * =======================================================================================
 */
function cf_xssFilter(val) {
	return val.replace(/</g, "&lt;").replace(/>/g, "&gt;");
}


/**
 * =======================================================================================
 * 체크박스 모두 선택/해제
 * ---------------------------------------------------------------------------------------
 * 체크박스의 모두 선택 및 해체
 * 사용법 cf_cbAll(this);
 * ---------------------------------------------------------------------------------------
 * @param obj
 * =======================================================================================
 */
function cf_cbAll(obj) {
	var is_scroll = $(obj).parents('table').find('tbody').length;
	if(is_scroll > 0) {
		$(obj).parents("table").find("tbody").find("input[type='checkbox']").prop("checked", obj.checked);
	}
	else {
		$(obj).parents("table").parent().parent().find("tbody").find("input[type='checkbox']").prop("checked", obj.checked);
	}
}


/**
 * =======================================================================================
 * 테이블 체크박스 선택 로우 삭제
 * ---------------------------------------------------------------------------------------
 * 테이블에서 체크박스에 선택된 행을 삭제 함
 * 사용법 cf_delTblRow(obj_id, resizing_count);
 * ---------------------------------------------------------------------------------------
 * @param obj_id
 * @param resizing_cnt
 * =======================================================================================
 */
function cf_delTblRow(obj_id, resizing_cnt) {
	var obj = $('#' + obj_id);
	$(obj).find('input[type=checkbox]').each(function(i) {
		if($(this).is(':checked')) {
			var row = $(this).parent().parent();
			row.remove();
		}
	});
	if(typeof resizing_cnt != 'undefined') {
		var tbl = $(obj).parents('.read-table-scroll');
		tbl.tblresize(5);
	}
}


/**
 * =======================================================================================
 * 비지니스와 API 통신시 데이터 컨버팅 GET
 * ---------------------------------------------------------------------------------------
 * 기존 데이터를 json형태로 변경하고 url인코딩하여 리턴
 * ---------------------------------------------------------------------------------------
 * @param send_data
 * @returns
 * =======================================================================================
 */
function cf_bizGetEncode(send_data) {
	return encodeURI('params='+JSON.stringify(send_data));
}


/**
 * =======================================================================================
 * 비지니스와 API 통신시 데이터 컨버팅 POST
 * ---------------------------------------------------------------------------------------
 * 기존 데이터를 json형태로 변경하고 url인코딩하여 리턴
 * ---------------------------------------------------------------------------------------
 * @param send_data
 * @returns
 * =======================================================================================
 */
function cf_bizPostEncode(send_data) {
	return JSON.stringify(send_data);
}


/**
 * =======================================================================================
 * 문자열 마스킹 처리
 * ---------------------------------------------------------------------------------------
 * 문자열을 길이에 따라 ***로 표시 (ex:가나다라마바사 -> 가나다라***)
 * ---------------------------------------------------------------------------------------
 * @param val
 * @param len
 * @returns {String}
 * =======================================================================================
 */
function cf_masking(val, len) {
	
	var str_length = val.length;
	var rtnVal = '';
	
	if(str_length < len) {
		alert('마스킹 길이가 너무 큽니다.\n확인해 주시기 바랍니다.');
		return;
	}
	
	for(var i = 0; i < (str_length-len); i++) {
		rtn += val.charAt(i);
	}
	
	// * 처리
	for(var j = 0; j < len; j++) {
		rtn += '*';
	}
	
	return rtnVal;
}

/**
 * =======================================================================================
 * zero 붙임
 * ---------------------------------------------------------------------------------------
 * 월/일/시/분 일때 1 -> 01로 변경
 * ---------------------------------------------------------------------------------------
 * @param val
 * @param len
 * @returns {String}
 * =======================================================================================
 */
function cf_appendZero(val, len) {
	var zero = '0';
    var rtn = String(val);
    for(var i = rtn.length; i < len; i++) {
    	rtn = zero + rtn;
    }
    return rtn;
}


/**
 * =======================================================================================
 * 콘텐츠 영역의 태그 정보를 HTML TAG형식으로 변경
 * ---------------------------------------------------------------------------------------
 * 
 * ---------------------------------------------------------------------------------------
 * @param val
 * @returns {String}
 * =======================================================================================
 */
function cf_cvtHtmlTag(val) {
	var rtn = '';
	rtn = val
			.replace(/\r\n/g, '</br>&nbsp;')
			.replace(/\r/g, '</br>&nbsp;')
			.replace(/\n/g, '</br>&nbsp;');
	return rtn;
}

/**
 * =======================================================================================
 * replaceAll 스크립트
 * ---------------------------------------------------------------------------------------
 * 
 * ---------------------------------------------------------------------------------------
 * @param val
 * @param str1
 * @param str2
 * @returns {String}
 * =======================================================================================
 */
function cf_replaceAll(val, str1, str2) {
	return val.split(str1).join(str2);
}

/**
 * =======================================================================================
 * 파일 확장자 
 * ---------------------------------------------------------------------------------------
 * @param val
 * @returns {String}
 * =======================================================================================
 */
function cf_getFileExt(val) {
	
	var ext = '';
	
	ext_length = val.lastIndexOf(".");
	ext = val.substring(ext_length + 1);
	ext = ext.toLowerCase();
	
	return ext;
}