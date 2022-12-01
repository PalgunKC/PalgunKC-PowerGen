toollocationApp.controller('toollocationCtrl', function (Excel, $timeout, $scope, $filter, toollocationServices, commonService) {
    $scope.ToolLocationList = [];
    //$scope.obj.LocationBin ="";
    $scope.obj = new toollocationServices.toollocationData(null);

    $scope.$watch('obj.LocationStation', function (val) {
        $scope.obj.LocationStation = $filter('uppercase')(val);
    }, true);
    $scope.$watch('obj.LocationRow', function (val) {
        $scope.obj.LocationRow = $filter('uppercase')(val);
    }, true);
    $scope.$watch('obj.LocationBinData', function (val) {
        $scope.obj.LocationBinData = $filter('uppercase')(val);
    }, true);

    $scope.GetExcelData = function () {
        commonService.postWebService('Tool/GetexcelToolLocation', { 'P_KEY': 'EXCEL', 'dummycolumn1': 'Part' }).then(function (response) {

            $scope.DownloadTab(response);
        });
    }

    $scope.DownloadTab = function (response) {
        window.location = '/Tool/Download?ID=' + response.ID + '&Name=' + response.FileName;
    };
    $scope.init = function () {
        debugger;
        $scope.IsListDivVisible = true;
        $scope.IsEditDivVisible = false;
        $scope.filteredTodos = []
            , $scope.currentPage = 1
            , $scope.numPerPage = 10
            , $scope.maxSize = 5
            , $scope.TotalCount = 0;
        commonService.postWebService('Tool/BindListToolLocation', { 'P_KEY': 'Location', 'P_PAGE_INDEX': '1', 'P_PAGE_SIZE': '10' }).then(function (response) {
            $scope.ToolLocationList = response.liToolLocationmaster;
            $scope.TotalCount = parseInt($scope.ToolLocationList[0].TotalCount)
        });
        // $scope.DatatableInitialize();
    };
    $scope.numPages = function () {
        return Math.ceil($scope.TotalCount / $scope.numPerPage);
    };
    $scope.BindFilterData = function () {
        //var begin = (($scope.currentPage - 1) * $scope.numPerPage)
        //, end = begin + $scope.numPerPage;

        //$scope.SparePartMasterList = $scope.todos.slice(begin, end);
        commonService.postWebService('Tool/BindListToolLocation', { 'P_KEY': 'Location', 'P_PAGE_INDEX': $scope.currentPage, 'P_PAGE_SIZE': '10' }).then(function (response) {
            $scope.ToolLocationList = response.liToolLocationmaster;
            $scope.TotalCount = parseInt($scope.ToolLocationList[0].TotalCount)
        });
    };

    $scope.exportToExcel = function (tableId) { // ex: '#my-table'
        debugger;
        var exportHref = Excel.tableToExcel(tableId, 'madasamy');
        $timeout(function () {
            var a = document.createElement('a');
            a.href = exportHref;
            a.download = "ToolLocationMaster.xls";
            document.body.appendChild(a);
            a.click();
            a.remove();
        }, 100); // trigger download
    };

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
        commonService.postWebService('Tool/BindListToolLocation', { 'P_KEY': 'Search', 'SearchField': obj.SearchField, 'SearchData': obj.SearchData }).then(function (response) {
            $scope.ToolLocationList = response.liToolLocationmaster;
            $scope.TotalCount = parseInt($scope.ToolLocationList[0].TotalCount)
        });
    }

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
                pdfMake.createPdf(docDefinition).download("ToolLocationMaster.pdf");
            }
        });
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
            var LocationStation = document.getElementById("LocationStation");
            var LocationRow = document.getElementById("LocationRow");
            var LocationColumn = document.getElementById("LocationColumn");
            var LocationBinData = document.getElementById("LocationBinData");
            if (LocationStation.value == "") {
                LocationStation.focus();
            }

            else if (LocationRow.value == "") {

                LocationRow.focus();
            }
            else if (LocationColumn.value == "") {

                LocationColumn.focus();
            }
            else if (LocationBinData.value == "") {

                LocationBinData.focus();
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
        //toolLocationmaster.LocationBinData = $scope.obj.LocationBin;
        if (toolLocationmaster.LocationName.slice(-1) == '-') {
            toolLocationmaster.LocationName = toolLocationmaster.LocationName.slice(0, -1);
        }
        var request = new toollocationServices.SaveToolLocationmaster(toolLocationmaster);
        commonService.postWebService(request.url, request.param).then(function (response) {
            debugger;

            if (response.liToolLocationmaster != null) {
                if (response.liToolLocationmaster[0].MSG == "Updated Success") {
                    $("#Message").val('Updated !! ');//Messgae
                    $('#Title').html('ToolCrib Location Updated Successfully');//Title
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
                    $('#Title').html('ToolCrib Location Saved Successfully');//Title
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