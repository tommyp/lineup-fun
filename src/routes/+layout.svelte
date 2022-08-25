<script>
	import '$lib/styles/global.css';

	import * as Sentry from '@sentry/browser';
	import { BrowserTracing } from '@sentry/tracing';
	import Footer from '../lib/components/Footer.svelte';

	Sentry.init({
		dsn: 'https://346b7ffb0b5542ce846f1b19d12a0434@o160551.ingest.sentry.io/6676385',
		integrations: [new BrowserTracing()],

		// Set tracesSampleRate to 1.0 to capture 100%
		// of transactions for performance monitoring.
		// We recommend adjusting this value in production
		tracesSampleRate: 1.0
	});
</script>

<slot />

<Footer />
