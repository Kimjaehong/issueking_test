<%@page info="login"%>
<%@page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@taglib uri="http://www.springframework.org/tags" prefix="spring"%>

<!DOCTYPE html>
<html lang="ko-kr" id="extr-page">
	<head>
		<title>IssueKing Login</title>
		<meta charset="utf-8">
		<meta name="description" content="">
		<meta name="author" content="">
		<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
		<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
		<!-- #CSS Links -->
		<jsp:include page="/WEB-INF/jsp/include/inc_common_style.jsp" flush="false"/>
		<!-- #COMMON SCRIPT -->
		<jsp:include page="/WEB-INF/jsp/include/inc_common_script.jsp" flush="false"/>
		<script src="${pageContext.request.contextPath}/resources/js/application/login/login.js"></script>
	</head>

	
	<body class="animated fadeInDown">
		<header id="header">
			<div id="logo-group">
<%-- 				<span id="logo"> <img src="${pageContext.request.contextPath}/resources/img/logo.png" alt=""> </span> --%>
			</div>
			<!-- 회원가입 버튼 -->
			<span id="extr-page-header-space"> <span class="hidden-mobile hidden-xs">Need an account?</span> 
				<a href="javascript:void(0);" onclick="f_signUpOpen();" class="btn btn-danger">Create account</a></span>
			
		</header>

		<div id="main">
			<div id="content" class="container">
				<div class="row">
					<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 text-center">
						<h1 class="txt-color-red login-header-big"></h1>
					</div>
				</div>
				<div class="row">
					<div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-md-offset-3">
						<div class="well no-padding">
						<c:url value="/j_spring_security_check" var="loginUrl" />
							<form id="frmLogin" class="smart-form client-form" action="${loginUrl}" method="POST">
								<header>로그인</header>
								<fieldset>
									<div class="row">
										<section class="col col-md-12">
											<label class="label">아이디</label>
											<label class="input"> <i class="icon-append fa fa-user"></i>
												<input type="text" name="userId" autocomplete="off">
												<b class="tooltip tooltip-top-right"><i class="fa fa-user txt-color-teal"></i> 아이디를 입력하세요.</b></label>
										</section>
									</div>
									<div class="row">
										<section class="col col-md-12">
											<label class="label">비밀번호</label>
											<label class="input"> <i class="icon-append fa fa-lock"></i>
												<input type="password" name="password" autocomplete="off">
												<b class="tooltip tooltip-top-right"><i class="fa fa-lock txt-color-teal"></i> 비밀번호를 입력하세요.</b> </label>
										</section>
									</div>
								</fieldset>
								<footer>
									<input type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}"/>
            						<button type="submit" class="btn btn-primary">Log in</button>
								</footer>
							</form>
						</div>
					</div>
				</div>
				<!-- <div class="row">
					<div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-md-offset-3">
						<h5 class="about-heading"><i class="fa fa-info-circle"></i> 도움말</h5>
						<p><span class="font-bold">&middot;</span> /p>
						<p><span class="font-bold">&middot;</span></p>
						<p><span class="font-bold">&middot;</span></p>
						<p><span class="font-bold">&middot;</span></p>
						<p><span class="font-bold">&middot;</span></p>
						<p class="pd-l17">- 연락처 :</p>
						<p class="pd-l17">- e-mail:</p>
					</div>
				</div> -->
			</div>
		</div>
		
		
	
				
		
		<!-- 회원가입 화면 -->
		<jsp:include page="/WEB-INF/jsp/application/login/signUp.jsp" flush="false"/>

		<!--================================================== -->
		
		<!--[if IE 8]>
			<h1>Your browser is out of date, please update your browser by going to www.microsoft.com/download</h1>
		<![endif]-->
		
		<!-- #PLUGINS -->
		<jsp:include page="/WEB-INF/jsp/include/inc_plugins_script.jsp" flush="false"/>
		
		<script type="text/javascript">
		</script>
	</body>
</html>