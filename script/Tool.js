var Tool = function () {

}

Tool.prototype.degToRad = function (value) {
    return value * (Math.PI / 180);
}

Tool.prototype.lerp = function (start, end, percent) {
    return (start + percent * (end - start));
}