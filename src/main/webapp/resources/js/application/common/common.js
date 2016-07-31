/**
 * ==================================================================================
 * 내정보 수정 화면 close
 * ==================================================================================
 */
function f_myInfoClose() {
	$('#myinfo').slideUp(500);
}

/**
 * ==================================================================================
 * 내정보 수정 화면 open
 * ==================================================================================
 */
function f_myInfoOpen() {
	$('#myinfo').slideDown(500);
}

/**
 * ==================================================================================
 * 정보 셋팅 (내정보 수정 화면)
 * ==================================================================================
 */
function f_myInfoUN() {
	if( $('#myinfo').is(':visible') == false ) {
		
		// 내정보 page open
		f_myInfoOpen();
		
		var frm = $('#frmMyInfoUN');
		
		var send_data = frm.serializeObject();
		
		send_data = $.extend(send_data, session_data);
		
		$.ajax({
		    url: bizUrl + '/staff/show',
		    type: 'GET',
		    async: true,
		    cache: true,
		    datatype: 'json',
		    headers: {'AJAX':true},
		    data: cf_bizGetEncode(send_data),
			beforeSend : function() {
				
				$(':input', frm).each(function() {
				    var type = this.type;
				    if (type == 'text')
				      this.value = "";
				  });
				
				// 전화번호 앞자리(지역번호+기타)
				cf_firstTelNum($('#admin_telnum_f'));
				
				// 휴대폰 앞자리
				cf_firstMobileNum($('#admin_mobi_num_f'));
			},
			success: function(obj) {
				$('#read_admin_id').html(obj.data.login_id + ' ( ' + obj.data.admin_id + ' )');
		    	$('#read_admin_nm').html(obj.data.admin_nm);
		    	$('#admin_id').val(obj.data.admin_id);
		    	$('#admin_nm').val(obj.data.admin_nm);
		    	
		    	var tmp_telnum = cf_cvtNumSplit(obj.data.admin_telnum, 'tel');
		    	
		    	$('#admin_telnum_f').val(tmp_telnum.f_num).prop('selected', 'selected');
		    	$('#admin_telnum_m').val(tmp_telnum.m_num);
		    	$('#admin_telnum_l').val(tmp_telnum.l_num);
		    	
				var tmp_mobi_num = cf_cvtNumSplit(obj.data.admin_mobi_num, 'mobile');
		    	
		    	$('#admin_mobi_num_f').val(tmp_mobi_num.f_num).prop('selected', 'selected');
		    	$('#admin_mobi_num_m').val(tmp_mobi_num.m_num);
		    	$('#admin_mobi_num_l').val(tmp_mobi_num.l_num);
		    	
		    	$('input[name=admin_email]').val(obj.data.admin_email);
			},
			error: function(obj) {
				cf_errMsg(obj);
		    	return;
		    },
		    complete: function() {
		    	
		    }
		});
	}
}

/**
 * ==================================================================================
 * 데이터 수정 스크립트
 * ----------------------------------------------------------------------------------
 * 데이터 수정
 * - 밸리데이션 체크
 * - 데이터 등록 실행
 * ==================================================================================
 */
function f_myInfoUpd() {
	var frm = $('#frmMyInfoUN');

	// 벨리데이터 검사 진행
	if(frm.formValid()) {
		
		// ----------- 조건부 벨리데이션 검사 영역 시작 ----------- //
		
		// ----------- 조건부 벨리데이션 검사 영역 종료 ----------- //
		
		if(confirm("모든 항목을 정확히 입력하셨습니까?")) {
			
			var send_data = frm.serializeObject();
			send_data['admin_telnum'] = send_data.admin_telnum_f + '-' + send_data.admin_telnum_m + '-' + send_data.admin_telnum_l;
			send_data['admin_mobi_num'] = send_data.admin_mobi_num_f + '-' + send_data.admin_mobi_num_m + '-' + send_data.admin_mobi_num_l;
			
			// 실제 데이터 전송
			$.ajax({
				url: bizUrl + '/staff/update',
			    type: 'POST',
			    async: true,
			    cache: false,
			    datatype: 'json',
			    headers: {'AJAX':true},
			    contentType: 'application/json;charset=utf-8',
			    data: cf_bizPostEncode(send_data),
			    beforeSend : function() {
			    },
			    success: function(obj){
			    	cf_successMsg(obj);
			    },
			    error: function(obj) {
			    	cf_errMsg(obj);
			    	return;
			    }
			});
		}
	}
}

