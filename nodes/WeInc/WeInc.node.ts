import type { INodeType, INodeTypeDescription, NodeConnectionType } from 'n8n-workflow';

export class WeInc implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'WeInc',
		name: 'weInc',
		icon: 'file:weinc.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Interact with the WeInc (we.inc) AI website builder Agency API',
		defaults: {
			name: 'WeInc',
		},
		inputs: ['main'] as NodeConnectionType[],
		outputs: ['main'] as NodeConnectionType[],
		credentials: [
			{
				name: 'weIncApi',
				required: true,
			},
		],
		requestDefaults: {
			baseURL: 'https://my.we.inc/api/v1',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		},
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{ name: 'Project', value: 'project' },
					{ name: 'Client', value: 'client' },
					{ name: 'Analytics', value: 'analytics' },
				],
				default: 'project',
			},

			// ----------------------------------
			// Project operations
			// ----------------------------------
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: { resource: ['project'] },
				},
				options: [
					{
						name: 'List',
						value: 'list',
						action: 'List projects',
						description: 'List all projects',
						routing: {
							request: { method: 'GET', url: '/projects' },
						},
					},
					{
						name: 'Get',
						value: 'get',
						action: 'Get a project',
						description: 'Get details of a project',
						routing: {
							request: {
								method: 'GET',
								url: '=/projects/{{$parameter.projectId}}',
							},
						},
					},
					{
						name: 'Create',
						value: 'create',
						action: 'Create a project',
						description: 'Create a project for a client',
						routing: {
							request: { method: 'POST', url: '/projects' },
						},
					},
					{
						name: 'Get Preview URLs',
						value: 'getPreviewUrls',
						action: 'Get preview urls for a project',
						description: 'Get published and embed preview URLs for a project',
						routing: {
							request: {
								method: 'GET',
								url: '=/projects/{{$parameter.projectId}}/preview',
							},
						},
					},
				],
				default: 'list',
			},

			// Project: List filters
			{
				displayName: 'Limit',
				name: 'limit',
				type: 'number',
				typeOptions: { minValue: 1, maxValue: 100 },
				default: 50,
				description: 'Max number of results to return',
				displayOptions: {
					show: { resource: ['project'], operation: ['list'] },
				},
				routing: {
					request: { qs: { limit: '={{$value}}' } },
				},
			},
			{
				displayName: 'Additional Filters',
				name: 'projectFilters',
				type: 'collection',
				placeholder: 'Add Filter',
				default: {},
				displayOptions: {
					show: { resource: ['project'], operation: ['list'] },
				},
				options: [
					{
						displayName: 'Offset',
						name: 'offset',
						type: 'number',
						default: 0,
						description: 'Number of records to skip',
						routing: {
							request: { qs: { offset: '={{$value}}' } },
						},
					},
					{
						displayName: 'Client ID',
						name: 'clientId',
						type: 'string',
						default: '',
						description: 'Filter projects by client ID',
						routing: {
							request: { qs: { client_id: '={{$value}}' } },
						},
					},
					{
						displayName: 'Status',
						name: 'status',
						type: 'string',
						default: '',
						description: 'Filter projects by status',
						routing: {
							request: { qs: { status: '={{$value}}' } },
						},
					},
				],
			},

			// Project: Get / Get Preview URLs
			{
				displayName: 'Project ID',
				name: 'projectId',
				type: 'string',
				required: true,
				default: '',
				description: 'The UUID of the project',
				displayOptions: {
					show: {
						resource: ['project'],
						operation: ['get', 'getPreviewUrls'],
					},
				},
			},

			// Project: Create
			{
				displayName: 'Client Email',
				name: 'clientEmail',
				type: 'string',
				placeholder: 'name@email.com',
				required: true,
				default: '',
				description: 'Email of the client the project belongs to',
				displayOptions: {
					show: { resource: ['project'], operation: ['create'] },
				},
				routing: {
					request: { body: { client_email: '={{$value}}' } },
				},
			},
			{
				displayName: 'Project Name',
				name: 'projectName',
				type: 'string',
				required: true,
				default: '',
				displayOptions: {
					show: { resource: ['project'], operation: ['create'] },
				},
				routing: {
					request: { body: { name: '={{$value}}' } },
				},
			},
			{
				displayName: 'Additional Fields',
				name: 'projectCreateFields',
				type: 'collection',
				placeholder: 'Add Field',
				default: {},
				displayOptions: {
					show: { resource: ['project'], operation: ['create'] },
				},
				options: [
					{
						displayName: 'Description',
						name: 'description',
						type: 'string',
						default: '',
						routing: {
							request: { body: { description: '={{$value}}' } },
						},
					},
					{
						displayName: 'Template ID',
						name: 'templateId',
						type: 'string',
						default: '',
						description: 'Clone files from an org template (UUID)',
						routing: {
							request: { body: { template_id: '={{$value}}' } },
						},
					},
				],
			},

			// ----------------------------------
			// Client operations
			// ----------------------------------
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: { resource: ['client'] },
				},
				options: [
					{
						name: 'List',
						value: 'list',
						action: 'List clients',
						description: 'List all clients of the agency',
						routing: {
							request: { method: 'GET', url: '/clients' },
						},
					},
				],
				default: 'list',
			},

			// ----------------------------------
			// Analytics operations
			// ----------------------------------
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: { resource: ['analytics'] },
				},
				options: [
					{
						name: 'Get',
						value: 'get',
						action: 'Get analytics',
						description: 'Get aggregated site analytics',
						routing: {
							request: { method: 'GET', url: '/analytics' },
						},
					},
				],
				default: 'get',
			},
			{
				displayName: 'Days',
				name: 'days',
				type: 'number',
				typeOptions: { minValue: 1, maxValue: 365 },
				default: 30,
				description: 'Number of days to look back',
				displayOptions: {
					show: { resource: ['analytics'], operation: ['get'] },
				},
				routing: {
					request: { qs: { days: '={{$value}}' } },
				},
			},
			{
				displayName: 'Project ID',
				name: 'analyticsProjectId',
				type: 'string',
				default: '',
				description: 'Filter analytics for a specific project (UUID). Leave empty for all projects.',
				displayOptions: {
					show: { resource: ['analytics'], operation: ['get'] },
				},
				routing: {
					send: {
						type: 'query',
						property: 'project_id',
						value: '={{$value || undefined}}',
					},
				},
			},
		],
	};
}
