var sparepartmasterApp = angular.module('sparepartmasterApp', ['datatables', 'commonApp']);

sparepartmasterApp.service('sparepartmasterServices', function () {

    this.sparepartmasterData = function (sparepartMaster) {
        debugger;

        this.PartId = sparepartMaster ? sparepartMaster.PartId : null;
        this.PartNumber = sparepartMaster ? sparepartMaster.PartNumber : null;
        this.PartName = sparepartMaster ? sparepartMaster.PartName : null;
        this.PartSpecification = sparepartMaster ? sparepartMaster.PartSpecification : null;
        this.UOM = sparepartMaster ? sparepartMaster.UOM : null;
        this.CostPerUnit = sparepartMaster ? sparepartMaster.CostPerUnit : null;
        this.IsReusable = sparepartMaster ? sparepartMaster.IsReusable : null;
        this.SpareType = sparepartMaster ? sparepartMaster.SpareType : null;
        this.IsActive = sparepartMaster ? sparepartMaster.IsActive : null;
        this.OrgID = sparepartMaster ? sparepartMaster.OrgID : null;
        this.CreatedBy = sparepartMaster ? sparepartMaster.CreatedBy : null;
        this.CreatedAt = sparepartMaster ? sparepartMaster.CreatedAt : null;
        this.ModifyBy = sparepartMaster ? sparepartMaster.ModifyBy : null;
        this.ModifyDate = sparepartMaster ? sparepartMaster.ModifyDate : null;
        this.KEY = sparepartMaster ? sparepartMaster.KEY : null;
        this.Spare_Location = sparepartMaster ? sparepartMaster.Spare_Location : null;
        this.VendorCode = sparepartMaster ? sparepartMaster.VendorCode : null;
        this.VendorName = sparepartMaster ? sparepartMaster.VendorName : null;

        //From Update
        this.SubInv = sparepartMaster ? sparepartMaster.SubInv : null;
        this.ItemType = sparepartMaster ? sparepartMaster.ItemType : null;
        this.Min_qty = sparepartMaster ? sparepartMaster.Min_qty : null;
        this.Max_qty = sparepartMaster ? sparepartMaster.Max_qty : null;
        this.Reorder_qty = sparepartMaster ? sparepartMaster.Reorder_qty : null;
        this.LifeTime = sparepartMaster ? sparepartMaster.LifeTime : null;



    };

    this.SaveSparePartMaster = function (data) {
        debugger;
        this.url = "Spare/SaveSparePartMaster";
        this.param = JSON.stringify(data);
    };


});
