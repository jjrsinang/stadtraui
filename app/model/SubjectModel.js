Ext.define('Stadtra.model.SubjectModel', {

	extend		: 'Ext.data.Model',
	
	idProperty	: 'id',
	
	fields		: [
		{name	: 'id',			type: 'int'},
		{name	: 'courseNum',	type: 'string'},
        {name	: 'courseTitle',type: 'string'},
        {name	: 'units',		type: 'string'},
		{name	: 'section',	type: 'string'},
        {name	: 'lecture',	type: 'string'},
        {name	: 'lab',	    type: 'string'}
	]
});
