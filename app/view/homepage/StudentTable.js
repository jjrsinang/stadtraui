Ext.define('Stadtra.view.homepage.StudentTable', {
    extend: 'Ext.grid.Panel',
    xtype: 'student-table',


    bbar: {
        items: [{
            xtype: 'component',
            itemId: 'order'
        }]
    },

    columns: [{
        text: 'Name',
        flex: 1 ,
        dataIndex: 'name'
    }, {
        text: 'Student Number',
        width: 125,
        dataIndex: 'studentNumber'
    }, {
        text: 'Birthday',
        width: 125,
        dataIndex: 'date',
		xtype: 'datecolumn',
		format: 'M-d-y'
    }],
    height: 350,
    width : 600,
    multiColumnSort: true,

    initComponent: function () {
        var me = this;

        me.store = new Ext.data.Store({
            fields: [
               {name: 'date', type: 'date'},
               {name: 'studentNumber'},
               {name: 'name'}
            ],
            proxy: {
                type: 'memory',
                data: this.createFakeData(25),
                reader: {
                    type: 'array'
                }
            },
            autoLoad: true,
            sorters: [{
                property: 'rating',
                direction: 'DESC'
            }, 'salary'],
            listeners: {
                sort: me.updateSortTitle,
                scope: me
            }
        });

        me.callParent();
        me.updateSortTitle();
    },

    updateSortTitle: function() {
        var sortDetail = [];

        this.store.getSorters().each(function(sorter) {
            sortDetail.push(sorter.getProperty() + ' ' + sorter.getDirection());
        });
        this.down('#order').update('Sorted By: ' + sortDetail.join(', '));
    },

    /**
     * Returns an array of fake data
     * @param {Number} count The number of fake rows to create data for
     * @return {Array} The fake record data, suitable for usage with an ArrayReader
     */
    createFakeData: function (count) {
        var firstNames  = ['Don', 'Phil', 'Nige', 'Evan', 'Aaron', 'Abe', 'Jamie', 'Doug', 'Craig', 'Mike'],
            lastNames    = ['Griffin', 'Guerrant', 'White', 'Trimboli', 'Conran', 'Elias', 'Avins', 'Hendricks', 'Gering', 'Estes'],
			studYear	= [2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014],
			studNum		= [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
			
        var data = [];
        for (var i = 0; i < (count || 25); i++) {
            var studNum1    = Math.floor(Math.random() * studNum.length),
				studNum2    = Math.floor(Math.random() * studNum.length),
				studNum3    = Math.floor(Math.random() * studNum.length),
				studNum4    = Math.floor(Math.random() * studNum.length),
				studNum5    = Math.floor(Math.random() * studNum.length),
				studNumYear    = Math.floor(Math.random() * studYear.length),
                firstNameId = Math.floor(Math.random() * firstNames.length),
                lastNameId  = Math.floor(Math.random() * lastNames.length),

                studentNumber     = Ext.String.format("{0} - {1}{2}{3}{4}{5}", studYear[studNumYear], studNum[studNum1], studNum[studNum2], studNum[studNum3], studNum[studNum4], studNum[studNum5]),
                name        = Ext.String.format("{0} {1}", firstNames[firstNameId], lastNames[lastNameId]);
				datecolumn = Ext.String.format("Jan-23-98");
				
            data.push([datecolumn, studentNumber, name]);
        }
        return data;
    }
});