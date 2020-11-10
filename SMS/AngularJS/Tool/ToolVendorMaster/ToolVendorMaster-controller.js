toolvendorApp.controller('toolvendorCtrl', function ($scope, $filter, toolvendorServices, commonService, DTOptionsBuilder, DTColumnBuilder) {
    $scope.ToolVendorList = [];
    $scope.StateList = [];
    $scope.CityList = [];
    $scope.obj = new toolvendorServices.toolvendorData(null);

    $scope.init = function () {
        debugger;
        commonService.postWebService('Tool/BindListToolVendor', {}).then(function (response) {
            $scope.ToolVendorList = response.liToolVendorMaster;
            //$scope.CityList = response.liCityMaster;
            $scope.StateList = response.liStateMaster;
            $scope.IsListDivVisible = true;
            $scope.IsEditDivVisible = false;
        });
        $scope.DatatableInitialize();
    };
    $scope.BindCity = function (obj, key) {
        var request = new toolvendorServices.BindCity(obj);
        commonService.postWebService(request.url, request.param).then(function (response) {
            debugger;
            $scope.CityList = response.liCityMaster;
            if (key == 'E') {
                $scope.obj.City = obj.City;
            }
        });
    }
    $scope.DatatableInitialize = function () {
        $scope.vm = {};
        $scope.vm.dtOptions = DTOptionsBuilder.newOptions()
		  .withOption('order', [0, 'asc']);;
    };

    $scope.CancelToolVendor = function () {
        $scope.IsListDivVisible = true;
        $scope.IsEditDivVisible = false;
        $scope.obj = null;
        $scope.ToolvendorForm.$setPristine();
    };


    $scope.editClick = function (row, key, IsActive) {
        debugger;
        $scope.IsEditDivVisible = true;
        $scope.IsListDivVisible = false;
        if (key == 'E') {
            $scope.obj = new toolvendorServices.toolvendorData(row);
            $scope.obj.KEY = key;
            if (row.IsActive == 'N') {
                $scope.obj.IsActive = false;
            }
            else {
                $scope.obj.IsActive = true;
            }
            $scope.BindCity(row, "E");
        }
        else {
            $scope.obj = new toolvendorServices.toolvendorData(null);
            $scope.disablecode = false;
            $scope.obj.IsActive = true;
            $scope.obj.KEY = key;
        }
    };

    $scope.submitForm = function (isValid, toolVendormaster) {
        // check to make sure the form is completely valid
        debugger;
        if (isValid) {
            $scope.SaveToolVendormaster(toolVendormaster);
            $scope.ToolvendorForm.$setPristine();
        }
        else {
            angular.forEach($scope.ToolvendorForm.$error.required, function (field) {
                field.$setDirty();
            });
            var VendorCode = document.getElementById("VendorCode");
            var VendorName = document.getElementById("VendorName");
            if (VendorCode.value == "") {
                VendorCode.focus();
            }

            else if (VendorName.value == "") {

                VendorName.focus();
            }
        }
    };

    $scope.SaveToolVendormaster = function (toolVendormaster) {
        if (toolVendormaster.IsActive == true) {
            toolVendormaster.IsActive = "1";

        }
        else {
            toolVendormaster.IsActive = "0";
        }
        var request = new toolvendorServices.SaveToolVendormaster(toolVendormaster);
        commonService.postWebService(request.url, request.param).then(function (response) {
            debugger;

            if (response.liToolVendormaster != null) {
                if (response.liToolVendormaster[0].MSG == "Updated Success") {
                    $("#Message").val('Updated !! ');//Messgae
                    $('#Title').html('Tool VendorMaster Updated Successfully');//Title
                }
                else {
                    $("#Message").val('Saved !! ');//Messgae
                    $('#Title').html('Tool VendorMaster Saved Successfully');//Title
                }
                $("#Message").trigger("click");
                $scope.init();
                $scope.obj = null;
                $scope.ToolvendorForm.$setPristine();
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
        $scope.obj = new toolvendorServices.toolvendorData(row);
        myFunctionCompany();
    }

});