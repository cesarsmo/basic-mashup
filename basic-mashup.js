/*
 * Basic responsive mashup template
 * @owner Enter you name here (xxx)
 */
/*
 *    Fill in host and port for Qlik engine
 */
// var prefix = window.location.pathname.substr( 0, window.location.pathname.toLowerCase().lastIndexOf( "/extensions" ) + 1 );

// var config = {
// 	host: window.location.hostname,
// 	prefix: prefix,
// 	port: window.location.port,
// 	isSecure: window.location.protocol === "https:"
// };

// let config = {
// 	host: 'grupoitg-nordica.us.qlikcloud.com',
// 	prefix: '/',
// 	port: 443,
// 	isSecure: true,
// 	webIntegrationId: 'zQLeIH8-uf87QC9JyLRsdrdZpvhVlkli',
// 	appId: '999759c8-696c-4009-9546-0e658a9c6fdc'
// }

const config = require('./config');
const { getUser, getTenant, getAppList, baseUrl } = require('./comm');

const link = document.createElement('link');
link.rel = 'stylesheet';
link.href = `${baseUrl}/resources/autogenerated/qlik-styles.css`;
document.head.appendChild(link);

const script = document.createElement('script');
script.src = `${baseUrl}/resources/assets/external/requirejs/require.js`;

script.onload = async () => {
	require.config({
		baseUrl: baseUrl + '/resources',
		webIntegrationId: config.webIntegrationId
	});

	// build a single-sign on URL and return back here once completed:
	const loginUrl = new URL(`${baseUrl}/login`);
	loginUrl.searchParams.append('returnto', location.href);
	loginUrl.searchParams.append('qlik-web-integration-id', config.webIntegrationId);

	const [user, tenant] = await Promise.all([getUser(), getTenant()]);	

	if (user || tenant) {
		initMashup();
	  } else {
		document.querySelector('.logged_in').style.opacity = 1;
		document.querySelector('.logged_out').style.opacity = 0;
	  }
};

	async function initMashup() {
		require( ["js/qlik"], function ( qlik ) {

			qlik.on( "error", function ( error ) {
				$( '#popupText' ).append( error.message + "<br>" );
				$( '#popup' ).fadeIn( 1000 );
			} );

			$( "#closePopup" ).click( function () {
				$( '#popup' ).hide();
			} );

			const app = qlik.openApp(config.appId);
			app.getObject('CurrentSelections', 'CurrentSelections');

			//callbacks -- inserted here --
			//open apps -- inserted here --
			// var app = qlik.openApp('4aef20d3-a3a7-4e93-9e65-70f11b624521', config);
			// var app = qlik.openApp('Helpdesk Management.qvf', config);
			// var app = qlik.openApp('999759c8-696c-4009-9546-0e658a9c6fdc', config);

			//get objects -- inserted here --
			app.getObject('QV03','JARjh');
			app.getObject('QV02','jTuCwkB');
			app.getObject('QV01','JsVPe');
			app.getObject('QV04','PAppmU', {noSelections:"true"});
			//create cubes and lists -- inserted here --
		});
	}
