export function flilterText(inputText) {
    const hashtagsRegex = new RegExp('#[^\s]{1,}\s');
    return inputText ? inputText.replace(hashtagsRegex, '') : '';
}

export function preloadImage(url) {
    let img = new Image();
    img.src = url;
}