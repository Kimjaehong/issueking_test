/**
 * ==================================================================================
 * Javascript HashMap
 * ----------------------------------------------------------------------------------
 * 	var hashMap = new HashMap();
 *	hashMap.put(key, value);		-> key, value 값으로 구성된 데이터를 추가
 *	hashMap.get(key);				-> 지정한 key값의 value값 반환
 *	hashMap.containsKey(key);		-> 구성된 key 값 존재여부 반환
 *	hashMap.containsValue(value);	-> 구성된 value 값 존재여부 반환
 *	hashMap.isEmpty(key);			-> 
 *	hashMap.clear();				-> 구성된 데이터 초기화
 *	hashMap.remove(key);			-> key에 해당하는 데이터 삭제
 *	hashMap.keys();					-> 배열로 key 반환
 *	hashMap.values();				-> 배열로 value 반환
 *	hashMap.size();					-> Map에 구성된 개수 반환
 * ==================================================================================
 */
HashMap = function() {
	this.map = new Object();
};
HashMap.prototype = {
	put : function(key, value) {
		this.map[key] = value;
	},
	get : function(key) {
		return this.map[key];
	},
	containsKey : function(key) {
		return key in this.map;
	},
	containsValue : function(value) {
		for ( var prop in this.map) {
			if (this.map[prop] == value)
				return true;
		}
		return false;
	},
	isEmpty : function(key) {
		return (this.size() == 0);
	},
	clear : function() {
		for ( var prop in this.map) {
			delete this.map[prop];
		}
	},
	remove : function(key) {
		delete this.map[key];
	},
	keys : function() {
		var keys = new Array();
		for ( var prop in this.map) {
			keys.push(prop);
		}
		return keys;
	},
	values : function() {
		var values = new Array();
		for ( var prop in this.map) {
			values.push(this.map[prop]);
		}
		return values;
	}
	/*size : function() {
		var count = 0;
		for ( var prop in this.map) {
			count++;
		}
		return count;
	}*/
};