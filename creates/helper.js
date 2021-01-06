
module.exports = {
    main: async function (z, objs) {
        var return_obj = {};

        if (objs.hasOwnProperty('cust')) {
            obj = objs['cust'];
            if (obj.handle) {
                var raw_cust_response = await this.cust_api(z, obj.handle);
                return_obj['cust'] = this.filter_object(obj.filter, raw_cust_response);
            }
        }

        if (objs.hasOwnProperty('sub')) {
            obj = objs['sub'];
            if (obj.handle) {
                var raw_sub_response = await this.sub_api(z, obj.handle);
                return_obj["sub"] = this.filter_object(obj.filter, raw_sub_response);
            }
        }

        if (objs.hasOwnProperty('invoice')) {
            obj = objs['invoice'];
            if (obj.handle) {
                var raw_invoice_response = await this.invoice_api(z, obj.handle);
                return_obj["invoice"] = this.filter_object(obj.filter, raw_invoice_response);
            }
        }
        return return_obj;
    },

    filter_object: function (return_filter, obj) {
        var rtn_obj = {};
        if (return_filter.length == 0) return obj;
        return_filter.forEach(el => {
            rtn_obj[el] = obj[el];
        });
        return rtn_obj;
    },

    cust_api: function (z, handle) {
        const promise = z.request({
            url: 'https://api.reepay.com/v1/customer/' + handle,
            method: 'GET',
            headers: {
                'content-type': 'application/json',
            }
        }).then((response) => JSON.parse(response.content));
        return promise;
    },

    sub_api: function (z, handle) {
        const promise = z.request({
            url: 'https://api.reepay.com/v1/subscription/' + handle,
            method: 'GET',
            headers: {
                'content-type': 'application/json',
            }
        }).then((response) => JSON.parse(response.content));
        return promise;
    },

    incoive_api: function (z, handle) {
        const promise = z.request({
            url: 'https://api.reepay.com/v1/invoice/' + handle,
            method: 'GET',
            headers: {
                'content-type': 'application/json',
            }
        }).then((response) => JSON.parse(response.content));
        return promise;
    }
}