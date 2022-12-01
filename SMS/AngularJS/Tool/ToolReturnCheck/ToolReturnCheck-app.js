var ToolingreturnchkApp = angular.module('ToolingreturnchkApp', ['datatables', 'commonApp', 'angularjs-dropdown-multiselect']);

ToolingreturnchkApp.service('ToolingreturnchkServices', function () {

    this.ToolingreturnchkData = function (ToolingreturnchkServices) {
        debugger;
        this.ToolRts_id = ToolingreturnchkServices ? ToolingreturnchkServices.ToolRts_id : null;
        this.ToolIsu_id = ToolingreturnchkServices ? ToolingreturnchkServices.ToolIsu_id : null;
        this.ToolRts_datetime = ToolingreturnchkServices ? ToolingreturnchkServices.ToolRts_datetime : null;
        this.ToolRts_shift = ToolingreturnchkServices ? ToolingreturnchkServices.ToolRts_shift : null;
        this.ToolRts_Return_no = ToolingreturnchkServices ? ToolingreturnchkServices.ToolRts_Return_no : null;
        this.ToolRts_Partno = ToolingreturnchkServices ? ToolingreturnchkServices.ToolRts_Partno : null;
        this.ToolRts_Partname = ToolingreturnchkServices ? ToolingreturnchkServices.ToolRts_Partname : null;
        this.ToolRts_MachineCode = ToolingreturnchkServices ? ToolingreturnchkServices.ToolRts_MachineCode : null;
        this.ToolRts_MachineName = ToolingreturnchkServices ? ToolingreturnchkServices.ToolRts_MachineName : null;
        this.ToolRts_Linename = ToolingreturnchkServices ? ToolingreturnchkServices.ToolRts_Linename : null;
        this.ToolRts_Unicode = ToolingreturnchkServices ? ToolingreturnchkServices.ToolRts_Unicode : null;
        this.ToolRqt_datetime = ToolingreturnchkServices ? ToolingreturnchkServices.ToolRqt_datetime : null;
        this.ToolIsu_datetime = ToolingreturnchkServices ? ToolingreturnchkServices.ToolIsu_datetime : null;
        this.ToolRts_LifeAchived = ToolingreturnchkServices ? ToolingreturnchkServices.ToolRts_LifeAchived : null;
        this.ToolRts_Model = ToolingreturnchkServices ? ToolingreturnchkServices.ToolRts_Model : null;
        this.ToolRts_Responsible_Dept = ToolingreturnchkServices ? ToolingreturnchkServices.ToolRts_Responsible_Dept : null;
        this.ToolRts_Responsible_Person = ToolingreturnchkServices ? ToolingreturnchkServices.ToolRts_Responsible_Person : null;
        this.ToolRts_Corrective_Action = ToolingreturnchkServices ? ToolingreturnchkServices.ToolRts_Corrective_Action : null;
        this.ToolRts_Reason = ToolingreturnchkServices ? ToolingreturnchkServices.ToolRts_Reason : null;
        this.ToolRts_Remarks = ToolingreturnchkServices ? ToolingreturnchkServices.ToolRts_Remarks : null;
        this.ToolRts_Qty = ToolingreturnchkServices ? ToolingreturnchkServices.ToolRts_Qty : null;
        this.Tool_Status = ToolingreturnchkServices ? ToolingreturnchkServices.Tool_Status : null;
        this.IsActive = ToolingreturnchkServices ? ToolingreturnchkServices.IsActive : null;
        this.OrgID = ToolingreturnchkServices ? ToolingreturnchkServices.OrgID : null;
        this.CreatedBy = ToolingreturnchkServices ? ToolingreturnchkServices.CreatedBy : null;
        this.CreatedAt = ToolingreturnchkServices ? ToolingreturnchkServices.CreatedAt : null;
        this.ModifyBy = ToolingreturnchkServices ? ToolingreturnchkServices.ModifyBy : null;
        this.ModifyDate = ToolingreturnchkServices ? ToolingreturnchkServices.ModifyDate : null;
        this.dummy_col1 = ToolingreturnchkServices ? ToolingreturnchkServices.dummy_col1 : null;
        this.dummy_col2 = ToolingreturnchkServices ? ToolingreturnchkServices.dummy_col2 : null;
        this.KEY = ToolingreturnchkServices ? ToolingreturnchkServices.KEY : null;
        this.Tooltype = ToolingreturnchkServices ? ToolingreturnchkServices.Tooltype : null;
        this.Return_Status = ToolingreturnchkServices ? ToolingreturnchkServices.Return_Status : null;

        this.ToolRts_plant = ToolingreturnchkServices ? ToolingreturnchkServices.ToolRts_plant : null;
        this.ToolRts_PartSpecification = ToolingreturnchkServices ? ToolingreturnchkServices.ToolRts_PartSpecification : null;
        this.ToolRts_AvailableQty = ToolingreturnchkServices ? ToolingreturnchkServices.ToolRts_AvailableQty : null;

        this.Machinecode = ToolingreturnchkServices && ToolingreturnchkServices.Machinecode ? ToolingreturnchkServices.Machinecode : [];
        this.LineMachine_Map_Id = ToolingreturnchkServices ? ToolingreturnchkServices.LineMachine_Map_Id : null;
        this.LineMachine_Line_Code = ToolingreturnchkServices ? ToolingreturnchkServices.LineMachine_Line_Code : null;
        this.LineMachine_Machine_Code = ToolingreturnchkServices ? ToolingreturnchkServices.LineMachine_Machine_Code : null;
        this.PartId = ToolingreturnchkServices ? ToolingreturnchkServices.PartId : null;
        this.Returned_Emp_Number = ToolingreturnchkServices ? ToolingreturnchkServices.Returned_Emp_Number : null;
        this.Returned_Emp_Name = ToolingreturnchkServices ? ToolingreturnchkServices.Returned_Emp_Name : null;

    };

    this.SaveToolingReturnChk = function (data) {
        debugger;
        this.url = "Tool/SaveToolingReturn";
        this.param = JSON.stringify(data);
    };

    this.getLineDetails = function (data) {
        debugger;
        this.url = "Tool/GetLineDetailsReturn";
        this.param = JSON.stringify(data);
    };

});

ToolingreturnchkApp.filter('unique', function () {
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