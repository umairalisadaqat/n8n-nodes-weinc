import type {
	IAuthenticateGeneric,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class WeIncApi implements ICredentialType {
	name = 'weIncApi';

	displayName = 'WeInc API';

	documentationUrl = 'https://my.we.inc/api/v1/docs';

	properties: INodeProperties[] = [
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			typeOptions: { password: true },
			default: '',
			required: true,
			description:
				'API key generated from your WeInc agency dashboard (starts with wk_)',
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
			baseURL: 'https://my.we.inc/api/v1',
			url: '/projects',
			qs: { limit: 1 },
		},
	};
}
