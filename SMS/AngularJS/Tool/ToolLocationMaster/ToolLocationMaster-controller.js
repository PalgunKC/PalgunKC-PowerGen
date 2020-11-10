toollocationApp.controller('toollocationCtrl', function ($scope, $filter, toollocationServices, commonService, DTOptionsBuilder, DTColumnBuilder) {
    $scope.ToolLocationList = [];
    $scope.obj = new toollocationServices.toollocationData(null);

    $scope.$watch('obj.LocationStation', function (val) {
        $scope.obj.LocationStation = $filter('uppercase')(val);
    }, true);
    $scope.$watch('obj.LocationRow', function (val) {
        $scope.obj.LocationRow = $filter('uppercase')(val);
    }, true);
    $scope.init = function () {
        debugger;
        commonService.postWebService('Tool/BindListToolLocation', {}).then(function (response) {
            $scope.ToolLocationList = response.liToolLocationmaster;
            $scope.IsListDivVisible = true;
            $scope.IsEditDivVisible = false;
        });
        $scope.DatatableInitialize();
    };

    $scope.DatatableInitialize = function () {
        $scope.vm = {};
        $scope.vm.dtOptions = DTOptionsBuilder.newOptions()
		  .withOption('order', [0, 'asc']);;
    };

    $scope.CancelToolLocation = function () {
        $scope.IsListDivVisible = true;
        $scope.IsEditDivVisible = false;
        $scope.obj = null;
        $scope.ToollocationForm.$setPristine();
    };


    $scope.editClick = function (row, key, IsActive) {
        debugger;

        if (key == 'E') {
            $scope.IsEditDivVisible = true;
            $scope.IsListDivVisible = false;
            $scope.obj = new toollocationServices.toollocationData(row);
            $scope.obj.KEY = key;
            if (row.IsActive == 'N') {
                $scope.obj.IsActive = false;
            }
            else {
                $scope.obj.IsActive = true;
            }
            //$scope.BindCity(row, "E");
        }
        else if (key == 'I') {
            $scope.obj = new toollocationServices.toollocationData(row);
            $scope.obj.KEY = key;
            $scope.obj.IsActive = 0;
            $scope.submitForm(true, $scope.obj);
        }
        else if (key == 'A') {
            $scope.obj = new toollocationServices.toollocationData(row);
            $scope.obj.KEY = key;
            $scope.obj.IsActive = 1;
            $scope.submitForm(true, $scope.obj);
        }

        else {
            $scope.IsEditDivVisible = true;
            $scope.IsListDivVisible = false;
            $scope.obj = new toollocationServices.toollocationData(null);
            $scope.disablecode = false;
            $scope.obj.IsActive = true;
            $scope.obj.KEY = key;
        }
    };

    $scope.submitForm = function (isValid, toolLocationmaster) {
        // check to make sure the form is completely valid
        debugger;
        if (isValid) {
            $scope.SaveToolLocationmaster(toolLocationmaster);
            $scope.ToollocationForm.$setPristine();
        }
        else {
            angular.forEach($scope.ToollocationForm.$error.required, function (field) {
                field.$setDirty();
            });
            var LocationStation = document.getElementById("LocationStation");
            var LocationRow = document.getElementById("LocationRow");
            var LocationColumn = document.getElementById("LocationColumn");
            if (LocationStation.value == "") {
                LocationStation.focus();
            }

            else if (LocationRow.value == "") {

                LocationRow.focus();
            }
            else if (LocationColumn.value == "") {

                LocationColumn.focus();
            }
        }
    };

    $scope.SaveToolLocationmaster = function (toolLocationmaster) {
        if (toolLocationmaster.IsActive == true) {
            toolLocationmaster.IsActive = "1";

        }
        else {
            toolLocationmaster.IsActive = "0";
        }
        var request = new toollocationServices.SaveToolLocationmaster(toolLocationmaster);
        commonService.postWebService(request.url, request.param).then(function (response) {
            debugger;

            if (response.liToolLocationmaster != null) {
                if (response.liToolLocationmaster[0].MSG == "Updated Success") {
                    $("#Message").val('Updated !! ');//Messgae
                    $('#Title').html('Tool LocationMaster Updated Successfully');//Title
                    $("#Message").trigger("click");
                    $scope.init();
                    $scope.obj = null;
                    $scope.ToollocationForm.$setPristine();
                }
                else if (response.liToolLocationmaster[0].MSG == "Location Already Exists") {

                    $("#Message").val('Alter !! ');//Messgae
                    $('#Title').html('Location - "' + response.liToolLocationmaster[0].LocationName + '" Already Exists');//Title
                    $("#Message").trigger("click");
                    $scope.obj.IsActive = true;
                }

                else {
                    $("#Message").val('Saved !! ');//Messgae
                    $('#Title').html('Tool LocationMaster Saved Successfully');//Title
                    $("#Message").trigger("click");
                    $scope.init();
                    $scope.obj = null;
                    $scope.ToollocationForm.$setPristine();
                }

            }
            else {
                $("#Message").val('Failed !! ');//Messgae
                $('#Title').html('Error Happened while Saving Category');//Title
                $("#Message").trigger("click");
            }
        });

    };

    $scope.returnAcive = function (act) {
        return act == 1 ? 'Y' : 'N';
    };

    $scope.init();

    $scope.myFunctionCompany = function (row, key) {
        $scope.obj = new toollocationServices.toollocationData(row);
        myFunctionCompany();
    }

});