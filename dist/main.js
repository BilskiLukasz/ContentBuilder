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
	blockEditorWidth: 520,
	tabs: [
		'htmlblock',
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

	  sdk.setData({"items" : this.listSelected.map((el) => {return {"id": el.id,"thumbnail": el.thumbnail, "content": el.content}})})
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
    {
        id:"pre1",
        thumbnail: './imgs/Preheader.png',
        content:`<tr>
        <td class="px-2" align="left" style="padding-left:40px;padding-right:40px;padding-top:10px;padding-bottom:10px; background-color: #ffffff;">
            <!--[if mso]>             <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">             <tr><td width="70%" valign="top"><![endif]-->
            <table role="presentation" border="0" cellpadding="0" cellspacing="0" align="left" class="force-row mobile-height" style="float:left;width:430px;">
                <tr>
                    <td class="mbl-center" style="font-family: 'Whitney A', 'Whitney B', Arial, sans-serif;color:#606366;text-align:left;font-size:12px;line-height:120%;line-height:1.4!important;">
                      Preheader copy
                    </td>
                </tr>
            </table>
            <!--[if mso]></td><td width="30%" valign="top"><![endif]-->
            <table role="presentation" border="0" cellpadding="0" cellspacing="0" align="right" class="force-row mobile-height" style="float:left;width:130px;">
                <tr>
                    <td class="mbl-center" style="font-family: 'Whitney A', 'Whitney B', Arial, sans-serif;color:#606366;text-align:right;font-size:12px;line-height:120%;line-height:1.4!important;">
                      <a href="%%view_email_url%%" target="_blank" style="color:#606366;text-decoration:underline;" name="Read Online">Read&nbsp;online</a>
                    </td>
                </tr>
            </table> 
        <!--[if mso]></td></tr></table><![endif]-->
        </td>
      </tr>`
    },
    {
        id:"pre2",
        thumbnail: './imgs/Preheader_FR.png',
        content:`  <tr>
        <td class="px-2" align="left" style="padding-left:40px;padding-right:40px;padding-top:10px;padding-bottom:10px; background-color: #ffffff;">
            <!--[if mso]>           <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">           <tr><td width="70%" valign="top"><![endif]-->
            <table role="presentation" border="0" cellpadding="0" cellspacing="0" align="left" class="force-row mobile-height" style="float:left;width:430px;">
                <tr>
                    <td class="mbl-center" style="font-family: 'Whitney A', 'Whitney B', Arial, sans-serif;color:#606366;text-align:left;font-size:12px;line-height:120%;line-height:1.4!important;">
                      Preheader copy
                    </td> 
                </tr>
            </table>
            <!--[if mso]></td><td width="30%" valign="top"><![endif]-->
            <table role="presentation" border="0" cellpadding="0" cellspacing="0" align="right" class="force-row mobile-height" style="float:left;width:130px;">
                <tr>
                    <td class="mbl-center" style="font-family: 'Whitney A', 'Whitney B', Arial, sans-serif;color:#606366;text-align:right;font-size:12px;line-height:120%;line-height:1.4!important;">
                      <a href="%%view_email_url%%" target="_blank" style="color:#606366;text-decoration:underline;" name="Read Online">Lisez la version <span style="white-space:nowrap;">en&nbsp;ligne</span></a>
                    </td>
                </tr>
            </table> 
        <!--[if mso]></td></tr></table><![endif]-->
        </td>
      </tr> `
    },
    {
        id:"pre3",
        thumbnail: './imgs/Preheader_NoText.png',
        content:`  <tr>
        <td class="px-2" align="left" style="padding-left:40px;padding-right:40px;padding-top:10px;padding-bottom:10px; background-color: #ffffff;">
            <!--[if mso]>           <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">           <tr><td width="70%" valign="top"><![endif]-->
            <table role="presentation" border="0" cellpadding="0" cellspacing="0" align="left" class="force-row mobile-height" style="float:left;width:430px;">
                <tr>
                    <td class="mbl-center" style="font-family: 'Whitney A', 'Whitney B', Arial, sans-serif;color:#606366;text-align:left;font-size:12px;line-height:120%;line-height:1.4!important;">
                      Preheader copy
                    </td> 
                </tr>
            </table>
            <!--[if mso]></td><td width="30%" valign="top"><![endif]-->
            <table role="presentation" border="0" cellpadding="0" cellspacing="0" align="right" class="force-row mobile-height" style="float:left;width:130px;">
                <tr>
                    <td class="mbl-center" style="font-family: 'Whitney A', 'Whitney B', Arial, sans-serif;color:#606366;text-align:right;font-size:12px;line-height:120%;line-height:1.4!important;">
                      <a href="%%view_email_url%%" target="_blank" style="color:#606366;text-decoration:underline;" name="Read Online">Lisez la version <span style="white-space:nowrap;">en&nbsp;ligne</span></a>
                    </td>
                </tr>
            </table> 
        <!--[if mso]></td></tr></table><![endif]-->
        </td>
      </tr> `
    },
    {
        id:"pre4",
        thumbnail: './imgs/Preheader_FR.png',
        content:`  <tr>
        <td class="px-2" align="left" style="padding-left:40px;padding-right:40px;padding-top:10px;padding-bottom:10px; background-color: #ffffff;">
            <!--[if mso]>           <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">           <tr><td width="70%" valign="top"><![endif]-->
            <table role="presentation" border="0" cellpadding="0" cellspacing="0" align="left" class="force-row mobile-height" style="float:left;width:430px;">
                <tr>
                    <td class="mbl-center" style="font-family: 'Whitney A', 'Whitney B', Arial, sans-serif;color:#606366;text-align:left;font-size:12px;line-height:120%;line-height:1.4!important;">
                      Preheader copy
                    </td> 
                </tr>
            </table>
            <!--[if mso]></td><td width="30%" valign="top"><![endif]-->
            <table role="presentation" border="0" cellpadding="0" cellspacing="0" align="right" class="force-row mobile-height" style="float:left;width:130px;">
                <tr>
                    <td class="mbl-center" style="font-family: 'Whitney A', 'Whitney B', Arial, sans-serif;color:#606366;text-align:right;font-size:12px;line-height:120%;line-height:1.4!important;">
                      <a href="%%view_email_url%%" target="_blank" style="color:#606366;text-decoration:underline;" name="Read Online">Lisez la version <span style="white-space:nowrap;">en&nbsp;ligne</span></a>
                    </td>
                </tr>
            </table> 
        <!--[if mso]></td></tr></table><![endif]-->
        </td>
      </tr> `
    },
    {
        id:"pre5",
        thumbnail: './imgs/Preheader_points.png',
        content:`  <tr>
        <td class="px-2" align="left" style="padding-left:40px;padding-right:40px;padding-top:10px;padding-bottom:10px; background-color: #ffffff;border-bottom:1px solid #AFAFAF;">
            <!--[if mso]>             <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">             <tr><td width="70%" valign="top"><![endif]-->
            <table role="presentation" border="0" cellpadding="0" cellspacing="0" align="left" class="force-row mobile-height" style="float:left;width:430px;">
                <tr>
                    <td class="mbl-center" style="font-family: 'Whitney A', 'Whitney B', Arial, sans-serif;color:#606366;text-align:left;font-size:12px;line-height:120%;line-height:1.4!important;">
                      PREHEADER TEXT
                    </td> 
                </tr>
            </table>
            <!--[if mso]></td><td width="30%" valign="top"><![endif]-->
            <table role="presentation" border="0" cellpadding="0" cellspacing="0" align="right" class="force-row mobile-height" style="float:left;width:130px;">
                <tr>
                    <td class="mbl-center" style="font-family: 'Whitney A', 'Whitney B', Arial, sans-serif;color:#606366;text-align:right;font-size:12px;line-height:120%;line-height:1.4!important;">
                      <a href="%%view_email_url%%" target="_blank" style="color:#606366;text-decoration:underline;" name="Read Online">Read&nbsp;online</a>
                    </td>
                </tr>
            </table> 
        <!--[if mso]></td></tr></table><![endif]-->
        </td>
      </tr>                       
      <tr>
        <td>
          <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="width:100%">
            <tr>
              <td class="mbl-right px-2" style="padding:10px 40px; font-family: 'Whitney A', 'Whitney B', Arial, sans-serif;color:#C41F3E; font-size:14px; line-height:125%; line-height:1.5!important; text-align: right;">
                Sample text here<br>
                <a style="color:#C41F3E;text-decoration:none;cursor:text">Date here</a>*: <strong style="font-weight:600;">$</strong>
              </td>
            </tr>
          </table>
        </td>
      </tr> `
    }
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
const body = [
    {
        id:"body1",
        thumbnail: './imgs/Body_Intro.png',
        content:`<tr>
        <td class="one-column" style="padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;background-color:#ffffff;">
          <table role="presentation" width="100%" style="border-spacing:0;font-family: 'Whitney A', 'Whitney B', Arial, sans-serif;">
            <tr>
                <td class="body-text" style="width:100%; padding-top:40px; padding-bottom:40px; padding-right:40px; padding-left:40px; background-color: #ffffff; color: #606366; font-family: 'Whitney A', 'Whitney B', Arial, sans-serif; font-size:14px;line-height:125%;line-height:1.5!important; text-align:left;font-weight: 400;">
                    <p style="margin:0; margin-bottom:22px;">Hi %%=v(@firstName)=%%,</p>
                    <p style="margin:0;margin-bottom:22px;">Contrary to popular belief</p>
                    <p style="margin:0;margin-bottom:22px;">There are many <strong style="font-weight:600;">variations of passages of Lorem Ipsum</strong> available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle <span style="white-space:nowrap;">of&nbsp;text.</span></p>
                    <p style="margin:0;margin-bottom:22px;">The first line of <strong style="font-weight:600;">Lorem Ipsum</strong>, "Lorem ipsum dolor sit amet..", comes from a line in <span style="white-space:nowrap;">section&nbsp;1&#8205;.1&#8205;0.&#8205;3&#8205;2.</span></p>
                    <p style="margin:0;">All the Lorem <span style="white-space:nowrap;">Ipsum&nbsp;generators!</span></p>
                </td>
            </tr>
          </table>
        </td>
      </tr>`
    },
    {
        id:"body2",
        thumbnail: './imgs/Body_Intro_withCard.png',
        content:`    <tr>
        <td class="content" align="left" style="padding-left:0px;padding-right:0px;padding-top:0px;padding-bottom:30px;background-color:#FFFFFF;">
          <!--[if mso]>
          <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%"><tr><td width="50%" valign="top"><![endif]-->
          <table role="presentation" border="0" cellpadding="0" cellspacing="0" align="left" class="force-row" style="float:left;width:320px;">
            <tr>
              <td class="col" valign="top" style="width:100%">
                <table role="presentation" class="contents" style="border-spacing:0;font-family: 'Whitney A', 'Whitney B', Arial, sans-serif;color:#606366;width:100%;">
                   <tr>
                      <td valign="middle" class="container-padding pt-3" style="padding-bottom:0px; padding-right:10px; padding-left:40px; padding-top:40px; color: #606366; font-family: 'Whitney A', 'Whitney B', Arial, sans-serif; font-size:14px;line-height:125%;line-height:1.5!important;  font-weight: 400;  text-align: left;">
                        <p style="Margin:0; Margin-bottom:22px;">
                            Hi %%=v(@firstName)=%%,
                        </p>
                        <p style="Margin:0;">
                            Thanks for choosing the CIBC Costco<sup>®†</sup> Mastercard<sup>®</sup>. You’ve made a great choice because now you’ll earn cash back<sup>1</sup> everywhere you <span style="white-space:nowrap;">shop&nbsp;–</span> not just <span style="white-space:nowrap;">at&nbsp;Costco!</span>
                        </p>
                      </td>
                   </tr>
                </table>
              </td>
            </tr>
          </table>
          <!--[if mso]></td><td width="50%" valign="top"><![endif]-->
          <table role="presentation" border="0" cellpadding="0" cellspacing="0" align="right" class="force-row" style="float:left;width:320px;background-color: #ffffff;">
            <tr>
              <td class="col pt-3 pl-0 pr-0 pb-0" valign="top" style="width:100%;padding:0;margin:0;background-color: #ffffff;padding-left:0px;padding-top:40px;padding-left:30px;padding-right:30px;padding-bottom:0px;text-align: center;">
                <img align="center" name="Cont_3" src="https://image.info.cibc.com/lib/fe2d11727364047c731d75/m/2/4cd42ce0-9633-4ea2-a9a4-de42963c4920.png" width="260" border="0" alt="CIBC Costco Mastercard" style="width:260px;max-width:260px;height:auto;display:inline-block;margin-left:0;margin-right:0px;border:none;">
              </td>
            </tr>
          </table>
          <!--[if mso]></td></tr></table><![endif]-->
        </td>
      </tr>`
    },
    {
        id:"body3",
        thumbnail: './imgs/Body_3columns_text.png',
        content:`<tr>
        <td class="content body-text" align="left" style="padding-left:40px;padding-right:40px;padding-top:0px;padding-bottom:40px;background-color:#f2f3f2;">
          <table role="presentation" border="0" cellpadding="0" cellspacing="0">
            <tr>
              <td style="width:100%; padding-top:40px; padding-bottom:10px; padding-right:0px; padding-left:0px; background-color: #f2f3f2; color: #C41F3E; font-family: 'Whitney A', 'Whitney B', Arial, sans-serif;font-size:20px;line-height:115%;line-height:1.3!important; text-align:center;font-weight:500;">
                  <p class="mbl-center" style="margin: 0;">Get rewarded when you dine <br class="mbl-show" style="display:none;mso-hide:all;">and shop this <span style="white-space:nowrap;">holi&#8205;day&nbsp;season</span></p>
              </td>
            </tr>
            <tr>
              <td class="body-text" style="padding-right:0px; padding-left:0px; padding-top:0px; padding-bottom:0px; font-size:0; text-align:center;">
                <!--[if mso]>
                  <table role="presentation" border="0" width="560" cellpadding="0" cellspacing="0" style="width:560px;">
                  <tr><td width="186" style="width:186px;" valign="top"><![endif]-->
                  <table role="presentation" width="186" border="0" cellpadding="0" cellspacing="0" align="left" class="force-row" style="float:left;width:186px;">
                    <tr>
                      <td class="col" valign="top" style="padding-left:10px; padding-right:10px; padding-top:0; padding-bottom:0;">
                        <table role="presentation" align="center" class="contents" style="border-spacing:0; color:#606366; font-family: 'Whitney A', 'Whitney B', Arial, sans-serif; font-size:14px; line-height:14px; text-align:center;">
                          <tr>
                            <td style="padding-top:20px; padding-bottom:14px;">
                              <table role="presentation" border="0" cellpadding="0" cellspacing="0" align="center">
                                <tr>
                                  <td style="font-family: 'Whitney A', 'Whitney B', Arial, sans-serif;">
                                    <p style="margin:0;font-size:42px;line-height:100%;line-height:1!important;font-weight: 600;color:#8B1D41;">3%</p>
                                  </td>
                                  <td valign="middle" style="font-family: 'Whitney A', 'Whitney B', Arial, sans-serif;padding-left:10px;vertical-align: middle;">
                                    <p style="margin:0;font-size:20px;line-height:105%;line-height:1.1!important;font-weight: 600;color:#8B1D41;">cash<br>back</p>
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                          <tr>
                            <td style="color:#606366; font-family: 'Whitney A', 'Whitney B', Arial, sans-serif; font-size:14px;line-height:125%;line-height:1.5!important; text-align:center;">
                              <p style="Margin:0;">on dining and <br>eligible <span style="white-space:nowrap;">Costco&nbsp;gas<sup style="line-height:0;">1</sup></span></p>                  
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                  <!--[if mso]></td><td width="186" style="width: 186px;" valign="top"><![endif]-->
                    <table role="presentation" width="186" border="0" cellpadding="0" cellspacing="0" align="left" class="force-row" style="float:left;width:186px;">
                      <tr>
                        <td class="col" valign="top" style="padding-left:10px; padding-right:10px; padding-top:0; padding-bottom:0;">
                          <table role="presentation" align="center" class="contents" style="border-spacing:0; color:#606366; font-family: 'Whitney A', 'Whitney B', Arial, sans-serif; font-size:14px; line-height:14px; text-align:center;">
                            <tr>
                              <td style="padding-top:20px; padding-bottom:14px;">
                                <table role="presentation" border="0" cellpadding="0" cellspacing="0" align="center">
                                  <tr>
                                    <td style="font-family: 'Whitney A', 'Whitney B', Arial, sans-serif;">
                                      <p style="margin:0;font-size:42px;line-height:100%;line-height:1!important;font-weight: 600;color:#8B1D41;">2%</p>
                                    </td>
                                    <td valign="middle" style="font-family: 'Whitney A', 'Whitney B', Arial, sans-serif;padding-left:10px;vertical-align: middle;">
                                      <p style="margin:0;font-size:20px;line-height:105%;line-height:1.1!important;font-weight: 600;color:#8B1D41;">cash<br>back</p>
                                    </td>
                                  </tr>
                                </table>
                              </td>
                            </tr>
                            <tr>
                              <td style="color:#606366; font-family: 'Whitney A', 'Whitney B', Arial, sans-serif; font-size:14px;line-height:125%;line-height:1.5!important; text-align:center;">
                                <p style="Margin:0;">at other gas stations <br>and Co&#8205;stc&#8205;o.&#8205;c&#8205;a on <br><span style="white-space:nowrap;">eligible&nbsp;purchases<sup style="line-height:0;">1</sup></span> </p>                  
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                  <!--[if mso]></td><td width="186" style="width: 186px;" valign="top"><![endif]-->
                    <table role="presentation" width="186" border="0" cellpadding="0" cellspacing="0" align="left" class="force-row" style="float:left;width:186px;">
                      <tr>
                        <td class="col" valign="top" style="padding-left:10px; padding-right:10px; padding-top:0; padding-bottom:0;">
                          <table role="presentation" align="center" class="contents" style="border-spacing:0; color:#606366; font-family: 'Whitney A', 'Whitney B', Arial, sans-serif; font-size:14px; line-height:14px; text-align:center;">
                            <tr>
                              <td style="padding-top:20px; padding-bottom:14px;">
                                <table role="presentation" border="0" cellpadding="0" cellspacing="0" align="center">
                                  <tr>
                                    <td style="font-family: 'Whitney A', 'Whitney B', Arial, sans-serif;">
                                      <p style="margin:0;font-size:42px;line-height:100%;line-height:1!important;font-weight: 600;color:#8B1D41;">1%</p>
                                    </td>
                                    <td valign="middle" style="font-family: 'Whitney A', 'Whitney B', Arial, sans-serif;padding-left:10px;vertical-align: middle;">
                                      <p style="margin:0;font-size:20px;line-height:105%;line-height:1.1!important;font-weight: 600;color:#8B1D41;">cash<br>back</p>
                                    </td>
                                  </tr>
                                </table>
                              </td>
                            </tr>
                            <tr>
                              <td style="color:#606366; font-family: 'Whitney A', 'Whitney B', Arial, sans-serif; font-size:14px;line-height:125%;line-height:1.5!important; text-align:center;">
                                <p style="Margin:0;">on all other purchases <br>including <span style="white-space:nowrap;">at&nbsp;Costco<sup style="line-height:0;">1</sup></span></p>                  
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                <!--[if mso]></td></tr></table><![endif]-->
              </td>
            </tr>
          </table>
        </td>
      </tr>`
    },
    {
        id:"body4",
        thumbnail: './imgs/Body_3columns_icons.png',
        content:`<tr>
        <td class="content" align="left" style="padding-top:40px;padding-bottom:40px;background-color:#f2f3f2;">
          <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="width:100%;">
            <tr>
              <td class="body-text" style="width:100%; padding-left:40px;padding-right:40px;padding-bottom:10px; background-color: #f2f3f2; color: #C41F3E; font-family: 'Whitney A', 'Whitney B', Arial, sans-serif;font-size:20px;line-height:115%;line-height:1.3!important; text-align:center;font-weight:500;">
                <p class="mbl-center" style="margin:0;">Bank securely and <span style="white-space:nowrap;">conveniently&nbsp;from&nbsp;home</span></p>
              </td>
            </tr>
            <tr>
              <td class="body-text" style="padding-left:40px;padding-right:40px; padding-top:0px; padding-bottom:0px; font-size:0;line-height: 0; text-align:center;">
                <!--[if mso]>               <table role="presentation" border="0" width="100%" cellpadding="0" cellspacing="0" style="width:100%;">               <tr><td width="186" style="width:186px;" valign="top"><![endif]-->
                  <table role="presentation" width="186" border="0" cellpadding="0" cellspacing="0" align="left" class="force-row" style="float:left;width:186px;">
                    <tr>
                      <td align="center" class="col pr-0" valign="top" style="padding-left:0px;  padding-top:0; padding-bottom:0;">
                        <table role="presentation" align="center" class="contents" style="border-spacing:0; color:#606366; font-family: 'Whitney A', 'Whitney B', Arial, sans-serif; font-size:14px; line-height:14px; text-align:center;">
                          <tr>
                            <td style="padding-top:20px;">
                              <img border="0" name="Cont_0" src="https://image.info.cibc.com/lib/fe2d11727364047c731d75/m/1/6ad41f00-0d46-42d9-87f3-6f5ef4a8e706.png" alt="Mobile Phone icon" width="80" style="border-width:0; width:80px; max-width:80px; height:auto; display:block; margin-left:auto; margin-right:auto;">
                            </td>
                          </tr>
                          <tr>
                            <td class="mbl-width_220" style="color:#606366; font-family: 'Whitney A', 'Whitney B', Arial, sans-serif; font-size:14px;line-height:125%;line-height:1.5!important; text-align:center;">
                                    <p style="margin:0;margin-top:16px;font-weight: 600;"><a href="https://click.infotest.cibc.com/?qs=1ae4c5eb116c4675f5660acc691c9697e7720773804a7fe901ac42269ab745955edd71be56c8947c2654536ee4f934a069b2a12ee3f4d5b92ce626f983fcc74b" target="_blank" name="How-to guides" style="color:#606366;text-decoration:underline;">How-to guides</a></p>
                                    <p style="Margin:0;">Explore ways to use <br class="mbl-hide"><span style="white-space:nowrap;">digital&nbsp;banking</span> <br class="mbl-show" style="display:none;">to <br class="mbl-hide">manage your money <span style="white-space:nowrap;">anytime,&nbsp;anywhere</span></p>
                                    <!--[if mso]><p style="margin:0;font-size: 1px;line-height: 1px;">&nbsp;</p><![endif]-->             
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                  <!--[if mso]></td><td width="188" style="width: 188px;" valign="top"><![endif]-->
                    <table role="presentation" width="188" border="0" cellpadding="0" cellspacing="0" align="left" class="force-row" style="float:left;width:188px;">
                      <tr>
                        <td align="center" class="col pl-0 pr-0" valign="top" style="">
                          <table role="presentation" align="center" class="contents" style="border-spacing:0; color:#606366; font-family: 'Whitney A', 'Whitney B', Arial, sans-serif; font-size:14px; line-height:14px; text-align:center;">
                            <tr>
                              <td style="padding-top:20px;">
                                <img border="0" name="Cont_0" src="https://image.info.cibc.com/lib/fe2d11727364047c731d75/m/1/0c4dd334-877f-42d9-8e97-408e6f3d7941.png" alt="Computer and phone icon" width="80" style="border-width:0; width:80px; max-width:80px; height:auto; display:block; margin-left:auto; margin-right:auto;">
                              </td>
                            </tr>
                            <tr>
                              <td class="mbl-width_220" style="color:#606366; font-family: 'Whitney A', 'Whitney B', Arial, sans-serif; font-size:14px;line-height:125%;line-height:1.5!important; text-align:center;">
                                  <p style="margin:0;margin-top:16px;font-weight:600;"><a href="https://click.infotest.cibc.com/?qs=1ae4c5eb116c4675c1002457854e63fea886e0d6e538420d0924c906c8f6670306de87563c9cc8a21a252443798ea21e356544c36ca948c6ec18faab9ae61ac0" target="_blank" name="eStatements" style="color:#606366;text-decoration:underline;">eStatements</a></p>                            
                                  <p style="Margin:0;">View up to 7 years <br class="mbl-hide">of <span style="white-space:nowrap;">your&nbsp;account</span> <br class="mbl-hide">eStatements online and <span style="white-space:nowrap;">on&nbsp;your&nbsp;mobile&nbsp;device</span></p>
                                  <!--[if mso]><p style="margin:0;font-size: 1px;line-height: 1px;">&nbsp;</p><![endif]-->
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                  <!--[if mso]></td><td width="186" style="width: 186px;" valign="top"><![endif]-->
                    <table role="presentation" width="186" border="0" cellpadding="0" cellspacing="0" align="left" class="force-row" style="float:left;width:186px;">
                      <tr>
                        <td align="center" class="col pl-0" valign="top" style=" padding-right:0px; padding-top:0; padding-bottom:0;">
                          <table role="presentation" align="center" class="contents" style="border-spacing:0; color:#606366; font-family: 'Whitney A', 'Whitney B', Arial, sans-serif; font-size:14px; line-height:14px; text-align:center;">
                            <tr>
                              <td style="padding-top:20px;">
                                <img border="0" name="Cont_0" src="https://image.info.cibc.com/lib/fe2d11727364047c731d75/m/1/c6b34544-3eaa-4cfd-b796-401a56189086.png" alt="Virtual Assistant" width="80" style="border-width:0; width:80px; max-width:80px; height:auto; display:block; margin-left:auto; margin-right:auto;">
                              </td>
                            </tr>
                            <tr>
                              <td class="mbl-width_220" style="color:#606366; font-family: 'Whitney A', 'Whitney B', Arial, sans-serif; font-size:14px;line-height:125%;line-height:1.5!important; text-align:center;">
                                      <p style="margin:0;margin-top:16px;font-weight: 600;"><a href="https://click.infotest.cibc.com/?qs=1ae4c5eb116c46758944522af76d5222adaef7a63c8f370ac22ed5e28e7e4b81db930a5c0391d3fbe8fe72e5e9eafa68e384119dd6ee40930fc110ec8f6a130f" target="_blank" name="Virtual Assistant" style="color:#606366;text-decoration:underline;">Virtual Assistant</a></p>
                                      <p style="Margin:0;">Available 2&#8205;4&#8205;/&#8205;7 to answer <br class="mbl-hide">your questions and <br class="mbl-hide">complete everyday <span style="white-space:nowrap;">banking&nbsp;tasks</span></p>
                                      <!--[if mso]><p style="margin:0;font-size: 1px;line-height: 1px;">&nbsp;</p><![endif]-->
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                <!--[if mso]></td></tr></table><![endif]-->
              </td>
            </tr>
          </table>
        </td>
      </tr>`
    },
    {
        id:"body5",
        thumbnail: './imgs/Body_2columns.png',
        content:`<tr>
        <td class="col px-2" style="padding: 0px 0px 0px 0px;background-color:#c41f3e;">
          <table role="presentation" style="border-spacing:0;font-family: 'Whitney A', 'Whitney B', Arial, sans-serif; background-color: #c41f3e;">
            <tr>
              <td class="px-2 pt-4" style="padding: 40px; ">
                <table role="presentation" style="border-spacing:0;font-family: 'Whitney A', 'Whitney B', Arial, sans-serif; background-color: #c41f3e;">
                  <tr>
                    <th class="mob-stack mbl-center pb-2 pr-0" style="color: #ca1844; font-size:20px; line-height: 110%; line-height:1.2 !important; font-weight: normal; padding-right: 20px;">
                      <img src="https://image.info.cibc.com/lib/fe2d11727364047c731d75/m/1/98246687-6281-4702-b165-5be6b486c984.png" width="85" style="width: 85px; max-width: 85px; display:inline-block;" alt="Task icon">
                    </th>
                    <th class="mob-stack mbl-center" style="font-size: 14px; font-weight: normal; font-family: 'Whitney A', 'Whitney B', Arial, sans-serif; font-size: 14px; line-height: 125%; line-height: 1.5 !important; text-align:left; color: #ffffff;">
                      <p style="margin: 0; margin-bottom: 10px; color:#ffffff; font-weight: 500; font-size: 20px;">Now that you’ve gone through our tips on recognizing fraud, test your&nbsp;knowledge</p>
                      <p style="margin: 0;font-size: 20px; line-height: 125%; line-height:  1.3 !important;  font-weight: 600;"><a href="https://www.cibc.com/en/privacy-security/banking-fraud/scam-quiz.html?utrc=E1602:3&utm_medium=Email&utm_campaign=Fraud-prevention-month-email-&" target="_blank" style="color:#ffffff; text-decoration:underline;">Take the quiz</a>&nbsp;&nbsp;&gt;</p>
                    </th>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </td>
      </tr>`
    },
    {
        id:"body6",
        thumbnail: './imgs/Body_bulletPoints.png',
        content:`    <tr>
        <td class="col" style="padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;background-color:#ffffff;border:none;" border="0">
            <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="border-spacing:0;font-family: 'Whitney A', 'Whitney B', Arial, sans-serif;">
                <tr>
                    <td class="body-text mbl-center" style="width:100%; padding-top:40px; padding-bottom:20px; padding-right:40px; padding-left:40px; background-color: #ffffff; color: #606366; font-family: 'Whitney A', 'Whitney B', Arial, sans-serif; font-size: 14px; line-height: 125%; line-height:  1.5 !important; text-align:center;border:none;" border="0">
                        <h1 style="margin:0; color: #c41f3e; font-size:20px; line-height:110%;line-height: 1.2 !important;  font-weight: 500;">Steps to ensure your financial&nbsp;safety</h1>
                    </td>
                </tr>
          <tr>
        <td class="col pt-0 pb-4 pr-2 pl-2" style="width:100%; margin:0;text-align: left;padding-bottom: 40px;padding-right:40px;padding-left: 40px;padding-top: 0;" valign="top">
          <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%">

            <tr>
              <td class="pb-1" style="padding-top:5px; padding-bottom:8px; padding-right:8px; padding-left:0px; color: #606366; font-family: 'Whitney A', 'Whitney B', Arial, sans-serif; font-size:14px; line-height:125%; line-height:1.5!important;" valign="top">
                &bull;</td>
              <td class="pb-1" style="padding-top:5px; padding-bottom:8px; padding-right:0px; padding-left:0px; color: #606366; font-family: 'Whitney A', 'Whitney B', Arial, sans-serif; font-size:14px; line-height:125%; line-height:1.5!important;" valign="top">Enable push verification codes and fraud prevention alerts on your mobile device by opening the CIBC app or online banking under Settings and Security &gt; Account Security&nbsp;section. </td>
            </tr>
            <tr>
              <td class="pb-1" style="padding-top:5px; padding-bottom:8px; padding-right:8px; padding-left:0px; color: #606366; font-family: 'Whitney A', 'Whitney B', Arial, sans-serif; font-size:14px; line-height:125%; line-height:1.5!important;" valign="top">
                &bull;</td>
              <td class="pb-0" style="padding-top:5px; padding-bottom:0px; padding-right:0px; padding-left:0px; color: #606366; font-family: 'Whitney A', 'Whitney B', Arial, sans-serif; font-size:14px; line-height:125%; line-height:1.5!important;" valign="top">The next time you call us, ask the representative to activate voice verification if not active&nbsp;already.</td>
            </tr>

          </table>
        </td>
      </tr>            </table>
        </td>
    </tr>`
    },
    {
        id:"body7",
        thumbnail: './imgs/Body_stretched_copy.png',
        content:`    <tr>
        <td>
            <table role="presentation" width="100%" style="border-spacing:0; background-color:#f2f3f2; font-family: 'Whitney A', 'Whitney B', Arial, sans-serif;">
                <tr>
                  <td class="body-text pt-3 pb-2" style="padding-top:40px; padding-bottom:30px; padding-right:40px; padding-left:40px; color: #C41F3E; font-family: 'Whitney A', 'Whitney B', Arial, sans-serif; font-size: 22px; line-height: 110%; line-height:  1.2 !important; text-align: center;">
                    <p style="Margin:0; font-weight: 500;">
                        Section Title
                    </p>
                  </td>
                </tr>
            </table>
        </td>
      </tr>
  
      <tr>
        <td class="one-column body-text" style="padding-top:0; padding-bottom:0; padding-right:60px; padding-left:60px; background-color:#f2f3f2; color:#606366;">
            <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="border-spacing:0; font-family: 'Whitney A', 'Whitney B', Arial, sans-serif;width: 100%;">
              <tr>
                  <td valign="top" width="30" style="width:30px;padding-top:0px; padding-bottom:0px; padding-right:0px; padding-left:0px; color: #606366; font-family: 'Whitney A', 'Whitney B', Arial, sans-serif; text-align:center;vertical-align: top;">                                  
                    <img name="Cont_4" src="https://image.info.cibc.com/lib/fe2d11727364047c731d75/m/1/eb21f9aa-e7e2-4228-8013-4892a49ba57f.png" width="30" alt="checkmark" style="max-width:30px;height:auto;display:block;margin:0px;">
                  </td>
                  <td valign="top" class="pl-2" style="padding-top:0px; padding-bottom:0px; padding-right:0px; padding-left:40px; color: #606366; font-family: 'Whitney A', 'Whitney B', Arial, sans-serif; font-size:14px;line-height:125%;line-height:1.5!important; text-align:left;vertical-align: top;">
                    <div class="mbl-hide">
                      <p style="Margin:0;color:#c41f3e; font-size:14px;line-height:125%;line-height:1.5!important; font-weight:600;">
                        First point Desktop
                      </p>
                    </div>
                    <!--[if !mso 9]><!-->
                    <div class="mbl-show inline" style="display:none;">
                        <p style="Margin:0;color:#c41f3e; font-size:14px;line-height:125%;line-height:1.5!important; font-weight:600;">
                          First point mobile
                        </p>
                    </div>
                    <!--<![endif]-->                                  
                  </td>
              </tr>
            </table>
            <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="border-spacing:0; font-family: 'Whitney A', 'Whitney B', Arial, sans-serif;width: 100%;">
              <tr>
                  <td valign="top" width="15" style="width:15px;padding-top:0px; padding-bottom:0px; padding-right:0px; padding-left:0px; color: #606366; font-family: 'Whitney A', 'Whitney B', Arial, sans-serif; font-size:14px;line-height:125%;line-height:1.5!important; text-align:center;vertical-align: top;border-right: 1px dashed #c41f3e;">&nbsp;</td>
                  <td valign="top" class="pl-34" style="padding-top:0px; padding-bottom:20px; padding-right:0px; padding-left:54px; color: #606366; font-family: 'Whitney A', 'Whitney B', Arial, sans-serif; font-size:14px;line-height:125%;line-height:1.5!important; text-align:left;vertical-align: top;font-weight: 400;">
                      <p style="Margin:0; Margin-bottom:0px;">Dosen't Matter how long the test is, this section will stretch to match <span style="white-space:nowrap;">given&nbsp;space.</span></p>
                  </td>
              </tr>
            </table>
            </td>
      </tr>
  
      <tr>
        <td class="one-column body-text" style="padding-top:0; padding-bottom:0; padding-right:60px; padding-left:60px; background-color:#f2f3f2; color:#606366;">
            <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="border-spacing:0; font-family: 'Whitney A', 'Whitney B', Arial, sans-serif;width: 100%;">
              <tr>
                  <td valign="top" width="30" style="width:30px;padding-top:0px; padding-bottom:0px; padding-right:0px; padding-left:0px; color: #606366; font-family: 'Whitney A', 'Whitney B', Arial, sans-serif;text-align:center;vertical-align: top;">                                                        
                    <img name="Cont_4" src="https://image.info.cibc.com/lib/fe2d11727364047c731d75/m/1/90f6a29c-4121-47a6-a8cc-aec87015fb90.png" width="30" alt="empty checkbox" style="max-width:30px;height:auto;display:block;margin:0px;">
                  </td>
                  <td valign="top" class="pl-2" style="padding-top:0px; padding-bottom:0px; padding-right:0px; padding-left:40px; color: #606366; font-family: 'Whitney A', 'Whitney B', Arial, sans-serif; font-size:14px;line-height:125%;line-height:1.5!important; text-align:left;vertical-align: top;">
                    <p style="Margin:0;color:#c41f3e; font-size:14px;line-height:125%;line-height:1.5!important; font-weight:600;">
                      Second point
                    </p>                               
                  </td>
              </tr>
            </table>
            <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="border-spacing:0; font-family: 'Whitney A', 'Whitney B', Arial, sans-serif;width: 100%;">
              <tr>
                  <td valign="top" width="15" style="width:15px;padding-top:0px; padding-bottom:0px; padding-right:0px; padding-left:0px; color: #606366; font-family: 'Whitney A', 'Whitney B', Arial, sans-serif; font-size:14px;line-height:125%;line-height:1.5!important; text-align:center;vertical-align: top;border-right: 1px dashed #c41f3e;">
                      &nbsp;
                  </td>
                  <td valign="top" class="pl-34" style="padding-top:0px; padding-bottom:20px; padding-right:0px; padding-left:54px; color: #606366; font-family: 'Whitney A', 'Whitney B', Arial, sans-serif; font-size:14px;line-height:125%;line-height:1.5!important; text-align:left;vertical-align: top;">
                    <p style="Margin:0; Margin-bottom:0px;">Dosen't Matter how long the test is, this section will stretch to match given space. Dosen't Matter how long the test is, this section will stretch to match given space. Dosen't Matter how long the test is, this section will stretch to match given space. Dosen't Matter how long the test is, this section will stretch to match <span style="white-space:nowrap;">given&nbsp;space.</span></p>                  
                  </td>
              </tr>
            </table>
            </td>
      </tr>
  
      <tr>
        <td class="one-column pl-2 pr-4" style="padding-top:0; padding-bottom:0; padding-right:60px; padding-left:60px; background-color:#f2f3f2; color:#606366;">
            <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="border-spacing:0; font-family: 'Whitney A', 'Whitney B', Arial, sans-serif;width: 100%;">
              <tr>
                  <td valign="top" width="30" style="width:30px;padding-top:0px; padding-bottom:0px; padding-right:0px; padding-left:0px; color: #606366; font-family: 'Whitney A', 'Whitney B', Arial, sans-serif; text-align:center;vertical-align: top;">
                      <img name="Cont_4" src="https://image.info.cibc.com/lib/fe2d11727364047c731d75/m/1/90f6a29c-4121-47a6-a8cc-aec87015fb90.png" width="30" alt="empty checkbox" style="max-width:30px;height:auto;display:block;margin:0px;">
                  </td>
                  <td valign="top" class="pl-2" style="padding-top:0px; padding-bottom:0px; padding-right:0px; padding-left:40px; color: #606366; font-family: 'Whitney A', 'Whitney B', Arial, sans-serif; font-size:14px;line-height:125%;line-height:1.5!important; text-align:left;vertical-align: top;">
                    <p style="Margin:0;color:#c41f3e; font-size:14px;line-height:125%;line-height:1.5!important; font-weight:600;">
                      Second point
                    </p>
                  </td>
              </tr>
            </table>
            <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="border-spacing:0; font-family: 'Whitney A', 'Whitney B', Arial, sans-serif;width: 100%;">
              <tr>
                  <td valign="top" width="15" style="width:15px;padding-top:0px; padding-bottom:0px; padding-right:0px; padding-left:0px; color: #606366; font-family: 'Whitney A', 'Whitney B', Arial, sans-serif; font-size:14px;line-height:125%;line-height:1.5!important; text-align:center;vertical-align: top;border-right: 1px dashed #c41f3e;">
                      &nbsp;
                  </td>
                  <td valign="top" class="pl-34" style="padding-top:0px; padding-bottom:20px; padding-right:0px; padding-left:54px; color: #606366; font-family: 'Whitney A', 'Whitney B', Arial, sans-serif; font-size:14px;line-height:125%;line-height:1.5!important; text-align:left;vertical-align: top;font-weight: 400;">
                    <p style="Margin:0; Margin-bottom:0px;">Dosen't Matter how long the test is, this section will stretch to match given space. Dosen't Matter how long the test is, this section will stretch to match given space. Dosen't Matter how long the test is, this section will stretch to match given space. Dosen't Matter how long the test is, this section will stretch to match given space. Dosen't Matter how long the test is, this section will stretch to match given space. Dosen't Matter how long the test is, this section will stretch to match given space. Dosen't Matter how long the test is, this section will stretch to match given space. Dosen't Matter how long the test is, this section will stretch to match given space. Dosen't Matter how long the test is, this section will stretch to match <span style="white-space:nowrap;">given&nbsp;space.</span></p>
                  </td>
              </tr>
            </table>
            </td>
      </tr>
  
      <tr>
        <td class="body-text pb-3" bgcolor="#f2f3f2" style="padding-top:0px;padding-bottom:40px;padding-right:40px;padding-left:40px;text-align:left;border-collapse: collapse;">
            <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td bgcolor="#ffffff" style="padding-top:0px;padding-bottom:0px;padding-right:0px;padding-left:0px;text-align:left;border-collapse: collapse; border: 1px dashed #c41f3e;">
                   <!--[if mso]>
                    <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%"><tr><td width="20%" valign="top"><![endif]-->
                    <table role="presentation" border="0" cellpadding="0" cellspacing="0" class="force-row " style="width:70px;" align="left">
                      <tr>
                        <td align="center" class="col pl-0" valign="top" style="width:100%;padding-left: 10px; padding-right: 0px;padding-top: 20px;height: 100%">
                          <img class="mbl-center" name="Cont_4" src="https://image.info.cibc.com/lib/fe2d11727364047c731d75/m/1/6942584e-d8bf-4b6e-a98d-2b54ba576806.png" width="60" alt="Gift icon" style="max-width:60px;height:auto;display:block;margin:0px;">
                        </td>
                      </tr>
                    </table>
                    <!--[if mso]></td><td width="80%" valign="top"><![endif]-->
                    <table role="presentation" border="0" cellpadding="0" cellspacing="0" align="right" class="force-row" style="width:488px;">
                      <tr>
                        <td class="body-text pt-1" style="width:100%; padding-top:20px; padding-bottom:20px; padding-right:10px; padding-left:0px; color: #ffffff; font-family: 'Whitney A', 'Whitney B', Arial, sans-serif; font-size: 14px; line-height: 125%; line-height:  1.5 !important; text-align:left;">
                          <table role="presentation" style="border-spacing:0;width:100%;">
                             <tr>
                                <td class="mbl-center pr-0 pl-0" style="width:100%; padding-top:0px; padding-bottom:0px; padding-right:10px; padding-left:20px; color: #606366; font-family: 'Whitney A', 'Whitney B', Arial, sans-serif; font-size: 14px; line-height: 125%; line-height:  1.5 !important; text-align:left;">
                                       <p style="Margin:0; Margin-bottom:4px; color:#606366;  font-weight:600;">
                                       Summary title
                                     </p>
                                     <p style="Margin:0; Margin-bottom:0px;">Dosen't Matter how long the test is, this section will stretch to match given space. Dosen't Matter how long the test is, this section will stretch to match given space. Dosen't Matter how long the test is, this section will stretch to match given space. Dosen't Matter how long the test is, this section will stretch to match <span style="white-space:nowrap;">given&nbsp;space.</span></p>
                                </td>
                             </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                    <!--[if mso]></td></tr></table><![endif]-->
                  </td>
                </tr>
            </table>    
        </td>
      </tr>`
    },
    {
        id:"body8",
        thumbnail: './imgs/Body_tables.png',
        content:`    <tr>
        <td class="mbl-center pt-4 pb-2" style="padding-top:40px; padding-bottom:5px; padding-right:40px; padding-left:40px; color: #C41F3E; font-family: 'Whitney A', 'Whitney B', Arial, sans-serif; font-size:21px;  line-height:125%;  text-align: center;">
        <p style="Margin:0; font-weight: 500;">Here’s how your Personal Line of Credit <br class="mbl-hide">
    could help you save on&nbsp;interest^</p>
        </td>
            </tr>
     
     
        <tr>
        <td class="pl-2 pr-2" style="padding: 0 40px 17px 40px; background-color:#ffff;">
    
            <table style="border-spacing:0;font-family: 'Whitney A', 'Whitney B', Arial, sans-serif; " width="100%" role="presentation">
              <tr>
                <td style="background-color:#ffffff;">
                  <table style="border-spacing:0;font-family: 'Whitney A', 'Whitney B', Arial, sans-serif;" width="100%" role="presentation">
                 
              
            <tr>
                <td width="35%" valign="middle" align="left" style="padding: 10px 10px 8px 15px"><p style="Margin:0; color:#606366;font-size: 16px; line-height:125%;line-height:1.6!important;font-weight:500; ">&zwj;&nbsp;&zwj;</p></td>
              <td width="25%" valign="middle" style="padding: 10px 10px 8px 0px"><p style="Margin:0; color:#606366;font-size:16px; line-height:125%;line-height:1.6!important; font-weight:500;">Credit Card</p></td>
              <td width="40%" valign="middle" align="left" style="padding: 10px 10px 8px 0px"><p style="Margin:0; color:#606366;font-size: 16px; line-height:125%;line-height:1.6!important;font-weight:500; ">Personal Line of&nbsp;Credit</p></td>
            </tr>
                    
                     </table>
                </td>
              </tr>
              <tr>
                <td style="padding: 0px 0px 0px 0px; background-color:#f2f3f2;">
                  <table style="border-spacing:0;font-family: 'Whitney A', 'Whitney B', Arial, sans-serif;" width="100%" role="presentation">
                 
              
            <tr>
                <td width="35%" valign="middle" align="left" style="padding: 0px 10px 5px 15px"><p style="Margin:0; margin-top:8px; color:#606366;font-size: 16px; line-height:125%;line-height:1.6!important;font-weight:400; ">Balance:</p></td>
              <td width="25%" valign="middle" style="padding: 0px 10px 5px 0px"><p style="Margin:0;margin-top:8px;  color:#606366;font-size:16px; line-height:125%; font-weight:400;line-height:1.6!important;">$10,000</p></td>
              <td width="40%" valign="middle" align="left" style="padding: 0px 10px 5px 0px"><p style="Margin:0;margin-top:8px;  color:#606366;font-size: 16px; line-height:125%;font-weight:400; line-height:1.6!important;">$10,000</p></td>
            </tr>
                     </table>
                </td>
              </tr>
           <tr>
                <td style="padding: 0px 0px 0px 0px; background-color:#ffffff;">
                  <table style="border-spacing:0;font-family: 'Whitney A', 'Whitney B', Arial, sans-serif;" width="100%" role="presentation">
                 
              
            <tr>
                <td width="35%" valign="middle" align="left" style="padding: 0px 10px 5px 15px"><p style="Margin:0;margin-top:8px;  color:#606366;font-size: 16px; line-height:125%;font-weight:400; line-height:1.6!important;">Annual Interest Rate:</p></td>
              <td width="25%" valign="middle" style="padding: 0px 10px 5px 0px"><p style="Margin:0;margin-top:8px;  color:#606366;font-size:16px; line-height:125%; font-weight:400;line-height:1.6!important;">19.99%&zwj;</p></td>
              <td width="40%" valign="middle" align="left" style="padding: 0px 10px 5px 0px"><p style="Margin:0;margin-top:8px;  color:#606366;font-size: 16px; line-height:125%;font-weight:400; line-height:1.6!important;">CIBC Prime +&nbsp;4%</p></td>
            </tr>
                    
                     </table>
                </td>
              </tr>
              <tr>
                <td style="padding: 0px 0px 0px 0px; background-color:#f2f3f2;">
                  <table style="border-spacing:0;font-family: 'Whitney A', 'Whitney B', Arial, sans-serif;" width="100%" role="presentation">
                 
              
            <tr>
                <td width="35%" valign="middle" align="left" style="padding: 0px 10px 5px 15px"><p style="Margin:0; margin-top:8px; color:#606366;font-size: 16px; line-height:125%;font-weight:400; line-height:1.6!important;">Monthly Interest:</p></td>
              <td width="25%" valign="middle" style="padding: 0px 10px 5px 0px"><p style="Margin:0; margin-top:8px; color:#606366;font-size:16px; line-height:125%; font-weight:400;line-height:1.6!important;">$164.30</p></td>
              <td width="40%" valign="middle" align="left" style="padding: 0px 10px 5px 0px"><p style="Margin:0; margin-top:8px; color:#606366;font-size: 16px; line-height:125%;font-weight:400; line-height:1.6!important;">$87.95</p></td>
            </tr>
                     </table>
                </td>
              </tr>
              <tr>
                <td style="background-color:#ffffff;">
                  <table style="border-spacing:0;font-family: 'Whitney A', 'Whitney B', Arial, sans-serif;" width="100%" role="presentation">
                 
              
            <tr>
                <td width="35%" valign="top" align="left" style="padding: 0px 10px 5px 15px"><p style="Margin:0; margin-top:8px; color:#c41f3e;font-size: 16px; line-height:125%;font-weight:600;line-height:1.6!important; ">Your Annual Savings:</p></td>
              <td width="25%" valign="middle" style="padding: 0px 10px 5px 10px"><p style="Margin:0; margin-top:8px; color:#c41f3e;font-size:16px; line-height:125%; font-weight:500;line-height:1.6!important;">&zwj;&nbsp;&zwj;</p></td>
              <td width="40%" valign="middle" align="left" style="padding: 0px 10px 5px 0px"><p style="Margin:0; margin-top:8px; color:#c41f3e;font-size: 16px; line-height:125%;font-weight:600; line-height:1.6!important;">$916.27</p></td>
            </tr>
                    
                     </table>
                </td>
              </tr>
              
              
            </table>
        </td>
        </tr>
        <tr>
        <td class="pt-0 pb-4 pl-4" style="padding-top:0px; padding-bottom:40px; padding-right:40px; padding-left:60px; color: #606366; font-family: 'Whitney A', 'Whitney B', Arial, sans-serif; font-size:14px;  line-height:125%;  text-align: left;">
        <p style="Margin:0; font-weight: 400;"> ^ Credit Card and PLC interest rates are for illustration purposes&nbsp;only.</p>
        </td>
            </tr>`
    },
    {
        id:"body9",
        thumbnail: './imgs/Body_CTA.png',
        content:`    <tr>
        <td class="one-column body-text" style="padding-top:40px; padding-bottom:40px; padding-right:40px; padding-left:40px;background-color:#C41F3E;">
            <table role="presentation" width="100%" style="border-spacing:0;font-family: 'Whitney A', 'Whitney B', Arial, sans-serif;">
                <tr>
                    <td style="width:100%;  background-color: #C41F3E; color: #ffffff; font-family: 'Whitney A', 'Whitney B', Arial, sans-serif; text-align:center;font-weight: 500;">
                        <p style="margin:0;margin-bottom:24px;font-size:20px;line-height:115%;line-height:1.3!important;">Find out more about your <span style="white-space:nowrap;">Ja&#8205;nu&#8205;ary&nbsp;202&#8205;3</span> annual <br class="mbl-hide">cash back gift <span style="white-space:nowrap;">certificate&nbsp;reward</span> </p>                                              
                        <p style="margin: 0;">
                          <!--[if mso]>
                          <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="" target="_blank" name="Learn More" style="height:48px;v-text-anchor:middle;width:160px;" arcsize="10%" stroke="f" fillcolor="#ffffff">
                          <w:anchorlock/>
                          <center>
                          <![endif]-->
                            <a class="outlook-bg-0 pl-0 pr-0 cta-btn" href="" target="_blank" name="Learn More" style="background-color:#ffffff;border-radius:4px;color:#C41F3E;display:inline-block;font-family: 'Whitney A', 'Whitney B', Arial, sans-serif;font-size:18px;line-height:48px;font-weight: 500;text-align:center;text-decoration:none;-webkit-text-size-adjust:none;padding:0 34px;">Learn more</a>
                          <!--[if mso]>
                          </center>
                          </v:roundrect>
                          <![endif]-->
                        </p>
                    </td>
                </tr>
            </table>
            </td>
        </tr>`
    }
]

/* harmony default export */ __webpack_exports__["a"] = (body);

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const header = [
  {
    id:"head1",
    thumbnail: './imgs/header_table.png',
    content:`    <tr>
    <td align="left" style="padding-left:0px;padding-right:0px;padding-top:0px;padding-bottom:0px;background-color:#C41F3E;">
      <!--[if mso]>
      <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%"><tr><td width="50%" valign="top"><![endif]-->
      <table role="presentation" border="0" cellpadding="0" cellspacing="0" align="left" class="force-row" style="float:left;width:320px;">
        <tr>
          <td class="col" valign="top" style="width:100%">
            <table role="presentation" class="contents" style="border-spacing:0;font-family: 'Whitney A', 'Whitney B', Arial, sans-serif;color:#606366;width:100%;">
              <tr>
                <td valign="middle" class="container-padding pt-3 pb-4" style="padding-bottom:0px; padding-right:20px; padding-left:40px; padding-top:96px; color: #ffffff; font-family: 'Whitney A', 'Whitney B', Arial, sans-serif; font-weight: 400;  text-align: left;">
                  <h1 style="margin:0;font-size:30px;line-height:110%;line-height:1.2!important;font-weight: 500;">H1 Tag <br> <span style="white-space:nowrap;">Header Copy</span></h1>
                  <p style="margin:0;margin-top:20px;font-size:14px;line-height:125%;line-height:1.5!important;">Subhead copy</p>
                </td>  
              </tr>
            </table>
          </td>
        </tr>
      </table>
      <!--[if mso]></td><td width="50%" valign="top"><![endif]-->
      <table role="presentation" border="0" cellpadding="0" cellspacing="0" class="force-row" style="float:left;width:320px;">
        <tr>
          <td class="col" valign="top" style="width:100%;padding:0;margin:0;background-color: #ffffff;">
              <img name="Cont_3" src="https://via.placeholder.com/640x660" width="320" border="0" alt="A woman making an online purchase at home" style="width:100%;max-width:640px;height:auto;display:block;margin:0px;border:none;">                            
          </td>
        </tr>
      </table>
      <!--[if mso]></td></tr></table><![endif]-->
    </td>
  </tr>`
},
{
    id:"head2",
    thumbnail: './imgs/header_th.png',
    content:`<tr>
    <td align="left" style="padding-left:0px;padding-right:0px;padding-top:0px;padding-bottom:0px;background-color:#C41F3E;">
      <table role="presentation" border="0" cellpadding="0" cellspacing="0" align="left" class="force-row" width="100%">
        <tr>
          <th class="mob-stack" valign="middle" style="width:50%;vertical-align: middle;" width="320">
            <table role="presentation" style="border-spacing:0;font-family: 'Whitney A', 'Whitney B', Arial, sans-serif;color:#606366;width:100%;">
              <tr>
                  <td valign="middle" class="container-padding pt-3 pb-4" style="padding-bottom:0px; padding-right:40px; padding-left:40px;color: #ffffff; font-family: 'Whitney A', 'Whitney B', Arial, sans-serif; font-weight: 400;  text-align: left;">
                    <h1 style="margin:0;font-size:30px;line-height:110%;line-height:1.2!important;font-weight: 500;">H1 Tag <br> <span style="white-space:nowrap;">Header Copy</span></h1>
                <p style="margin:0;margin-top:20px;font-size:14px;line-height:125%;line-height:1.5!important;">Subhead copy</p>
                  </td>  
              </tr>
            </table>
          </th>
          <th class="mob-stack" valign="middle" style="width:50%;padding:0;margin:0;background-color: #ffffff;vertical-align: middle;" width="320">
              <img name="Cont_3" src="https://via.placeholder.com/640x660" width="320" border="0" alt="A couple doing their Cyber Monday shopping at home" style="width:100%;max-width:640px;height:auto;display:block;margin:0px;border:none;">                            
          </th>
        </tr>
      </table>
    </td>
  </tr>`
}
]

/* harmony default export */ __webpack_exports__["a"] = (header);

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const logo = [
    {
        id:"log1",
        thumbnail: './imgs/Logo_CIBC.png',
        content:`  <tr>
        <td class="container-padding content" align="left" style="padding-left:40px; padding-right:40px; padding-top:34px; padding-bottom:34px; background-color:#f2f3f2;">
            <table role="presentation" width="100%" border="0" cellpadding="0" cellspacing="0" align="left" style="width:100%;">
                <tr>
                    <td valign="top" style="width:126px; text-align:left;">
                    <a href="https://www.cibc.com/en/personal-banking.html" target="_blank" name="CIBC" style="display: inline-block; border: none;">
                        <img src="https://image.info.cibc.com/lib/fe2d11727364047c731d75/m/1/bcfec1f2-70ce-4f26-a4c5-029d5c90caca.png" alt="CIBC logo" style="outline:none;border:none;display:inline-block;" width="126">
                    </a>
                    <!--[if mso]><p style="margin:0;font-size: 1px;line-height: 1px;">&nbsp;</p><![endif]-->
                    </td>
                </tr>
            </table>
        </td>
    </tr>`
    },
    {
        id:"log2",
        thumbnail: './imgs/Logo_CIBC.png',
        content:` <tr>
        <td class="container-padding content" align="left" style="padding-left:40px; padding-right:40px; padding-top:34px; padding-bottom:34px; background-color:#f2f3f2;">
            <table role="presentation" width="100%" border="0" cellpadding="0" cellspacing="0" align="left" style="width:100%;">
                <tr>
                    <td valign="top" style="width:126px; text-align:left;">
                    <a href="https://www.cibc.com/fr/personal-banking.html" target="_blank" name="CIBC" style="display: inline-block; border: none;">
                        <img src="https://image.info.cibc.com/lib/fe2d11727364047c731d75/m/1/bcfec1f2-70ce-4f26-a4c5-029d5c90caca.png" alt="logo CIBC" style="outline:none;border:none;display:inline-block;" width="126">
                    </a>
                    </td>
                </tr>
            </table>
        </td>
    </tr>`
    },
    {
        id:"log3",
        thumbnail: './imgs/Logo_CIBC_Aeroplan.png',
        content:`<tr>
        <td class="px-2" align="left" style="padding-left:40px; padding-right:40px; padding-top:26px; padding-bottom:26px; background-color:#f2f3f2;">
            <table role="presentation" border="0" cellpadding="0" cellspacing="0" align="left">
                <tr>
                    <td style="vertical-align: middle;padding-bottom: 1px;">
                        <a href="https://www.cibc.com/en/personal-banking.html" target="_blank" style="text-decoration:none;" name="CIBC Logo">
                            <img valign="middle" width="86" style="width:86px; max-width:86px; height: auto; border: 0px none transparent; display: block;" src="https://image.info.cibc.com/lib/fe2d11727364047c731d75/m/1/923bb59e-adf4-4468-9f88-277dd85263f3.png" alt="CIBC logo">
                        </a>
                        </td>
                        <td style="vertical-align: middle; padding-left: 15px; padding-right: 15px;">
                        <table border="0" cellpadding="0" cellspacing="0" style="border-left: 1px solid #000000;" role="presentation">
                            <tr>
                            <td style="font-size: 0px; line-height: 48px; mso-line-height-rule: exactly;">&nbsp;</td>
                            </tr>
                        </table>
                        </td>
                        <td style="vertical-align: middle;">
                        <a href="https://www.aircanada.com/ca/en/aco/home.html" target="_blank" style="text-decoration:none;" name="Aeroplan Logo">
                            <img valign="middle" width="170" style="width:170px; max-width:170px; height: auto; border: 0px none transparent; display: block;" src="https://image.info.cibc.com/lib/fe2d11727364047c731d75/m/1/67a81d62-44e7-4905-bf35-c93338f6c58a.png" alt="Aeroplan logo">
                        </a>
                    </td>
                </tr>
            </table>
        </td>
    </tr>`
    },
    {
        id:"log4",
        thumbnail: './imgs/Logo_CIBC_Aeroplan.png',
        content:`<tr>
        <td class="px-2" align="left" style="padding-left:40px; padding-right:40px; padding-top:26px; padding-bottom:26px; background-color:#f2f3f2;">
            <table role="presentation" border="0" cellpadding="0" cellspacing="0" align="left">
                <tr>
                    <td style="vertical-align: middle;padding-bottom: 1px;">
                        <a href="https://www.cibc.com/fr/personal-banking.html" target="_blank" style="text-decoration:none;" name="CIBC Logo">
                            <img valign="middle" width="86" style="width:86px; max-width:86px; height: auto; border: 0px none transparent; display: block;" src="https://image.info.cibc.com/lib/fe2d11727364047c731d75/m/1/923bb59e-adf4-4468-9f88-277dd85263f3.png" alt="logo CIBC">
                        </a>
                        </td>
                        <td style="vertical-align: middle; padding-left: 15px; padding-right: 15px;">
                        <table border="0" cellpadding="0" cellspacing="0" style="border-left: 1px solid #000000;" role="presentation">
                            <tr>
                            <td style="font-size: 0px; line-height: 48px; mso-line-height-rule: exactly;">&nbsp;</td>
                            </tr>
                        </table>
                        </td>
                        <td style="vertical-align: middle;">
                        <a href="https://www.aircanada.com/ca/fr/aco/home.html" target="_blank" style="text-decoration:none;" name="Aeroplan Logo">
                            <img valign="middle" width="170" style="width:170px; max-width:170px; height: auto; border: 0px none transparent; display: block;" src="https://image.info.cibc.com/lib/fe2d11727364047c731d75/m/1/67a81d62-44e7-4905-bf35-c93338f6c58a.png" alt="logo Aéroplan">
                        </a>
                    </td>
                </tr>
            </table>
        </td>
    </tr>`
    },
    {
        id:"log5",
        thumbnail: './imgs/Logo_CIBC_Costco.png',
        content:`<tr>
        <td class="px-2" align="left" style="padding-left:40px; padding-right:40px; padding-top:32px; padding-bottom:32px; background-color:#f2f3f2;">
            <table role="presentation" border="0" cellpadding="0" cellspacing="0" align="left">
                <tr>
                    <td style="vertical-align: middle;">
                        <a href="https://www.cibc.com/en/personal-banking.html" target="_blank" style="text-decoration:none;" name="CIBC logo">
                          <img valign="middle" src="https://image.info.cibc.com/lib/fe2d11727364047c731d75/m/1/6cf14cb9-7bfc-41f5-acd8-fa9f82730ee8.png" alt="CIBC logo" style="width:118px;outline:none;border:none;display:inline-block;vertical-align: middle;" width="118">
                        </a>
                        </td>
                        <td style="vertical-align: middle; padding-left: 15px; padding-right: 15px;">
                        <table border="0" cellpadding="0" cellspacing="0" style="border-left: 1px solid #000000;" role="presentation">
                            <tr>
                            <td style="font-size: 0px; line-height: 34px; mso-line-height-rule: exactly;">&nbsp;</td>
                            </tr>
                        </table>
                        </td>
                        <td style="vertical-align: middle;">
                          <img valign="middle" name="Cont_0" src="https://image.info.cibc.com/lib/fe2d11727364047c731d75/m/1/a4f5b383-948b-4ce4-b133-face1d08b3b8.png" alt="Costco logo" style="width:114px;outline:none;border:none;display:inline-block;vertical-align: middle;" width="114">
                    </td>
                </tr>
            </table>
        </td>
    </tr>`
    },
    {
        id:"log6",
        thumbnail: './imgs/Logo_CIBC_Costco.png',
        content:` <tr>
        <td class="px-2" align="left" style="padding-left:40px; padding-right:40px; padding-top:32px; padding-bottom:32px; background-color:#f2f3f2;">
            <table role="presentation" border="0" cellpadding="0" cellspacing="0" align="left">
                <tr>
                    <td style="vertical-align: middle;">
                        <a href="https://www.cibc.com/fr/personal-banking.html" target="_blank" style="text-decoration:none;" name="CIBC logo">
                          <img valign="middle" src="https://image.info.cibc.com/lib/fe2d11727364047c731d75/m/1/6cf14cb9-7bfc-41f5-acd8-fa9f82730ee8.png" alt="logo CIBC" style="width:118px;outline:none;border:none;display:inline-block;vertical-align: middle;" width="118">
                        </a>
                        </td>
                        <td style="vertical-align: middle; padding-left: 15px; padding-right: 15px;">
                        <table border="0" cellpadding="0" cellspacing="0" style="border-left: 1px solid #000000;" role="presentation">
                            <tr>
                            <td style="font-size: 0px; line-height: 34px; mso-line-height-rule: exactly;">&nbsp;</td>
                            </tr>
                        </table>
                        </td>
                        <td style="vertical-align: middle;">
                          <img valign="middle" name="Cont_0" src="https://image.info.cibc.com/lib/fe2d11727364047c731d75/m/1/a4f5b383-948b-4ce4-b133-face1d08b3b8.png" alt="Logo de Costco" style="width:114px;outline:none;border:none;display:inline-block;vertical-align: middle;" width="114">
                    </td>
                </tr>
            </table>
        </td>
    </tr>`
    },
    {
        id:"log7",
        thumbnail: './imgs/Logo_CIBC_Longos.png',
        content:`<tr>
        <td class="px-2" align="left" style="padding-left:40px; padding-right:40px; padding-top:26px; padding-bottom:26px; background-color:#f2f3f2;">
            <table role="presentation" border="0" cellpadding="0" cellspacing="0" align="left">
              <tr>
                <td style="vertical-align: middle;">
                  <a href="https://www.cibc.com/en/personal-banking.html" target="_blank" style="text-decoration:none;border:none;" name="CIBC Logo">
                    <img valign="middle" name="Cont_0" src="https://image.info.cibc.com/lib/fe2d11727364047c731d75/m/1/6cf14cb9-7bfc-41f5-acd8-fa9f82730ee8.png" alt="CIBC logo" style="width:118px;height: auto;outline:none;border:none;display:inline-block;vertical-align: middle;" width="118">
                  </a>
                </td>
                <td style="vertical-align: middle; padding-left: 15px; padding-right: 15px;">
                  <table border="0" cellpadding="0" cellspacing="0" style="border-left: 1px solid #000000;" role="presentation">
                    <tr>
                      <td style="font-size: 0px; line-height: 34px; mso-line-height-rule: exactly;">&nbsp;</td>
                    </tr>
                  </table>
                </td>
                <td style="vertical-align: middle;">
                  <a href="https://www.longos.com/" target="_blank" style="text-decoration:none;border:0;" name="Longos Logo">
                    <img width="80" style="width:80px; max-width:80px; height: auto; border: 0px none transparent; display: block;outline:none;" src="https://image.info.cibc.com/lib/fe2d11727364047c731d75/m/1/eb4e4aa7-4603-48d0-b07f-8943fe68249c.png" alt="Longos Grocery Gateway logo">
                  </a>
                </td>
              </tr>
            </table>
        </td>
      </tr>`
    },
    {
        id:"log8",
        thumbnail: './imgs/Logo_CIBC_Longos.png',
        content:`  <tr>
        <td class="px-2" align="left" style="padding-left:40px; padding-right:40px; padding-top:26px; padding-bottom:26px; background-color:#f2f3f2;">
            <table role="presentation" border="0" cellpadding="0" cellspacing="0" align="left">
              <tr>
                <td style="vertical-align: middle;">
                  <a href="https://www.cibc.com/fr/personal-banking.html" target="_blank" style="text-decoration:none;border:none;" name="CIBC Logo">
                    <img valign="middle" name="Cont_0" src="https://image.info.cibc.com/lib/fe2d11727364047c731d75/m/1/6cf14cb9-7bfc-41f5-acd8-fa9f82730ee8.png" alt="logo CIBC" style="width:118px;height: auto;outline:none;border:none;display:inline-block;vertical-align: middle;" width="118">
                  </a>
                </td>
                <td style="vertical-align: middle; padding-left: 15px; padding-right: 15px;">
                  <table border="0" cellpadding="0" cellspacing="0" style="border-left: 1px solid #000000;" role="presentation">
                    <tr>
                      <td style="font-size: 0px; line-height: 34px; mso-line-height-rule: exactly;">&nbsp;</td>
                    </tr>
                  </table>
                </td>
                <td style="vertical-align: middle;">
                  <a href="https://www.longos.com/" target="_blank" style="text-decoration:none;border:0;" name="Longos Logo">
                    <img width="80" style="width:80px; max-width:80px; height: auto; border: 0px none transparent; display: block;outline:none;" src="https://image.info.cibc.com/lib/fe2d11727364047c731d75/m/1/eb4e4aa7-4603-48d0-b07f-8943fe68249c.png" alt="Longos Grocery Gateway logo">
                  </a>
                </td>
              </tr>
            </table>
        </td>
      </tr>`
    },
    {
        id:"log9",
        thumbnail: './imgs/Logo_CIBC_SaveOnFoods.png',
        content:`  <tr>
        <td class="body-text" style="padding-top: 26px; padding-bottom: 26px; padding-left: 40px; padding-right: 40px; background-color:#f2f3f2;">
          <table border="0" cellpadding="0" cellspacing="0" role="presentation">
            <tr>
              <td align="left">
                <table border="0" cellpadding="0" cellspacing="0" role="presentation">
                  <tr>
                    <td style="vertical-align: middle;">
                      <a href="https://www.cibc.com/en/personal-banking.html" name="CIBC logo" style="text-decoration:none;" target="_blank" xt="SPCLICK">
                        <img alt="CIBC logo" border="0" name="Cont_0" src="https://image.info.cibc.com/lib/fe2d11727364047c731d75/m/1/c4b96757-5b3f-4408-b441-88b744e223ad.png" style="width:102px; max-width:102px; height: auto; border: 0px none transparent; display: block;" width="102"> 
                      </a>
                    </td>
                    <td class="px-15" style="vertical-align: middle; padding-left: 24px; padding-right: 24px;">
                      <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-left: 1px solid #606366;">
                        <tr>
                          <td style="font-size: 0px; line-height: 44px; mso-line-height-rule: exactly;">&nbsp;</td>
                        </tr>
                      </table>
                    </td>
                    <td style="vertical-align: middle;">
                      <a href="https://www.saveonfoods.com/" name="save on foods logo" style="text-decoration:none;" target="_blank" xt="SPCLICK">
                        <img alt="logo Save On Foods" border="0" name="Cont_1" src="https://image.info.cibc.com/lib/fe2d11727364047c731d75/m/1/47fd842b-f262-475d-b35f-3373890c225c.png" style="width:140px; max-width:140px; height: auto; border: 0px none transparent; display: block;" width="140"> 
                      </a>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </td>
      </tr>`
    },
    {
        id:"log10",
        thumbnail: './imgs/Logo_CIBC_SaveOnFoods.png',
        content:`  <tr>
        <td class="body-text" style="padding-top: 26px; padding-bottom: 26px; padding-left: 40px; padding-right: 40px; background-color:#f2f3f2;">
          <table border="0" cellpadding="0" cellspacing="0" role="presentation">
            <tr>
              <td align="left">
                <table border="0" cellpadding="0" cellspacing="0" role="presentation">
                  <tr>
                    <td style="vertical-align: middle;">
                      <a href="https://www.cibc.com/fr/personal-banking.html" name="CIBC logo" style="text-decoration:none;" target="_blank" xt="SPCLICK">
                        <img alt="logo CIBC" border="0" name="Cont_0" src="https://image.info.cibc.com/lib/fe2d11727364047c731d75/m/1/c4b96757-5b3f-4408-b441-88b744e223ad.png" style="width:102px; max-width:102px; height: auto; border: 0px none transparent; display: block;" width="102"> 
                      </a>
                    </td>
                    <td class="px-15" style="vertical-align: middle; padding-left: 24px; padding-right: 24px;">
                      <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-left: 1px solid #606366;">
                        <tr>
                          <td style="font-size: 0px; line-height: 44px; mso-line-height-rule: exactly;">&nbsp;</td>
                        </tr>
                      </table>
                    </td>
                    <td style="vertical-align: middle;">
                      <a href="https://www.saveonfoods.com/" name="save on foods logo" style="text-decoration:none;" target="_blank" xt="SPCLICK">
                        <img alt="Save On Foods logo" border="0" name="Cont_1" src="https://image.info.cibc.com/lib/fe2d11727364047c731d75/m/1/47fd842b-f262-475d-b35f-3373890c225c.png" style="width:140px; max-width:140px; height: auto; border: 0px none transparent; display: block;" width="140"> 
                      </a>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </td>
      </tr>`
    }
   
]

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