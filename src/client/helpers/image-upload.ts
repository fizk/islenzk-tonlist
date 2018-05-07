
const validateMime = (file) => {
    return new Promise((pass, fail) => {
        if(file.type.match(/^image\/.*$/)) {
            pass(file);
        } else {
            fail(`invalid file type ${file.type}`);
        }
    });
};

const readIntoImage = (file) => {
    return new Promise((pass, fail) => {
        const reader = new FileReader();
        reader.addEventListener("load", event => {
            const img = new Image();
            img.addEventListener('load', event => {
                pass(event.target);
            });
            img.addEventListener('error', fail);
            img.addEventListener('abort', fail);
            // img.src = event.target.result;

        });
        reader.addEventListener('error', fail);
        reader.addEventListener('abort', fail);
        reader.readAsDataURL(file);
    });
};

const rescaleToCanvas = (image, pixelCrop, config, factor = 1) => {
    return new Promise((pass, fail) => {

        const mainCanvas = document.createElement('canvas');
        mainCanvas.width = config.width * factor;
        mainCanvas.height = config.height * factor;
        const mainContext = mainCanvas.getContext('2d');
        mainContext.drawImage(
            image,
            pixelCrop.x, pixelCrop.y,
            pixelCrop.width, pixelCrop.height,
            0, 0,
            config.width * factor, config.height * factor
        );

        mainCanvas.toBlob((blob) => {
            pass({blob, base64: mainCanvas.toDataURL('image/jpeg', 0.80)});
        }, 'image/jpeg', 0.80);
    });
};

export default (file, progress, config, crop, path = 'http://localhost:4000/upload') => {
    return new Promise((pass, fail) => {
        validateMime(file)
            .then(readIntoImage)
            .then(image => {
                return Promise.all([
                    rescaleToCanvas(image, crop, config),
                    rescaleToCanvas(image, crop, config, 0.1),
                ]);
            }).then(results => {
                const [image, thumb, ] = results;

                const formData = new FormData();
                // formData.append('image', image.blob);
                // formData.append('base64', thumb.base64);
                formData.append('width', config.width);
                formData.append('height', config.height);

                const xhr = new XMLHttpRequest();
                xhr.open('post', path);
                xhr.addEventListener('load', event => {
                    // pass(JSON.parse(event.target.responseText));
                });
                xhr.addEventListener("progress", progress);
                xhr.addEventListener('error', fail);
                xhr.addEventListener('abort', fail);
                xhr.addEventListener('timeout', fail);
                xhr.send(formData);
            })
            .catch(fail);
    });
};


