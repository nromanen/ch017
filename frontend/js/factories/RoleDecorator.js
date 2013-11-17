App.factory("roleDecorator", function($rootScope) {
    return {

        /*parameter @func is method that shall be decorated
        * parameter @right is right that we have to check always before call func in future
        * */
        decorateForRight: function (right, func) {
            return function () {
                if (right) {
                    return func();
                }
                return false;
            };
        }
    }
});

