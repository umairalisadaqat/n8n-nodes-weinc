import { NodeConnectionTypes, type INodeType, type INodeTypeDescription } from 'n8n-workflow';
import { clientFields, clientOperations } from './ClientDescription';
import { previewFields, previewOperations } from './PreviewDescription';
import { projectFields, projectOperations } from './ProjectDescription';

export class WeInc implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'WeInc',
		name: 'weInc',
		icon: { light: 'file:weinc.svg', dark: 'file:weinc.dark.svg' },
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Manage WeInc website projects, preview URLs and clients',
		defaults: { name: 'WeInc' },
		usableAsTool: true,
		inputs: [NodeConnectionTypes.Main],
		outputs: [NodeConnectionTypes.Main],
		credentials: [{ name: 'weIncApi', required: true }],
		requestDefaults: {
			baseURL: '={{$credentials.baseUrl}}',
			headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
		},
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{ name: 'Client', value: 'client' },
					{ name: 'Preview', value: 'preview' },
					{ name: 'Project', value: 'project' },
				],
				default: 'project',
			},
			...projectOperations,
			...projectFields,
			...previewOperations,
			...previewFields,
			...clientOperations,
			...clientFields,
		],
	};
}
