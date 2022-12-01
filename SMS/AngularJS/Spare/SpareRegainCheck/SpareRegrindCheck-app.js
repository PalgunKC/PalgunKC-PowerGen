var SpareRegrindcheckApp = angular.module('SpareRegrindcheckApp', ['datatables', 'commonApp', 'angularjs-dropdown-multiselect']);

SpareRegrindcheckApp.service('spareingregrindcheckServices', function () {

    this.spareingreturnData = function (spareingReturnmaster) {
        debugger;


        this.VendorCode = spareingReturnmaster ? spareingReturnmaster.VendorCode : null;
        this.VendorName = spareingReturnmaster ? spareingReturnmaster.VendorName : null;
        this.SpareRts_id = spareingReturnmaster ? spareingReturnmaster.SpareRts_id : null;
        this.SpareIsu_id = spareingReturnmaster ? spareingReturnmaster.SpareIsu_id : null;
        this.SpareRts_datetime = spareingReturnmaster ? spareingReturnmaster.SpareRts_datetime : null;
        this.SpareRts_shift = spareingReturnmaster ? spareingReturnmaster.SpareRts_shift : null;
        this.SpareRts_Return_no = spareingReturnmaster ? spareingReturnmaster.SpareRts_Return_no : null;
        this.SpareRts_Partno = spareingReturnmaster ? spareingReturnmaster.SpareRts_Partno : null;
        this.SpareRts_Partname = spareingReturnmaster ? spareingReturnmaster.SpareRts_Partname : null;
        this.SpareRts_MachineCode = spareingReturnmaster ? spareingReturnmaster.SpareRts_MachineCode : null;
        this.SpareRts_MachineName = spareingReturnmaster ? spareingReturnmaster.SpareRts_MachineName : null;
        this.SpareRts_Linename = spareingReturnmaster ? spareingReturnmaster.SpareRts_Linename : null;
        this.SpareRts_Unicode = spareingReturnmaster ? spareingReturnmaster.SpareRts_Unicode : null;
        this.SpareRqt_datetime = spareingReturnmaster ? spareingReturnmaster.SpareRqt_datetime : null;
        this.SpareIsu_datetime = spareingReturnmaster ? spareingReturnmaster.SpareIsu_datetime : null;
        this.SpareRts_LifeAchived = spareingReturnmaster ? spareingReturnmaster.SpareRts_LifeAchived : null;
        this.SpareRts_Model = spareingReturnmaster ? spareingReturnmaster.SpareRts_Model : null;
        this.SpareRts_Responsible_Dept = spareingReturnmaster ? spareingReturnmaster.SpareRts_Responsible_Dept : null;
        this.SpareRts_Responsible_Person = spareingReturnmaster ? spareingReturnmaster.SpareRts_Responsible_Person : null;
        this.SpareRts_Corrective_Action = spareingReturnmaster ? spareingReturnmaster.SpareRts_Corrective_Action : null;
        this.SpareRts_Reason = spareingReturnmaster ? spareingReturnmaster.SpareRts_Reason : null;
        this.SpareRts_Remarks = spareingReturnmaster ? spareingReturnmaster.SpareRts_Remarks : null;
        this.SpareRts_Qty = spareingReturnmaster ? spareingReturnmaster.SpareRts_Qty : null;
        this.Spare_Status = spareingReturnmaster ? spareingReturnmaster.Spare_Status : null;
        this.IsActive = spareingReturnmaster ? spareingReturnmaster.IsActive : null;
        this.OrgID = spareingReturnmaster ? spareingReturnmaster.OrgID : null;
        this.CreatedBy = spareingReturnmaster ? spareingReturnmaster.CreatedBy : null;
        this.CreatedAt = spareingReturnmaster ? spareingReturnmaster.CreatedAt : null;
        this.ModifyBy = spareingReturnmaster ? spareingReturnmaster.ModifyBy : null;
        this.ModifyDate = spareingReturnmaster ? spareingReturnmaster.ModifyDate : null;
        this.dummy_col1 = spareingReturnmaster ? spareingReturnmaster.dummy_col1 : null;
        this.dummy_col2 = spareingReturnmaster ? spareingReturnmaster.dummy_col2 : null;
        this.KEY = spareingReturnmaster ? spareingReturnmaster.KEY : null;       
        this.SpareRts_plant = spareingReturnmaster ? spareingReturnmaster.SpareRts_plant : null;
        this.SpareRts_PartSpecification = spareingReturnmaster ? spareingReturnmaster.SpareRts_PartSpecification : null;
        this.SpareRts_AvailableQty = spareingReturnmaster ? spareingReturnmaster.SpareRts_AvailableQty : null;

        this.Machinecode = spareingReturnmaster && spareingReturnmaster.Machinecode ? spareingReturnmaster.Machinecode : [];
        this.LineMachine_Map_Id = spareingReturnmaster ? spareingReturnmaster.LineMachine_Map_Id : null;
        this.LineMachine_Line_Code = spareingReturnmaster ? spareingReturnmaster.LineMachine_Line_Code : null;
        this.LineMachine_Machine_Code = spareingReturnmaster ? spareingReturnmaster.LineMachine_Machine_Code : null;


        this.SpareReg_id = spareingReturnmaster ? spareingReturnmaster.SpareReg_id : null;
        //this.SpareRts_id = spareingReturnmaster ? spareingReturnmaster.SpareRts_id : null;
        this.SpareReg_datetime = spareingReturnmaster ? spareingReturnmaster.SpareReg_datetime : null;
        this.SpareReg_shift = spareingReturnmaster ? spareingReturnmaster.SpareReg_shift : null;
        this.SpareReg_Regrain_no = spareingReturnmaster ? spareingReturnmaster.SpareReg_Regrain_no : null;
        this.SpareReg_Unicode = spareingReturnmaster ? spareingReturnmaster.SpareReg_Unicode : null;
        this.SpareReg_LifeAchived = spareingReturnmaster ? spareingReturnmaster.SpareReg_LifeAchived : null;
        this.SpareReg_Model = spareingReturnmaster ? spareingReturnmaster.SpareReg_Model : null;
        this.SpareReg_Responsible_Dept = spareingReturnmaster ? spareingReturnmaster.SpareReg_Responsible_Dept : null;
        this.SpareReg_Responsible_Person = spareingReturnmaster ? spareingReturnmaster.SpareReg_Responsible_Person : null;
        this.SpareReg_Corrective_Action = spareingReturnmaster ? spareingReturnmaster.SpareReg_Corrective_Action : null;
        this.SpareReg_Reason = spareingReturnmaster ? spareingReturnmaster.SpareReg_Reason : null;
        this.SpareReg_Remarks = spareingReturnmaster ? spareingReturnmaster.SpareReg_Remarks : null;
        this.SpareReg_Qty = spareingReturnmaster ? spareingReturnmaster.SpareReg_Qty : null;
        this.SpareReg_Unit_Cost = spareingReturnmaster ? spareingReturnmaster.SpareReg_Unit_Cost : null;
        this.SpareReg_VendorCode = spareingReturnmaster ? spareingReturnmaster.SpareReg_VendorCode : null;
        this.SpareReg_VendorName = spareingReturnmaster ? spareingReturnmaster.SpareReg_VendorName : null;

        this.SpareReg_RDC_Number = spareingReturnmaster ? spareingReturnmaster.SpareReg_RDC_Number : null;
        this.SpareReg_Vend_ExpDate = spareingReturnmaster ? spareingReturnmaster.SpareReg_Vend_ExpDate : null;
        this.Return_Status = spareingReturnmaster ? spareingReturnmaster.Return_Status : null;
        this.Spare_Location = spareingReturnmaster ? spareingReturnmaster.Spare_Location : null;
        this.PartId = spareingReturnmaster ? spareingReturnmaster.PartId : null;
        this.SpareReg_RegrainPartNo = spareingReturnmaster ? spareingReturnmaster.SpareReg_RegrainPartNo : null;
        this.Regrained_Emp_Number_Update = spareingReturnmaster ? spareingReturnmaster.Regrained_Emp_Number_Update : null;
        this.Regrained_Emp_Name_Update = spareingReturnmaster ? spareingReturnmaster.Regrained_Emp_Name_Update : null;
        this.Regrained_Emp_Number = spareingReturnmaster ? spareingReturnmaster.Regrained_Emp_Number : null;
        this.Regrained_Emp_Name = spareingReturnmaster ? spareingReturnmaster.Regrained_Emp_Name : null;
    };

    this.SaveRegrindCheck = function (data) {
        debugger;
        this.url = "Spare/SaveRegrindCheck";
        this.param = JSON.stringify(data);
    };

    this.getLineDetails = function (data) {
        debugger;
        this.url = "Spare/GetLineDetailsReturn";
        this.param = JSON.stringify(data);
    };

});

