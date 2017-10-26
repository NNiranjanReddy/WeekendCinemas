app.filter('emptyFilter', [function () {

    var deep_value = function (obj, path) {
        for (var i = 0, path = path.split('.'), len = path.length; i < len; i++) {
            obj = obj[path[i]];
        };
        return obj;
    }
    return function (items, path,flag) {
        var filtered = [];
        flag = !flag;
        items && items.forEach(function (element) {
            if ( flag ? deep_value(element, path) : !deep_value(element, path) ) {
                filtered.push(element);
            }
        });
        return filtered;
    }


}]);