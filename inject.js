var title, url, text;

function getTitle() {
    //找到图书标题
    var wrapper = document.getElementById("wrapper");
    var para = wrapper.getElementsByTagName('span');
	title = para[0].lastChild.nodeValue;
}

function getUrl(result) {
	var select = result["school"];
	if (!select) {
		select = "0";
	}
	if (select == "0") {
		text = "山东财经大学图书馆（舜耕）";
		url = "http://210.44.135.30:8080/opac/openlink.php?historyCount=0&strText=" + title + "&doctype=ALL&strSearchType=title&match_flag=forward&displaypg=20&sort=CATA_DATE&orderby=desc&showmode=list&location=ALL";
	} else {
		text = "山东财经大学图书馆（燕山）";
		url = "http://222.206.97.5/museweb/wxjs/tmjs.asp?txtTm=" + escape(title) + "&doctype=ALL&strSearchType=title";
	}
}

function AddBookInfo() {
	
	var borrowinfo = document.getElementById("borrowinfo");

	//验证下borrowinfo是否存在
	if (!borrowinfo) {
		//找到buyinfo节点
		var buyinfo = document.getElementById("buyinfo");
		//创建borrowinfo节点
		var borrowinfo = document.createElement("div");
		borrowinfo.setAttribute("class", "gray_ad");
		borrowinfo.setAttribute("id", "borrowinfo");
		var h2 = document.createElement("h2");
		var h2_text = document.createTextNode("在哪儿借这本书");
		borrowinfo.appendChild(h2);
		h2.appendChild(h2_text);
		var ul_element = document.createElement("ul");
		borrowinfo.appendChild(ul_element);
		//将borrowinfo节点插入buyinfo节点之后
		buyinfo.parentNode.insertBefore(borrowinfo, buyinfo.nextSibling);
	}
	//创建li、a节点,插入到指定位置
	var ul_element = borrowinfo.getElementsByTagName("ul");
	var li_element = document.createElement("li");
	var a_element = document.createElement("a");
	a_element.setAttribute("href", url);
	a_element.setAttribute("target", "_blank");
	li_element.style.border = "none";
	var title_text = document.createTextNode(text);
	a_element.appendChild(title_text);
	li_element.appendChild(a_element);

	if(ul_element[0].childNodes) {
		ul_element[0].insertBefore(li_element, ul_element[0].firstChild);
	} else {
		ul_element[0].appendChild(li_element);
	}

}

chrome.storage.local.get("school", function(result) {
	getTitle();
	getUrl(result);
	AddBookInfo();
	});