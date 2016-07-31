/**
 * =======================================================================================
 * JQUERY 오른쪽 마우스 사용금지 함수
 * ---------------------------------------------------------------------------------------
 * contextmenu 	-> 우클릭
 * dragstart 	-> 드레그
 * selectstart 	-> 더블클릭
 * =======================================================================================
 */
function _startBlockEvent() {
	
	_stopBlockEvent();
	
	// 마우스 이벤트 방지
	$(document).bind('contextmenu dragstart selectstart', function(e){
        return false;
    });

	// 키보드 이벤트 방지
    $(document).keydown(function(e) {
        if (e.keyCode == ctrlKey) ctrlDown = true;
    }).keyup(function(e) {
        if (e.keyCode == ctrlKey) ctrlDown = false;
    });
    
    $(document).keydown(function(e) {
        if (ctrlDown && (e.keyCode == vKey || e.keyCode == cKey)) {
        return false;
        }
    });
}

/**
 * =======================================================================================
 * JQUERY 오른쪽 마우스 사용해제 함수
 * ---------------------------------------------------------------------------------------
 * contextmenu 	-> 우클릭
 * dragstart 	-> 드레그
 * selectstart 	-> 더블클릭
 * =======================================================================================
 */
function _stopBlockEvent() {
	//$(document).unbind('contextmenu dragstart selectstart');
	//$(document).unbind('keydown');
}