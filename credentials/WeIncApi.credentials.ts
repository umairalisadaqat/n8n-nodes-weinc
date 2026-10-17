import type {
	IAuthenticateGeneric,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class WeIncApi implements ICredentialType {
	name = 'weIncApi';

	displayName = 'WeInc API';

	icon = { light: 'file:weinc.svg', dark: 'file:weinc.dark.svg' } as const;

	documentationUrl = 'https://my.we.inc/api/v1/docs';

	properties: INodeProperties[] = [
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			typeOptions: { password: true },
			default: '',
			required: true,
			description: 'Organization API key from WeInc (starts with wk_)',
		},
		{
			displayName: 'Base URL',
			name: 'baseUrl',
			type: 'string',
			default: 'https://my.we.inc/api/v1',
			description: 'Leave as is unless you use a white-label WeInc domain',
		},
	];

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				Authorization: '=Bearer {{$credentials.apiKey}}',
			},
		},
	};

	test: ICredentialTestRequest = {
		request: {
			baseURL: '={{$credentials.baseUrl}}',
			url: '/projects',
			qs: { limit: 1 },
		},
	};
}
