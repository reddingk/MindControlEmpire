(function(){
 "use strict";

  angular.module('newsCtrl').controller('NewsController', ['$state','$stateParams','mceInfo', '$sce', function($state, $stateParams, mceInfo, $sce){
    var vm = this;

    vm.allNews = mceInfo.news.all();
    vm.displayedNews = {"page":1, "totalpages":Math.ceil(vm.allNews.length / 4), "display": vm.allNews.slice(0,4)};

    /*News Article*/
    var articleID = $stateParams.newsid;
    if(articleID != null){
        vm.articleNews = mceInfo.news.byName(articleID);
        vm.articleContent = "";
        vm.articleContent = specialTextChecks(vm.articleNews.content);
    }

    /*Functions*/
    vm.checkButton = checkButton;
    vm.newsPaging = newsPaging;
    vm.buildArray = buildArray;

    function checkButton(direction){
      var bool = false;
      if(direction == "up"){
        if((vm.displayedNews.page + 1) <= vm.displayedNews.totalpages) {bool = true;}
      }
      else{
        if((vm.displayedNews.page - 1) > 0) { bool = true;}
      }
      return bool;
    }

    function newsPaging(direction) {
      if(direction == "up"){
        if((vm.displayedNews.page + 1) <= vm.displayedNews.totalpages)
        {
          vm.displayedNews.page +=1;
        }
      }
      else{
        if((vm.displayedNews.page - 1) > 0)
        {
          vm.displayedNews.page -=1;
        }
      }
      var first = 4 * (vm.displayedNews.page  - 1);
      vm.displayedNews.display = vm.allNews.slice(first,first+ 4);
    }

    function buildArray(num) {
      return new Array(num);
    }

    function specialTextChecks(phrase){
      var returnPhrase = phrase;
      if(phrase.includes(".com")){
        var tmpPhrase = "";
        var phraseArray = phrase.split(" ");

        for(var i=0; i < phraseArray.length; i++){
          if(phraseArray[i].includes(".com")){
            var linkText = phraseArray[i].split(0,phraseArray[i].indexOf(".com")+4);
            phraseArray[i] = phraseArray[i].replace(linkText, '<a href="'+linkText+'" target="_blank">'+linkText+'</a>');
          }
        }

        returnPhrase = phraseArray.join(" ");
      }
      return returnPhrase;
    }

  }]);

})();
