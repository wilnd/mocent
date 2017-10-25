/**
 * 主页网站调用的JS
 */


/**
 * 页面初始化后，绑定函数。
 */
$(function(){

	
});


//查询出联系方式，并赋值到页面
function findContact(){
	$.ajax({
		type: "post",
		url: "mocent/findContact",
		dataType: "json",
		async: false,
		success: function(ret){
			var obj = ret;
			if(obj != null && obj!="null" && obj!=""){
				
				var html="";
				html+="<p>公司名称 :  "+obj[0].name+"<br/> 联系方式："+obj[0].contact_name+"("+obj[0].contact_number+")<br/>公司地址："+obj[0].address+"<br/></p><h5>二维码：</h5>";
//				html+="<div class=\"tu\"><img src=\"image/erweima_10.png\"/></div>";
				html+="<div class=\"tu\"><img src=\""+obj[0].qr_code+"\"/></div>";
				$("#lxwm").html(html);
				
			}else{
				alert("没有联系方式信息");
				return;
			}
		}
	});
}

//查询出企业文化，并赋值到页面
function findCulture(){
	$.ajax({
		type: "post",
		url: "mocent/findCulture",
		dataType: "json",
		async: false,
		success: function(ret){
			var obj = ret;
			if(obj != null && obj!="null" && obj!=""){
				
				var html="<p>"+obj[0].brief+"</p><br/><p>"+obj[0].content+"</p>";
				
				$("#msxyqywh").html(html);
				
			}else{
				alert("没有企业文化信息");
				return;
			}
		}
	});
}


//查询出公司简介，并赋值到页面
function findCompany(){
	$.ajax({
		type: "post",
		url: "mocent/findCompany",
		dataType: "json",
		async: false,
		success: function(ret){
			var obj = ret;
			if(obj != null && obj!="null" && obj!=""){
				
				var html="<h2>"+obj[0].title+"</h2><br/><p>"+obj[0].content+"</p>";
				
				$("#msxygsjj").html(html);
				
			}else{
				alert("没有公司简介");
			}
		}
	});
}


//查询车联网
function findCLW(){
	$.ajax({
		type: "post",
		url: "mocent/findClw",
		dataType: "json",
		async: false,
		success: function(ret){
			var obj = ret;
			if(obj != null && obj!="null" && obj!=""){
				
				var html="<h2>"+obj[0].title+"</h2><br/><p>"+obj[0].content+"<div class=\"tu\"><img src=\""+obj[0].img_path+"\"/></div></p>";
				
				$("#msxyclw").html(html);
				
			}else{
				alert("没有车联网信息");
				return;
			}
		}
	});
}






