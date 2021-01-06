const helper = require('./helper')
const sample_helper = require('./sample_helper')

const subscribeHook = async (z, bundle) => {
  const promise = await z.request({
      url: "https://api.reepay.com/v1/account/webhook_settings",
      method: "GET",
      headers: {
        "content-type": "application/json"
      }
    }).then(response => JSON.parse(response.content));

    promise['urls'].push(bundle.targetUrl);

    delete promise['event_types']
    delete promise['alert_emails']
    delete promise['secret']

  const options = {
    url: "https://api.reepay.com/v1/account/webhook_settings",
    method: "PUT",
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify(promise)
  };

  return z.request(options).then(response => z.JSON.parse(response.content));
};

const unsubscribeHook = async (z, bundle) => {
  const hook_url = bundle.subscribeData['urls'].slice(-1).pop();

  let promise = await z.request({
    url: "https://api.reepay.com/v1/account/webhook_settings",
    method: "GET",
    headers: {
      "content-type": "application/json"
    }
  }).then(response => JSON.parse(response.content));

  delete promise['event_types']
  delete promise['alert_emails']
  delete promise['secret']
  
  for (let i = 0; i < promise['urls'].length; i++) {
    if(hook_url === promise['urls'][i]){
      promise['urls'].splice(i, 1)
    }
  } 

  const options = {
    url: "https://api.reepay.com/v1/account/webhook_settings",
    method: 'PUT',
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify(promise)
  }

  return z.request(options)
    .then((response) => z.JSON.parse(response.content));
};

const sample_setup = (z, bundle) => {
  return sample_helper.main(
    z,
    {
      'cust': {
        'filter': (bundle.inputData.hasOwnProperty('customer_fields')) ? bundle.inputData.customer_fields : []
      },
      'sub': {
        'filter': (bundle.inputData.hasOwnProperty('subscription_fields')) ? bundle.inputData.subscription_fields : []
      },
      'invoice': {
        'filter': (bundle.inputData.hasOwnProperty('invoice_fields')) ? bundle.inputData.invoice_fields : []
      },
      'cust_meta': {
        'filter': bundle.inputData.customer_metadata
      },
      'sub_meta': {
        'filter': bundle.inputData.subscription_metadata
      },
      'event': {
        'type': 'event_type'
      }
    }
  )
};

