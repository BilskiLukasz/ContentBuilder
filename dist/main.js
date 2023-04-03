/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__modules_preheader__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__modules_listTemplates__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__modules_body__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__modules_header__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__modules_logo__ = __webpack_require__(5);








var SDK = __webpack_require__(6);
const sdk = new SDK({
	tabs: [
		'htmlblock', // This is the HTML Editor Tab
		'stylingblock' // This is the styling tab
	]},null,true);

const { createApp } = Vue


createApp({
	data() {
	  return {
		listTemplates: [],
		preheader: [],
    	logo: [],
		header: [],
		body: [],
		listItems: [],
		listSelected: []
	  }
	},
  mounted() {
	this.logo = __WEBPACK_IMPORTED_MODULE_4__modules_logo__["a" /* default */].slice(0)
	this.preheader = __WEBPACK_IMPORTED_MODULE_0__modules_preheader__["a" /* default */].slice(0)
	this.header = __WEBPACK_IMPORTED_MODULE_3__modules_header__["a" /* default */].slice(0)
	this.body = __WEBPACK_IMPORTED_MODULE_2__modules_body__["a" /* default */].slice(0)	
	this.listTemplates = __WEBPACK_IMPORTED_MODULE_1__modules_listTemplates__["a" /* default */].slice(0)
    this.fillBlockList("preheader")

	sdk.getData((data) => {
		
		if(data.items != undefined) {
			this.listSelected = data.items.slice(0)
		}
	})
  },
	methods: {

		fillBlockList(snippet) {
			const arrayToSwap = this.$data[`${snippet.toLowerCase()}`]
			this.listItems = arrayToSwap.slice(0)
		},

		fillTemplateList(input) {

      this.listSelected.length = 0;
      
      const template = this.listTemplates.filter(el => {if (el.name == document.querySelector(`#${input}`).value) return el})

      const tempObj = JSON.parse(JSON.stringify(template))[0];

      for (const key in tempObj) {
        if ( key != "name") {
          this.$data[key].map(el => {
            tempObj[key].forEach(element => {
              if (element == el.id) {
                this.listSelected.push(el)
              }
            })
          })
        }
      }

      this.setBuilderContent()
		},


		
  
	  setBuilderContent() {
  
  
		  var outputString = "";
  
		  this.listSelected.forEach(el => outputString += el.content)
  
		  sdk.setData({"items" : this.listSelected.map((el) => {return {"id": el.id, "content": el.content}})})
		  sdk.setContent(outputString)
  
	  },
  
	  startDrag(event, indexItem) {
		  event.dataTransfer.dropEffect = "move"
  
		  if(event.target.hasAttribute("itemid")) {
			  event.dataTransfer.setData("newItem", true)
			  event.dataTransfer.setData("itemID", event.target.getAttribute("itemid"))
		  } else {
			  event.dataTransfer.setData("newItem", false)
			  event.dataTransfer.setData("itemID", indexItem)
		  }
	  },

	  dragHover(event) {
		event.preventDefault()
		event.target.classList.toggle("drop-zone-hover")
	  },
  
	  onDrop(event, toIndex) {
		event.target.classList.toggle("drop-zone-hover")
		  
		  if(event.dataTransfer.getData("newItem") == "true") {
  
			  const handledItem = this.listItems.filter((item) => item.id == event.dataTransfer.getData("itemID"))
  
			  this.listSelected.splice(toIndex+1, 0, handledItem[0])
  
		  } else {
  
			  const itemIndex = event.dataTransfer.getData("itemID")
  
			  if(itemIndex == toIndex) { return }
	  
			  if(itemIndex > toIndex ) {toIndex++}
	  
			  this.listSelected.splice(toIndex, 0, this.listSelected.splice(itemIndex, 1)[0])
		  }
  
		  this.setBuilderContent()
  
	  },
  
	  startDragUpdate(event, index) {
		  event.dataTransfer.dropEffect = "move"
		  event.dataTransfer.setData("itemID", index)
	  },
  
	  remove (index) {
		  this.listSelected.splice(index,1)
		this.setBuilderContent()
	  }
	},
  }).mount('#app')

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const preheader = [
    {id:"pre1",content:'<div>preheader1</div>'},
    {id:"pre2",content:'<div>preheader2</div>'},
    {id:"pre3",content:'<div>preheader3</div>'},
    {id:"pre4",content:'<div>preheader4</div>'},
]

