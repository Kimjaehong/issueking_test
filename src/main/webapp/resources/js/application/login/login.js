/**
 * ==================================================================================
 * 로그인
 * ==================================================================================
 */
/*function f_login(){
	
	var frm = $("#frmLogin");
	var send_data = frm.serializeObject();
	
	//frm.find('.btn-primary').addClass('disabled');
	
	$.ajax({
		url: bizUrl + '/user/login',
		type: 'POST',
		async: true,
	    cache: false,
	    datatype: 'json',
	    headers: {'AJAX':true},
	    contentType: 'application/json;charset=utf-8',
		data: cf_bizPostEncode(send_data),
		success: function(obj) {
			if(obj.data.fst_conn_msg) {
				alert(cf_cvtMsg(obj.data.fst_conn_msg));
			}
			location.href = obj.data.redirect_url;
		},
		error: function(obj) {
			cf_errMsg(obj);
			frm.find('.btn-primary').removeClass('disabled');
	    },
	});
	
}*/

/**
 * ==================================================================================
 * 회원가입 화면 열기 / 로그인화면 닫기
 * ==================================================================================
 */
function f_signUpOpen() {
	$('#main').hide();
	$('#signUp').slideDown(500);
}

/**
 * ==================================================================================
 * 로그인 화면 열기 / 회원가입화면 닫기
 * ==================================================================================
 */
function f_signUpCancel() {
	$('#signUp').hide();
	$('#main').slideDown(500);
}

/**
 * ==================================================================================
 * 회원가입
 * ==================================================================================
 */
function f_signUp(){
	
	var frm = $("#frmSignUp");
	var send_data = frm.serializeObject();
	
	//frm.find('.btn-primary').addClass('disabled');
	
	$.ajax({
		url: bizUrl + '/user/signUp',
		type: 'POST',
		async: true,
	    cache: false,
	    datatype: 'json',
	    headers: {'AJAX':true},
	    contentType: 'application/json;charset=utf-8',
		data: cf_bizPostEncode(send_data),
		success: function(obj) {
			if(obj.data.fst_conn_msg) {
				alert(cf_cvtMsg(obj.data.fst_conn_msg));
			}
			location.href = obj.data.redirect_url;
		},
		error: function(obj) {
			cf_errMsg(obj);
			frm.find('.btn-primary').removeClass('disabled');
	    },
	});
	
}

