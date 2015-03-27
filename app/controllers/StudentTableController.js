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
             }
         });
     },

     onClickViewStudent: function(grid, record, item, index, e, eOpts) {
          console.log(record.getData().name);
		  var window = Ext.create('Stadtra.view.homepage.StudentInfo');
		  window.show();
		  window.down('form').loadRecord(record);
     }
     
 });