Ext.define('Stadtra.model.GradeModel', {

	extend		: 'Ext.data.Model',
	
	idProperty	: 'id',
	
	fields		: [
		{name	: 'id',			type: 'int'},
		{name	: 'courseId',	type: 'int'},
        {name	: 'studentId',	type: 'int'},
        {name	: 'status',		type: 'string'},
		{name	: 'grade',		type: 'string'},
        {name	: 'semTaken',	type: 'string'},
        {name	: 'year',	    type: 'int'},
        {name   : 'subject'}
	],
    
    associations : [
        {
            type	: 'hasOne',
            model	: 'Stadtra.model.SubjectModel',
            name	: 'subject',
            associationKey: 'subject'
        }
    ]
});
