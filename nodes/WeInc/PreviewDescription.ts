import type { INodeProperties } from 'n8n-workflow';

export const previewOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: { show: { resource: ['preview'] } },
		options: [
			{
				name: 'Get URLs',
				value: 'get',
				action: 'Get preview links for a project',
				description: 'Get the live site URL (if published), editor URL and embeddable preview URL',
				routing: {
					request: { method: 'GET', url: '=/projects/{{$parameter.projectId}}/preview' },
				},
			},
		],
		default: 'get',
	},
];

export const previewFields: INodeProperties[] = [
	{
		displayName: 'Project ID',
		name: 'projectId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: { show: { resource: ['preview'], operation: ['get'] } },
	},
];
