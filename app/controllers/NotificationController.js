Ext.define('Stadtra.controllers.NotificationController', {
     extend: 'Ext.app.Controller',
     
     alias: 'controller.notificationcontroller',
     
     init: function() {
          // view events to listen to
         this.control({
            'home-page #notifButton' : {
                    click: this.showNotification
            }
         });
     },

     showNotification: function() {
          var window = Ext.create('Ext.window.Window',{
               modal: true,
               title: 'Notifications',
               height: 400,
               resizable: false,
               bodyPadding: 10,
               width: 600
          });
          window.show();
     }
 });