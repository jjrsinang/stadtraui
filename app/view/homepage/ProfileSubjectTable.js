Ext.define('Stadtra.view.homepage.ProfileSubjectTable', {
    extend: 'Ext.grid.Panel',
    xtype: 'subject-table',
	
	requires: [
		'Stadtra.model.GradeModel',
		'Stadtra.model.TeacherSubjectModel'
	],
	
	title: 'Current Subjects',
	maxHeight: 450,
	width : 700,
	padding: 10,
	teacherId: null,
	
    columns: [
		{
			text: 'Number',
			flex: 0.9,
			dataIndex: 'courseNumber',
			renderer: function (value, meta, record) {
				return record.data.subject.courseNum;
			}
		},
		{
			text: 'Title',
			flex: 2,
			dataIndex: 'courseTitle',
			renderer: function (value, meta, record) {
				return record.data.subject.courseTitle;
			}
		},
		{
			text: 'Section',
			flex: 0.6,
			dataIndex: 'section',
			renderer: function (value, meta, record) {
				return record.data.subject.section;
			}
		},
		{
			text: 'Units',
			flex: 0.5,
			dataIndex: 'units',
			renderer: function (value, meta, record) {
				return record.data.subject.units;
			}
		},
		{
			text: 'Lecture',
			flex: 0.6,
			dataIndex: 'lecture',
			renderer: function (value, meta, record) {
				return record.data.subject.lecture;
			}
		},{
			text: 'Lab/Recit',
			flex: 0.6,
			dataIndex: 'lab',
			renderer: function (value, meta, record) {
				return record.data.subject.lab;
			}
		}
	],

    initComponent: function () {
        var me = this;
		
		var id = '1';
		var url = '';
		var model = '';
		if (Stadtra.app.userSession) {
			if (me.teacherId) {
				id = me.teacherId;
				model = 'Stadtra.model.TeacherSubjectModel';
				url = '/stadtra/ws/teachers/subjects';
			} else if (Stadtra.app.userSession.data.user.student) {
				id = Stadtra.app.userSession.data.user.student.id;
				model = 'Stadtra.model.GradeModel';
				url = '/stadtra/ws/students/grades';
			} else if (Stadtra.app.userSession.data.user.teacher) {
				id = Stadtra.app.userSession.data.user.teacher.id;
				model = 'Stadtra.model.TeacherSubjectModel';
				url = '/stadtra/ws/teachers/subjects';
			}
		}
		
        me.store = Ext.create('Ext.data.Store',{
            model: model,
            pageSize: 100,
            proxy	: {
                type	:	'rest',
                enablePaging : true,
                url: url,
                reader : {
                    type			: 'json',
                    rootProperty	: 'data',
                    totalProperty	: 'recordCount',
                    successProperty : 'success'
                },
				extraParams : {
					id : id,
					status : 'taking'
				}
            }
        });
		
		me.store.load();

        me.callParent();
    }
});