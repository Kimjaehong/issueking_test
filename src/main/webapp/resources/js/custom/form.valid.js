/**
 * ==================================================================================
 * 폼 벨리데이션 체크
 * ----------------------------------------------------------------------------------
 * 사용법
 * 	- data-valid-empty="true" 			: NULL 체크
 * 	- data-valid-min="0" 				: 최소 입력 byte 체크
 * 	- data-valid-max="0" 				: 최대 입력 byte 체크
 * 	- data-valid-num="true"				: 숫자만 입력 가능 체크
 * 	- data-valid-alphanumeric="true"	: 영문+숫자만 입력 가능 체크
 * 	- data-valid-symbol="true"			: 특수문자 사용 불가 체크
 * 
 * 공통
 * 	- xss 체크
 * 		input[type=email]
 *  	input[type=password]
 *  	input[type=other]
 *  	textarea
 * ----------------------------------------------------------------------------------
 * case
 * 	input : 
 * 		case
 * 			radio :
 * 				- isEmpty check
 * 
 * 			checkbox :
 * 				- isEmpty check
 * 
 * 			email :
 * 				- isEmpty check
 * 				- min-length check
 * 				- max-length check
 * 				- cross site scripting check
 * 
 * 			password :
 * 				- isEmpty check
 * 				- min-length check
 * 				- max-length check
 * 				- cross site scripting check
 * 
 * 			other :
 * 				- isEmpty check
 * 				- min-length check
 * 				- max-length check
 * 				- only number data check
 * 				- alphanumeric check
 * 				- special symbol check
 * 				- cross site scripting check
 * 
 * 	select : 
 * 		- isEmpty check
 * 
 * 	textarea : 
 * 		- isEmpty check
 * 		- min-length check
 * 		- max-length check
 * 		- alphanumeric check
 * 		- special symbol check
 * 		- cross site scripting check
 * ==================================================================================
 */
