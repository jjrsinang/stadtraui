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
					
					
					
					var current_index = 0;
					var run = function (delay) {
						Ext.create('Ext.util.DelayedTask', function () {
							if(current_index == store.getCount())
								current_index = 0;
							panel.setActiveItem(current_index);
							
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