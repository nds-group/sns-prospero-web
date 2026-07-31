// Increment this version whenever an optional purpose/category changes.
// Existing choices will then expire and the consent panel will be shown again.
export const CONSENT_VERSION = 1;
export const CONSENT_STORAGE_KEY = 'prospero-cookie-consent';
export const CONSENT_MAX_AGE_DAYS = 365;
export const GOOGLE_ANALYTICS_ID = 'G-F9XZXQ35LK';

// Future optional services must have a category here and may only start when
// window.prosperoConsent.has(category) is true. They can also listen for the
// `prospero:consent-changed` document event to respond to later changes.
export const consentCategories = [
	{
		id: 'necessary',
		title: 'Strictly necessary',
		description:
			'Required to remember your privacy choice and provide the website. These technologies cannot be disabled.',
		required: true,
	},
	{
		id: 'analytics',
		title: 'Analytics',
		description:
			'Helps us understand how the website is used through Google Analytics. Google Analytics is not loaded unless you accept.',
		required: false,
	},
] as const;
