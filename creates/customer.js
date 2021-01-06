// We recommend writing your creates separate like this and rolling them
// into the App definition at the end.
const helper = require('./helper')

module.exports = {
  key: 'Customer',

  // You'll want to provide some helpful display labels and descriptions
  // for users. Zapier will put them into the UX.
  noun: 'Customer',
  display: {
    label: 'Customer',
    description: 'For information regarding customers. This includes creation, deletion, payment information added and if customer information has changed.'
    // description: 'For webhooks with the event_type customer_*'
    // description: 'This is where you are gonna configurate how the zap should work in connection to reepay'
  },

  // `operation` is where the business logic goes.
  operation: {
    inputFields: [
        { key: 'customer_handle', required: true, type: 'string' },
      {
        key: 'returns', children: [
          {
            key: 'customer_fields', list: true, choices: [
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
          },
        ]
      },
    ],
    perform: (z, bundle) => {
      return helper.main(
        z,
        {
          'cust': {
            'handle': bundle.inputData.customer_handle,
            'filter': (bundle.inputData.hasOwnProperty('returns')) ? bundle.inputData.returns[0].customer_fields : []
          }
        }
      )
    },
  }
};