(function () {
  'use strict';

  /**
   * @ngdoc function
   * @name formationAngularApp.controller:AboutCtrl
   * @description
   * # AboutCtrl
   * Controller of the formationAngularApp
   */
  angular.module('formationAngularApp')
    .controller('ComputerCtrl', ComputerCtrl);

    ComputerCtrl.$inject = ['$scope', '$window', '$location', 'ComputerService', 'CompanyService', 'i18nService'];


    function ComputerCtrl($scope, $window, $location, ComputerService, CompanyService, i18nService) {
      var vm = this;
      vm.computer = null;
      vm.error = null;
      vm.companyList = null;

      vm.sendForm = function(computer) {
        var searchObject = $location.search();
        console.log(computer);
        ComputerService.addComputer(computer).then(function(data) {
          $location.url('/')
        });
      }

      function init() {
        CompanyService.getAll().then(function(data){
          vm.companyList = data;
          vm.companyList.unshift({id:0, name:"--"});
        });

        var searchObject = $location.search();

        if(jQuery.isEmptyObject(searchObject)) {
          vm.computer = {id:0, company:{id:0,name:""}};
        } else {
          ComputerService.modifyComputer(searchObject.id).then(function(data) {
            vm.computer = data;
            if(vm.computer.company == null) {
              vm.computer.company = {id:0, name:""}
            }
          });
        }
        $.validator.addMethod(
        	        "dateControl",
        	        function(value, element) {
        	        	try {
        	        		$.datepicker.parseDate( ""+i18nService.getString('Date.pattern.javascript'), value );
        	        		return true;
        	        	}catch(e) {
        	        		return false;
        	        	}
        	        }, ""+i18nService.getString('Datepicker.message.error')+" "+i18nService.getString('Date.pattern.text'));

        	$().ready(function() {
        		$("#signupForm").validate({
        			rules: {
        				name : "required",
        				introduced : {
        					dateControl: true
        				},
        				discontinued : {
        					dateControl: true
        				}
        			},
        			highlight: function(element) {
        				 var formGroup = $(element).closest('.form-group');
        				 formGroup.removeClass('has-success').addClass('has-error');
        				 formGroup.children('label.error').css("opacity",1);
        			},
        			success: function(element) {
                 var formGroup = $(element).closest('.form-group');
        				 formGroup.removeClass('has-error').addClass('has-success');
        				 formGroup.children('label.error').css("opacity",0);
        			}
        		});

        		$(function() {
              $("#introduced").datepicker();
              $("#introduced").datepicker( "option",$.datepicker.regional[""+i18nService.getString('DatePicker.lang')] );
              $("#introduced").datepicker("option", "dateFormat", ""+i18nService.getString('Date.pattern.javascript'));
              //$("#introduced").datepicker("setDate", vm.computer.introduced);
              $("#introduced").datepicker({
                onClose : function(selectedDate) {
                  $('#introduced').trigger('change');
                  $('#discontinued').trigger('onkeypress');
                }
              });
            });
            $(function() {

              $("#discontinued").datepicker();


              $("#discontinued").datepicker( "option",$.datepicker.regional[""+i18nService.getString('DatePicker.lang')] );
              $("#discontinued").datepicker("option", "dateFormat", ""+i18nService.getString('Date.pattern.javascript'));
              //$("#discontinued").datepicker("setDate", vm.computer.discontinued);
              $("#discontinued").datepicker({
                onClose : function(selectedDate) {
                  $('#discontinued').trigger('change');
                  $('#discontinued').trigger('onkeypress');
                }
              });
            });
        	});


      }

      init();
    };
})();