/**
 * ==================================================================================
 * 데이터 수정 스크립트(내정보 화면 비밀번호 변경)
 * ----------------------------------------------------------------------------------
 * 데이터 수정
 * - 밸리데이션 체크
 * - 데이터 등록 실행
 * ==================================================================================
 */
function f_myInfoPwdUpd() {
	var frm = $('#frmAdminPwdUD');

	// 벨리데이터 검사 진행
	if(frm.formValid()) {
		
		// ----------- 조건부 벨리데이션 검사 영역 시작 ----------- //
		
		var new_pwd = $('input[name=new_pwd]').val();
		var new_pwd_confirm = $('input[name=pwd_confirm]').val();
		if(new_pwd !== new_pwd_confirm) {
			alert('새 비밀번호와 일치하지 않습니다. 비밀번호를 다시 한번 확인해 주세요.');
			return;
		}
		
		if( !cf_chkPwdPatten(new_pwd) ) {
			alert('사용할 수 없는 비밀번호를 입력하셨습니다. 비밀번호를 다시 한번 확인해 주세요.');
			return;
		}
		
		// ----------- 조건부 벨리데이션 검사 영역 종료 ----------- //
		
		if(confirm("모든 항목을 정확히 입력하셨습니까?")) {
			
			var send_data = frm.serializeObject();
			
			send_data = $.extend(session_data, send_data);
			
			// 실제 데이터 전송
			$.ajax({
				url: bizUrl + '/staff/pwd/update',
			    type: 'POST',
			    async: true,
			    cache: false,
			    datatype: 'json',
			    headers: {'AJAX':true},
			    contentType: 'application/json;charset=utf-8',
			    data: cf_bizPostEncode(send_data),
			    beforeSend : function() {
			    },
			    success: function(obj){
			    	cf_successMsg(obj);
			    	$('#change_pwd_ud').dialog('close');
			    },
			    error: function(obj) {
			    	cf_errMsg(obj);
			    	return;
			    }
			});
		}
	}
}
	
/**
 * ==================================================================================
 * 내정보 수정 page 비밀번호 변경 다이얼 로그 설정
 * ----------------------------------------------------------------------------------
 * 다이얼 로그 오픈클릭 이벤트와 다이얼 로그 정보로 구성 함
 * ==================================================================================
 */
function f_openPwdUD() {
	var opt = {
		autoOpen : false,
		resizable : false,
		modal : true,
		width : 1024,
		minHeight : 768,
		title : '<div class="widget-header"><h4><i class="icon-ok"></i> 비밀번호변경 </h4></div>',
		buttons : [{
			html : '취소',
			'class' : 'btn btn-default',
			click : function() {
				if(confirm("취소하시면 입력한 내용이 삭제됩니다. \n취소하시겠습니까?")) {
					$(this).dialog('close');
				}
			}
		},
		{
			html : '확인',
			'class' : 'btn btn-primary',
			click : function() {
				f_myInfoPwdUpd();
			}
		}]
	};
	
	// dialog clear
	var $target = $('#change_pwd_ud');
	$target.empty();
	
	var send_data = {
		frm_target : ''
	}
	
	$.ajax({
		url: viewUrl + '/common/changePwdUD',
		type: 'GET',
		async: true,
		cache: true,
		headers: {'AJAX':true},
		data : send_data,
		success: function(data) {
			$target.html(data);
		},
		error: function(obj) {
			cf_errViewDialog(obj, $target);
	    }
	});
	var changeDialog = $('#change_pwd_ud').dialog(opt);
	changeDialog.dialog("open");
	return false;
}

/**
 * ==================================================================================
 * main left menu script
 * ==================================================================================
 */
