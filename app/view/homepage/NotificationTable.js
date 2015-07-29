Ext.define('Stadtra.view.homepage.NotificationTable', {
    extend: 'Ext.grid.Panel',
    xtype: 'notification-table',
	
	title: 'Requests',
	emptyText: 'no requests to display',
	height: 200,
    width: 670,
	frame: true,
	collapsible: true,
	collapseFirst: false,
	
	tools: [
		{
			xtype: 'button',
			itemId: 'addRequestButton',
			text: '+',
			margin: '0 5 0 0'
		}
	],
	
	listeners: {
		cellclick: function(grid, td, index, record) {
			if (index == 2) {
				Ext.Msg.alert('Reason',record.data.reason);
			} else if (Stadtra.app.userSession.data.user.student && index == 3) {
				Ext.Msg.alert('Message',record.data.message);
			}
		},
		afterrender: function(grid) {
			if (Stadtra.app.userSession) {
				if (Stadtra.app.userSession.data.user.teacher) {
					grid.down('#addRequestButton').destroy();
				}
			}
		},
		beforerender: function(grid) {
			if (Stadtra.app.userSession) {
				if (Stadtra.app.userSession.data.user.teacher) {
					grid.reconfigure([
						{
							text: 'Student No',
							dataIndex: 'studentId',
							renderer: function (value, meta, record) {
								return record.data.student.studentNo;
							}
						}, {
							text: 'Name',
							dataIndex: 'studentId',
							flex: 2,
							renderer: function (value, meta, record) {
								var student = record.data.student;
								return student.lName + ', ' + student.fName + ' ' + student.mName;
							}
						}, {
							text: 'Reason',
							dataIndex: 'reason',
							flex: 3
						}, {
							xtype: 'actioncolumn',
							menuDisabled: true,
							sortable: false,
							width: 50,
							items: [{
								iconCls: 'accept',
								tooltip: 'Accept',
								handler: function(grid, rowIndex, colIndex) {
									var rec = grid.getStore().getAt(rowIndex);
									var student = rec.data.student;
									var name = student.lName + ', ' + student.fName + ' ' + student.mName;
									Ext.Msg.prompt('Accept', 'Additional instructions for ' + name + '?', function(buttonId, text){
										if (buttonId == 'ok' || buttonId == 'yes') {
											rec.set('accepted', true);
											rec.set('message',text);
											var store = Stadtra.app.getController("Stadtra.controllers.NotificationController").notifStore;
											console.log(rec.data);
											store.each(function(item){
												console.log(item.data);
											});
											store.sync({
												success: function () {
													Ext.Msg.alert('Success', 'Request accepted');
												},
												failure: function () {
													Ext.Msg.alert('Failure', 'Request accept failed');
												}
											});
										}
									},'window', true, 'see me at my consultation hours');
								}
							},
							{
								iconCls: 'reject',
								tooltip: 'Reject',
								handler: function(grid, rowIndex, colIndex) {
									var rec = grid.getStore().getAt(rowIndex);
									var student = rec.data.student;
									var name = student.lName + ', ' + student.fName + ' ' + student.mName;
									Ext.Msg.confirm('Reject', 'Reject ' + name + '?', function(buttonId){
										if (buttonId == 'ok' || buttonId == 'yes') {
											rec.set('accepted', false);
											var store = Stadtra.app.getController("Stadtra.controllers.NotificationController").notifStore;
											store.sync({
												success: function () {
													Ext.Msg.alert('Success', 'Request rejected');
												},
												failure: function () {
													Ext.Msg.alert('Failure', 'Request reject failed');
												}
											});
										}
									});
								}
							}]
						}
					]);
				} else if (Stadtra.app.userSession.data.user.student) {
					grid.reconfigure([
						{
							text: 'Employee No',
							dataIndex: 'teacherId',
							renderer: function (value, meta, record) {
								return record.data.teacher.employeeNo;
							}
						}, {
							text: 'Name',
							dataIndex: 'teacherId',
							flex: 2,
							renderer: function (value, meta, record) {
								var teacher = record.data.teacher;
								return teacher.lName + ', ' + teacher.fName + ' ' + teacher.mName;
							}
						}, {
							text: 'Reason',
							dataIndex: 'reason',
							flex: 2
						}, {
							text: 'Message',
							dataIndex: 'message',
							flex: 2
						},{
							xtype: 'booleancolumn',
							text: 'Accepted',
							dataIndex: 'accepted',
							trueText: 'Yes',
							falseText: 'No',
							menuDisabled: true,
							sortable: false,
							width: 80
						}
					]);
				}
			}
		}
	}
});