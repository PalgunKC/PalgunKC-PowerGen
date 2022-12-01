var SpareingissueApp = angular.module('SpareingissueApp', ['datatables', 'commonApp', 'angularjs-dropdown-multiselect']);

SpareingissueApp.service('SpareingissueServices', function () {

    this.SpareingissueData = function (SpareingIssuemaster) {
        debugger;
        this.SpareIsu_id = SpareingIssuemaster ? SpareingIssuemaster.SpareIsu_id : null;
        this.SpareReq_id = SpareingIssuemaster ? SpareingIssuemaster.SpareReq_id : null;
        this.SpareIsu_datetime = SpareingIssuemaster ? SpareingIssuemaster.SpareIsu_datetime : null;
        this.SpareIsu_shift = SpareingIssuemaster ? SpareingIssuemaster.SpareIsu_shift : null;
        this.SpareIsu_Request_no = SpareingIssuemaster ? SpareingIssuemaster.SpareIsu_Request_no : null;
        this.SpareIsu_Partno = SpareingIssuemaster ? SpareingIssuemaster.SpareIsu_Partno : null;
        this.SpareIsu_Partname = SpareingIssuemaster ? SpareingIssuemaster.SpareIsu_Partname : null;
        this.SpareIsu_MachineCode = SpareingIssuemaster ? SpareingIssuemaster.SpareIsu_MachineCode : null;
        this.SpareIsu_MachineName = SpareingIssuemaster ? SpareingIssuemaster.SpareIsu_MachineName : null;
        this.SpareIsu_Linename = SpareingIssuemaster ? SpareingIssuemaster.SpareIsu_Linename : null;
        this.SpareIsu_Req_Employeeno = SpareingIssuemaster ? SpareingIssuemaster.SpareIsu_Req_Employeeno : null;
        this.SpareIsu_Req_Employeename = SpareingIssuemaster ? SpareingIssuemaster.SpareIsu_Req_Employeename : null;
        this.SpareReq_Qty = SpareingIssuemaster ? SpareingIssuemaster.SpareReq_Qty : null;
        this.SpareIsu_Qty = SpareingIssuemaster ? SpareingIssuemaster.SpareIsu_Qty : null;
        this.SpareIsu_AvailableQty = SpareingIssuemaster ? SpareingIssuemaster.SpareIsu_AvailableQty : null;
        this.SpareIsu_MinQty = SpareingIssuemaster ? SpareingIssuemaster.SpareIsu_MinQty : null;
        this.SpareIsu_MaxQty = SpareingIssuemaster ? SpareingIssuemaster.SpareIsu_MaxQty : null;
        this.SpareIsu_ReorderQty = SpareingIssuemaster ? SpareingIssuemaster.SpareIsu_ReorderQty : null;
        this.SpareIsu_Location = SpareingIssuemaster && SpareingIssuemaster.SpareIsu_Location ? SpareingIssuemaster.SpareIsu_Location: [];
        this.SpareIsu_PreUnicode = SpareingIssuemaster ? SpareingIssuemaster.SpareIsu_PreUnicode : null;
        //this.SpareIsu_CurUnicode = SpareingIssuemaster ? SpareingIssuemaster.SpareIsu_CurUnicode : null;
        this.SpareIsu_CurUnicode = SpareingIssuemaster && SpareingIssuemaster.SpareIsu_CurUnicode ? SpareingIssuemaster.SpareIsu_CurUnicode : [];
        this.SpareIsu_NoOfUnderWent_Regriding = SpareingIssuemaster ? SpareingIssuemaster.SpareIsu_NoOfUnderWent_Regriding : null;
        this.SpareIsu_LifeSpan = SpareingIssuemaster ? SpareingIssuemaster.SpareIsu_LifeSpan : null;
        this.SpareIsu_Employeeno = SpareingIssuemaster ? SpareingIssuemaster.SpareIsu_Employeeno : null;
        this.SpareIsu_Employeename = SpareingIssuemaster ? SpareingIssuemaster.SpareIsu_Employeename : null;
        this.SpareIsu_Cancle_Reason = SpareingIssuemaster ? SpareingIssuemaster.SpareIsu_Cancle_Reason : null;
        this.SpareIsu_Remarks = SpareingIssuemaster ? SpareingIssuemaster.SpareIsu_Remarks : null;
        this.SpareIsu_VendorCode_list = SpareingIssuemaster && SpareingIssuemaster.SpareIsu_VendorCode_list ? SpareingIssuemaster.SpareIsu_VendorCode_list : [];
        this.Spare_Status = SpareingIssuemaster ? SpareingIssuemaster.Spare_Status : null;
        this.IsActive = SpareingIssuemaster ? SpareingIssuemaster.IsActive : null;
        this.OrgID = SpareingIssuemaster ? SpareingIssuemaster.OrgID : null;
        this.CreatedBy = SpareingIssuemaster ? SpareingIssuemaster.CreatedBy : null;
        this.CreatedAt = SpareingIssuemaster ? SpareingIssuemaster.CreatedAt : null;
        this.ModifyBy = SpareingIssuemaster ? SpareingIssuemaster.ModifyBy : null;
        this.ModifyDate = SpareingIssuemaster ? SpareingIssuemaster.ModifyDate : null;
        this.dummy_col1 = SpareingIssuemaster ? SpareingIssuemaster.dummy_col1 : null;
        this.dummy_col2 = SpareingIssuemaster ? SpareingIssuemaster.dummy_col2 : null;
        this.KEY = SpareingIssuemaster ? SpareingIssuemaster.KEY : null;
        this.Sparetype = SpareingIssuemaster ? SpareingIssuemaster.Sparetype : null;
        this.Previous_UniCode = SpareingIssuemaster ? SpareingIssuemaster.Previous_UniCode : null;
        this.Is_Return = SpareingIssuemaster ? SpareingIssuemaster.Is_Return : null;
        this.PartId = SpareingIssuemaster ? SpareingIssuemaster.PartId : null;
        this.RegrainCode = SpareingIssuemaster ? SpareingIssuemaster.RegrainCode : null;
        this.Issued_Emp_Number = SpareingIssuemaster ? SpareingIssuemaster.Issued_Emp_Number : null;
        this.Issued_Emp_Name = SpareingIssuemaster ? SpareingIssuemaster.Issued_Emp_Name : null;
        this.Requested_Emp_Number = SpareingIssuemaster ? SpareingIssuemaster.Requested_Emp_Number : null;
        this.Requested_Emp_Name = SpareingIssuemaster ? SpareingIssuemaster.Requested_Emp_Name : null;
        this.Request_Reason = SpareingIssuemaster ? SpareingIssuemaster.Request_Reason : null;
        this.PartSpecification = SpareingIssuemaster ? SpareingIssuemaster.PartSpecification : null;


    };

    this.SaveSpareingIssue = function (data) {
        debugger;
        this.url = "Spare/SaveSpareingIssue";
        this.param = JSON.stringify(data);
    };
    this.GetVendorLocation = function (data) {
        debugger;
        this.url = "Spare/GetVendorLocation";
        this.param = JSON.stringify(data);
    };

});

SpareingissueApp.filter('unique', function () {
    return function (input, key) {
        var unique = {};
        var uniqueList = [];
        for (var i = 0; i < input.length; i++) {
            if (typeof unique[input[i][key]] == "undefined") {
                unique[input[i][key]] = "";
                uniqueList.push(input[i]);
            }
        }
        return uniqueList;
    };
});


