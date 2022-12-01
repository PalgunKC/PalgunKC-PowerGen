shiftApp.controller('shiftCtrl', function (Excel, $timeout, $scope, $filter, shiftServices, commonService, DTOptionsBuilder, DTColumnBuilder) {
    $scope.ShiftList = [];
    //$scope.obj.LocationBin ="";
    $scope.obj =new shiftServices.shiftData(null);

    $scope.$watch('obj.LineName', function (val) {
        $scope.obj.LineName = $filter('uppercase')(val);
    }, true);
   
    $scope.init = function () {
        debugger;
        commonService.postWebService('Master/BindListShift', {}).then(function (response) {
            $scope.ShiftList = response.liShiftmaster;
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
            a.download = "ShiftMaster.xls";
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
                pdfMake.createPdf(docDefinition).download("ShiftMaster.pdf");
            }
        });
    };
    $scope.DatatableInitialize = function () {
        $scope.vm = {};
        $scope.vm.dtOptions = DTOptionsBuilder.newOptions()
		  .withOption('order', [0, 'asc']);;
    };

    $scope.CancelShift = function () {
        $scope.IsListDivVisible = true;
        $scope.IsEditDivVisible = false;
        $scope.obj = null;
        $scope.ShiftForm.$setPristine();
    };


    $scope.editClick = function (row, key, IsActive) {
        debugger;
        $scope.IsEditDivVisible = true;
        $scope.IsListDivVisible = false;
        if (key == 'E') {
            $scope.obj = new shiftServices.shiftData(row);
            $scope.obj.KEY = key;
            if (row.IsUse == '1') {
                $scope.obj.IsUse = true;
            }
            else {
                $scope.obj.IsUse = false;
            }
            //$scope.BindCity(row, "E");
        }
        else {
            $scope.obj = new shiftServices.shiftData(null);
            $scope.disablecode = false;
            $scope.obj.IsUse = true;
            $scope.obj.KEY = key;
        }
    };

    $scope.submitForm = function (isValid, Shiftmaster) {
        // check to make sure the form is completely valid
        debugger;
        if (isValid) {
            $scope.SaveShiftmaster(Shiftmaster);
            $scope.ShiftForm.$setPristine();
        }
        else {
            angular.forEach($scope.ShiftForm.$error.required, function (field) {
                field.$setDirty();
            });
            var LineName = document.getElementById("LineName");
          
            if (LineName.value == "") {
                LineName.focus();
            }

          
        }
    };

    $scope.SaveShiftmaster = function (Shiftmaster) {
        if (Shiftmaster.IsUse == true) {
            Shiftmaster.IsUse = "1";

        }
        else {
            Shiftmaster.IsUse = "0";
        }


        var t = 0;
        angular.forEach($scope.ShiftList, function (value, key) {
            debugger;
            if (t == 0) {
                if (value.ShiftName == Shiftmaster.ShiftName) {
                    if (value.IsUse != Shiftmaster.IsUse) {
                        var a = Shiftmaster.ShiftName.charAt(0);
                        var aa = Shiftmaster.IsUse;
                        angular.forEach($scope.ShiftList, function (value, key) {
                            if (value.ShiftName.charAt(0) == a) {
                                if (value.IsUse != '0' && aa != '0') {
                                    if (value.IsUse == aa) {
                                        $("#Message").val('Alter !! ');//Messgae
                                        $('#Title').html('Please Inactivate other Shift');//Title
                                        $("#Message").trigger("click");
                                        t = 1;
                                        //return false;
                                    }
                                }
                            }
                        });
                    }
                }
            }
        });
        if (t == 1) {
            return false;
        }

        Shiftmaster.LocationBinData = $scope.obj.LocationBin;
        var request = new shiftServices.Saveshiftmaster(Shiftmaster);
        commonService.postWebService(request.url, request.param).then(function (response) {
            debugger;

            if (response.liShiftmaster != null) {
                if (response.liShiftmaster[0].MSG == "Updated Success") {
                    $("#Message").val('Updated !! ');//Messgae
                    $('#Title').html('ShiftTiming Updated Successfully');//Title
                    $("#Message").trigger("click");
                    $scope.init();
                    $scope.obj = null;
                    $scope.ShiftForm.$setPristine();
                }
                else if (response.liShiftmaster[0].MSG == "ShiftTiming Already Exists") {

                    $("#Message").val('Alter !! ');//Messgae
                    $('#Title').html('Location - "' + response.liShiftmaster[0].LocationName + '" Already Exists');//Title
                    $("#Message").trigger("click");
                    $scope.obj.IsUse = true;
                }

                else {
                    $("#Message").val('Saved !! ');//Messgae
                    $('#Title').html('ShiftTiming Saved Successfully');//Title
                    $("#Message").trigger("click");
                    $scope.init();
                    $scope.obj = null;
                    $scope.ShiftForm.$setPristine();
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
        $scope.obj = new shiftServices.shiftData(row);
        myFunctionCompany();
    }

});