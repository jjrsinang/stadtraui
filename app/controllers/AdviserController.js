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
                    itemclick: this.onClickViewAdviser
             },
             'teacher-table #nameFilterField': {
                    keyup: this.onNameFilterKeyup
             },
             'teacher-table #employeeNoFilterField': {
                    keyup: this.onEmployeeNoFilterKeyup
             }
         });
     },

     onClickViewAdviser: function(grid, record, item, index, e, eOpts) {
		  // create adviser info window and load info into form
          var window = Ext.create('Stadtra.view.homepage.AdviserInfo');
		  window.show();
		  window.down('form').loadRecord(record);
          
          // create grid, fill it with advisees, and add it to info window
          var store = Ext.create('Stadtra.store.StudentStore');
          for (var i = 0; i < record.getData().students.length; i++) {
               console.log(record.getData().students[i].student);
               store.add(record.getData().students[i].student);
          }
          var studentGrid = Ext.create('Ext.grid.Panel',{
               xtype: 'grid',
               minHeight: 100,
               emptyText: 'there are no advisees',
               viewConfig: {
                    deferEmptyText: false
               },
               store: store,
               columns: [
                    {
                         text: 'Student No',
                         dataIndex: 'studentNo',
                         flex: 1
                    },
                    {
                         text: 'Name',
                         dataIndex: 'lName',
                         flex: 2,
                         renderer: function(value, cls, record) {
                              return record.getFullName();
                         }
                    },
                    {
                         text: 'Classification',
                         dataIndex: 'classification',
                         flex: 2
                    }
               ]
          });
          
          window.add(studentGrid);
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