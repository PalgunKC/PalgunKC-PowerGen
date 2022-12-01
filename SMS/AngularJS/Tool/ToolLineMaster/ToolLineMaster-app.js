var toollineApp = angular.module('toollineApp', ['datatables', 'commonApp']);

toollineApp.service('toollineServices', function () {

    this.toollineData = function (toolLinemaster) {
        debugger;
        this.LineRowId = toolLinemaster ? toolLinemaster.LineRowId : null;
        this.LineName = toolLinemaster ? toolLinemaster.LineName : null;
        this.IsActive = toolLinemaster ? toolLinemaster.IsActive : null;
        this.OrgID = toolLinemaster ? toolLinemaster.OrgID : null;
        this.CreatedBy = toolLinemaster ? toolLinemaster.CreatedBy : null;
        this.CreatedAt = toolLinemaster ? toolLinemaster.CreatedAt : null;
        this.ModifyBy = toolLinemaster ? toolLinemaster.ModifyBy : null;
        this.ModifyDate = toolLinemaster ? toolLinemaster.ModifyDate : null;
        this.KEY = toolLinemaster ? toolLinemaster.KEY : null;

    };

    this.SavetoolLinemaster = function (data) {
        debugger;
        this.url = "Tool/SavetoolLinemaster";
        this.param = JSON.stringify(data);
    };

});
