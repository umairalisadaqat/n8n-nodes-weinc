import type { INodeProperties } from 'n8n-workflow';

const showFor = (operation: string[]) => ({ resource: ['project'], operation });

export const projectOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: { show: { resource: ['project'] } },
		options: [
			{
				name: 'Create',
				value: 'create',
				action: 'Create a project',
				description: 'Create a project in a client account',
				routing: {
					request: { method: 'POST', url: '/projects' },
					output: { postReceive: [{ type: 'rootProperty', properties: { property: 'project' } }] },
				},
			},
			{
				name: 'Get',
				value: 'get',
				action: 'Get a project',
				routing: {
					request: { method: 'GET', url: '=/projects/{{$parameter.projectId}}' },
					output: { postReceive: [{ type: 'rootProperty', properties: { property: 'project' } }] },
				},
			},
			{
				name: 'Get Many',
				value: 'getAll',
				action: 'Get many projects',
				routing: {
					request: { method: 'GET', url: '/projects' },
					output: { postReceive: [{ type: 'rootProperty', properties: { property: 'projects' } }] },
				},
			},
			{
				name: 'Update',
				value: 'update',
				action: 'Update a project',
				routing: {
					request: { method: 'PATCH', url: '=/projects/{{$parameter.projectId}}' },
					output: { postReceive: [{ type: 'rootProperty', properties: { property: 'project' } }] },
				},
			},
		],
		default: 'getAll',
	},
];

export const projectFields: INodeProperties[] = [
	{
		displayName: 'Project ID',
		name: 'projectId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: { show: showFor(['get', 'update']) },
	},

	// Create
	{
		displayName: 'Client Email',
		name: 'clientEmail',
		type: 'string',
		placeholder: 'name@email.com',
		required: true,
		default: '',
		description: 'Email of an existing client in your organization who has activated their account',
		displayOptions: { show: showFor(['create']) },
		routing: { send: { type: 'body', property: 'client_email' } },
	},
	{
		displayName: 'Name',
		name: 'name',
		type: 'string',
		required: true,
		default: '',
		displayOptions: { show: showFor(['create']) },
		routing: { send: { type: 'body', property: 'name' } },
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: { show: showFor(['create']) },
		options: [
			{
				displayName: 'Description',
				name: 'description',
				type: 'string',
				default: '',
				routing: { send: { type: 'body', property: 'description' } },
			},
			{
				displayName: 'Template ID',
				name: 'templateId',
				type: 'string',
				default: '',
				description: 'ID of one of your organization templates to start from',
				routing: { send: { type: 'body', property: 'template_id' } },
			},
		],
	},

	// Update
	{
		displayName: 'Update Fields',
		name: 'updateFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: { show: showFor(['update']) },
		options: [
			{
				displayName: 'Description',
				name: 'description',
				type: 'string',
				default: '',
				routing: { send: { type: 'body', property: 'description' } },
			},
			{
				displayName: 'Name',
				name: 'name',
				type: 'string',
				default: '',
				routing: { send: { type: 'body', property: 'name' } },
			},
			{
				displayName: 'Status',
				name: 'status',
				type: 'options',
				options: [
					{ name: 'Active', value: 'active' },
					{ name: 'Archived', value: 'archived' },
				],
				default: 'active',
				routing: { send: { type: 'body', property: 'status' } },
			},
		],
	},

	// Get Many
	{
		displayName: 'Limit',
		name: 'limit',
		type: 'number',
		typeOptions: { minValue: 1 },
		default: 50,
		description: 'Max number of results to return',
		displayOptions: { show: showFor(['getAll']) },
		routing: { send: { type: 'query', property: 'limit' } },
	},
	{
		displayName: 'Filters',
		name: 'filters',
		type: 'collection',
		placeholder: 'Add Filter',
		default: {},
		displayOptions: { show: showFor(['getAll']) },
		options: [
			{
				displayName: 'Client ID',
				name: 'clientId',
				type: 'string',
				default: '',
				description: 'Only projects belonging to this client',
				routing: { send: { type: 'query', property: 'client_id' } },
			},
			{
				displayName: 'Name Contains',
				name: 'q',
				type: 'string',
				default: '',
				routing: { send: { type: 'query', property: 'q' } },
			},
			{
				displayName: 'Offset',
				name: 'offset',
				type: 'number',
				typeOptions: { minValue: 0 },
				default: 0,
				description: 'Number of projects to skip, for paging',
				routing: { send: { type: 'query', property: 'offset' } },
			},
			{
				displayName: 'Status',
				name: 'status',
				type: 'options',
				options: [
					{ name: 'Active', value: 'active' },
					{ name: 'Archived', value: 'archived' },
				],
				default: 'active',
				routing: { send: { type: 'query', property: 'status' } },
			},
		],
	},
];
