Ext.define('Stadtra.controllers.StudentTableController', {
     extend: 'Ext.app.Controller',
     
	 requires: [
		'Stadtra.view.homepage.StudentInfo'
	 ],
	 
     alias: 'controller.studenttablecontroller',
     
     views: [
          'homepage.StudentTable',
     ],
     
     init: function() {
          // view events to listen to
         this.control({
             'student-table': {
                    itemclick: this.onClickViewStudent
             },
             '#nameFilterField': {
                    keyup: this.onNameFilterKeyup
             },
             '#studentNoFilterField': {
                    keyup: this.onStudentNoFilterKeyup
             }
         });
     },

     onClickViewStudent: function(grid, record, item, index, e, eOpts) {
		  var window = Ext.create('Stadtra.view.homepage.StudentInfo');
		  window.show();
		  window.down('form').loadRecord(record);
     },
     
     // TO DO: merge into a single function
     onNameFilterKeyup: function(textfield, e, eOpts) {
        var grid = Ext.ComponentQuery.query('student-table')[0],
            // Access the field using its "reference" property name.
            filterField = Ext.ComponentQuery.query('#nameFilterField')[0],
            filters = grid.store.getFilters();

        if (filterField.value) {
            this.nameFilter = filters.add({
                id            : 'nameFilter',
                property      : 'lName',
                value         : filterField.value,
                anyMatch      : true,
                caseSensitive : false
            });
        } else if (this.nameFilter) {
            filters.remove(this.nameFilter);
            this.nameFilter = null;
        }
    },
    
    onStudentNoFilterKeyup: function(textfield, e, eOpts) {
        var grid = Ext.ComponentQuery.query('student-table')[0],
            // Access the field using its "reference" property name.
            filterField = Ext.ComponentQuery.query('#studentNoFilterField')[0],
            filters = grid.store.getFilters();

        if (filterField.value) {
            this.nameFilter = filters.add({
                id            : 'studentNoFilter',
                property      : 'studentNo',
                value         : filterField.value,
                anyMatch      : true,
                caseSensitive : false
            });
        } else if (this.nameFilter) {
            filters.remove(this.nameFilter);
            this.nameFilter = null;
        }
    }
     
 });