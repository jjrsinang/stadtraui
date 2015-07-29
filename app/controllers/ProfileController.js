Ext.define('Stadtra.controllers.ProfileController', {
     extend: 'Ext.app.Controller',
     
     alias: 'controller.profilecontroller',
     
     requires: [
          'Stadtra.view.homepage.ProfileGradeTable',
          'Stadtra.view.homepage.ProfileSubjectTable',
          'Stadtra.view.homepage.Profile',
          'Stadtra.view.homepage.NotificationTable'
     ],
     
     init: function() {
          // view events to listen to
         this.control({
             'profile': {
                    activate: this.onActivate
             },
             'profile #changeAdviserButton': {
                    click: this.onClickChangeAdviser
             },
             'notification-table #addRequestButton': {
                    click: this.onClickChangeAdviser
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
                    email: user.student ? user.student.email : user.teacher ? user.teacher.email : null,
                    sex: user.student ? user.student.sex : user.teacher ? user.teacher.sex : null
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
                         frame: true,
                         collapsible: true,
                         margin: '10 0 10 0',
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
                              }
                         ]
                    });
                    
                    profile.down('#formItem').add([subjects, grades, adviserGrid]);
               } else if (user.teacher && !hasSubject && !hasAdvisee) {
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
     },
     
     onClickChangeAdviser: function () {
          var me = this;
          
          var searchStore = Ext.create('Ext.data.Store', {
               model: 'Stadtra.model.AdviserModel',
               idProperty: 'id',
               autoLoad: false,
               proxy: {
                    type: 'rest',
                    url: document.location.href + 'ws/teachers/query/results',
                    reader: {
                        type: 'json',
                        rootProperty: 'data',
                        totalProperty: 'recordCount',
                        successProperty: 'success'
                    }
               }
          });
          
          
          var window = Ext.create('Ext.window.Window',{
               title: 'Select adviser',
               bodyPadding: 10,
               modal: true,
               resizable: false,
               items: [
                    {
                         xtype: 'form',
                         layout: 'vbox',
                         items: [
                              {
                                   xtype: 'combo',
                                   itemId: 'nameCombo',
                                   fieldLabel: 'Last Name',
                                   name: 'lName',
                                   valueField: 'lName',
                                   queryMode: 'remote',
                                   queryParam: 'lName',
                                   store: searchStore,
                                   emptyText: 'lastname',
                                   matchFieldWidth: false,
                                   tpl: '<tpl for="."><div class="x-boundlist-item"><b>{lName}</b>, {fName} {mName}</div></tpl>',
                                   displayTpl: '<tpl for=".">{lName}</tpl>',
                                   listConfig: {
                                       loadingText: 'Searching...',
                                       emptyText: 'No matching teacher found.',
                                       width: 280
                                   }
                              },
                              {
                                   xtype: 'label',
                                   text: 'OR'
                              },
                              {
                                   xtype: 'combo',
                                   itemId: 'employeeNoCombo',
                                   fieldLabel: 'Employee No',
                                   name: 'employeeNo',
                                   valueField: 'employeeNo',
                                   queryMode: 'remote',
                                   queryParam: 'employeeNo',
                                   store: searchStore,
                                   emptyText: 'employee no',
                                   matchFieldWidth: false,
                                   tpl: '<tpl for="."><div class="x-boundlist-item"><b>{employeeNo}</b> - {lName}, {fName} {mName}</div></tpl>',
                                   displayTpl: '<tpl for=".">{employeeNo}</tpl>',
                                   listConfig: {
                                       loadingText: 'Searching...',
                                       emptyText: 'No matching teacher found.',
                                       width: 310
                                   }
                              },
                              {
                                   xtype: 'textarea',
                                   name: 'reason',
                                   fieldLabel: 'Reason',
                                   maxLength: 60
                              },
                              {
                                   xtype: 'displayfield',
                                   itemId: 'errorMsg',
                                   text: '',
                                   hidden: true,
                                   fieldStyle: {
                                        color: 'red',
                                        background: 'transparent'
                                   }
                              },
                              {
                                   xtype: 'button',
                                   text: 'Send request',
                                   handler: function(button) {
                                        
                                        button.up('form').down('#errorMsg').setHidden(true);
                                        
                                        var form = button.up('form');
                                        var request = form.down('textarea').getValue();
                                        var value1 = form.down('#nameCombo').getValue();
                                        var adviser1 = form.down('#nameCombo').findRecord('lName', value1);
                                        var value2 = form.down('#employeeNoCombo').getValue();
                                        var adviser2 = form.down('#employeeNoCombo').findRecord('employeeNo', value2);
                                        
                                        console.log(adviser1);
                                        console.log(adviser2);
                                        
                                        if (adviser1 && adviser2) {
                                             if (adviser1.data.employeeNo != adviser2.data.employeeNo) {
                                                  form.down('#errorMsg').setHidden(false);
                                                  form.down('#errorMsg').setValue('<p font-color="red">Selected teachers dont match!</p>');
                                             } else {
                                                  me.createRequest(adviser1.data.id, request, window);
                                             }
                                        } else if (adviser1 && !adviser2) {
                                             me.createRequest(adviser1.data.id, request, window);
                                        } else if (!adviser1 && adviser2) {
                                             me.createRequest(adviser2.data.id, request, window);
                                        } else {
                                             form.down('#errorMsg').setHidden(false);
                                             form.down('#errorMsg').setValue('<p font-color="red">No teacher selected!</p>');
                                        }
                                   }
                              }
                         ]
                    }
               ]
          });
          
          window.show();
     },
     
     createRequest: function (teacherId, reason, window) {
          var box = Ext.Msg.wait('STADTRA', 'Sending request...');
          Ext.Ajax.request({
               url: document.location.href + 'ws/requests',
               jsonData: {
                    studentId: Stadtra.app.userSession.data.user.student.id,
                    teacherId: teacherId,
                    reason: reason
               },
               method: 'POST',
               callback: function(options, success, reponse) {
                    box.close();
                    if (success) {
                         Ext.Msg.alert('STADTRA', 'Request sent');
                         window.close();
                    } else {
                         Ext.Msg.alert('STADTRA', 'Failed to send request');
                    }
               }
          });
     }
 });