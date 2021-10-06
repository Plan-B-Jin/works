function insertAfter(newNode, referenceNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}
function handleImageUploadCanvas(event, width, height, showWidth, showHeigth) {
	return new Promise(function(resolve, reject) {

		showWidth = showWidth || false;
		showHeigth = showHeigth || false;
		
		var fileInput = event.target;
		var canvas = document.createElement("canvas");
		var canvasCon = document.createElement("div");
		
		var canvasId = document.createAttribute("id")
		var idStr = fileInput.name + "Canvas";
			canvasId.value = idStr;

		var canvasWidth = document.createAttribute("width")
		var canvasHeight = document.createAttribute("height")
		if(showWidth && showHeigth) {
			canvasWidth.value = showWidth;
			canvasHeight.value = showHeigth;
		} else {
			canvasWidth.value = width;
			canvasHeight.value = height;
		}
			
		var canvasClass = document.createAttribute("class")
			canvasClass.value = "hiddenCanvas";
				
		var existingEl = document.getElementById(idStr);
		
		if(existingEl == null){
			canvas.setAttributeNode(canvasId);
			
			canvas.setAttributeNode(canvasWidth);
			canvas.setAttributeNode(canvasHeight);
			
			
			canvasCon.setAttributeNode(canvasClass);
			canvasCon.appendChild(canvas)
			insertAfter(canvasCon, fileInput);
		}else{
			canvas = existingEl
		}
				
		
		var resizedFile;
		var files = event.target.files;
		var image = event.target.files[0];
		var imgExt = [
			'image/jpg', 
			'image/jpeg', 
			'image/png', 
			'image/gif', 
			'image/bmp'
		];
		isValidImageFile(image, imgExt).then(function(response){
			//debugger;
			if(response) {
				isChecked = true;
				ShowImagePreviewHiddenCanvas( image, canvas ).then(function(response){
					resizedFile 		= UpdatePreviewCanvasGdi(response,canvas)
					resizedFile.name 	= image.name;
					resolve(resizedFile);
				})
			} else {
				alert('jpg, jpeg, png, bmp 확장자만 업로드 가능합니다.');
				fileInput.value = "";
				isChecked = false;
			}
		});
	});
}

function ShowImagePreviewHiddenCanvas( image, canvas ){
    return new Promise(function(resolve, reject) {
    	if( !( window.File && window.FileReader && window.FileList && window.Blob ) ){
    	      alert('The File APIs are not fully supported in this browser.');
    	      return false;
    	    }

    	    if( typeof FileReader === "undefined" ){
    	        alert( "Filereader undefined!" );
    	        return false;
    	    }

    	    var file = image;

    	    if( !( /image/i ).test( file.type ) ){
    	        alert( "File is not an image." );
    	        return false;
    	    }

    	    reader = new FileReader();
    	    reader.onload = function(event){
    	      var img = new Image;
    	     
    	      img.onload 	= resolve;
    	      img.src 		= event.target.result;
    	      
    	    };
    	    reader.readAsDataURL( file );
    });

}

function UpdatePreviewCanvasGdi( result,canvas ){
	
	var img = result.currentTarget;
	
    if(    typeof canvas === "undefined"
        || typeof canvas.getContext === "undefined" )
        return;

    var context = canvas.getContext( '2d' );

    var world = new Object();
    world.width 	= canvas.offsetWidth;
    world.height 	= canvas.offsetHeight;

    canvas.width = world.width;
    canvas.height = world.height;

    if( typeof img === "undefined" )
        return;
    
    var x = 0
    var y = 0
    context.drawImage( img, x, y, world.width, world.height );
    var blob = dataURItoBlob(canvas.toDataURL('image/jpeg'))
    return blob;

}

function dataURItoBlob(dataURI) {
    // convert base64/URLEncoded data component to raw binary data held in a string
    var byteString;
    if (dataURI.split(',')[0].indexOf('base64') >= 0)
        byteString = atob(dataURI.split(',')[1]);
    else
        byteString = unescape(dataURI.split(',')[1]);

    // separate out the mime component
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

    // write the bytes of the string to a typed array
    var ia = new Uint8Array(byteString.length);
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }

    return new Blob([ia], {type:mimeString});
}





























