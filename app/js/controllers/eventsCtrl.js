(function(){
 "use strict";

  angular.module('eventsCtrl').controller('EventsController', ['$state', 'mceInfo', function($state, mceInfo){
    var vm = this;
    vm.allEvents = mceInfo.events.all();

    /*Functions*/
    vm.isPassed = isPassed;    

    function isPassed(date){
      var today = new Date();
      return (date < today ? "passed" : "");
    }

    /*Configurations*/
      vm.uiConfig = {
        "calendar":{
          "editable": false,
          "header":{
            "left": "title", "center": '', "right": 'today prev, next'
          },
          eventClick: vm.alertOnEventClick
        }
      };

      vm.eventSource = { url: "http://www.google.com/calendar/feeds/usa__en%40holiday.calendar.google.com/public/basic", className: 'gcal-event', currentTimezone: 'America/Washington DC'  };
      vm.eventsF = function (start, end, timezone, callback) {
        var s = new Date(start).getTime() / 1000;
        var e = new Date(end).getTime() / 1000;
        var m = new Date(start).getMonth();
        var events = [{title: 'Default ' + m,start: s + (50000),end: s + (100000),allDay: false, className: ['customFeed']}];
        callback(events);
      };

      function buildCalender(){
        var cEvents=[];
        for(var i=0; i < vm.allEvents.length; i++){
          //vm.calenderEvents
          cEvents.push({title: vm.allEvents[i].eventname, start:vm.allEvents[i].date, allDay: false});
        }
        return cEvents;
      }

      vm.calenderEvents = buildCalender();
      vm.eventSources = [vm.calenderEvents, vm.eventSource, vm.eventsF];
  }]);

})();
