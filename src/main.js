import preheader from "./modules/preheader"
import listTemplates from "./modules/listTemplates";
import body from "./modules/body"
import header from "./modules/header"
import logo from "./modules/logo"



var SDK = require('blocksdk');
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
	this.logo = logo.slice(0)
	this.preheader = preheader.slice(0)
	this.header = header.slice(0)
	this.body = body.slice(0)	
	this.listTemplates = listTemplates.slice(0)
    this.fillBlockList("preheader")
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
  
		  sdk.setData({"items" : this.listSelected.map((el) => {return {"id": el.id, "text": el.content}})})
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