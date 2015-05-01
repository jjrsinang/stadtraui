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
          //store.load(function(records, operation, success){
               //if (success) {
                    var panel = container.down('#announcementPanel');
                    
                    store.each(function(announcement){
                         var form = Ext.create('Ext.form.Panel',{
                              bodyPadding: 10,
                              items : [
								   {
                                        xtype: 'label',
                                        text: announcement.data.title,
										style: 'font: normal 30px courier; font-weight: bold;text-align:center;display:block'
								   },
								   {
                                        xtype: 'textarea',
                                        readOnly: true,
                                        //fieldLabel: 'Body',
                                        labelWidth: 50,
                                        width: 360,
                                        height: 335,
                                        value: announcement.data.body
                                   }
                              ]
                         });
                         panel.add(form);
                    });
					
					var current_index = 0;
					var run = function (delay) {
						Ext.create('Ext.util.DelayedTask', function () {
							if(current_index == store.getCount())
								current_index = 0;
							panel.setActiveItem(current_index, {type: 'slide', direction: 'right'});
							
							current_index += 1;
							run(delay);
						}).delay(delay);
					};

					run(3000);
               //}
          //});
     },
     
     addAnnouncement: function() {
          var window = Ext.create('Ext.window.Window',{
               modal: true,
               title: 'Add Announcement',
               height: 400,
               resizable: false,
               bodyPadding: 10,
               width: 600,
               items: [{
                  xtype: 'textfield',
                  name: 'title',
                  fieldLabel: 'Title',
                  allowBlank: false,
                  width: 550
               },{
                  xtype: 'textarea',
                  name: 'body',
                  fieldLabel: 'Content',
                  allowBlank: false,
                  width: 550,
                  height: 250
               },{
                  xtype: 'button',
                  text: 'Submit',
                  itemId: 'submitButton'
               }]
          });
          window.show();
     }
 });