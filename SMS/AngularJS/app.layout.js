var actionApp = angular.module('LayoutApp', ['commonApp']);

app.directive("scroll", function ($window) {
    return function (scope, element, attrs) {

        angular.element($window).bind("scroll", function () {
            console.log(this.pageYOffset);

            if (this.pageYOffset < 10) {
                scope.test = "animated fadeInDown";
            }
            else if ((this.pageYOffset > 20) || (this.pageYOffset < 30)) {
                scope.test = "animated fadeOutUp";
            }
            if (this.pageYOffset >= 100) {
                scope.boolChangeClass = true;
                console.log('Scrolled below header.');
            } else {
                scope.boolChangeClass = false;
                console.log('Header is in view.');
            }
            scope.$apply();
        });
    };
});