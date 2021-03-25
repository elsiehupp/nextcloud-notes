import { ResourceEntity } from './types';

let isTestingEnv_ = false;

// We need to ensure that there's only one instance of React being used by
// all the packages. In particular, the lib might need React to define
// generic hooks, but it shouldn't have React in its dependencies as that
// would cause the following error:
//
// https://reactjs.org/warnings/invalid-hook-call-warning.html#duplicate-react
//
// So instead, the **applications** include React as a dependency, then
// pass it to any other packages using the shim. Essentially, only one
// package should require React, and in our case that should be one of the
// applications (app-desktop, app-mobile, etc.) since we are sure they
// won't be dependency to other packages (unlike the lib which can be
// included anywhere).

let react_: any = null;

const shim = {
	Geolocation: null as any,

	// msleep_: (ms: number) => {
	// 	return new Promise((resolve: Function) => {
	// 		shim.setTimeout(() => {
	// 			resolve(null);
	// 		}, ms);
	// 	});
	// },

	// Node requests can go wrong is so many different ways and with so
	// many different error messages... This handler inspects the error
	// and decides whether the request can safely be repeated or not.
	fetchRequestCanBeRetried: (error: any) => {
		if (!error) return false;

		// Unfortunately the error 'Network request failed' doesn't have a type
		// or error code, so hopefully that message won't change and is not localized
		if (error.message == 'Network request failed') return true;

		// request to https://public-ch3302....1fab24cb1bd5f.md failed, reason: socket hang up"
		if (error.code == 'ECONNRESET') return true;

		// OneDrive (or Node?) sometimes sends back a "not found" error for resources
		// that definitely exist and in this case repeating the request works.
		// Error is:
		// request to https://graph.microsoft.com/v1.0/drive/special/approot failed, reason: getaddrinfo ENOTFOUND graph.microsoft.com graph.microsoft.com:443
		if (error.code == 'ENOTFOUND') return true;

		// network timeout at: https://public-ch3302...859f9b0e3ab.md
		if (error.message && error.message.indexOf('network timeout') === 0) return true;

		// name: 'FetchError',
		// message: 'request to https://api.ipify.org/?format=json failed, reason: getaddrinfo EAI_AGAIN api.ipify.org:443',
		// type: 'system',
		// errno: 'EAI_AGAIN',
		// code: 'EAI_AGAIN' } } reason: { FetchError: request to https://api.ipify.org/?format=json failed, reason: getaddrinfo EAI_AGAIN api.ipify.org:443
		//
		// It's a Microsoft error: "A temporary failure in name resolution occurred."
		if (error.code == 'EAI_AGAIN') return true;

		// request to https://public-...8fd8bc6bb68e9c4d17a.md failed, reason: connect ETIMEDOUT 204.79.197.213:443
		// Code: ETIMEDOUT
		if (error.code === 'ETIMEDOUT') return true;

		// ECONNREFUSED is generally temporary
		if (error.code === 'ECONNREFUSED') return true;

		return false;
	},

	fetch: (_url: string, _options: any): any => {
		throw new Error('Not implemented');
	},

	fetchText: async (url: string, options: any = null): Promise<string> => {
		const r = await shim.fetch(url, options || {});
		if (!r.ok) throw new Error(`Could not fetch ${url}`);
		return r.text();
	},

	FormData: typeof FormData !== 'undefined' ? FormData : null,

	FileApiDriverLocal: null as any,

	sjclModule: null as any,

	detectAndSetLocale: null as Function,

	Buffer: null as any,
	injectedJs: (_name: string) => '',

	isTestingEnv: () => {
		return isTestingEnv_;
	},

	setIsTestingEnv: (v: boolean) => {
		isTestingEnv_ = v;
	},

};

export default shim;
