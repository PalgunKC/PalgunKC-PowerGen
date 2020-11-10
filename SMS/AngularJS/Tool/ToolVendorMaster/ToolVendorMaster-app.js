var toolvendorApp = angular.module('toolvendorApp', ['datatables', 'commonApp']);

toolvendorApp.service('toolvendorServices', function () {

    this.toolvendorData = function (toolVendormaster) {
        debugger;

        this.VendorId = toolVendormaster ? toolVendormaster.VendorId : null;
        this.VendorName = toolVendormaster ? toolVendormaster.VendorName : null;
        this.VendorCode = toolVendormaster ? toolVendormaster.VendorCode : null;
        this.VendorAddress = toolVendormaster ? toolVendormaster.VendorAddress : null;
        this.VendorLocation = toolVendormaster ? toolVendormaster.VendorLocation : null;
        this.Pincode = toolVendormaster ? toolVendormaster.Pincode : null;
        this.PhoneNo = toolVendormaster ? toolVendormaster.PhoneNo : null;
        this.EmailId = toolVendormaster ? toolVendormaster.EmailId : null;
        this.StateId = toolVendormaster ? toolVendormaster.StateId : null;
        this.CityId = toolVendormaster ? toolVendormaster.CityId : null;
        this.IsActive = toolVendormaster ? toolVendormaster.IsActive : null;
        this.OrgID = toolVendormaster ? toolVendormaster.OrgID : null;
        this.CreatedBy = toolVendormaster ? toolVendormaster.CreatedBy : null;
        this.CreatedAt = toolVendormaster ? toolVendormaster.CreatedAt : null;
        this.ModifyBy = toolVendormaster ? toolVendormaster.ModifyBy : null;
        this.ModifyDate = toolVendormaster ? toolVendormaster.ModifyDate : null;
        this.KEY = toolVendormaster ? toolVendormaster.KEY : null;
        this.VendorType = toolVendormaster ? toolVendormaster.VendorType : null;

    };

    this.SaveToolVendormaster = function (data) {
        debugger;
        this.url = "Tool/SaveToolVendormaster";
        this.param = JSON.stringify(data);
    };
    this.BindCity = function (data) {
        this.url = "Tool/BindCity";
        this.param = JSON.stringify(data);
    };

});
