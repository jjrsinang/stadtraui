Ext.define('Stadtra.model.RequestModel', {

	extend		: 'Ext.data.Model',
	
	idProperty	: 'id',
	
	fields		: [
		{name	: 'id',			type: 'int'},
		{name	: 'studentId',	type: 'int'},
        {name	: 'teacherId',  type: 'int'},
        {name	: 'accepted',	type: 'boolean'},
		{name	: 'reason',	    type: 'string'},
        {name	: 'message',	type: 'string'}
	]
});
