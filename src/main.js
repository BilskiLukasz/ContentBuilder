import preheader from "./modules/preheader"
import listTemplates from "./modules/listTemplates";
import body from "./modules/body"
import header from "./modules/header"
import logo from "./modules/logo"
import rating_social_legal from "./modules/rating_social_legal"



var SDK = require('blocksdk');
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
		rating_social_legal: [],
		listItems: [],
		listSelected: []
	  }
	},
  mounted() {
	this.logo = logo.slice(0)
	this.preheader = preheader.slice(0)
	this.header = header.slice(0)
	this.body = body.slice(0)
	this.rating_social_legal = rating_social_legal.slice(0)
	this.listTemplates = listTemplates.slice(0)

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


		const openTable = `<table role="presentation" align="left" border="0" cellpadding="0" cellspacing="0" width="100%" class="force-row" style="width:640px;">`
		const closeTable = '</table>'
	  var outputString = "";

	  this.listSelected.forEach(el => outputString += el.content)

	  sdk.setData({"items" : this.listSelected.map((el) => {return {"id": el.id,"thumbnail": el.thumbnail, "content": el.content}})})
	  sdk.setContent(openTable + outputString + closeTable)

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