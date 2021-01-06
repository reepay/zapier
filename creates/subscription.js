// We recommend writing your creates separate like this and rolling them
// into the App definition at the end.
const helper = require('./helper')

module.exports = {
  key: 'Subscription',

  // You'll want to provide some helpful display labels and descriptions
  // for users. Zapier will put them into the UX.
  noun: 'Subscription',
  display: {
    label: 'Subscription',
    description: 'For information regarding subscriptions. This includes creation, payment method added / changed, trial end, renewal, cancelled, on hold, reactivation, expired and dunning information.'        
    // description: 'For webhooks with the event_type subscription_*'
    // description: 'This is where you are gonna configurate how the zap should work in connection to reepay'
  },

  // `operation` is where the business logic goes.
  operation: {
    inputFields: [
      { key: 'subscription_handle', required: true, helpText: 'Handle/id of the subscription', type: 'string' },
      { key: 'customer_handle', type: 'string' },
      {
        key: 'returns', children: [

          {
            key: 'subscription_fields', list: true, choices: [
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
          },
          'sub': {
            'handle': bundle.inputData.subscription_handle,
            'filter': (bundle.inputData.hasOwnProperty('returns')) ? bundle.inputData.returns[0].subscription_fields : []
          }
        }
      )
    },
  }
};