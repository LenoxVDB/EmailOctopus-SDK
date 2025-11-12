export default class Contact {
    constructor(ApiClient) {
        this.ApiClient = ApiClient
    }

    /**
     * Get contacts from a list
     * @param {string} listId - The ID of the list
     * @param {Object} parameters - Query parameters
     * @param {number} [parameters.limit=100] - Max number of results per page
     * @param {string} [parameters.starting_after] - Cursor that points to the end of the page
     * @param {string} [parameters.tag] - The tag associated with the contact
     * @param {('subscribed'|'unsubscribed'|'pending')} [parameters.status='subscribed'] - The status of the contact
     * @param {string} [parameters.created_at.lte] - Filter by creation date - less than or equal to (ISO 8601)
     * @param {string} [parameters.created_at.gte] - Filter by creation date - greater than or equal to (ISO 8601)
     * @param {string} [parameters.last_updated_at.lte] - Filter by update date - less than or equal to (ISO 8601)
     * @param {string} [parameters.last_updated_at.gte] - Filter by update date - greater than or equal to (ISO 8601)
     * @returns {Promise} API Response
     */
    async getContacts(listId, parameters) {
        return await this.ApiClient.baseRequest(`lists/${listId}/contacts`, {
            params: {parameters}
        })
    }

    /**
     * Create or update a contact in a list
     * @param {string} listId - The ID of the list
     * @param {string} email - The email address of the contact
     * @param {Object} [fields={}] - An object containing key/value pairs of field values, using the field's tag as the key
     * @param {Object} [tags={}] - An object containing key/value pairs, where the key is the tag name and the value is true to add the tag or false to remove it
     * @param {('pending'|'subscribed'|'unsubscribed')} [status] - The status of the contact
     * @returns {Promise} API Response
     */
    async createOrUpdate(listId, email, fields = {}, tags = {}, status) {
        return await this.ApiClient.baseRequest(`lists/${listId}/contacts`, {
            method: 'PUT',
            data: {
                "email_address": email,
                "fields": fields,
                "tags": tags,
                "status": status,
            }
        })
    }

    /**
     * Create a new contact in a list
     * @param {string} listId - The ID of the list
     * @param {string} email - The email address of the contact
     * @param {Object} [fields={}] - An object containing key/value pairs of field values, using the field's tag as the key
     * @param {string[]} [tags=[]] - An array of tags associated with the contact
     * @param {('pending'|'subscribed'|'unsubscribed')} [status] - The status of the contact
     * @returns {Promise} API Response
     */
    async create(listId, email, fields = {}, tags = [], status) {
        return await this.ApiClient.baseRequest(`lists/${listId}/contacts`, {
            method: 'POST',
            data: {
                "email_address": email,
                "fields": fields,
                "tags": tags,
                "status": status,
            }
        })
    }

    /**
     * Update multiple contacts in a list
     * @param {string} listId - The ID of the list
     * @param {Array<Object>} contacts - Array of contact objects to update
     * @param {string} [contacts[].id] - The ID of the contact
     * @param {string} [contacts[].email_address] - The email address of the contact
     * @param {Object} [contacts[].fields] - An object containing key/value pairs of field values
     * @param {Object} [contacts[].tags] - An object containing key/value pairs, where key is tag name and value is boolean
     * @param {('pending'|'subscribed'|'unsubscribed')} [contacts[].status] - The status of the contact
     * @returns {Promise} API Response
     */
    async updateBulkContactList(listId, contacts = []) {
        return await this.ApiClient.baseRequest(`lists/${listId}/contacts/batch`, {
            method: 'PUT',
            data: contacts
        })
    }

    /**
     * Get a contact from a list
     * @param {string} listId - The ID of the list. Example: 00000000-0000-0000-0000-000000000000
     * @param {string} contactId - The ID of the contact, or an MD5 hash of the lowercase version of the contact's email address. Example: 631251b876fece73bc9dd647fe596d5f
     * @returns {Promise} API Response
     */
    async getContact(listId, contactId) {
        return await this.ApiClient.baseRequest(`lists/${listId}/contacts/${contactId}`)
    }

    /**
     * Update a contact in a list
     * @param {string} listId - The ID of the list. Example: 00000000-0000-0000-0000-000000000000
     * @param {string} contactId - The ID of the contact, or an MD5 hash of the lowercase version of the contact's email address. Example: 631251b876fece73bc9dd647fe596d5f
     * @param {string} [email] - The email address of the contact.
     * @param {Object} [fields={}] - An object containing key/value pairs of field values, using the field's tag as the key.
     * @param {Object} [tags={}] - An object containing key/value pairs, where the key is the tag name and the value is true to add the tag or false to remove it.
     * @param {('pending'|'subscribed'|'unsubscribed')} [status] - The status of the contact.
     * @returns {Promise} API Response
     */
    async update(listId, contactId, email, fields = {}, tags = {}, status) {
        return await this.ApiClient.baseRequest(`lists/${listId}/contacts/${contactId}`, {
            method: 'PUT',
            data: {
                "email_address": email,
                "fields": fields,
                "tags": tags,
                "status": status,
            }
        })
    }

    /**
     * Delete a contact from a list
     * @param {string} listId - The ID of the list. Example: 00000000-0000-0000-0000-000000000000
     * @param {string} contactId - The ID of the contact, or an MD5 hash of the lowercase version of the contact's email address. Example: 631251b876fece73bc9dd647fe596d5f
     * @returns {Promise} API Response
     */
    async delete(listId, contactId) {
        return await this.ApiClient.baseRequest(`lists/${listId}/contacts/${contactId}`, {
            method: 'DELETE'
        })
    }
}