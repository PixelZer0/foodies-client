/*
 * Copyright (c) 2017 by Rafael Angel Aznar Aparici (rafaaznar at gmail dot com)
 *
 * TROLLEYES helps you to learn how to develop easily AJAX web applications
 *
 * Sources at https://github.com/rafaelaznar/trolleyes
 *
 * TROLLEYES is distributed under the MIT License (MIT)
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
'use strict';
moduloSistema.controller('LoginController',
        ['$http', '$scope', '$location', 'constantService', 'sessionServerCallService', 'sessionService',
            function ($http, $scope, $location, constantService, sessionServerCallService, sessionService) {
                $scope.title = "Formulario de entrada al sistema";
                $scope.icon = "fa-file-text-o";
                $scope.user = {};
                $scope.session_info = sessionService.getSessionInfo();
                $scope.isSessionActive = sessionService.isSessionActive();
                $scope.debugging = constantService.debugging();
                $scope.fill = function (nombre) {
                    if (constantService.debugging()) {
                        $scope.user.username = nombre;
                        $scope.user.password = nombre;
                    }
                }
                $scope.fillRegistro = function (cod) {
                    if (constantService.debugging()) {
                        $scope.user.key = cod;
                    }
                }
                $scope.login = function () {
                    sessionServerCallService.login($scope.user.username, $scope.user.password).then(function (response) {
                        if (response.status == 200) {
                            sessionService.setSessionActive();
                            sessionService.setSessionInfo(response.data.json.data);
                            $scope.session_info = sessionService.getSessionInfo();
                            $scope.isSessionActive = sessionService.isSessionActive();
                            $location.path('home');
                        } else {
                            sessionService.setSessionInactive();
                            $scope.session_info = sessionService.getSessionInfo();
                            $scope.isSessionActive = sessionService.isSessionActive();
                            return false;
                        }
                    }, function errorCallback(response, status) {
                        sessionService.setSessionInactive();
                        $scope.session_info = sessionService.getSessionInfo();
                        $scope.isSessionActive = sessionService.isSessionActive();
                        return false;
                    });
                };
            }
        ]);