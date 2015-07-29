Ext.define('Stadtra.model.RequestModel', {

	extend		: 'Ext.data.Model',
	
	idProperty	: 'id',
	
	fields		: [
		{name	: 'id',			type: 'int'},
		{name	: 'studentId',	type: 'int'},
        {name	: 'teacherId',  type: 'int'},
        {name	: 'accepted',	type: 'boolean', allowNull: true},
		{name	: 'reason',	    type: 'string'},
        {name	: 'message',	type: 'string'}
	]/*,
    
    associations : [
        {
            type	: 'hasOne',
            model	: 'Stadtra.model.StudentModel',
            name	: 'student',
            associationKey: 'student'
        },
        {
            type	: 'hasOne',
            model	: 'Stadtra.model.AdviserModel',
            name	: 'teacher',
            associationKey: 'teacher'
        }
    ]*/
});
