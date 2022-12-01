lineApp.controller('lineCtrl', function (Excel, $timeout, $scope, $filter, lineServices, commonService, DTOptionsBuilder, DTColumnBuilder) {
    $scope.LineList = [];
    //$scope.obj.LocationBin ="";
    $scope.obj =new lineServices.lineData(null);

    $scope.$watch('obj.LineName', function (val) {
        $scope.obj.LineName = $filter('uppercase')(val);
    }, true);
   
    $scope.init = function () {
        debugger;
        commonService.postWebService('Master/BindListLine', {}).then(function (response) {
            $scope.LineList = response.liLinemaster;
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
            a.download = "LineMaster.xls";
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
                pdfMake.createPdf(docDefinition).download("LineMaster.pdf");
            }
        });
    };
    $scope.DatatableInitialize = function () {
        $scope.vm = {};
        $scope.vm.dtOptions = DTOptionsBuilder.newOptions()
		  .withOption('order', [0, 'asc'])
          //.withDisplayLength(5);
        
        
    };

    $scope.CancelLine = function () {
        $scope.IsListDivVisible = true;
        $scope.IsEditDivVisible = false;
        $scope.obj = null;
        $scope.LineForm.$setPristine();
    };


    $scope.editClick = function (row, key, IsActive) {
        debugger;
        $scope.IsEditDivVisible = true;
        $scope.IsListDivVisible = false;
        if (key == 'E') {
            $scope.obj = new lineServices.lineData(row);
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
            $scope.obj = new lineServices.lineData(null);
            $scope.disablecode = false;
            $scope.obj.IsActive = true;
            $scope.obj.KEY = key;
        }
    };

    $scope.submitForm = function (isValid, Linemaster) {
        // check to make sure the form is completely valid
        debugger;
        if (isValid) {
            $scope.SaveLinemaster(Linemaster);
            $scope.LineForm.$setPristine();
        }
        else {
            angular.forEach($scope.LineForm.$error.required, function (field) {
                field.$setDirty();
            });
            var LineName = document.getElementById("LineName");
          
            if (LineName.value == "") {
                LineName.focus();
            }

          
        }
    };

    $scope.SaveLinemaster = function (Linemaster) {
        if (Linemaster.IsActive == true) {
            Linemaster.IsActive = "1";

        }
        else {
            Linemaster.IsActive = "0";
        }
        
        var request = new lineServices.Savelinemaster(Linemaster);
        commonService.postWebService(request.url, request.param).then(function (response) {
            debugger;

            if (response.liLinemaster != null) {
                if (response.liLinemaster[0].MSG == "Updated Success") {
                    $("#Message").val('Updated !! ');//Messgae
                    $('#Title').html('WorkCenter Updated Successfully');//Title
                    $("#Message").trigger("click");
                    $scope.init();
                    $scope.obj = null;
                    $scope.LineForm.$setPristine();
                }
                else if (response.liLinemaster[0].MSG == "Line Number Already Exists") {

                    $("#Message").val('Alter !! ');//Messgae
                    $('#Title').html('Line - "' + response.liLinemaster[0].LineName + '" Already Exists');//Title
                    $("#Message").trigger("click");
                    $scope.obj.IsActive = true;
                }

                else {
                    $("#Message").val('Saved !! ');//Messgae
                    $('#Title').html('WorkCenter Saved Successfully');//Title
                    $("#Message").trigger("click");
                    $scope.init();
                    $scope.obj = null;
                    $scope.LineForm.$setPristine();
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
        $scope.obj = new lineServices.lineData(row);
        myFunctionCompany();
    }

    $scope.example14model = [];
    $scope.example14settings = {
        scrollableHeight: '200px',
        scrollable: true,
        enableSearch: true
    };
    $scope.example14data = [{
        "label": "Alabama",
        "id": "AL"
    }, {
        "label": "Alaska",
        "id": "AK"
    }, {
        "label": "American Samoa",
        "id": "AS"
    }, {
        "label": "Arizona",
        "id": "AZ"
    }, {
        "label": "Arkansas",
        "id": "AR"
    }, {
        "label": "California",
        "id": "CA"
    }, {
        "label": "Colorado",
        "id": "CO"
    }, {
        "label": "Connecticut",
        "id": "CT"
    }, {
        "label": "Delaware",
        "id": "DE"
    }, {
        "label": "District Of Columbia",
        "id": "DC"
    }, {
        "label": "Federated States Of Micronesia",
        "id": "FM"
    }, {
        "label": "Florida",
        "id": "FL"
    }, {
        "label": "Georgia",
        "id": "GA"
    }, {
        "label": "Guam",
        "id": "GU"
    }, {
        "label": "Hawaii",
        "id": "HI"
    }, {
        "label": "Idaho",
        "id": "ID"
    }, {
        "label": "Illinois",
        "id": "IL"
    }, {
        "label": "Indiana",
        "id": "IN"
    }, {
        "label": "Iowa",
        "id": "IA"
    }, {
        "label": "Kansas",
        "id": "KS"
    }, {
        "label": "Kentucky",
        "id": "KY"
    }, {
        "label": "Louisiana",
        "id": "LA"
    }, {
        "label": "Maine",
        "id": "ME"
    }, {
        "label": "Marshall Islands",
        "id": "MH"
    }, {
        "label": "Maryland",
        "id": "MD"
    }, {
        "label": "Massachusetts",
        "id": "MA"
    }, {
        "label": "Michigan",
        "id": "MI"
    }, {
        "label": "Minnesota",
        "id": "MN"
    }, {
        "label": "Mississippi",
        "id": "MS"
    }, {
        "label": "Missouri",
        "id": "MO"
    }, {
        "label": "Montana",
        "id": "MT"
    }, {
        "label": "Nebraska",
        "id": "NE"
    }, {
        "label": "Nevada",
        "id": "NV"
    }, {
        "label": "New Hampshire",
        "id": "NH"
    }, {
        "label": "New Jersey",
        "id": "NJ"
    }, {
        "label": "New Mexico",
        "id": "NM"
    }, {
        "label": "New York",
        "id": "NY"
    }, {
        "label": "North Carolina",
        "id": "NC"
    }, {
        "label": "North Dakota",
        "id": "ND"
    }, {
        "label": "Northern Mariana Islands",
        "id": "MP"
    }, {
        "label": "Ohio",
        "id": "OH"
    }, {
        "label": "Oklahoma",
        "id": "OK"
    }, {
        "label": "Oregon",
        "id": "OR"
    }, {
        "label": "Palau",
        "id": "PW"
    }, {
        "label": "Pennsylvania",
        "id": "PA"
    }, {
        "label": "Puerto Rico",
        "id": "PR"
    }, {
        "label": "Rhode Island",
        "id": "RI"
    }, {
        "label": "South Carolina",
        "id": "SC"
    }, {
        "label": "South Dakota",
        "id": "SD"
    }, {
        "label": "Tennessee",
        "id": "TN"
    }, {
        "label": "Texas",
        "id": "TX"
    }, {
        "label": "Utah",
        "id": "UT"
    }, {
        "label": "Vermont",
        "id": "VT"
    }, {
        "label": "Virgin Islands",
        "id": "VI"
    }, {
        "label": "Virginia",
        "id": "VA"
    }, {
        "label": "Washington",
        "id": "WA"
    }, {
        "label": "West Virginia",
        "id": "WV"
    }, {
        "label": "Wisconsin",
        "id": "WI"
    }, {
        "label": "Wyoming",
        "id": "WY"
    }];
    $scope.example2settings = {
        displayProp: 'id'
    };

});