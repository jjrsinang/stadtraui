Ext.define('Stadtra.controllers.AnnouncementController', {
     extend: 'Ext.app.Controller',
     
     alias: 'controller.announcementcontroller',
     
     stores : [
          'Stadtra.store.AnnouncementStore'
     ],
     
     requires: [
          'Stadtra.view.login.Announcement'
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
                    
                    var slider = panel.down('slider');
                    slider.setMaxValue(store.count()-1);
                    
                    var current_index = 0;
					var run = function (dir) {
                         
                         current_index = current_index + dir;
                         if(current_index == store.getCount()) {
                             current_index = 0;
                         } else if (current_index < 0) {
                             current_index = store.getCount() -1; 
                         }
                         
                         panel.setActiveItem(current_index);
                         slider.setValue(current_index);
					};
                    
                    if (store.count() == 0) {
                         panel.add({
                              xtype: 'panel',
                              html: 'no announcements at this time',
                              bodyPadding: 10
                         });
                         panel.down('slider').hide();
                    } else {
                         panel.down('slider').show();
                    }
                    
                    store.each(function(announcement){
                         
                         var form = Ext.create('Ext.form.Panel',{
                              bodyPadding: 10,
                              height: '100%',
                              items : [
								   {
                                        xtype: 'label',
                                        text: announcement.data.title,
										width: 400,
										style: 'font: normal 30px courier; font-weight: bold;text-align:center;display:block'
								   },
								   {
                                        xtype: 'textarea',
                                        readOnly: true,
                                        width: 400,
                                        height: 300,
                                        value: announcement.data.body
                                   },
                                   {
                                        xtype: 'button',
                                        text: 'View Attachment',
                                        margin: '0 15 0 0',
                                        hidden: announcement.data.filename ? false : true,
                                        handler: function () {
                                             var url = document.location.href + 'ws/announcements/' + announcement.data.id
                                             window.open(url, '_blank');
                                        }
                                   }
                              ]
                         });
                         
                         if (container.up('home-page') && Stadtra.app.userSession && Stadtra.app.userSession.data.user.role=='admin') {
                              form.add({
                                   xtype: 'button',
                                   text: 'Delete',
                                   handler: function () {
                                        Ext.Ajax.request({
                                             url: document.location.href + 'ws/announcements/' + announcement.data.id,
                                             params: {
                                                 id: announcement.data.id
                                             },
                                             method: 'DELETE',
                                             callback: function(options, success2, reponse) {
                                                  if (success2) {
                                                       Ext.Msg.alert('STADTRA', 'Announcement deleted');
                                                  } else {
                                                       Ext.Msg.alert('STADTRA', 'Deletion failed');
                                                  }
                                             }
                                        });
                                   }
                              });
                         }
                         
                         var cont = Ext.create('Ext.panel.Panel',{
                              layout : 'hbox',
                              items : [
                                   {
                                        xtype: 'panel',
                                        html: '<br><br><br><br><br><br><br><br><br><center><font size="40" color="gray"><b><</b></font></center>',
                                        width: 40,
                                        height: '100%',
                                        listeners: {
                                             'render': function(panel) {
                                                  panel.body.on('click', function() {
                                                       run(-1);
                                                  });
                                             }
                                        }
                                   },
                                   form,
                                   {
                                        xtype: 'panel',
                                        html: '<br><br><br><br><br><br><br><br><br><center><font size="40" color="gray"><b>></b></font></center>',
                                        width: 40,
                                        height: '100%',
                                        listeners: {
                                             'render': function(panel) {
                                                  panel.body.on('click', function() {
                                                       run(1);
                                                  });
                                             }
                                        }
                                   }
                              ]
                         });
                         
                         panel.add(cont);
                    });
					
					Ext.override(Ext.layout.container.Card, {
						setActiveItem: function (newCard) {
							var me = this,
								owner = me.owner,
								oldCard = me.activeItem,
								rendered = owner.rendered,
								newIndex;

							newCard = me.parseActiveItem(newCard);
							newIndex = owner.items.indexOf(newCard);

							// If the card is not a child of the owner, then add it.
							// Without doing a layout!
							if (newIndex === -1) {
								newIndex = owner.items.items.length;
								Ext.suspendLayouts();
								newCard = owner.add(newCard);
								Ext.resumeLayouts();
							}

							// Is this a valid, different card?
							if (newCard && oldCard !== newCard) {
								// Fire the beforeactivate and beforedeactivate events on the cards
								if (newCard.fireEvent('beforeactivate', newCard, oldCard) === false) {
									return false;
								}
								if (oldCard && oldCard.fireEvent('beforedeactivate', oldCard, newCard) === false) {
									return false;
								}

								if (rendered) {
									Ext.suspendLayouts();

									// If the card has not been rendered yet, now is the time to do so.
									if (!newCard.rendered) {
										me.renderItem(newCard, me.getRenderTarget(), owner.items.length);
									}

									var handleNewCard = function () {
										// Make sure the new card is shown
										if (newCard.hidden) {
											newCard.show();
										}

										if (!newCard.tab) {
											var newCardEl = newCard.getEl();
											newCardEl.dom.style.opacity = 1;
											if (newCardEl.isStyle('display', 'none')) {
												newCardEl.setDisplayed('');
											} else {
												newCardEl.show();
											}
										}

										// Layout needs activeItem to be correct, so set it if the show has not been vetoed
										if (!newCard.hidden) {
											me.activeItem = newCard;
										}
										Ext.resumeLayouts(true);
									};

									var handleOldCard = function () {
										if (me.hideInactive) {
											oldCard.hide();
											oldCard.hiddenByLayout = true;
										}
										oldCard.fireEvent('deactivate', oldCard, newCard);
									};

									if (oldCard && !newCard.tab) {
										var oldCardEl = oldCard.getEl();
										oldCardEl.fadeOut({
											callback: function () {
												handleOldCard();
												handleNewCard();
											}
										});

									} else if (oldCard) {
										handleOldCard();
										handleNewCard();
									} else {
										handleNewCard();
									}

								} else {
									me.activeItem = newCard;
								}

								newCard.fireEvent('activate', newCard, oldCard);

								return me.activeItem;
							}
							return false;
						}
					});
               }
          });
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
                    xtype: 'form',
                    items: [
                         {
                              xtype: 'textfield',
                              name: 'title',
							  maxLength: 30,
                              fieldLabel: 'Title',
                              msgTarget: 'side',
                              allowBlank: false,
                              width: 550
                         },{
                              xtype: 'textarea',
                              name: 'body',
							  maxLength: 300,
                              fieldLabel: 'Content',
                              msgTarget: 'side',
                              allowBlank: false,
                              width: 550,
                              height: 250
                         },{
                              xtype: 'filefield',
                              name: 'data',
							  maxLength: 30,
                              fieldLabel: 'File',
                              buttonText: 'Select file...',
                              msgTarget: 'side',
                              regex: /^.*\.(pdf||PDF)$/i,
                              regexText: 'file must be in .pdf format',
                              width: 550
                         },{
                              xtype: 'button',
                              text: 'Submit',
                              itemId: 'submitButton',
                              handler: function (button) {
                                   var form = button.up('form').getForm();
                                   if (form.isValid()) {
                                        form.submit({
                                             url: '/stadtra/ws/announcements',
                                             waitMsg: 'Uploading attachment...',
                                             success: function(fp, o) {
                                                  console.log('success');
                                                  var box = Ext.Msg.alert('STADTRA','Upload finished.');
                                                  window.close();
                                             },
                                             failure: function(fp, o) {
                                                  console.log('failure');
                                                  var box = Ext.Msg.alert('STADTRA','Upload failed.');
                                             }
                                        });
                                   }
                              }
                         }
                    ]
               }]
          });
          window.show();
     }
 });