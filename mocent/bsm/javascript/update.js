
/**
 * 后台管理网站调用的JS
 */


/**
 * 页面初始化后，绑定函数。
 */
var gNewsGrid;
$(function(){
	//查询出联系方式
	$.ajax({
		type: "post",
		url: "mocent/findContact",
		dataType: "json",
		async: false,
		success: function(ret){
			var obj = ret;
			if(obj != null && obj!="null" && obj!=""){
				
				$("#gsmc").val(obj[0].name);
				$("#lxr").val(obj[0].contact_name);
				$("#lxfs").val(obj[0].contact_number);
				$("#gsdz").val(obj[0].address);
				$("#ewmdz").val(obj[0].qr_code);	
				
			}
		}
	});
	//查询企业文化
	$.ajax({
		type: "post",
		url: "mocent/findCulture",
		dataType: "json",
		async: false,
		success: function(ret){
			var obj = ret;
			if(obj != null && obj!="null" && obj!=""){
				
				$("#qywhbt").val(obj[0].brief);
				$("#editor_id_qywhnr").html(obj[0].content);
				
			}
		}
	});
	
	
	
	//查询公司简介
	$.ajax({
		type: "post",
		url: "mocent/findCompany",
		dataType: "json",
		async: false,
		success: function(ret){
			var obj = ret;
			if(obj != null && obj!="null" && obj!=""){
				
				$("#gsjjbt").val(obj[0].title);
				$("#editor_id_gsjj").html(obj[0].content);
				
			}
		}
	});
	
	
	//查询车联网
	$.ajax({
		type: "post",
		url: "mocent/findClw",
		dataType: "json",
		async: false,
		success: function(ret){
			var obj = ret;
			if(obj != null && obj!="null" && obj!=""){
				
				$("#clwbt").val(obj[0].title);
				$("#editor_id_clwnr").html(obj[0].content);
				$("#clwtpdz").val(obj[0].img_path);
				
			}
		}
	});
	
	
	
	
//	 getNewsList();
	
	 
	
		
	
});



//公司简介提交
function updateCompany(){
	var title = $("#gsjjbt").val();
	var html=window.editor.html();
	window.editor.sync();//编辑器同步
	html=$("#editor_id_gsjj").val();
	
	$.ajax({
		type: "POST",
		url: "mocent/company",
		data: {title: title,content:html},
		dataType: "text",
		async: false,
		success: function(data){
			if(data == "1"){
				alert("修改成功");
			}else if(data == "2"){
				alert("添加成功");
			}else if(data == ""){
				alert("修改失败");
			}
		},
		error: function(){
			
		}
	});
	
}




//联系我们
function updateContact(){
	var gsmc = $("#gsmc").val();

	var lxr = $("#lxr").val();
	 
	var lxfs = $("#lxfs").val();
		 
	var gsdz = $("#gsdz").val();
		
	var ewmdz = $("#ewmdz").val();	
	
	$.ajax({
		type: "POST",
		url: "mocent/contact",
		data: {name: gsmc,contact_name:lxr,contact_number:lxfs,address:gsdz,qr_code:ewmdz},
		dataType: "text",
		async: false,
		success: function(data){
			if(data == "1"){
				alert("修改成功");
			}else if(data == "2"){
				alert("添加成功");
			}else if(data == ""){
				alert("修改失败");
			}
		},
		error: function(){
			
		}
	});
			
}




//企业文化修改
function updateCulture(){
	
	var brief = $("#qywhbt").val();//标题
	var html=window.editor.html();
	window.editor.sync();//编辑器同步
	html=$("#editor_id_qywhnr").val();
	
	$.ajax({
		type: "POST",
		url: "mocent/culture",
		data: {content: html,brief:brief},
		dataType: "text",
		async: false,
		success: function(data){
			if(data == "1"){
				alert("修改成功");
			}else if(data == "2"){
				alert("添加成功");
			}else if(data == ""){
				alert("修改失败");
			}
		},
		error: function(){
			
		}
	});
	
	
}