//获取新闻列表(新闻中心)
function getNewsList(){
	var result = null;
	$.ajax({
		type: "post",
		url: "mocent/findNewsList",
		dataType: "json",
		async: false,
		success: function(ret){
			var obj = ret;
			if(obj != null && obj!="null")
			{
				result = obj;
			}
		},
		error: function(){
			
		}
	});

	if(result !=null && result.length>0){
		var innerArr = "";
		var j=0;
		innerArr+="<div class=\"tupian\"><div class=\"top\">";
		for(var i=0;i<result.length;i++){
			j++;
			
			if(j==1 || j==2 || j==3 || j==5 || j==6 || j==7 ){
				innerArr+="<div class=\"top_l\">";
				innerArr+="<div><a href=\"javascript:void(0);\" onclick=\"tofindNewsById("+result[i].id+")\"><img onerror=\"javascript:this.src='http://www.mocent.com/images/news/default.png';\" src=\""+result[i].img_path+"\"/></a></div>";
//				innerArr+="<div><a href=\"javascript:void(0);\" onclick=\"tofindNewsById("+result[i].id+")\"><img src=\"image/news_07.png\"/></a></div>";
				var brief=result[i].brief;//简介
				if(brief.length>75){
					brief=brief.substring(0,75)+"...";
				}
				innerArr+="<p><a href=\"javascript:void(0);\" onclick=\"tofindNewsById("+result[i].id+")\"><span style=\"font-size:12px;\">&nbsp;&nbsp;&nbsp;&nbsp;</span>"+brief+"</a></p></div>";
			}
			
			
			if(j==4){
				innerArr+="<div class=\"top_l_2\">";
				innerArr+="<div><a href=\"javascript:void(0);\" onclick=\"tofindNewsById("+result[i].id+")\"><img onerror=\"javascript:this.src='http://www.mocent.com/images/news/default.png';\" src=\""+result[i].img_path+"\"/></a></div>";
//				innerArr+="<div><a href=\"javascript:void(0);\" onclick=\"tofindNewsById("+result[i].id+")\"><img src=\"image/news_07.png\"/></a></div>";
				var brief=result[i].brief;//简介
				if(brief.length>75){
					brief=brief.substring(0,75)+"...";
				}
				innerArr+="<p><a href=\"javascript:void(0);\" onclick=\"tofindNewsById("+result[i].id+")\"><span style=\"font-size:12px;\">&nbsp;&nbsp;&nbsp;&nbsp;</span>"+brief+"</a></p></div>";
				
				
				innerArr+="</div></div><div class=\"tupian\"><div class=\"top\">";
			}
			
			if(j==8){
				innerArr+="<div class=\"top_l_2\">";
				innerArr+="<div><a href=\"javascript:void(0);\" onclick=\"tofindNewsById("+result[i].id+")\"><img onerror=\"javascript:this.src='http://www.mocent.com/images/news/default.png';\" src=\""+result[i].img_path+"\"/></a></div>";
//				innerArr+="<div><a href=\"javascript:void(0);\" onclick=\"tofindNewsById("+result[i].id+")\"><img src=\"image/news_07.png\"/></a></div>";
				var brief=result[i].brief;//简介
				if(brief.length>75){
					brief=brief.substring(0,75)+"...";
				}
				innerArr+="<p><a href=\"javascript:void(0);\" onclick=\"tofindNewsById("+result[i].id+")\"><span style=\"font-size:12px;\">&nbsp;&nbsp;&nbsp;&nbsp;</span>"+brief+"</a></p></div>";
				
				break;
			}
		}
		
		innerArr+="</div></div>";
		$("#newslist").after(innerArr);
	}else{
		alert("没有新闻");
		return;
	}
	
	
}


//根据id，跳转到新闻详情页面
function tofindNewsById(id){
				
	window.location = "newsdetail.html?id=" + id ;
		
}

//根据id查询新闻
function findNewsById(id){
	$.ajax({
		type: "post",
		url: "mocent/findNewsById",
		dataType: "json",
		data: {id: id},
		async: false,
		success: function(ret){
			var obj = ret;
			if(obj != null && obj != "0"){
				
				var title=obj[0].title;
				var brief=obj[0].brief;
				var content=obj[0].content;
				var author=obj[0].author;
				var publishTime=obj[0].publish_time;
				var img_path=obj[0].img_path;
				var top=obj[0].top;
				var state=obj[0].state;
				
					
				$("#newsTitle").text(title);
				var date = new Date(publishTime.time);
				
				var timeAndAuthor= date.Format("yyyy-MM-dd HH:mm") + " 作者： " + author;
				$("#newsTimeAndAuthor").text(timeAndAuthor);
				$("#newsContext").html(content);
				
				
			}else{
				alert("没有新闻详情");
			}
		},
		error: function(){
			
		}
	});
	
}


//获取新闻列表(新闻详情左边标题列表)
function getNewsTitleList(){
	var result = null;
	$.ajax({
		type: "post",
		url: "mocent/findNewsList",
		dataType: "json",
		async: false,
		success: function(ret){
			var obj = ret;
			if(obj != null && obj!="null")
			{
				result = obj;
			}
		},
		error: function(){
			
		}
	});
	
	
	if(result!=null && result.length>0){
		var innerArr = "";
		var j=0;
		innerArr+="<ul>";
		for(var i=0;i<result.length;i++){
			j++;
			var title=result[i].title;
			if(title.length>18){
				title=title.substring(0,15)+"...";
			}
			
			innerArr+="<li style='height: 36px; line-height: 36px'><a href=\"javascript:void(0);\" onclick=\"findNewsById("+result[i].id+")\">"+title+"</a></li>";
			
			
			if(j==8){
				break;
			}
		}
		
		innerArr+="</ul>";
		$("#newsTitleList").after(innerArr);
	}else{
		alert("没有新闻");
		return;
	}
	
	
	
}


