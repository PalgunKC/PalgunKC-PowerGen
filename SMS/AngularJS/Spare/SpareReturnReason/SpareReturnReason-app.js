var sparereturnApp = angular.module('sparereturnApp', ['datatables', 'commonApp']);

sparereturnApp.service('sparereturnServices', function () {

    this.sparereturnData = function (spareReturnmaster) {
        debugger;
        this.SparereturnReasonId = spareReturnmaster ? spareReturnmaster.SparereturnReasonId : null;
        this.ReasonCode = spareReturnmaster ? spareReturnmaster.ReasonCode : null;
        this.ReasonDetails = spareReturnmaster ? spareReturnmaster.ReasonDetails : null;
        this.OrgID = spareReturnmaster ? spareReturnmaster.OrgID : null;
        this.IsActive = spareReturnmaster ? spareReturnmaster.IsActive : null;
        this.CreatedBy = spareReturnmaster ? spareReturnmaster.CreatedBy : null;
        this.CreatedAt = spareReturnmaster ? spareReturnmaster.CreatedAt : null;
        this.ModifyBy = spareReturnmaster ? spareReturnmaster.ModifyBy : null;
        this.ModifyDate = spareReturnmaster ? spareReturnmaster.ModifyDate : null;
        this.KEY = spareReturnmaster ? spareReturnmaster.KEY : null;

    };

    this.SavespareReturnmaster = function (data) {
        //debugger;
        this.url = "Spare/SaveSpareReturnmaster";
        this.param = JSON.stringify(data);
    };
});
