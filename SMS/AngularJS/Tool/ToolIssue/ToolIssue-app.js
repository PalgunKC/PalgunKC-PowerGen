var ToolingissueApp = angular.module('ToolingissueApp', ['datatables', 'commonApp', 'angularjs-dropdown-multiselect']);

ToolingissueApp.service('ToolingissueServices', function () {

    this.ToolingissueData = function (ToolingIssuemaster) {
        debugger;
        this.ToolIsu_id = ToolingIssuemaster ? ToolingIssuemaster.ToolIsu_id : null;
        this.ToolReq_id = ToolingIssuemaster ? ToolingIssuemaster.ToolReq_id : null;
        this.ToolIsu_datetime = ToolingIssuemaster ? ToolingIssuemaster.ToolIsu_datetime : null;
        this.ToolIsu_shift = ToolingIssuemaster ? ToolingIssuemaster.ToolIsu_shift : null;
        this.ToolIsu_Request_no = ToolingIssuemaster ? ToolingIssuemaster.ToolIsu_Request_no : null;
        this.ToolIsu_Partno = ToolingIssuemaster ? ToolingIssuemaster.ToolIsu_Partno : null;
        this.ToolIsu_Partname = ToolingIssuemaster ? ToolingIssuemaster.ToolIsu_Partname : null;
        this.ToolIsu_MachineCode = ToolingIssuemaster ? ToolingIssuemaster.ToolIsu_MachineCode : null;
        this.ToolIsu_MachineName = ToolingIssuemaster ? ToolingIssuemaster.ToolIsu_MachineName : null;
        this.ToolIsu_Linename = ToolingIssuemaster ? ToolingIssuemaster.ToolIsu_Linename : null;
        this.ToolIsu_Req_Employeeno = ToolingIssuemaster ? ToolingIssuemaster.ToolIsu_Req_Employeeno : null;
        this.ToolIsu_Req_Employeename = ToolingIssuemaster ? ToolingIssuemaster.ToolIsu_Req_Employeename : null;
        this.ToolReq_Qty = ToolingIssuemaster ? ToolingIssuemaster.ToolReq_Qty : null;
        this.ToolIsu_Qty = ToolingIssuemaster ? ToolingIssuemaster.ToolIsu_Qty : null;
        this.ToolIsu_AvailableQty = ToolingIssuemaster ? ToolingIssuemaster.ToolIsu_AvailableQty : null;
        this.ToolIsu_MinQty = ToolingIssuemaster ? ToolingIssuemaster.ToolIsu_MinQty : null;
        this.ToolIsu_MaxQty = ToolingIssuemaster ? ToolingIssuemaster.ToolIsu_MaxQty : null;
        this.ToolIsu_ReorderQty = ToolingIssuemaster ? ToolingIssuemaster.ToolIsu_ReorderQty : null;
        this.ToolIsu_Location = ToolingIssuemaster && ToolingIssuemaster.ToolIsu_Location ? ToolingIssuemaster.ToolIsu_Location : [];
        this.ToolIsu_PreUnicode = ToolingIssuemaster ? ToolingIssuemaster.ToolIsu_PreUnicode : null;
        //this.ToolIsu_CurUnicode = ToolingIssuemaster ? ToolingIssuemaster.ToolIsu_CurUnicode : null;
        this.ToolIsu_CurUnicode = ToolingIssuemaster && ToolingIssuemaster.ToolIsu_CurUnicode ? ToolingIssuemaster.ToolIsu_CurUnicode  : [];
        this.ToolIsu_NoOfUnderWent_Regriding = ToolingIssuemaster ? ToolingIssuemaster.ToolIsu_NoOfUnderWent_Regriding : null;
        this.ToolIsu_LifeSpan = ToolingIssuemaster ? ToolingIssuemaster.ToolIsu_LifeSpan : null;
        this.ToolIsu_Employeeno = ToolingIssuemaster ? ToolingIssuemaster.ToolIsu_Employeeno : null;
        this.ToolIsu_Employeename = ToolingIssuemaster ? ToolingIssuemaster.ToolIsu_Employeename : null;
        this.ToolIsu_Cancle_Reason = ToolingIssuemaster ? ToolingIssuemaster.ToolIsu_Cancle_Reason : null;
        this.ToolIsu_Remarks = ToolingIssuemaster ? ToolingIssuemaster.ToolIsu_Remarks : null;
        this.ToolIsu_VendorCode_list = ToolingIssuemaster && ToolingIssuemaster.ToolIsu_VendorCode_list ? ToolingIssuemaster.ToolIsu_VendorCode_list : [];
        this.Tool_Status = ToolingIssuemaster ? ToolingIssuemaster.Tool_Status : null;
        this.IsActive = ToolingIssuemaster ? ToolingIssuemaster.IsActive : null;
        this.OrgID = ToolingIssuemaster ? ToolingIssuemaster.OrgID : null;
        this.CreatedBy = ToolingIssuemaster ? ToolingIssuemaster.CreatedBy : null;
        this.CreatedAt = ToolingIssuemaster ? ToolingIssuemaster.CreatedAt : null;
        this.ModifyBy = ToolingIssuemaster ? ToolingIssuemaster.ModifyBy : null;
        this.ModifyDate = ToolingIssuemaster ? ToolingIssuemaster.ModifyDate : null;
        this.dummy_col1 = ToolingIssuemaster ? ToolingIssuemaster.dummy_col1 : null;
        this.dummy_col2 = ToolingIssuemaster ? ToolingIssuemaster.dummy_col2 : null;
        this.KEY = ToolingIssuemaster ? ToolingIssuemaster.KEY : null;
        this.Tooltype = ToolingIssuemaster ? ToolingIssuemaster.Tooltype : null;
        this.Previous_UniCode = ToolingIssuemaster ? ToolingIssuemaster.Previous_UniCode : null;
        this.Is_Return = ToolingIssuemaster ? ToolingIssuemaster.Is_Return : null;
        this.PartId = ToolingIssuemaster ? ToolingIssuemaster.PartId : null;
        this.RegrainCode = ToolingIssuemaster ? ToolingIssuemaster.RegrainCode : null;
        this.Issued_Emp_Number = ToolingIssuemaster ? ToolingIssuemaster.Issued_Emp_Number : null;
        this.Issued_Emp_Name = ToolingIssuemaster ? ToolingIssuemaster.Issued_Emp_Name : null;
        this.Requested_Emp_Number = ToolingIssuemaster ? ToolingIssuemaster.Requested_Emp_Number : null;
        this.Requested_Emp_Name = ToolingIssuemaster ? ToolingIssuemaster.Requested_Emp_Name : null;
        this.PartSpecification = ToolingIssuemaster ? ToolingIssuemaster.PartSpecification : null;
        //Pending
        this.Request_Reason = ToolingIssuemaster ? ToolingIssuemaster.Request_Reason : null;

    };

    this.SaveToolingIssue = function (data) {
        debugger;
        this.url = "Tool/SaveToolingIssue";
        this.param = JSON.stringify(data);
    };
    this.GetVendorLocation = function (data) {
        debugger;
        this.url = "Tool/GetVendorLocation";
        this.param = JSON.stringify(data);
    };

});

ToolingissueApp.filter('unique', function () {
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