//车联网修改
function updateClw(){
	var html=window.editor.html();
	window.editor.sync();//编辑器同步
	html=$("#editor_id_clwnr").val();
	
	var content = $("#clwnr").val();//标题
	var img_path = $("#clwtpdz").val();//图片地址
	
	$.ajax({
		type: "POST",
		url: "mocent/updateClw",
		data: {title: content, content:html,img_path:img_path},
		dataType: "text",
		async: false,
		success: function(data){
			if(data == "1"){
				alert("修改成功");
			}else if(data == "2"){
				alert("添加成功");
			}else if(data == ""){
				alert("修改失败");
			}
		},
		error: function(){
			
		}
	});
	
	
}




//新闻添加
function addNews(){
	
	var mytop=2;
	if($("#topy").is(':checked')){
		mytop=1;
	}else if($("#topn").is(':checked')){
		mytop=0;
	}
	
	var myeffective=2;
	if($("#effectivey").is(':checked')){
		myeffective=1;
	}else if($("#effectiven").is(':checked')){
		myeffective=0;
	}
	
	
	var html=window.editor.html();
	window.editor.sync();//编辑器同步
	html=$("#editor_id_news").val();
		
	var newsInfo = {
			title: $("#title").val(),
			brief: $("#newsBrief").val(),
			content: html,
			author: $("#newsAuthor").val(),
			publish_time: $("#publish_time").val(),
			top:mytop,
			effective:myeffective,
			img_path: $("#newsPath").val()
	}
	
	$.ajax({
		type: "POST",
		url: "mocent/addNews",
		data: newsInfo,
		dataType: "text",
		async: false,
		success: function(data){
			if(data > 0){
				alert("添加成功");
				window.location = "findNewsList.html";
			}else if(data == 0){
				alert("添加失败");
				window.location = "findNewsList.html";
			}
		},
		error: function(){
			
		}
	});
	
	
}




//findNewsList.html加载新闻列表(后台管理)
function loadNews(){
	
	
	var result = getNewsList();
	
	if(result != null && result.length > 0)
	{
		
		gNewsGrid = $.fn.bsgrid.init("tabNewsList", {
			localData: result,
			displayBlankRows: false,
			pageSize: 10,
			stripeRows: true,
		});
		
	}else{
		
		$.fn.bsgrid.init("tabNewsList", {
			url: 'localdata/no-data.json',
            // autoLoad: false,
            pageSizeSelect: true,
            pageSize: 10,
            displayBlankRows: false, // single grid setting
            displayPagingToolbarOnlyMultiPages: true // single grid setting
		});
	}
}

//显示id
function id(obj)
{
	var id = gNewsGrid.getRecordIndexValue(obj, "id");
	
	return id;
}
//显示标题
function title(obj)
{
	var title = gNewsGrid.getRecordIndexValue(obj, "title");
	
	return title;
}
//显示作者
function author(obj)
{
	var author = gNewsGrid.getRecordIndexValue(obj, "author");
	
	return author;
}

//显示是否有效
function state(obj)
{
	var state = gNewsGrid.getRecordIndexValue(obj, "state");
	var html ="";
	if(state == 1)
	{
		html="是";
	}
	else
	{
		html="否";
	}
	return html;
}

//显示是否置顶
function is_top(obj)
{
	var is_top = gNewsGrid.getRecordIndexValue(obj, "is_top");
	var html =[];
	
	if(is_top == 1)
	{
		html.push("<span style=\"color:red\">是</span>");
//		html="是";
	}
	else
	{
		html.push("<span>否</span>");
//		html="否";
	}
	return  html.join("");
}

//显示修改
function editor1(obj)
{
	var id = gNewsGrid.getRecordIndexValue(obj, "id");
	var html =[];
	html.push("<div class=\"btn-group\">");
	html.push("<button type=\"button\" class=\"button\" onclick='tochangeNews("+ id + ")'>修改</button>");
	html.push("</div>");
	
	return  html.join("");
}

//显示删除
function editor2(obj)
{
	var id = gNewsGrid.getRecordIndexValue(obj, "id");
	var html =[];
	html.push("<div class=\"btn-group\">");
	html.push("<button type=\"button\"  onclick=\"delNews("+id+ ")\">删除</button>");
	html.push("</div>");
	
	
	return  html.join("");
}


