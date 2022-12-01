ToolingissueApp.controller('ToolingissueCtrl', function (Excel, $timeout, $scope, $filter, ToolingissueServices, commonService, DTOptionsBuilder, DTColumnBuilder) {
    $scope.disableTabCtrl = true;
    $scope.PartMasterList = [];
    $scope.ToolVendorList = [];
    $scope.ToolingRequestList = [];
    $scope.ToolLocationList = [];
    $scope.ToolUploadList = [];
    $scope.FullToolUploadList = [];
    $scope.filterToolUploadList = [];
    $scope.ToolingIssueList = [];
    $scope.filterToolVendorList = [];
    $scope.filterToolLocationList = [];
    $scope.machinecodeError = false;
    $scope.MachineListMaster = [];
    $scope.ToolingRegrainList = []
    $scope.ScrabList = []
    $scope.Quantity = 0;
    $scope.ChkErr = false;
    // $scope.ChkCancle = false;
    $scope.ChkRemark = false;
    $scope.ChkReson = false;
    keyname = 'Tool_Location';
    keys = [];
    $scope.IsRequired = false;
    $scope.UnicodeSelected = []
    $scope.qutChk = 0;
    $scope.IsVendorSelect = false;
    $scope.ShowIssueCtrl = true;
    $scope.ShowVendorCtrl = true;


    $scope.RequestReason_Flag = false;
    $scope.Request_Flag = false;
    $scope.ShiftMaster_Flag = false;
    $scope.LineMaster_Flag = false;
    $scope.MachineMaster_Flag = false;
    $scope.Upload_Flag = false;
    $scope.FullUpload_Flag = false;

    $scope.Part_Flag = false;
    $scope.Issue_Flag = false;
    $scope.Regrain_Flag = false;
    $scope.Vendor_Flag = false;
    $scope.Scarb_Flag = false;

    $scope.obj = new ToolingissueServices.ToolingissueData(null);
    $scope.init = function () {
        debugger;

        $scope.IsListDivVisible = true;
        $scope.IsEditDivVisible = false;
        commonService.postWebService('Tool/BindListToolingIssue', { 'P_KEY': 'G', 'dummy_col1': 'Request' }).then(function (response) {

            $scope.ToolingRequestList = response.ddToolingRequest;
           
            $scope.Request_Flag = true;
            
        });
        commonService.postWebService('Tool/BindListToolingIssue', { 'P_KEY': 'L', 'dummy_col1': 'Issue' }).then(function (response) {
            $scope.ToolingIssueList = response.ddlToolingIssue;
           
            $scope.Issue_Flag = true;
           
        });
        commonService.postWebService('Tool/BindListToolingIssue', { 'P_KEY': 'G', 'dummy_col1': 'Regrain' }).then(function (response) {

            $scope.ToolingRegrainList = response.ddlToolingRegrain;
            $scope.Regrain_Flag = true;
            
        });
        commonService.postWebService('Tool/BindListToolingIssue', { 'P_KEY': 'G', 'dummy_col1': 'Upload' }).then(function (response) {

            $scope.ToolUploadList = response.ddlToolUpload;
           
            $scope.Upload_Flag = true;
            
        });
        commonService.postWebService('Tool/BindListToolingIssue', { 'P_KEY': 'L', 'dummy_col1': 'Upload' }).then(function (response) {

            $scope.FullToolUploadList = response.ddlToolUploadList;
            $scope.FullUpload_Flag = true;
          
        });
        //commonService.postWebService('Tool/BindListToolingIssue', { 'P_KEY': 'G', 'dummy_col1': 'Part' }).then(function (response) {

        //    $scope.PartMasterList = response.ddlPartmaster;
        //});
        commonService.postWebService('Tool/BindListToolingIssue', { 'P_KEY': 'L', 'dummy_col1': 'Vendor' }).then(function (response) {

            $scope.ToolVendorList = response.ddlVendormaster;
           
            $scope.Vendor_Flag = true;
           
        });
        commonService.postWebService('Tool/BindListToolingIssue', { 'P_KEY': 'L', 'dummy_col1': 'Machine' }).then(function (response) {

            $scope.MachineListMaster = response.ddlMachine;
            
            $scope.MachineMaster_Flag = true;
           
        });
        commonService.postWebService('Tool/BindListToolingIssue', { 'P_KEY': 'L', 'dummy_col1': 'Scrab' }).then(function (response) {
           
            $scope.ScrabList = response.ddlScrab;
            angular.forEach($scope.ToolingRequestList, function (value, key) {
                value.Quantity = parseFloat(value.Quantity);
                // value.Tool_Lcation=
                angular.forEach($scope.ToolUploadList, function (value1, key) {
                    if (value1.PartNumber == value.ToolReq_Partno) {
                        value.Tool_Location = value1.Tool_Location;
                    }

                });
                angular.forEach($scope.MachineListMaster, function (value2, key) {
                    if (value2.Machinecode == value.ToolReq_MachineCode) {
                        value.ToolReq_Machinename = value2.MachineName;
                    }

                });
            });

       
            $scope.Scarb_Flag = true;
           
        });
        $scope.DatatableInitialize();
    };

    var intervalId = window.setInterval(
        $scope.ShowTab = function () {
            if ($scope.Request_Flag === false || $scope.Issue_Flag === false || $scope.Regrain_Flag === false || $scope.Upload_Flag === false || $scope.FullUpload_Flag === false || $scope.Vendor_Flag === false || $scope.MachineMaster_Flag === false || $scope.Scarb_Flag === false) {
                $scope.disableTabCtrl = true;
            }
            else
            {
                $scope.disableTabCtrl = false;
                $timeout(function() {
                    angular.element('#fakeButton').triggerHandler('click');
                });
                clearInterval(intervalId);
            }
        }
 , 500)

    $scope.GetExcelData = function () {
        commonService.postWebService('Tool/GetExcelToolPartIssueData', { 'P_KEY': 'EXCEL', 'dummycolumn1': 'Part' }).then(function (response) {

            $scope.DownloadTab(response);
        });
    }
    $scope.DownloadTab = function (response) {
        window.location = '/Tool/Download?ID=' + response.ID + '&Name=' + response.FileName;
    };

    $scope.filterPartMasterList = function (ToolUploadList) {
        return (ToolUploadList.IsActive === 'Y');
    }

    $scope.filterToolingRequestList = function (ToolingRequestList) {
        return (ToolingRequestList.IsActive === 'Y');
    }

    $scope.DatatableInitialize = function () {
        $scope.vm = {};
        $scope.vm.dtOptions = DTOptionsBuilder.newOptions()
		  .withOption('order', [0, 'asc']);;
    };
    $scope.exportToExcel = function (tableId) { // ex: '#my-table'
        debugger;
        var exportHref = Excel.tableToExcel(tableId, 'madasamy');
        $timeout(function () {
            var a = document.createElement('a');
            a.href = exportHref;
            a.download = "ToolInward.xls";
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
                pdfMake.createPdf(docDefinition).download("ToolInward.pdf");
            }
        });
    };

    $scope.CancelToolingIssue = function () {
        $scope.filterToolLocationList = [];
        $scope.filterToolVendorList = [];
        $scope.unicodeToolLocationList = [];
        $scope.filterUnicodeSelected = [];
        $scope.filterToolUnicodeList = [];
        $scope.UnicodeSelected = [];

        $scope.IsListDivVisible = true;
        $scope.IsEditDivVisible = false;
        $scope.obj = null;
        $scope.ToolIssueForm.$setPristine();
    };

    $scope.Machinesettings = {
        scrollableHeight: '200px',
        scrollable: true,
        enableSearch: true,
        dynamicTitle: true,
        //smartButtonMaxItems: 1,
        //selectionLimit: 1,
        showCheckAll: false,
        showUncheckAll: false,
        //closeOnSelect: true,
        Width: true,
        dropdownWidth: '100%',
        onDeselectAll: function () {
            console.log("deselect-all-nonreq");
        }
        //    ,
        //    events: {
        //    onItemSelect: function (item) {
        //        console.log('selected: '+item);
        //    }
        //}
    };
    $scope.BindPreviousUnicode = {
       
        onItemSelect: function (item) {
             $scope.ShowIssueCtrl = true;
            $scope.IsRequired = false;
            var ii = 0;
            $scope.filterToolLocationList = [];
            $scope.filterToolVendorList = [];
            $scope.unicodeToolLocationList = [];
            $scope.obj.ToolIsu_Location = [];

            $scope.filterUnicodeSelected = [];
            $scope.obj.ToolIsu_VendorCode_list = [];

            //row.ToolIsu_Location =''
            keys = [];
            Locationkeys = [];
            Unicodekeys = [];
            UploadIdkeyname="ToolUploadId"
            $scope.IsMetQty=false;


            $scope.UnicodeSelected.push({ id: item.id })

            if ($scope.obj.ToolIsu_PreUnicode.length > 0 ) {
                $("#Message").val('Alter !! ');//Messgae
                $('#Title').html("Sorry! If you selected Regrain part, Yoc can't select multi part");//Title
                $scope.obj.ToolIsu_CurUnicode = [];
                $scope.obj.ToolIsu_PreUnicode = "";
                $scope.obj.ToolIsu_NoOfUnderWent_Regriding = "";
                $scope.obj.ToolIsu_Partno = "";
                $scope.UnicodeSelected = [];
                $scope.filterToolLocationList = [];
                $scope.filterToolVendorList = [];
                $scope.unicodeToolLocationList = [];
                $scope.filterUnicodeSelected = [];
                $("#Message").trigger("click");

            }

          
            angular.forEach($scope.FullToolUploadList, function (items) {
                angular.forEach($scope.UnicodeSelected, function (unicode) {
                   // var key = items[keyname];
                    var key = items[UploadIdkeyname];
                    if (keys.indexOf(key) === -1) {

                        if (items['ToolUniqueCode'] == unicode.id&& parseFloat(items['Quantity']) > 0 && items['PartId'] == $scope.PartId) {
                            //$scope.qutChk =  $scope.qutChk + parseFloat(items['Quantity']);
                            //if ($scope.qutChk >= parseFloat($scope.obj.ToolReq_Qty)) {
                            //    $scope.IsMetQty=true
                            //}
                           // if (!$scope.IsMetQty) {
                            keys.push(key);
                            $scope.unicodeToolLocationList.push({ id: items.Tool_Location, label: items.Tool_Location, unicode: item.id })
                        //}
                            //row.ToolIsu_Partno = item['PartNumber'];

                            if (items['ToolUniqueCode'] == unicode.id && items['ToolUniqueCode'] == item.id && parseFloat(items['Quantity']) > 0 && items['PartId'] == $scope.PartId) {
                                $scope.qutChk = $scope.qutChk + parseFloat(items['Quantity']);
                                $scope.obj.ToolIsu_Partno = items['PartNumber']

                                if ($scope.qutChk >= parseFloat($scope.obj.ToolReq_Qty)) {
                                    $scope.IsMetQty = true
                                    //alert('MET QTY-' + $scope.qutChk);
                                }
                                else {
                                    $scope.IsMetQty = false
                                    //alert('Not MET QTY-' + $scope.qutChk);
                                }
                                }
                        }
                    }
                });
            });
            angular.forEach($scope.unicodeToolLocationList, function (items) {
                var key = items['id'];
                if (Locationkeys.indexOf(key) === -1) {

                    Locationkeys.push(key);
                    $scope.filterToolLocationList.push({ id: items.id, label: items.label, unicode: items.unicode })
                    //row.ToolIsu_Partno = item['PartNumber'];

                }
            });
            angular.forEach($scope.UnicodeSelected, function (items) {
                var key = items['id'];
                if (Unicodekeys.indexOf(key) === -1) {

                    Unicodekeys.push(key);
                    $scope.filterUnicodeSelected.push({ id: items.id, label: items.label })
                    //row.ToolIsu_Partno = item['PartNumber'];

                }
            });
            //for (i = 0; i < $scope.FullToolUploadList.length; i++) {
            //    var key = items[keyname];
            //        if (keys.indexOf(key) === -1) {

            //            if (items['ToolUniqueCode'] == item.id && parseFloat(items['Quantity']) > 0 && items['PartId'] == $scope.PartId) {
            //                keys.push(key);
            //                $scope.filterToolLocationList.push({ id: items.Tool_Location, label: items.Tool_Location })
            //                //row.ToolIsu_Partno = item['PartNumber'];
            //            }
            //        }
            //}
           
            for (i = 0; i < $scope.ToolingRegrainList.length; i++) {
                if (ii != 1) {
                   

                    if ($scope.ToolingRegrainList[i].ToolRts_Unicode) {
                        if ($scope.ToolingRegrainList[i].ToolRts_Unicode == item.id
                                && $scope.ToolingRegrainList[i].ToolReg_RegrainPartNo == $scope.obj.ToolIsu_Partno
                                ) {
                            //alert($scope.ToolingRegrainList[i].Previous_UniCode);
                           
                            angular.forEach($scope.filterUnicodeSelected, function (unicode) {
                            if ( $scope.ToolingRegrainList[i].ToolRts_Unicode != unicode.id) {
                                $("#Message").val('Alter !! ');//Messgae
                                $('#Title').html("Sorry! If you selected Regrain part, Yoc can't select multi part");//Title
                                $scope.obj.ToolIsu_CurUnicode = [];
                                $scope.obj.ToolIsu_PreUnicode = "";
                                $scope.obj.ToolIsu_NoOfUnderWent_Regriding = "";
                                $scope.obj.ToolIsu_Partno = "";
                                $scope.UnicodeSelected = [];
                                $scope.filterToolLocationList = [];
                                $scope.filterToolVendorList = [];
                                $scope.unicodeToolLocationList = [];
                                $scope.filterUnicodeSelected = [];
                                $("#Message").trigger("click");
                               

                            }
                                });
                            $scope.obj.ToolIsu_PreUnicode = $scope.ToolingRegrainList[i].Previous_UniCode;
                            $scope.obj.ToolIsu_NoOfUnderWent_Regriding = $scope.obj.ToolIsu_PreUnicode.substr($scope.obj.ToolIsu_PreUnicode.indexOf('- RE') + 4);

                            //$scope.obj.ToolIsu_PreUnicode = $scope.obj.ToolIsu_PreUnicode + ',' + $scope.ToolingRegrainList[i].Previous_UniCode;

                            ii = 1
                        }
                        else {
                            $scope.obj.ToolIsu_PreUnicode = "";
                            $scope.obj.ToolIsu_NoOfUnderWent_Regriding = "";
                        }
                       
                    }
                    else {
                        $scope.obj.ToolIsu_PreUnicode = "";
                        $scope.obj.ToolIsu_NoOfUnderWent_Regriding = "";
                    }
                }
            }
            

        },
        onItemDeselect: function (item) {
            var vendorcode;
            $scope.obj.ToolIsu_Location = [];
            $scope.obj.ToolIsu_VendorCode_list = [];
            $scope.Quantity = 0;
            $scope.filterToolLocationList = [];
            $scope.unicodeToolLocationList = [];
            $scope.filterToolVendorList = [];
            keys = [];
            Unicodekeys = [];

            var ii = 0;

            //for (k = 0; k < $scope.filterToolUploadList.length; k++) {
            //    if (item.id == $scope.filterToolUploadList[k].Tool_Location) {
            //        vendorcode = $scope.filterToolUploadList[k].VendorCode;

            //        for (j = 0; j < $scope.filterToolVendorList.length; j++) {
            //            var a = $scope.filterToolVendorList[j].id.indexOf(vendorcode);
            //            if (a > -1) {
            //                $scope.filterToolVendorList.splice(j, 1);
            //                // return false;
            //            }
            //        }
            //    }
            //}
            angular.forEach($scope.FullToolUploadList, function (items) {
                //angular.forEach($scope.filterUnicodeSelected, function (unicode) {
                //    var key = items[keyname];
                //    if (keys.indexOf(key) === -1) {

                //        if (items['ToolUniqueCode'] == unicode.id && parseFloat(items['Quantity']) > 0 && items['PartId'] == $scope.PartId) {
                //            keys.push(key);
                //            $scope.unicodeToolLocationList.push({ id: items.Tool_Location, label: unicode.id })
                //            //row.ToolIsu_Partno = item['PartNumber'];
                //        }
                //    }
                //});
                for (j = 0; j < $scope.filterUnicodeSelected.length; j++) {
                    var key = items[keyname];
                    if (items['ToolUniqueCode'] == $scope.filterUnicodeSelected[j].id && parseFloat(items['Quantity']) > 0 && items['PartId'] == $scope.PartId) {
                        keys.push(key);
                        $scope.unicodeToolLocationList.push({ id: items.Tool_Location, label: items.Tool_Location, unicode: $scope.filterUnicodeSelected[j].id })
                        if (items['ToolUniqueCode'] == item.id) {
                            $scope.obj.ToolIsu_Partno = "";
                            $scope.obj.ToolIsu_PreUnicode = "";
                            $scope.obj.ToolIsu_NoOfUnderWent_Regriding = "";
                        $scope.filterUnicodeSelected.splice(j, 1);
                            }
                        //row.ToolIsu_Partno = item['PartNumber'];
                    }

                }
            });
            angular.forEach($scope.FullToolUploadList, function (items) {
                //angular.forEach($scope.UnicodeSelected, function (unicode) {

                if (items['ToolUniqueCode'] == item.id && parseFloat(items['Quantity']) > 0 && items['PartId'] == $scope.PartId) {
                    //$scope.unicodeToolLocationList.push({ id: items.Tool_Location, label: items.Tool_Location })
                    //row.ToolIsu_Partno = item['PartNumber'];

                    for (j = 0; j < $scope.unicodeToolLocationList.length; j++) {
                        if (ii != 1) {

                            var a = $scope.unicodeToolLocationList[j].id.indexOf(items.Tool_Location);
                            var b = $scope.unicodeToolLocationList[j].unicode.indexOf(item.id);

                            if (a > -1 && b > -1) {
                                $scope.unicodeToolLocationList.splice(j, 1);
                                ii = 1
                            }
                        }
                    }

                    if ( items['ToolUniqueCode'] == item.id && parseFloat(items['Quantity']) > 0 && items['PartId'] == $scope.PartId) {
                        $scope.qutChk = $scope.qutChk - parseFloat(items['Quantity']);
                        if ($scope.qutChk >= parseFloat($scope.obj.ToolReq_Qty)) {
                            $scope.IsMetQty = true
                            //alert('MET QTY-' + $scope.qutChk);
                        }
                        else {
                            $scope.IsMetQty = false
                            //alert('Not MET QTY-' + $scope.qutChk);
                        }
                    }
                }

                //});
            });

            angular.forEach($scope.unicodeToolLocationList, function (items) {
                var key = items['id'];
                if (Unicodekeys.indexOf(key) === -1) {

                    Unicodekeys.push(key);
                    $scope.filterToolLocationList.push({ id: items.id, label: items.label, unicode: items.unicode })
                    //row.ToolIsu_Partno = item['PartNumber'];

                }
            });
            $scope.UnicodeSelected = [];
            for (j = 0; j < $scope.filterUnicodeSelected.length; j++) {
                //var key = items[keyname];
                //if (items['ToolUniqueCode'] == $scope.filterUnicodeSelected[j].id && parseFloat(items['Quantity']) > 0 && items['PartId'] == $scope.PartId) {
                //    keys.push(key);
                //    $scope.unicodeToolLocationList.push({ id: items.Tool_Location, label: items.Tool_Location, unicode: $scope.filterUnicodeSelected[j].id })
                //    if (items['ToolUniqueCode'] == item.id) {
                //        $scope.filterUnicodeSelected.splice(j, 1);
                //    }
                //    //row.ToolIsu_Partno = item['PartNumber'];
                //}
                $scope.UnicodeSelected.push({ id: $scope.filterUnicodeSelected[j].id })
            }
            


        }

    };

    $scope.editClick = function (row, key, IsActive) {
        debugger;
        $scope.ShowIssueCtrl = false;
        $scope.ShowVendorCtrl = false;
        $scope.disableCtrl = false;
        $scope.IsEditDivVisible = true;
        $scope.IsListDivVisible = false;
        $scope.filterToolVendorList = [];
        $scope.filterToolLocationList = [];
        $scope.filterToolUnicodeList = [];
        Locationkeys = [];

        $scope.IsRequired = false;
        keys = [];
        if (key == 'E') {

            $scope.PartNo = row.ToolReq_Partno;
            $scope.PartId = row.PartId;

            //for (k = 0; k < $scope.ToolUploadList.length; k++) {
            //    var a = $scope.ToolUploadList[k].PartNumber.indexOf($scope.PartNo);
            //    if (a > -1) {

            //        $scope.filterToolVendorList.push({ id: $scope.ToolUploadList[k].VendorCode, label: $scope.ToolUploadList[k].VendorName + ' - ' + $scope.ToolUploadList[k].VendorCode + ' - (' + $scope.ToolUploadList[k].Quantity + ')' });

            //    }
            //}

            //----------------15/12/2020 for get location and vendor according to unicode
            //$scope.filterToolUploadList = $scope.ToolUploadList.filter(function (ToolUploadList) {
            //    return (ToolUploadList.PartNumber === $scope.PartNo);
            //});

            $scope.filterToolUploadList = $scope.FullToolUploadList.filter(function (ToolUploadList) {
                //return (ToolUploadList.PartNumber === $scope.PartNo);
                return (ToolUploadList.PartId === $scope.PartId);
            });

            $scope.obj = new ToolingissueServices.ToolingissueData(row);
            $scope.obj.KEY = key;

            $scope.obj.ToolIsu_Req_Employeename = row.ToolReq_Employeename;
            $scope.obj.ToolIsu_Req_Employeeno = row.ToolReq_Employeeno;
            $scope.obj.ToolIsu_Linename = row.ToolReq_Linename;
            $scope.obj.ToolIsu_MachineCode = row.ToolReq_MachineCode;
            $scope.obj.ToolIsu_MachineName = row.ToolReq_Machinename;
            //$scope.obj.ToolIsu_Partname = row.ToolReq_Partname;
            $scope.obj.ToolIsu_Partno = row.ToolReq_Partno;
            $scope.obj.ToolReq_Qty = row.ToolReq_Qty;
            $scope.obj.ToolReq_id = row.ToolReq_id;
            $scope.obj.ToolIsu_Request_no = row.ToolReq_no;
            $scope.obj.ToolIsu_datetime = row.ToolReq_datetime;
            $scope.obj.ToolIsu_shift = row.ToolReq_shift

            $scope.obj.ToolIsu_PreUnicode = row.ToolReq_uniquecode;
            $scope.obj.Request_Reason = row.ReasonDetails;
            $scope.obj.Tool_Status = "";
            //angular.forEach($scope.PartMasterList, function (value, key) {
            //    if (value.PartNumber == row.ToolReq_Partno) {
            $scope.obj.ToolIsu_AvailableQty = row.TotalProductCount;
            $scope.obj.ToolIsu_MinQty = row.Min_qty;
            $scope.obj.ToolIsu_MaxQty = row.Max_qty;
            $scope.obj.ToolIsu_ReorderQty = row.Reorder_qty;
            $scope.obj.ToolIsu_LifeSpan = row.LifeTime;
            $scope.obj.Tooltype = row.IsReusable;
            $scope.obj.ToolIsu_Partname = row.PartName;
            $scope.obj.PartSpecification = row.PartSpecification;

            if (row.IsReusable == 'Y') {
                $scope.IsRequired = true;
                $scope.disableCtrl = false;
                $scope.ShowIssueCtrl = false;
            }
            else {
                $scope.disableCtrl = true;
                $scope.ShowIssueCtrl = true;

            }
            //    }

            //});

            //angular.forEach($scope.ToolLocationList, function (value, key) {
            //    if (value.PartNumber == row.ToolReq_Partno) {
            //        $scope.obj.ToolIsu_Location = value.Tool_Location;


            //    }

            //});

            //angular.forEach($scope.filterToolUploadList, function (item) {
            //    // we check to see whether our object exists
            //    var key = item[keyname];
            //    // if it's not already part of our keys array
            //    if (keys.indexOf(key) === -1) {
            //        // add it to our keys array
            //        if (item['ToolUniqueCode'] !="")
            //            {
            //            keys.push(key);
            //        }
            //        // push this item to our final output array
            //        //output.push(item);
            //        if (item['ToolUniqueCode'] == row.ToolReq_uniquecode &&   parseFloat(item['Quantity']) > 0)
            //        $scope.filterToolLocationList.push({ id: item.Tool_Location, label: item.Tool_Location })
            //    }
            //});
            keys = [];
            UniCodekeyname = 'ToolUniqueCode';
            angular.forEach($scope.FullToolUploadList, function (item) {

                var ii = 0;
                //if (item.PartNumber === $scope.PartNo) {
                if (item.PartId === $scope.PartId) {
                    var key = item[UniCodekeyname];
                    if (key) {
                        if (keys.indexOf(key) === -1) {
                            if (!$scope.ScrabList) {
                                if (parseFloat(item['Quantity']) > 0) {
                                    if (ii == 0) {
                                        keys.push(key);
                                        //$scope.filterToolUnicodeList.push(item)
                                        $scope.filterToolUnicodeList.push({ id: item.ToolUniqueCode, label: item.ToolUniqueCode })

                                        ii = 1;
                                    }

                                }
                            }
                            else {
                                for (i = 0; i <= $scope.ScrabList.length - 1; i++) {
                                    ////if ($scope.ScrabList[i].UniCode) {
                                    //if ($scope.ScrabList[i].UniCode != key && $scope.ScrabList[i].PartNumber != item['PartNumber'] && parseFloat(item['Quantity']) > 0) {
                                    //    if (ii == 0) {
                                    //        keys.push(key);
                                    //        $scope.filterToolUnicodeList.push(item)
                                    //        ii = 1;
                                    //    }

                                    //}
                                    ////}
                                    if ($scope.ScrabList[i].PartNumber != item['PartNumber'] && parseFloat(item['Quantity']) > 0) {
                                        if (ii == 0) {
                                            keys.push(key);
                                            //$scope.filterToolUnicodeList.push(item)
                                            $scope.filterToolUnicodeList.push({ id: item.ToolUniqueCode, label: item.ToolUniqueCode })
                                            ii = 1;
                                        }
                                    } else {
                                        if ($scope.ScrabList[i].UniCode != key && parseFloat(item['Quantity']) > 0) {
                                            if (ii == 0) {
                                                keys.push(key);
                                                //$scope.filterToolUnicodeList.push(item)
                                                $scope.filterToolUnicodeList.push({ id: item.ToolUniqueCode, label: item.ToolUniqueCode })
                                                ii = 1;
                                            }
                                        }
                                    }
                                }
                            }
                            //});
                        }
                    }
                }

            });



            angular.forEach($scope.filterToolUploadList, function (value, key) {
                if (value.PartNumber == row.ToolReq_Partno && parseFloat(value.Quantity) > 0) {
                    //$scope.obj.ToolIsu_Location = value.Tool_Location;

                    var key = value['Tool_Location'];
                    if (Locationkeys.indexOf(key) === -1) {

                        Locationkeys.push(key);
                        $scope.filterToolLocationList.push({ id: value.Tool_Location, label: value.Tool_Location })
                        //row.ToolIsu_Partno = item['PartNumber'];

                    }
                    //$scope.filterToolLocationList.push({ id: value.Tool_Location, label: value.Tool_Location })
                    //$scope.filterToolVendorList.push({ id: $scope.ToolUploadList[k].VendorCode, label: $scope.ToolUploadList[k].VendorName + ' - ' + $scope.ToolUploadList[k].VendorCode + ' - (' + $scope.ToolUploadList[k].Quantity + ')' });

                }

            });
            if (row.IsActive == 'N') {
                $scope.obj.IsActive = false;
            }
            else {
                $scope.obj.IsActive = true;
            }
            // $scope.BindCity(row, "E");
        }
        else {
            $scope.obj = new ToolingissueServices.ToolingissueData(null);
            $scope.disablecode = false;
            $scope.obj.IsActive = true;
            $scope.obj.KEY = key;
        }
    };
    //$scope.BindPartName = function (row) {
    //    debugger;
    //    $scope.obj.Quantity = ''
    //    angular.forEach($scope.PartMasterList, function (value, key) {
    //        if (value.PartNumber == row.PartNumber) { row.PartName = value.PartName };
    //        //if (value.PartNumber == row.PartNumber) { row.Tooltype = value.IsReusable };
    //        //if (value.PartNumber == row.PartNumber) { row.UOM = value.UOM };
    //        //if (value.PartNumber == row.PartNumber) { $scope.Min = value.Min_qty };
    //        //if (value.PartNumber == row.PartNumber) { $scope.Max = value.Max_qty };

    //    });
    //}
    //$scope.BindVendorName = function (row) {
    //    debugger;
    //    angular.forEach($scope.ToolVendorList, function (value, key) {
    //        if (value.VendorCode == row.VendorCode) { row.VendorName = value.VendorName };
    //    });
    //}
    $scope.submitForm = function (isValid, Toolingissue) {
        // check to make sure the form is completely valid
        debugger;
        if (!isValid) {

            for (i = 0; i <= ($scope.ToolIssueForm.$error.required.length) - 1 ; i++) {
                if ($scope.ToolIssueForm.$error.required[i].$$attr.id == 'Tool_Status') {
                    isValid = false;
                }
                if (Toolingissue.Tool_Status == 'I') {
                    if ($scope.ToolIssueForm.$error.required[i].$$attr.id == 'ToolIsu_Remarks') {
                        isValid = true;
                    }
                }
            }

        }
        if ($scope.IsRequired && Toolingissue.Tool_Status == 'I') {
            isValid = false;
        }



        if (isValid) {
            if (Toolingissue.Tool_Status == 'I') {
                //if ($scope.ChkErr) {

                //    return false;
                //}
               
                if ($scope.Quantity > parseFloat($scope.obj.ToolReq_Qty) && $scope.obj.Tooltype == 'Y') {
                    //$("#Message").val('Selected Quantity is Greater than requested Quantity !! ');//Messgae
                    $("#Message").val('Failed !! ');//Messgae
                    $('#Title').html('Selected Quantity is Greater than requested Quantity !!');//Title
                    $("#Message").trigger("click");
                }
                if ($scope.Quantity < parseFloat($scope.obj.ToolReq_Qty)) {
                    //$("#Message").val('Selected Quantity is Lesser than requested Quantity !! ');//Messgae
                    $("#Message").val('Failed !! ');//Messgae
                    $('#Title').html('Selected Quantity is Lesser than requested Quantity !! ');//Title
                    $("#Message").trigger("click");

                }
                
            }
            if (Toolingissue.Tool_Status == 'I') {

                if (Toolingissue.Issued_Emp_Number != null) {
                    if (Toolingissue.Issued_Emp_Number.length == "") {
                        $scope.EmpnumberError = true;
                        return false;
                    }
                }
                else {
                    $scope.EmpnumberError = true;
                    return false;
                }

                if (Toolingissue.Issued_Emp_Name != null) {
                    if (Toolingissue.Issued_Emp_Name.length == "") {
                        $scope.EmpnameError = true;
                        return false;
                    }
                }
                else {
                    $scope.EmpnameError = true;
                    return false;
                }

                if (Toolingissue.ToolIsu_VendorCode_list != null) {
                    if (Toolingissue.ToolIsu_VendorCode_list.length == "") {
                        $scope.machinecodeError = true;
                        return false;
                    }
                }
                else {
                    $scope.machinecodeError = true;
                    return false;
                }

                if (Toolingissue.ToolIsu_Location != null) {
                    if (Toolingissue.ToolIsu_Location.length == "") {
                        $scope.machinecodeError = true;
                        return false;
                    }
                }
                else {
                    $scope.machinecodeError = true;
                    return false;
                }
            }
            $scope.machinecodeError = false;

            $scope.SaveToolingIssue(isValid,Toolingissue);
            $scope.ToolIssueForm.$setPristine();
        }
        else {
            angular.forEach($scope.ToolIssueForm.$error.required, function (field) {
                field.$setDirty();
            });
            //var PartNumber = document.getElementById("PartNumber");
            //var PartName = document.getElementById("PartName");
            //var VendorCode = document.getElementById("VendorCode");
            //var CostPerUnit = document.getElementById("CostPerUnit");
            //var Quantity = document.getElementById("Quantity");
            //var Tool_Location = document.getElementById("Tool_Location");
            //if (PartNumber.value == "") {
            //    PartNumber.focus();
            //}

            //else if (PartName.value == "") {

            //    PartName.focus();
            //}

            //else if (CostPerUnit.value == "") {

            //    CostPerUnit.focus();
            //}
            //else if (Tool_Location.value == "") {

            //    Tool_Location.focus();
            //}
            //else if (Quantity.value == "") {

            //    Quantity.focus();
            //}
            //else if (VendorCode.value == "") {

            //    VendorCode.focus();
            //}
        }
    };
    //$scope.CheckQty = function (row) {
    //    angular.forEach($scope.ToolUploadList, function (value, key) {
    //        if (value.VendorCode == row.ToolIsu_VendorCode_list)
    //        {
    //            $scope.Quantity = value.Quantity
    //            return false;
    //        }

    //    });
    //    if ($scope.Quantity < row.ToolReq_Qty)
    //    {
    //        $scope.ChkErr = true;
    //    }

    //}
    $scope.CheckQty = {
        onItemSelect: function (item) {
            //var Quantity = 0;
            //console.log(item);
            // $scope.Quantity = 0;
            
            ChkUploadID = [];

            //IsReuseable = $scope.filterToolUploadList.filter(function (element) { return element.PartNumber == $scope.obj.ToolIsu_Partno; })[0].Tooltype
            if ($scope.obj.Tooltype == 'Y') {
            angular.forEach($scope.filterToolUploadList, function (value, key) {
                angular.forEach($scope.UnicodeSelected, function (unicode) {
                    angular.forEach($scope.filterToolVendorList, function (selectedvendor) {
                        if (value.VendorCode == item.id && value.PartNumber == $scope.obj.ToolIsu_Partno && value.ToolUniqueCode == unicode.id && selectedvendor.id == item.id && selectedvendor.location_selected == 'Y' && value.Tool_Location == selectedvendor.location) {

                            var key = value['ToolUploadId'];
                            if (ChkUploadID.indexOf(key) === -1) {
                                ChkUploadID.push(key);
                                //$scope.IsVendorSelect = true;
                                $scope.Quantity = $scope.Quantity + parseFloat(value.Quantity);
                            }

                    }
                    });
                });
            });
            }
            else {
                angular.forEach($scope.filterToolUploadList, function (value, key) {
                    //angular.forEach($scope.UnicodeSelected, function (unicode) {
                        angular.forEach($scope.filterToolVendorList, function (selectedvendor) {
                            if (value.VendorCode == item.id && value.PartNumber == $scope.obj.ToolIsu_Partno  && selectedvendor.id == item.id && selectedvendor.location_selected == 'Y' && value.Tool_Location == selectedvendor.location) {

                                var key = value['ToolUploadId'];
                                if (ChkUploadID.indexOf(key) === -1) {
                                    ChkUploadID.push(key);
                                    //$scope.IsVendorSelect = true;
                                    $scope.Quantity = $scope.Quantity + parseFloat(value.Quantity);
                                }

                            }
                        });
                    //});
                });
            }
            //console.log($scope.Quantity);
            if ($scope.Quantity >= parseFloat($scope.obj.ToolReq_Qty)) {
                //$scope.ChkErr = true;
                //alert('Met Qty-' + $scope.Quantity);
                console.log($scope.ChkErr);
            }
            else {
                //alert('Not Met Qty-' + $scope.Quantity);

                //$scope.ChkErr = false;
            }
        },
        onItemDeselect: function (item) {
            //var Quantity = 0;
            //console.log(item);
            //$scope.IsVendorSelect = false;
            //angular.forEach($scope.ToolUploadList, function (value, key) {
            //    if (value.VendorCode == item.id && value.PartNumber == $scope.obj.ToolIsu_Partno) {
            //        $scope.Quantity = $scope.Quantity - parseFloat(value.Quantity)

            //    }
            //});
            ChkUploadID = [];

            angular.forEach($scope.filterToolUploadList, function (value, key) {
                angular.forEach($scope.UnicodeSelected, function (unicode) {
                    angular.forEach($scope.filterToolVendorList, function (selectedvendor) {
                        if (value.VendorCode == item.id && value.PartNumber == $scope.obj.ToolIsu_Partno && value.ToolUniqueCode == unicode.id && selectedvendor.id == item.id && selectedvendor.location_selected == 'Y' && value.Tool_Location == selectedvendor.location) {

                            var key = value['ToolUploadId'];
                            if (ChkUploadID.indexOf(key) === -1) {
                                ChkUploadID.push(key);
                                //$scope.IsVendorSelect = true;
                                $scope.Quantity = $scope.Quantity - parseFloat(value.Quantity);
                            }

                        }
                    });
                });
            });

            console.log($scope.Quantity);
            //if ($scope.Quantity >0){
            //    $scope.IsVendorSelect = true;
            //}
            //else {
            //    $scope.IsVendorSelect = false;
            //}
            if ($scope.Quantity >= parseFloat($scope.obj.ToolReq_Qty)) {
                //$scope.ChkErr = true;
                //alter('Met Qty-' + $scope.Quantity);
                console.log($scope.ChkErr);
            }
            else {
                //alter('Not Met Qty-' + $scope.Quantity);

                //$scope.ChkErr = false;
            }
        }

    };
    $scope.BindVendors = {
        onItemSelect: function (item) {
            $scope.ShowVendorCtrl = true;
            if ($scope.IsVendorSelect == true) {
                $scope.obj.ToolIsu_VendorCode_list = [];
                $scope.Quantity = 0;
            }
            for (k = 0; k < $scope.filterToolUploadList.length; k++) {
                var a = $scope.filterToolUploadList[k].Tool_Location.indexOf(item.id);
                if (a > -1) {
                    if ($scope.obj.Tooltype == 'Y') {
                        angular.forEach($scope.UnicodeSelected, function (unicode) {
                            if (unicode.id == $scope.filterToolUploadList[k].ToolUniqueCode && parseFloat($scope.filterToolUploadList[k].Quantity) > 0) {
                                //if (parseFloat($scope.filterToolUploadList[k].Quantity)> 0) {
                                $scope.IsVendorSelect = true;
                                $scope.filterToolVendorList.push({ id: $scope.filterToolUploadList[k].VendorCode, label: $scope.filterToolUploadList[k].VendorName + ' - ' + $scope.filterToolUploadList[k].VendorCode + ' - (' + $scope.filterToolUploadList[k].Quantity + ')', location: item.id, location_selected: 'Y', unicode: unicode.id });
                            }
                        });
                    }
                    else {
                        if (parseFloat($scope.filterToolUploadList[k].Quantity) > 0) {
                            $scope.filterToolVendorList.push({ id: $scope.filterToolUploadList[k].VendorCode, label: $scope.filterToolUploadList[k].VendorName + ' - ' + $scope.filterToolUploadList[k].VendorCode + ' - (' + $scope.filterToolUploadList[k].Quantity + ')', location: item.id, location_selected: 'Y' });
                        }
                    }
                }
            }
        },
        onItemDeselect: function (item) {
           
            var vendorcode;
            $scope.obj.ToolIsu_VendorCode_list = [];
            $scope.Quantity = 0;
            ToolUploadIdkeys = [];
            for (k = 0; k < $scope.filterToolUploadList.length; k++) {
                if (item.id == $scope.filterToolUploadList[k].Tool_Location) {
                    vendorcode = $scope.filterToolUploadList[k].VendorCode;

                    for (j = 0; j < $scope.filterToolVendorList.length; j++) {
                        var a = $scope.filterToolVendorList[j].id.indexOf(vendorcode);
                        var b = $scope.filterToolVendorList[j].location.indexOf(item.id);

                        if (a > -1 && b>-1) {
                            $scope.filterToolVendorList.splice(j, 1);
                            // return false;
                        }
                    }
                }
            }
        //    if ($scope.IsVendorSelect==true) { 
        //    angular.forEach($scope.filterToolUploadList, function (value, key) {

        //    angular.forEach($scope.filterToolVendorList, function (Vendorvalue, Vendorkey) {
        //        angular.forEach($scope.filterToolLocationList, function (Locationvalue, Locationkey) {
        //            angular.forEach($scope.filterUnicodeSelected, function (Unicodevalue, Unicodekey) {
        //                var key = value['ToolUploadId'];
        //                if (ToolUploadIdkeys.indexOf(key) === -1) {

        //                    ToolUploadIdkeys.push(key);
        //                    if (value.VendorCode == Vendorvalue.id && value.PartNumber == $scope.obj.ToolIsu_Partno && value.Tool_Location == item.id && value.ToolUniqueCode == Unicodevalue.id) {
        //                        $scope.Quantity = $scope.Quantity - parseFloat(value.Quantity)

        //                }
                        

        //        }
        //            });
        //        });
        //    });
        //    });
        //}

        }

    };
    $scope.ChkToolStatus = function (row) {

        if (row.Tool_Status == 'C') {
            $scope.ChkRemark = true;
            $scope.ChkReson = true;
            $scope.IsRequired = false;
        }
        else {
            $scope.ChkRemark = false;
            $scope.ChkReson = false;
        }
        if (row.ToolIsu_Cancle_Reason != null) {
            $scope.ChkReson = false;

        }
        if (row.ToolIsu_Cancle_Reason != undefined) {
            $scope.ChkReson = false;
            if (row.ToolIsu_Cancle_Reason.length != 0) {
                $scope.ChkReson = false;
            }
        }
        if (row.ToolIsu_Remarks != null) {
            $scope.ChkRemark = false;

        }
        if (row.ToolIsu_Remarks != undefined) {
            $scope.ChkRemark = false;
            if (row.ToolIsu_Remarks.length != 0) {
                $scope.ChkRemark = false;
            }
        }

        //if (row.ToolIsu_Remarks == undefined) {
        //    $scope.ChkRemark = true;
        //    if (row.ToolIsu_Remarks == '' || undefined) {
        //        $scope.ChkRemark = true;
        //    }
        //    else {
        //        $scope.ChkRemark = false;
        //    }
        //}
    }

    $scope.SaveToolingIssue = function (isValid, Toolingissue) {
        if (isValid==true){
        if (Toolingissue.IsActive == true) {
            Toolingissue.IsActive = "1";

        }
        else {
            Toolingissue.IsActive = "0";
        }
        Toolingissue.ToolIsu_Qty = Toolingissue.ToolReq_Qty
        //Toolingissue.ToolIsu_VendorCode = Toolingissue.ToolIsu_VendorCode.join(",");
        if (Toolingissue.Tool_Status == 'C') {
            Toolingissue.ToolIsu_VendorCode_list = [""]
            Toolingissue.ToolIsu_Location = [""]
        }
        else {
            Toolingissue.ToolIsu_VendorCode_list = Toolingissue.ToolIsu_VendorCode_list.map(function (machine) {
                return machine['id']
            })
            Toolingissue.ToolIsu_Location = Toolingissue.ToolIsu_Location.map(function (machine) {
                return machine['id']
            })
            Toolingissue.ToolIsu_CurUnicode = Toolingissue.ToolIsu_CurUnicode.map(function (machine) {
                return machine['id']
            })
            Toolingissue.ToolIsu_CurUnicode = Toolingissue.ToolIsu_CurUnicode.join();
            Toolingissue.ToolIsu_Location = Toolingissue.ToolIsu_Location.join();
            Toolingissue.ToolIsu_VendorCode = Toolingissue.ToolIsu_VendorCode_list.join();
            var location = Toolingissue.ToolIsu_Location
            var Vendor = Toolingissue.ToolIsu_VendorCode_list.join();
            //for (j = 0; j < $scope.FullToolUploadList.length; j++) {
            //    if ($scope.FullToolUploadList[j].ToolUniqueCode) {
            //        if ($scope.FullToolUploadList[j].PartNumber == Toolingissue.ToolIsu_Partno && $scope.FullToolUploadList[j].ToolUniqueCode == Toolingissue.ToolIsu_CurUnicode && parseFloat($scope.FullToolUploadList[j].Quantity) > 0
            //            && $scope.FullToolUploadList[j].Tool_Location == location && $scope.FullToolUploadList[j].VendorCode == Vendor
            //            ) {
            //            Toolingissue.RegrainCode = $scope.FullToolUploadList[j].InsertId;
            //            //return false;
            //        }
            //    }
            //}


        }

        var request = new ToolingissueServices.SaveToolingIssue(Toolingissue);
        commonService.postWebService(request.url, request.param).then(function (response) {
            debugger;

            if (response.liToolingIssue != null) {
                if (response.liToolingIssue[0].MSG == "Updated Success") {
                    $("#Message").val('Updated !! ');//Messgae
                    $('#Title').html('Tool Issue Update Successfully');//Title
                    $scope.init();
                    $scope.obj = null;
                    $scope.ToolIssueForm.$setPristine();
                    $("#Message").trigger("click");
                    //alert("Tool Uploaded Successfully")

                }
                else if (response.liToolingIssue[0].MSG == "Tool Already Uploaded") {

                    $("#Message").val('Alter !! ');//Messgae
                    $('#Title').html('Part Number - "' + response.liToolingIssue[0].PartNumber + '" Already Exists');//Title
                    // $("#Message").trigger("click");
                    $scope.obj.IsActive = true;
                }
                else if (response.liToolingIssue[0].MSG == "Already Issued") {
                    $("#Message").val('Failed !! ');//Messgae
                    $('#Title').html('Already This Request Has Been Issued');//Title
                    $scope.init();
                    $scope.obj = null;
                    $scope.ToolIssueForm.$setPristine();
                    $("#Message").trigger("click");
                }
                else {
                    $("#Message").val('Saved !! ');//Messgae
                    $('#Title').html('Tool Issue Saved Successfully');//Title
                    $scope.init();
                    $scope.obj = null;
                    $scope.ToolIssueForm.$setPristine();
                    $("#Message").trigger("click");
                    //alert("Tool Upload Saved Successfully")

                }

            }
            else {
                $("#Message").val('Failed !! ');//Messgae
                $('#Title').html('Error Happened while Saving Category');//Title
                $("#Message").trigger("click");
            }
        });
        }
    };

    $scope.returnAcive = function (act) {
        return act == 1 ? 'Y' : 'N';
    };

    $scope.init();

    $scope.myFunctionCompany = function (row, key) {
        $scope.obj = new ToolingissueServices.ToolingissueData(row);
        myFunctionCompany();
    }



});
