Ext.define('Stadtra.controllers.NotificationController', {
     extend: 'Ext.app.Controller',
     
     alias: 'controller.notificationcontroller',
     
     requires: [
          'Ext.ux.WebSocket',
          'Ext.ux.WebSocketManager',
          'Stadtra.model.RequestModel',
          'Stadtra.model.MessageModel',
          'Stadtra.model.UserModel',
          'Stadtra.view.homepage.NotificationTable',
          'Stadtra.view.homepage.MessageTable',
          'Stadtra.view.homepage.MessagePanel'
     ],
     
     init: function() {
          // view events to listen to
         this.control({
            'home-page' : {
                    afterrender: this.fetchNotifications
            },
            'message-table #newMessageButton': {
                    click: this.newMessage
            },
            'message-table': {
                    itemclick: this.showThread
            }
         });
     },
     
     ws: null,
     notifStore: null,
     messageStore: null,
     
     fetchNotifications: function(homepage) {
          
          if (Stadtra.app.userSession && Stadtra.app.userSession.data.user.role == 'admin') {
               return;
          }
          
          var me = this;
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
          
          me.notifStore = store;
          
          var fn = function() {
               store.load({
                    callback: function(records, operation, success){
                         if (success) {
                              var length = me.notifStore.count() + me.messageStore.count();
                              if (length > 0) {
                                   homepage.down('notification-container').setTitle('Notification (' + length + ')');
                              } else {
                                   homepage.down('notification-container').setTitle('Notification');
                              }
                         }
                    }
               });
               
               Ext.Function.createDelayed(fn,5*1000)();
          };
          
          fn();
          
          var messageStore = Ext.create('Ext.data.Store',{
               model: 'Stadtra.model.MessageThreadModel',
               pageSize: 10,
               proxy	: {
                    type	:	'rest',
                    enablePaging : true,
                    url: '/stadtra/ws/messages/threads',
                    reader : {
                        type			: 'json',
                        rootProperty	: 'data',
                        totalProperty	: 'recordCount',
                        successProperty : 'success'
                    },
                    extraParams: {
                        participant1Id: Stadtra.app.userSession.data.user.id
                    }
               }
          });
          
          me.messageStore = messageStore;
          
          var fn2 = function() {
               messageStore.load({
                    callback: function(records, operation, success){
                         if (success) {
                              var length = me.notifStore.count() + me.messageStore.count();
                              if (length > 0) {
                                   homepage.down('notification-container').setTitle('Notification (' + length + ')');
                              } else {
                                   homepage.down('notification-container').setTitle('Notification');
                              }
                         }
                    }
               });
               
               Ext.Function.createDelayed(fn2,5*1000)();
          };
          
          fn2();
     },
     
     newMessage: function() {
          var me = this;
          
          var searchStore = Ext.create('Ext.data.Store', {
               model: 'Stadtra.model.UserModel',
               idProperty: 'id',
               autoLoad: false,
               proxy: {
                    type: 'rest',
                    url: document.location.href + 'ws/security/users',
                    reader: {
                        type: 'json',
                        rootProperty: 'data',
                        totalProperty: 'recordCount',
                        successProperty: 'success'
                    }
               }
          });
          
          
          var window = Ext.create('Ext.window.Window',{
               title: 'New message',
               bodyPadding: 10,
               modal: true,
               resizable: false,
               items: [
                    {
                         xtype: 'form',
                         layout: 'vbox',
                         items: [
                              {
                                   xtype: 'combo',
                                   itemId: 'nameCombo',
                                   fieldLabel: 'Last Name',
                                   name: 'lName',
                                   valueField: 'lName',
                                   queryMode: 'remote',
                                   queryParam: 'lName',
                                   store: searchStore,
                                   emptyText: 'lastname',
                                   allowBlank: false,
                                   matchFieldWidth: false,
                                   tpl: '<tpl for="."><div class="x-boundlist-item">{loginId} - <b>{lName}</b>, {fName} {mName}</div></tpl>',
                                   displayTpl: '<tpl for=".">{lName}</tpl>',
                                   listConfig: {
                                       loadingText: 'Searching...',
                                       emptyText: 'No matching user found.',
                                       width: 280
                                   }
                              },
                              {
                                   xtype: 'textarea',
                                   name: 'message',
                                   fieldLabel: 'Message',
                                   height: 200,
                                   maxLength: 300,
                                   allowBlank: false
                              },
                              {
                                   xtype: 'displayfield',
                                   itemId: 'errorMsg',
                                   text: '',
                                   hidden: true,
                                   fieldStyle: {
                                        color: 'red',
                                        background: 'transparent'
                                   }
                              },
                              {
                                   xtype: 'button',
                                   text: 'Send message',
                                   handler: function(button) {
                                        
                                        button.up('form').down('#errorMsg').setHidden(true);
                                        
                                        var form = button.up('form');
                                        var message = form.down('textarea').getValue();
                                        var value = form.down('#nameCombo').getValue();
                                        var user = form.down('#nameCombo').findRecord('lName', value);
                                        
                                        if (form.isValid()) {
                                             if (user.data.id == Stadtra.app.userSession.data.user.id) {
                                                  form.down('#errorMsg').setHidden(false);
                                                  form.down('#errorMsg').setValue('<p font-color="red">Cannot send message to self.</p>');
                                             } else if (!user) {
                                                  form.down('#errorMsg').setHidden(false);
                                                  form.down('#errorMsg').setValue('<p font-color="red">No user selected!</p>');
                                             } else {
                                                  me.createMessage(user.data.id, message, window);
                                             }
                                        }
                                   }
                              }
                         ]
                    }
               ]
          });
          
          window.show();
     },
     
     createMessage: function (receiverId, message, window) {
          var box = Ext.Msg.wait('STADTRA', 'Sending message...');
          Ext.Ajax.request({
               url: document.location.href + 'ws/messages',
               jsonData: {
                    senderId: Stadtra.app.userSession.data.user.id,
                    receiverId: receiverId,
                    message: message
               },
               method: 'POST',
               callback: function(options, success, reponse) {
                    box.close();
                    if (success) {
                         Ext.Msg.alert('STADTRA', 'Message sent');
                         if (window) {
                              window.close();
                         }
                    } else {
                         Ext.Msg.alert('STADTRA', 'Failed to send message');
                    }
               }
          });
     },
     
     showThread: function (grid, record, item, index) {
          var me = this;
          var partner;
          var you;
          
          if (record.data.participant1Id == Stadtra.app.userSession.data.user.id) {
               you = record.data.participant1;
               partner = record.data.participant2;
          } else if (record.data.participant2Id == Stadtra.app.userSession.data.user.id) {
               you = record.data.participant2;
               partner = record.data.participant1;
          }
          
          var box = Ext.Msg.wait('STADTRA', 'Opening thread...');
          var store = Ext.create('Ext.data.Store',{
               model: 'Stadtra.model.MessageModel',
               pageSize: 10,
               proxy	: {
                    type	:	'rest',
                    enablePaging : true,
                    url: '/stadtra/ws/messages',
                    reader : {
                         type			: 'json',
                         rootProperty	: 'data',
                         totalProperty	: 'recordCount',
                         successProperty : 'success'
                    },
                    extraParams : {
                         threadId: record.data.id
                    }
               }
          });
          
          store.load({
               callback: function(records, operation, success){
                    box.close();
                    if (success) {
                         
                         
                         var window = Ext.create('Ext.window.Window',{
                              title: partner.lName + ', ' + partner.fName + ' ' + partner.mName,
                              bodyPadding: 10,
                              autoScroll: true,
                              modal: true
                         });
                         
                         for (var i = records.length-1; i >= 0; i--) {console.log(records[i]);
                              var panel = Ext.create('Stadtra.view.homepage.MessagePanel');
                              panel.getForm().setValues({
                                   name: records[i].data.sender.lName + ', ' + records[i].data.sender.fName + ' ' + records[i].data.sender.mName,
                                   tstamp: records[i].data.tstamp,
                                   message: records[i].data.message
                              });
                              window.add(panel);
                         }
                         
                         window.add({
                              xtype: 'form',
                              items: [
                                   {
                                        xtype: 'textarea',
                                        name: 'message',
                                        width: 400,
                                        allowBlank: true,
                                        maxLength: 300
                                   },
                                   {
                                        xtype: 'button',
                                        text: 'send',
                                        handler: function(button){
                                             if (button.up('form').isValid()) {
                                                  var message = button.up('form').down('textarea').getValue();
                                                  me.createMessage(partner.id, message, null);
                                             }
                                        }
                                   }
                              ]
                         });
                         
                         window.show();
                    } else {
                         Ext.Msg.alert('STADTRA', 'Failed to retrieve messages');
                    }
               }
          });
     }
 });