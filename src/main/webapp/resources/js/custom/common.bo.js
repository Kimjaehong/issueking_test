/**
 * ==================================================================================
 * 화면 새로 고침시 URL active
 * ==================================================================================
 */
function cf_activeUrl() {
	var url = location.href.split('#').splice(1).join('#');
	if (!url) {
		try {
			var documentUrl = window.document.URL;
			if (documentUrl) {
				if (documentUrl.indexOf('#', 0) > 0 && documentUrl.indexOf('#', 0) < (documentUrl.length + 1)) {
					url = documentUrl.substring(documentUrl.indexOf('#', 0) + 1);
				}
			}
		} catch (err) {}
	}
	if (url) {
		$('nav li.active').removeClass("active");
		$('nav li:has(a[href="' + url + '"])').addClass("active");
		$('nav').find('.active').each(function(){
			var compare_url = $(this).children('a').attr('href');
			if(compare_url != url) {
				$(this).addClass("open");
			}
			$(this).children('ul').css('display','block');
		});
		var title = ($('nav a[href="' + url + '"]').attr('title'));
		document.title = (title || document.title);
		drawBreadCrumb();
	} else {
		var $this = $('nav > ul > li:first-child > a[href!="#"]');
		window.location.hash = $this.attr('href');
		$this = null;
	}
}

/**
 * ==================================================================================
 * 날짜 초기화 스크립트
 * ----------------------------------------------------------------------------------
 * @param sObj		시작일 오브젝트
 * @param eObj		종료일 오브젝트
 * @param sTerm		시작일 날짜 간격
 * @param eTerm		종료일 날짜 간격
 * ==================================================================================
 */
function cf_resetDefaultDate(sObj, eObj, sTerm, eTerm) {
	
	sObj.datepicker('option', {minDate: null, maxDate: null});
	eObj.datepicker('option', {minDate: null, maxDate: null});
	
	sObj.val(cf_termDate(sTerm));
	eObj.val(cf_termDate(eTerm));

	sObj.datepicker("option", "maxDate", eObj.val());
	eObj.datepicker("option", "minDate", sObj.val());
	
}

/**
 * ==================================================================================
 * 시작 날짜 초기화 스크립트
 * ----------------------------------------------------------------------------------
 * @param sObj		시작일 오브젝트
 * @param sTerm		시작일 날짜 간격
 * ==================================================================================
 */
function cf_resetDefaultStartDate(sObj, sTerm) {
	
	sObj.datepicker('option', {minDate: null, maxDate: null});
	
	sObj.val(cf_termDate(sTerm));

}

/**
 * ==================================================================================
 * 당월 날짜 설정
 * ----------------------------------------------------------------------------------
 * @param sObj		시작일 오브젝트
 * @param eObj		종료일 오브젝트
 * @param eTerm		종료일 날짜 간격
 * ==================================================================================
 */
function cf_resetDefaultMonDate(sObj, eObj, eTerm) {
	
	sObj.datepicker('option', {minDate: null, maxDate: null});
	eObj.datepicker('option', {minDate: null, maxDate: null});
	
	var to = new Date();
	var yyyy = to.getFullYear();
	var mm = to.getMonth()+1;
	var dd = to.getDate();
	
	if(mm==1 && dd == 1){
		sObj.val(to.getFullYear()-1+"-"+"12"+"-01");
		eObj.val(cf_termDate(eTerm));
	}
	else if(mm != 1 && dd == 1){
		sObj.val(yyyy+"-"+to.getMonth()+"-01");
		eObj.val(cf_termDate(eTerm));
	}
	else{
		sObj.val(yyyy+"-"+mm+"-01");
		eObj.val(cf_termDate(eTerm));
	}
	
	sObj.datepicker("option", "maxDate", eObj.val());
	eObj.datepicker("option", "minDate", sObj.val());
	
}

/**
 * ==================================================================================
 * 전화번호 앞자리 조회
 * ----------------------------------------------------------------------------------
 * @param target		타겟 정보
 * ==================================================================================
 */
function cf_firstTelNum(target) {
	
	var opt;
	var tel_num = ['000','070', '080', '02', '031', '032', '033', '041', '042', 
	               '043', '044', '051', '052', '053', '054', '055', '061', 
	               '062', '063', '064'];
	if(target.length > 1) {
		$.each(target, function () {
			for(var i = 0; i < tel_num.length; i++) {
				opt = $('<option></option>');
				opt.val(tel_num[i]);
				opt.text(tel_num[i]);
				$(this).append(opt);
			}
		});
	}
	else {
		for(var i = 0; i < tel_num.length; i++) {
			opt = $('<option></option>');
			opt.val(tel_num[i]);
			opt.text(tel_num[i]);
			target.append(opt);
		}
	}
}


/**
 * ==================================================================================
 * 메일주소
 * ----------------------------------------------------------------------------------
 * @param target		타겟 정보
 * ==================================================================================
 */
function cf_emailAddr(target) {
	
	var opt;
	var tel_num = ['naver.com', 'gmail.com', 'daum.net', 'nate.com', 'hotmail.com'];
	
	if(target.length > 1) {
		$.each(target, function () {
			for(var i = 0; i < tel_num.length; i++) {
				opt = $('<option></option>');
				opt.val(tel_num[i]);
				opt.text(tel_num[i]);
				$(this).append(opt);
			}
		});
	}
	else {
		for(var i = 0; i < tel_num.length; i++) {
			opt = $('<option></option>');
			opt.val(tel_num[i]);
			opt.text(tel_num[i]);
			target.append(opt);
		}
	}
}


/**
 * ==================================================================================
 * 휴대폰번호 앞자리 조회
 * ----------------------------------------------------------------------------------
 * @param target		타겟 정보
 * ==================================================================================
 */