/* harmony default export */ __webpack_exports__["a"] = (preheader);

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const listTemplates = [
    {name: "service", 
    "preheader" : ["pre3"], 
    "header" : ["head1"],
    "body" : ["body3","body4"]},
    {name: "marketing1", 
        "preheader" : ["pre2"], 
        "header" : ["head2"],
        "body" : ["body1","body2"]},
    {name: "marketing2", 
        "preheader" : ["pre2"], 
        "header" : ["head1"],
        "body" : ["body2"]},
]

/* harmony default export */ __webpack_exports__["a"] = (listTemplates);



/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const body = [{id:"body1",content:'<div>body1</div>'},{id:"body2",content:'<div>body2</div>'},{id:"body3",content:'<div>body3</div>'},{id:"body4",content:'<div>bodyr4</div>'}]

/* harmony default export */ __webpack_exports__["a"] = (body);

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const header = [{id:"head1",content:`  <tr>
<td align="left" style="padding-left:0px;padding-right:0px;padding-top:0px;padding-bottom:0px;background-color:#C41F3E;">
  <!--[if mso]> <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%"><tr><td width="50%" valign="top"><![endif]-->
  <table role="presentation" border="0" cellpadding="0" cellspacing="0" align="left" class="force-row" style="width:320px; float:left;">
    <tr>
      <td class="col" valign="top" style="width:100%">
        <table role="presentation" border="0" cellpadding="0" cellspacing="0" class="contents" style="border-spacing:0;font-family: 'Whitney A', 'Whitney B', Arial, sans-serif;color:#606366;width:100%;">
          <tr>
            <td valign="middle" class="container-padding pt-3 pb-4" style="padding-bottom:0px; padding-right:20px; padding-left:40px; padding-top:80px; color: #ffffff; font-family: 'Whitney A', 'Whitney B', Arial, sans-serif; font-weight: 400; text-align: left;">
              <h1 style="margin:0;font-size:22px; line-height:114%; line-height:1.27!important;font-weight: 500;">Économisez jusqu’à 10&nbsp;¢ par litre à la&nbsp;pompe<sup style="line-height:100%;">1,2</sup></h1>
              <p style="margin: 0px;margin-top: 10px;font-size:18px; line-height: 108%; line-height: 1.16!important; font-weight: 500;">Activez vos économies quand vous faites le&nbsp;plein</p>
              <p style="Margin:0; Margin-top:20px; text-align:left;"> 
                <!--[if mso]> <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="https://www.cibc.com/fr/special-offers/journie-gas-rewards.html?utrc=E1307:2&utm_medium=Email&utm_campaign=Journie-Rewards_Debit-Card-Trigger_F22&" target="_blank" style="height:48px;v-text-anchor:middle;width:200px;" arcsize="10%" stroke="f" fillcolor="#ffffff" xt="SPCLICK"> <w:anchorlock/> <center> <![endif]-->
<a class="col" href="https://click.infotest.cibc.com/?qs=acb59851733109f8949236e257e386963499b4db194cae3b6c2977f952ef1b77414ea8d16c61361622f0f68d8d5907d528e792e50afbde0a" name="Pour en savoir plus" style="width:200px; display:inline-block; border-radius:4px; background-color:#ffffff; color:#c41f3e; font-family: 'Whitney A', 'Whitney B', Arial, sans-serif; font-size:18px; line-height:230%; line-height:2.6!important; font-weight: 500; text-align:center; text-decoration:none; -webkit-text-size-adjust:none;" target="_blank" xt="SPCLICK">Pour en savoir&nbsp;plus</a> 
                <!--[if mso]> </center> </v:roundrect> <![endif]--> 
              </p>
            </td>  
          </tr>
        </table>
      </td>
    </tr>
  </table>
  <!--[if mso]></td><td width="50%" valign="top"><![endif]-->
  <table role="presentation" border="0" cellpadding="0" cellspacing="0" align="right" class="force-row" style="width:320px; float:left;">
    <tr>
      <td class="col" valign="top" style="width:100%;padding:0;margin:0;background-color: #ffffff;"><div class="mbl-hide"> <img name="Cont_3" src="https://image.info.cibc.com/lib/fe2d11727364047c731d75/m/2/105d7198-4870-41e3-b20e-98a3d0722cb6.jpg" width="320" alt="Femme au volant d'une voiture" style="width:320px;max-width:640px;height:auto;display:block;margin:0px;" border="0"> </div>

        <!--[if !mso 9]><!-->

        <div class="mbl-show inline" style="display:none;"> <img name="Cont_3" src="https://image.info.cibc.com/lib/fe2d11727364047c731d75/m/2/105d7198-4870-41e3-b20e-98a3d0722cb6.jpg" width="320" alt="Femme au volant d'une voiture" style="width:100%;max-width:640px;height:auto;display:block;margin:0px;" border="0"> </div>

        <!--<![endif]--></td>
    </tr>
  </table>
  <!--[if mso]></td></tr></table><![endif]-->
</td>
</tr>`},{id:"head2",content:'<div>header2</div>'},{id:"head3",content:'<div>header3</div>'},{id:"head4",content:'<div>header4</div>'}]

