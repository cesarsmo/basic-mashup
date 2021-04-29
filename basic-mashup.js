/*
 * Basic responsive mashup template
 * @owner Enter you name here (xxx)
 */
/*
 *    Fill in host and port for Qlik engine
 */
// var prefix = window.location.pathname.substr( 0, window.location.pathname.toLowerCase().lastIndexOf( "/extensions" ) + 1 );

var config = {
		host: 'https://grupoitg-nordica.us.qlikcloud.com',
		port: '443',
		isSecure: true,
		prefix: '/',
		webIntegrationId: 'zQLeIH8-uf87QC9JyLRsdrdZpvhVlkli',
		appId: '08e09f10-fb84-49a7-b52d-5e1bc7daff73',
};

require.config( {
    baseUrl: ( config.isSecure ? "https://" : "http://" ) + config.host + (config.port ? ":" + config.port : "") + config.prefix + "resources",
    webIntegrationId: config.webIntegrationId
} );

// build a single-sign on URL and return back here once completed:
const loginUrl = new URL(baseUrl+'/login');
loginUrl.searchParams.append('returnto', location.href);
loginUrl.searchParams.append('qlik-web-integration-id', config.webIntegrationId);

require( ["js/qlik"], function ( qlik ) {
	qlik.on( "error", function ( error ) {
		$( '#popupText' ).append( error.message + "<br>" );
		$( '#popup' ).fadeIn( 1000 );
	} );
	$( "#closePopup" ).click( function () {
		$( '#popup' ).hide();
	} );

	//callbacks -- inserted here --
	//open apps -- inserted here --
	// var app = qlik.openApp('4aef20d3-a3a7-4e93-9e65-70f11b624521', config);
	// var app = qlik.openApp('Helpdesk Management.qvf', config);
	var app = qlik.openApp('999759c8-696c-4009-9546-0e658a9c6fdc', config);

	//get objects -- inserted here --
	app.getObject('QV03','JARjh');
	app.getObject('QV02','jTuCwkB');
	app.getObject('QV01','JsVPe');
	app.getObject('QV04','PAppmU', {noSelections:"true"});
	//create cubes and lists -- inserted here --

} );
