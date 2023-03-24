
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
		message: 'Hello Vue!',
		text:"",
		listBlocks: [],
		listItems: [{id:10,title:'<div>item10</div>'},{id:11,title:"<div>item11</div>"},{id:12,title:"<div>item12</div>"},{id:13,title:"<div>item13</div>"},{id:14,title:"<div>item14</div>"},{id:15,title:"<div>item15</div>"},{id:16,title:"<div>item16</div>"}],
		listSelected: []
	  }
	},
	mounted() {
		sdk.getData((data) => {
			console.log(data)
		})
	},
	methods: {
  
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
  
	  onDrop(event, toIndex) {
		  
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