var getMainMenuTree = function (itemData,idx) {
	
	var item;

	if (itemData.menu_items.length > 0) {
		var a = $('<a/>').attr('href','#');
		if(idx == 0) {
			var i = $('<i/>').addClass('fa fa-lg fa-fw ' + itemData.menu_icon_nm);
			var span = $('<span/>').addClass('menu-item-parent').append(itemData.menu_nm);
			a.append(i, span);
		} 
		else {
			a.append(itemData.menu_nm);
		}
		item = $("<li/>").append(a);
	} 
	else {
		var a = $('<a/>').attr('href',itemData.url).attr('title', itemData.menu_nm);
		
		if(itemData.menu_id == '10100000') {
			var i = $('<i/>').addClass('fa fa-lg fa-fw fa-home');
			var span = $('<span/>').addClass('menu-item-parent').append(itemData.menu_nm);
			a.append(i, span);
		}
		else {
			a.append(i, itemData.menu_nm);
			if(idx == 0) {
				var i = $('<i/>').addClass('fa fa-lg fa-fw ' + itemData.menu_icon_nm);
				a.prepend(i);
			}
		}
		item = $('<li/>').append(a);
	}
	
    if (itemData.menu_items.length > 0) {
        var subList = $('<ul/>');
        $.each(itemData.menu_items, function () {
            subList.append(getMainMenuTree(this,(idx+1)));
        });
        item.append(subList);
    }
    return item;
};

/**
 * ==================================================================================
 * 회원검색 다이얼 로그 설정
 * ----------------------------------------------------------------------------------
 * 다이얼 로그 오픈클릭 이벤트와 다이얼 로그 정보로 구성 함
 * ==================================================================================
 */
function f_openMemberSearchRD(frmTarget) {
	// dialog clear
	var $target = $('#member_search_rd');
	$target.empty();
	
	var send_data = {
		frm_target : frmTarget
	}
	
	$.ajax({
		url: viewUrl + '/common/member/searchRD',
		type: 'GET',
		async: true,
		cache: true,
		headers: {'AJAX':true},
		data : send_data,
		success: function(data) {
			$target.html(data);
		},
		error: function(obj) {
			cf_errViewDialog(obj, $target);
	    }
	});
	$('#member_search_rd').dialog('open');
	return false;
}

/**
 * ==================================================================================
 * 비밀번호 변경 다이얼 로그 설정
 * ----------------------------------------------------------------------------------
 * 다이얼 로그 오픈클릭 이벤트와 다이얼 로그 정보로 구성 함
 * ==================================================================================
 */
function f_openChagePwdUD(frmTarget) {
	// dialog clear
	var $target = $('#change_pwd_ud');
	$target.empty();
	
	var send_data = {
		frm_target : frmTarget
	}
	
	$.ajax({
		url: viewUrl + '/common/changePwdUD',
		type: 'GET',
		async: true,
		cache: true,
		headers: {'AJAX':true},
		data : send_data,
		success: function(data) {
			$target.html(data);
		},
		error: function(obj) {
			cf_errViewDialog(obj, $target);
	    }
	});
	$('#change_pwd_ud').dialog('open');
	return false;
}


/**
 * ==================================================================================
 * 검색 액션(function search member name)
 * ==================================================================================
 */
function f_commMemberSearch() {
	
	// ------------------ 검색 벨리데이트 시작 ------------------ //
	
	if($("#frmCommMemberSearch").searchValid() != true) {
		return;
	}
	
	var num = parseInt($("#frmCommMemberSearch").find('input[name=mobi_telnum]').getBytes());
	
	if(num < 9 && num > 0) {
		alert('전화번호는 9자리 이상 입력해 주시기 바랍니다.'); 
		return;
		
	}
	
	var nm = $("#frmCommMemberSearch").find('input[name=mbr_nm]').val();
	if(nm.length < 2 && nm.length > 0) {
		alert('회원명은 2글자 이상 입력 하시기 바랍니다.');
		return;
	}

	// ------------------ 검색 벨리데이트 종료 ------------------ //
	
	// 검색 폼 데이터 추출
	var searchData = $("#frmCommMemberSearch").serializeObject();
	
	// 검색 사용 중으로 변경
	$("#member_search_jqgrid").jqGrid('setGridParam', {search: true});
	
	// 첫 페이지 셋팅
	$("#member_search_jqgrid").jqGrid('setGridParam', {page: 1});
	
	// setGridParam을 이용해서 postData에 새로 설정해준 postData의 search에 설정 후 그리드를 다시 불러온다.
	$("#member_search_jqgrid").jqGrid('setGridParam', {'postData' : {'search_info':searchData} }).trigger('reloadGrid');
}

