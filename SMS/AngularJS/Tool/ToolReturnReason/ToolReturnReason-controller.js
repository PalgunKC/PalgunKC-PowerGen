toolreturnApp.controller('toolreturnCtrl', function (Excel, $timeout, $scope, $filter, toolreturnServices, commonService, DTOptionsBuilder, DTColumnBuilder) {
    $scope.ToolReturnReasonList = [];
    $scope.obj = new toolreturnServices.toolreturnData(null);

    $scope.init = function () {
        debugger;
        commonService.postWebService('Tool/BindListToolReturn', {}).then(function (response) {
            $scope.ToolReturnReasonList = response.liToolReturnReason;
            $scope.IsListDivVisible = true;
            $scope.IsEditDivVisible = false;
            if (response.liToolReturnReason.length > 0) {
                $scope.obj.ReasonCode = response.liToolReturnReason[0].Max_RetReason_no;
            }
            
        });
        $scope.DatatableInitialize();
    };



    $scope.GetExcelData = function () {
        commonService.postWebService('Tool/GetExcelToolReturnResonData', { 'P_KEY': 'EXCEL', 'dummycolumn1': 'Part' }).then(function (response) {
            $scope.DownloadTab(response);
        });
    }

    $scope.DownloadTab = function (response) {
        window.location = '/Tool/Download?ID=' + response.ID + '&Name=' + response.FileName;
    };


    //$scope.exportToExcel = function (tableId) { // ex: '#my-table'
    //    debugger;
    //    var exportHref = Excel.tableToExcel(tableId, 'madasamy');
    //    $timeout(function () {
    //        var a = document.createElement('a');
    //        a.href = exportHref;
    //        a.download = "ToolReturnReason.xls";
    //        document.body.appendChild(a);
    //        a.click();
    //        a.remove();
    //    }, 100); // trigger download
    //};
    //$scope.exportToPDF = function (tableId) {
    //    debugger;
    //    html2canvas(document.getElementById(tableId), {
    //        onrendered: function (canvas) {
    //            debugger;
    //            var data = canvas.toDataURL();
    //            var docDefinition = {
    //                content: [{
    //                    image: data,
    //                    width: 500
    //                }]
    //            };
    //            pdfMake.createPdf(docDefinition).download("ToolReturnReason.pdf");
    //        }
    //    });
    //};

    $scope.DatatableInitialize = function () {
        $scope.vm = {};
        $scope.vm.dtOptions = DTOptionsBuilder.newOptions()
		  .withOption('order', [0, 'asc']);;
    };

    $scope.CancelToolReturn = function () {
        $scope.IsListDivVisible = true;
        $scope.IsEditDivVisible = false;
        $scope.obj = null;
        $scope.ToolReturnForm.$setPristine();
    };


    $scope.editClick = function (row, key, IsActive) {
        debugger;
        $scope.IsEditDivVisible = true;
        $scope.IsListDivVisible = false;
        if (key == 'E') {
            $scope.obj = new toolreturnServices.toolreturnData(row);
            $scope.obj.KEY = key;
            if (row.IsActive == 'N') {
                $scope.obj.IsActive = false;
            }
            else {
                $scope.obj.IsActive = true;
            }
        }
        else {
            $scope.obj = new toolreturnServices.toolreturnData(null);
            if ($scope.ToolReturnReasonList.length > 0) {
                $scope.obj.ReasonCode = $scope.ToolReturnReasonList[0].Max_RetReason_no;
            }
            $scope.disablecode = false;
            $scope.obj.IsActive = true;
            $scope.obj.KEY = key;
        }
    };

    $scope.submitForm = function (isValid, toolReturnmaster) {
        // check to make sure the form is completely valid
        debugger;
        if (isValid) {
            $scope.SavetoolReturnmaster(toolReturnmaster);
            $scope.ToolReturnForm.$setPristine();
        }
        else {
            angular.forEach($scope.ToolReturnForm.$error.required, function (field) {
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
    $scope.SavetoolReturnmaster = function (toolReturnmaster) {
        if (toolReturnmaster.IsActive == true) {
            toolReturnmaster.IsActive = "1";

        }
        else {
            toolReturnmaster.IsActive = "0";
        }
        var request = new toolreturnServices.SavetoolReturnmaster(toolReturnmaster);
        commonService.postWebService(request.url, request.param).then(function (response) {
            debugger;
            if (response.liToolReturnReason != null) {
                if (response.liToolReturnReason[0].MSG == "Updated Success") {
                    $("#Message").val('Updated !! ');//Messgae
                    $('#Title').html('ToolReturn Updated Successfully');//Title
                    $("#Message").trigger("click");
                    $scope.init();
                    $scope.obj = null;
                    $scope.ToolReturnForm.$setPristine();
                }
                else if (response.liToolReturnReason[0].MSG == "Tool Return Reason Already Exists") {

                    $("#Message").val('Alter !! ');//Messgae
                    $('#Title').html('Return - "' + response.liToolReturnReason[0].ReasonCode + '" Already Exists');//Title
                    $("#Message").trigger("click");
                    $scope.obj.IsActive = true;
                }

                else {
                    $("#Message").val('Saved !! ');//Messgae
                    $('#Title').html('ToolReturn Saved Successfully');//Title
                    $("#Message").trigger("click");
                    $scope.init();
                    $scope.obj = null;
                    $scope.ToolReturnForm.$setPristine();
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
        $scope.obj = new toolreturnServices.toolreturnData(row);
        myFunctionCompany();
    }

});