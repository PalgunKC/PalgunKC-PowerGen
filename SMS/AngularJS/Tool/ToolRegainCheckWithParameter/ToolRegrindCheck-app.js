﻿var ToolRegrindcheckApp = angular.module('ToolRegrindcheckApp', ['datatables', 'commonApp', 'angularjs-dropdown-multiselect']);

ToolRegrindcheckApp.service('ToolingregrindcheckServices', function () {

    this.ToolingreturnData = function (ToolingReturnmaster) {
        debugger;


        this.VendorCode = ToolingReturnmaster ? ToolingReturnmaster.VendorCode : null;
        this.VendorName = ToolingReturnmaster ? ToolingReturnmaster.VendorName : null;
        this.ToolRts_id = ToolingReturnmaster ? ToolingReturnmaster.ToolRts_id : null;
        this.ToolIsu_id = ToolingReturnmaster ? ToolingReturnmaster.ToolIsu_id : null;
        this.ToolRts_datetime = ToolingReturnmaster ? ToolingReturnmaster.ToolRts_datetime : null;
        this.ToolRts_shift = ToolingReturnmaster ? ToolingReturnmaster.ToolRts_shift : null;
        this.ToolRts_Return_no = ToolingReturnmaster ? ToolingReturnmaster.ToolRts_Return_no : null;
        this.ToolRts_Partno = ToolingReturnmaster ? ToolingReturnmaster.ToolRts_Partno : null;
        this.ToolRts_Partname = ToolingReturnmaster ? ToolingReturnmaster.ToolRts_Partname : null;
        this.ToolRts_MachineCode = ToolingReturnmaster ? ToolingReturnmaster.ToolRts_MachineCode : null;
        this.ToolRts_MachineName = ToolingReturnmaster ? ToolingReturnmaster.ToolRts_MachineName : null;
        this.ToolRts_Linename = ToolingReturnmaster ? ToolingReturnmaster.ToolRts_Linename : null;
        this.ToolRts_Unicode = ToolingReturnmaster ? ToolingReturnmaster.ToolRts_Unicode : null;
        this.ToolRqt_datetime = ToolingReturnmaster ? ToolingReturnmaster.ToolRqt_datetime : null;
        this.ToolIsu_datetime = ToolingReturnmaster ? ToolingReturnmaster.ToolIsu_datetime : null;
        this.ToolRts_LifeAchived = ToolingReturnmaster ? ToolingReturnmaster.ToolRts_LifeAchived : null;
        this.ToolRts_Model = ToolingReturnmaster ? ToolingReturnmaster.ToolRts_Model : null;
        this.ToolRts_Responsible_Dept = ToolingReturnmaster ? ToolingReturnmaster.ToolRts_Responsible_Dept : null;
        this.ToolRts_Responsible_Person = ToolingReturnmaster ? ToolingReturnmaster.ToolRts_Responsible_Person : null;
        this.ToolRts_Corrective_Action = ToolingReturnmaster ? ToolingReturnmaster.ToolRts_Corrective_Action : null;
        this.ToolRts_Reason = ToolingReturnmaster ? ToolingReturnmaster.ToolRts_Reason : null;
        this.ToolRts_Remarks = ToolingReturnmaster ? ToolingReturnmaster.ToolRts_Remarks : null;
        this.ToolRts_Qty = ToolingReturnmaster ? ToolingReturnmaster.ToolRts_Qty : null;
        this.Tool_Status = ToolingReturnmaster ? ToolingReturnmaster.Tool_Status : null;
        this.IsActive = ToolingReturnmaster ? ToolingReturnmaster.IsActive : null;
        this.OrgID = ToolingReturnmaster ? ToolingReturnmaster.OrgID : null;
        this.CreatedBy = ToolingReturnmaster ? ToolingReturnmaster.CreatedBy : null;
        this.CreatedAt = ToolingReturnmaster ? ToolingReturnmaster.CreatedAt : null;
        this.ModifyBy = ToolingReturnmaster ? ToolingReturnmaster.ModifyBy : null;
        this.ModifyDate = ToolingReturnmaster ? ToolingReturnmaster.ModifyDate : null;
        this.dummy_col1 = ToolingReturnmaster ? ToolingReturnmaster.dummy_col1 : null;
        this.dummy_col2 = ToolingReturnmaster ? ToolingReturnmaster.dummy_col2 : null;
        this.KEY = ToolingReturnmaster ? ToolingReturnmaster.KEY : null;       
        this.ToolRts_plant = ToolingReturnmaster ? ToolingReturnmaster.ToolRts_plant : null;
        this.ToolRts_PartSpecification = ToolingReturnmaster ? ToolingReturnmaster.ToolRts_PartSpecification : null;
        this.ToolRts_AvailableQty = ToolingReturnmaster ? ToolingReturnmaster.ToolRts_AvailableQty : null;

        this.Machinecode = ToolingReturnmaster && ToolingReturnmaster.Machinecode ? ToolingReturnmaster.Machinecode : [];
        this.LineMachine_Map_Id = ToolingReturnmaster ? ToolingReturnmaster.LineMachine_Map_Id : null;
        this.LineMachine_Line_Code = ToolingReturnmaster ? ToolingReturnmaster.LineMachine_Line_Code : null;
        this.LineMachine_Machine_Code = ToolingReturnmaster ? ToolingReturnmaster.LineMachine_Machine_Code : null;


        this.ToolReg_id = ToolingReturnmaster ? ToolingReturnmaster.ToolReg_id : null;
        //this.ToolRts_id = ToolingReturnmaster ? ToolingReturnmaster.ToolRts_id : null;
        this.ToolReg_datetime = ToolingReturnmaster ? ToolingReturnmaster.ToolReg_datetime : null;
        this.ToolReg_shift = ToolingReturnmaster ? ToolingReturnmaster.ToolReg_shift : null;
        this.ToolReg_Regrain_no = ToolingReturnmaster ? ToolingReturnmaster.ToolReg_Regrain_no : null;
        this.ToolReg_Unicode = ToolingReturnmaster ? ToolingReturnmaster.ToolReg_Unicode : null;
        this.ToolReg_LifeAchived = ToolingReturnmaster ? ToolingReturnmaster.ToolReg_LifeAchived : null;
        this.ToolReg_Model = ToolingReturnmaster ? ToolingReturnmaster.ToolReg_Model : null;
        this.ToolReg_Responsible_Dept = ToolingReturnmaster ? ToolingReturnmaster.ToolReg_Responsible_Dept : null;
        this.ToolReg_Responsible_Person = ToolingReturnmaster ? ToolingReturnmaster.ToolReg_Responsible_Person : null;
        this.ToolReg_Corrective_Action = ToolingReturnmaster ? ToolingReturnmaster.ToolReg_Corrective_Action : null;
        this.ToolReg_Reason = ToolingReturnmaster ? ToolingReturnmaster.ToolReg_Reason : null;
        this.ToolReg_Remarks = ToolingReturnmaster ? ToolingReturnmaster.ToolReg_Remarks : null;
        this.ToolReg_Qty = ToolingReturnmaster ? ToolingReturnmaster.ToolReg_Qty : null;
        this.ToolReg_Unit_Cost = ToolingReturnmaster ? ToolingReturnmaster.ToolReg_Unit_Cost : null;
        this.ToolReg_VendorCode = ToolingReturnmaster ? ToolingReturnmaster.ToolReg_VendorCode : null;
        this.ToolReg_VendorName = ToolingReturnmaster ? ToolingReturnmaster.ToolReg_VendorName : null;

        this.ToolReg_RDC_Number = ToolingReturnmaster ? ToolingReturnmaster.ToolReg_RDC_Number : null;
        this.ToolReg_Vend_ExpDate = ToolingReturnmaster ? ToolingReturnmaster.ToolReg_Vend_ExpDate : null;
        this.Return_Status = ToolingReturnmaster ? ToolingReturnmaster.Return_Status : null;
        this.Tool_Location = ToolingReturnmaster ? ToolingReturnmaster.Tool_Location : null;
        this.PartId = ToolingReturnmaster ? ToolingReturnmaster.PartId : null;
        this.ToolReg_RegrainPartNo = ToolingReturnmaster ? ToolingReturnmaster.ToolReg_RegrainPartNo : null;
        this.Regrained_Emp_Number_Update = ToolingReturnmaster ? ToolingReturnmaster.Regrained_Emp_Number_Update : null;
        this.Regrained_Emp_Name_Update = ToolingReturnmaster ? ToolingReturnmaster.Regrained_Emp_Name_Update : null;
        this.Regrained_Emp_Number = ToolingReturnmaster ? ToolingReturnmaster.Regrained_Emp_Number : null;
        this.Regrained_Emp_Name = ToolingReturnmaster ? ToolingReturnmaster.Regrained_Emp_Name : null;
    };

    this.SaveRegrindCheck = function (data) {
        debugger;
        this.url = "Tool/SaveRegrindCheck";
        this.param = JSON.stringify(data);
    };

    this.getLineDetails = function (data) {
        debugger;
        this.url = "Tool/GetLineDetailsReturn";
        this.param = JSON.stringify(data);
    };

});

ToolRegrindcheckApp.filter('unique', function () {
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