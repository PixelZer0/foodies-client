'use strict';

moduloCarrito.controller('CarritoRemoveController',
        ['$scope', '$routeParams', 'serverCallService', '$location', 'sessionService', 'constantService','objectService',
            function ($scope, $routeParams, serverCallService, $location, sessionService, constantService,objectService) {
                $scope.ob = "carrito";
                $scope.op = "remove";
                //---
                $scope.status = null;
                $scope.debugging = constantService.debugging();
                $scope.url = $scope.ob + '/' + $scope.op;
                //---
                $scope.id_producto = $routeParams.id_producto;
                //---
                $scope.objectService = objectService;
                //---
                $scope.remove = function () {
                    serverCallService.remove($scope.ob, $scope.id_plato).then(function (response) {
                        if (response.status == 200) {
                            if (response.data.status == 200) {                                
                                    $scope.status = "El registro con id=" + $scope.id_plato + " se ha eliminado.";
                                } else {
                                    $scope.status = "Error en el borrado de datos del servidor";
                                }
                            } else {
                                $scope.status = "Error en la recepción de datos del servidor";
                            }                        
                    }).catch(function (data) {
                        $scope.status = "Error en la recepción de datos del servidor";
                    });
                }
                $scope.back = function () {
                    window.history.back();
                };
                $scope.close = function () {
                    $location.path('/home');
                };
            }]);