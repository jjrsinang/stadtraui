Ext.define('Stadtra.model.AdviserModel', {

	extend		: 'Ext.data.Model',
	
	idProperty	: 'id',
	
	fields		: [
		{name	: 'id',				type	: 'int'},
		{name	: 'employeeNo',		type	: 'string'},
		{name	: 'fName',		    type	: 'string'},
		{name	: 'mName',		    type	: 'string'},
		{name	: 'lName',		    type	: 'string'},
		{name	: 'birthDate', 	    type	: 'string'},
		{name	: 'sex',		    type	: 'string'},
		{name	: 'email',	        type	: 'string'},
        {name   : 'students'}
	],
    
    associations: [{
		type	: 'hasMany',
		model	: 'Stadtra.model.TeacherStudentModel',
		name	: 'students',
		associationKey: 'students'
	}],
    
    getFullName: function() {
        return this.getData().lName + ', ' + this.getData().fName + ' ' + this.getData().mName;
    }
});
