Ext.define('Stadtra.controllers.StudentController', {
     extend: 'Ext.app.Controller',
     
	 requires: [
		'Stadtra.view.homepage.StudentInfo',
        'Stadtra.view.homepage.StudentTable'
	 ],
	 
     alias: 'controller.studentcontroller',
     
     models: [
          'Stadtra.model.TeacherStudentModel'
     ],
     
     stores : [
          'Stadtra.store.AdviserStore'
     ],
     
     init: function() {
          // view events to listen to
         this.control({
             'student-table': {
                    itemclick: this.onClickViewStudent
             },
             'student-table #studentNameFilterField': {
                    keyup: this.onNameFilterKeyup
             },
             'student-table #studentNoFilterField': {
                    keyup: this.onStudentNoFilterKeyup
             },
             'student-info #addAdviserButton' : {
                    click: this.addAdviser
             },
             'student-info #saveButton' : {
                    click: this.saveAdviser
             }
         });
     },

     onClickViewStudent: function(grid, record, item, index, e, eOpts) {
          // create student info window and load info into form
          var window = Ext.create('Stadtra.view.homepage.StudentInfo');
		  window.show();
		  window.down('form').loadRecord(record);
          
          var isAdmin = false;
          if (Stadtra.app.userSession.data.user.role == 'admin') {
               isAdmin = true;
          }
          
          // create grid, fill it with advisers, and add it to info window
          var store = Ext.create('Ext.data.Store',{
               model : 'Stadtra.model.TeacherStudentModel',
               pageSize: 9999,
               proxy	: {
                    type	:	'rest',
                    enablePaging : true,
                    url: '/stadtra/ws/students/list_advisers',
                    reader : {
                         type			: 'json',
                         rootProperty	: 'data',
                         totalProperty	: 'recordCount',
                         successProperty : 'success'
                    },
                    extraParams : {
                         studentId : record.data.id
                    }
               }
          });
          
          store.load();
          
          var remoteTeacherStore = Ext.create('Stadtra.store.AdviserStore');
          
          var adviserGrid = Ext.create('Ext.grid.Panel',{
               xtype: 'grid',
               minHeight: 200,
               emptyText: 'there are no advisers',
               viewConfig: {
                    deferEmptyText: false
               },
               plugins: [
                    Ext.create('Ext.grid.plugin.CellEditing', {
                         clicksToEdit: 1,
                         listeners : {
                              beforeedit : function (editor, context) {
                                   // only allow editing of records not yet in database
                                   if (!context.record.phantom) {
                                        return false;
                                   }
                              }
                         }
                    })
               ],
               store: store,
               dockedItems: isAdmin ? [{
                    xtype: 'toolbar',
                    dock: 'bottom',
                    ui: 'footer',
                    layout: {
                        pack: 'center'
                    },
                    items: [
                         {
                              minWidth: 80,
                              text: 'Save',
                              itemId: 'saveButton'
                         }
                    ]
               }, {
                   xtype: 'toolbar',
                   items: [{
                       text:'Add Adviser',
                       itemId: 'addAdviserButton',
                       tooltip:'Add a new adviser'
                   }]
               }] : null,
               columns: [
                    {
                         text: 'Employee No',
                         dataIndex: 'employeeNo',
                         width: 145,
                         editor: {
                              xtype : 'combobox',
                              displayField : 'employeeNo',
                              queryParam : 'employeeNo',
                              store : remoteTeacherStore,
                              listeners : {
                                   change : function (combo, newVal, oldVal) {
                                        if (newVal.length == 0) {
                                             
                                        }
                                   },
                                   blur : function (combo) {
                                        if (combo.getValue().length == 0) {
                                             combo.setValue('<i>click to edit</i>');
                                        }
                                   },
                                   select : function (combo, records) {
                                        // get reference to student by accessing grid
                                        var selected = adviserGrid.getSelectionModel().getSelection()[0];
                                        selected.set('employeeNo', records[0].getData().employeeNo);
                                        selected.set('teacherName', records[0].getFullName());
                                        selected.set('teacherId', records[0].getData().id);
                                   }
                              }
                         }
                    },
                    {
                         text: 'Name',
                         dataIndex: 'teacherName',
                         flex: 1
                    },
                    {
                         xtype: 'datecolumn',
                         format: 'm/d/Y',
                         text: 'Date Approved',
                         dataIndex: 'dateApproved',
                         width: 120,
                         editor: 'datefield'
                    }
               ],
               listeners : {
                    cellclick : function (thisGrid, td, cellIndex, record, tr, rowIndex) {
                         if (cellIndex == 0 && record.getData().employeeNo == '<i>click to edit</i>') {
                              record.set('employeeNo', '');
                         }
                    }
               }
          });
          
          window.add(adviserGrid);
     },
     
     addAdviser: function (button) {
          // get reference to student
          var student = button.up('student-info').down('form').getRecord();
          
          // create student-adviser
          var adviser = Ext.create('Stadtra.model.TeacherStudentModel',{
               studentId : student.data.id,
               studentNo : student.data.studentNo,
               studentName : student.getFullName(),
               employeeNo : '<i>click to edit</i>',
               dateApproved : new Date(),
               isStillEffective : true
          });
          
          // add the created record to the grid
          var grid = button.up('grid');
          var store = grid.getStore();
          store.add(adviser);
     },
     
     saveAdviser: function (button) {
          var store = button.up('grid').getStore();
          //store.sync({
          //     success: function() {
          //          console.log('success');
          //          store.reload();
          //     },
          //     failure: function() {
          //          console.log('failure');
          //     }
          //});
          store.each(function(item){
               if (item.phantom &&
                   item.data.employeeNo &&
                   item.data.teacherName &&
                   item.data.teacherId &&
                   item.data.employeeNo != '<i>click to edit</i>') {
                    item.save({
                         callback : function (records, operation, success) {
                              console.log(records);
                              console.log(operation);
                              console.log(success);
                              Ext.Msg.alert('STADTRA', 'Change of adviser succes');
                         }
                    });
               }
          });
     },
     
     // TO DO: merge into a single function with onStudentNoFilterKeyup
     onNameFilterKeyup: function(textfield, e, eOpts) {
        var grid = Ext.ComponentQuery.query('student-table')[0],
            // Access the field using its "reference" property name.
            filterField = Ext.ComponentQuery.query('#studentNameFilterField')[0],
            filters = grid.store.getFilters();

        if (filterField.value) {
            this.nameFilter = filters.add({
                id            : 'studentNameFilter',
                property      : 'lName',
                value         : filterField.value
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
                value         : filterField.value
            });
        } else if (this.nameFilter) {
            filters.remove(this.nameFilter);
            this.nameFilter = null;
        }
    }
     
 });