toolrequestApp.controller('toolrequestCtrl', function (Excel, $timeout, $scope, $filter, toolrequestServices, commonService, DTOptionsBuilder, DTColumnBuilder) {
    $scope.ToolRequestReasonList = [];
    $scope.obj = new toolrequestServices.toolrequestData(null);

    $scope.init = function () {
        debugger;
        commonService.postWebService('Tool/BindListToolRequest', {}).then(function (response) {
            $scope.IsListDivVisible = true;
            $scope.IsEditDivVisible = false;    
            $scope.ToolRequestReasonList = response.liToolRequestReason;
            if (response.liToolRequestReason.length > 0) {
                $scope.obj.ToolReq_no = response.liToolRequestReason[0].Max_ReqReason_no;
            }
            
            
        });
        $scope.DatatableInitialize();
    };

    $scope.GetExcelData = function () {
        commonService.postWebService('Tool/GetExcelToolRequestResonData', { 'P_KEY': 'EXCEL', 'dummycolumn1': 'Part' }).then(function (response) {
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
    //        a.download = "ToolRequestReason.xls";
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
    //            pdfMake.createPdf(docDefinition).download("ToolRequestReason.pdf");
    //        }
    //    });
    //};

    $scope.DatatableInitialize = function () {
        $scope.vm = {};
        $scope.vm.dtOptions = DTOptionsBuilder.newOptions()
		  .withOption('order', [0, 'asc']);;
    };

    $scope.CancelToolReason = function () {
        $scope.IsListDivVisible = true;
        $scope.IsEditDivVisible = false;
        $scope.obj = null;
        $scope.ToolReasonForm.$setPristine();
    };


    $scope.editClick = function (row, key, IsActive) {
        debugger;
        $scope.IsEditDivVisible = true;
        $scope.IsListDivVisible = false;
        if (key == 'E') {
            $scope.obj = new toolrequestServices.toolrequestData(row);
            $scope.obj.KEY = key;
            if (row.IsActive == 'N') {
                $scope.obj.IsActive = false;
            }
            else {
                $scope.obj.IsActive = true;
            }
        }
        else {
            $scope.obj = new toolrequestServices.toolrequestData(null);
            if ($scope.ToolRequestReasonList.length > 0) {
                $scope.obj.ReasonCode = $scope.ToolRequestReasonList[0].Max_ReqReason_no;
            }
            $scope.disablecode = false;
            $scope.obj.IsActive = true;
            $scope.obj.KEY = key;
        }
    };

    $scope.submitForm = function (isValid, toolRequestmaster) {
        // check to make sure the form is completely valid
        debugger;
        if (isValid) {
            $scope.SavetoolRequestmaster(toolRequestmaster);
            $scope.ToolReasonForm.$setPristine();
        }
        else {
            angular.forEach($scope.ToolReasonForm.$error.required, function (field) {
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
    $scope.SavetoolRequestmaster = function (toolRequestmaster) {
        if (toolRequestmaster.IsActive == true) {
            toolRequestmaster.IsActive = "1";

        }
        else {
            toolRequestmaster.IsActive = "0";
        }
        var request = new toolrequestServices.SavetoolRequestmaster(toolRequestmaster);
        commonService.postWebService(request.url, request.param).then(function (response) {
            debugger;
            if (response.liToolRequestReason != null) {
                if (response.liToolRequestReason[0].MSG == "Updated Success") {
                    $("#Message").val('Updated !! ');//Messgae
                    $('#Title').html('ToolReason Updated Successfully');//Title
                    $("#Message").trigger("click");
                    $scope.init();
                    $scope.obj = null;
                    $scope.ToolReasonForm.$setPristine();
                }
                else if (response.liToolRequestReason[0].MSG == "Tool Reason Already Exists") {

                    $("#Message").val('Alter !! ');//Messgae
                    $('#Title').html('Reason - "' + response.liToolRequestReason[0].ReasonCode + '" Already Exists');//Title
                    $("#Message").trigger("click");
                    $scope.obj.IsActive = true;
                }

                else {
                    $("#Message").val('Saved !! ');//Messgae
                    $('#Title').html('ToolReason Saved Successfully');//Title
                    $("#Message").trigger("click");
                    $scope.init();
                    $scope.obj = null;
                    $scope.ToolReasonForm.$setPristine();
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
        $scope.obj = new toolrequestServices.toolrequestData(row);
        myFunctionCompany();
    }

});