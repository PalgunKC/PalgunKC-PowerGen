partmasterApp.controller('partmasterCtrl', function ($scope, $filter, partmasterServices, commonService, DTOptionsBuilder, DTColumnBuilder) {
    $scope.PartMasterList = [];
    $scope.StateList = [];
    $scope.CityList = [];
    $scope.obj = new partmasterServices.partmasterData(null);

    $scope.init = function () {
        debugger;
        commonService.postWebService('Tool/BindListPartMaster', {}).then(function (response) {
            $scope.PartMasterList = response.liPartmaster;
            //$scope.CityList = response.liCityMaster;
            $scope.StateList = response.liStateMaster;
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

    $scope.CancelPartMaster = function () {
        $scope.IsListDivVisible = true;
        $scope.IsEditDivVisible = false;
        $scope.obj = null;
        $scope.PartMasterForm.$setPristine();
    };


    $scope.editClick = function (row, key, IsActive) {
        debugger;
        $scope.IsEditDivVisible = true;
        $scope.IsListDivVisible = false;
        if (key == 'E') {
            $scope.obj = new partmasterServices.partmasterData(row);
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
            $scope.obj = new partmasterServices.partmasterData(null);
            $scope.disablecode = false;
            $scope.obj.IsActive = true;
            $scope.obj.KEY = key;
        }
    };

    $scope.submitForm = function (isValid, partmaster) {
        // check to make sure the form is completely valid
        debugger;
        if (isValid) {
            $scope.SavePartMaster(partmaster);
            $scope.PartMasterForm.$setPristine();
        }
        else {
            angular.forEach($scope.PartMasterForm.$error.required, function (field) {
                field.$setDirty();
            });
            var PartNumber = document.getElementById("PartNumber");
            var PartName = document.getElementById("PartName");
            var PartSpecification = document.getElementById("PartSpecification");
            var CostPerUnit = document.getElementById("CostPerUnit");
            if (PartNumber.value == "") {
                PartNumber.focus();
            }

            else if (PartName.value == "") {

                PartName.focus();
            }
            else if (PartSpecification.value == "") {

                PartSpecification.focus();
            }
            else if (CostPerUnit.value == "") {

                CostPerUnit.focus();
            }
        }
    };

    $scope.SavePartMaster = function (partmaster) {
        if (partmaster.IsActive == true) {
            partmaster.IsActive = "1";

        }
        else {
            partmaster.IsActive = "0";
        }
        var request = new partmasterServices.SavePartMaster(partmaster);
        commonService.postWebService(request.url, request.param).then(function (response) {
            debugger;

            if (response.liPartmaster != null) {
                if (response.liPartmaster[0].MSG == "Updated Success") {
                    $("#Message").val('Updated !! ');//Messgae
                    $('#Title').html('Tool PartMaster Updated Successfully');//Title
                     $("#Message").trigger("click");
                $scope.init();
                $scope.obj = null;
                $scope.PartMasterForm.$setPristine();
                }
                else if (response.liPartmaster[0].MSG == "Part Number Already Exists") {
                   
                    $("#Message").val('Alter !! ');//Messgae
                    $('#Title').html('Part Number - "' + response.liPartmaster[0].PartNumber + '" Already Exists');//Title
                    $("#Message").trigger("click");
                    $scope.obj.IsActive = true;
                }
                else {
                    $("#Message").val('Saved !! ');//Messgae
                    $('#Title').html('Tool PartMaster Saved Successfully');//Title
                    $("#Message").trigger("click");
                    $scope.init();
                    $scope.obj = null;
                    $scope.PartMasterForm.$setPristine();
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
        $scope.obj = new partmasterServices.partmasterData(row);
        myFunctionCompany();
    }

});