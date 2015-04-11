/**
 * 
 */

angular.module('SelmiApp', [ 'ngRoute' ]).config(
		[ '$routeProvider', function($routeProvider) {
			$routeProvider.when('/', {
				template : $('#tmpl_list').html(),
				//templateUrl : 'templates/list.html',
				controller: 'ListController',
				controllerAs: 'ctrl'
			}).when('/detail/:id', {
				template : $('#tmpl_detail').html(),
				//templateUrl : 'templates/detail.html',
				controller: 'DetailController',
				controllerAs: 'ctrl'
			}).when('/edit/:id', {
				template : $('#tmpl_edit').html(),
				//templateUrl : 'templates/edit.html',
				controller: 'EditController',
				controllerAs: 'ctrl'
			}).when('/new', {
				template : $('#tmpl_edit').html(),
				//templateUrl : 'templates/edit.html',
				controller: 'EditController',
				controllerAs: 'ctrl'
			}).otherwise({
				redirectTo : '/'
			});
		} ])
		.factory('NavService', [function(){
			var nav = {
				title: '',
				pathway: [],
				setTitle: function(title) {
					nav.title = title;
				},
				getTitle: function() {
					return nav.title;
				},
				addPathwayItem: function(title, url) {
					nav.pathway.push({title:title, url: url});
				},
				resetPathway: function() {
					nav.pathway = [];
				}
			}
			return nav;
		}])
		.factory('OfferService', ['$http', '$q', function($http, $q){
			var offer = {
				applyFilter: function(offers, filter){
					var filtered = [];
					//filtra per nome / cliente
					if (filter.search != '' || filter.customer != '') {
						angular.forEach(offers, function(el, idx){
							if (-1 == el.customer.indexOf(filter.search)) {
								//offers.splice(idx,1);
							} else {
								filtered.push(el);
							}
						});
					} else {
						filtered = offers;
					}
					return filtered;
				},
				getAll: function(filter) {
					if (undefined == filter) {
						filter = {search:'', customer:''};
					}
					var self = this;
					var defer = $q.defer();
					if (undefined != localStorage) {
						var offers = JSON.parse(localStorage.getItem('offers'));
						if (!offers) {
							defer.resolve({'data':[]});
							/*
							$http.get('offers.json')
							.then(function(res){
								localStorage.setItem('offers', JSON.stringify(res.data));
								var offers = self.applyFilter(res.data, filter);
								defer.resolve({'data':offers});
							})
//							.error(function(){
//								console.log('errore');
//							})
							;
							*/
						} else {
							offers = this.applyFilter(offers, filter);
							defer.resolve({'data':offers});
						}
					} else {
						defer.resolve({'data':[]});
						/*
						return $http.get('offers.json')
						.then(function(res){
							var offers = this.applyFilter(res.data, filter);
							defer.resolve({'data':offers});
						})
//						.error(function(){
//							console.log('errore');
//						})
						;
						*/
					}
					return defer.promise;
				},
				deleteOffer: function(id) {
					var defer = $q.defer();
					this.getAll({search:'',customer:''}).then(function(res){
						var offers = res.data;
						angular.forEach(res.data, function(el, idx){
							if (el.id == id) {
								offers.splice(idx,1);
								localStorage.setItem('offers', JSON.stringify(offers));
								defer.resolve();
							}
						});
					});
					return defer.promise;
				},
				saveOffer: function(o) {
					var defer = $q.defer();
					this.getAll({search:'',customer:''}).then(function(res){
						var offers = res.data;
						if (o.id != 0) {
							angular.forEach(res.data, function(el, idx){
								if (el.id == o.id) {
									offers[idx] = o;
								}
							});
						} else {
							var max = 0;
							angular.forEach(res.data, function(el, idx){
								if (el.id>max) max = el.id;
							});
							o.id = max+1;
							o.created = moment().format('DD-MM-YYYY');
							offers.push(o);
						}
						localStorage.setItem('offers', JSON.stringify(offers));
						defer.resolve();
					});
					return defer.promise;
				},
				getMacchine: function() {
					var defer = $q.defer();
					defer.resolve({'data':[{"id":1,"nome":"SELMI ONE","descrizione":"","tipo_parte":"M","specifiche_elettriche":"three-phase V.380 Hz 50","potenza":"0,9","web":"www.selmi-chocolate.it\/en\/prodotti.asp?id_categoria=1&id=1#specifiche","prezzo":6900,"vasca":"12","":"55","presenza_dosaggio":"SI","presennza_pv_risc":"SI","altro1":"Latest new electronic software","altro2":""},{"id":2,"nome":"SELMI COLOR EX","descrizione":"","tipo_parte":"M","specifiche_elettriche":"three-phase V.380 Hz 50","potenza":"0,9","web":"www.selmi-chocolate.it\/en\/prodotti.asp?id_categoria=1&id=2#specifiche","prezzo":9900,"vasca":"12","":"55","presenza_dosaggio":"SI","presennza_pv_risc":"SI","altro1":"Latest new electronic software","altro2":"Easy removable screwpump for fast cleaning"},{"id":3,"nome":"GHANA LEGEND","descrizione":"","tipo_parte":"M","specifiche_elettriche":"three-phase V.380 Hz 50","potenza":"1,5","web":"www.selmi-chocolate.it\/en\/prodotti.asp?id_categoria=1&id=36#specifiche","prezzo":9900,"vasca":"24","":"90","presenza_dosaggio":"SI","presennza_pv_risc":"SI","altro1":"Latest new electronic software","altro2":""},{"id":4,"nome":"SELMI PLUS EX","descrizione":"","tipo_parte":"M","specifiche_elettriche":"three-phase V.380 Hz 50","potenza":"1,5","web":"www.selmi-chocolate.it\/en\/prodotti.asp?id_categoria=1&id=4#specifiche","prezzo":15300,"vasca":"24","":"90","presenza_dosaggio":"SI","presennza_pv_risc":"SI","altro1":"Latest new electronic software","altro2":"Easy removable screwpump for fast cleaning"},{"id":5,"nome":"SELMI FUTURA EX","descrizione":"","tipo_parte":"M","specifiche_elettriche":"three-phase V.380 Hz 50","potenza":"2,5","web":"www.selmi-chocolate.it\/en\/prodotti.asp?id_categoria=1&id=5#specifiche","prezzo":18900,"vasca":"35","":"170","presenza_dosaggio":"SI","presennza_pv_risc":"SI","altro1":"Latest new electronic software","altro2":"Easy removable screwpump for fast cleaning"},{"id":6,"nome":"SELMI TOP EX","descrizione":"","tipo_parte":"M","specifiche_elettriche":"three-phase V.380 Hz 50","potenza":"3,5","web":"www.selmi-chocolate.it\/en\/prodotti.asp?id_categoria=1&id=6#specifiche","prezzo":22000,"vasca":"60","":"200","presenza_dosaggio":"SI","presennza_pv_risc":"SI","altro1":"Latest new electronic software","altro2":"Easy removable screwpump for fast cleaning"}]});
					return defer.promise;
					/*
					return $http.get('macchine.json')
					.error(function(){
						console.log('errore');
					});
					*/
				},
				getClienti: function() {
					var defer = $q.defer();
					defer.resolve({'data':[
						{"customer_id":1,"nome":"Cliente #1"},
						{"customer_id":2,"nome":"Cliente #2"},
						{"customer_id":3,"nome":"Cliente #3"},
						{"customer_id":4,"nome":"Cliente #4"},
						{"customer_id":5,"nome":"Cliente #5"}
					]});
					return defer.promise;
					/*
					return $http.get('clienti.json')
					.error(function(){
						console.log('errore');
					});
					*/
				}
			};
			return offer;
		}])
		.factory('HelperService', ['$http', function($http){
			var helper = {
				getProdTotal: function(p) {
					var total = parseFloat(p.detail.prezzo) * p.quantity;
					return total;
				},
				getTotal : function(o) {
					var self = this;
					var total = 0;
					angular.forEach(o.items, function(item) {
						total += self.getProdTotal(item);
					});
					return total;
				},
				getDiscountedTotal : function(o) {
					var total = this.getTotal(o);
					if (o.discount == undefined) return total;
					var discount = parseFloat(o.discount);
					
					switch (o.discount_type) {
						case 'percentage':
							return total*(1-discount/100);
							break;
						case 'absolute':
							return total - discount;
							break;
					}
					return total;
				},
				getDiscount : function(o) {
					var total = this.getTotal(o);
					var discount = parseFloat(o.discount);
					switch (o.discount_type) {
						case 'percentage':
							return total*(discount/100);
							break;
						case 'absolute':
							return discount;
							break;
					}
				}
			}
			return helper;
		}])
		.controller('NavController', ['$scope', 'NavService', function($scope, NavService){
			var self = this;
			self.nav = NavService;
			self.title = NavService.getTitle();
			$scope.$watch('NavService.getTitle()', function() {
				self.title = NavService.getTitle();
			});
		}])
		.controller('ListController', ['$scope', 'NavService', 'OfferService', 'HelperService', 
		                               function($scope, NavService, OfferService, HelperService){
			var self = this;
			self.hlp = HelperService;
			self.filter = {
					search: '',
					customer: ''
			};
			NavService.setTitle('Elenco offerte');
			NavService.resetPathway();
			NavService.addPathwayItem('Elenco offerte', '#/offers');
			self.offers = [];
//			OfferService.getAll(self.filter).then(function(res){
//				self.offers = res.data;
//			});
			self.deleteOffer = function(offer) {
				OfferService.deleteOffer(offer.id).then(function(){
					self.offers.splice(self.offers.indexOf(offer), 1);
				});
			};
			$scope.$watch(function(){
				return self.filter.search;
			}, function(){
				OfferService.getAll(self.filter).then(function(res){
					self.offers = res.data;
				});
			}, true);
		}])
		.controller('EditController', ['$routeParams', 'NavService', 'OfferService', 'HelperService',  
		                               function($routeParams, NavService, OfferService, HelperService){
			var self = this;
			self.hlp = HelperService;			
			self.item = {
					id: 0,
					created: null,
					items: []
			};
			var defaultProd = {
					id:0,
					detail:{
						name:'',
						prezzo:0,
					},
					quantity:0
			};
			self.newProd = defaultProd;
			self.total = 0;
			self.discountedTotal = 0;
			self.macchine = [];
			self.clienti = [];
			NavService.setTitle('Aggiungi/Modifica offerta');
			NavService.resetPathway();
			NavService.addPathwayItem('Elenco offerte', '#/offers');
			NavService.addPathwayItem('Aggiungi/Modifica offerta', '#');
			if (undefined != $routeParams.id) {
				OfferService.getAll().then(function(res) {
					angular.forEach(res.data, function(el) {
						if (el.id == $routeParams.id) {
							self.item = el;
							self.total = HelperService.getTotal(el);
							self.discountedTotal = HelperService.getDiscountedTotal(el);
						}
					});
				});
			}
			OfferService.getMacchine().then(function(res){
				self.macchine = res.data;
			});
			OfferService.getClienti().then(function(res){
				self.clienti = res.data;
			});
			
			self.saveOffer = function() {
				OfferService.saveOffer(self.item).then(function(){
					location.href = '#/offers';
				});
			};
			self.deleteProd = function(prod, offer) {
				//angular.forEach(offer.items, function(el, idx){
					offer.items.splice(offer.items.indexOf(prod), 1);
				//});
				self.item = offer;
			};
			self.addProd = function(p) {
				self.item.items.push({id:self.item.items.length+1, detail:p.detail, quantity:p.quantity});
				self.newProd = defaultProd;
			};
		}])		
		.controller('DetailController', ['$routeParams', 'NavService', 'OfferService', 'HelperService',  
		                                 function($routeParams, NavService, OfferService, HelperService){
			var self = this;
			self.hlp = HelperService;
			self.item = null;
			self.macchine = [];
			NavService.setTitle('Dettaglio offerta');
			NavService.resetPathway();
			NavService.addPathwayItem('Elenco offerte', '#/offers');
			NavService.addPathwayItem('Dettaglio offerta', '#');
			OfferService.getAll().then(function(res) {
				angular.forEach(res.data, function(el) {
					if (el.id == $routeParams.id) {
						self.item = el;
						self.total = HelperService.getTotal(el);
						self.discountedTotal = HelperService.getDiscountedTotal(el);
					}
				});
			});
		}])
		.filter('discount', ['currencyFilter', 'numberFilter', function(currencyFilter, numberFilter) {
			return function(val, type, currency) {
				switch (type) {
					case 'percentage':
						return numberFilter(val,2)+'%';
						break;
					case 'absolute':
						return currencyFilter(val, currency);
						break;
				}
			};
		}])
;