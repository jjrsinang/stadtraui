Ext.define('Stadtra.controllers.AdviserController', {
     extend: 'Ext.app.Controller',
     
	 requires: [
		'Stadtra.view.homepage.AdviserInfo'
	 ],
	 
     alias: 'controller.advisercontroller',
     
     views: [
          'homepage.AdviserTable',
     ],
     
     init: function() {
          // view events to listen to
         this.control({
             'teacher-table': {
                    itemclick: this.onClickViewStudent
             },
             'teacher-table #nameFilterField': {
                    keyup: this.onNameFilterKeyup
             },
             'teacher-table #employeeNoFilterField': {
                    keyup: this.onEmployeeNoFilterKeyup
             }
         });
     },

     onClickViewStudent: function(grid, record, item, index, e, eOpts) {
		  var window = Ext.create('Stadtra.view.homepage.AdviserInfo');
		  window.show();
		  window.down('form').loadRecord(record);
          console.log('number of students: ' + record.getData().students.length);
     },
     
     // TO DO: merge into a single function
     onNameFilterKeyup: function(textfield, e, eOpts) {
        var grid = Ext.ComponentQuery.query('teacher-table')[0],
            // Access the field using its "reference" property name.
            filterField = Ext.ComponentQuery.query('#nameFilterField')[0],
            filters = grid.store.getFilters();

        if (filterField.value) {
            this.nameFilter = filters.add({
                id            : 'adviserNameFilter',
                property      : 'lName',
                value         : filterField.value
            });
        } else if (this.nameFilter) {
            filters.remove(this.nameFilter);
            this.nameFilter = null;
        }
    },
    
    onEmployeeNoFilterKeyup: function(textfield, e, eOpts) {
        var grid = Ext.ComponentQuery.query('teacher-table')[0],
            // Access the field using its "reference" property name.
            filterField = Ext.ComponentQuery.query('#employeeNoFilterField')[0],
            filters = grid.store.getFilters();

        if (filterField.value) {
            this.nameFilter = filters.add({
                id            : 'employeeNoFilter',
                property      : 'employeeNo',
                value         : filterField.value
            });
        } else if (this.nameFilter) {
            filters.remove(this.nameFilter);
            this.nameFilter = null;
        }
    }
     
 });