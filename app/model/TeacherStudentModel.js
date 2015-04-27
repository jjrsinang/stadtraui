function convertDate(value, record){
      if(!value)return null;
      return Ext.Date.format(new Date(value), 'm/d/Y');
};

Ext.define('Stadtra.model.TeacherStudentModel', {

	extend		: 'Ext.data.Model',
	
	idProperty	: 'id',
	
	fields		: [
		{name	: 'id',				type	: 'int', persist: false},
        {name	: 'studentId',		type	: 'int'},
        {name	: 'studentNo',		type	: 'string'},
        {name	: 'studentName',	type	: 'string'},
        {name	: 'teacherId',		type	: 'int'},
		{name	: 'employeeNo',		type	: 'string'},
        {name	: 'teacherName',	type	: 'string'},
        {name	: 'dateApproved',	type	: 'date', serialize:convertDate, persist: true},
        {name	: 'isStillEffective',	type	: 'boolean'}
        
	],
    
    proxy	: {
		type	:	'rest',
		enablePaging : true,
        url: '/stadtra/ws/students/add_adviser',
		reader : {
			type			: 'json',
			rootProperty	: 'data',
			totalProperty	: 'recordCount',
			successProperty : 'success'
		}
	}
});
