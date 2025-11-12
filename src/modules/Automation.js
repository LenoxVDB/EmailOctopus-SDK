export default class Automation {
    constructor(ApiClient) {
        this.ApiClient = ApiClient
    }

    /**
     * Start an automation for a specific contact. The automation must have the Started via API trigger type.
     * A contact can only trigger an automation once, unless you've enabled to Allow contacts to repeat in the automation's settings.
     *
     * @return {Promise<object>} A promise that resolves to the server's response for the automation queue request.
     * @param automationId The ID of the automation. Example: 00000000-0000-0000-0000-000000000000
     * @param contactId The ID of the contact, or an MD5 hash of the lowercase version of the contact's email address.
     */
    async start(automationId, contactId) {
        return await this.ApiClient.baseRequest(`automations/${automationId}/queue`, {
            method: 'POST',
            data: {contactId}
        })
    }
}