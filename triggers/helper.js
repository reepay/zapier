module.exports = {
    main: async function (z, objs) {
        var return_obj = {};
        var return_arr = [];

        if (objs.hasOwnProperty('cust')) {
            obj = objs['cust'];
            if (obj.handle) {
                if (obj.filter.length != 0){
                    var raw_cust_response = await this.cust_api(z, obj.handle);
                    return_obj['cust'] = this.filter_object(obj.filter, raw_cust_response);    
                }
            }
        }

        if (objs.hasOwnProperty('sub')) {
            obj = objs['sub'];
            if (obj.handle) {
                if (obj.filter.length != 0){
                    var raw_sub_response = await this.sub_api(z, obj.handle);
                    return_obj["sub"] = this.filter_object(obj.filter, raw_sub_response);
                }
            }
        }

        if (objs.hasOwnProperty('invoice')) {
            obj = objs['invoice'];
            if (obj.handle) {
                if (obj.filter.length != 0){
                    var raw_invoice_response = await this.invoice_api(z, obj.handle);
                    return_obj["invoice"] = this.filter_object(obj.filter, raw_invoice_response);
                }
            }
        }

        if (objs['cust_meta']['filter'] !== undefined && await this.isJson(objs['cust_meta']['filter'])) {       
            cust_meta = {}
            obj = await this.meta_cust(z, objs['cust'].handle)
              for (var key in obj) {
                  if (obj.hasOwnProperty(key)) {
                      cust_meta[key] = obj[key]
                  }
              }
            return_obj["cust_meta"] = cust_meta
          }
  
          if (objs['sub_meta']['filter'] !== undefined && await this.isJson(objs['sub_meta']['filter'])) {
            sub_meta = {}
            obj = await this.meta_sub(z, objs['sub'].handle)
              for (var key in obj) {
                  if (obj.hasOwnProperty(key)) {
                      cust_meta[key] = obj[key]
                  }
              }
            return_obj["sub_meta"] = sub_meta
          }
        
        return_arr[0] = {}
        return_arr[0]['event_type'] = objs['event']['type']         
        if (return_obj.hasOwnProperty('cust')) return_arr[0]['customer'] = return_obj['cust'];
        if (return_obj.hasOwnProperty('sub')) return_arr[0]['subscription'] = return_obj['sub'];
        if (return_obj.hasOwnProperty('invoice')) return_arr[0]['invoice'] = return_obj['invoice'];
        if (return_obj.hasOwnProperty('cust_meta')) return_arr[0]['customer_meta'] = return_obj['cust_meta'];
        if (return_obj.hasOwnProperty('sub_meta')) return_arr[0]['subscription_meta'] = return_obj['sub_meta'];

        return return_arr;
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

    invoice_api: function (z, handle) {
        const promise = z.request({
            url: 'https://api.reepay.com/v1/invoice/' + handle,
            method: 'GET',
            headers: {
                'content-type': 'application/json',
            }
        }).then((response) => JSON.parse(response.content));
        return promise;
    },

    meta_cust: function (z, handle) {
        const promise = z.request({
            url: 'https://api.reepay.com/v1/customer/' + handle + '/metadata',
            method: 'GET',
            headers: {
                'content-type': 'application/json',
            }
        }).then((response) => JSON.parse(response.content));
        return promise;
    },

    meta_sub: function (z, handle) {
        const promise = z.request({
            url: 'https://api.reepay.com/v1/subscription/' + handle + '/metadata',
            method: 'GET',
            headers: {
                'content-type': 'application/json',
            }
        }).then((response) => JSON.parse(response.content));
        return promise;
    },
    
    isJson: function (str) { 
      try {
          JSON.parse(str);
      } catch (e) {
          return false;
      }
      return true;
    }
}