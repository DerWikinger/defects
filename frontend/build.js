//build.js

"use strict"

import angular from 'angular';
import uirouter from '@uirouter/angularjs';

import LoginComponent from './login/login-component';
import ConfigFormComponent from './config-form/config-form-component';
import UserListComponenet from './user-list/user-list-component';
import DefectListComponent from './defect-list/defect-list-component';
import DefectItemComponent from './defect-item/defect-item-component';
import FilterFormComponent from './filter-form/filter-form-component';
import DetailInfoComponent from './detail-info/detail-info-component';
import DefectAddComponent from './defect-add/defect-add-component';
import DefectEditComponent from './defect-edit/defect-edit-component';
import DefectFormComponent from './shared/defect-form/defect-form-component';

import LoginService from './login/login-service';
import DefectService from './services/defect-service';
import ConfigService from './config-form/config-service';
import FilterService from './services/filter-service';

import loginState from './login/login-state';
import configFormState from './config-form/config-form-state';
import userListState from './user-list/user-list-state';
import defectListState from './defect-list/defect-list-state';
import filterFormState from './filter-form/filter-form-state';
import detailInfoState from './detail-info/detail-info-state';
import defectAddState from './defect-add/defect-add-state';
import defectEditState from './defect-edit/defect-edit-state';

const ngApp = angular.module('ngApp', [uirouter]);

ngApp.factory('loginService', LoginService);
ngApp.factory('defectService', DefectService);
ngApp.factory('filterService', FilterService);
ngApp.factory('configService', ConfigService);
ngApp.factory('httpInterceptor', ($q)=> {
	return {

		responseError: (rejection)=> {
			if (rejection.status === 403) {
				alert('У вас не достаточно прав для выполнения данного запроса!');
			}
			return $q.reject(rejection);
		}
	}
});

ngApp.config(($httpProvider, $stateProvider, $urlRouterProvider)=> {

	$httpProvider.interceptors.push('httpInterceptor');

	$stateProvider
	.state('defects', {
		abstract: true,
		template: `<ui-view>
				       <loading-indicator></loading-indicator>
				   </ui-view>`,
	})
	.state('defect-list', defectListState())
	.state('filter-form', filterFormState())
	.state('detail-info', detailInfoState())
	.state('login', loginState())
	.state('defect-add', defectAddState())
	.state('defect-edit', defectEditState())
	.state('config-form', configFormState())
	.state('user-list', userListState())
	
	$urlRouterProvider.otherwise('/login');
});

ngApp.run(($transitions, loginService) => {
	$transitions.onStart({
		to: (state) => {
			if(state.name === 'login') {
				return false;			
			} else {
				return true;
			}
		} 
	}, (trans) => {
		if (!loginService.checkUser()) {
			alert('Необходимо авторизоваться!');
			return trans.router.stateService.transitionTo('login');
		}
	});
});

ngApp.component('loginUser', new LoginComponent());
ngApp.component('configForm', new ConfigFormComponent());
ngApp.component('userList', new UserListComponenet());
ngApp.component('defectList', new DefectListComponent());
ngApp.component('filterForm', new FilterFormComponent());
ngApp.component('defectItem', new DefectItemComponent());
ngApp.component('defectForm', new DefectFormComponent());
ngApp.component('detailInfo', new DetailInfoComponent());
ngApp.component('defectAdd', new DefectAddComponent());
ngApp.component('defectEdit', new DefectEditComponent());

export function start () {

}