export default class List {
    constructor(ApiClient) {
        this.ApiClient = ApiClient
    }

    /**
     * Get all lists
     *
     * @param {Object} parameters Query parameters
     * @param {number} [parameters.limit=100] Max number of results per page
     * @param {string} [parameters.starting_after] Cursor that points to the end of the page
     * @returns {Promise} API response
     */
    async getAll(parameters) {
        return await this.ApiClient.baseRequest('lists', {params: parameters})
    }

    /**
     * Create a list
     *
     * @param {string} listName The name of the list (max 255 characters)
     * @returns {Promise} API response
     */
    async create(listName) {
        return await this.ApiClient.baseRequest('lists', {
            method: 'POST',
            data: {"name": listName}
        })
    }

    /**
     * Get a list by ID
     *
     * @param {string} listId The ID of the list (format: 00000000-0000-0000-0000-000000000000)
     * @returns {Promise} API response
     */
    async getList(listId) {
        return await this.ApiClient.baseRequest(`lists/${listId}`)
    }

    /**
     * Update a list
     *
     * @param {string} listId The ID of the list (format: 00000000-0000-0000-0000-000000000000)
     * @param {string} listName The name of the list (max 255 characters)
     * @returns {Promise} API response
     */
    async update(listId, listName) {
        return await this.ApiClient.baseRequest(`lists/${listId}`, {
            method: 'PUT',
            data: {"name": listName}
        })
    }

    /**
     * Delete a list by ID
     *
     * @param {string} listId The ID of the list (format: 00000000-0000-0000-0000-000000000000)
     * @returns {Promise} API response
     */
    async delete(listId) {
        return await this.ApiClient.baseRequest(`lists/${listId}`, {
            method: 'DELETE'
        })
    }
}