function cf_firstMobileNum(target) {
	
	var opt;
	var mobile_num = ['010', '011', '016', '017', '019'];
	
	if(target.length > 1) {
		$.each(target, function () {
			for(var i = 0; i < mobile_num.length; i++) {
				opt = $('<option></option>');
				opt.val(mobile_num[i]);
				opt.text(mobile_num[i]);
				$(this).append(opt);
			}
		});
	}
	else {
		for(var i = 0; i < mobile_num.length; i++) {
			opt = $('<option></option>');
			opt.val(mobile_num[i]);
			opt.text(mobile_num[i]);
			target.append(opt);
		}
	}
}

/**
 * ==================================================================================
 * 시간 조회
 * ----------------------------------------------------------------------------------
 * @param target		타겟 정보
 * ==================================================================================
 */
function cf_hour(target) {
	var opt;
		
	if(target.length > 1) {
		$.each(target, function () {
			for(var i = 0; i < 24; i++) {
				opt = $('<option></option>');
				opt.val( cf_appendZero(i,2) );
				opt.text( cf_appendZero(i,2) );
				$(this).append(opt);
			}
		});
	}
	else {
		for(var i = 0; i < 24; i++) {
			opt = $('<option></option>');
			opt.val( cf_appendZero(i,2) );
			opt.text( cf_appendZero(i,2) );
			target.append(opt);
		}
	}
}

/**
 * ==================================================================================
 * 분 조회
 * ----------------------------------------------------------------------------------
 * @param target		타겟 정보
 * ==================================================================================
 */
function cf_min(target) {
	var opt;
//	var min_num = ['00', '10', '20', '30', '40', '50'];
	
	if(target.length > 1) {
		$.each(target, function () {
//			for(var i = 0; i < min_num.length; i++) {
//				opt = $('<option></option>');
//				opt.val(min_num[i]);
//				opt.text(min_num[i]);
//				$(this).append(opt);
//			}
			for(var i = 0; i < 60; i++) {
				opt = $('<option></option>');
				opt.val(cf_appendZero(i,2));
				opt.text(cf_appendZero(i,2));
				$(this).append(opt);
			}
		});
	}
	else {
//		for(var i = 0; i < min_num.length; i++) {
//			opt = $('<option></option>');
//			opt.val(min_num[i]);
//			opt.text(min_num[i]);
//			target.append(opt);
//		}
		for(var i = 0; i < 60; i++) {
			opt = $('<option></option>');
			opt.val(cf_appendZero(i,2));
			opt.text(cf_appendZero(i,2));
			target.append(opt);
		}
	}
}

/**
 * ==================================================================================
 * 코드 분류 리스트 조회
 * ==================================================================================
 */
function cf_codeClsList() {
	$.ajax({
		url: bizUrl + '/common/code/class/list',
		type: 'GET',
		async: false,
		cache: true,
		headers: {'AJAX':true},
		beforeSend : function() {
			
		},
		success: function(obj) {
			code_class_list = obj.data.code_class_list; 
			
			var target = $('#cd_class_id');
			var opt = '';
			
			if(code_class_list) {
				$.each(code_class_list, function(i, item) {
					opt = $('<option></option>');
					opt.val(item.cd_class_id);
					opt.text(item.cd_class_nm + '(' + item.cd_class_id + ')');
					target.append(opt);
				});	
			}
		},
		error: function(obj) {
			cf_errMsg(obj);
	    	return;
	    },
	    complete: function() {
	    	
	    }
	});
}

/**
 * ==================================================================================
 * 공통 코드 조회 스크립트 펑션
 * ----------------------------------------------------------------------------------
 * 공통 코드를 조회 성공시 오브젝트 리턴
 * ----------------------------------------------------------------------------------
 * @param cdClassId		공통 코드 정보
 * ==================================================================================
 */
function cf_codeList(cdClassId, upCdId) {
	
	// 반환 오브젝트
	var rtn_obj;
	
	if(cdClassId == 'group') {
		// ajax request
		$.ajax({
			url: bizUrl + '/sysmngt/authority/rgstgroup/list',
			type: 'GET',
			async: false,
			cache: true,
			headers: {'AJAX':true},
			beforeSend : function() {
				
			},
			success: function(obj) {
				rtn_obj = obj.data.rgst_grop_list; 
			},
			error: function(obj) {
				cf_errMsg(obj);
		    	return;
		    },
		    complete: function() {
		    	
		    }
		});
	}
	else {
		
		var send_data = {};
		
		// send_data setting
		if(typeof upCdId == 'undefined') {
			send_data['cd_class_id'] = cdClassId;
		}
		else {
			send_data['cd_class_id'] = cdClassId;
			send_data['up_cd_id'] = upCdId;
		}
		
		// ajax request
		$.ajax({
			url: bizUrl + '/common/code/detail/list',
			type: 'GET',
			async: false,
			cache: true,
			headers: {'AJAX':true},
			data: cf_bizGetEncode(send_data),
			beforeSend : function() {
				
			},
			success: function(obj) {
				rtn_obj = obj.data.code_list; 
			},
			error: function(obj) {
				cf_errMsg(obj);
		    	return;
		    },
		    complete: function() {
		    	
		    }
		});
	}
	
	return rtn_obj;
}


/**
 * ==================================================================================
 * 성공 메시지 출력
 * ----------------------------------------------------------------------------------
 * Ajax 통신 성공시 메시지 출력
 * ----------------------------------------------------------------------------------
 * @param obj	메시지 오브젝트
 * ==================================================================================
 */
function cf_successMsg(obj) {
	alert(cf_cvtMsg(obj.message));
}


/**
 * ==================================================================================
 * 에러 메시지 출력
 * ----------------------------------------------------------------------------------
 * Ajax 통신 에러시 메시지 출력
 * ----------------------------------------------------------------------------------
 * @param obj	메시지 오브젝트
 * ==================================================================================
 */
