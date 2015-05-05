Ext.define('Stadtra.controllers.ProfileController', {
     extend: 'Ext.app.Controller',
     
     alias: 'controller.profilecontroller',
     
     requires: [
          'Stadtra.view.homepage.ProfileGradeTable',
          'Stadtra.view.homepage.ProfileSubjectTable'
     ],
     
     views: [
          'homepage.Profile'
     ],
     
     init: function() {
          // view events to listen to
         this.control({
             'profile': {
                    activate: this.onActivate
             }
         });
     },

     onActivate: function() {
          if (Stadtra.app.userSession) {
               
               // fill data
               var profile = Ext.ComponentQuery.query('profile')[0];
               var form = profile.down('form');
               var user = Stadtra.app.userSession.data.user;
               form.getForm().setValues({
                    fName: user.fName,
                    mName: user.mName,
                    lName: user.lName,
                    role: user.role,
                    email: user.student ? user.student.email : user.teacher.email,
                    sex: user.student ? user.student.sex : user.teacher.sex
               });
               
               var hasGrade = profile.down('#formItem').down('grade-table');
               var hasSubject = profile.down('#formItem').down('subject-table');
               var hasAdviser = profile.down('#formItem').down('#adviserGrid');
               var hasAdvisee = profile.down('#formItem').down('#adviseeGrid');
               
               // add approppriate data tables
               if (user.student && !hasGrade && !hasSubject && !hasAdviser) {
                    var subjects = Ext.create('Stadtra.view.homepage.ProfileSubjectTable');
                    var grades = Ext.create('Stadtra.view.homepage.ProfileGradeTable');
                    
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
                                   studentId : user.student.id
                              }
                         }
                    });
                    
                    store.load();
                    
                    var adviserGrid = Ext.create('Ext.grid.Panel',{
                         xtype: 'grid',
                         itemId: 'adviserGrid',
                         maxHeight: 450,
                         width : 700,
                         padding: 10,
                         emptyText: 'there are no advisers',
                         title: 'Advisers',
                         viewConfig: {
                              deferEmptyText: false
                         },
                         store: store,
                         columns: [
                              {
                                   text: 'Employee No',
                                   dataIndex: 'employeeNo',
                                   width: 145
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
                                   width: 175
                              },
                         ]
                    });
                    
                    profile.down('#formItem').add([subjects, grades, adviserGrid]);
               } else if (!user.student && !hasSubject && !hasAdvisee) {
                    var subjects = Ext.create('Stadtra.view.homepage.ProfileSubjectTable');
                    
                    // create grid, fill it with advisees, and add it to info window
                    var store = Ext.create('Stadtra.store.StudentStore');
                    for (var i = 0; i < user.teacher.students.length; i++) {                         
                         store.add(user.teacher.students[i].student);
                    }
                    var studentGrid = Ext.create('Ext.grid.Panel',{
                         xtype: 'grid',
                         maxHeight: 450,
                         width : 700,
                         padding: 10,
                         emptyText: 'there are no advisees',
                         title: 'Advisees',
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
                    
                    profile.down('#formItem').add([subjects, studentGrid]);
               }
          }
     } 
 });