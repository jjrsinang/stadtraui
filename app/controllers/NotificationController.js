Ext.define('Stadtra.controllers.NotificationController', {
     extend: 'Ext.app.Controller',
     
     alias: 'controller.notificationcontroller',
     
     requires: [
          'Stadtra.model.RequestModel'
     ],
     
     init: function() {
          // view events to listen to
         this.control({
            'home-page #notifButton' : {
                    click: this.showNotification
            },
            'home-page' : {
                    activate: this.fetchNotifications
            }
         });
     },
     
     ws: null,
     
     fetchNotifications: function(homepage) { // 000701171
          
          var store = Ext.create('Ext.data.Store',{
               model: 'Stadtra.model.RequestModel',
               pageSize: 100,
               proxy	: {
                    type	:	'rest',
                    enablePaging : true,
                    url: '/stadtra/ws/requests/list',
                    reader : {
                         type			: 'json',
                         rootProperty	: 'data',
                         totalProperty	: 'recordCount',
                         successProperty : 'success'
                    },
                    extraParams : {
                         studentId: Stadtra.app.userSession.data.user.student ? Stadtra.app.userSession.data.user.student.id : null,
                         teacherId: Stadtra.app.userSession.data.user.teacher ? Stadtra.app.userSession.data.user.teacher.id : null
                    }
               }
          });
          
          store.load({
               callback: function(records, operation, success){
                    if (success) {
                         homepage.down('#notifButton').setText(records.length);
                    }
               }
          });
          
          //this.ws = Ext.create('Ext.ux.WebSocket', {
          //     url : 'ws://localhost:8080/stadtra/ws/stadtra',
          //     listeners: {
          //          open: function (ws) {
          //              console.log ('The websocket is ready to use');
          //              //ws.send ('This is a simple text');
          //          } ,
          //          close: function (ws) {
          //              console.log ('The websocket is closed!');
          //          } ,
          //          error: function (ws, error) {
          //              Ext.Error.raise (error);
          //          } ,
          //          message: function (ws, message) {
          //              console.log (message);
          //          }
          //     }
          // });
          //
          //
          //Ext.ux.WebSocketManager.register(this.ws)
     },

     showNotification: function() {
          
          //this.ws.send ('this is a string', {
          //      'property': 'value' ,
          //      'field': 'data'
          //  });
          
          //var url = 'http://localhost:8080/stadtra/' + 'ws/notifications/get';
          //var form = Ext.create('Ext.form.Panel');
          //form.submit({
          //     url: url,
          //     method: 'GET',
          //     success: function(fp, o) {
          //          console.log(o);
          //     },
          //     failure: function(fp, o) {
          //          console.log(o);
          //     }
          //});
          
          var window = Ext.create('Ext.window.Window',{
               modal: true,
               title: 'Notifications - coming soon!',
               height: 400,
               resizable: false,
               bodyPadding: 10,
               width: 600
          });
          window.show();
     }
 });