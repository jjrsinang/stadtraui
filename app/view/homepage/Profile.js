Ext.define('Stadtra.view.homepage.Profile', {
    extend: 'Ext.panel.Panel',
 
    xtype: 'profile',
        
    title: 'Profile',

    layout: 'center',
    
    autoScroll: true,

    items: [
		{
	        layout: 'form',
	        xtype: 'container',
	        width: 700,

			items: [
				{	
					xtype: 'form',
			        padding: 10,
					defaults: {
						xtype: 'displayfield',
						labelWidth: 200
					},
					items: [
						{ fieldLabel: 'First Name',		name: 'fName'},
						{ fieldLabel: 'Middle Name',	name: 'mName'},
						{ fieldLabel: 'Last Name',		name: 'lName'},
						{ fieldLabel: 'Role',			name: 'role'},
						{ fieldLabel: 'Email Address',	name: 'email'},
						{ fieldLabel: 'Street Address 1' },
						{ fieldLabel: 'Street Address 2' },
						{ fieldLabel: 'City, State' },
						{ fieldLabel: 'ZIP code' },
						{ fieldLabel: 'List of Previous Advisers' },
						{ fieldLabel: 'Current Adviser' },
						{ xtype: 'button', text: 'Change Adviser' }
					]
				},
				{	
					xtype: 'grid',
			        padding: 10,
					title: 'Subjects Currently Taking',
					maxHeight: 450,
					width : 700,
					columns: [
						{
							text: 'Number',
							flex: 1,
							dataIndex: 'courseNumber'
						},
						{
							text: 'Title',
							flex: 1,
							dataIndex: 'courseTitle'
						},
						{
							text: 'Section',
							flex: 1,
							dataIndex: 'section'
						},
						{
							text: 'Units',
							flex: 1,
							dataIndex: 'unit'
						},
						{
							text: 'Lecture',
							flex: 1,
							dataIndex: 'lecture'
						},
						{
							text: 'Lecturer',
							flex: 1,
							dataIndex: 'lecturer'
						},{
							text: 'Lab/Recit',
							flex: 1,
							dataIndex: 'labRecit'
						},
						{
							text: 'Instructor',
							flex: 1,
							dataIndex: 'instructor'
						}
					]
				},
				{	
					xtype: 'grid',
			        padding: 10,
					title: 'Overall Grades',
					maxHeight: 450,
					width : 700,
					columns: [
						{
							text: 'Course',
							flex: 1,
							dataIndex: 'course'
						},
						{
							text: 'Sem/Year Taken',
							flex: 1,
							dataIndex: 'sem'
						},
						{
							text: 'Units',
							flex: 1,
							dataIndex: 'units'
						},
						{
							text: 'Grade',
							flex: 1,
							dataIndex: 'grade'
						}
					]
				}
			]
		}
	]
});