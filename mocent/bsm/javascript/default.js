/**
 *后台默认页面的基础脚本
 */

$(document).ready(function(){
	Layoutit("#divPageFrame", {vLayout: [50, 40, 'auto']});
	createNavigation();
});

function reSize()
{
	var screenHeight = $(window).height();
	var listHeight = screenHeight - 50;
	$("#divContent").css("height", listHeight);
}
//创建导航菜单
function createNavigation()
{
	var arr = new Array();
	var obj = getFunctions();
	arr.push("<nav class=\"navbar navbar-default\" role=\"navigation\">");
	arr.push("<ul class=\"nav navbar-nav\">");
	if(obj != null && obj.length > 0)
	{
		for(var i = 0; i < obj.length; i++)
		{
			arr.push("<li onclick=\"navigationClick('" + obj[i].param + "', '" + obj[i].fun_name + "', '" + obj[i].fun_desc + "')\"><a href=\"javascript:void(0)\">" + obj[i].fun_name + "</a></li>");
			if(i != obj.length -1)
			{
				arr.push("<li class=\"divider-vertical\"></li>");
			}
		}
	}
	arr.push("</ul>");
	arr.push("</nav>");
	//创建导航
	$("#divNavigation").html(arr.join(""));
}
//导航栏按钮点击事件
function navigationClick(url, name, desc)
{
	if(url != null)
	{
		var obj = $("#divNavigation").find("nav>ul>li");
		if(obj != null &&  obj.length >0)
		{
			for(var i = 0; i < obj.length; i++)
			{
				var target = $(obj[i]);
				if(target.text() == name)
				{
					target.addClass("active");
				}
				else
				{
					target.removeClass("active");
				}
			}
		}
		document.getElementById("MocentMain").src = url;
	}
	$("#divTitle>b").text(desc);
}
/*************************************************辅助方法*********************************************/
//获取当前用户的权限列表
function getFunctions()
{
	var result = null;
	result = [{"fun_name": "产品管理", "param": "product.html", "fun_desc": "产品类型与详细信息管理"},
	          {"fun_name": "新闻管理", "param": "findNewsList.html", "fun_desc": "新增与新闻发布"},
	          {"fun_name": "车联网信息", "param": "updateClw.html", "fun_desc": "车辆网相关信息修改"},
	          {"fun_name": "关于我们", "param": "updateAbout.html", "fun_desc": "公司信息与联系方式修改"}];
	return result;
}