function cf_errMsg(obj) {
	
	var serverObj = JSON.parse(obj.responseText);
	
	var data = serverObj.data;
	if(data == 'P0000') {
		location.href = '/mngt/view/login';
	}
	else if(data == 'P0100') {
		location.href = '/mngt/view/error/notAuthorized';
	}
	else if(data == 'P0200') {
		alert(cf_cvtMsg(serverObj.message));
		location.href = '/mngt/view/login';
	}
	else if(data == 'P0300') {
		alert(cf_cvtMsg(serverObj.message));
		location.href = '/mngt/view/error/notfound';
	}
	else {
		if(serverObj.code == 'B0530' || serverObj.code == 'B9000') {
			alert(cf_cvtMsg(serverObj.message) + '\r\n' + cf_cvtMsg(serverObj.data));
			return;
		}
		else {
			alert(cf_cvtMsg(serverObj.message));
			return;
		}
	}
}

/**
 * ==================================================================================
 * 에러 메시지 출력
 * ----------------------------------------------------------------------------------
 * Ajax 통신 에러시 메시지 출력
 * ----------------------------------------------------------------------------------
 * @param xhr
 * @param status
 * @param thrownError
 * @param error
 * @param target
 * ==================================================================================
 */
function cf_errView(xhr, status, thrownError, error, target) {
	
	var serverObj = JSON.parse(xhr.responseText);

	var data = serverObj.data;
	if(data == 'P0000') {
		location.href = '/mngt/view/login';
	}
	else if(data == 'P0100') {
		location.href = '/mngt/view/error/notAuthorized';
	}
	else if(data == 'P0200') {
		alert(cf_cvtMsg(serverObj.message));
		location.href = '/mngt/view/login';
	}
	else {
		target.html('<h4 class="ajax-loading-error"><i class="fa fa-warning txt-color-orangeDark"></i> Error requesting <span class="txt-color-red">' + url + '</span>: ' + xhr.status + ' <span style="text-transform: capitalize;">'  + thrownError + '</span></h4>');
	}
}

function cf_errViewDialog(obj, target) {
	
	var serverObj = JSON.parse(obj.responseText);
	
	var data = serverObj.data;
	if(data == 'P0000') {
		target.dialog('close');
		location.href = '/mngt/view/login';
	}
	else if(data == 'P0100') {
		target.dialog('close');
		location.href = '/mngt/view/error/notAuthorized';
	}
	else if(data == 'P0200') {
		target.dialog('close');
		alert(cf_cvtMsg(serverObj.message));
		location.href = '/mngt/view/login';
	}
	else {
		alert(cf_cvtMsg(serverObj.message));
		return;
	}
}



/**
 * ==================================================================================
 * 메시지 컨버팅
 * ----------------------------------------------------------------------------------
 * 메시지의 행 변환 과정 후 데이터 리턴
 * ----------------------------------------------------------------------------------
 * @param val	원본 오브젝트 메시지
 * @returns		컨버팅 된 메시지
 * ==================================================================================
 */
function cf_cvtMsg(val) {
	var rtnVal = val.replace(/\\n/g,'\n');
	return rtnVal;
}


/**
 * ==================================================================================
 * 버튼 생성 스크립트
 * ----------------------------------------------------------------------------------
 * 검색 초기화 버튼 생성 reset(ex : sample.reset)
 * 	- btn_sample_search 		검색 버튼 아이디
 *  - btn_sample_search_reset	검색 초기화 버튼 아이디
 * 	- f_sampleReset();			검색 초기화 버튼 액션 스크립트 명
 * ----------------------------------------------------------------------------------
 * @param btnName	버튼 지정 명칭
 * ==================================================================================
 */
function cf_btnAppend(btnName) {
	var btn_name = btnName.split('.');
	
	if(btn_name[1] == 'reset') {
		var btn_search_id = 'btn_' + btn_name[0] + '_search';
		var btn_reset_id = 'btn_' + btn_name[0] + '_search_' + btn_name[1];
		$('#'+btn_reset_id).remove();
		
		var btn_icon = $('<i>').addClass('fa fa-remove');
		var reset_btn = $('<a>')
			.attr('id', btn_reset_id)
			.attr('href', 'javascript:void(0);')
			.attr('onclick', 'f_'+btn_name[0]+'SearchReset();')
			.addClass('btn btn-warning');
		reset_btn.text(' 전체목록 ');
		reset_btn.prepend(btn_icon);
		$('#'+btn_search_id).parent().append(reset_btn);
	}
}


/**
 * ==================================================================================
 * 버튼 삭제 스크립트
 * ----------------------------------------------------------------------------------
 * 검색 버튼 삭제 reset(ex : sample.reset)
 *  - btn_sample_search_reset	검색 초기화 버튼 아이디
 * ----------------------------------------------------------------------------------
 * @param btnName	버튼 지정 명칭
 * ==================================================================================
 */
function cf_btnRemove(btnName) {
	var btn_name = btnName.split('.');
	
	if(btn_name[1] == 'reset') {
		var btn_reset_id = 'btn_' + btn_name[0] + '_search_' + btn_name[1];
		$('#'+btn_reset_id).remove();
	}
}


/**
 * ==================================================================================
 * 버튼 활성화
 * ----------------------------------------------------------------------------------
 * css를 활용한 버튼 활성화 처리
 * ----------------------------------------------------------------------------------
 * @param obj_id	버튼 오브젝트 아이디
 * ==================================================================================
 */
function cf_btnAbled(obj_id) {
	$('#'+obj_id).removeClass('disabled');
}


/**
 * ==================================================================================
 * 버튼 비활성화
 * ----------------------------------------------------------------------------------
 * css를 활용한 버튼 비활성화 처리
 * ----------------------------------------------------------------------------------
 * @param obj_id	버튼 오브젝트 아이디
 * ==================================================================================
 */
function cf_btnDisabled(obj_id) {
	$('#'+obj_id).addClass('disabled');
}


