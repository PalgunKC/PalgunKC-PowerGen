sparerequestApp.controller('sparerequestCtrl', function (Excel, $timeout, $scope, $filter, sparerequestServices, commonService, DTOptionsBuilder, DTColumnBuilder) {
    $scope.SpareRequestReasonList = [];
    $scope.obj = new sparerequestServices.sparerequestData(null);

    $scope.init = function () {
        debugger;
        commonService.postWebService('Spare/BindListSpareRequest', {}).then(function (response) {
            $scope.IsListDivVisible = true;
            $scope.IsEditDivVisible = false;
            $scope.SpareRequestReasonList = response.liSpareRequestReason;
            if (response.liSpareRequestReason.length > 0) {
                $scope.obj.ReasonCode = response.liSpareRequestReason[0].Max_ReqReason_no;
            }


        });
        $scope.DatatableInitialize();
    };

    
    $scope.GetExcelData = function () {
        commonService.postWebService('Spare/GetExcelSpareRequestResonData', { 'P_KEY': 'EXCEL', 'dummycolumn1': 'Part' }).then(function (response) {
            $scope.DownloadTab(response);
        });
    }

    $scope.DownloadTab = function (response) {
        window.location = '/Spare/Download?ID=' + response.ID + '&Name=' + response.FileName;
    };



    //$scope.exportToExcel = function (tableId) { // ex: '#my-table'
    //    debugger;
    //    var exportHref = Excel.tableToExcel(tableId, 'madasamy');
    //    $timeout(function () {
    //        var a = document.createElement('a');
    //        a.href = exportHref;
    //        a.download = "SpareRequestReason.xls";
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
    //            pdfMake.createPdf(docDefinition).download("SpareRequestReason.pdf");
    //        }
    //    });
    //};

    $scope.DatatableInitialize = function () {
        $scope.vm = {};
        $scope.vm.dtOptions = DTOptionsBuilder.newOptions()
		  .withOption('order', [0, 'asc']);;
    };

    $scope.CancelSpareReason = function () {
        $scope.IsListDivVisible = true;
        $scope.IsEditDivVisible = false;
        $scope.obj = null;
        $scope.SpareReasonForm.$setPristine();
    };


    $scope.editClick = function (row, key, IsActive) {
        debugger;
        $scope.IsEditDivVisible = true;
        $scope.IsListDivVisible = false;
        if (key == 'E') {
            $scope.obj = new sparerequestServices.sparerequestData(row);
            $scope.obj.KEY = key;
            if (row.IsActive == 'N') {
                $scope.obj.IsActive = false;
            }
            else {
                $scope.obj.IsActive = true;
            }
        }
        else {
            $scope.obj = new sparerequestServices.sparerequestData(null);
            if ($scope.SpareRequestReasonList.length > 0) {
                $scope.obj.ReasonCode = $scope.SpareRequestReasonList[0].Max_ReqReason_no;
            }
            $scope.disablecode = false;
            $scope.obj.IsActive = true;
            $scope.obj.KEY = key;
        }
    };

    $scope.submitForm = function (isValid, spareRequestmaster) {
        // check to make sure the form is completely valid
        debugger;
        if (isValid) {
            $scope.SaveSpareRequestmaster(spareRequestmaster);
            $scope.SpareReasonForm.$setPristine();
        }
        else {
            angular.forEach($scope.SpareReasonForm.$error.required, function (field) {
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
    $scope.SaveSpareRequestmaster = function (spareRequestmaster) {
        if (spareRequestmaster.IsActive == true) {
            spareRequestmaster.IsActive = "1";

        }
        else {
            spareRequestmaster.IsActive = "0";
        }
        var request = new sparerequestServices.SaveSpareRequestmaster(spareRequestmaster);
        commonService.postWebService(request.url, request.param).then(function (response) {
            debugger;
            if (response.liSpareRequestReason != null) {
                if (response.liSpareRequestReason[0].MSG == "Updated Success") {
                    $("#Message").val('Updated !! ');//Messgae
                    $('#Title').html('Spare Request Reason Updated Successfully');//Title
                    $("#Message").trigger("click");
                    $scope.init();
                    $scope.obj = null;
                    $scope.SpareReasonForm.$setPristine();
                }
                else if (response.liSpareRequestReason[0].MSG == "Spare Reason Already Exists") {

                    $("#Message").val('Alter !! ');//Messgae
                    $('#Title').html('Reason - "' + response.liSpareRequestReason[0].ReasonCode + '" Already Exists');//Title
                    $("#Message").trigger("click");
                    $scope.obj.IsActive = true;
                }

                else {
                    $("#Message").val('Saved !! ');//Messgae
                    $('#Title').html('Spare Request Reason Saved Successfully');//Title
                    $("#Message").trigger("click");
                    $scope.init();
                    $scope.obj = null;
                    $scope.SpareReasonForm.$setPristine();
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
        $scope.obj = new sparerequestServices.sparerequestData(row);
        myFunctionCompany();
    }

});