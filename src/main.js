
var SDK = require('blocksdk');
const sdk = new SDK({
	blockEditorWidth: 600,
	tabs: [
		'htmlblock', // This is the HTML Editor Tab
		'stylingblock' // This is the styling tab
	]});

const { createApp } = Vue


createApp({
	data() {
	  return {
		listTemplates: [{name: "service", "items" : ["pre3", "head3", "body3"]},{name: "marketing1", "items" : ["pre1", "head1", "body1"]},{name: "marketing2", "items" : ["pre2", "head2", "body2"]}],
		preheader: [{id:"pre1",title:'<div>preheader1</div>'},{id:"pre2",title:'<div>preheader2</div>'},{id:"pre3",title:'<div>preheader3</div>'},{id:"pre4",title:'<div>preheader4</div>'},],
		header: [{id:"head1",title:'<div>header1</div>'},{id:"head2",title:'<div>header2</div>'},{id:"head3",title:'<div>header3</div>'},{id:"head4",title:'<div>header4</div>'}],
		body: [{id:"body1",title:'<div>body1</div>'},{id:"body2",title:'<div>body2</div>'},{id:"body3",title:'<div>body3</div>'},{id:"body4",title:'<div>bodyr4</div>'}],
		listItems: [{id:10,title:'<div>item10</div>'},{id:11,title:"<div>item11</div>"},{id:12,title:"<div>item12</div>"},{id:13,title:"<div>item13</div>"},{id:14,title:"<div>item14</div>"},{id:15,title:"<div>item15</div>"},{id:16,title:"<div>item16</div>"}],
		listSelected: []
	  }
	},
	methods: {

		fillBlockList(snippet) {
			const arrayToSwap = this.$data[`${snippet.toLowerCase()}`]
			this.listItems = arrayToSwap.slice(0)
		},

		fillTemplateList(input) {
			const template = document.querySelector(`#${input}`).value
			this.listTemplates.filter((el) => {if(el.name == template) this.$data["preheader"].map()})
		},
  
	  setBuilderContent() {
  
  
		  var outputString = "";
  
		  this.listSelected.forEach(el => outputString += el.title)
  
		  sdk.setData({"items" : this.listSelected.map((el) => {return {"id": el.id, "text": el.title}})})
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