/**
 * ==================================================================================
 * 페이지 전환
 * ----------------------------------------------------------------------------------
 * Back-Office의 콘텐츠 영역의 페이지 전환 처리
 * ----------------------------------------------------------------------------------
 * @param url		페이지 액션 URL
 * @param method	GET / POST
 * @param data		SEND DATA
 * @param target	액션 타겟 위치(default : #process)
 * ==================================================================================
 */
function cf_action(url, method, data, target) {
	if(typeof target == 'undefined') {
		// 타켓 미지정형 페이지 전화 액션 스크립트
		$.ajax({
		    url: url,
		    type: method,
		    async: true,
		    cache: false,
		    data: data,
		    headers: {'AJAX':true},
		    beforeSend : function() {
		    },
		    success: function(html){
		    	$('#process').empty();
		    	$('#process').html(html);
		    	$('html, body').animate({ scrollTop: 0 }, 0);
		    },
		    error: function(obj) {
		    	cf_errView(obj);
		    },
		    complete: function() {
		    	
		    }
		});
	}
	else {
		// 타켓 지정형 페이지 전화 액션 스크립트
		$.ajax({
		    url: url,
		    type: method,
		    async: true,
		    cache: false,
		    data: data,
		    headers: {'AJAX':true},
		    beforeSend : function() {
		    	
		    },
		    success: function(html){
		    	target.empty();
		    	target.html(html);
		    	$('html, body').animate({ scrollTop: 0 }, 0);
		    },
		    error: function(obj) {
		    	cf_errView(obj);
		    },
		    complete: function() {
		    	
		    }
		});
	}
}


/**
 * ==================================================================================
 * 스크롤 테이블 Tbody 리사이징
 * ==================================================================================
 */
$.fn.tblresize = function(row_count) {
	
	var obj = this;	
	var tr_cnt = $(obj).find('table').eq(1).find('tr').length;
	
	// row_count개 이상일 경우 스크롤링
	if(tr_cnt > row_count) {
		var width = 0;
		
		$(obj).find('table').eq(1).find('tr>td').each(function(i){
			if(i < row_count) {
				width = width + $(this).outerHeight();
			}
		});
		
		if(!$.browser.msie) {
			width = width + 1;
		}
		$(obj).find('table').eq(1).parent().css('max-height', width);
	}
	else {
		var width = 0;
		
		$(obj).find('table').eq(1).find('tr>td').each(function(){
			width = width + $(this).outerHeight();
		});
		
		if(!$.browser.msie) {
			width = width + 1;
		}
		$(obj).find('table').eq(1).parent().css('max-height', width);
	}
	
	var th_cnt = $(obj).find('table').eq(0).find('tr>th');
	$(obj).find('table').eq(0).find('tr>th').each(function(i) {
		var width = $(this).outerWidth();
		if(i != (th_cnt-1) ) {
			$(obj).find('table').eq(1).find('tr').eq(0).find('td').eq(i).outerWidth(width);		
		}
	});
};


/**
 * ==================================================================================
 * JQ-GRID 기본 셋팅 값
 * ==================================================================================
 */
var default_grid_option = {
	loadBeforeSend: function(xhr) { xhr.setRequestHeader('AJAX', true); },
	serializeRowData: function (postData) { return cf_bizGetEncode(postData); },
	mtype: 'GET',
	datatype : 'json',
	rowNum : 10,
	rowList : [10, 20, 30],
	viewsortcols : [true, 'vertical', true],
	toolbarfilter: true,
	viewrecords : true,
	multiboxonly: true,
	autowidth : true,
	height : 'auto',
	recordpos : 'left',
	loadError : function(xhr, status, error) {cf_errMsg(xhr);}
};



/**
 * ==================================================================================
 * JQ-GRID 넓이 지정
 * ==================================================================================
 * @param jqgrid_section	그리드 전체 width값 대상
 * @param width				지정 셀 width값
 * @returns					반환 그리드 셀 width값
 */
function cf_setJqGridWidth(jqgrid_section, width) {
	var grid_header_width = jqgrid_section.width();
	return Math.round(grid_header_width*(width/100));
}


/**
 * ==================================================================================
 * JQ-GRID 기본 버튼 옵션 지정
 * ==================================================================================
 */
$.fn.jqgridBtnOption = function() {
	var obj = this;
	var obj_pager = $(obj).getGridParam('pager');
	
	$(obj).jqGrid('navGrid', obj_pager, {
		edit : false, add : false, del : false, 
		search : false, refresh : false, view:false,
		position: 'right'
	});
};


/**
 * ==================================================================================
 * JQ-GRID 커스텀 CSS 셋팅
 * ==================================================================================
 */
$.fn.jqgridStyle = function() {
	
	// custom css
	$('.ui-pg-selbox').height( ($('.ui-pg-input').outerHeight()) );

	// remove classes
	$('.ui-jqgrid').removeClass('ui-widget ui-widget-content');
	$('.ui-jqgrid-view').children().removeClass('ui-widget-header ui-state-default');
	$('.ui-jqgrid-labels, .ui-search-toolbar').children().removeClass('ui-state-default ui-th-column ui-th-ltr');
	$('.ui-jqgrid-pager').removeClass('ui-state-default');
	$('.ui-jqgrid').removeClass('ui-widget-content');
	
	// add classes
	$('.ui-jqgrid-htable').addClass('table table-bordered table-hover');
	$('.ui-jqgrid-btable').addClass('table table-bordered table-striped');
	
	//paging btn class
	$('.ui-icon.ui-icon-seek-first' ).wrap( '<div class="btn btn-sm btn-default"></div>' );
	$('.ui-icon.ui-icon-seek-first').removeClass().addClass('fa fa-angle-double-left');
	$('.ui-icon.ui-icon-seek-prev' ).wrap( '<div class="btn btn-sm btn-default"></div>' );
	$('.ui-icon.ui-icon-seek-prev').removeClass().addClass('fa fa-angle-left');
	$('.ui-icon.ui-icon-seek-next' ).wrap( '<div class="btn btn-sm btn-default"></div>' );
	$('.ui-icon.ui-icon-seek-next').removeClass().addClass('fa fa-angle-right');
	$('.ui-icon.ui-icon-seek-end' ).wrap( '<div class="btn btn-sm btn-default"></div>' );
	$('.ui-icon.ui-icon-seek-end').removeClass().addClass('fa fa-angle-double-right');
	  
	// clear btn css
	$('.ui-pg-div').removeClass().addClass('btn btn-sm btn-default');
	
	// grid btn css controll
	$('.ui-icon.ui-icon-create').removeClass().parent('.btn-default').removeClass('btn-default').addClass('btn-primary');
	$('.ui-icon.ui-icon-delete').removeClass().parent('.btn-default').removeClass('btn-default').addClass('btn-danger');
	$('.ui-icon.ui-icon-sort').removeClass().parent('.btn-default').removeClass('btn-default').addClass('btn-info');
	$('.ui-icon.ui-icon-excel').removeClass().parent('.btn-default').removeClass('btn-default').addClass('btn-success');
	$('.ui-icon.ui-icon-file-up').removeClass().parent('.btn-default').removeClass('btn-default').addClass('bg-color-purple').addClass('txt-color-white');
	
	$('.ui-pg-selbox').css('height','25px');
	
	
};


