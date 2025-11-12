export default class Campaign {
    constructor(ApiClient) {
        this.ApiClient = ApiClient
    }

    /**
     * Get a list of campaigns
     *
     * @param {Object} parameters - Query parameters
     * @param {number} [parameters.limit=100] - Max number of results per page
     * @param {string} [parameters.starting_after] - Cursor that points to the end of the page
     * @returns {Promise} API response containing campaigns
     */
    async getAll(parameters) {
        return await this.ApiClient.baseRequest('campaigns', {params: parameters})
    }

    /**
     * Get campaign by id.
     *
     * @param {string} campaignId - The ID of the campaign. Example: 00000000-0000-0000-0000-000000000000
     * @returns {Promise} API response containing a campaign
     */
    async getCampaign(campaignId) {
        return await this.ApiClient.baseRequest(`campaigns/${campaignId}`)
    }

    /**
     * Get campaign contact reports.
     *
     * @param {string} campaignId - The ID of the campaign. Example: 00000000-0000-0000-0000-000000000000
     * @param {Object} [parameters] - Query parameters
     * @param {number} [parameters.limit=100] - Max number of results per page
     * @param {string} [parameters.starting_after] - Cursor that points to the end of the page
     * @param {string} parameters.status required. - The status of the report. Enum: "bounced" "clicked" "complained" "opened" "sent" "unsubscribed" "not-opened" "not-clicked"
     * @returns {Promise} API response containing campaign contact reports
     */
    async getCampaignContactReports(campaignId, parameters) {
        return await this.ApiClient.baseRequest(`campaigns/${campaignId}/reports`, {params: parameters})
    }

    /**
     * Get campaign links report.
     *
     * @param {string} campaignId - The ID of the campaign. Example: 00000000-0000-0000-0000-000000000000
     * @returns {Promise} API response containing campaign links report
     */
    async getCampaignLinksReport(campaignId) {
        return await this.ApiClient.baseRequest(`campaigns/${campaignId}/reports/links`)
    }

    /**
     * Get a campaign summary report.
     *
     * @param {string} campaignId - The ID of the campaign. Example: 00000000-0000-0000-0000-000000000000
     * @returns {Promise} API response containing a campaign summary report
     */
    async getCampaignSummaryReport(campaignId) {
        return await this.ApiClient.baseRequest(`campaigns/${campaignId}/reports/summary`)
    }
}