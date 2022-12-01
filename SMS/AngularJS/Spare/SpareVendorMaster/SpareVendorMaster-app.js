var sparevendorApp = angular.module('sparevendorApp', ['datatables', 'commonApp']);

sparevendorApp.service('sparevendorServices', function () {

    this.sparevendorData = function (spareVendormaster) {
        debugger;

      

        this.VendorId = spareVendormaster ? spareVendormaster.VendorId : null;
        this.Type = spareVendormaster ? spareVendormaster.Type : null;
        this.Supp_No = spareVendormaster ? spareVendormaster.Supp_No : null;
        this.Department = spareVendormaster ? spareVendormaster.Department : null;
        this.VendorName = spareVendormaster ? spareVendormaster.VendorName : null;
        this.site = spareVendormaster ? spareVendormaster.site : null;
        this.VendorAddress = spareVendormaster ? spareVendormaster.VendorAddress : null;
        this.VendorLocation = spareVendormaster ? spareVendormaster.VendorLocation : null;
        this.GSTNo = spareVendormaster ? spareVendormaster.GSTNo : null;
        this.PANNo = spareVendormaster ? spareVendormaster.PANNo : null;
        this.Account_Number = spareVendormaster ? spareVendormaster.Account_Number : null;
        this.Term = spareVendormaster ? spareVendormaster.Term : null;
        this.Prepay_Description = spareVendormaster ? spareVendormaster.Prepay_Description : null;
        this.Site_Pay_Group = spareVendormaster ? spareVendormaster.Site_Pay_Group : null;
        this.Bank_Name = spareVendormaster ? spareVendormaster.Bank_Name : null;
        this.Account_Name = spareVendormaster ? spareVendormaster.Account_Name : null;
        this.section_code = spareVendormaster ? spareVendormaster.section_code : null;
        this.Tax_Name = spareVendormaster ? spareVendormaster.Tax_Name : null;
        this.TDS_Vendor_Type = spareVendormaster ? spareVendormaster.TDS_Vendor_Type : null;
        this.PayDateBasis = spareVendormaster ? spareVendormaster.PayDateBasis : null;
        this.VendorSiteId = spareVendormaster ? spareVendormaster.VendorSiteId : null;
        this.VendorCode = spareVendormaster ? spareVendormaster.VendorCode : null;
        this.Vend_StartDate = spareVendormaster ? spareVendormaster.Vend_StartDate : null;
        this.Vend_EndDate = spareVendormaster ? spareVendormaster.Vend_EndDate : null;
        this.Vend_CreationDate = spareVendormaster ? spareVendormaster.Vend_CreationDate : null;
        this.PaymentCurrencyCode = spareVendormaster ? spareVendormaster.PaymentCurrencyCode : null;
        this.Contact_name1 = spareVendormaster ? spareVendormaster.Contact_name1 : null;
        this.Contact_mobileno1 = spareVendormaster ? spareVendormaster.Contact_mobileno1 : null;
        this.Contact_emailid1 = spareVendormaster ? spareVendormaster.Contact_emailid1 : null;
        this.Contact_name2 = spareVendormaster ? spareVendormaster.Contact_name2 : null;
        this.Contact_mobileno2 = spareVendormaster ? spareVendormaster.Contact_mobileno2 : null;
        this.Contact_emailid2 = spareVendormaster ? spareVendormaster.Contact_emailid2 : null;
        this.OrgID = spareVendormaster ? spareVendormaster.OrgID : null;
        this.EmailId = spareVendormaster ? spareVendormaster.EmailId : null;
        this.IsActive = spareVendormaster ? spareVendormaster.IsActive : null;
        this.CreatedBy = spareVendormaster ? spareVendormaster.CreatedBy : null;
        this.CreatedAt = spareVendormaster ? spareVendormaster.CreatedAt : null;
        this.ModifyBy = spareVendormaster ? spareVendormaster.ModifyBy : null;
        this.ModifyDate = spareVendormaster ? spareVendormaster.ModifyDate : null;
        this.KEY = spareVendormaster ? spareVendormaster.KEY : null;

    };

    this.SaveSpareVendormaster = function (data) {
        //debugger;
        this.url = "Spare/SaveSpareVendormaster";
        this.param = JSON.stringify(data);
    };
    this.BindCity = function (data) {
        this.url = "Spare/BindCity";
        this.param = JSON.stringify(data);
    };

});