$.fn.formValid = function() {
	
	var $frm = $(this);
	var rtn_flag = true;
	
	$frm.find('input, select, textarea').each(function(){
	
		if ($(this).is('input')) {
			
			var type = $(this).attr('type');
			
			// input type : radio
			if (type == 'radio') {
				
				// isEmpty check
				if($(this).attr('data-valid-empty') !== undefined && $(this).attr('data-valid-empty') == 'true') {
					if( $(this).isEmpty() != true ) {
						rtn_flag = false;
						return false;
					}
				}
				
				// 이 구분은 나중에 변경 처리 해야 함!
				if($(this).attr('data-valid-sub') !== undefined) {
					
					if( $('input:radio[name='+$(this).attr('name')+']:checked').val() == $(this).attr('data-valid-sub-chkval') ) {
						
						var id_list = ($(this).attr('data-valid-sub')).split(',');
						
						for(var k = 0; k < id_list.length; k++) {
							var sub_obj = $('#' + id_list[k]); 
							if( sub_obj.isEmpty() != true ) {
								rtn_flag = false;
								return false;
							}
						}
					}
				}
			}
			// input type : checkbox
			else if (type == 'checkbox') {
				
				// isEmpty check
				if($(this).attr('data-valid-empty') !== undefined && $(this).attr('data-valid-empty') == 'true') {
					if( $(this).isEmpty() != true ) {
						rtn_flag = false;
						return false;
					}
				}
				
			}
			// input type : email
			else if (type == 'email') {
				
				// isEmpty check
				if($(this).attr('data-valid-empty') !== undefined && $(this).attr('data-valid-empty') == 'true') {
					if( $(this).isEmpty() != true ) {
						rtn_flag = false;
						return false;
					}
				}
				
				// min-length check
				if( $(this).attr('data-valid-min') !== undefined ) {
					if( $(this).minLength() != true ) {
						rtn_flag = false;
						return false;
					}
				}
				
				// max-length check
				if( $(this).attr('data-valid-max') !== undefined ) {
					if( $(this).maxLength() != true ) {
						rtn_flag = false;
						return false;
					}
				}
				
				// cross site scripting data check
				if( $(this).email() != true ) {
					rtn_flag = false;
					return false;
				}
				
				// cross site scripting data check
				if( $(this).xss() != true ) {
					rtn_flag = false;
					return false;
				}
				
			}
			// input type : password
			else if (type == 'password') {
				
				// isEmpty check
				if($(this).attr('data-valid-empty') !== undefined && $(this).attr('data-valid-empty') == 'true') {
					if( $(this).isEmpty() != true ) {
						rtn_flag = false;
						return false;
					}
				}
				
				// min-length check
				if( $(this).attr('data-valid-min') !== undefined ) {
					if( $(this).minLength() != true ) {
						rtn_flag = false;
						return false;
					}
				}
				
				// max-length check
				if( $(this).attr('data-valid-max') !== undefined ) {
					if( $(this).maxLength() != true ) {
						rtn_flag = false;
						return false;
					}
				}
				
				// cross site scripting data check
				if( $(this).xss() != true ) {
					rtn_flag = false;
					return false;
				}
				
			}
			// input type : other
			else {
				
				// isEmpty check
				if($(this).attr('data-valid-empty') !== undefined && $(this).attr('data-valid-empty') == 'true') {
					if( $(this).isEmpty() != true ) {
						rtn_flag = false;
						return false;
					}
				}
				
				// min-length check
				if( $(this).attr('data-valid-min') !== undefined ) {
					if( cf_isEmpty($(this).val()) == true ) {
						if( $(this).minLength() != true ) {
							rtn_flag = false;
							return false;
						}
					}
				}
				
				// max-length check
				if( $(this).attr('data-valid-max') !== undefined ) {
					if( cf_isEmpty($(this).val()) == true ) {
						if( $(this).maxLength() != true ) {
							rtn_flag = false;
							return false;
						}
					}
				}
				
				// min num check
				if( $(this).attr('data-valid-minnum') !== undefined ) {
					if( $(this).isNumber() != true ) {
						rtn_flag = false;
						return false;
					}
					
					if( $(this).minNum() != true ) {
						rtn_flag = false;
						return false;
					}
				}
				
				// max num check
				if( $(this).attr('data-valid-maxnum') !== undefined ) {
					if( $(this).isNumber() != true ) {
						rtn_flag = false;
						return false;
					}
					
					if( $(this).maxNum() != true ) {
						rtn_flag = false;
						return false;
					}
				}
				
				// only number data check
				if( $(this).attr('data-valid-num') !== undefined && $(this).attr('data-valid-num') == 'true') {
					if( cf_isEmpty($(this).val()) == true ) {
						if($(this).attr('data-valid-onlynum') == 'true') {
							if( $(this).isOnlyNumber() != true ) {
								rtn_flag = false;
								return false;
							}
						} else {
							if( $(this).isNumber() != true ) {
								rtn_flag = false;
								return false;
							}
						}
					}
				}
				
				// alphanumeric check
				if( $(this).attr('data-valid-alphanumeric') !== undefined && $(this).attr('data-valid-alphanumeric') == 'true') {
					if( $(this).alphanumeric() != true ) {
						rtn_flag = false;
						return false;
					}
				}
				
				// special symbol check
				if( $(this).attr('data-valid-symbol') !== undefined && $(this).attr('data-valid-symbol') == 'true') {
					if( $(this).specialSymbol() != true ) {
						rtn_flag = false;
						return false;
					}
				}
				
				if( $(this).attr('data-vaild-email') !== undefined) {
					var id_list = ($(this).attr('data-vaild-email')).split(',');
					
					var main_mail = $(this);
					var sub_mail = $('#' + id_list[0]);
					var sel_mail = $('#' + id_list[1]);
					var email_addr = '';
					
					if(sel_mail.val() == 'etc') {
						if( sub_mail.isEmpty() != true ) {
							rtn_flag = false;
							return false;
						}
						email_addr = main_mail.val() + '@' + sub_mail.val();
						
						var regexp = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i;
						
						if( regexp.test(email_addr) != true ){ 
							alert( $(this).attr('data-valid-title') + '이 올바른 형식이 아닙니다. 다시한번 확인해 주시기 바랍니다.' );
							$(this).focus();
							rtn_flag = false;
							return false;
						}
					}
				}
				
				
				// cross site scripting data check
				if( $(this).xss() != true ) {
					rtn_flag = false;
					return false;
				}
				
			}
			
		}
		else if ($(this).is('select')) {
			// isEmpty check
			if($(this).attr('data-valid-empty') !== undefined && $(this).attr('data-valid-empty') == 'true') {
				if( $(this).isEmpty() != true ) {
					rtn_flag = false;
					return false;
				}
				// 서브 오브젝트 첵크 (추 후 배열 형태로 처리 할 수 있게 변경 해야 함!)
				if($(this).attr('data-valid-sub') !== undefined) {
					if( $('select[name='+$(this).attr('name')+']').val() == $(this).attr('data-valid-sub-chkval') ) {
						var sub_obj = $frm.find($(this).attr('data-valid-sub-type')+'[name='+$(this).attr('data-valid-sub')+']');
						if( sub_obj.isEmpty() != true ) {
							rtn_flag = false;
							return false;
						}
					}
				}
			}
		}
		else if ($(this).is('textarea')) {
			
			// isEmpty check
			if($(this).attr('data-valid-empty') !== undefined && $(this).attr('data-valid-empty') == 'true') {
				if( $(this).isEmpty() != true ) {
					rtn_flag = false;
					return false;
				}
			}
			
			// min-length check
			if( $(this).attr('data-valid-min') !== undefined ) {
				if( $(this).minLength() != true ) {
					rtn_flag = false;
					return false;
				}
			}
			
			// max-length check
			if( $(this).attr('data-valid-max') !== undefined ) {
				if( $(this).maxLength() != true ) {
					rtn_flag = false;
					return false;
				}
			}
			
			// special symbol check
			if( $(this).attr('data-valid-symbol') !== undefined && $(this).attr('data-valid-symbol') == 'true') {
				if( $(this).specialSymbol() != true ) {
					rtn_flag = false;
					return false;
				}
			}
			
			// cross site scripting check
			if( $(this).xss() != true ) {
				rtn_flag = false;
				return false;
			}
			
		}

	});
	
	return rtn_flag;
};