/**
 * ==================================================================================
 * Jq Grid search form data restore function
 * ----------------------------------------------------------------------------------
 * 페이지 전환 후 그리드 리스트로 올 경우 검색 폼 데이터 복원
 * ----------------------------------------------------------------------------------
 * @param from_name		원본 폼 명칭
 * @param to_name		대상 폼 명칭
 * ==================================================================================
 */
function cf_jqgridRestoreForm(from_name, to_name) {
	
	var frm_from = $(from_name);
	var frm_to = $(to_name);
	
	frm_to.find('input[type="hidden"], input[type="text"], input[type="number"], select').each(function() {
		
		if (this.name === null || this.name === undefined || this.name === '') {
			return;
		}
		
		var name = $(this).attr('name');
		var $obj_search = frm_from.find('input[name="search_info['+name+']"]');
		
		if($obj_search.length > 0) {
			
			if($(this).is('select')) {
				$(this).val($obj_search.val()).prop('selected', 'selected');
			}
			else if($(this).attr('type') == 'radio') {
				$(this).val($obj_search.val()).prop('selected', 'selected');
			}
			else if($(this).attr('type') == 'checkbox') {
				$(this).val($obj_search.val()).prop('checked', 'checked');
			}
			else {
				if($(this).hasClass('datepicker')) {
					if($obj_search.val() != null && $obj_search.val() != '') {
						$(this).val($obj_search.cvtDateHyphen());
					}
				}
				else {
					$(this).val($obj_search.val());
				}
			}
		}
	});
}

function cf_resizeHBox(obj) {
	//var bdiv_width = $('.ui-jqgrid-bdiv').css('width');
	//$('.ui-jqgrid-hbox').css('width', bdiv_width);
	
	var bdiv_width = obj.find('.ui-jqgrid-bdiv').css('width');
	obj.find('.ui-jqgrid-hbox').css('width', bdiv_width);
	obj.find('.ui-jqgrid-hbox').css('padding-right', 0);
}

$.fn.resizeHBox = function() {
	var bdiv_width = $(this).find('.ui-jqgrid-bdiv').css('width');
	$(this).find('.ui-jqgrid-hbox').css('width', bdiv_width);
}


/**
 * ==================================================================================
 * Jq Grid set frmKeepParam function
 * ----------------------------------------------------------------------------------
 * 페이지 전환 후 그리드 리스트로 올 경우 검색 및 그리드 정보 유지
 * ----------------------------------------------------------------------------------
 * @param form_name		폼 명칭
 * @param postData		그리드 포스트 데이터
 * ==================================================================================
 */
$.fn.jqgridRestoreParam = function(form_name, postData) {
	
	var obj = this;
	var param_sidx = $(form_name).find('input[name=sidx]');
	var param_sord = $(form_name).find('input[name=sord]');
	var param_page = $(form_name).find('input[name=page]');
	var param_rows = $(form_name).find('input[name=rows]');
	
	/* PAGE_INFO : 현재 정렬 정보 */
	if( param_sidx.val() != undefined ) {
		postData.sidx = param_sidx.val();
		postData.sord = param_sord.val();	
	}
	
	/* PAGE_INFO : 현재 페이지 정보 */
	if( param_page.val() != undefined ) {
		postData.page = parseInt(param_page.val());
	}
	
	/* PAGE_INFO : 페이지 아이템 정보 */
	if( param_rows.val() != undefined ) {
		$(obj).find('.ui-pg-selbox').val(param_rows.val()).attr('selected', 'selected');
		postData.rows = parseInt(param_rows.val());
		$(obj).jqGrid('setGridParam', {'rowNum' : parseInt(param_rows.val()) });
	}
	
	/* 유지 정보 초기화 */
	$(form_name).empty();
};



function cf_setSort(objName) {
	
	var obj = $('#' + objName);
	
	var postData = obj.jqGrid("getGridParam", "postData");
	obj.jqGrid('setGridParam', {sortname: postData.sidx, sortorder: postData.sord});
	
	var sortObj = $('.ui-jqgrid-htable').find('#'+objName+'_'+postData.sidx);
	sortObj.attr('aria-selected','false');
	$('.ui-jqgrid-htable').find('span[sort=asc]').addClass('ui-state-disabled');
	$('.ui-jqgrid-htable').find('span[sort=desc]').addClass('ui-state-disabled');
	sortObj.find('span[sort='+postData.sord+']').removeClass('ui-state-disabled');
}


/**
 * ==================================================================================
 * 다이얼 로그 타이틀 스타일 변경 스크립트(공용)
 * ==================================================================================
 */
