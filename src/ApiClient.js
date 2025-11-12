import dotenv from "dotenv";
import axios from "axios";
import Automation from "./modules/Automation.js";
import Campaign from "./modules/Campaign.js";
import Tag from "./modules/Tag.js";
import List from "./modules/List.js";
import Field from "./modules/Field.js";
import Contact from "./modules/Contact.js";

dotenv.config();

export default class ApiClient {
    /**
     * modules
     */
    automation
    campaign
    tag
    list
    field
    contact

    constructor() {
        if (!process.env.EMAIL_OCTOPUS_API_KEY) {
            throw new Error("EMAIL_OCTOPUS_API_KEY is missing in your .env");
        }

        this.apiKey = process.env.EMAIL_OCTOPUS_API_KEY;
        this.registerModules()
    }

    /**
     * Core method that handles all HTTP requests to the API.
     * Provides a centralized way to make authenticated API calls with proper headers and error handling.
     */
    async baseRequest(url, {method = 'GET', data, params} = {}) {
        try {
            const response = await axios({
                method,
                url: `https://api.emailoctopus.com/${url}`,
                data: method.toUpperCase() !== 'GET' ? (data ?? undefined) : undefined,
                params: params ?? undefined,
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${this.apiKey}`,
                }
            })

            return response.data
        } catch (e) {
            throw e;
        }
    }

    /**
     * Register all Modules.
     */
    registerModules() {
        this.automation = new Automation(this)
        this.campaign = new Campaign(this)
        this.tag = new Tag(this)
        this.list = new List(this)
        this.field = new Field(this)
        this.contact = new Contact(this)
    }
}