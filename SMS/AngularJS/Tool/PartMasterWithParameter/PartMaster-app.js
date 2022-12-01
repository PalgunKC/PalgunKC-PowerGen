var partmasterApp = angular.module('partmasterApp', ['datatables', 'commonApp']);

partmasterApp.service('partmasterServices', function () {

    this.partmasterData = function (partMaster) {
        debugger;

        this.PartId = partMaster ? partMaster.PartId : null;
        this.PartNumber = partMaster ? partMaster.PartNumber : null;
        this.PartName = partMaster ? partMaster.PartName : null;
        this.PartSpecification = partMaster ? partMaster.PartSpecification : null;
        this.UOM = partMaster ? partMaster.UOM : null;
        this.CostPerUnit = partMaster ? partMaster.CostPerUnit : null;
        this.IsReusable = partMaster ? partMaster.IsReusable : null;
        this.SpareType = partMaster ? partMaster.SpareType : null;
        this.IsActive = partMaster ? partMaster.IsActive : null;
        this.OrgID = partMaster ? partMaster.OrgID : null;
        this.CreatedBy = partMaster ? partMaster.CreatedBy : null;
        this.CreatedAt = partMaster ? partMaster.CreatedAt : null;
        this.ModifyBy = partMaster ? partMaster.ModifyBy : null;
        this.ModifyDate = partMaster ? partMaster.ModifyDate : null;
        this.KEY = partMaster ? partMaster.KEY : null;
        this.Tool_Location = partMaster ? partMaster.Tool_Location : null;
        this.VendorCode = partMaster ? partMaster.VendorCode : null;
        this.VendorName = partMaster ? partMaster.VendorName : null;
        this.ProductGroup = partMaster ? partMaster.ProductGroup : null;

        //From Update
        this.SubInv = partMaster ? partMaster.SubInv : null;
        this.ItemType = partMaster ? partMaster.ItemType : null;
        this.Min_qty = partMaster ? partMaster.Min_qty : null;
        this.Max_qty = partMaster ? partMaster.Max_qty : null;
        this.Reorder_qty = partMaster ? partMaster.Reorder_qty : null;
        this.LifeTime = partMaster ? partMaster.LifeTime : null;

        

    };

    this.SavePartMaster = function (data) {
        debugger;
        this.url = "Tool/SavePartMaster";
        this.param = JSON.stringify(data);
    };
    

});
