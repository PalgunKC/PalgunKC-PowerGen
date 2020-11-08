toollocationApp.controller('toollocationCtrl', function ($scope, $filter, toollocationServices, commonService, DTOptionsBuilder, DTColumnBuilder) {
    $scope.ToolLocationList = [];
    $scope.obj = new toollocationServices.toollocationData(null);

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
        $scope.IsEditDivVisible = true;
        $scope.IsListDivVisible = false;
        if (key == 'E') {
            $scope.obj = new toollocationServices.toollocationData(row);
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
            var LocationCode = document.getElementById("LocationCode");
            var LocationName = document.getElementById("LocationName");
            if (LocationCode.value == "") {
                LocationCode.focus();
            }

            else if (LocationName.value == "") {

                LocationName.focus();
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
                }
                else {
                    $("#Message").val('Saved !! ');//Messgae
                    $('#Title').html('Tool LocationMaster Saved Successfully');//Title
                }
                $("#Message").trigger("click");
                $scope.init();
                $scope.obj = null;
                $scope.ToollocationForm.$setPristine();
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