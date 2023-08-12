$(function () {
    $("#sortableImgThumbnailPreview").sortable({
        connectWith: ".RearangeBox",

        start: function (event, ui) {
            $(ui.item).addClass("dragElemThumbnail");
            ui.placeholder.height(ui.item.height());
        },
        stop: function (event, ui) {
            $(ui.item).removeClass("dragElemThumbnail");
        }
    });
    $("#sortableImgThumbnailPreview").disableSelection();
});

document.getElementById('files').addEventListener('change', handleFileSelect, false);

var maxPhotos = 5; // Maximum number of photos allowed
var currentPhotos = 0; // Current number of uploaded photos

function handleFileSelect(evt) {
    var files = evt.target.files;
    var output = document.getElementById("sortableImgThumbnailPreview");

    // Calculate the remaining slots for uploading photos
    var remainingSlots = maxPhotos - currentPhotos;

    // Loop through the FileList and render image files as thumbnails.
    for (var i = 0; i < files.length && i < remainingSlots; i++) {
        var f = files[i];

        // Only process image files.
        if (!f.type.match('image.*')) {
            continue;
        }

        var reader = new FileReader();

        // Closure to capture the file information.
        reader.onload = (function (theFile) {
            return function (e) {
                // Render thumbnail.
                var imgThumbnailElem = "<div class='RearangeBox imgThumbContainer'><i class='material-icons imgRemoveBtn' onclick='removeThumbnailIMG(this)'>cancel</i><div class='IMGthumbnail' ><img  src='" + e.target.result + "'" + "title='" + theFile.name + "'/></div><div class='imgName'>" + theFile.name + "</div></div>";
                output.innerHTML = output.innerHTML + imgThumbnailElem;
                currentPhotos++; // Increment the count of uploaded photos
            };
        })(f);

        // Read in the image file as a data URL.
        reader.readAsDataURL(f);
    }
}

function removeThumbnailIMG(elm) {
    elm.parentNode.outerHTML = '';
    currentPhotos--; // Decrement the count of uploaded photos
}