/**
 * ==================================================================================
 * 회원검색 다이얼 로그 설정
 * ----------------------------------------------------------------------------------
 * 다이얼 로그 오픈클릭 이벤트와 다이얼 로그 정보로 구성 함
 * ==================================================================================
 */
function f_openAdminSearchRD(frmTarget) {
	// dialog clear
	var $target = $('#admin_search_rd');
	$target.empty();
	
	var send_data = {
		frm_target : frmTarget
	}
	
	$.ajax({
		url: viewUrl + '/common/admin/searchRD',
		type: 'GET',
		async: true,
		cache: true,
		headers: {'AJAX':true},
		data : send_data,
		success: function(data) {
			$target.html(data);
		},
		error: function(obj) {
			cf_errViewDialog(obj, $target);
	    }
	});
	$('#admin_search_rd').dialog('open');
	return false;
}

/**
* ==================================================================================
* 검색 액션(function search member name)
* ==================================================================================
*/
function f_commAdminSearch() {
	
	// ------------------ 검색 벨리데이트 시작 ------------------ //
	
	if($("#frmCommonAdminSearch").searchValid() != true) {
		return;
	}

	// ------------------ 검색 벨리데이트 종료 ------------------ //
	
	// 검색 폼 데이터 추출
	var searchData = $("#frmCommonAdminSearch").serializeObject();
	
	// 검색 사용 중으로 변경
	$("#admin_search_jqgrid").jqGrid('setGridParam', {search: true});
	
	// 첫 페이지 셋팅
	$("#admin_search_jqgrid").jqGrid('setGridParam', {page: 1});
	
	// setGridParam을 이용해서 postData에 새로 설정해준 postData의 search에 설정 후 그리드를 다시 불러온다.
	$("#admin_search_jqgrid").jqGrid('setGridParam', {'postData' : {'search_info':searchData} }).trigger('reloadGrid');
}

/**
 * ==================================================================================
 * 검색 다이얼 로그 설정
 * ----------------------------------------------------------------------------------
 * 다이얼 로그 오픈클릭 이벤트와 다이얼 로그 정보로 구성 함
 * ==================================================================================
 */
function f_openMchtSearchRD(frmTarget) {
	// dialog clear
	var $target = $('#mcht_search_rd');
	$target.empty();
	
	var send_data = {
		frm_target : frmTarget,
		up_mcht_id : $('#'+frmTarget).find('select[name=up_mcht_id]').val()
	}
	
	$.ajax({
		url: viewUrl + '/common/mcht/searchRD',
		type: 'GET',
		async: true,
		cache: true,
		headers: {'AJAX':true},
		data : send_data,
		success: function(data) {
			$target.html(data);
		},
		error: function(obj) {
			cf_errViewDialog(obj, $target);
	    }
	});
	$('#mcht_search_rd').dialog('open');
	return false;
}

/**
* ==================================================================================
* 검색 액션(function search member name)
* ==================================================================================
*/
function f_commMchtSearch() {
	
	// ------------------ 검색 벨리데이트 시작 ------------------ //
	
	if($("#frmCommMchtSearch").searchValid() != true) {
		return;
	}

	// ------------------ 검색 벨리데이트 종료 ------------------ //
	
	// 검색 폼 데이터 추출
	var searchData = $("#frmCommMchtSearch").serializeObject();
	
	// 검색 사용 중으로 변경
	$("#mcht_search_jqgrid").jqGrid('setGridParam', {search: true});
	
	// 첫 페이지 셋팅
	$("#mcht_search_jqgrid").jqGrid('setGridParam', {page: 1});
	
	// setGridParam을 이용해서 postData에 새로 설정해준 postData의 search에 설정 후 그리드를 다시 불러온다.
	$("#mcht_search_jqgrid").jqGrid('setGridParam', {'postData' : {'search_info':searchData} }).trigger('reloadGrid');
}

