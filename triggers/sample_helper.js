module.exports = {
    main: async function (z, objs) {
        var return_obj = {};
        var return_arr = []

        if (objs.hasOwnProperty('cust')) {
            obj = objs['cust'];
            if (obj.filter.length != 0){
              var raw_cust_response = await this.cust_api();
              return_obj['cust'] = this.filter_object(obj.filter, raw_cust_response);
            }
          }

        if (objs.hasOwnProperty('sub')) {
            obj = objs['sub'];
            if (obj.filter.length != 0){
              var raw_sub_response = await this.sub_api();
              return_obj["sub"] = this.filter_object(obj.filter, raw_sub_response);
            }
          }

        if (objs.hasOwnProperty('invoice')) {
            obj = objs['invoice'];
            if (obj.filter.length != 0){
              var raw_invoice_response = await this.invoice_api();
              return_obj["invoice"] = this.filter_object(obj.filter, raw_invoice_response);
            }
          }

        if (objs['cust_meta']['filter'] !== undefined && await this.isJson(objs['cust_meta']['filter'])) {  
          cust_meta = {}
          obj = JSON.parse(objs['cust_meta']['filter']);
            for (var key in obj) {
                if (obj.hasOwnProperty(key)) {
                    cust_meta[key] = obj[key]
                }
            }
          return_obj["cust_meta"] = cust_meta
        }

        if (objs['sub_meta']['filter'] !== undefined && await this.isJson(objs['sub_meta']['filter'])) {
          sub_meta = {}
          obj = JSON.parse(objs['sub_meta']['filter']);
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

        // z.console.log(return_arr)

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

    isJson: function (str) { 
      try {
          JSON.parse(str);
      } catch (e) {
          return false;
      }
      return true;
    },

    cust_api: function () {
        return {
            "email": "carl@leone.com",
            "address": "Grove Street 12",
            "address2": "Ganton",
            "city": "Los Santos",
            "country": "US",
            "phone": "555-gotcars",
            "company": "Leones Cars",
            "vat": "US123456789",
            "handle": "customer006",
            "test": true,
            "subscriptions": 0,
            "created": "2015-04-04T12:40:56.656+00:00",
            "deleted": "2015-04-04T12:40:56.656+00:00",
            "first_name": "Carl",
            "last_name": "Johnson",
            "postal_code": "4531",
            "active_subscriptions": 0,
            "trial_active_subscriptions": 0,
            "trial_cancelled_subscriptions": 0,
            "expired_subscriptions": 0,
            "on_hold_subscriptions": 0,
            "cancelled_subscriptions": 0,
            "non_renewing_subscriptions": 0,
            "failed_invoices": 0,
            "failed_amount": 0,
            "cancelled_invoices": 0,
            "cancelled_amount": 0,
            "pending_invoices": 0,
            "pending_amount": 0,
            "dunning_invoices": 0,
            "dunning_amount": 0,
            "settled_invoices": 0,
            "settled_amount": 0,
            "refunded_amount": 0,
            "pending_additional_costs": 0,
            "pending_additional_cost_amount": 0,
            "transferred_additional_costs": 0,
            "transferred_additional_cost_amount": 0,
            "pending_credits": 0,
            "pending_credit_amount": 0,
            "transferred_credits": 0,
            "transferred_credit_amount": 0
          }
    },

    sub_api: function () {
        return {
            "handle": "sub000219",
            "customer": "customer00069",
            "plan": "plan0033",
            "state": "active",
            "test": true,
            "amount": 20000,
            "quantity": 1,
            "expires": "2015-06-04T12:40:56.656+00:00",
            "reactivated": "2015-06-04T12:40:56.656+00:00",
            "timezone": "Europe/Copenhagen",
            "created": "2015-02-04T12:40:56.656+00:00",
            "activated": "2015-02-04T12:40:56.656+00:00",
            "renewing": false,
            "plan_version": 1,
            "amount_incl_vat": true,
            "start_date": "2015-02-14T00:00:00.000+00:00",
            "end_date": "2015-07-14T00:00:00.000+00:00",
            "grace_duration": 172800,
            "current_period_start": "2015-04-14T08:12:19.558+00:00",
            "next_period_start": "2015-05-14T08:12:19.558+00:00",
            "first_period_start": "2015-02-14T08:12:19.558+00:00",
            "last_period_start": "2015-03-14T08:12:19.558+00:00",
            "trial_start": "2015-06-14T08:12:19.558+00:00",
            "trial_end": "2015-07-14T08:12:19.558+00:00",
            "is_cancelled": false,
            "in_trial": false,
            "has_started": true,
            "renewal_count": 2,
            "cancelled_date": "2015-06-04T12:40:56.656+00:00",
            "expired_date": "2015-06-04T12:40:56.656+00:00",
            "expire_reason": "dunning",
            "on_hold_date": "2015-06-04T12:40:56.656+00:00",
            "on_hold_reason": "ondemand",
            "payment_method_added": true,
            "scheduled_plan_change": "plan000220",
            "reminder_email_sent": "2016-04-04T12:40:56.656+00:00",
            "failed_invoices": 0,
            "failed_amount": 0,
            "cancelled_invoices": 0,
            "cancelled_amount": 0,
            "pending_invoices": 0,
            "pending_amount": 0,
            "dunning_invoices": 0,
            "dunning_amount": 0,
            "settled_invoices": 0,
            "settled_amount": 0,
            "refunded_amount": 0,
            "pending_additional_costs": 0,
            "pending_additional_cost_amount": 0,
            "transferred_additional_costs": 0,
            "transferred_additional_cost_amount": 0,
            "pending_credits": 0,
            "pending_credit_amount": 0,
            "transferred_credits": 0,
            "transferred_credit_amount": 0,
            "hosted_page_links": {
              "payment_info": "https://subdomain.reepay.com/paymentinfo/myaccount/4bc5f5f5536146a8b745aeab555162df"
            },
            "subscription_discounts": [
              "string"
            ],
            "pending_change": {
              "plan": "plan0003",
              "amount": 20000,
              "quantity": 3,
              "pending": true,
              "applied": "2015-02-04T12:40:56.656+00:00",
              "updated": "2015-02-04T12:40:56.656+00:00",
              "created": "2015-02-04T12:40:56.656+00:00",
              "amount_incl_vat": false,
              "subscription_add_ons": [
                {
                  "handle": "sub002_addon001",
                  "quantity": 1,
                  "amount": 20000,
                  "created": "2017-07-04T12:40:56.656+0000",
                  "add_on": {
                    "name": "Additional users",
                    "description": "Add-on for adding additional users to subscription",
                    "amount": 5000,
                    "vat": 0.25,
                    "handle": "add_on_001",
                    "type": "quantity",
                    "metadata": "{\"key\": \"value\"}",
                    "state": "active",
                    "deleted": "2016-08-04T14:41:30.333+0000",
                    "created": "2016-07-04T12:40:56.656+0000",
                    "amount_incl_vat": true,
                    "all_plans": false,
                    "eligible_plans": [
                      "string"
                    ]
                  },
                  "amount_incl_vat": true
                }
              ],
              "remove_add_ons": [
                "string"
              ]
            },
            "subscription_changes": [
              {
                "plan": "plan0003",
                "amount": 20000,
                "quantity": 3,
                "pending": true,
                "applied": "2015-02-04T12:40:56.656+00:00",
                "updated": "2015-02-04T12:40:56.656+00:00",
                "created": "2015-02-04T12:40:56.656+00:00",
                "amount_incl_vat": false,
                "subscription_add_ons": [
                  {
                    "handle": "sub002_addon001",
                    "quantity": 1,
                    "amount": 20000,
                    "created": "2017-07-04T12:40:56.656+0000",
                    "add_on": {
                      "name": "Additional users",
                      "description": "Add-on for adding additional users to subscription",
                      "amount": 5000,
                      "vat": 0.25,
                      "handle": "add_on_001",
                      "type": "quantity",
                      "metadata": "{\"key\": \"value\"}",
                      "state": "active",
                      "deleted": "2016-08-04T14:41:30.333+0000",
                      "created": "2016-07-04T12:40:56.656+0000",
                      "amount_incl_vat": true,
                      "all_plans": false,
                      "eligible_plans": [
                        "string"
                      ]
                    },
                    "amount_incl_vat": true
                  }
                ],
                "remove_add_ons": [
                  "string"
                ]
              }
            ],
            "subscription_add_ons": [
              "string"
            ]
          }
    },

    invoice_api: function () {
        return {
            "id": "dafba2016614418f969fa5697383e47c",
            "handle": "inv-311",
            "customer": "customer006",
            "subscription": "sub010",
            "plan": "a7a7195c54f644369922d0dfe794dd0c",
            "state": "pending",
            "type": "pending",
            "amount": 10000,
            "number": 1002,
            "currency": "DKK",
            "due": "2015-04-04T12:40:56.656+00:00",
            "failed": "2015-04-04T12:40:56.656+00:00",
            "settled": "2015-04-04T12:40:56.656+00:00",
            "cancelled": "2015-04-04T12:40:56.656+00:00",
            "authorized": "2015-04-04T12:40:56.656+00:00",
            "credits": [
              {
                "credit": "credit002",
                "amount": 10000,
                "created": "2015-04-04T12:40:56.656+00:00"
              }
            ],
            "created": "2015-04-04T12:40:56.656+00:00",
            "plan_version": 1,
            "dunning_plan": "dunning_plan_02",
            "discount_amount": 20000,
            "org_amount": 10000,
            "amount_vat": 2000,
            "amount_ex_vat": 8000,
            "settled_amount": 50000,
            "refunded_amount": 50000,
            "authorized_amount": 50000,
            "credited_amount": 50000,
            "period_number": 1,
            "order_lines": [
              {
                "id": "c33fbb06a00e4dc0b9055f6fb509c0ed",
                "ordertext": "Product X",
                "amount": 15000,
                "vat": 0.25,
                "quantity": 1,
                "origin": "plan",
                "timestamp": "2015-04-04T12:40:56.656+00:00",
                "discounted_amount": 2000,
                "amount_vat": 3000,
                "amount_ex_vat": 12000,
                "unit_amount": 15000,
                "unit_amount_vat": 3000,
                "unit_amount_ex_vat": 12000,
                "amount_defined_incl_vat": true,
                "origin_handle": "c33fbb06a00e4dc0b9055f6fb509c0ed",
                "period_from": "2015-04-04T12:40:56.656+00:00",
                "period_to": "2015-05-04T12:40:56.656+00:00",
                "discount_percentage": 25,
                "discounted_order_line": "423434534252345sdafsdfa5435"
              }
            ],
            "additional_costs": [
              "string"
            ],
            "transactions": [
              {
                "id": "dafba2016614418f969fa5697383e47c",
                "state": "settled",
                "invoice": "a7a7195c54f644369922d0dfe794dd0c",
                "type": "settle",
                "amount": 10000,
                "settled": "2015-04-04T12:40:56.656+00:00",
                "authorized": "2019-08-09T08:56:14.054Z",
                "failed": "2015-04-04T12:40:56.656+00:00",
                "refunded": "2015-04-04T12:40:56.656+00:00",
                "created": "2015-04-04T12:40:56.656+00:00",
                "card_transaction": {
                  "card": {
                    "id": "ca_fcfac2016614418f969fa5697383e47c",
                    "state": "active",
                    "customer": "customer00069",
                    "failed": "2015-06-04T12:40:56.656+00:00",
                    "created": "2015-04-04T12:40:56.656+00:00",
                    "fingerprint": "cst_64e8a26cc0e85bc3f5ce7c5b366b4096",
                    "reactivated": "2015-05-14T00:00:00.000+00:00",
                    "gw_ref": "657e86162633415a9e6b715248c84da4",
                    "card_type": "visa",
                    "exp_date": "09-18",
                    "masked_card": "457111XXXXXX3777",
                    "last_success": "2015-05-14T00:00:00.000+00:00",
                    "last_failed": "2015-05-14T00:00:00.000+00:00",
                    "first_fail": "2015-05-14T00:00:00.000+00:00",
                    "error_code": "credit_card_expired",
                    "error_state": "hard_declined",
                    "strong_authentication_status": "secured_by_nets"
                  },
                  "error": "credit_card_expired",
                  "fingerprint": "cst_64e8a26cc0e85bc3f5ce7c5b366b4096",
                  "provider": "clearhaus",
                  "ref_transaction": "a7a7195c54f644369922d0dfe794dd0c",
                  "gw_id": "28fc559a229e4fd3a134297a478a0075",
                  "last_failed": "2015-04-04T12:40:56.656+00:00",
                  "first_failed": "2015-04-04T12:40:56.656+00:00",
                  "error_state": "hard_declined",
                  "card_type": "visa",
                  "exp_date": "09-18",
                  "masked_card": "457111XXXXXX3777",
                  "strong_authentication_status": "secured_by_nets",
                  "acquirer_code": "40135",
                  "acquirer_message": "Card expired",
                  "acquirer_reference": "Card expired",
                  "text_on_statement": "myshop.com 123"
                },
                "mpo_transaction": {
                  "card": {
                    "id": "ca_fcfac2016614418f969fa5697383e47c",
                    "state": "active",
                    "customer": "customer00069",
                    "failed": "2015-06-04T12:40:56.656+00:00",
                    "created": "2015-04-04T12:40:56.656+00:00",
                    "fingerprint": "cst_64e8a26cc0e85bc3f5ce7c5b366b4096",
                    "reactivated": "2015-05-14T00:00:00.000+00:00",
                    "gw_ref": "657e86162633415a9e6b715248c84da4",
                    "card_type": "visa",
                    "exp_date": "09-18",
                    "masked_card": "457111XXXXXX3777",
                    "last_success": "2015-05-14T00:00:00.000+00:00",
                    "last_failed": "2015-05-14T00:00:00.000+00:00",
                    "first_fail": "2015-05-14T00:00:00.000+00:00",
                    "error_code": "credit_card_expired",
                    "error_state": "hard_declined",
                    "strong_authentication_status": "secured_by_nets"
                  },
                  "error": "credit_card_expired",
                  "fingerprint": "cst_64e8a26cc0e85bc3f5ce7c5b366b4096",
                  "provider": "clearhaus",
                  "ref_transaction": "a7a7195c54f644369922d0dfe794dd0c",
                  "gw_id": "28fc559a229e4fd3a134297a478a0075",
                  "last_failed": "2015-04-04T12:40:56.656+00:00",
                  "first_failed": "2015-04-04T12:40:56.656+00:00",
                  "error_state": "hard_declined",
                  "card_type": "visa",
                  "exp_date": "09-18",
                  "masked_card": "457111XXXXXX3777",
                  "strong_authentication_status": "secured_by_nets",
                  "acquirer_code": "40135",
                  "acquirer_message": "Card expired",
                  "acquirer_reference": "Card expired",
                  "text_on_statement": "myshop.com 123"
                },
                "applepay_transaction": {
                  "card": {
                    "id": "ca_fcfac2016614418f969fa5697383e47c",
                    "state": "active",
                    "customer": "customer00069",
                    "failed": "2015-06-04T12:40:56.656+00:00",
                    "created": "2015-04-04T12:40:56.656+00:00",
                    "fingerprint": "cst_64e8a26cc0e85bc3f5ce7c5b366b4096",
                    "reactivated": "2015-05-14T00:00:00.000+00:00",
                    "gw_ref": "657e86162633415a9e6b715248c84da4",
                    "card_type": "visa",
                    "exp_date": "09-18",
                    "masked_card": "457111XXXXXX3777",
                    "last_success": "2015-05-14T00:00:00.000+00:00",
                    "last_failed": "2015-05-14T00:00:00.000+00:00",
                    "first_fail": "2015-05-14T00:00:00.000+00:00",
                    "error_code": "credit_card_expired",
                    "error_state": "hard_declined",
                    "strong_authentication_status": "secured_by_nets"
                  },
                  "error": "credit_card_expired",
                  "fingerprint": "cst_64e8a26cc0e85bc3f5ce7c5b366b4096",
                  "provider": "clearhaus",
                  "ref_transaction": "a7a7195c54f644369922d0dfe794dd0c",
                  "gw_id": "28fc559a229e4fd3a134297a478a0075",
                  "last_failed": "2015-04-04T12:40:56.656+00:00",
                  "first_failed": "2015-04-04T12:40:56.656+00:00",
                  "error_state": "hard_declined",
                  "card_type": "visa",
                  "exp_date": "09-18",
                  "masked_card": "457111XXXXXX3777",
                  "strong_authentication_status": "secured_by_nets",
                  "acquirer_code": "40135",
                  "acquirer_message": "Card expired",
                  "acquirer_reference": "Card expired",
                  "text_on_statement": "myshop.com 123"
                },
                "googlepay_transaction": {
                  "card": {
                    "id": "ca_fcfac2016614418f969fa5697383e47c",
                    "state": "active",
                    "customer": "customer00069",
                    "failed": "2015-06-04T12:40:56.656+00:00",
                    "created": "2015-04-04T12:40:56.656+00:00",
                    "fingerprint": "cst_64e8a26cc0e85bc3f5ce7c5b366b4096",
                    "reactivated": "2015-05-14T00:00:00.000+00:00",
                    "gw_ref": "657e86162633415a9e6b715248c84da4",
                    "card_type": "visa",
                    "exp_date": "09-18",
                    "masked_card": "457111XXXXXX3777",
                    "last_success": "2015-05-14T00:00:00.000+00:00",
                    "last_failed": "2015-05-14T00:00:00.000+00:00",
                    "first_fail": "2015-05-14T00:00:00.000+00:00",
                    "error_code": "credit_card_expired",
                    "error_state": "hard_declined",
                    "strong_authentication_status": "secured_by_nets"
                  },
                  "error": "credit_card_expired",
                  "fingerprint": "cst_64e8a26cc0e85bc3f5ce7c5b366b4096",
                  "provider": "clearhaus",
                  "ref_transaction": "a7a7195c54f644369922d0dfe794dd0c",
                  "gw_id": "28fc559a229e4fd3a134297a478a0075",
                  "last_failed": "2015-04-04T12:40:56.656+00:00",
                  "first_failed": "2015-04-04T12:40:56.656+00:00",
                  "error_state": "hard_declined",
                  "card_type": "visa",
                  "exp_date": "09-18",
                  "masked_card": "457111XXXXXX3777",
                  "strong_authentication_status": "secured_by_nets",
                  "acquirer_code": "40135",
                  "acquirer_message": "Card expired",
                  "acquirer_reference": "Card expired",
                  "text_on_statement": "myshop.com 123"
                },
                "manual_transaction": {
                  "method": "cash",
                  "comment": "Paid by cash in the shop",
                  "reference": "231",
                  "payment_date": "2016-07-10"
                },
                "viabill_transaction": {
                  "error": "credit_card_expired",
                  "ref_transaction": "a7a7195c54f644369922d0dfe794dd0c",
                  "viabill_id": "28fc559a229e4fd3a134297a478a0075",
                  "error_state": "hard_declined",
                  "acquirer_message": "Rejected"
                },
                "paypal_transaction": {
                  "error": "credit_card_expired",
                  "ref_transaction": "a7a7195c54f644369922d0dfe794dd0c",
                  "paypal_id": "28fc559a229e4fd3a134297a478a0075",
                  "error_state": "hard_declined",
                  "acquirer_message": "Rejected"
                },
                "pgw_transaction": {
                  "type": "mobilepay",
                  "error": "credit_card_expired",
                  "ref_transaction": "a7a7195c54f644369922d0dfe794dd0c",
                  "pgw_id": "28fc559a229e4fd3a134297a478a0075",
                  "error_state": "hard_declined",
                  "acquirer_message": "Rejected"
                }
              }
            ],
            "credit_notes": [
              {
                "id": "c33fbb06a00e4dc0b9055f6fb509c0ed",
                "invoice": "inv-2021",
                "transaction": "082ebeb1b5864e019b6bf13cad7c535b",
                "credit": "credit-234",
                "amount": 15000,
                "created": "2015-04-04T12:40:56.656+00:00",
                "credit_note_lines": [
                  {
                    "amount": 15000,
                    "text": "Refund product X",
                    "quantity": 1,
                    "order_line_id": "7f014d7f5d9e4ee89f1741a8cfe214d7"
                  }
                ]
              }
            ],
            "dunning_start": "2015-04-04T12:40:56.656+00:00",
            "dunning_count": 1,
            "dunning_expired": "2015-04-04T12:40:56.656+00:00",
            "period_from": "2015-04-04T12:40:56.656+00:00",
            "period_to": "2015-05-04T12:40:56.656+00:00",
            "settle_later": true,
            "settle_later_payment_method": "ca_608698b783382bccc4e23b3a024631f0",
            "billing_address": {
              "company": "Leones Cars",
              "vat": "US123456789",
              "attention": "Mary Schmidt",
              "address": "Grove Street 12",
              "address2": "Ganton",
              "city": "Los Santos",
              "country": "US",
              "email": "carl@leone.com",
              "phone": "555-gotcars",
              "first_name": "Carl",
              "last_name": "Johnson",
              "postal_code": "4531",
              "state_or_province": "Alaska"
            },
            "shipping_address": {
              "company": "Leones Cars",
              "vat": "US123456789",
              "attention": "Mary Schmidt",
              "address": "Grove Street 12",
              "address2": "Ganton",
              "city": "Los Santos",
              "country": "US",
              "email": "carl@leone.com",
              "phone": "555-gotcars",
              "first_name": "Carl",
              "last_name": "Johnson",
              "postal_code": "4531",
              "state_or_province": "Alaska"
            }
          }
    }
}