module.exports = {
    key: 'restHook',

    noun: 'restHook',
    display: {
      label: 'Resthook',
      description: 'Automated resthook setup with Reepay'
    },

    operation: {
      type: 'hook',
  
      performSubscribe: subscribeHook,
      performUnsubscribe: unsubscribeHook,
      inputFields: [
        {
          key: 'returns', children: [
            {
              key: 'invoice_fields', list: true, helpText: 'Select the invoice fields you want to get information about, you can read about them [here](https://reference.reepay.com/api/#the-invoice-object). It is possible to add more fields by clicking the + on the right side, and remove a return field by clicking on the - next to the field.', choices: [
                "id", "handle", "customer", "subscription",
                "plan", "state", "type", "amount", "number",
                "currency", "due", "failed", "settled",
                "cancelled", "authorized", "credits",
                "created", "plan_version", "dunning_plan",
                "discount_amount", "org_amount", "amount_vat",
                "amount_ex_vat", "settled_amount", "refunded_amount",
                "authorized_amount", "credited_amount", "period_number",
                "order_lines", "additional_costs", "transactions",
                "credit_notes", "dunning_start", "dunning_count",
                "dunning_expired", "period_from", "period_to",
                "settle_later", "shipping_address"
              ]
            },
            {
              key: 'customer_fields', list: true, helpText: 'Select the customer fields you want to get information about, you can read about them [here](https://reference.reepay.com/api/#the-customer-object). It is possible to add more fields by clicking the + on the right side, and remove a return field by clicking on the - next to the field.', choices: [
                "handle", "email", "first_name", "last_name",
                "address", "address2", "city", "postal_code",
                "country", "phone", "company", "vat",
                "created", "deleted",
                "subscriptions", "active_subscriptions",
                "trial_active_subscriptions", "trial_cancelled_subscriptions",
                "expired_subscriptions", "on_hold_subscriptions", "cancelled_subscriptions",
                "non_renewing_subscriptions", "failed_invoices", "failed_amount",
                "cancelled_invoices", "cancelled_amount", "pending_invoices",
                "pending_amount", "dunning_invoices", "dunning_amount",
                "settled_invoices", "settled_amount", "refunded_amount",
                "pending_additional_costs", "pending_additional_cost_amount",
                "transferred_additional_costs", "transferred_additional_cost_amount",
                "pending_credits", "pending_credit_amount", "transferred_credits",
                "transferred_credit_amount", "test",]
                // Text input field!
            },
            {
              key: 'customer_metadata', list: true, helpText: 'Customer metadata field. You need to paste your metadata into this field if you want to use it later. If you dont use metadata then ignore this.', type: 'text'
            },
            {
              key: 'subscription_fields', list: true, helpText: 'Select the subscription fields you want to get information about, you can read about them [here](https://reference.reepay.com/api/#the-subscription-object). It is possible to add more fields by clicking the + on the right side, and remove a return field by clicking on the - next to the field.', choices: [
                "handle", "customer", "plan", "state",
                "amount", "quantity", "expires", "reactivated",
                "timezone", "created", "activated", "renewing",
                "plan_version", "amount_incl_vat",
                "start_date", "end_date", "grace_duration",
                "current_period_start", "next_period_start",
                "first_period_start", "last_period_start",
                "in_trial", "trial_start", "trial_end",
                "is_cancelled", "has_started",
                "renewal_count", "cancelled_date",
                "expired_date", "expire_reason",
                "on_hold_date", "on_hold_reason",
                "payment_method_added", "scheduled_plan_change",
                "reminder_email_sent", "failed_invoices",
                "failed_amount", "cancelled_invoices",
                "cancelled_amount", "pending_invoices",
                "pending_amount", "dunning_invoices",
                "dunning_amount", "settled_invoices",
                "settled_amount", "refunded_amount",
                "pending_additional_costs",
                "pending_additional_cost_amount",
                "transferred_additional_costs",
                "transferred_additional_cost_amount",
                "pending_credits", "pending_credit_amount",
                "transferred_credits", "transferred_credit_amount",
                "hosted_page_links", "subscription_discounts",
                "pending_change", "subscription_changes",
                "subscription_add_ons", "test",]
            },
            {
              key: 'subscription_metadata', list: true, helpText: 'Subscription metadata field. You need to paste your metadata into this field if you want to use it later. If you dont use metadata then ignore this.', type: 'text'
            },
          ]
        },
      ],
      perform: (z, bundle) => {
        // If the user wants data but the payload is missing the handle / id for the API it throws a error!
        if(bundle.inputData.hasOwnProperty('customer_fields') && !bundle.cleanedRequest.hasOwnProperty('customer')){
          // z.console.log(bundle.cleanedRequest)
          throw 'Missing customer handle!'
        }

        if(bundle.inputData.hasOwnProperty('subscription_fields') && !bundle.cleanedRequest.hasOwnProperty('subscription')){
          throw 'Missing subscription handle!'
        }

        if(bundle.inputData.hasOwnProperty('invoice_fields') && !bundle.cleanedRequest.hasOwnProperty('invoice')){
          throw 'Missing invoice id!'
        }

        return helper.main(
          z,
          {
            'cust': {
              'handle': bundle.cleanedRequest.customer,
              'filter': (bundle.inputData.hasOwnProperty('customer_fields')) ? bundle.inputData.customer_fields : []
            },
            'sub': {
              'handle': bundle.cleanedRequest.subscription,
              'filter': (bundle.inputData.hasOwnProperty('subscription_fields')) ? bundle.inputData.subscription_fields : []
            },
            'invoice': {
              'handle': bundle.cleanedRequest.invoice,
              'filter': (bundle.inputData.hasOwnProperty('invoice_fields')) ? bundle.inputData.invoice_fields : []
            },
            'cust_meta': {
              'filter': bundle.inputData.customer_metadata
            },
            'sub_meta': {
              'filter': bundle.inputData.subscription_metadata
            },
            'event': {
              'type': bundle.cleanedRequest.event_type
            }
          }
        )
      },
      performList: sample_setup,
    }
  };