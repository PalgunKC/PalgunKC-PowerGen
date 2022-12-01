sparevendorApp.controller('sparevendorCtrl', function (Excel, $timeout, $scope, $filter, sparevendorServices, commonService, DTOptionsBuilder, DTColumnBuilder) {
    $scope.SpareVendorList = [];
    $scope.StateList = [];
    $scope.CityList = [];
    $scope.obj = new sparevendorServices.sparevendorData(null);

    $scope.init = function () {
        debugger;
        commonService.postWebService('Spare/BindListSpareVendor', {}).then(function (response) {
            $scope.SpareVendorList = response.liSpareVendorMaster;
            //$scope.CityList = response.liCityMaster;
            $scope.StateList = response.liStateMaster;
            $scope.IsListDivVisible = true;
            $scope.IsEditDivVisible = false;
        });
        $scope.DatatableInitialize();
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
        var request = new sparevendorServices.BindCity(obj);
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

    $scope.CancelSpareVendor = function () {
        $scope.IsListDivVisible = true;
        $scope.IsEditDivVisible = false;
        $scope.obj = null;
        $scope.SparevendorForm.$setPristine();
    };


    $scope.editClick = function (row, key, IsActive) {
        debugger;
        $scope.IsEditDivVisible = true;
        $scope.IsListDivVisible = false;
        if (key == 'E') {
            $scope.obj = new sparevendorServices.sparevendorData(row);
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
            $scope.obj = new sparevendorServices.sparevendorData(null);
            $scope.disablecode = false;
            $scope.obj.IsActive = true;
            $scope.obj.KEY = key;
        }
    };

    $scope.submitForm = function (isValid, spareVendormaster) {
        // check to make sure the form is completely valid
        debugger;
        if (isValid) {
            $scope.SaveSpareVendormaster(spareVendormaster);
            $scope.SparevendorForm.$setPristine();
        }
        else {
            angular.forEach($scope.SparevendorForm.$error.required, function (field) {
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
    $scope.SaveSpareVendormaster = function (spareVendormaster) {
        if (spareVendormaster.IsActive == true) {
            spareVendormaster.IsActive = "1";

        }
        else {
            spareVendormaster.IsActive = "0";
        }
        var request = new sparevendorServices.SaveSpareVendormaster(spareVendormaster);
        commonService.postWebService(request.url, request.param).then(function (response) {
            debugger;

            //if (response.liSpareVendormaster != null) {
            //    if (response.liSpareVendormaster[0].MSG == "Updated Success") {
            //        $("#Message").val('Updated !! ');//Messgae
            //        $('#Title').html('Spare VendorMaster Updated Successfully');//Title
            //    }
            //    else {
            //        $("#Message").val('Saved !! ');//Messgae
            //        $('#Title').html('Spare VendorMaster Saved Successfully');//Title
            //    }
            //    $("#Message").trigger("click");
            //    $scope.init();
            //    $scope.obj = null;
            //    $scope.SparevendorForm.$setPristine();
            //}
            if (response.liSpareVendorMaster != null) {
                if (response.liSpareVendorMaster[0].MSG == "Updated Success") {
                    $("#Message").val('Updated !! ');//Messgae
                    $('#Title').html('VendorMaster Updated Successfully');//Title
                    $("#Message").trigger("click");
                    $scope.init();
                    $scope.obj = null;
                    $scope.SparevendorForm.$setPristine();
                }
                else if (response.liSpareVendorMaster[0].MSG == "Supplier Number Already Exists") {

                    $("#Message").val('Alter !! ');//Messgae
                    $('#Title').html('Vendor - "' + response.liSpareVendorMaster[0].VendorCode + '" Already Exists');//Title
                    $("#Message").trigger("click");
                    $scope.obj.IsActive = true;
                }

                else {
                    $("#Message").val('Saved !! ');//Messgae
                    $('#Title').html('VendorMaster Saved Successfully');//Title
                    $("#Message").trigger("click");
                    $scope.init();
                    $scope.obj = null;
                    $scope.SparevendorForm.$setPristine();
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
        $scope.obj = new sparevendorServices.sparevendorData(row);
        myFunctionCompany();
    }

});