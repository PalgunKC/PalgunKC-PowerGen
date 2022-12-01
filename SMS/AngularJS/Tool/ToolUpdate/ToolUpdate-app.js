var toolupdateApp = angular.module('toolupdateApp', ['datatables', 'commonApp']);

toolupdateApp.service('toolupdateServices', function () {

    this.toolupdateData = function (toolUpdate) {
        debugger;

        this.ToolUpdateId = toolUpdate ? toolUpdate.ToolUpdateId : null;
        this.SubInv = toolUpdate ? toolUpdate.SubInv : null;
        this.ItemType = toolUpdate ? toolUpdate.ItemType : null;
        this.PartNumber = toolUpdate ? toolUpdate.PartNumber : null;
        this.PartName = toolUpdate ? toolUpdate.PartName : null;
        this.Quantity = toolUpdate ? toolUpdate.Quantity : null;
        this.ToolUniqueCode = toolUpdate ? toolUpdate.ToolUniqueCode : null;
        this.Min_qty = toolUpdate ? toolUpdate.Min_qty : null;
        this.Max_qty = toolUpdate ? toolUpdate.Max_qty : null;
        this.Reorder_qty = toolUpdate ? toolUpdate.Reorder_qty : null;
        this.Tool_Location = toolUpdate ? toolUpdate.Tool_Location : null;
        this.LifeTime = toolUpdate ? toolUpdate.LifeTime : null;
        this.IsActive = toolUpdate ? toolUpdate.IsActive : null;
        this.OrgID = toolUpdate ? toolUpdate.OrgID : null;
        this.CreatedBy = toolUpdate ? toolUpdate.CreatedBy : null;
        this.CreatedAt = toolUpdate ? toolUpdate.CreatedAt : null;
        this.ModifyBy = toolUpdate ? toolUpdate.ModifyBy : null;
        this.ModifyDate = toolUpdate ? toolUpdate.ModifyDate : null;
        this.ToolUploadId = toolUpdate ? toolUpdate.ToolUploadId : null;
        
        this.KEY = toolUpdate ? toolUpdate.KEY : null;
        

    };

    this.SaveToolUpdate = function (data) {
        debugger;
        this.url = "Tool/SaveToolUpdate";
        this.param = JSON.stringify(data);
    };
    

});
