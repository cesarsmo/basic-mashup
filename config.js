const url = new URL(location.href);

// this should correspond to the QCS tenant URL, or QSE on Kubernetes deployment:
const tenantUrl = url.searchParams.get('tenant') || 'https://grupoitg-nordica.us.qlikcloud.com';

// this should correspond to an web integration id that:
// 1) exists in the `tenantUrl` above (create a new one using Management Console -> Integrations)
// 2) has the domain for this mashup in its whitelisted domain
const webIntegrationId = url.searchParams.get('wiid') || 'zQLeIH8-uf87QC9JyLRsdrdZpvhVlkli';

// should be Helpdesk Management resourceId:
const appId = url.searchParams.get('app') || '08e09f10-fb84-49a7-b52d-5e1bc7daff73';

const tenant = new URL(tenantUrl);

module.exports = {
  host: tenant.hostname,
  port: tenant.port || 443,
  isSecure: true,
  prefix: '/',
  webIntegrationId,
  appId,
};
