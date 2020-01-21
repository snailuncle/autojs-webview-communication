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


