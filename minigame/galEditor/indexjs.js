// $(function() {
$('a[data-toggle="tab"]').on('shown.bs.tab', function(e) {
    // 获取已激活的标签页的名称
    var activeTab = $(e.target).text();
    // 获取前一个激活的标签页的名称
    var previousTab = $(e.relatedTarget).text();
    $(".active-tab span").html(activeTab);
    $(".previous-tab span").html(previousTab);
});

//             $("input[type='text']").change( function() {
//  alert("文本已被修改");
// });
//         });

//         $(function() { 
//             $("#inputfile").on('change', function () {
//     alert("文本已被修改");
// });
//         });

// angular.module('myApp', []).controller('userCtrl', [function() {
//     var self=this;
//     self.bkfile = "aaaa";
// }]);

angular.module('myApp', [])
    .controller('userCtrl', MainCtrl)
    .directive('fileChange', fileChange);

function MainCtrl($scope, fileReader) {
    $scope.simgs = ["chara1.png", "bk2.jpg", "bk1.jpg"];
    $scope.upload = function(imgtype) {
        // do something with the file
        // if (imgtype == "imgbk") {
            fileReader.readAsDataUrl($scope.imgfile, $scope)
                .then(function(result) {
                    if (imgtype == "imgbk") {
                        $scope.imageBK = result;
                    } else if (imgtype == "imgchara1") {
                        $scope.imageChara1 = result;
                    }
                });
        // } else if (imgtype == "imgchara1") {
        //     fileReader.readAsDataUrl($scope.filechara1, $scope)
        //         .then(function(result) {
        //             $scope.imageChara1 = result;
        //         });
        // }
    };
}

function fileChange() {
    return {
        restrict: 'A',
        require: 'ngModel',
        scope: {
            fileChange: '&'
        },
        link: function link(scope, element, attrs, ctrl) {
            element.on('change', onChange);

            scope.$on('destroy', function() {
                element.off('change', onChange);
            });

            function onChange() {
                ctrl.$setViewValue(element[0].files[0]);
                scope.fileChange();
            }
        }
    };
}




angular.module('myApp')
    .factory('fileReader', ["$q", "$log", function($q, $log) {
        var onLoad = function(reader, deferred, scope) {
            return function() {
                scope.$apply(function() {
                    deferred.resolve(reader.result);
                });
            };
        };

        var onError = function(reader, deferred, scope) {
            return function() {
                scope.$apply(function() {
                    deferred.reject(reader.result);
                });
            };
        };

        var getReader = function(deferred, scope) {
            var reader = new FileReader();
            reader.onload = onLoad(reader, deferred, scope);
            reader.onerror = onError(reader, deferred, scope);
            return reader;
        };

        var readAsDataURL = function(file, scope) {
            var deferred = $q.defer();
            var reader = getReader(deferred, scope);
            reader.readAsDataURL(file);
            return deferred.promise;
        };

        return {
            readAsDataUrl: readAsDataURL
        };
    }])
