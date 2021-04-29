/*
    Objeto de configuração padrão para Qlik Cloud
        {
            host: 'grupoitg-nordica.us.qlikcloud.com',
            prefix: '/',
            port: 443,
            isSecure: true,
            webIntegrationId: 'zQLeIH8-uf87QC9JyLRsdrdZpvhVlkli'
        }
     Instruções:
    Utilize o método connectQCS para conectar-se à Qlik Cloud, utilizando o objeto acima.

    Objeto de configuração padrão para o Qlik Enterprise


        {
            host: 'qspoc.nordica.net.br',
            prefix: '/',
            port: 443,
            isSecure: true
        }        
    Instruções:
    Utilize o método connectQSE para conectar-se à Qlik Enterprise, utilizando o objeto acima.
   
*/

const engine = {

    connectQCS: (config) => new Promise((resolve) => {
        const tenantUri = `https://${config.host}`;

        engine.request(
            config,
            tenantUri,
            '/api/v1/users/me'
        ).then((user) => {
            console.log(`Logged in, ${user.name}`);
            engine.loadCapSAAS(config).then(() => {
                window.requirejs.config({
                    webIntegrationId: config.webIntegrationId,
                    baseUrl: `${tenantUri}${config.prefix}resources`
                });

                window.requirejs(['js/qlik'], (qlik) => {
                    resolve(qlik);
                });
            });
        }, () => {
            console.log('Redirecting to Qlik Cloud...');
            const returnTo = encodeURIComponent(window.location.href);
            window.location.href = `${tenantUri}/login?returnto=${returnTo}&qlik-web-integration-id=${config.webIntegrationId}`;
        });
    }),

    connectQSE: (config) => new Promise((resolve) => {
        engine.loadCapabilityApis(config).then(() => {
            const protocol = config.isSecure ? 'https://' : 'http://';
            const port = config.port ? `:${config.port}` : '';
            window.requirejs.config({
                baseUrl: `${protocol}${config.host}${port}${config.prefix}resources`
            });
            window.requirejs(['js/qlik'], (qlik) => resolve(qlik));
        });
    }),

    request: (config, tenantUri, path, returnJson = true) => new Promise((resolve, reject) => {
        fetch(`${tenantUri}${path}`, {
            mode: 'cors',
            credentials: 'include',
            redirect: 'follow',
            headers: {
                'qlik-web-integration-id': config.webIntegrationId
            }
        }).then((res) => {
            if (res.status < 200 || res.status >= 400) reject(res);
            return returnJson ? resolve(res.json()) : resolve(res);
        }, (err) => { reject(err); });
    })
};

export default engine;