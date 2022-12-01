toolvendorApp.controller('toolvendorCtrl', function (Excel, $timeout, $scope, $filter, toolvendorServices, commonService) {
    $scope.ToolVendorList = [];
    $scope.StateList = [];
    $scope.CityList = [];
    $scope.obj = new toolvendorServices.toolvendorData(null);

    //$scope.init = function () {
    //    debugger;
    //    commonService.postWebService('Tool/BindListToolVendor', {}).then(function (response) {
    //        $scope.ToolVendorList = response.liToolVendorMaster;
    //        //$scope.CityList = response.liCityMaster;
    //        //$scope.StateList = response.liStateMaster;
    //        $scope.IsListDivVisible = true;
    //        $scope.IsEditDivVisible = false;
    //    });
    //    $scope.DatatableInitialize();
    //};
    $scope.DownloadTab = function (response) {
        window.location = '/Tool/Download?ID=' + response.ID + '&Name=' + response.FileName;
    };
    $scope.numPages = function () {
        return Math.ceil($scope.TotalCount / $scope.numPerPage);
    };
    $scope.GetExcelData = function () {
        commonService.postWebService('Tool/GetexcelVendorMaster', { 'P_KEY': 'EXCEL', 'dummycolumn1': 'Part' }).then(function (response) {

            $scope.DownloadTab(response);
        });
    }
    $scope.BindFilterData = function () {

        commonService.postWebService('Tool/BindListToolVendor', { 'P_KEY': 'Vendor', 'P_PAGE_INDEX': $scope.currentPage, 'P_PAGE_SIZE': '10' }).then(function (response) {
            $scope.ToolVendorList = response.liToolVendorMaster;
            $scope.TotalCount = parseInt($scope.ToolVendorList[0].TotalCount)
        });
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
        commonService.postWebService('Tool/BindListToolVendor', { 'P_KEY': 'Search', 'SearchField': obj.SearchField, 'SearchData': obj.SearchData }).then(function (response) {
            $scope.ToolVendorList = response.liToolVendorMaster;
            $scope.TotalCount = parseInt($scope.ToolVendorList[0].TotalCount)
        });
    }

    $scope.init = function () {
        debugger;
        $scope.obj.SearchField = '';
        $scope.obj.SearchData = '';
        $scope.IsListDivVisible = true;
        $scope.IsEditDivVisible = false;
        $scope.currentPage = 1;
        $scope.numPerPage = 10;
        $scope.maxSize = 5;
        $scope.TotalCount = 0;
        commonService.postWebService('Tool/BindListToolVendor', { 'P_KEY': 'Vendor', 'P_PAGE_INDEX': '1', 'P_PAGE_SIZE': '10' }).then(function (response) {
            $scope.ToolVendorList = response.liToolVendorMaster;
            $scope.TotalCount = parseInt($scope.ToolVendorList[0].TotalCount)

            //$scope.CityList = response.liCityMaster;
            //$scope.StateList = response.liStateMaster;
            $scope.IsListDivVisible = true;
            $scope.IsEditDivVisible = false;
        });
        //$scope.DatatableInitialize();
    };
    $scope.exportToExcel = function (tableId) { // ex: '#my-table'
        debugger;
        var exportHref = Excel.tableToExcel(tableId, 'madasamy');
        $timeout(function () {
            var a = document.createElement('a');
            a.href = exportHref;
            a.download = "VendorMaster.xls";
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
                pdfMake.createPdf(docDefinition).download("VendorMaster.pdf");
            }
        });
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
            var GST = document.getElementById("GST");
            var EmailId = document.getElementById("EmailId");
            var Fromdate = document.getElementById("Fromdate");
            var Cmobile = document.getElementById("Cmobile");
            var Cemail = document.getElementById("Cemail");
            var Cname = document.getElementById("Cname");


            if (VendorCode.value == "") {
                VendorCode.focus();
            }

            else if (VendorName.value == "") {

                VendorName.focus();
            }

            else if (GST.value == "") {

                GST.focus();
            }

            else if (EmailId.value == "") {

                EmailId.focus();

            }
            else if (Cname.value == "") {

                Cname.focus();

            }
            else if (Cmobile.value == "") {

                Cmobile.focus();

            }
            else if (Cemail.value == "") {

                Cemail.focus();

            }
            else if (Fromdate.value == "") {

                Fromdate.focus();

            }



        }
    };
    //$scope.SetDisable = function (obj) {
    //    debugger;
    //    $("#Todate").attr("disabled", "disabled");
    //}
    $(function () {
        $('#Todate').bind('keyup keydown keypress', function (evt) {

            return false;
        });
    });
    $(function () {
        $('#Fromdate').bind('keyup keydown keypress', function (evt) {

            return false;
        });
    });
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

            //if (response.liToolVendormaster != null) {
            //    if (response.liToolVendormaster[0].MSG == "Updated Success") {
            //        $("#Message").val('Updated !! ');//Messgae
            //        $('#Title').html('Tool VendorMaster Updated Successfully');//Title
            //    }
            //    else {
            //        $("#Message").val('Saved !! ');//Messgae
            //        $('#Title').html('Tool VendorMaster Saved Successfully');//Title
            //    }
            //    $("#Message").trigger("click");
            //    $scope.init();
            //    $scope.obj = null;
            //    $scope.ToolvendorForm.$setPristine();
            //}
            if (response.liToolVendorMaster != null) {
                if (response.liToolVendorMaster[0].MSG == "Updated Success") {
                    $("#Message").val('Updated !! ');//Messgae
                    $('#Title').html('VendorMaster Updated Successfully');//Title
                    $("#Message").trigger("click");
                    $scope.init();
                    $scope.obj = null;
                    $scope.ToolvendorForm.$setPristine();
                }
                else if (response.liToolVendorMaster[0].MSG == "Supplier Number Already Exists") {

                    $("#Message").val('Alter !! ');//Messgae
                    $('#Title').html('Vendor - "' + response.liToolVendorMaster[0].VendorCode + '" Already Exists');//Title
                    $("#Message").trigger("click");
                    $scope.obj.IsActive = true;
                }

                else {
                    $("#Message").val('Saved !! ');//Messgae
                    $('#Title').html('VendorMaster Saved Successfully');//Title
                    $("#Message").trigger("click");
                    $scope.init();
                    $scope.obj = null;
                    $scope.ToolvendorForm.$setPristine();
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
        $scope.obj = new toolvendorServices.toolvendorData(row);
        myFunctionCompany();
    }

});