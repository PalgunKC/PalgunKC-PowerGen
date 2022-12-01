SpareingissueApp.controller('SpareingissueCtrl', function (Excel, $timeout, $scope, $filter, SpareingissueServices, commonService, DTOptionsBuilder, DTColumnBuilder) {
    $scope.disableTabCtrl = true;
    $scope.PartMasterList = [];
    $scope.SpareVendorList = [];
    $scope.SpareingRequestList = [];
    $scope.SpareLocationList = [];
    $scope.SpareUploadList = [];
    $scope.FullSpareUploadList = [];
    $scope.filterSpareUploadList = [];
    $scope.SpareingIssueList = [];
    $scope.filterSpareVendorList = [];
    $scope.filterSpareLocationList = [];
    $scope.machinecodeError = false;
    $scope.MachineListMaster = [];
    $scope.SpareingRegrainList = []
    $scope.ScrabList = []
    $scope.Quantity = 0;
    $scope.ChkErr = false;
    // $scope.ChkCancle = false;
    $scope.ChkRemark = false;
    $scope.ChkReson = false;
    keyname = 'Spare_Location';
    keys = [];
    $scope.IsRequired = false;
    $scope.UnicodeSelected = []
    $scope.qutChk = 0;
    $scope.IsVendorSelect = false;
    $scope.ShowIssueCtrl = true;
    $scope.ShowVendorCtrl = true;

    $scope.Request_Flag = false;
    $scope.Issue_Flag = false;
    $scope.Regrain_Flag = false;
    $scope.Upload_Flag = false;
    $scope.Upload1_Flag = false;
    $scope.Vendor_Flag = false;
    $scope.Machine_Flag = false;
    $scope.Scrab_Flag = false;

    $scope.obj = new SpareingissueServices.SpareingissueData(null);

    $scope.init = function () {
        debugger;

        $scope.IsListDivVisible = true;
        $scope.IsEditDivVisible = false;
        commonService.postWebService('Spare/BindListSpareingIssue', { 'P_KEY': 'G', 'dummy_col1': 'Request' }).then(function (response) {
            $scope.SpareingRequestList = response.ddSpareingRequest;
            $scope.Request_Flag = true;

        });
        commonService.postWebService('Spare/BindListSpareingIssue', { 'P_KEY': 'L', 'dummy_col1': 'Issue' }).then(function (response) {
            $scope.SpareingIssueList = response.ddlSpareingIssue;
            $scope.Issue_Flag = true;
        });
        commonService.postWebService('Spare/BindListSpareingIssue', { 'P_KEY': 'G', 'dummy_col1': 'Regrain' }).then(function (response) {
            $scope.SpareingRegrainList = response.ddlSpareingRegrain;
            $scope.Regrain_Flag = true;
        });
        commonService.postWebService('Spare/BindListSpareingIssue', { 'P_KEY': 'G', 'dummy_col1': 'Upload' }).then(function (response) {
            $scope.SpareUploadList = response.ddlSpareUpload;
            $scope.Upload_Flag = true;
        });
        commonService.postWebService('Spare/BindListSpareingIssue', { 'P_KEY': 'L', 'dummy_col1': 'Upload' }).then(function (response) {
            $scope.FullSpareUploadList = response.ddlSpareUploadList;
            $scope.Upload1_Flag = true;
        });
        commonService.postWebService('Spare/BindListSpareingIssue', { 'P_KEY': 'L', 'dummy_col1': 'Vendor' }).then(function (response) {
            $scope.SpareVendorList = response.ddlVendormaster;
            $scope.Vendor_Flag = true;
        });
        commonService.postWebService('Spare/BindListSpareingIssue', { 'P_KEY': 'L', 'dummy_col1': 'Machine' }).then(function (response) {
            $scope.MachineListMaster = response.ddlMachine;
            $scope.Machine_Flag = true;
        });
        commonService.postWebService('Spare/BindListSpareingIssue', { 'P_KEY': 'L', 'dummy_col1': 'Scrab' }).then(function (response) {

            $scope.ScrabList = response.ddlScrab;
            angular.forEach($scope.SpareingRequestList, function (value, key) {
                value.Quantity = parseFloat(value.Quantity);
                angular.forEach($scope.SpareUploadList, function (value1, key) {
                    if (value1.PartNumber == value.SpareReq_Partno) {
                        value.Spare_Location = value1.Spare_Location;
                    }

                });
                angular.forEach($scope.MachineListMaster, function (value2, key) {
                    if (value2.Machinecode == value.SpareReq_MachineCode) {
                        value.SpareReq_Machinename = value2.MachineName;
                    }

                });
            });
            $scope.Scrab_Flag = true;
        });
        $scope.DatatableInitialize();
    };

    var intervalId = window.setInterval(
  $scope.ShowTab = function () {
      if ($scope.Request_Flag === false || $scope.Issue_Flag === false || $scope.Regrain_Flag === false || $scope.Upload_Flag === false || $scope.Upload1_Flag === false || $scope.Vendor_Flag === false || $scope.Machine_Flag === false || $scope.Scrab_Flag === false) {
          $scope.disableTabCtrl = true;
      }
      else {
          $scope.disableTabCtrl = false;
          $timeout(function () {
              angular.element('#fakeButton').triggerHandler('click');
          });
          clearInterval(intervalId);
      }
  }
, 500)

    $scope.GetExcelData = function () {
        commonService.postWebService('Spare/GetExcelSpareIssueData', { 'P_KEY': 'EXCEL', 'dummycolumn1': 'Part' }).then(function (response) {

            $scope.DownloadTab(response);
        });
    }
    $scope.DownloadTab = function (response) {
        window.location = '/Spare/Download?ID=' + response.ID + '&Name=' + response.FileName;
    };

    $scope.filterPartMasterList = function (SpareUploadList) {
        return (SpareUploadList.IsActive === 'Y');
    }

    $scope.filterSpareingRequestList = function (SpareingRequestList) {
        return (SpareingRequestList.IsActive === 'Y');
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
            a.download = "SpareInward.xls";
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
                pdfMake.createPdf(docDefinition).download("SpareInward.pdf");
            }
        });
    };

    $scope.CancelSpareingIssue = function () {
        $scope.filterSpareLocationList = [];
        $scope.filterSpareVendorList = [];
        $scope.unicodeSpareLocationList = [];
        $scope.filterUnicodeSelected = [];
        $scope.filterSpareUnicodeList = [];
        $scope.UnicodeSelected = [];

        $scope.IsListDivVisible = true;
        $scope.IsEditDivVisible = false;
        $scope.obj = null;
        $scope.SpareIssueForm.$setPristine();
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
            $scope.filterSpareLocationList = [];
            $scope.filterSpareVendorList = [];
            $scope.unicodeSpareLocationList = [];
            $scope.obj.SpareIsu_Location = [];

            $scope.filterUnicodeSelected = [];
            $scope.obj.SpareIsu_VendorCode_list = [];

            //row.SpareIsu_Location =''
            keys = [];
            Locationkeys = [];
            Unicodekeys = [];
            UploadIdkeyname = "SpareUploadId"
            $scope.IsMetQty = false;


            $scope.UnicodeSelected.push({ id: item.id })

            if ($scope.obj.SpareIsu_PreUnicode.length > 0) {
                $("#Message").val('Alter !! ');//Messgae
                $('#Title').html("Sorry! If you selected Regrain part, Yoc can't select multi part");//Title
                $scope.obj.SpareIsu_CurUnicode = [];
                $scope.obj.SpareIsu_PreUnicode = "";
                $scope.obj.SpareIsu_NoOfUnderWent_Regriding = "";
                $scope.obj.SpareIsu_Partno = "";
                $scope.UnicodeSelected = [];
                $scope.filterSpareLocationList = [];
                $scope.filterSpareVendorList = [];
                $scope.unicodeSpareLocationList = [];
                $scope.filterUnicodeSelected = [];
                $("#Message").trigger("click");

            }


            angular.forEach($scope.FullSpareUploadList, function (items) {
                angular.forEach($scope.UnicodeSelected, function (unicode) {
                    // var key = items[keyname];
                    var key = items[UploadIdkeyname];
                    if (keys.indexOf(key) === -1) {

                        if (items['SpareUniqueCode'] == unicode.id && parseFloat(items['Quantity']) > 0 && items['PartId'] == $scope.PartId) {
                            //$scope.qutChk =  $scope.qutChk + parseFloat(items['Quantity']);
                            //if ($scope.qutChk >= parseFloat($scope.obj.SpareReq_Qty)) {
                            //    $scope.IsMetQty=true
                            //}
                            // if (!$scope.IsMetQty) {
                            keys.push(key);
                            $scope.unicodeSpareLocationList.push({ id: items.Spare_Location, label: items.Spare_Location, unicode: item.id })
                            //}
                            //row.SpareIsu_Partno = item['PartNumber'];

                            if (items['SpareUniqueCode'] == unicode.id && items['SpareUniqueCode'] == item.id && parseFloat(items['Quantity']) > 0 && items['PartId'] == $scope.PartId) {
                                $scope.qutChk = $scope.qutChk + parseFloat(items['Quantity']);
                                $scope.obj.SpareIsu_Partno = items['PartNumber']

                                if ($scope.qutChk >= parseFloat($scope.obj.SpareReq_Qty)) {
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
            angular.forEach($scope.unicodeSpareLocationList, function (items) {
                var key = items['id'];
                if (Locationkeys.indexOf(key) === -1) {

                    Locationkeys.push(key);
                    $scope.filterSpareLocationList.push({ id: items.id, label: items.label, unicode: items.unicode })
                    //row.SpareIsu_Partno = item['PartNumber'];

                }
            });
            angular.forEach($scope.UnicodeSelected, function (items) {
                var key = items['id'];
                if (Unicodekeys.indexOf(key) === -1) {

                    Unicodekeys.push(key);
                    $scope.filterUnicodeSelected.push({ id: items.id, label: items.label })
                    //row.SpareIsu_Partno = item['PartNumber'];

                }
            });
            //for (i = 0; i < $scope.FullSpareUploadList.length; i++) {
            //    var key = items[keyname];
            //        if (keys.indexOf(key) === -1) {

            //            if (items['SpareUniqueCode'] == item.id && parseFloat(items['Quantity']) > 0 && items['PartId'] == $scope.PartId) {
            //                keys.push(key);
            //                $scope.filterSpareLocationList.push({ id: items.Spare_Location, label: items.Spare_Location })
            //                //row.SpareIsu_Partno = item['PartNumber'];
            //            }
            //        }
            //}

            for (i = 0; i < $scope.SpareingRegrainList.length; i++) {
                if (ii != 1) {


                    if ($scope.SpareingRegrainList[i].SpareRts_Unicode) {
                        if ($scope.SpareingRegrainList[i].SpareRts_Unicode == item.id
                                && $scope.SpareingRegrainList[i].SpareReg_RegrainPartNo == $scope.obj.SpareIsu_Partno
                                ) {
                            //alert($scope.SpareingRegrainList[i].Previous_UniCode);

                            angular.forEach($scope.filterUnicodeSelected, function (unicode) {
                                if ($scope.SpareingRegrainList[i].SpareRts_Unicode != unicode.id) {
                                    $("#Message").val('Alter !! ');//Messgae
                                    $('#Title').html("Sorry! If you selected Regrain part, Yoc can't select multi part");//Title
                                    $scope.obj.SpareIsu_CurUnicode = [];
                                    $scope.obj.SpareIsu_PreUnicode = "";
                                    $scope.obj.SpareIsu_NoOfUnderWent_Regriding = "";
                                    $scope.obj.SpareIsu_Partno = "";
                                    $scope.UnicodeSelected = [];
                                    $scope.filterSpareLocationList = [];
                                    $scope.filterSpareVendorList = [];
                                    $scope.unicodeSpareLocationList = [];
                                    $scope.filterUnicodeSelected = [];
                                    $("#Message").trigger("click");


                                }
                            });
                            $scope.obj.SpareIsu_PreUnicode = $scope.SpareingRegrainList[i].Previous_UniCode;
                            $scope.obj.SpareIsu_NoOfUnderWent_Regriding = $scope.obj.SpareIsu_PreUnicode.substr($scope.obj.SpareIsu_PreUnicode.indexOf('- RE') + 4);

                            //$scope.obj.SpareIsu_PreUnicode = $scope.obj.SpareIsu_PreUnicode + ',' + $scope.SpareingRegrainList[i].Previous_UniCode;

                            ii = 1
                        }
                        else {
                            $scope.obj.SpareIsu_PreUnicode = "";
                            $scope.obj.SpareIsu_NoOfUnderWent_Regriding = "";
                        }

                    }
                    else {
                        $scope.obj.SpareIsu_PreUnicode = "";
                        $scope.obj.SpareIsu_NoOfUnderWent_Regriding = "";
                    }
                }
            }

        },
        onItemDeselect: function (item) {
            var vendorcode;
            $scope.obj.SpareIsu_Location = [];
            $scope.obj.SpareIsu_VendorCode_list = [];
            $scope.Quantity = 0;
            $scope.filterSpareLocationList = [];
            $scope.unicodeSpareLocationList = [];
            $scope.filterSpareVendorList = [];
            keys = [];
            Unicodekeys = [];

            var ii = 0;

            //for (k = 0; k < $scope.filterSpareUploadList.length; k++) {
            //    if (item.id == $scope.filterSpareUploadList[k].Spare_Location) {
            //        vendorcode = $scope.filterSpareUploadList[k].VendorCode;

            //        for (j = 0; j < $scope.filterSpareVendorList.length; j++) {
            //            var a = $scope.filterSpareVendorList[j].id.indexOf(vendorcode);
            //            if (a > -1) {
            //                $scope.filterSpareVendorList.splice(j, 1);
            //                // return false;
            //            }
            //        }
            //    }
            //}
            angular.forEach($scope.FullSpareUploadList, function (items) {
                //angular.forEach($scope.filterUnicodeSelected, function (unicode) {
                //    var key = items[keyname];
                //    if (keys.indexOf(key) === -1) {

                //        if (items['SpareUniqueCode'] == unicode.id && parseFloat(items['Quantity']) > 0 && items['PartId'] == $scope.PartId) {
                //            keys.push(key);
                //            $scope.unicodeSpareLocationList.push({ id: items.Spare_Location, label: unicode.id })
                //            //row.SpareIsu_Partno = item['PartNumber'];
                //        }
                //    }
                //});
                for (j = 0; j < $scope.filterUnicodeSelected.length; j++) {
                    var key = items[keyname];
                    if (items['SpareUniqueCode'] == $scope.filterUnicodeSelected[j].id && parseFloat(items['Quantity']) > 0 && items['PartId'] == $scope.PartId) {
                        keys.push(key);
                        $scope.unicodeSpareLocationList.push({ id: items.Spare_Location, label: items.Spare_Location, unicode: $scope.filterUnicodeSelected[j].id })
                        if (items['SpareUniqueCode'] == item.id) {
                            $scope.obj.SpareIsu_Partno = "";
                            $scope.obj.SpareIsu_PreUnicode = "";
                            $scope.obj.SpareIsu_NoOfUnderWent_Regriding = "";
                            $scope.filterUnicodeSelected.splice(j, 1);
                        }
                        //row.SpareIsu_Partno = item['PartNumber'];
                    }

                }
            });
            angular.forEach($scope.FullSpareUploadList, function (items) {
                //angular.forEach($scope.UnicodeSelected, function (unicode) {

                if (items['SpareUniqueCode'] == item.id && parseFloat(items['Quantity']) > 0 && items['PartId'] == $scope.PartId) {
                    //$scope.unicodeSpareLocationList.push({ id: items.Spare_Location, label: items.Spare_Location })
                    //row.SpareIsu_Partno = item['PartNumber'];

                    for (j = 0; j < $scope.unicodeSpareLocationList.length; j++) {
                        if (ii != 1) {

                            var a = $scope.unicodeSpareLocationList[j].id.indexOf(items.Spare_Location);
                            var b = $scope.unicodeSpareLocationList[j].unicode.indexOf(item.id);

                            if (a > -1 && b > -1) {
                                $scope.unicodeSpareLocationList.splice(j, 1);
                                ii = 1
                            }
                        }
                    }

                    if (items['SpareUniqueCode'] == item.id && parseFloat(items['Quantity']) > 0 && items['PartId'] == $scope.PartId) {
                        $scope.qutChk = $scope.qutChk - parseFloat(items['Quantity']);
                        if ($scope.qutChk >= parseFloat($scope.obj.SpareReq_Qty)) {
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

            angular.forEach($scope.unicodeSpareLocationList, function (items) {
                var key = items['id'];
                if (Unicodekeys.indexOf(key) === -1) {

                    Unicodekeys.push(key);
                    $scope.filterSpareLocationList.push({ id: items.id, label: items.label, unicode: items.unicode })
                    //row.SpareIsu_Partno = item['PartNumber'];

                }
            });
            $scope.UnicodeSelected = [];
            for (j = 0; j < $scope.filterUnicodeSelected.length; j++) {
                //var key = items[keyname];
                //if (items['SpareUniqueCode'] == $scope.filterUnicodeSelected[j].id && parseFloat(items['Quantity']) > 0 && items['PartId'] == $scope.PartId) {
                //    keys.push(key);
                //    $scope.unicodeSpareLocationList.push({ id: items.Spare_Location, label: items.Spare_Location, unicode: $scope.filterUnicodeSelected[j].id })
                //    if (items['SpareUniqueCode'] == item.id) {
                //        $scope.filterUnicodeSelected.splice(j, 1);
                //    }
                //    //row.SpareIsu_Partno = item['PartNumber'];
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
        $scope.filterSpareVendorList = [];
        $scope.filterSpareLocationList = [];
        $scope.filterSpareUnicodeList = [];
        Locationkeys = [];

        $scope.IsRequired = false;
        keys = [];
        if (key == 'E') {

            $scope.PartNo = row.SpareReq_Partno;
            $scope.PartId = row.PartId;

            //for (k = 0; k < $scope.SpareUploadList.length; k++) {
            //    var a = $scope.SpareUploadList[k].PartNumber.indexOf($scope.PartNo);
            //    if (a > -1) {

            //        $scope.filterSpareVendorList.push({ id: $scope.SpareUploadList[k].VendorCode, label: $scope.SpareUploadList[k].VendorName + ' - ' + $scope.SpareUploadList[k].VendorCode + ' - (' + $scope.SpareUploadList[k].Quantity + ')' });

            //    }
            //}

            //----------------15/12/2020 for get location and vendor according to unicode
            //$scope.filterSpareUploadList = $scope.SpareUploadList.filter(function (SpareUploadList) {
            //    return (SpareUploadList.PartNumber === $scope.PartNo);
            //});

            $scope.filterSpareUploadList = $scope.FullSpareUploadList.filter(function (SpareUploadList) {
                //return (SpareUploadList.PartNumber === $scope.PartNo);
                return (SpareUploadList.PartId === $scope.PartId);
            });

            $scope.obj = new SpareingissueServices.SpareingissueData(row);
            $scope.obj.KEY = key;

            $scope.obj.SpareIsu_Req_Employeename = row.SpareReq_Employeename;
            $scope.obj.SpareIsu_Req_Employeeno = row.SpareReq_Employeeno;
            $scope.obj.SpareIsu_Linename = row.SpareReq_Linename;
            $scope.obj.SpareIsu_MachineCode = row.SpareReq_MachineCode;
            $scope.obj.SpareIsu_MachineName = row.SpareReq_Machinename;
            //$scope.obj.SpareIsu_Partname = row.SpareReq_Partname;
            $scope.obj.SpareIsu_Partno = row.SpareReq_Partno;
            $scope.obj.SpareReq_Qty = row.SpareReq_Qty;
            $scope.obj.SpareReq_id = row.SpareReq_id;
            $scope.obj.SpareIsu_Request_no = row.SpareReq_no;
            $scope.obj.SpareIsu_datetime = row.SpareReq_datetime;
            $scope.obj.SpareIsu_shift = row.SpareReq_shift

            $scope.obj.SpareIsu_PreUnicode = row.SpareReq_uniquecode;
            $scope.obj.Request_Reason = row.ReasonDetails;
            $scope.obj.Spare_Status = "";
            // angular.forEach($scope.PartMasterList, function (value, key) {
            //  if (value.PartNumber == row.SpareReq_Partno) {
            $scope.obj.SpareIsu_AvailableQty = row.TotalProductCount;
            $scope.obj.SpareIsu_MinQty = row.Min_qty;
            $scope.obj.SpareIsu_MaxQty = row.Max_qty;
            $scope.obj.SpareIsu_ReorderQty = row.Reorder_qty;
            $scope.obj.SpareIsu_LifeSpan = row.LifeTime;
            $scope.obj.Sparetype = row.IsReusable;
            $scope.obj.SpareIsu_Partname = row.PartName;
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



            keys = [];
            UniCodekeyname = 'SpareUniqueCode';
            angular.forEach($scope.FullSpareUploadList, function (item) {

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
                                        //$scope.filterSpareUnicodeList.push(item)
                                        $scope.filterSpareUnicodeList.push({ id: item.SpareUniqueCode, label: item.SpareUniqueCode })

                                        ii = 1;
                                    }

                                }
                            }
                            else {
                                for (i = 0; i <= $scope.ScrabList.length - 1; i++) {

                                    if ($scope.ScrabList[i].PartNumber != item['PartNumber'] && parseFloat(item['Quantity']) > 0) {
                                        if (ii == 0) {
                                            keys.push(key);
                                            //$scope.filterSpareUnicodeList.push(item)
                                            $scope.filterSpareUnicodeList.push({ id: item.SpareUniqueCode, label: item.SpareUniqueCode })
                                            ii = 1;
                                        }
                                    } else {
                                        if ($scope.ScrabList[i].UniCode != key && parseFloat(item['Quantity']) > 0) {
                                            if (ii == 0) {
                                                keys.push(key);
                                                //$scope.filterSpareUnicodeList.push(item)
                                                $scope.filterSpareUnicodeList.push({ id: item.SpareUniqueCode, label: item.SpareUniqueCode })
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



            angular.forEach($scope.filterSpareUploadList, function (value, key) {
                if (value.PartNumber == row.SpareReq_Partno && parseFloat(value.Quantity) > 0) {
                    //$scope.obj.SpareIsu_Location = value.Spare_Location;

                    var key = value['Spare_Location'];
                    if (Locationkeys.indexOf(key) === -1) {

                        Locationkeys.push(key);
                        $scope.filterSpareLocationList.push({ id: value.Spare_Location, label: value.Spare_Location })
                        //row.SpareIsu_Partno = item['PartNumber'];

                    }
                    //$scope.filterSpareLocationList.push({ id: value.Spare_Location, label: value.Spare_Location })
                    //$scope.filterSpareVendorList.push({ id: $scope.SpareUploadList[k].VendorCode, label: $scope.SpareUploadList[k].VendorName + ' - ' + $scope.SpareUploadList[k].VendorCode + ' - (' + $scope.SpareUploadList[k].Quantity + ')' });

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
            $scope.obj = new SpareingissueServices.SpareingissueData(null);
            $scope.disablecode = false;
            $scope.obj.IsActive = true;
            $scope.obj.KEY = key;
        }
    };

    $scope.submitForm = function (isValid, Spareingissue) {
        // check to make sure the form is completely valid
        debugger;
        if (!isValid) {

            for (i = 0; i <= ($scope.SpareIssueForm.$error.required.length) - 1; i++) {
                if ($scope.SpareIssueForm.$error.required[i].$$attr.id == 'Spare_Status') {
                    isValid = false;
                }
                if (Spareingissue.Spare_Status == 'I') {
                    if ($scope.SpareIssueForm.$error.required[i].$$attr.id == 'SpareIsu_Remarks') {
                        isValid = true;
                    }
                }
            }

        }
        if ($scope.IsRequired && Spareingissue.Spare_Status == 'I') {
            isValid = false;
        }



        if (isValid) {
            if (Spareingissue.Spare_Status == 'I') {

                if ($scope.Quantity > parseFloat($scope.obj.SpareReq_Qty) && $scope.obj.Sparetype == 'Y') {
                    //$("#Message").val('Selected Quantity is Greater than requested Quantity !! ');//Messgae
                    $("#Message").val('Failed !! ');//Messgae
                    $('#Title').html('Selected Quantity is Greater than requested Quantity !!');//Title
                    $("#Message").trigger("click");
                }
                if ($scope.Quantity < parseFloat($scope.obj.SpareReq_Qty)) {
                    //$("#Message").val('Selected Quantity is Lesser than requested Quantity !! ');//Messgae
                    $("#Message").val('Failed !! ');//Messgae
                    $('#Title').html('Selected Quantity is Lesser than requested Quantity !! ');//Title
                    $("#Message").trigger("click");

                }

            }
            if (Spareingissue.Spare_Status == 'I') {

                if (Spareingissue.Issued_Emp_Number != null) {
                    if (Spareingissue.Issued_Emp_Number.length == "") {
                        $scope.EmpnumberError = true;
                        return false;
                    }
                }
                else {
                    $scope.EmpnumberError = true;
                    return false;
                }

                if (Spareingissue.Issued_Emp_Name != null) {
                    if (Spareingissue.Issued_Emp_Name.length == "") {
                        $scope.EmpnameError = true;
                        return false;
                    }
                }
                else {
                    $scope.EmpnameError = true;
                    return false;
                }
                if (Spareingissue.SpareIsu_VendorCode_list != null) {
                    if (Spareingissue.SpareIsu_VendorCode_list.length == "") {
                        $scope.machinecodeError = true;
                        return false;
                    }
                }
                else {
                    $scope.machinecodeError = true;
                    return false;
                }

                if (Spareingissue.SpareIsu_Location != null) {
                    if (Spareingissue.SpareIsu_Location.length == "") {
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

            $scope.SaveSpareingIssue(isValid, Spareingissue);
            $scope.SpareIssueForm.$setPristine();
        }
        else {
            angular.forEach($scope.SpareIssueForm.$error.required, function (field) {
                field.$setDirty();
            });

        }
    };

    $scope.CheckQty = {
        onItemSelect: function (item) {


            ChkUploadID = [];

            //IsReuseable = $scope.filterSpareUploadList.filter(function (element) { return element.PartNumber == $scope.obj.SpareIsu_Partno; })[0].Sparetype
            if ($scope.obj.Sparetype == 'Y') {
                angular.forEach($scope.filterSpareUploadList, function (value, key) {
                    angular.forEach($scope.UnicodeSelected, function (unicode) {
                        angular.forEach($scope.filterSpareVendorList, function (selectedvendor) {
                            if (value.VendorCode == item.id && value.PartNumber == $scope.obj.SpareIsu_Partno && value.SpareUniqueCode == unicode.id && selectedvendor.id == item.id && selectedvendor.location_selected == 'Y' && value.Spare_Location == selectedvendor.location) {

                                var key = value['SpareUploadId'];
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
                angular.forEach($scope.filterSpareUploadList, function (value, key) {
                    //angular.forEach($scope.UnicodeSelected, function (unicode) {
                    angular.forEach($scope.filterSpareVendorList, function (selectedvendor) {
                        if (value.VendorCode == item.id && value.PartNumber == $scope.obj.SpareIsu_Partno && selectedvendor.id == item.id && selectedvendor.location_selected == 'Y' && value.Spare_Location == selectedvendor.location) {

                            var key = value['SpareUploadId'];
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

            if ($scope.Quantity >= parseFloat($scope.obj.SpareReq_Qty)) {

                console.log($scope.ChkErr);
            }
            else {

            }
        },
        onItemDeselect: function (item) {

            ChkUploadID = [];

            angular.forEach($scope.filterSpareUploadList, function (value, key) {
                angular.forEach($scope.UnicodeSelected, function (unicode) {
                    angular.forEach($scope.filterSpareVendorList, function (selectedvendor) {
                        if (value.VendorCode == item.id && value.PartNumber == $scope.obj.SpareIsu_Partno && value.SpareUniqueCode == unicode.id && selectedvendor.id == item.id && selectedvendor.location_selected == 'Y' && value.Spare_Location == selectedvendor.location) {

                            var key = value['SpareUploadId'];
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
            if ($scope.Quantity >= parseFloat($scope.obj.SpareReq_Qty)) {

                console.log($scope.ChkErr);
            }
            else {

            }
        }

    };
    $scope.BindVendors = {
        onItemSelect: function (item) {
            $scope.ShowVendorCtrl = true;
            if ($scope.IsVendorSelect == true) {
                $scope.obj.SpareIsu_VendorCode_list = [];
                $scope.Quantity = 0;
            }
            for (k = 0; k < $scope.filterSpareUploadList.length; k++) {
                var a = $scope.filterSpareUploadList[k].Spare_Location.indexOf(item.id);
                if (a > -1) {
                    if ($scope.obj.Sparetype == 'Y') {
                        angular.forEach($scope.UnicodeSelected, function (unicode) {
                            if (unicode.id == $scope.filterSpareUploadList[k].SpareUniqueCode && parseFloat($scope.filterSpareUploadList[k].Quantity) > 0) {
                                //if (parseFloat($scope.filterSpareUploadList[k].Quantity)> 0) {
                                $scope.IsVendorSelect = true;
                                $scope.filterSpareVendorList.push({ id: $scope.filterSpareUploadList[k].VendorCode, label: $scope.filterSpareUploadList[k].VendorName + ' - ' + $scope.filterSpareUploadList[k].VendorCode + ' - (' + $scope.filterSpareUploadList[k].Quantity + ')', location: item.id, location_selected: 'Y', unicode: unicode.id });
                            }
                        });
                    }
                    else {
                        if (parseFloat($scope.filterSpareUploadList[k].Quantity) > 0) {
                            $scope.filterSpareVendorList.push({ id: $scope.filterSpareUploadList[k].VendorCode, label: $scope.filterSpareUploadList[k].VendorName + ' - ' + $scope.filterSpareUploadList[k].VendorCode + ' - (' + $scope.filterSpareUploadList[k].Quantity + ')', location: item.id, location_selected: 'Y' });
                        }
                    }
                }
            }
        },
        onItemDeselect: function (item) {
            var vendorcode;
            $scope.obj.SpareIsu_VendorCode_list = [];
            $scope.Quantity = 0;
            SpareUploadIdkeys = [];
            for (k = 0; k < $scope.filterSpareUploadList.length; k++) {
                if (item.id == $scope.filterSpareUploadList[k].Spare_Location) {
                    vendorcode = $scope.filterSpareUploadList[k].VendorCode;

                    for (j = 0; j < $scope.filterSpareVendorList.length; j++) {
                        var a = $scope.filterSpareVendorList[j].id.indexOf(vendorcode);
                        var b = $scope.filterSpareVendorList[j].location.indexOf(item.id);

                        if (a > -1 && b > -1) {
                            $scope.filterSpareVendorList.splice(j, 1);
                            // return false;
                        }
                    }
                }
            }


        }

    };
    $scope.ChkSpareStatus = function (row) {

        if (row.Spare_Status == 'C') {
            $scope.ChkRemark = true;
            $scope.ChkReson = true;
            $scope.IsRequired = false;
        }
        else {
            $scope.ChkRemark = false;
            $scope.ChkReson = false;
        }
        if (row.SpareIsu_Cancle_Reason != null) {
            $scope.ChkReson = false;

        }
        if (row.SpareIsu_Cancle_Reason != undefined) {
            $scope.ChkReson = false;
            if (row.SpareIsu_Cancle_Reason.length != 0) {
                $scope.ChkReson = false;
            }
        }
        if (row.SpareIsu_Remarks != null) {
            $scope.ChkRemark = false;

        }
        if (row.SpareIsu_Remarks != undefined) {
            $scope.ChkRemark = false;
            if (row.SpareIsu_Remarks.length != 0) {
                $scope.ChkRemark = false;
            }
        }

        //if (row.SpareIsu_Remarks == undefined) {
        //    $scope.ChkRemark = true;
        //    if (row.SpareIsu_Remarks == '' || undefined) {
        //        $scope.ChkRemark = true;
        //    }
        //    else {
        //        $scope.ChkRemark = false;
        //    }
        //}
    }

    $scope.SaveSpareingIssue = function (isValid, Spareingissue) {
        if (isValid == true) {
            if (Spareingissue.IsActive == true) {
                Spareingissue.IsActive = "1";

            }
            else {
                Spareingissue.IsActive = "0";
            }
            Spareingissue.SpareIsu_Qty = Spareingissue.SpareReq_Qty
            //Spareingissue.SpareIsu_VendorCode = Spareingissue.SpareIsu_VendorCode.join(",");
            if (Spareingissue.Spare_Status == 'C') {
                Spareingissue.SpareIsu_VendorCode_list = [""]
                Spareingissue.SpareIsu_Location = [""]
            }
            else {
                Spareingissue.SpareIsu_VendorCode_list = Spareingissue.SpareIsu_VendorCode_list.map(function (machine) {
                    return machine['id']
                })
                Spareingissue.SpareIsu_Location = Spareingissue.SpareIsu_Location.map(function (machine) {
                    return machine['id']
                })
                Spareingissue.SpareIsu_CurUnicode = Spareingissue.SpareIsu_CurUnicode.map(function (machine) {
                    return machine['id']
                })
                Spareingissue.SpareIsu_CurUnicode = Spareingissue.SpareIsu_CurUnicode.join();
                Spareingissue.SpareIsu_Location = Spareingissue.SpareIsu_Location.join();
                Spareingissue.SpareIsu_VendorCode = Spareingissue.SpareIsu_VendorCode_list.join();
                var location = Spareingissue.SpareIsu_Location
                var Vendor = Spareingissue.SpareIsu_VendorCode_list.join();
                //Need check
                //for (j = 0; j < $scope.FullSpareUploadList.length; j++) {
                //    if ($scope.FullSpareUploadList[j].SpareUniqueCode) {
                //        if ($scope.FullSpareUploadList[j].PartNumber == Spareingissue.SpareIsu_Partno && $scope.FullSpareUploadList[j].SpareUniqueCode == Spareingissue.SpareIsu_CurUnicode && parseFloat($scope.FullSpareUploadList[j].Quantity) > 0
                //            && $scope.FullSpareUploadList[j].Spare_Location == location && $scope.FullSpareUploadList[j].VendorCode == Vendor
                //        ) {
                //            Spareingissue.RegrainCode = $scope.FullSpareUploadList[j].InsertId;
                //            //return false;
                //        }
                //    }
                //}


            }

            var request = new SpareingissueServices.SaveSpareingIssue(Spareingissue);
            commonService.postWebService(request.url, request.param).then(function (response) {
                debugger;

                if (response.liSpareingIssue != null) {
                    if (response.liSpareingIssue[0].MSG == "Updated Success") {
                        $("#Message").val('Updated !! ');//Messgae
                        $('#Title').html('Spare Issue Update Successfully');//Title
                        $scope.init();
                        $scope.obj = null;
                        $scope.SpareIssueForm.$setPristine();
                        $("#Message").trigger("click");
                        //alert("Spare Uploaded Successfully")

                    }
                    else if (response.liSpareingIssue[0].MSG == "Spare Already Uploaded") {

                        $("#Message").val('Alter !! ');//Messgae
                        $('#Title').html('Part Number - "' + response.liSpareingIssue[0].PartNumber + '" Already Exists');//Title
                        // $("#Message").trigger("click");
                        $scope.obj.IsActive = true;
                    }
                    else if (response.liSpareingIssue[0].MSG == "Already Issued") {
                        $("#Message").val('Failed !! ');//Messgae
                        $('#Title').html('Already This Request Has Been Issued');//Title
                        $scope.init();
                        $scope.obj = null;
                        $scope.SpareIssueForm.$setPristine();
                        $("#Message").trigger("click");


                    }
                    else {
                        $("#Message").val('Saved !! ');//Messgae
                        $('#Title').html('Spare Issue Saved Successfully');//Title
                        $scope.init();
                        $scope.obj = null;
                        $scope.SpareIssueForm.$setPristine();
                        $("#Message").trigger("click");


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
        $scope.obj = new SpareingissueServices.SpareingissueData(row);
        myFunctionCompany();
    }



});
