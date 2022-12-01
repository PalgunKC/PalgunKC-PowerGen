machineApp.controller('machineCtrl', function (Excel, $timeout, $scope, $filter, machineServices, commonService, DTOptionsBuilder, DTColumnBuilder) {
    $scope.MachineList = [];
    //$scope.obj.LocationBin ="";
    $scope.obj =new machineServices.machineData(null);

    $scope.$watch('obj.MachineName', function (val) {
        $scope.obj.MachineName = $filter('uppercase')(val);
    }, true);
   
    $scope.init = function () {
        debugger;
        commonService.postWebService('Master/BindListMachine', {}).then(function (response) {
            $scope.MachineList = response.liMachinemaster;
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
            a.download = "MachineMaster.xls";
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
                pdfMake.createPdf(docDefinition).download("MachineMaster.pdf");
            }
        });
    };
    $scope.DatatableInitialize = function () {
        $scope.vm = {};
        $scope.vm.dtOptions = DTOptionsBuilder.newOptions()
		  .withOption('order', [0, 'asc']);;
    };

    $scope.CancelMachine = function () {
        $scope.IsListDivVisible = true;
        $scope.IsEditDivVisible = false;
        $scope.obj = null;
        $scope.MachineForm.$setPristine();
    };


    $scope.editClick = function (row, key, IsActive) {
        debugger;
        $scope.IsEditDivVisible = true;
        $scope.IsListDivVisible = false;
        if (key == 'E') {
            $scope.obj = new machineServices.machineData(row);
            $scope.obj.KEY = key;
            if (row.IsActive == 'N') {
                $scope.obj.IsActive = false;
            }
            else {
                $scope.obj.IsActive = true;
            }
            //$scope.BindCity(row, "E");
        }
        else {
            $scope.obj = new machineServices.machineData(null);
            $scope.disablecode = false;
            $scope.obj.IsActive = true;
            $scope.obj.KEY = key;
        }
    };

    $scope.submitForm = function (isValid, Machinemaster) {
        // check to make sure the form is completely valid
        debugger;
        if (isValid) {
            $scope.SaveMachinemaster(Machinemaster);
            $scope.MachineForm.$setPristine();
        }
        else {
            angular.forEach($scope.MachineForm.$error.required, function (field) {
                field.$setDirty();
            });
            var MachineName = document.getElementById("MachineName");
          
            if (MachineName.value == "") {
                MachineName.focus();
            }

          
        }
    };

    $scope.SaveMachinemaster = function (Machinemaster) {
        if (Machinemaster.IsActive == true) {
            Machinemaster.IsActive = "1";

        }
        else {
            Machinemaster.IsActive = "0";
        }
       // Machinemaster.LocationBinData = $scope.obj.LocationBin;
        var request = new machineServices.Savemachinemaster(Machinemaster);
        commonService.postWebService(request.url, request.param).then(function (response) {
            debugger;

            if (response.liMachinemaster != null) {
                if (response.liMachinemaster[0].MSG == "Updated Success") {
                    $("#Message").val('Updated !! ');//Messgae
                    $('#Title').html('Machine Updated Successfully');//Title
                    $("#Message").trigger("click");
                    $scope.init();
                    $scope.obj = null;
                    $scope.MachineForm.$setPristine();
                }
                else if (response.liMachinemaster[0].MSG == "Machine Number Already Exists") {

                    $("#Message").val('Alter !! ');//Messgae
                    $('#Title').html('Machine - "' + response.liMachinemaster[0].MachineName + '" Already Exists');//Title
                    $("#Message").trigger("click");
                    $scope.obj.IsActive = true;
                }

                else {
                    $("#Message").val('Saved !! ');//Messgae
                    $('#Title').html('Machine Saved Successfully');//Title
                    $("#Message").trigger("click");
                    $scope.init();
                    $scope.obj = null;
                    $scope.MachineForm.$setPristine();
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
        $scope.obj = new machineServices.machineData(row);
        myFunctionCompany();
    }

});