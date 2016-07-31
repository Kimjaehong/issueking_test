/**
 * ==================================================================================
 * 폼 벨리데이션 체크
 * ----------------------------------------------------------------------------------
 * 사용법
 * 	- data-valid-search="true" 			: 검색 필수 조건 체크
 * 	- data-valid-title="" 				: 검색 alter 텍스트
 * ----------------------------------------------------------------------------------
 * ==================================================================================
 */
$.fn.searchValid = function() {
	
	var debugF = false;
	var $frm = $(this);
	var rtn_cnt = 0;
	var len_array = new Array();
	
	$frm.find('input[type=number], input[type=text], input[type=radio], input[type=checkbox], select').each(function(i){
		
		if (this.name === null || this.name === undefined || this.name === '') {
			return;
		}
		
		if ($(this).is('input')) {
			var type = $(this).attr('type');
			
			if (type == 'radio') {
				if(debugF) {
					console.log('type:input ' + type + ', name:' + $(this).attr('name') + ', data_length:' + $.trim($(this).val()).length);
				}
				
				len_array[i] = $('input:radio[name='+this.name+']:checked').length;
				
			} else if(type == 'checkbox') {
				if(debugF) {
					console.log('type:input ' + type + ', name:' + $(this).attr('name') + ', data_length:' + $.trim($(this).val()).length);
				}
				
				len_array[i] = $('input:checkbox[name='+this.name+']:checked').length;
			}
			else {
				if(debugF) {
					console.log('type:input ' + type + ', name:' + $(this).attr('name') + ', data_length:' + $.trim($(this).val()).length);
				}
				
				len_array[i] = $.trim($(this).val()).length;
				
				if( $(this).attr('data-valid-search') == 'true' && $.trim($(this).val()).length < 1) {
					len_array = [];
					alert( $(this).attr('data-valid-title') + '은(는) 필수 입력 검색조건 입니다.' );
					$(this).focus();
					return false;
				}
			}
		}
		else if ($(this).is('select')) {
			if(debugF) {
				console.log('type:select, name:' + $(this).attr('name') + ', data_length:' + $.trim($(this).children("option:selected").val()).length);
			}
			
			len_array[i] = $.trim($(this).children("option:selected").val()).length;
			
			if( $(this).attr('data-valid-search') == 'true' && $.trim($(this).children("option:selected").val()).length < 1) {
				len_array = [];
				alert( $(this).attr('data-valid-title') + '은(는) 필수선택 검색조건 입니다.' );
				$(this).focus();
				return false;
			}
		}
	});
	
	for(var i = 0; i < len_array.length; i ++) {
		if(len_array[i] > 0) {
			rtn_cnt++;
		}
	}
	
	if(rtn_cnt > 0) {
		return true;
	} 
	else {
		if(len_array.length > 0) {
			alert("검색 조건을 입력해 주세요.");
		}
		return false;
	}
};