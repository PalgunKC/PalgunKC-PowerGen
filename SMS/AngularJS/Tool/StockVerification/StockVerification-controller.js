StockVerificationApp.controller('StockVerificationCtrl', function (Excel, $timeout,$scope, $filter, StockVerificationServices, commonService) {
    $scope.PartMasterList = [];
    $scope.StateList = [];
    $scope.CityList = [];
    $scope.obj = new StockVerificationServices.StockVerificationData(null);

    $scope.FunctionSearch = function (obj) {
        debugger;
        if (obj.SearchField == '') {
            $scope.init()
            return false;
        }
        if (obj.SearchData == '') {
            $scope.init()
            return false;
        }
        commonService.postWebService('Tool/BindListPartMasterStock', { 'P_KEY': 'Search', 'SearchField': obj.SearchField, 'SearchData': obj.SearchData }).then(function (response) {
            $scope.SparePartMasterList = response.ddlSparePartmaster;
            $scope.TotalCount = parseInt($scope.SparePartMasterList[0].TotalCount)
        });
    }
    $scope.numPages = function () {
        return Math.ceil($scope.TotalCount / $scope.numPerPage);
    };

    $scope.BindFilterData = function () {
        //var begin = (($scope.currentPage - 1) * $scope.numPerPage)
        //, end = begin + $scope.numPerPage;

        //$scope.SparePartMasterList = $scope.todos.slice(begin, end);
        commonService.postWebService('Tool/BindListPartMasterStock', { 'P_KEY': 'Part', 'P_PAGE_INDEX': $scope.currentPage, 'P_PAGE_SIZE': '10' }).then(function (response) {
            $scope.PartMasterList = response.liPartmaster;
            $scope.TotalCount = parseInt($scope.PartMasterList[0].TotalCount)

            angular.forEach($scope.PartMasterList, function (value, key) {
                value.Min_qty = parseFloat(value.Min_qty);
                value.Max_qty = parseFloat(value.Max_qty);
                value.PHY_QTY = parseFloat(value.PHY_QTY);
                value.Diffrence = parseFloat(value.TotalProductCount) - parseFloat(value.PHY_QTY)
            });
        });
    };
    //$scope.init = function () {
    //    debugger;
    //    commonService.postWebService('Tool/BindListPartMasterStock', {}).then(function (response) {
    //        $scope.PartMasterList = response.liPartmaster;
            
    //        angular.forEach($scope.PartMasterList, function (value, key) {
    //            value.Min_qty = parseFloat(value.Min_qty);
    //            value.Max_qty = parseFloat(value.Max_qty);
    //            value.PHY_QTY = parseFloat(value.PHY_QTY);
    //            value.Diffrence = parseFloat(value.TotalProductCount) - parseFloat(value.PHY_QTY)
    //        });
    //        //$scope.CityList = response.liCityMaster;
    //       // $scope.StateList = response.liStateMaster;
    //        $scope.IsListDivVisible = true;
    //        $scope.IsEditDivVisible = false;
    //    });
    //    $scope.DatatableInitialize();
    //};

    $scope.init = function () {
        debugger;
        $scope.IsListDivVisible = true;
        $scope.IsEditDivVisible = false;
        $scope.filteredTodos = []
            , $scope.currentPage = 1
            , $scope.numPerPage = 10
            , $scope.maxSize = 5
            , $scope.TotalCount = 0;

        commonService.postWebService('Tool/BindListPartMasterStock', { 'P_KEY': 'Part', 'P_PAGE_INDEX': $scope.currentPage, 'P_PAGE_SIZE': '10' }).then(function (response) {
            $scope.PartMasterList = response.liPartmaster;
            $scope.TotalCount = parseInt($scope.PartMasterList[0].TotalCount)
            angular.forEach($scope.PartMasterList, function (value, key) {
                value.Min_qty = parseFloat(value.Min_qty);
                value.Max_qty = parseFloat(value.Max_qty);
                value.PHY_QTY = parseFloat(value.PHY_QTY);
                value.Diffrence = parseFloat(value.TotalProductCount) - parseFloat(value.PHY_QTY)
            });


        });
    };
    
    $scope.filterPartMasterList = function (PartMasterList) {
        return (PartMasterList.IsActive === 'Y' && parseFloat(PartMasterList.TotalProductCount) > 0);
    }
    $scope.BindDiffrence = function (row) {
        row.Diffrence = parseFloat(row.TotalProductCount) - parseFloat(row.PHY_QTY)
    }
    $scope.DatatableInitialize = function () {
        $scope.vm = {};
        $scope.vm.dtOptions = DTOptionsBuilder.newOptions()
		  .withOption('order', [0, 'asc']);;
    };

    $scope.CancelStockVerification = function () {
        $scope.IsListDivVisible = true;
        $scope.IsEditDivVisible = false;
        $scope.obj = null;
        $scope.StockVerificationForm.$setPristine();
    };

     $scope.exportToExcel = function (tableId) { // ex: '#my-table'
        debugger;
        var exportHref = Excel.tableToExcel(tableId, 'madasamy');
        $timeout(function () {
            var a = document.createElement('a');
            a.href = exportHref;
            a.download = "StockVerification.xls";
            document.body.appendChild(a);
            a.click();
            a.remove();
        }, 100); // trigger download
    };
    $scope.exportToPDF = function (tableId) {
        debugger;
        html2canvas(document.getElementById(tableId), {
            onrendered: function (canvas) {
                debugger;
                var data = canvas.toDataURL();
                var docDefinition = {
                    content: [{
                        image: data,
                        width: 500
                    }]
                };
                pdfMake.createPdf(docDefinition).download("StockVerification.pdf");
            }
        });
    };



    //$scope.editClick = function (row, key, IsActive) {
    //    debugger;
    //    $scope.IsEditDivVisible = true;
    //    $scope.IsListDivVisible = false;
    //    if (key == 'E') {
    //        $scope.obj = new StockVerificationServices.StockVerificationData(row);
    //        $scope.obj.KEY = key;
    //        if (row.IsActive == 'N') {
    //            $scope.obj.IsActive = false;
    //        }
    //        else {
    //            $scope.obj.IsActive = true;
    //        }
    //        $scope.BindCity(row, "E");
    //    }
    //    else {
    //        $scope.obj = new StockVerificationServices.StockVerificationData(null);
    //        $scope.disablecode = false;
    //        $scope.obj.IsActive = true;
    //        $scope.obj.KEY = key;
    //    }
    //};

    //$scope.submitForm = function (isValid, StockVerification) {
    //    // check to make sure the form is completely valid
    //    debugger;
    //    if (isValid) {
    //        $scope.SaveStockVerification(StockVerification);
    //        $scope.StockVerificationForm.$setPristine();
    //    }
    //    else {
    //        angular.forEach($scope.StockVerificationForm.$error.required, function (field) {
    //            field.$setDirty();
    //        });
           

    //    }
    //};

    $scope.SaveStockVerification = function (StockVerification) {
        //if (StockVerification.IsActive == true) {
        //    StockVerification.IsActive = "1";

        //}
        //else {
        //    StockVerification.IsActive = "0";
        //}
        StockVerification.Diffrence = StockVerification.Diffrence.toString();
        var request = new StockVerificationServices.SaveStockVerification(StockVerification);
        commonService.postWebService(request.url, request.param).then(function (response) {
            debugger;

            if (response.liPartmaster != null) {
                if (response.liPartmaster[0].MSG == "Updated Success") {
                    $("#Message").val('Updated !! ');//Messgae
                    $('#Title').html('Tool StockVerification Updated Successfully');//Title
                     $("#Message").trigger("click");
                $scope.init();
                $scope.obj = null;
                $scope.StockVerificationForm.$setPristine();
                }
                else if (response.liPartmaster[0].MSG == "Part Number Already Exists") {
                   
                    $("#Message").val('Alter !! ');//Messgae
                    $('#Title').html('Part Number - "' + response.liPartmaster[0].PartNumber + '" Already Exists');//Title
                    $("#Message").trigger("click");
                    $scope.obj.IsActive = true;
                }
                else {
                    $("#Message").val('Saved !! ');//Messgae
                    $('#Title').html('Tool StockVerification Saved Successfully');//Title
                    $("#Message").trigger("click");
                    $scope.init();
                    $scope.obj = null;
                    $scope.StockVerificationForm.$setPristine();
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
        $scope.obj = new StockVerificationServices.StockVerificationData(row);
        myFunctionCompany();
    }

});