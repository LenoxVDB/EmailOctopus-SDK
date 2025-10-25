import dotenv from "dotenv";
import axios from "axios";
import Automation from "./modules/Automation.js";

dotenv.config();

export default class ApiClient {
    /**
     * Public attributes
     */
    automation

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
    async baseRequest(url, method = 'GET', data = null) {
        try {
            const response = await axios({
                method,
                url: `https://api.emailoctopus.com/${url}`,
                data: data ?? undefined,
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${this.apiKey}`,
                }
            })

            return response

        } catch (e) {
            throw e;
        }
    }

    /**
     * Register all Modules.
     */
    registerModules() {
        this.automation = new Automation(this)
    }
}