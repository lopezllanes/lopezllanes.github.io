/**
 *
 * Library for ajax request using the `XMLHttpRequest` object
 * Included methods:
 *
 * POST
 * GET
 * PUT
 * DELETE
 *
 * @author carpincho
 * @since 04/03/19.
 * @version 1.0
 */

/**
 * Media format supported
 * @type {{JSON: string}}
 */
const MediaFormat = {
    JSON: 'application/json'
};

/**
 * Status line supported
 * @type {{OK: number, CREATED: number, NOT_CONTENT: number, NOT_MODIFIED: number, NOT_FOUND: number, INTERNAL_SERVER_ERROR: number}}
 */
const STATUS = {
    OK: 200,
    CREATED: 201,
    NOT_CONTENT: 204,
    NOT_MODIFIED: 304,
    NOT_FOUND: 404,
    INTERNAL_SERVER_ERROR: 500,
};


const Ajax = {

    /*
     * Function for POST request
     *
     * @param url the url that we want to call, e.g., `https://some/path/`
     * @param params as an JSON object e.g. {"key1": "value1", "key2": "key2"}
     * @param accept : JSON
     * @param callbackSuccess : the function that will be called once the request is successfully processed.
     * @param callbackError : the function that will be called once the request throws an error.
     * @param asynchronous : true or false
     * @param type : the media format
     **/
    sendPostRequest: function (url, params, accept, callbackSuccess, callbackError, asynchronous, type) {
        type = type || MediaFormat.JSON;
        let headers = [];
        headers.push(this.getContentHeader(type));
        this.sendAjaxRequest("POST", params, url, headers, callbackSuccess, callbackError, asynchronous, type);
    },

    /*
     * Function for GET request
     *
     * @param url the url that we want to call, e.g., `https://some/path/`
     * @param params as an JSON object e.g. {"key1": "value1", "key2": "key2"}
     * @param accept : JSON
     * @param callbackSuccess : the function that will be called once the request is successfully processed.
     * @param callbackError : the function that will be called once the request throws an error.
     * @param asynchronous : true or false
     **/
    sendGetRequest: function (url, params, accept, callbackSuccess, callbackError, asynchronous) {
        let headers = [];
        headers.push(this.getAcceptHeader(accept));
        this.sendAjaxRequest("GET", params, url, headers, callbackSuccess, callbackError, asynchronous);
    },

    /*
     * Function for PUT request
     *
     * @param url the url that we want to call, e.g., `https://some/path/`
     * @param params as an JSON object e.g. {"key1": "value1", "key2": "key2"}
     * @param accept : JSON
     * @param callbackSuccess : the function that will be called once the request is successfully processed.
     * @param callbackError : the function that will be called once the request throws an error.
     * @param asynchronous : true or false
     * @param type : the media format
     **/

    sendPutRequest: function (url, params, accept, callbackSuccess, callbackError, asynchronous, type) {
        type = type || MediaFormat.JSON;
        let headers = [];
        headers.push(this.getContentHeader(type));
        headers.push(this.getAcceptHeader(accept));

        this.sendAjaxRequest("PUT", params, url, headers, callbackSuccess, callbackError, asynchronous);
    },

    /*
     * Function for DELETE request
     *
     * @param url the url that we want to call, e.g., `https://some/path/`
     * @param params as an JSON object e.g. {"key1": "value1", "key2": "key2"}
     * @param accept : JSON
     * @param callbackSuccess : the function that will be called once the request is successfully processed.
     * @param callbackError : the function that will be called once the request throws an error.
     * @param asynchronous : true or false
     **/

    sendDeleteRequest: function (url, params, accept, callbackSuccess, callbackError, asynchronous) {
        let headers = [];
        headers.push(this.getAcceptHeader(accept));

        this.sendAjaxRequest("DELETE", params, url, headers, callbackSuccess, callbackError, asynchronous);
    },

    /*
     * AJAX request
     *
     * @param method = POST or GET or DELETE or PUT
     * @param data as an JSON object e.g. {"key1": "value1", "key2": "key2"}
     * @param headers : the header that must be send
     * @param callbackSuccess : the function that will be called once the request is successfully processed.
     * @param callbackError : the function that will be called once the request throws an error.
     * @param asynchronous : true or false
     * @param type : the media format
     *
     * */
    sendAjaxRequest: function (method, data, url, headers, callbackSuccess, callbackError, asynchronous, type) {
        let xmlHTTP = new XMLHttpRequest();
        type = type || MediaFormat.JSON;

        xmlHTTP.onreadystatechange = function () {

            if (xmlHTTP.readyState === XMLHttpRequest.DONE) {

                const STATUS_ACCEPTED = [STATUS.OK, STATUS.CREATED, STATUS.NOT_CONTENT, STATUS.NOT_MODIFIED];

                if (STATUS_ACCEPTED.indexOf(xmlHTTP.status) >= 0) {
                    callbackSuccess(xmlHTTP.responseText);
                } else {
                    callbackError(xmlHTTP.status);
                }

            }
        };

        xmlHTTP.open(method, url, asynchronous);
        headers.forEach((item) => xmlHTTP.setRequestHeader(item.header, item.value));

        if (type === MediaFormat.JSON)
            xmlHTTP.send(JSON.stringify(data));
        else
            throw "Media Format not supported";
    },

    /*
     * Returns the header `Accept`.
     *
     * @param accept: only JSON supported
     * */
    getAcceptHeader: function (accept) {
        if (accept === MediaFormat.JSON)
            return {header: "Accept", value: MediaFormat.JSON};

        throw "Media Format not supported";
    },

    /*
     * Returns the header `Content-type`.
     *
     * @param type: only JSON supported
     * */
    getContentHeader: function (type) {

        if (type === MediaFormat.JSON)
            return {"header": "Content-Type", "value": MediaFormat.JSON};

        throw "Media Format not supported";
    }
};