sparereturnApp.controller('sparereturnCtrl', function (Excel, $timeout, $scope, $filter, sparereturnServices, commonService, DTOptionsBuilder, DTColumnBuilder) {
    $scope.SpareReturnReasonList = [];
    $scope.obj = new sparereturnServices.sparereturnData(null);

    $scope.init = function () {
        debugger;
        commonService.postWebService('Spare/BindListSpareReturn', {}).then(function (response) {
            $scope.SpareReturnReasonList = response.liSpareReturnReason;
            $scope.IsListDivVisible = true;
            $scope.IsEditDivVisible = false;
            if (response.liSpareReturnReason.length > 0) {
                $scope.obj.ReasonCode = response.liSpareReturnReason[0].Max_RetReason_no;
            }

        });
        $scope.DatatableInitialize();
    };
  
    $scope.GetExcelData = function () {
        commonService.postWebService('Spare/GetExcelSpareReturnReasonData', { 'P_KEY': 'EXCEL', 'dummycolumn1': 'Part' }).then(function (response) {
            $scope.DownloadTab(response);
        });
    }

    $scope.DownloadTab = function (response) {
        window.location = '/Spare/Download?ID=' + response.ID + '&Name=' + response.FileName;
    };


    $scope.DatatableInitialize = function () {
        $scope.vm = {};
        $scope.vm.dtOptions = DTOptionsBuilder.newOptions()
		  .withOption('order', [0, 'asc']);;
    };

    $scope.CancelSpareReturn = function () {
        $scope.IsListDivVisible = true;
        $scope.IsEditDivVisible = false;
        $scope.obj = null;
        $scope.SpareReturnForm.$setPristine();
    };


    $scope.editClick = function (row, key, IsActive) {
        debugger;
        $scope.IsEditDivVisible = true;
        $scope.IsListDivVisible = false;
        if (key == 'E') {
            $scope.obj = new sparereturnServices.sparereturnData(row);
            $scope.obj.KEY = key;
            if (row.IsActive == 'N') {
                $scope.obj.IsActive = false;
            }
            else {
                $scope.obj.IsActive = true;
            }
        }
        else {
            $scope.obj = new sparereturnServices.sparereturnData(null);
            if ($scope.SpareReturnReasonList.length > 0) {
                $scope.obj.ReasonCode = $scope.SpareReturnReasonList[0].Max_RetReason_no;
            }
            $scope.disablecode = false;
            $scope.obj.IsActive = true;
            $scope.obj.KEY = key;
        }
    };

    $scope.submitForm = function (isValid, spareReturnmaster) {
        // check to make sure the form is completely valid
        debugger;
        if (isValid) {
            $scope.SavespareReturnmaster(spareReturnmaster);
            $scope.SpareReturnForm.$setPristine();
        }
        else {
            angular.forEach($scope.SpareReturnForm.$error.required, function (field) {
                field.$setDirty();
            });
            var Rcode = document.getElementById("Rcode");
            var RName = document.getElementById("RName");

            if (Rcode.value == "") {
                Rcode.focus();
            }

            else if (RName.value == "") {

                RName.focus();
            }
        }
    };
    $scope.SavespareReturnmaster = function (spareReturnmaster) {
        if (spareReturnmaster.IsActive == true) {
            spareReturnmaster.IsActive = "1";

        }
        else {
            spareReturnmaster.IsActive = "0";
        }
        var request = new sparereturnServices.SavespareReturnmaster(spareReturnmaster);
        commonService.postWebService(request.url, request.param).then(function (response) {
            debugger;
            if (response.liSpareReturnReason != null) {
                if (response.liSpareReturnReason[0].MSG == "Updated Success") {
                    $("#Message").val('Updated !! ');//Messgae
                    $('#Title').html('Spare Return Reason Updated Successfully');//Title
                    $("#Message").trigger("click");
                    $scope.init();
                    $scope.obj = null;
                    $scope.SpareReturnForm.$setPristine();
                }
                else if (response.liSpareReturnReason[0].MSG == "Spare Return Reason Already Exists") {

                    $("#Message").val('Alter !! ');//Messgae
                    $('#Title').html('Return - "' + response.liSpareReturnReason[0].ReasonCode + '" Already Exists');//Title
                    $("#Message").trigger("click");
                    $scope.obj.IsActive = true;
                }

                else {
                    $("#Message").val('Saved !! ');//Messgae
                    $('#Title').html('Spare Return Reason Saved Successfully');//Title
                    $("#Message").trigger("click");
                    $scope.init();
                    $scope.obj = null;
                    $scope.SpareReturnForm.$setPristine();
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
        $scope.obj = new sparereturnServices.sparereturnData(row);
        myFunctionCompany();
    }

});