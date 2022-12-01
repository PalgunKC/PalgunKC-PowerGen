var toolrequestApp = angular.module('toolrequestApp', ['datatables', 'commonApp']);

toolrequestApp.service('toolrequestServices', function () {

    this.toolrequestData = function (toolRequestmaster) {
        debugger;
        this.ToolReqReasonId = toolRequestmaster ? toolRequestmaster.ToolReqReasonId : null;
        this.ReasonCode = toolRequestmaster ? toolRequestmaster.ReasonCode : null;
        this.ReasonDetails = toolRequestmaster ? toolRequestmaster.ReasonDetails : null;
        this.OrgID = toolRequestmaster ? toolRequestmaster.OrgID : null;
        this.IsActive = toolRequestmaster ? toolRequestmaster.IsActive : null;
        this.CreatedBy = toolRequestmaster ? toolRequestmaster.CreatedBy : null;
        this.CreatedAt = toolRequestmaster ? toolRequestmaster.CreatedAt : null;
        this.ModifyBy = toolRequestmaster ? toolRequestmaster.ModifyBy : null;
        this.ModifyDate = toolRequestmaster ? toolRequestmaster.ModifyDate : null;
        this.KEY = toolRequestmaster ? toolRequestmaster.KEY : null;

    };

    this.SavetoolRequestmaster = function (data) {
        //debugger;
        this.url = "Tool/SaveToolRequestmaster";
        this.param = JSON.stringify(data);
    };
});
