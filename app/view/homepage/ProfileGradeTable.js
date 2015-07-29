Ext.define('Stadtra.view.homepage.ProfileGradeTable', {
    extend: 'Ext.grid.Panel',
    xtype: 'grade-table',
	
	requires: [
		'Stadtra.model.GradeModel'
	],
	
	title: 'Grades',
	maxHeight: 450,
	width : 700,
	margin: '10 0 10 0',
	frame: true,
	collapsible: true,
	emptyText: 'no grades to display',
	
    columns: [
		{
			text: 'Course',
			flex: 1,
			dataIndex: 'course',
			renderer: function (value, meta, record) {
				return record.data.subject.courseNum;
			}
		},
		{
			text: 'Sem/Year Taken',
			flex: 1,
			dataIndex: 'semTaken',
			renderer: function (value, meta, record) {
				return record.data.semTaken + ' ' + record.data.year;
			}
		},
		{
			text: 'Units',
			flex: 1,
			dataIndex: 'units',
			renderer: function (value, meta, record) {
				return record.data.subject.units;
			}
		},
		{
			text: 'Grade',
			flex: 1,
			dataIndex: 'grade'
		}
	],

    initComponent: function () {
        var me = this;
		var id = '1';
		if (Stadtra.app.userSession) {
			id = Stadtra.app.userSession.data.user.student.id;
		}
		
        me.store = Ext.create('Ext.data.Store',{
            model: 'Stadtra.model.GradeModel',
            pageSize: 100,
            proxy	: {
                type	:	'rest',
                enablePaging : true,
                url: '/stadtra/ws/students/grades',
                reader : {
                    type			: 'json',
                    rootProperty	: 'data',
                    totalProperty	: 'recordCount',
                    successProperty : 'success'
                },
				extraParams : {
					id : id,
					status : 'taken'
				}
            }
        });
		
		me.store.load();

        me.callParent();
    }
});