export default class Tag {
    constructor(ApiClient) {
        this.ApiClient = ApiClient
    }

    /**
     * Get all tags from a list
     * @param {string} listId - The ID of the list (UUID format)
     * @param {Object} parameters - Query parameters
     * @param {number} [parameters.limit=100] - Max number of results per page
     * @param {string} [parameters.starting_after] - Cursor that points to the end of the page
     * @returns {Promise} Response from the API
     */
    async getAll(listId, parameters) {
        return await this.ApiClient.baseRequest(`lists/${listId}/tags`, {params: parameters})
    }

    /**
     * Create a new tag in a list
     * @param {string} listId - The ID of the list (UUID format)
     * @param {string} tagName - The name of the tag
     * @returns {Promise} Response from the API
     */
    async create(listId, tagName) {
        return await this.ApiClient.baseRequest(`lists/${listId}/tags`, {
            method: 'POST',
            data: {"tag": tagName}
        })
    }

    /**
     * Update a tag in a list
     * @param {string} listId - The ID of the list (UUID format)
     * @param {string} tag - A unique identifier for a field
     * @param {Object} [data] - Request body
     * @param {string} [data.tag] - The name of the tag
     * @returns {Promise} Response from the API
     */
    async update(listId, tag) {
        return await this.ApiClient.baseRequest(`lists/${listId}/tags/${tag}`, {
            method: 'PUT',
            data: {"tag": tag}
        })
    }

    /**
     * Delete a tag from a list
     * @param {string} listId - The ID of the list (UUID format)
     * @param {string} tag - A unique identifier for a field
     * @returns {Promise} Response from the API
     */
    async delete(listId, tag) {
        return await this.ApiClient.baseRequest(`lists/${listId}/tags/${tag}`, {
            method: 'DELETE'
        })
    }
}