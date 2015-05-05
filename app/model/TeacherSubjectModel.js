Ext.define('Stadtra.model.TeacherSubjectModel', {

	extend		: 'Ext.data.Model',
	
	idProperty	: 'id',
	
	fields		: [
		{name	: 'id',			type: 'int'},
		{name	: 'subjectId',	type: 'int'},
        {name	: 'teacherId',	type: 'int'},
        {name	: 'isStillEffective', type: 'int'},
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
