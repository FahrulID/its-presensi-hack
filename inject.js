var s = document.createElement('script');
s.src = chrome.runtime.getURL('hack.js');
s.onload = function () { this.remove(); };
// see also "Dynamic values in the injected code" section in this answer
(document.head || document.documentElement).appendChild(s);