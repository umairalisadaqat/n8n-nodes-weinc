import type { INodeProperties } from 'n8n-workflow';

export const clientOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: { show: { resource: ['client'] } },
		options: [
			{
				name: 'Create',
				value: 'create',
				action: 'Create a client',
				description: 'Add a client to your organization',
				routing: {
					request: { method: 'POST', url: '/clients' },
					output: { postReceive: [{ type: 'rootProperty', properties: { property: 'client' } }] },
				},
			},
			{
				name: 'Get Many',
				value: 'getAll',
				action: 'Get many clients',
				routing: {
					request: { method: 'GET', url: '/clients' },
					output: { postReceive: [{ type: 'rootProperty', properties: { property: 'clients' } }] },
				},
			},
		],
		default: 'getAll',
	},
];

export const clientFields: INodeProperties[] = [
	{
		displayName: 'Email',
		name: 'email',
		type: 'string',
		placeholder: 'name@email.com',
		required: true,
		default: '',
		displayOptions: { show: { resource: ['client'], operation: ['create'] } },
		routing: { send: { type: 'body', property: 'email' } },
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: { show: { resource: ['client'], operation: ['create'] } },
		options: [
			{
				displayName: 'Company',
				name: 'company',
				type: 'string',
				default: '',
				routing: { send: { type: 'body', property: 'company' } },
			},
			{
				displayName: 'Name',
				name: 'name',
				type: 'string',
				default: '',
				routing: { send: { type: 'body', property: 'name' } },
			},
			{
				displayName: 'Plan ID',
				name: 'planId',
				type: 'string',
				default: '',
				description: 'ID of one of your organization plans',
				routing: { send: { type: 'body', property: 'plan_id' } },
			},
		],
	},
];