/**
 * ==================================================================================
 * 검색 다이얼 로그 설정
 * ----------------------------------------------------------------------------------
 * 다이얼 로그 오픈클릭 이벤트와 다이얼 로그 정보로 구성 함
 * ==================================================================================
 */
function f_openInstiSearchRD(frmTarget) {
	// dialog clear
	var $target = $('#insti_search_rd');
	$target.empty();
	
	var send_data = {
		frm_target : frmTarget
	}
	
	$.ajax({
		url: viewUrl + '/common/insti/searchRD',
		type: 'GET',
		async: true,
		cache: true,
		headers: {'AJAX':true},
		data : send_data,
		success: function(data) {
			$target.html(data);
		},
		error: function(obj) {
			cf_errViewDialog(obj, $target);
	    }
	});
	$('#insti_search_rd').dialog('open');
	return false;
}

/**
* ==================================================================================
* 검색 액션(function search frmCommInstiSearch)
* ==================================================================================
*/
function f_commInstiSearch() {
	
	// ------------------ 검색 벨리데이트 시작 ------------------ //
	
	if($("#frmCommInstiSearch").searchValid() != true) {
		return;
	}

	// ------------------ 검색 벨리데이트 종료 ------------------ //
	
	// 검색 폼 데이터 추출
	var searchData = $("#frmCommInstiSearch").serializeObject();
	
	// 검색 사용 중으로 변경
	$("#insti_search_jqgrid").jqGrid('setGridParam', {search: true});
	
	// 첫 페이지 셋팅
	$("#insti_search_jqgrid").jqGrid('setGridParam', {page: 1});
	
	// setGridParam을 이용해서 postData에 새로 설정해준 postData의 search에 설정 후 그리드를 다시 불러온다.
	$("#insti_search_jqgrid").jqGrid('setGridParam', {'postData' : {'search_info':searchData} }).trigger('reloadGrid');
}

/**
 * ==================================================================================
 * 검색 다이얼 로그 설정
 * ----------------------------------------------------------------------------------
 * 다이얼 로그 오픈클릭 이벤트와 다이얼 로그 정보로 구성 함
 * ==================================================================================
 */
function f_openIndustrySearchRD(frmTarget) {
	// dialog clear
	var $target = $('#industry_search_rd');
	$target.empty();
	
	var send_data = {
		frm_target : frmTarget
	}
	
	$.ajax({
		url: viewUrl + '/common/industry/searchRD',
		type: 'GET',
		async: true,
		cache: true,
		headers: {'AJAX':true},
		data : send_data,
		success: function(data) {
			$target.html(data);
		},
		error: function(obj) {
			cf_errViewDialog(obj, $target);
	    }
	});
	$('#industry_search_rd').dialog('open');
	return false;
}

/**
* ==================================================================================
* 검색 액션(function search member name)
* ==================================================================================
*/
function f_commIndustrySearch() {
	
	// ------------------ 검색 벨리데이트 시작 ------------------ //
	
	if($("#frmCommIndustrySearch").searchValid() != true) {
		return;
	}

	// ------------------ 검색 벨리데이트 종료 ------------------ //
	
	// 검색 폼 데이터 추출
	var searchData = $("#frmCommIndustrySearch").serializeObject();
	
	// 검색 사용 중으로 변경
	$("#industry_search_jqgrid").jqGrid('setGridParam', {search: true});
	
	// 첫 페이지 셋팅
	$("#industry_search_jqgrid").jqGrid('setGridParam', {page: 1});
	
	// setGridParam을 이용해서 postData에 새로 설정해준 postData의 search에 설정 후 그리드를 다시 불러온다.
	$("#industry_search_jqgrid").jqGrid('setGridParam', {'postData' : {'search_info':searchData} }).trigger('reloadGrid');
}