$.widget('ui.dialog', $.extend({}, $.ui.dialog.prototype, {
	_title : function(title) {
		if (!this.options.title) {
			title.html('&#160;');
		} else {
			title.html(this.options.title);
		}
	}
}));


/**
 * ==================================================================================
 * 차트 레전드 템플릿 생성
 * ==================================================================================
 */
function f_legendTemplate(target, data) {
    target.text('');		// string reset
	target.css('padding-top','15px');
	target.css('text-align','center');
	
    var datasets = data.datasets;
    if(datasets == null){datasets=data;}  // pie chart do not have datasets
    datasets.forEach(function(item) {
    	var bgcolor = item.hasOwnProperty('strokeColor') ? item.strokeColor : item.color;
    	var span = $('<span>');
    	
    	span.addClass('label');
    	span.css('background-color',bgcolor);
    	span.html('&nbsp;');
    	
    	var text = $('<span>');
    	text.css('padding','0 7px');
    	text.html(item.label);
    	
    	target.append(span);
    	target.append(text);
    });
}

/**
 * ==================================================================================
 * URL 강제 이동
 * ==================================================================================
 */
function cf_setUrl(url, params) {
	window.location.href = main_index_url + '#' + url;
	window.location.hash = url;
	loadURL(url + '?' + params, $('#content'));
	cf_setNav(url);
}


/**
 * ==================================================================================
 * 왼쪽 나비게이션 메뉴 컨트롤(URL 강제 이동 후 호출 해야 함!)
 * ==================================================================================
 */
function cf_setNav(url) {
	$('nav li.active').removeClass("active");
	$('nav li:has(a[href="' + url + '"])').addClass("active");
	$('nav ul:has(a[href="' + url + '"])').css('display', 'block');
	var title = ($('nav a[href="' + url + '"]').attr('title'));
	document.title = (title || document.title);
	
	$('nav ul').find("li.active").each(function() {
		$(this).parents("ul").slideDown(menu_speed);
		$(this).parents("ul").parent("li").find("b:first").html('<em class="fa fa-minus-square-o"></em>');
		$(this).parents("ul").parent("li").addClass("open");
	});
	drawBreadCrumb();
}

/**
 * ==================================================================================
 * 이메일 오브젝트 생성
 * ==================================================================================
 */
function cf_serializeEmailObject(objList) {
	var rtn = '';
	var chk_email = objList[2];
	
	if($(chk_email).val() == 'etc') {
		rtn = $(objList[0]).val() + '@' + $(objList[1]).val(); 
	}
	else {
		rtn = $(objList[0]).val() + '@' + $(objList[2]).val();
	}
	
	return rtn;
}

/**
 * ==================================================================================
 * 이메일 분활 및 정보 셋팅
 * ==================================================================================
 */
function cf_setSplitEmail(val, objList) {
	
	if(val == null || val == '') {
		val = '@';
	}
	
	var tmp_email =  val.split('@');
	
	main_email = objList[0];
	sub_email = objList[1];
	sel_email = objList[2];
	
	var chkF = false;
	sel_email.children().each(function(i){
		if( $(this).val() == tmp_email[1] ) {
			chkF = true;
			return false;
		}
	});
	
	main_email.val(tmp_email[0]);
	
	if(chkF) {
		sel_email.val(tmp_email[1]).prop('selected', 'selected');
	}
	else {
		sub_email.val(tmp_email[1]);
	}
}


/**
 * ==================================================================================
 * from - to 날짜 밸리데이션 체크
 * ==================================================================================
 */
function cf_validDate(fromObj, toObj) {
	
	var from_date_val = fromObj.val();
	var to_date_val = toObj.val();
	
	if(cf_isEmpty(from_date_val) && !cf_isEmpty(to_date_val)) {
		alert('종료일을 입력해 주세요');
		toObj.focus();
		return false;
	}
	
	if(!cf_isEmpty(from_date_val) && cf_isEmpty(to_date_val)) {
		alert('시작일을 입력해 주세요');
		fromObj.focus();
		return false;
	}
	
	return true;
}

/**
 * ==================================================================================
 * from - to 날짜 Over 체크
 * ==================================================================================
 */
function cf_overDate(fromObj, toObj) {
	
	var from_date_val = fromObj.val();
	var to_date_val = toObj.val();
	
	var int_from_date_val = parseInt( from_date_val.replace(/\-/g,'') );
	var int_to_date_val = parseInt( to_date_val.replace(/\-/g,'') );
	
	if(int_from_date_val > int_to_date_val) {
		if(from_date_val.length < 10) {
			alert('종료월이 시작월 보다 앞에 있을 수 없습니다.');
			return false;
		}
		else {
			alert('종료일이 시작일 보다 앞에 있을 수 없습니다.');
			return false;
		}
	}
	
	return true;
}

/**
 * ==================================================================================
 * 입력한 data의 byte를 지정한 element의 text로 표시
 * ----------------------------------------------------------------------------------
 * @param input_target		byte 추출할 입력box
 * @param setObj			byte 표시될 obj
 * ==================================================================================
 */
function cf_setInputBytes(input_target, setObj) {
	
	
	var $obj;
	
	if(input_target instanceof jQuery) {
		$obj = input_target
	}
	else {
		$obj = $(input_target)
	}
	
	var data_bytes = $obj.getBytesNoTrim();
	
	setObj.text(data_bytes);
}

/**
 * ==================================================================================
 * 이미지 파일 업로드
 * ----------------------------------------------------------------------------------
 * @param inputFile
 * @param rsutCd
 * ==================================================================================
 */
