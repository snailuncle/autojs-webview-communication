"ui";
/**
 * 作者: 家
 * QQ: 203118908
 * 功能: autojs和webview的交互
 */

importClass(android.webkit.WebChromeClient)

ui.layout(
  <linear w="*" h="*">
    <webview id="webview" h="*" w="*" />
  </linear>
)

let webview = ui.webview
let set = webview.getSettings()
set.setAllowFileAccessFromFileURLs(false)
set.setAllowUniversalAccessFromFileURLs(false)
set.setSupportZoom(false)
set.setJavaScriptEnabled(true)

function 打开app (appName) {
  app.launchApp(appName)
}

var 获取单选框选项 = function (selected) {

}

var webcc = new JavaAdapter(WebChromeClient, {
  onConsoleMessage: function (consoleMessage) {
    toastLog(consoleMessage.message())
    try {
      var obj = JSON.parse(consoleMessage.message())
      if (obj.command === '打开app') {
        app.launchApp(obj.param)
      }
    } catch (e) {
      console.log('JSON解析consoleMessage错误')
    }
  },
  onReceivedTitle: function (view, title) {
    if (title != null) {
      toastLog(title)
    } else {
      toastLog('title is null')
    }
  }
})

webview.setWebChromeClient(webcc)

htmlFilePath = "./webView.html"
htmlFilePath = files.path(htmlFilePath)
webview.loadUrl("file://" + htmlFilePath)


// autojs 改变网页

function 改变网页中的时间 () {
  webview.evaluateJavascript(";" + getDate.toString() + ";getDate();", function (s) {
    console.log(s)
  })
}

function getDate () {
  //获取当前时间
  var date = new Date();
  //格式化为本地时间格式
  var date1 = date.toLocaleString();
  //获取div
  var div1 = document.getElementById("dateTime");
  //将时间写入div
  div1.innerHTML = date1;
  return date1
}

setInterval(
  function () {
    改变网页中的时间()
  }, 1000
)

