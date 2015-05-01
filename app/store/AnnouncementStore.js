Ext.define('Stadtra.store.AnnouncementStore', {
	extend	: 'Ext.data.Store',
    requires: [
        'Stadtra.model.AnnouncementModel'
    ],
	autoLoad: false,
	pageSize: 10,
	model	: 'Stadtra.model.AnnouncementModel',
	remoteFilter: true,
	/*proxy	: {
		type	:	'rest',
		enablePaging : true,
        url: '/stadtra/ws/announcements',
		reader : {
			type			: 'json',
			rootProperty	: 'data',
			totalProperty	: 'recordCount',
			successProperty : 'success'
		}
	}*/
	
			data: [
				{
					title: 'AAAAAAAAAAAA',
					body: 'haha camae camae camae camae camaecamae camae camae camae camaecamae camae camae camae camaecamae camae camae camae camaecamae camae camae camae camae',
					form: 'haha'
				},
				{
					title: 'BBBBBBBBBBBBBBB',
					body: 'hihihihihihihi lalala lalala lalallalallala lalala laaaaaaaaaaaaaaaaaaaaaa llsssssssssssk kmaklsd',
					form: 'hihihihihihihi'
				},
				{
					title: 'CCC',
					body: 'huhuhu klasdmkasmd akmsdlkamsc aklmaskdalskdm lkasmdlka. kalsmdlkasmd kmasdkm kfmkgr gernkwr sncsmdlfks lkweeroqwda kasdkams woejqowepoqweo.',
					form: 'huhuhu'
				}
			]
	
	
});