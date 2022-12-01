PartgroupMstApp.controller('PartgroupMstCtrl', function (Excel, $timeout, $scope, $filter, PartgroupServices, commonService) {
    $scope.PartGroupList = [];
    //$scope.obj.LocationBin ="";
    $scope.obj = new PartgroupServices.PartgroupData(null);


    $scope.GetExcelData = function () {
        commonService.postWebService('Tool/GetexcelPartgroupMaster', { 'P_KEY': 'EXCEL', 'dummycolumn1': 'Part' }).then(function (response) {

            $scope.DownloadTab(response);
        });
    }

    $scope.DownloadTab = function (response) {
        window.location = '/Tool/Download?ID=' + response.ID + '&Name=' + response.FileName;
    };
    $scope.init = function () {
        debugger;
        $scope.obj.SearchField = '';
        $scope.obj.SearchData = '';
        $scope.IsListDivVisible = true;
        $scope.IsEditDivVisible = false;
        $scope.filteredTodos = []
            , $scope.currentPage = 1
            , $scope.numPerPage = 10
            , $scope.maxSize = 5
            , $scope.TotalCount = 0;
        commonService.postWebService('Tool/BindListPartgroupMst', { 'P_KEY': 'Location', 'P_PAGE_INDEX': '1', 'P_PAGE_SIZE': '10' }).then(function (response) {
            $scope.PartGroupList = response.liPartGroupmaster;
            $scope.TotalCount = parseInt($scope.PartGroupList[0].TotalCount)
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
        commonService.postWebService('Tool/BindListPartgroupMst', { 'P_KEY': 'Location', 'P_PAGE_INDEX': $scope.currentPage, 'P_PAGE_SIZE': '10' }).then(function (response) {
            $scope.PartGroupList = response.liPartGroupmaster;
            $scope.TotalCount = parseInt($scope.PartGroupList[0].TotalCount)
        });
    };

    $scope.exportToExcel = function (tableId) { // ex: '#my-table'
        debugger;
        var exportHref = Excel.tableToExcel(tableId, 'madasamy');
        $timeout(function () {
            var a = document.createElement('a');
            a.href = exportHref;
            a.download = "PartGroupMaster.xls";
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
        commonService.postWebService('Tool/BindListPartgroupMst', { 'P_KEY': 'Search', 'SearchField': obj.SearchField, 'SearchData': obj.SearchData }).then(function (response) {
            $scope.PartGroupList = response.liPartGroupmaster;
            $scope.TotalCount = parseInt($scope.PartGroupList[0].TotalCount)
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
                pdfMake.createPdf(docDefinition).download("Partgroupmaster.pdf");
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
        $scope.PartgroupmstForm.$setPristine();
    };


    $scope.editClick = function (row, key, IsActive) {
        debugger;
        $scope.IsEditDivVisible = true;
        $scope.IsListDivVisible = false;
        if (key == 'E') {
            $scope.disableCtrl = true;
            $scope.obj = new PartgroupServices.PartgroupData(row);
            $scope.obj.KEY = key;
            if (row.IsActive == 'N') {
                $scope.obj.IsActive = false;
            }
            else {
                $scope.obj.IsActive = true;
            }
        }
        else {
            $scope.obj = new PartgroupServices.PartgroupData(null);
            $scope.disablecode = false;
            $scope.obj.IsActive = true;
            $scope.obj.KEY = key;
        }
    };

    $scope.submitForm = function (isValid, Partgroupmaster) {
        // check to make sure the form is completely valid
        debugger;
        if (isValid) {
            $scope.SavePartgroupMaster(Partgroupmaster);
            $scope.PartgroupmstForm.$setPristine();
        }
        else {
            angular.forEach($scope.PartgroupmstForm.$error.required, function (field) {
                field.$setDirty();
            });
            var ProductID = document.ProductID("LocationStation");
            //   var Productgroup = document.getElementById("Productgroup");
            var Productgroup_desc = document.getElementById("Productgroup_desc");
            if (Productgroup.value == "") {
                Productgroup.focus();
            }


        }
    };

    $scope.SavePartgroupMaster = function (Partgroupmaster) {
        if (Partgroupmaster.IsActive == true) {
            Partgroupmaster.IsActive = "1";

        }
        else {
            Partgroupmaster.IsActive = "0";
        }
        
        var request = new PartgroupServices.SavePartgroupMaster(Partgroupmaster);
        commonService.postWebService(request.url, request.param).then(function (response) {
            debugger;

            if (response.liPartGroupmaster != null) {
                if (response.liPartGroupmaster[0].MSG == "Updated Success") {
                    $("#Message").val('Updated !! ');//Messgae
                    $('#Title').html('PartGroup Master Updated Successfully');//Title
                    $("#Message").trigger("click");
                    $scope.init();
                    $scope.obj = null;
                    $scope.PartgroupmstForm.$setPristine();
                }
                else if (response.liPartGroupmaster[0].MSG == "Location Already Exists") {

                    $("#Message").val('Alter !! ');//Messgae
                    $('#Title').html('Location - "' + response.liPartGroupmaster[0].LocationName + '" Already Exists');//Title
                    $("#Message").trigger("click");
                    $scope.obj.IsActive = true;
                }

                else {
                    $("#Message").val('Saved !! ');//Messgae
                    $('#Title').html('PartGroup Master Saved Successfully');//Title
                    $("#Message").trigger("click");
                    $scope.init();
                    $scope.obj = null;
                    $scope.PartgroupmstForm.$setPristine();
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
        $scope.obj = new PartgroupServices.PartgroupData(row);
        myFunctionCompany();
    }

});