function cf_fileUpload(inputFile, imgRsutCd, uploadUrl) {
			
	var fileData = inputFile.get(0).files[0];
	var formData = new FormData();
	
	if(cf_getFileExt(fileData.name) == 'jpg' || cf_getFileExt(fileData.name) == 'png') {
	} else {
		alert('파일 업로드는 JPG, PNG 형식만 업로드가 가능합니다.');
		return;
	}
	
	// 파일 사이즈 체크
	if(fileData.size > 512000) {
		alert('500KB 이상의 파일은 업로드 할 수 없습니다.');
		return;
	}
		
	var preview = $('#preview_'+inputFile.attr('id'));
	
	if(preview.find('img').attr('src') != noImgPath) {
		alert('기존 파일을 삭제하고 업로드 하시기 바랍니다.');
		return;
	}
	
	formData.append('file', fileData, encodeURI(fileData.name));
	formData.append('img_rsut_cd', imgRsutCd);
	
	$.ajax({
		url: uploadUrl,
		type: 'POST',
		data: formData,
		dataType: 'json',
		headers: {'AJAX':true},
		cache: false,
		contentType: false,
		processData: false,
		success: function(obj) {
						
			preview.find('img').attr('src',obj.data.img_prvw_url);
			
			var fName = '<p class="alert alert-info bd0">'+fileData.name+'</p>';
			preview.parent().append(fName); 
			
			var span = $('<span>').addClass('btn_del_'+inputFile.attr('id'));
			var aTag = $('<a>')
						.addClass('btn btn-danger btn-sm')
						.attr('href','javascript:cf_fileDelete(\''+inputFile.attr('id')+'\')')
						.text('파일삭제');
			
			var input_rsut_cd = $('<input>')
				.attr('type', 'hidden')
				.attr('name', 'img_rsut_cd')
				.attr('data-serailize-none', 'true')
				.val(obj.data.img_rsut_cd);
			
			var input_local_file_nm = $('<input>')
						.attr('type', 'hidden')
						.attr('name', 'img_local_file_nm')
						.attr('data-serailize-none', 'true')
						.val(obj.data.img_local_file_nm);
			
			var input_source_file_nm = $('<input>')
						.attr('type', 'hidden')
						.attr('name', 'img_source_file_nm')
						.attr('data-serailize-none', 'true')
						.val(obj.data.img_source_file_nm);
			
			span.append(aTag);
			span.append(input_rsut_cd);
			span.append(input_local_file_nm);
			span.append(input_source_file_nm);
			
			// TODO: 추 후 필요한 정보는 더 추가 하여 입력 한다.
						
			var btn_div = inputFile.parent().parent();
			btn_div.find("a").attr("disabled", true);
			btn_div.find("span").attr("disabled", true);
			btn_div.append(span);
		},
		error: function(obj) {
			cf_errMsg(obj);
	    	return;       
		}
	});
}

/**
 * ==================================================================================
 * 이미지 파일 삭제
 * ----------------------------------------------------------------------------------
 * @param name
 * ==================================================================================
 */
function cf_fileDelete(name) {
	var preview = $('#preview_'+name);
	preview.find('img').attr('src',noImgPath);
	preview.parent().find('p').remove();
	var btn_span = $('.btn_del_'+name).parent().find(".btn");
	btn_span.attr("disabled", false);
	btn_span.find("input[type=file]").val("");
	$('.btn_del_'+name).remove();
}


/**
 * ==================================================================================
 * 이미지 파일 정보 셋팅
 * ----------------------------------------------------------------------------------
 * @param id
 * @param item
 * ==================================================================================
 */
function cf_setUploadImg(id, item) {
	
	var preview = $('#preview_'+id);
	
	preview.find('img').attr('src',item.img_prvw_url);
	
	var fName = '<p class="alert alert-info bd0">'+item.img_source_file_nm+'</p>';
	preview.parent().append(fName); 
	
	var span = $('<span>').addClass('btn_del_'+id);
	var aTag = $('<a>')
				.addClass('btn btn-danger btn-sm')
				.attr('href','javascript:cf_cprcomFileDelete(\''+id+'\')')
				.text('파일삭제');
	
	var input_rsut_cd = $('<input>')
		.attr('type', 'hidden')
		.attr('name', 'img_rsut_cd')
		.attr('data-serailize-none', 'true')
		.val(item.img_rsut_cd);
	
	var input_local_file_nm = $('<input>')
				.attr('type', 'hidden')
				.attr('name', 'img_local_file_nm')
				.attr('data-serailize-none', 'true')
				.val(item.img_local_file_nm);
	
	var input_source_file_nm = $('<input>')
				.attr('type', 'hidden')
				.attr('name', 'img_source_file_nm')
				.attr('data-serailize-none', 'true')
				.val(item.img_source_file_nm);
	
	span.append(aTag);
	span.append(input_rsut_cd);
	span.append(input_local_file_nm);
	span.append(input_source_file_nm);
	
	// TODO: 추 후 필요한 정보는 더 추가 하여 입력 한다.
				
	var btn_div = $("#"+id).parent().parent();
	btn_div.find("a").attr("disabled", true);
	btn_div.find("span").attr("disabled", true);
	btn_div.append(span);
}


/**
 * ==================================================================================
 * 이미지 파일 업로드(기관/가맹점)
 * ----------------------------------------------------------------------------------
 * @param inputFile
 * @param rsutCd
 * ==================================================================================
 */
