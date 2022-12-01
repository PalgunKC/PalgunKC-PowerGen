var sparerequestApp = angular.module('sparerequestApp', ['datatables', 'commonApp']);

sparerequestApp.service('sparerequestServices', function () {

    this.sparerequestData = function (spareRequestmaster) {
        debugger;
        this.SpareReqReasonId = spareRequestmaster ? spareRequestmaster.SpareReqReasonId : null;
        this.ReasonCode = spareRequestmaster ? spareRequestmaster.ReasonCode : null;
        this.ReasonDetails = spareRequestmaster ? spareRequestmaster.ReasonDetails : null;
        this.OrgID = spareRequestmaster ? spareRequestmaster.OrgID : null;
        this.IsActive = spareRequestmaster ? spareRequestmaster.IsActive : null;
        this.CreatedBy = spareRequestmaster ? spareRequestmaster.CreatedBy : null;
        this.CreatedAt = spareRequestmaster ? spareRequestmaster.CreatedAt : null;
        this.ModifyBy = spareRequestmaster ? spareRequestmaster.ModifyBy : null;
        this.ModifyDate = spareRequestmaster ? spareRequestmaster.ModifyDate : null;
        this.KEY = spareRequestmaster ? spareRequestmaster.KEY : null;

    };

    this.SaveSpareRequestmaster = function (data) {
        //debugger;
        this.url = "Spare/SaveSpareRequestmaster";
        this.param = JSON.stringify(data);
    };
});