/**
 * ==================================================================================
 * 검색 다이얼 로그 설정
 * ----------------------------------------------------------------------------------
 * 다이얼 로그 오픈클릭 이벤트와 다이얼 로그 정보로 구성 함
 * ==================================================================================
 */
function f_openRpstMchtSearchRD(frmTarget) {
	// dialog clear
	var $target = $('#rpst_mcht_search_rd');
	$target.empty();
	
	var send_data = {
		frm_target : frmTarget
	}
	
	$.ajax({
		url: viewUrl + '/common/rpst/mcht/searchRD',
		type: 'GET',
		async: true,
		cache: true,
		headers: {'AJAX':true},
		data : send_data,
		success: function(data) {
			$target.html(data);
		},
		error: function(obj) {
			cf_errViewDialog(obj, $target);
	    }
	});
	$('#rpst_mcht_search_rd').dialog('open');
	return false;
}

/**
* ==================================================================================
* 검색 액션(function search member name)
* ==================================================================================
*/
function f_commRpstMchtSearch() {
	
	// ------------------ 검색 벨리데이트 시작 ------------------ //
	
	if($("#frmCommRpstMchtSearch").searchValid() != true) {
		return;
	}

	// ------------------ 검색 벨리데이트 종료 ------------------ //
	
	// 검색 폼 데이터 추출
	var searchData = $("#frmCommRpstMchtSearch").serializeObject();
	
	// 검색 사용 중으로 변경
	$("#rpstMcht_search_jqgrid").jqGrid('setGridParam', {search: true});
	
	// 첫 페이지 셋팅
	$("#rpstMcht_search_jqgrid").jqGrid('setGridParam', {page: 1});
	
	// setGridParam을 이용해서 postData에 새로 설정해준 postData의 search에 설정 후 그리드를 다시 불러온다.
	$("#rpstMcht_search_jqgrid").jqGrid('setGridParam', {'postData' : {'search_info':searchData} }).trigger('reloadGrid');
}

/**
 * ==================================================================================
 * ----------------------------------------------------------------------------------
 * 다이얼 로그 오픈클릭 이벤트와 다이얼 로그 정보로 구성 함
 * ==================================================================================
 */
function f_openTxnInfoRD(trsmsgTracNum, frmTarget) {
	// dialog clear
	var $target = $('#txn_info_rd');
	$target.empty();
	
	var send_data = {
		trsmsg_trac_num : trsmsgTracNum,
		mbr_pmt_id : trsmsgTracNum,
		frm_target : frmTarget
	}
	
	$.ajax({
		url: viewUrl + '/common/transaction/infoRD',
		type: 'GET',
		async: true,
		cache: true,
		headers: {'AJAX':true},
		data : send_data,
		success: function(data) {
			$target.html(data);
		},
		error: function(obj) {
			cf_errViewDialog(obj, $target);
	    }
	});
	$('#txn_info_rd').dialog('open');
	return false;
}



/**
 * ==================================================================================
 * 등록
 * ==================================================================================
 */
function f_pntCancel(){
	
	var mbr_id = $('input[name=mbr_id_pnt_cancel]').val(),
		pmt_req_id = $('input[name=pmt_req_id_pnt_cancel]').val();	
		
	
	if(confirm(' 진행하시겠습니까?')) {
		
		var send_data = {
				mbr_id : mbr_id,
				pmt_req_id : pmt_req_id
		};
		 
		// 데이터 등록
		$.ajax({
		    url: bizUrl + '/transaction/merchant/detail/pnt/cancel',
		    type: 'POST',
		    async: true,
		    cache: false,
		    datatype: 'json',
		    headers: {'AJAX':true},
		    contentType: 'application/json;charset=utf-8',
		    data: cf_bizPostEncode(send_data),
		    beforeSend : function() {
			},
		    success: function(obj){
		    	cf_successMsg(obj);
		    },
		    error: function(obj) {
		    	cf_errMsg(obj);
		    },
		    complete: function() {
		    	
		    }
		});
	}
}