//获取新闻列表
function getNewsList()
{
	var result = null;
	$.ajax({
		type: "post",
		url: "mocent/findNewsList",
		dataType: "json",
		async: false,
		success: function(ret){
			var obj = ret;
			if(obj != null)
			{
				result = obj;
			}
		},
		error: function(){
			
		}
	});
	
	return result;
}



//根据id,跳转到修改新闻页面
function tochangeNews(id)
{
	window.location = "updateNews.html?id=" + id;
}

//根据id查询新闻
function changeNews(id){
	var myid=id+"";
	
	var newsInfo = {
			id: myid,
	}
	
	$.ajax({
		type: "post",
		url: "mocent/findNewsById",
		data:newsInfo,
		dataType: "json",
		async: false,
		success: function(ret){
			var obj = ret;
			if(obj != null && obj !="0"){
				
				var title=obj[0].title;
				var brief=obj[0].brief;
				var content=obj[0].content;
				var author=obj[0].author;
				var publishTime=obj[0].publishTime;
				var img_path=obj[0].img_path;
				var top=obj[0].top;
				var state=obj[0].state;
				
				$("#editor_id").html(content);
				$("#upnewsBrief").val(brief);
				$("#uptitle").val(title);
				$("#upnewsAuthor").val(author);
				$("#upcard_expired").val(publishTime);
				$("#upnewsPath").val(img_path);
				$("#upnewsid").val(id);
				if(top==0){
					$("#uptopn").attr("checked","checked");
				}else{
					$("#uptopy").attr("checked","checked");
				}
				
				if(state==0){
					$("#upeffectiven").attr("checked","checked");
				}else{
					$("#upeffectivey").attr("checked","checked");
				}
				
			}else{
				alert("没有该新闻");
			}
		},
		error: function(){
			
		}
	});
	
}

//修改某个新闻
function updateNews(){
	
	var id=$("#upnewsid").val();
	
	var mytop=2;
	if($("#uptopy").is(':checked')){
		mytop=1;
	}else if($("#uptopn").is(':checked')){
		mytop=0;
	}
	
	var myeffective=2;
	if($("#upeffectivey").is(':checked')){
		myeffective=1;
	}else if($("#upeffectiven").is(':checked')){
		myeffective=0;
	}
	
	
	var html=window.editor.html();
	window.editor.sync();//编辑器同步
	html=$("#editor_id").val();
		
	var newsInfo = {
			id: id,
			title:$("#uptitle").val(),
			brief: $("#upnewsBrief").val(),
			content: html,
			author: $("#upnewsAuthor").val(),
			publish_time: $("#upcard_expired").val(),
			top:mytop,
			effective:myeffective,
			img_path: $("#upnewsPath").val()
	}
	
	
	$.ajax({
		type: "POST",
		url: "mocent/updateNews",
		data: newsInfo,
		dataType: "text",
		async: false,
		success: function(data){
			if(data == "1"){
				alert("修改成功");
				window.location = "findNewsList.html";
			}else if(data == ""){
				alert("修改失败");
				window.location = "findNewsList.html";
			}
		},
		error: function(){
			
		}
	});
	
	
	
}




//根据id删除新闻
function delNews(id){
	var myid=id+"";
	
	var newsInfo = {
			id: myid,
	}
	
	if(confirm("确定删除此新闻？")){
		$.ajax({
			type: "post",
			url: "mocent/delNewsById",
			dataType: "text",
			data:newsInfo,
			async: false,
			success: function(ret){
				var obj = ret;
				
				if(obj=="1"){
					alert("删除成功");
					window.location = "findNewsList.html";
//					getNewsList();
				}else{
					alert("删除失败");
					window.location = "findNewsList.html";
				}
				
				
			},
			error: function(){
				
			}
		});
	}
	
	
}

//跳转至添加新闻页面
function toAddNews(){
	window.location = "addNews.html";
}





////上传新闻缩列图
//function uploadFile(){
//	 
//	alert(11111);
//	 var form = $("#fileForm");  
//     var options  = {    
//         url:'mocent/upload',    
//         type:'post',    
//         success:function(data)    
//         {    
//        	
//         }    
//     };    
//     
//     form.ajaxSubmit(options);  
//	
////   $("#fileForm").submit();
//	
//}
























