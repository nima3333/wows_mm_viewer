const zerorpc = require("zerorpc")
const {getCurrentWindow, globalShortcut, getGlobal} = require('electron').remote;

let client = new zerorpc.Client()
console.log("renderer is here")
client.connect("tcp://127.0.0.1:4242")

document.body.innerHTML = `<div class="jumbotron text-center" style="padding: 0">
<h1>Nima's Wows Analyser</h1>
</div>
<div>
<div class="spinner-border" role="status" style="display: block; position: fixed; z-index: 1031; top: 50%; right: 50%; margin-top: -..px; margin-right: -..px;">
<span class="sr-only">Loading...</span>
</div>
</div>`

let reload_button;
window.onload = function() {
  client.invoke("echo", getGlobal('sharedObj').key, (error, res) => {
    if(error) {
      console.error(error)
    } else {
      var doc = new DOMParser().parseFromString(res, "text/xml");
      document.body.innerHTML = res
      reload_button = document.getElementById('myBtn')
  
      reload_button.addEventListener('click', () => {
        reload()
      })
    }
  })
  
  var reload = ()=>{
    getCurrentWindow().reload()
  }
  
}