//获取部分新闻列表(分页)
function getSomeNewsList(){
	
	var result = null;
	$.ajax({
		type: "post",
		url: "mocent/findNewsList",
		dataType: "json",
		async: false,
		success: function(ret){
			var obj = ret;
			if(obj != null && obj!="null")
			{
				result = obj;
			}
		},
		error: function(){
			
		}
	});
	
	if(result!=null && result.length>0){
		var j=0;
		var innerArr = "";
		innerArr+="<div class=\"xwlb_left\">";
		for(var i=0;i<result.length;i++){
			j++;
			var title=result[i].title;//标题
			if(title.length > 17){
				title=title.substring(0,15)+"..."
			}
			
			var brief=result[i].brief;//简介
			if(brief.length >29 && brief.length<58){
				brief=brief.substring(0,29)+"<br/>"+brief.substring(29);
				
			}else if(brief.length >58 && brief.length<87){
				
				brief=brief.substring(0,29)+"<br/>"+brief.substring(29,60)+"<br/>"+brief.substring(60);
				
			}else if(brief.length >87 && brief.length<116){
				
				brief=brief.substring(0,29)+"<br/>"+brief.substring(29,60)+"<br/>"+brief.substring(60,92)+"<br/>"+brief.substring(92);
			}else if(brief.length >116){
				brief=brief.substring(0,29)+"<br/>"+brief.substring(29,60)+"<br/>"+brief.substring(60,92)+"<br/>"+brief.substring(92,110)+"...";
			}
			
			var date = new Date(result[i].publish_time.time);//发布时间
			var publishTimes=date.Format("yyyy-MM-dd");
			var times= new Array();
			times=publishTimes.split("-");
			var year =times[0];
			var mon =times[1];
			var day =times[2];
			
			
			
			innerArr+="<div class=\"left\"><div class=\"top\"><div class=\"top_t\">";
			innerArr+="<div class=\"shijian\"><span class=\"ri\">"+day+"</span>/"+mon+"<span style=\"font-size:12px;\">&nbsp;&nbsp;&nbsp;&nbsp;</span><span class=\"nian\">"+year+"</span></div>";
			innerArr+="<div class=\"biaoti\">"+title+"</div></div><p class=\"zhengwen\">"+brief+"</p>";
			innerArr+=" <img src=\"image/xwxq_xianxian_03_03.png\"/></div></div>";
			
			if(j==5){
				innerArr+=" </div><div class=\"xian\"><img src=\"image/xinwen_03.png\"/></div><div class=\"xwlb_right\">";
			}
			
			if(j==10){
				break;
			}
		}
		
		innerArr+="</div>";		
		$("#xinwen_top").html(innerArr);
	}else{
		alert("没有新闻");
		return;
	}
	
	
	return result;
		
}

//对Date的扩展，将 Date 转化为指定格式的String 
//月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符， 
//年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字) 
//例子： 
//(new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423 
//(new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18 
Date.prototype.Format = function(fmt) 
{ //author: zl
	var o = { 
			"M+" : this.getMonth()+1,                 //月份 
			"d+" : this.getDate(),                    //日 
			"H+" : this.getHours(),                   //小时 
			"m+" : this.getMinutes(),                 //分 
			"s+" : this.getSeconds(),                 //秒 
			"q+" : Math.floor((this.getMonth()+3)/3), //季度 
			"S"  : this.getMilliseconds()             //毫秒 
	}; 
	if(/(y+)/.test(fmt))
	{
		fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length)); 
		for(var k in o)
		{
			if(new RegExp("("+ k +")").test(fmt)) 
				fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length))); 
		}
			
		return fmt;
	}
}





