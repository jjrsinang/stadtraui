Ext.define('Stadtra.model.StudentModel', {

	extend		: 'Ext.data.Model',
	
	idProperty	: 'id',
	
	fields		: [
		{name	: 'id',				type	: 'int'},
		{name	: 'studentNo',		type	: 'string'},
		{name	: 'fName',		    type	: 'string'},
		{name	: 'mName',		    type	: 'string'},
		{name	: 'lName',		    type	: 'string'},
		{name	: 'birthDate', 	    type	: 'string'},
		{name	: 'sex',		    type	: 'string'},
		{name	: 'email',	        type	: 'string'},
		{name	: 'classification',	type	: 'string'}
	],
    
    getFullName: function() {
        return this.getData().lName + ', ' + this.getData().fName + ' ' + this.getData().mName;
    }
});