SpareRegrindcheckApp.filter('unique', function () {
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


var directiveModule = angular.module('angularjs-dropdown-multiselect', []);

directiveModule.directive('ngDropdownMultiselect', ['$filter', '$document', '$compile', '$parse',

function ($filter, $document, $compile, $parse) {

    return {
        restrict: 'AE',
        scope: {
            selectedModel: '=',
            options: '=',
            extraSettings: '=',
            events: '=',
            searchFilter: '=?',
            translationTexts: '=',
            groupBy: '@'
        },
        template: function (element, attrs) {
            var checkboxes = attrs.checkboxes ? true : false;
            var groups = attrs.groupBy ? true : false;

            var template = '<div class="multiselect-parent btn-group dropdown-multiselect">';
            template += '<button type="button" class="dropdown-toggle" ng-class="settings.buttonClasses" ng-click="toggleDropdown()">{{getButtonText()}}&nbsp;<span class="caret"></span></button>';
            template += '<ul class="dropdown-menu dropdown-menu-form" ng-style="{display: open ? \'block\' : \'none\', height : settings.scrollable ? settings.scrollableHeight : \'auto\', width : settings.Width ? settings.dropdownWidth : \'auto\' }" style="overflow: scroll" >';
            template += '<li ng-hide="!settings.showCheckAll || settings.selectionLimit > 0"><a data-ng-click="selectAll()"><span class="glyphicon glyphicon-ok"></span>  {{texts.checkAll}}</a>';
            template += '<li ng-show="settings.showUncheckAll"><a data-ng-click="deselectAll();"><span class="glyphicon glyphicon-remove"></span>   {{texts.uncheckAll}}</a></li>';
            template += '<li ng-hide="(!settings.showCheckAll || settings.selectionLimit > 0) && !settings.showUncheckAll" class="divider"></li>';
            template += '<li ng-show="settings.enableSearch"><div class="dropdown-header"><input type="text" class="form-control" style="width: 100%;" ng-model="searchFilter" placeholder="{{texts.searchPlaceholder}}" /></li>';
            template += '<li ng-show="settings.enableSearch" class="divider"></li>';

            if (groups) {
                template += '<li ng-repeat-start="option in orderedItems | filter: searchFilter" ng-show="getPropertyForObject(option, settings.groupBy) !== getPropertyForObject(orderedItems[$index - 1], settings.groupBy)" role="presentation" class="dropdown-header">{{ getGroupTitle(getPropertyForObject(option, settings.groupBy)) }}</li>';
                template += '<li ng-repeat-end role="presentation">';
            } else {
                template += '<li role="presentation" ng-repeat="option in options | filter: searchFilter">';
            }

            template += '<a role="menuitem" tabindex="-1" ng-click="setSelectedItem(getPropertyForObject(option,settings.idProp))">';

            if (checkboxes) {
                template += '<div class="checkbox"><label><input class="checkboxInput" type="checkbox" ng-click="checkboxClick($event, getPropertyForObject(option,settings.idProp))" ng-checked="isChecked(getPropertyForObject(option,settings.idProp))" /> {{getPropertyForObject(option, settings.displayProp)}}</label></div></a>';
            } else {
                template += '<span data-ng-class="{\'glyphicon glyphicon-ok\': isChecked(getPropertyForObject(option,settings.idProp))}"></span> {{getPropertyForObject(option, settings.displayProp)}}</a>';
            }

            template += '</li>';

            template += '<li class="divider" ng-show="settings.selectionLimit > 1"></li>';
            template += '<li role="presentation" ng-show="settings.selectionLimit > 1"><a role="menuitem">{{selectedModel.length}} {{texts.selectionOf}} {{settings.selectionLimit}} {{texts.selectionCount}}</a></li>';

            template += '</ul>';
            template += '</div>';

            element.html(template);
        },
        link: function ($scope, $element, $attrs) {
            var $dropdownTrigger = $element.children()[0];

            $scope.toggleDropdown = function () {
                $scope.open = !$scope.open;
            };

            $scope.checkboxClick = function ($event, id) {
                $scope.setSelectedItem(id);
                $event.stopImmediatePropagation();
            };

            $scope.externalEvents = {
                onItemSelect: angular.noop,
                onItemDeselect: angular.noop,
                onSelectAll: angular.noop,
                onDeselectAll: angular.noop,
                onInitDone: angular.noop,
                onMaxSelectionReached: angular.noop
            };

            $scope.settings = {
                dynamicTitle: true,
                scrollable: false,
                scrollableHeight: '300px',
                closeOnBlur: true,
                displayProp: 'label',
                idProp: 'id',
                externalIdProp: 'id',
                enableSearch: false,
                selectionLimit: 0,
                showCheckAll: true,
                showUncheckAll: true,
                closeOnSelect: false,
                buttonClasses: 'btn btn-default',
                closeOnDeselect: false,
                groupBy: $attrs.groupBy || undefined,
                groupByTextProvider: null,
                smartButtonMaxItems: 0,
                smartButtonTextConverter: angular.noop
            };

            $scope.texts = {
                checkAll: 'Check All',
                uncheckAll: 'Uncheck All',
                selectionCount: 'checked',
                selectionOf: '/',
                searchPlaceholder: 'Search...',
                buttonDefaultText: 'Select',
                dynamicButtonTextSuffix: 'checked'
            };

            $scope.searchFilter = $scope.searchFilter || '';

            if (angular.isDefined($scope.settings.groupBy)) {
                $scope.$watch('options', function (newValue) {
                    if (angular.isDefined(newValue)) {
                        $scope.orderedItems = $filter('orderBy')(newValue, $scope.settings.groupBy);
                    }
                });
            }

            angular.extend($scope.settings, $scope.extraSettings || []);
            angular.extend($scope.externalEvents, $scope.events || []);
            angular.extend($scope.texts, $scope.translationTexts);

            $scope.singleSelection = $scope.settings.selectionLimit === 1;

            function getFindObj(id) {
                var findObj = {};

                if ($scope.settings.externalIdProp === '') {
                    findObj[$scope.settings.idProp] = id;
                } else {
                    findObj[$scope.settings.externalIdProp] = id;
                }

                return findObj;
            }

            function clearObject(object) {
                for (var prop in object) {
                    delete object[prop];
                }
            }

            if ($scope.singleSelection) {
                if (angular.isArray($scope.selectedModel) && $scope.selectedModel.length === 0) {
                    clearObject($scope.selectedModel);
                }
            }

            if ($scope.settings.closeOnBlur) {
                $document.on('click', function (e) {
                    var target = e.target.parentElement;
                    var parentFound = false;

                    while (angular.isDefined(target) && target !== null && !parentFound) {
                        if (_.contains(target.className.split(' '), 'multiselect-parent') && !parentFound) {
                            if (target === $dropdownTrigger) {
                                parentFound = true;
                            }
                        }
                        target = target.parentElement;
                    }

                    if (!parentFound) {
                        $scope.$apply(function () {
                            $scope.open = false;
                        });
                    }
                });
            }

            $scope.getGroupTitle = function (groupValue) {
                if ($scope.settings.groupByTextProvider !== null) {
                    return $scope.settings.groupByTextProvider(groupValue);
                }

                return groupValue;
            };

            $scope.getButtonText = function () {
                if ($scope.settings.dynamicTitle && ($scope.selectedModel.length > 0 || (angular.isObject($scope.selectedModel) && _.keys($scope.selectedModel).length > 0))) {
                    if ($scope.settings.smartButtonMaxItems > 0) {
                        var itemsText = [];

                        angular.forEach($scope.options, function (optionItem) {
                            if ($scope.isChecked($scope.getPropertyForObject(optionItem, $scope.settings.idProp))) {
                                var displayText = $scope.getPropertyForObject(optionItem, $scope.settings.displayProp);
                                var converterResponse = $scope.settings.smartButtonTextConverter(displayText, optionItem);

                                itemsText.push(converterResponse ? converterResponse : displayText);
                            }
                        });

                        if ($scope.selectedModel.length > $scope.settings.smartButtonMaxItems) {
                            itemsText = itemsText.slice(0, $scope.settings.smartButtonMaxItems);
                            itemsText.push('...');
                        }

                        return itemsText.join(', ');
                    } else {
                        var totalSelected;

                        if ($scope.singleSelection) {
                            totalSelected = ($scope.selectedModel !== null && angular.isDefined($scope.selectedModel[$scope.settings.idProp])) ? 1 : 0;
                        } else {
                            totalSelected = angular.isDefined($scope.selectedModel) ? $scope.selectedModel.length : 0;
                        }

                        if (totalSelected === 0) {
                            return $scope.texts.buttonDefaultText;
                        } else {
                            return totalSelected + ' ' + $scope.texts.dynamicButtonTextSuffix;
                        }
                    }
                } else {
                    return $scope.texts.buttonDefaultText;
                }
            };

            $scope.getPropertyForObject = function (object, property) {
                if (angular.isDefined(object) && object.hasOwnProperty(property)) {
                    return object[property];
                }

                return '';
            };

            $scope.selectAll = function () {
                $scope.deselectAll(false);
                $scope.externalEvents.onSelectAll();

                angular.forEach($scope.options, function (value) {
                    $scope.setSelectedItem(value[$scope.settings.idProp], true);
                });
            };

            $scope.deselectAll = function (sendEvent) {
                sendEvent = sendEvent || true;

                if (sendEvent) {
                    $scope.externalEvents.onDeselectAll();
                }

                if ($scope.singleSelection) {
                    clearObject($scope.selectedModel);
                } else {
                    $scope.selectedModel.splice(0, $scope.selectedModel.length);
                }
            };

            $scope.setSelectedItem = function (id, dontRemove) {
                var findObj = getFindObj(id);
                var finalObj = null;

                if ($scope.settings.externalIdProp === '') {
                    finalObj = _.find($scope.options, findObj);
                } else {
                    finalObj = findObj;
                }

                if ($scope.singleSelection) {
                    clearObject($scope.selectedModel);
                    angular.extend($scope.selectedModel, finalObj);
                    $scope.externalEvents.onItemSelect(finalObj);
                    if ($scope.settings.closeOnSelect) $scope.open = false;

                    return;
                }

                dontRemove = dontRemove || false;

                var exists = _.findIndex($scope.selectedModel, findObj) !== -1;

                if (!dontRemove && exists) {
                    $scope.selectedModel.splice(_.findIndex($scope.selectedModel, findObj), 1);
                    $scope.externalEvents.onItemDeselect(findObj);
                } else if (!exists && ($scope.settings.selectionLimit === 0 || $scope.selectedModel.length < $scope.settings.selectionLimit)) {
                    $scope.selectedModel.push(finalObj);
                    $scope.externalEvents.onItemSelect(finalObj);
                }
                if ($scope.settings.closeOnSelect) $scope.open = false;
            };

            $scope.isChecked = function (id) {
                if ($scope.singleSelection) {
                    return $scope.selectedModel !== null && angular.isDefined($scope.selectedModel[$scope.settings.idProp]) && $scope.selectedModel[$scope.settings.idProp] === getFindObj(id)[$scope.settings.idProp];
                }

                return _.findIndex($scope.selectedModel, getFindObj(id)) !== -1;
            };

            $scope.externalEvents.onInitDone();
        }
    };
}]);