function cf_cprcomFileUpload(inputFile, imgRsutCd, uploadUrl) {
			
	var fileData = inputFile.get(0).files[0];
	var formData = new FormData();
	
	if(cf_getFileExt(fileData.name) != 'png') {
		alert('파일 업로드는 PNG 형식만 업로드가 가능합니다.');
		return;
	}
	
	// 파일 사이즈 체크
	if(fileData.size > 512000) {
		alert('500KB 이상의 파일은 업로드 할 수 없습니다.');
		return;
	}
		
	var preview = $('#preview_'+inputFile.attr('id'));
	
	var up_chk_flag = $('#upload_flag_'+inputFile.attr('id'));
	
	if(preview.find('img').attr('src') != noImgPath) {
		alert('기존 파일을 삭제하고 업로드 하시기 바랍니다.');
		return;
	}
	
	formData.append('file', fileData, encodeURI(fileData.name));
	formData.append('img_rsut_cd', imgRsutCd);
	
	$.ajax({
		url: uploadUrl,
		type: 'POST',
		data: formData,
		dataType: 'json',
		headers: {'AJAX':true},
		cache: false,
		contentType: false,
		processData: false,
		success: function(obj) {
						
			preview.find('img').attr('src',obj.data.img_prvw_url);
			
			var fName = '<p class="alert alert-info bd0">'+fileData.name+'</p>';
			preview.parent().append(fName); 
			
			up_chk_flag.val(true_val);
			
			var span = $('<span>').addClass('btn_del_'+inputFile.attr('id'));
			var aTag = $('<a>')
						.addClass('btn btn-danger btn-sm')
						.attr('href','javascript:cf_cprcomFileDelete(\''+inputFile.attr('id')+'\')')
						.text('파일삭제');
			
			var input_rsut_cd = $('<input>')
				.attr('type', 'hidden')
				.attr('name', 'img_rsut_cd')
				.attr('data-serailize-none', 'true')
				.val(obj.data.img_rsut_cd);
			
			var input_local_file_nm = $('<input>')
						.attr('type', 'hidden')
						.attr('name', 'img_local_file_nm')
						.attr('data-serailize-none', 'true')
						.val(obj.data.img_local_file_nm);
			
			var input_source_file_nm = $('<input>')
						.attr('type', 'hidden')
						.attr('name', 'img_source_file_nm')
						.attr('data-serailize-none', 'true')
						.val(obj.data.img_source_file_nm);
			
			span.append(aTag);
			span.append(input_rsut_cd);
			span.append(input_local_file_nm);
			span.append(input_source_file_nm);
			
			// TODO: 추 후 필요한 정보는 더 추가 하여 입력 한다.
						
			var btn_div = inputFile.parent().parent();
			btn_div.find("a").attr("disabled", true);
			btn_div.find("span").attr("disabled", true);
			btn_div.append(span);
			
		},
		error: function(obj) {
			cf_errMsg(obj);
	    	return;       
		}
	});
}

/**
 * ==================================================================================
 * 이미지 파일 삭제(기관/가맹점)
 * ----------------------------------------------------------------------------------
 * @param name
 * ==================================================================================
 */
function cf_cprcomFileDelete(name) {
	var preview = $('#preview_'+name);
	preview.find('img').attr('src',noImgPath);
	preview.parent().find('p').remove();
	
	var btn_span = $('.btn_del_'+name).parent().find(".btn");
	btn_span.attr("disabled", false);
	btn_span.find("input[type=file]").val("");
	$('.btn_del_'+name).remove();
	
	var up_chk_flag = $('#upload_flag_'+name);
	up_chk_flag.val(false_val);
}

/**
 * ==================================================================================
 * 이미지 파일 정보 셋팅(기관/가맹점)
 * ----------------------------------------------------------------------------------
 * @param id
 * @param item
 * ==================================================================================
 */
function cf_setCprcomUploadImg(id, item) {
	
	var preview = $('#preview_'+id);
	var up_chk_flag = $('#upload_flag_'+id);
	
	preview.find('img').attr('src',item.img_prvw_url);
	
	var fName = '<p class="alert alert-info bd0">'+item.img_source_file_nm+'</p>';
	preview.parent().append(fName); 
	
	if( !cf_isEmpty(item.img_local_file_nm) || !cf_isEmpty(item.img_source_file_nm) || item.rpst_img_yn == true_val ) {
		up_chk_flag.val(false_val);
	}
	else {
		up_chk_flag.val(true_val);
	}
	
	var span = $('<span>').addClass('btn_del_'+id);
	var aTag = $('<a>')
				.addClass('btn btn-danger btn-sm')
				.attr('href','javascript:cf_cprcomFileDelete(\''+id+'\')')
				.text('파일삭제');
	
	var input_rsut_cd = $('<input>')
		.attr('type', 'hidden')
		.attr('name', 'img_rsut_cd')
		.attr('data-serailize-none', 'true')
		.val(item.img_rsut_cd);
	
	var input_local_file_nm = $('<input>')
				.attr('type', 'hidden')
				.attr('name', 'img_local_file_nm')
				.attr('data-serailize-none', 'true')
				.val(item.img_local_file_nm);
	
	var input_source_file_nm = $('<input>')
				.attr('type', 'hidden')
				.attr('name', 'img_source_file_nm')
				.attr('data-serailize-none', 'true')
				.val(item.img_source_file_nm);
	
	span.append(aTag);
	span.append(input_rsut_cd);
	span.append(input_local_file_nm);
	span.append(input_source_file_nm);
	
	// TODO: 추 후 필요한 정보는 더 추가 하여 입력 한다.
				
	var btn_div = $("#"+id).parent().parent();
	btn_div.find("a").attr("disabled", true);
	btn_div.find("span").attr("disabled", true);
	btn_div.append(span);
}

/**
 * ==================================================================================
 * 엑셀파일 업로드 오류난 셀 표시
 * ----------------------------------------------------------------------------------
 * @param gridId
 * @param missListObj
 * ==================================================================================
 */
function cf_setGridXlsUploadErr(gridId, missListObj) {
	
	var jqgridObj = $('#'+gridId);
	
	var ids = jqgridObj.jqGrid('getDataIDs');
	
	var gridData = jqgridObj.jqGrid('getRowData');
				
	$.each(missListObj, function(i, item) {
		// list안에 key, value를 뽑아낸다.
		$.each(missListObj[i], function(key, value) {
			var colName = key;
			var cellData = jqgridObj.jqGrid('getCell', ids[i], colName);
			var errMsg = '';
			if(value == 'M' || value == 'E') {
				if(!cf_isEmpty(cellData)) {
					errMsg = '누락/오류';
				} else {
					errMsg = cellData + '<br>누락/오류';
				}
			}
			
			jqgridObj.jqGrid('setCell', ids[i], colName, errMsg, {'color':'#FF0000'});
		});
	});
	
}