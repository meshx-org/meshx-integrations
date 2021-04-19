import { IIntegration } from './interfaces/integration'

export const getIntegrationNodes = (integrations: IIntegration[]) =>
    integrations.map((integration) => ({
        actions: integration.actions.map(({ id, inputPortsSchema, outputPortsSchema, display, action }) => ({
            integrationName: integration.name,
            id,
            display: { ...display, iconUrl: integration.display.iconUrl },
            action,
            outputSchema: outputPortsSchema,
            inputSchema: inputPortsSchema,
        })),
        triggers: integration.triggers.map(({ id, display, outputPortSchema }) => ({
            integrationName: integration.name,
            id,
            display: { ...display, iconUrl: integration.display.iconUrl },
            outputSchema: outputPortSchema,
        })),
    }))