/* harmony default export */ __webpack_exports__["a"] = (header);

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const logo = [{id:"log1", previewSrc: "",content:`<tr>
<td align="left" class="container-padding content" style="padding-left:40px; padding-right:40px; padding-top:34px; padding-bottom:34px; background-color:#f2f3f2;">
    <table align="left" border="0" cellpadding="0" cellspacing="0" role="presentation" style="text-align: left;">
        <tr>
            <td style="text-align:left;padding-right:16px;" valign="top">
                <a href="https://click.infotest.cibc.com/?qs=95abf4ec45f4924270c4adf189993fab49bf6c1bea9f3423eb2c14541dc14316b17089ba3e18869efbb8e2266ce019f2562e5c9cb9d250c5" name="CIBC Logo" style="display: inline-block; outline: none; border: none;" target="_blank" xt="SPCLICK">
                    <img alt="Logo CIBC" height="34" name="Cont_0" src="https://www.sc.pages02.net/lp/39688/483219/images/CIBC_logo.png" style="width:118px;outline:none;border:none;display:inline-block;" width="118"> 
                </a>
            </td>
        </tr>
    </table>
</td>
</tr>`}]

/* harmony default export */ __webpack_exports__["a"] = (logo);

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * Licensed under the BSD 3-Clause license.
 * For full license text, see LICENSE.txt file in the repo root  or https://opensource.org/licenses/BSD-3-Clause
 */

var SDK = function (config, whitelistOverride, sslOverride) {
	// config has been added as the primary parameter
	// If it is provided ensure that the other paramaters are correctly assigned
	// for backwards compatibility
	if (Array.isArray(config)) {
		whitelistOverride = config;
		sslOverride = whitelistOverride;
		config = undefined;
	}

	this._whitelistOverride = whitelistOverride;
	this._sslOverride = sslOverride;
	this._messageId = 1;
	this._messages = {
		0: function () {}
	};
	this._readyToPost = false;
	this._pendingMessages = [];
	this._receiveMessage = this._receiveMessage.bind(this);

	window.addEventListener('message', this._receiveMessage, false);

	window.parent.postMessage({
		method: 'handShake',
		origin: window.location.origin,
		payload: config
	}, '*');
};

SDK.prototype.execute = function execute (method, options) {
	options = options || {};
	
	var self = this;
	var payload = options.data;
	var callback = options.success;

	if (!this._readyToPost) {
		this._pendingMessages.push({
			method: method,
			payload: payload,
			callback: callback
		});
	} else {
		this._post({
			method: method,
			payload: payload
		}, callback);
	}
};

SDK.prototype.getCentralData = function (cb) {
	this.execute('getCentralData', {
		success: cb
	});
};

SDK.prototype.getContent = function (cb) {
	this.execute('getContent', {
		success: cb
	});
};

SDK.prototype.getData = function (cb) {
	this.execute('getData', {
		success: cb
	});
};

