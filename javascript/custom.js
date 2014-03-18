$(function() {	
	var dropZone = document.getElementById('drop_markdown_text');
	dropZone.addEventListener('dragover', handleDragOver, false);
	dropZone.addEventListener('drop', handleFileSelect, false);	
});

function handleFileSelect(evt) {
	evt.stopPropagation();
	evt.preventDefault();

	var file = evt.dataTransfer.files[0]; // FileList object.

	var reader = new FileReader();

	reader.onload = function(e) { 
	      var text = e.target.result;
		  var array_of_text = marked(text).split("<hr>").slice(1, -1);		  
		  var container = document.querySelector('.deck-container');
		  document.getElementById('drop_markdown_text').remove();		  
		  array_of_text.forEach(function(slide, index){						
				container.innerHTML += '<section class="slide">'+slide+'</section>';			
		  });		  				 
		$.deck('.slide');
      } 	  
	reader.readAsText(file);
}

function handleDragOver(evt) {
	evt.stopPropagation();
	evt.preventDefault();
	evt.dataTransfer.dropEffect = 'copy';
}