/**
 * ==================================================================================
 * 그리드 데이터 셋팅
 * ==================================================================================
 */
function txn_info_jqgrid_function(jsonObj) {
	
	// jqgrid clear (don't remove!)
	$('#txn_info_jqgrid').clearGridData();
	
	// grid resize target object (don't remove!)
	var jqgrid_section = $('#txn_info_jqgrid_section');
	
	if(jsonObj.length < 1) {
		return false;
	}

	// jqgrid load (don't remove!)
	$("#txn_info_jqgrid").jqGrid({
		colNames: ['No.', '요청일시', '구분', '응답코드'],
		colModel: [
			{ name : 'no',					index : 'no',					sortable : false,	width : cf_setJqGridWidth(jqgrid_section, 10),	align:'center' },
			{ name : 'rgst_dtime',			index : 'rgst_dtime',			sortable : false,	width : cf_setJqGridWidth(jqgrid_section, 20),	align:'center', classes:'ui-ellipsis'}, 
			{ name : 'run_trsmsg_work_cd',	index : 'run_trsmsg_work_cd',	sortable : false,	width : cf_setJqGridWidth(jqgrid_section, 50),	classes:'ui-ellipsis' },
			{ name : 'trsmsg_rst_cd',		index : 'trsmsg_rst_cd',		sortable : false,	width : cf_setJqGridWidth(jqgrid_section, 20),	align:'center', classes:'ui-ellipsis' }
		],
		datatype: 'local',
		data: jsonObj,
		height: '142',
		scrollrows: true,
		recordpos : 'left',
		viewsortcols: [true, 'vertical', true],
		multiselect: false,			// 멀티 셀렉트 적용
		shrinkToFit: true,			// 가로 스펙 픽스
		footerrow: false, 			// 풋터 로우 옵션
		userDataOnFooter: false,	// 풋터 로우 옵션
		gridComplete: function(){
			$('#txn_info_jqgrid').setGridWidth(jqgrid_section.width(), true);
		}

	});
	
	// $('#txn_info_jqgrid').jqgridBtnOption();
	
	// jqgrid css setting (don't remove!)
	$('#txn_info_jqgrid').jqgridStyle();
  	  
    // jqgrid resizing (don't remove!)
	$(window).on('resize.jqGrid', function () {
		$('#txn_info_jqgrid').setGridWidth(jqgrid_section.width(), true);
	});
	
};

/**
 * ==================================================================================
 * 비밀번호 패턴 확인(상세, 수정 화면에서 사용)
 * ==================================================================================
 */
function f_chkPwd(obj) {
	
	var obj_val = $(obj).val();
	var obj_note =  $('#note_pwd');
	
	if( cf_chkPwdPatten(obj_val) == true ) {
		obj_note.removeClass().addClass('note txt-color-green');
		obj_note.html('사용 가능 합니다.');	
	}
	else{
		if(obj_val.length > 0) {
			obj_note.removeClass().addClass('note txt-color-red');
			obj_note.html('사용 할 수 없습니다.');
		} else {
			obj_note.html('');
		}
	}
}

/**
 * ==================================================================================
 * 홈 버튼 클릭시 데쉬보드 이동
 * ==================================================================================
 */
function f_lnkDashBoard() {
	var url = init_page;
	var params = '';
	cf_setUrl(url, params);
}

/**
 * ==================================================================================
 * selectbox 구현
 * ==================================================================================
 */
function f_getMchtRpstList() {
	var send_data = {
		paging_use_yn : 'N'		
	};
	
	$.ajax({
		url: bizUrl + '/cprcom/merchant/rpst/search',
		type: 'GET',
		async: false,
		cache: true,
		headers: {'AJAX':true},
		data: cf_bizGetEncode(send_data),
		beforeSend : function() {
			
		},
		success: function(obj) {
			rpst_list = obj.data.rpst_list; 
			
			var target = $('#up_mcht_id');
			var opt = '';
			
			if(rpst_list) {
				$.each(rpst_list, function(i, item) {
					opt = $('<option></option>');
					opt.val(item.mcht_id);
					opt.text(item.mcht_nm);
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