SDK.prototype.getUserData = function (cb) {
	this.execute('getUserData', {
		success: cb
	});
};

SDK.prototype.getView = function (cb) {
	this.execute('getView', {
		success: cb
	});
};

SDK.prototype.setBlockEditorWidth = function (value, cb) {
	this.execute('setBlockEditorWidth', {
		data: value,
		success: cb
	});
};

SDK.prototype.setCentralData = function (dataObj, cb) {
	this.execute('setCentralData', {
		data: dataObj, 
		success: cb
	});
};

SDK.prototype.setContent = function (content, cb) {
	this.execute('setContent', {
		data: content, 
		success: cb});
};

SDK.prototype.setData = function (dataObj, cb) {
	this.execute('setData', {
		data: dataObj, 
		success: cb
	});
};

SDK.prototype.setSuperContent = function (content, cb) {
	this.execute('setSuperContent', {
		data: content, 
		success: cb
	});
};

SDK.prototype.triggerAuth = function (appID) {
	this.getUserData(function (userData) {
		var stack = userData.stack;
		if (stack.indexOf('qa') === 0) {
			stack = stack.substring(3,5) + '.' + stack.substring(0,3);
		}
		var iframe = document.createElement('IFRAME');
		iframe.src = 'https://mc.' + stack + '.exacttarget.com/cloud/tools/SSO.aspx?appId=' + appID + '&restToken=1&hub=1';
		iframe.style.width= '1px';
		iframe.style.height = '1px';
		iframe.style.position = 'absolute';
		iframe.style.top = '0';
		iframe.style.left = '0';
		iframe.style.visibility = 'hidden';
		iframe.className = 'authframe';
		document.body.appendChild(iframe);
	});
};

/* Internal Methods */

SDK.prototype._executePendingMessages = function _executePendingMessages () {
	var self = this;

	this._pendingMessages.forEach(function (thisMessage) {
		self.execute(thisMessage.method, {
			data: thisMessage.payload, 
			success: thisMessage.callback
		});
	});

	this._pendingMessages = [];
};

SDK.prototype._post = function _post (payload, callback) {
	this._messages[this._messageId] = callback;
	payload.id = this._messageId;
	this._messageId += 1;
	// the actual postMessage always uses the validated origin
	window.parent.postMessage(payload, this._parentOrigin);
};

SDK.prototype._receiveMessage = function _receiveMessage (message) {
	message = message || {};
	var data = message.data || {};

	if (data.method === 'handShake') {
		if (this._validateOrigin(data.origin)) {
			this._parentOrigin = data.origin;
			this._readyToPost = true;
			this._executePendingMessages();
			return;
		}
	}

	// if the message is not from the validated origin it gets ignored
	if (!this._parentOrigin || this._parentOrigin !== message.origin) {
		return;
	}
	// when the message has been received, we execute its callback
	(this._messages[data.id || 0] || function () {})(data.payload);
	delete this._messages[data.id];
};

// the custom block should verify it is being called from the marketing cloud
SDK.prototype._validateOrigin = function _validateOrigin (origin) {
	// Make sure to escape periods since these strings are used in a regular expression
	var allowedDomains = this._whitelistOverride || ['exacttarget\\.com', 'marketingcloudapps\\.com', 'blocktester\\.herokuapp\\.com'];

	for (var i = 0; i < allowedDomains.length; i++) {
		// Makes the s optional in https
		var optionalSsl = this._sslOverride ? '?' : '';
		var mcSubdomain = allowedDomains[i] === 'exacttarget\\.com' ? 'mc\\.' : '';
		var whitelistRegex = new RegExp('^https' + optionalSsl + '://' + mcSubdomain + '([a-zA-Z0-9-]+\\.)*' + allowedDomains[i] + '(:[0-9]+)?$', 'i');

		if (whitelistRegex.test(origin)) {
			return true;
		}
	}

	return false;
};

if (typeof(window) === 'object') {
	window.sfdc = window.sfdc || {};
	window.sfdc.BlockSDK = SDK;
}
if (true) {
	module.exports = SDK;
}


/***/ })
/******/ ]);