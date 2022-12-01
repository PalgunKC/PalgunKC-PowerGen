toollineApp.controller('toollineCtrl', function (Excel, $timeout, $scope, $filter, toollineServices, commonService, DTOptionsBuilder, DTColumnBuilder) {
    $scope.ToolLineList = [];
    //$scope.obj.LocationBin ="";
    $scope.obj = new toollineServices.toollineData(null);

    $scope.$watch('obj.LineName', function (val) {
        $scope.obj.LineName = $filter('uppercase')(val);
    }, true);
   
    $scope.init = function () {
        debugger;
        commonService.postWebService('Tool/BindListToolLine', {}).then(function (response) {
            $scope.ToolLineList = response.liToolLinemaster;
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
            a.download = "ToolLineMaster.xls";
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
                pdfMake.createPdf(docDefinition).download("ToolLineMaster.pdf");
            }
        });
    };
    $scope.DatatableInitialize = function () {
        $scope.vm = {};
        $scope.vm.dtOptions = DTOptionsBuilder.newOptions()
		  .withOption('order', [0, 'asc']);;
    };

    $scope.CancelToolLine = function () {
        $scope.IsListDivVisible = true;
        $scope.IsEditDivVisible = false;
        $scope.obj = null;
        $scope.ToollineForm.$setPristine();
    };


    $scope.editClick = function (row, key, IsActive) {
        debugger;

        if (key == 'E') {
            $scope.IsEditDivVisible = true;
            $scope.IsListDivVisible = false;
            $scope.obj = new toollineServices.toollineData(row);
            $scope.obj.KEY = key;
            if (row.IsActive == 'N') {
                $scope.obj.IsActive = false;
            }
            else {
                $scope.obj.IsActive = true;
            }
            //$scope.BindCity(row, "E");
        }
        else if (key == 'I') {
            $scope.obj = new toollineServices.toollineData(row);
            $scope.obj.KEY = key;
            $scope.obj.IsActive = 0;
            $scope.submitForm(true, $scope.obj);
        }
        else if (key == 'A') {
            $scope.obj = new toollineServices.toollineData(row);
            $scope.obj.KEY = key;
            $scope.obj.IsActive = 1;
            $scope.submitForm(true, $scope.obj);
        }

        else {
            $scope.IsEditDivVisible = true;
            $scope.IsListDivVisible = false;
            $scope.obj = new toollineServices.toollineData(null);
            $scope.disablecode = false;
            $scope.obj.IsActive = true;
            $scope.obj.KEY = key;
        }
    };

    $scope.submitForm = function (isValid, Toollinemaster) {
        // check to make sure the form is completely valid
        debugger;
        if (isValid) {
            $scope.SaveToolLinemaster(Toollinemaster);
            $scope.ToollineForm.$setPristine();
        }
        else {
            angular.forEach($scope.ToollineForm.$error.required, function (field) {
                field.$setDirty();
            });
            var LineName = document.getElementById("LineName");
          
            if (LineName.value == "") {
                LineName.focus();
            }

          
        }
    };

    $scope.SaveToolLinemaster = function (Toollinemaster) {
        if (Toollinemaster.IsActive == true) {
            Toollinemaster.IsActive = "1";

        }
        else {
            Toollinemaster.IsActive = "0";
        }
        Toollinemaster.LocationBinData = $scope.obj.LocationBin;
        var request = new toollineServices.SaveToolLinemaster(Toollinemaster);
        commonService.postWebService(request.url, request.param).then(function (response) {
            debugger;

            if (response.liToolLinemaster != null) {
                if (response.liToolLinemaster[0].MSG == "Updated Success") {
                    $("#Message").val('Updated !! ');//Messgae
                    $('#Title').html('Tool LocationMaster Updated Successfully');//Title
                    $("#Message").trigger("click");
                    $scope.init();
                    $scope.obj = null;
                    $scope.ToollineForm.$setPristine();
                }
                else if (response.liToolLinemaster[0].MSG == "Location Already Exists") {

                    $("#Message").val('Alter !! ');//Messgae
                    $('#Title').html('Location - "' + response.liToolLinemaster[0].LocationName + '" Already Exists');//Title
                    $("#Message").trigger("click");
                    $scope.obj.IsActive = true;
                }

                else {
                    $("#Message").val('Saved !! ');//Messgae
                    $('#Title').html('Tool LocationMaster Saved Successfully');//Title
                    $("#Message").trigger("click");
                    $scope.init();
                    $scope.obj = null;
                    $scope.ToollineForm.$setPristine();
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
        $scope.obj = new toollineServices.toollineData(row);
        myFunctionCompany();
    }

});