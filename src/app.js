require('dotenv').config();

var ae = require("after-effects");

console.log("running...");

const images = [
    'tavern/image 1.jpg',
    'tavern/image 2.jpg',
    'tavern/tavern.jpg',
    'tavern/download.jpg',
    'tavern/The_Tavern.jpg'
    ],
    // Once music is included maybe set seconds per image and total time based on audio length?
    // ie. audioLength / images.length (then pop images if necessary until seconds per image would be at least 4s)
    secondsPerImage = 5,
    totalTime = images.length * secondsPerImage,
    compositionName = "Composition 1",
    mediaRoot = process.env.MEDIA_ROOT || '../media/';

// Make image paths absolute
for (i = 0; i < images.length; i++)
{
    images[i] = mediaRoot + images[i];
}

ae.execute((secondsPerImage, totalTime, compositionName, images) => 
{
    // function getCompositionByName (compositionName)
    // {
    //     for(var i = 1; i <= app.project.items.length; i++)
    //     {
    //         currentItem = app.project.item(i);

    //         if(currentItem instanceof CompItem)
    //         {
    //             if(currentItem.name == compositionName)
    //             {  
    //                 // Will grab only the first name match
    //                 return currentItem;
    //             }
    //         }
    //     }
    // }

    function clearProject ()
    {
        for (var i = 1; i <= app.project.items.length; i++)
        {
            app.project.item(i).remove();
        }
    }

    function importFile(location, aeFolder) {

        var myImageFile = new File(location);
      
        var importOptions = new ImportOptions(myImageFile);
      
        var footageItem = app.project.importFile(importOptions);

        footageItem.parentFolder = aeFolder;
      
        return footageItem;
    }

    // clearProject();

    var composition = app.project.items.addComp(compositionName, 1920, 1080, 1, totalTime, 24),
        imagesFolder = app.project.items.addFolder('Images');


    for (i = 1; i <= images.length; i++)
    {
        var image = importFile(images[i-1], imagesFolder);
        var layer = composition.layers.add(image);

        // set duration of image
        layer.inPoint = ((i - 1) * secondsPerImage);
        layer.outPoint = (i * secondsPerImage);

        // set the size of image (always meet vertical height)
        var scale = (composition.height / layer.height) * 100;
        layer.property("Scale").setValue([scale, scale]);

        // TODO: add a duplicate layer, with a "frosty" filter, beneath the image if the media doesn't cover the entire canvas
    }

    // after-effects package was a little janky on Windows, return something to reduce errors
    // later could use this to export things like final duration, maybe even project size? might be useful in a log
    return "Still working fine.";

}, secondsPerImage, totalTime, compositionName, images)
    .then((returnedValue) => {console.log(returnedValue);})
    .catch((error) => {console.log(error)});

    // Followup idea, use Audition scripting to also generate a perfectly timed song
    // there's not an npm package for that though, maybe could reuse this one