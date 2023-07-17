var resourceDir = ".\\rescource\\" //资源目录
var resourceJson = "https://gitee.com/Doxfer/invisible/raw/master/MoqiTest/test.json" //问卷json
var json
const Http = new XMLHttpRequest();
const url=resourceJson
Http.open("GET", url);
Http.send();

Http.onreadystatechange = (e) => {
  json = Http.responseText
}

//获取题目数量
function GetCount()
{
    return GetJsonLength(json['item'])
}

//获取卷的名称
function GetJuanName()
{
    return json['juan']
}

//获取及格判定线的说明
function GetPassInfo()
{
    var percentage = json['prize']*100
    return percentage+"% 以上"
}

//获取是否及格
function IsPass(usrScore)
{
    var full = json['fullmark'];
    var per = json['prize']
    return usrScore/full >= per
}

//跳转到下一题
function ToNextPage(id,usrScore,section)
{
    if(json['item'][id-1]['correctIndex']==section)
    {
        usrScore+=json['item'][id-1]['score']
    }
    if(id+1==GetCount())
    {
        window.location.replace("result.html?score="+usrScore) //完成答题
    }
    else
    {
        window.location.replace("result.html?score="+usrScore+"&id="+id)
    }
}



//读取json长度
function GetJsonLength(json) {
    var jsonLength = 0;
    for (var i in json) {
        jsonLength++;
    }
    return jsonLength;
}

//获取
function getQueryString(name) {
    const url_string = window.location.href
    const url = new URL(url_string);
    return url.searchParams.get(name);
  }