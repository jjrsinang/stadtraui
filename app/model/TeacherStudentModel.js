Ext.define('Stadtra.model.TeacherStudentModel', {

	extend		: 'Ext.data.Model',
	
	idProperty	: 'id',
	
	fields		: [
		{name	: 'id',				type	: 'int'},
        {name	: 'studentId',		type	: 'int'},
        {name	: 'studentNo',		type	: 'string'},
        {name	: 'teacherId',		type	: 'int'},
		{name	: 'employeeNo',		type	: 'string'},
        {name	: 'dateApproved',	type	: 'string'},
        {name	: 'isStillEffective',	type	: 'boolean'}
        
	]
});
