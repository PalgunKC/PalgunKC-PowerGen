linemachineApp.controller('linemachineCtrl', function (Excel, $timeout, $scope, $filter, linemachineServices, commonService, DTOptionsBuilder, DTColumnBuilder) {
    $scope.LinemachineList = [];
    $scope.MachineList = [];
    $scope.LineList = [];
    $scope.machinecodeError = false;
    //$scope.obj.LocationBin ="";
    $scope.obj = new linemachineServices.linemachineData(null);

    $scope.$watch('obj.MachineName', function (val) {
        $scope.obj.MachineName = $filter('uppercase')(val);
    }, true);

    $scope.init = function () {
        debugger;
        commonService.postWebService('Master/BindListLinemachine', {}).then(function (response) {
            $scope.LinemachineList = response.ddlLineMachine;
            //$scope.MachineList = response.ddlMachine;
            $scope.LineList = response.ddlLine;
            $scope.IsListDivVisible = true;
            $scope.IsEditDivVisible = false;

            $scope.MachineList = response.ddlMachine.map(function (item) {
                return { id: item['Machinecode'], label: item['MachineName'] + ' - ' + item['Machinecode'] + ' - ' + item['MachineNumber'] };
            });
        });
        $scope.DatatableInitialize();
    };
    $scope.example13model = [];
    $scope.example13data = [
        { id: 1, label: "David" },
        { id: 2, label: "Jhon" },
        { id: 3, label: "Lisa" },
        { id: 4, label: "Nicole" },
        { id: 5, label: "Danny" }];

    $scope.exportToExcel = function (tableId) { // ex: '#my-table'
        debugger;
        var exportHref = Excel.tableToExcel(tableId, 'madasamy');
        $timeout(function () {
            var a = document.createElement('a');
            a.href = exportHref;
            a.download = "LinemachineMaster.xls";
            document.body.appendChild(a);
            a.click();
            a.remove();
        }, 100); // trigger download
    };


    $scope.example13model = [];
    $scope.example13data = [
        { id: 1, label: "David" },
        { id: 2, label: "Jhon" },
        { id: 3, label: "Lisa" },
        { id: 4, label: "Nicole" },
        { id: 5, label: "Danny" }];

    $scope.example14settings = {
        scrollableHeight: '200px',
        scrollable: true,
        enableSearch: true
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
                pdfMake.createPdf(docDefinition).download("LinemachineMaster.pdf");
            }
        });
    };
    $scope.DatatableInitialize = function () {
        $scope.vm = {};
        $scope.vm.dtOptions = DTOptionsBuilder.newOptions()
		  .withOption('order', [0, 'asc']);;
    };

    $scope.CancelLinemachine = function () {
        $scope.IsListDivVisible = true;
        $scope.IsEditDivVisible = false;
        // $scope.obj = null;
        //$scope.obj = null;
        ////$scope.obj.LineMachine_Line_Code = "";
        //$scope.LinemachineForm.$setPristine();
        $scope.init();
        $scope.obj = null;
        $scope.LinemachineForm.$setPristine();
    };


    $scope.editClick = function (row, key, IsActive) {
        debugger;
        $scope.IsEditDivVisible = true;
        $scope.IsListDivVisible = false;
        $scope.machinecodeError = false;
        if (key == 'E') {
            $scope.obj = new linemachineServices.linemachineData(row);
            $scope.obj.KEY = key;
            if (row.IsActive == 'N') {
                $scope.obj.IsActive = false;
            }
            else {
                $scope.obj.IsActive = true;
            }
            $scope.getLineDetails(row);
        }
        else {
            $scope.obj = new linemachineServices.linemachineData(null);
            $scope.obj.LineMachine_Line_Code = "";
            $scope.disablecode = false;
            $scope.obj.IsActive = true;
            $scope.obj.KEY = key;
           
        }
    };

    $scope.CheckMachineAlreadyExists = {
        onItemSelect: function (item) {
            //var Quantity = 0;
            //console.log(item);

            angular.forEach($scope.LinemachineList, function (value, key) {
                if (value.M_Code == item.id && value.LineMachine_Line_Code != $scope.obj.LineMachine_Line_Code) {
                    // $scope.Quantity = $scope.Quantity + parseFloat(value.Quantity)

                    //$scope.getLineDetails($scope.obj);
                    //angular.forEach($scope.obj.Machinecode, function (value, key) {

                    //});

                    for (j = 0; j < $scope.obj.Machinecode.length; j++) {
                        var a = $scope.obj.Machinecode[j].id.indexOf(item.id);
                        if (a > -1) {
                            $scope.obj.Machinecode.splice(j, 1);
                            // return false;
                        }
                    }
                    console.log('exits');
                    $("#Message").val('Alter !! ');//Messgae
                    $('#Title').html('Machine - "' + value.M_Code + '" Already Exists in Line ' + value.LineMachine_Line_Code);//Title
                    $("#Message").trigger("click");
                }
            });
            
        }//,
        //onItemDeselect: function (item) {
        //    //var Quantity = 0;
        //    //console.log(item);

        //    angular.forEach($scope.ToolUploadList, function (value, key) {
        //        if (value.VendorCode == item.id && value.PartNumber == $scope.obj.ToolIsu_Partno) {
        //            $scope.Quantity = $scope.Quantity - parseFloat(value.Quantity)

        //        }
        //    });
        //    console.log($scope.Quantity);
        //    if ($scope.Quantity < $scope.obj.ToolReq_Qty) {
        //        $scope.ChkErr = true;
        //        console.log($scope.ChkErr);
        //    }
        //    else {
        //        $scope.ChkErr = false;
        //    }
        //}

    };

    $scope.getLineDetails = function (row) {
        debugger;
        var request = new linemachineServices.getLineDetails(row);
        commonService.postWebService(request.url, request.param).then(function (response) {
            debugger;
            if (response.ddlLineMachine != null) {
                if (response.ddlLineMachine.length > 0) {
                    var names = response.ddlLineMachine.map(function (item) {
                        return item['LineMachine_Machine_Code'];
                    });
                    var names1 = response.ddlLineMachine.map(function (item) {
                        return { id: item['LineMachine_Machine_Code'], label: item['LineMachine_Machine_Code'] };
                    });
                    response.ddlLineMachine[0].Machinecode = names1;
                    $scope.obj = response.ddlLineMachine[0];
                    if (response.ddlLineMachine[0].IsActive == 'N') {
                        $scope.obj.IsActive = false;
                    }
                    else {
                        $scope.obj.IsActive = true;
                    }
                }
                else {
                    $scope.obj.Machinecode = [];
                }
            }
            else {
                // response.ddlLineMachine[0].Machinecode = { id: '' };
                $scope.obj.Machinecode = [];
            }
            //$scope.obj = response.ddlLineMachine[0];
          

        });

        //commonService.postWebService('Master/GetLineDetails', {}).then(function (response) {

        //    $scope.obj = response.ddlLineDetails;


        //});
    };
    $scope.submitForm = function (isValid, Linemachinemaster) {
        // check to make sure the form is completely valid
        debugger;
        if (isValid) {
            if (Linemachinemaster.Machinecode.length === 0) {
                $scope.machinecodeError = true;
                return false;
            }
            $scope.machinecodeError = false;
            Linemachinemaster.Machinecode = Linemachinemaster.Machinecode.map(function (machine) {
                return machine['id']
            })
            $scope.SaveLinemachinemaster(Linemachinemaster);
            $scope.LinemachineForm.$setPristine();
            $scope.CancelLinemachine();
        }
        else {
            angular.forEach($scope.LinemachineForm.$error.required, function (field) {
                field.$setDirty();
            });
            var LinemachineName = document.getElementById("LinemachineName");

            if (LinemachineName.value == "") {
                LinemachineName.focus();
            }


        }
    };

    $scope.SaveLinemachinemaster = function (Linemachinemaster) {
        if (Linemachinemaster.IsActive == true) {
            Linemachinemaster.IsActive = "1";

        }
        else {
            Linemachinemaster.IsActive = "0";
        }
        Linemachinemaster.LocationBinData = $scope.obj.LocationBin;
        var request = new linemachineServices.Savelinemachinemaster(Linemachinemaster);
        commonService.postWebService(request.url, request.param).then(function (response) {
            debugger;

            if (response.liLinemachinemaster != null) {
                if (response.liLinemachinemaster[0].MSG == "Updated Success") {
                    $("#Message").val('Updated !! ');//Messgae
                    $('#Title').html('Machine Maapping Updated Successfully');//Title
                    $("#Message").trigger("click");
                    $scope.init();
                    $scope.obj = null;
                    $scope.LinemachineForm.$setPristine();
                }
                else if (response.liLinemachinemaster[0].MSG == "Location Already Exists") {

                    $("#Message").val('Alter !! ');//Messgae
                    $('#Title').html('Location - "' + response.liLinemachinemaster[0].LocationName + '" Already Exists');//Title
                    $("#Message").trigger("click");
                    $scope.obj.IsActive = true;
                }

                else {
                    $("#Message").val('Saved !! ');//Messgae
                    $('#Title').html('Machine Maapping Saved Successfully');//Title
                    $scope.init();
                    $scope.obj = null;
                    $scope.LinemachineForm.$setPristine();  
                    $("#Message").trigger("click");
                   
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
        $scope.obj = new linemachineServices.linemachineData(row);
        myFunctionCompany();
    }

});