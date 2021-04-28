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

let config = {
	host: 'grupoitg-nordica.us.qlikcloud.com',
	prefix: '/',
	port: 443,
	isSecure: true,
	webIntegrationId: 'zQLeIH8-uf87QC9JyLRsdrdZpvhVlkli'
}

require.config( {
    baseUrl: ( config.isSecure ? "https://" : "http://" ) + config.host + (config.port ? ":" + config.port : "") + config.prefix + "resources",
    webIntegrationId: config.webIntegrationId
} );


script.onload = async () => {
	requirejs.config({
	  baseUrl: baseUrl + '/resources',
	  webIntegrationId: config.webIntegrationId
	});
  
	// build a single-sign on URL and return back here once completed:
	const loginUrl = new URL(`${baseUrl}/login`);
	loginUrl.searchParams.append('returnto', location.href);
	loginUrl.searchParams.append('qlik-web-integration-id', config.webIntegrationId);
	
	const loginBtn = document.querySelector('#login');
	loginBtn.addEventListener('click', () => { location.href = loginUrl; });
	
	const logoutBtn = document.querySelector('#logout');
	logoutBtn.addEventListener('click', () => { location.href = new URL(`${baseUrl}/logout`); });
  
	const [user, tenant] = await Promise.all([getUser(), getTenant()]);
	if (user || tenant) {
	  loginBtn.disabled = true;
	  logoutBtn.disabled = false;
	  document.querySelector('.logged_in').style.opacity = 0;
	  document.querySelector('.logged_out').style.opacity = 1;
	  document.querySelector('#user').innerHTML = user.name;
	  document.querySelector('#tenant').innerHTML = tenant.name;
	  initMashup();
	} else {
	  loginBtn.disabled = false;
	  logoutBtn.disabled = true;
	  document.querySelector('.logged_in').style.opacity = 1;
	  document.querySelector('.logged_out').style.opacity = 0;
	}
  };

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
