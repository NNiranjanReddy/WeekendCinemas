app.filter('shortDate2', ['DateUtil',function (DateUtil) {
    return function (item) {
        if (item){
            item = new Date(item);
            return item.getDate()+'/'+DateUtil.getMonth(item.getMonth());
        }
        return item;
    }
}]);