export default class Field {
    constructor(ApiClient) {
        this.ApiClient = ApiClient
    }

    /**
     * Creates a new field in a list
     * @param {string} listId - The ID of the list
     * @param {string} label - A human-readable label for the field
     * @param {string} tag - The ID used to reference the field in your emails
     * @param {('text'|'number'|'date')} type - The type of the field
     * @param {string|null} [fallback] - A default value for the field, used in campaigns when there is no other value available
     * @returns {Promise<*>}
     */
    async create(listId, label, tag, type, fallback) {
        return await this.ApiClient.baseRequest(`lists/${listId}/fields`, {
            method: 'POST',
            data: {
                "label": label,
                "tag": tag,
                "type": type,
                "fallback": fallback ?? null,
            }
        })
    }

    /**
     * Creates a new choice field in a list
     * @param {string} listId - The ID of the list
     * @param {string} label - A human-readable label for the field
     * @param {string} tag - The ID used to reference the field in your emails
     * @param {('choice_single'|'choice_multiple')} type - The type of the field
     * @param {string[]} choices - An array of choices for the field
     * @param {string|null} [fallback] - A default value for the field, used in campaigns when there is no other value available
     * @returns {Promise<*>}
     */
    async createChoiceField(listId, label, tag, type, choices = [], fallback) {
        return await this.ApiClient.baseRequest(`lists/${listId}/fields`, {
            method: 'POST',
            data: {
                "label": label,
                "tag": tag,
                "type": type,
                "choices": choices,
                "fallback": fallback ?? null,
            }
        })
    }

    /**
     * Updates an existing field in a list
     * @param {string} listId - The ID of the list
     * @param {string} tag - A unique identifier for a field
     * @param {string} label - A human-readable label for the field
     * @param {('text'|'number'|'date')} type - The type of the field
     * @param {string|null} [fallback] - A default value for the field, used in campaigns when there is no other value available
     * @returns {Promise<*>}
     */
    async update(listId, tag, label, type, fallback) {
        return await this.ApiClient.baseRequest(`lists/${listId}/fields/${tag}`, {
            method: 'PUT',
            data: {
                "label": label,
                "tag": tag,
                "type": type,
                "fallback": fallback ?? null,
            }
        })
    }

    /**
     * Deletes a field from a list
     * @param {string} listId - The ID of the list
     * @param {string} tag - A unique identifier for a field
     * @returns {Promise<*>}
     */
    async delete(listId, tag) {
        return await this.ApiClient.baseRequest(`lists/${listId}/fields/${tag}`, {
            method: "DELETE"
        })
    }
}