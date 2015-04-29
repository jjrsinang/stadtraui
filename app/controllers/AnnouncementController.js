Ext.define('Stadtra.controllers.AnnouncementController', {
     extend: 'Ext.app.Controller',
     
     alias: 'controller.announcementcontroller',
     
     stores : [
          'Stadtra.store.AnnouncementStore'
     ],
     
     views: [
          'login.Announcement'
     ],
     
     init: function() {
          // view events to listen to
         this.control({
             'announcement-container': {
                    render: this.onActivate
             },
             'announcement-container #addAnnouncement' : {
                    click: this.addAnnouncement
             }
         });
     },

     onActivate: function(container) {
          var store = Ext.create('Stadtra.store.AnnouncementStore');
          store.load(function(records, operation, success){
               if (success) {
                    var panel = container.down('#announcementPanel');
                    
                    store.each(function(announcement){
                         var form = Ext.create('Ext.form.Panel',{
                              title: announcement.data.title,
                              bodyPadding: 10,
                              items : [
                                   {
                                        xtype: 'textarea',
                                        readOnly: true,
                                        fieldLabel: 'Body',
                                        labelWidth: 50,
                                        width: 370,
                                        height: 220,
                                        value: announcement.data.body
                                   }
                              ]
                         });
                         panel.add(form);
                    });
               }
          });
     },
     
     addAnnouncement: function() {
          var window = Ext.create('Ext.window.Window',{
               modal: true,
               title: 'Add Announcement',
               height: 200,
               width: 300
          });
          window.show();
     }
 });