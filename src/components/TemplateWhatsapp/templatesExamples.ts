export interface TemplateExample {
  title: string;
  header?: string; 
  body: string;
  timestamp: string;
  buttons: string[];
  footerId: string;
  category: any;
  headerText?: string
}

export const getTemplatesExamples = (t: (key: string) => string): TemplateExample[] => [
  {
    title: t('templates_examples_finalize_account_setup'),
    body: t('templates_examples_finalize_account_setup_desc'),
    timestamp: "12:13 PM",
    buttons: [t('verify_account')],
    footerId: "account_creation_confirmation_3",
    category: "Authentication"
  },
  {
    title: t('templates_examples_address_update'),
    body: t('templates_examples_address_update_desc'),
    timestamp: "12:13 PM",
    buttons: [],
    footerId: "address_update",
    category: "Utility"
  },
  {
    title: t('templates_examples_appointment_cancellation_1'),
    body: t('templates_examples_appointment_cancellation_1_desc'),
    timestamp: "12:13 PM",
    buttons: [t('view_details')],
    footerId: "appointment_cancellation_1",
    category: "Utility"
  },
  {
    title: t('templates_examples_appointment_confirmation_1'),
    body: t('templates_examples_appointment_confirmation_1_desc'),
    timestamp: "12:13 PM",
    buttons: [t('view_details')],
    footerId: "appointment_confirmation_1",
    category: "Utility"
  },
  {
    title: t('templates_examples_appointment_reminder'),
    body: t('templates_examples_appointment_reminder_desc'),
    timestamp: "12:13 PM",
    buttons: [],
    footerId: "appointment_reminder",
    category: "Utility"
  },
  {
    title: t('templates_examples_appointment_reminder_2'),
    body: t('templates_examples_appointment_reminder_2_desc'),
    timestamp: "12:13 PM",
    buttons: [t('view_details')],
    footerId: "appointment_reminder_2",
    category: "Utility"
  },
  {
    title: t('templates_examples_appointment_reschedule_1'),
    body: t('templates_examples_appointment_reschedule_1_desc'),
    timestamp: "12:13 PM",
    buttons: [t('view_details')],
    footerId: "appointment_reschedule_1",
    category: "Utility"
  },
  {
    title: t('templates_examples_appointment_scheduling'),
    body: t('templates_examples_appointment_scheduling_desc'),
    timestamp: "12:13 PM",
    buttons: [t('confirm'), t('reschedule')],
    footerId: "appointment_scheduling",
    category: "Utility"
  },
  {
    title: t('templates_examples_appointment_scheduling_address'),
    body: t('templates_examples_appointment_scheduling_address_desc'),
    timestamp: "12:13 PM",
    buttons: [t('confirm'), t('reschedule')],
    footerId: "appointment_scheduling_address",
    category: "Utility"
  },
  {
    title: t('templates_examples_auto_pay_reminder_1'),
    body: t('templates_examples_auto_pay_reminder_1_desc'),
    timestamp: "12:13 PM",
    buttons: [t('view_account')],
    footerId: "auto_pay_reminder_1",
    category: "Utility"
  },
  {
    title: t('templates_examples_auto_pay_reminder_2'),
    body: t('templates_examples_auto_pay_reminder_2_desc'),
    timestamp: "12:13 PM",
    buttons: [t('view_details')],
    footerId: "auto_pay_reminder_2",
    category: "Utility"
  },
  {
    title: t('templates_examples_auto_pay_reminder_3'),
    body: t('templates_examples_auto_pay_reminder_3_desc'),
    timestamp: "12:13 PM",
    buttons: [],
    footerId: "auto_pay_reminder_3",
    category: "Utility"
  },
  {
    title: t('templates_examples_call_permission_request_1'),
    body: t('templates_examples_call_permission_request_1_desc'),
    timestamp: "12:13 PM",
    buttons: [t('choose_preference')],
    footerId: "call_permission_request_1",
    category: "Utility"
  },
  {
    title: t('templates_examples_cancellation_confirmation'),
    body: t('templates_examples_cancellation_confirmation_desc'),
    timestamp: "12:13 PM",
    buttons: [t('yes'), t('no')],
    footerId: "cancellation_confirmation",
    category: "Utility"
  },
  {
    title: t('templates_examples_card_transaction_alert_1'),
    body: t('templates_examples_card_transaction_alert_1_desc'),
    timestamp: "12:13 PM",
    buttons: [],
    footerId: "card_transaction_alert_1",
    category: "Utility"
  },
  {
    title: t('templates_examples_card_transaction_alert_2'),
    body: t('templates_examples_card_transaction_alert_2_desc'),
    timestamp: "12:13 PM",
    buttons: [],
    footerId: "card_transaction_alert_2",
    category: "Utility"
  },
  {
    title: t('templates_examples_delivery_confirmation_1'),
    body: t('templates_examples_delivery_confirmation_1_desc'),
    timestamp: "12:13 PM",
    buttons: [t('manage_order')],
    footerId: "delivery_confirmation_1",
    category: "Utility"
  },
  {
    title: t('templates_examples_delivery_confirmation_2'),
    body: t('templates_examples_delivery_confirmation_2_desc'),
    timestamp: "12:13 PM",
    buttons: [t('manage_order')],
    footerId: "delivery_confirmation_2",
    category: "Utility"
  },
  {
    title: t('templates_examples_delivery_confirmation_3'),
    body: t('templates_examples_delivery_confirmation_3_desc'),
    timestamp: "12:13 PM",
    buttons: [t('start_return')],
    footerId: "delivery_confirmation_3",
    category: "Utility"
  },
  {
    title: t('templates_examples_delivery_confirmation_4'),
    body: t('templates_examples_delivery_confirmation_4_desc'),
    timestamp: "12:13 PM",
    buttons: [],
    footerId: "delivery_confirmation_4",
    category: "Utility"
  },
  {
    title: t('templates_examples_delivery_confirmation_5'),
    body: t('templates_examples_delivery_confirmation_5_desc'),
    timestamp: "12:13 PM",
    buttons: [t('view_order')],
    footerId: "delivery_confirmation_5",
    category: "Utility"
  },
  {
    title: t('templates_examples_delivery_failed_1'),
    body: t('templates_examples_delivery_failed_1_desc'),
    timestamp: "12:13 PM",
    buttons: [t('manage_delivery'), t('call_us')],
    footerId: "delivery_failed_1",
    category: "Utility"
  },
  {
    title: t('templates_examples_delivery_failed_2'),
    body: t('templates_examples_delivery_failed_2_desc'),
    timestamp: "12:13 PM",
    buttons: [t('schedule_delivery')],
    footerId: "delivery_failed_2",
    category: "Utility"
  },
  {
    title: t('templates_examples_delivery_update_1'),
    body: t('templates_examples_delivery_update_1_desc'),
    timestamp: "12:13 PM",
    buttons: [t('track_order')],
    footerId: "delivery_update_1",
    category: "Utility"
  },
  {
    title: t('templates_examples_delivery_update_2'),
    body: t('templates_examples_delivery_update_2_desc'),
    timestamp: "12:13 PM",
    buttons: [t('track_order')],
    footerId: "delivery_update_2",
    category: "Utility"
  },
  {
    title: t('templates_examples_delivery_update_3'),
    body: t('templates_examples_delivery_update_3_desc'),
    timestamp: "12:13 PM",
    buttons: [t('track_order')],
    footerId: "delivery_update_3",
    category: "Utility"
  },
  {
    title: t('templates_examples_delivery_update_4'),
    body: t('templates_examples_delivery_update_4_desc'),
    timestamp: "12:13 PM",
    buttons: [],
    footerId: "delivery_update_4",
    category: "Utility"
  },
  {
    title: t('templates_examples_device_recovery'),
    body: t('templates_examples_device_recovery_desc'),
    timestamp: "12:13 PM",
    buttons: [],
    footerId: "device_recovery",
    category: "Utility"
  },
  {
    title: t('templates_examples_event_details_reminder_1'),
    body: t('templates_examples_event_details_reminder_1_desc'),
    timestamp: "12:13 PM",
    buttons: [],
    footerId: "event_details_reminder_1",
    category: "Utility"
  },
  {
    title: t('templates_examples_event_details_reminder_2'),
    body: t('templates_examples_event_details_reminder_2_desc'),
    timestamp: "12:13 PM",
    buttons: [],
    footerId: "event_details_reminder_2",
    category: "Utility"
  },
  {
    title: t('templates_examples_event_rsvp_confirmation_1'),
    body: t('templates_examples_event_rsvp_confirmation_1_desc'),
    timestamp: "12:13 PM",
    buttons: [],
    footerId: "event_rsvp_confirmation_1",
    category: "Utility"
  },
  {
    title: t('templates_examples_event_rsvp_confirmation_2'),
    body: t('templates_examples_event_rsvp_confirmation_2_desc'),
    timestamp: "12:13 PM",
    buttons: [],
    footerId: "event_rsvp_confirmation_2",
    category: "Utility"
  },
  {
    title: t('templates_examples_feedback_collection'),
    body: t('templates_examples_feedback_collection_desc'),
    timestamp: "12:13 PM",
    buttons: [],
    footerId: "feedback_collection",
    category: "Utility"
  },
  {
    title: t('templates_examples_feedback_survey_1'),
    body: t('templates_examples_feedback_survey_1_desc'),
    timestamp: "12:13 PM",
    buttons: [t('leave_feedback')],
    footerId: "feedback_survey_1",
    category: "Utility"
  },
  {
    title: t('templates_examples_feedback_survey_2'),
    body: t('templates_examples_feedback_survey_2_desc'),
    timestamp: "12:13 PM",
    buttons: [t('fill_out_survey')],
    footerId: "feedback_survey_2",
    category: "Utility"
  },
  {
    title: t('templates_examples_followup_missed_calls'),
    body: t('templates_examples_followup_missed_calls_desc'),
    timestamp: "12:13 PM",
    buttons: [t('reschedule_call')],
    footerId: "followup_missed_calls",
    category: "Utility"
  },
  {
    title: t('templates_examples_fraud_alert_1'),
    body: t('templates_examples_fraud_alert_1_desc'),
    timestamp: "12:13 PM",
    buttons: [t('call_us'), t('freeze_card')],
    footerId: "fraud_alert_1",
    category: "Authentication"
  },
  {
    title: t('templates_examples_fraud_alert_2'),
    body: t('templates_examples_fraud_alert_2_desc'),
    timestamp: "12:13 PM",
    buttons: [t('yes'), t('no')],
    footerId: "fraud_alert_2",
    category: "Authentication"
  },
  {
    title: t('templates_examples_fraud_alert_3'),
    body: t('templates_examples_fraud_alert_3_desc'),
    timestamp: "12:13 PM",
    buttons: [t('verify_transaction')],
    footerId: "fraud_alert_3",
    category: "Authentication"
  },
  {
    title: t('templates_examples_fraud_alert_4'),
    body: t('templates_examples_fraud_alert_4_desc'),
    timestamp: "12:13 PM",
    buttons: [t('verify_transaction')],
    footerId: "fraud_alert_4",
    category: "Authentication"
  },
  {
    title: t('templates_examples_group_invite_link'),
    body: t('templates_examples_group_invite_link_desc'),
    timestamp: "12:13 PM",
    buttons: [],
    footerId: "group_invite_link",
    category: "Utility"
  },
  {
    title: t('templates_examples_group_invite_link_concise'),
    body: t('templates_examples_group_invite_link_concise_desc'),
    timestamp: "12:13 PM",
    buttons: [],
    footerId: "group_invite_link_concise",
    category: "Utility"
  },
  {
    title: t('templates_examples_group_invite_link_detailed'),
    body: t('templates_examples_group_invite_link_detailed_desc'),
    timestamp: "12:13 PM",
    buttons: [],
    footerId: "group_invite_link_detailed",
    category: "Utility"
  },
  {
    title: t('templates_examples_installation_complete'),
    body: t('templates_examples_installation_complete_desc'),
    timestamp: "12:13 PM",
    buttons: [],
    footerId: "installation_complete",
    category: "Utility"
  },
  {
    title: t('templates_examples_low_balance_warning_1'),
    body: t('templates_examples_low_balance_warning_1_desc'),
    timestamp: "12:13 PM",
    buttons: [t('make_a_deposit'), t('call_us')],
    footerId: "low_balance_warning_1",
    category: "Utility"
  },
  {
    title: t('templates_examples_low_balance_warning_2'),
    body: t('templates_examples_low_balance_warning_2_desc'),
    timestamp: "12:13 PM",
    buttons: [t('make_a_deposit'), t('call_us')],
    footerId: "low_balance_warning_2",
    category: "Utility"
  },
  {
    title: t('templates_examples_low_balance_warning_3'),
    body: t('templates_examples_low_balance_warning_3_desc'),
    timestamp: "12:13 PM",
    buttons: [t('recharge')],
    footerId: "low_balance_warning_3",
    category: "Utility"
  },
  {
    title: t('templates_examples_missed_appointment'),
    body: t('templates_examples_missed_appointment_desc'),
    timestamp: "12:13 PM",
    buttons: [t('reschedule')],
    footerId: "missed_appointment",
    category: "Utility"
  },
  {
    title: t('templates_examples_network_troubleshooting'),
    body: t('templates_examples_network_troubleshooting_desc'),
    timestamp: "12:13 PM",
    buttons: [t('view_details')],
    footerId: "network_troubleshooting",
    category: "Utility"
  },
  {
    title: t('templates_examples_order_action_required_1'),
    body: t('templates_examples_order_action_required_1_desc'),
    timestamp: "12:13 PM",
    buttons: [t('call_us')],
    footerId: "order_action_required_1",
    category: "Utility"
  },
  {
    title: t('templates_examples_order_action_required_2'),
    body: t('templates_examples_order_action_required_2_desc'),
    timestamp: "12:13 PM",
    buttons: [t('call_us')],
    footerId: "order_action_required_2",
    category: "Utility"
  },
  {
    title: t('templates_examples_order_canceled_1'),
    body: t('templates_examples_order_canceled_1_desc'),
    timestamp: "12:13 PM",
    buttons: [t('view_order_details')],
    footerId: "order_canceled_1",
    category: "Utility"
  },
  {
    title: t('templates_examples_order_canceled_2'),
    body: t('templates_examples_order_canceled_2_desc'),
    timestamp: "12:13 PM",
    buttons: [t('view_order_details')],
    footerId: "order_canceled_2",
    category: "Utility"
  },
  {
    title: t('templates_examples_order_canceled_3'),
    body: t('templates_examples_order_canceled_3_desc'),
    timestamp: "12:13 PM",
    buttons: [t('view_order_details')],
    footerId: "order_canceled_3",
    category: "Utility"
  },
  {
    title: t('templates_examples_order_canceled_4'),
    body: t('templates_examples_order_canceled_4_desc'),
    timestamp: "12:13 PM",
    buttons: [t('order_details')],
    footerId: "order_canceled_4",
    category: "Utility"
  },
  {
    title: t('templates_examples_order_confirm_auto_schedule'),
    body: t('templates_examples_order_confirm_auto_schedule_desc'),
    timestamp: "12:13 PM",
    buttons: [t('confirm'), t('reschedule')],
    footerId: "order_confirm_auto_schedule",
    category: "Utility"
  },
  {
    title: t('templates_examples_order_confirm_manual_schedule'),
    body: t('templates_examples_order_confirm_manual_schedule_desc'),
    timestamp: "12:13 PM",
    buttons: [t('schedule')],
    footerId: "order_confirm_manual_schedule",
    category: "Utility"
  },
  {
    title: t('templates_examples_order_delay_1'),
    body: t('templates_examples_order_delay_1_desc'),
    timestamp: "12:13 PM",
    buttons: [t('track_my_order'), t('view_order_details')],
    footerId: "order_delay_1",
    category: "Utility"
  },
  {
    title: t('templates_examples_order_delay_2'),
    body: t('templates_examples_order_delay_2_desc'),
    timestamp: "12:13 PM",
    buttons: [t('manage_order')],
    footerId: "order_delay_2",
    category: "Utility"
  },
  {
    title: t('templates_examples_order_management_1'),
    body: t('templates_examples_order_management_1_desc'),
    timestamp: "12:13 PM",
    buttons: [t('view_order_details')],
    footerId: "order_management_1",
    category: "Utility"
  },
  {
    title: t('templates_examples_order_management_2'),
    body: t('templates_examples_order_management_2_desc'),
    timestamp: "12:13 PM",
    buttons: [t('view_order_details')],
    footerId: "order_management_2",
    category: "Utility"
  },
  {
    title: t('templates_examples_order_management_3'),
    body: t('templates_examples_order_management_3_desc'),
    timestamp: "12:13 PM",
    buttons: [t('manage_order')],
    footerId: "order_management_3",
    category: "Utility"
  },
  {
    title: t('templates_examples_order_management_4'),
    body: t('templates_examples_order_management_4_desc'),
    timestamp: "12:13 PM",
    buttons: [t('view_order')],
    footerId: "order_management_4",
    category: "Utility"
  },
  {
    title: t('templates_examples_order_management_5'),
    body: t('templates_examples_order_management_5_desc'),
    timestamp: "12:13 PM",
    buttons: [t('order_details')],
    footerId: "order_management_5",
    category: "Utility"
  },
  {
    title: t('templates_examples_order_management_no_cta_5'),
    body: t('templates_examples_order_management_no_cta_5_desc'),
    timestamp: "12:13 PM",
    buttons: [],
    footerId: "order_management_no_cta_5",
    category: "Utility"
  },
  {
    title: t('templates_examples_order_pick_up_1'),
    body: t('templates_examples_order_pick_up_1_desc'),
    timestamp: "12:13 PM",
    buttons: [t('i_ve_arrived')],
    footerId: "order_pick_up_1",
    category: "Utility"
  },
  {
    title: t('templates_examples_order_pick_up_3'),
    body: t('templates_examples_order_pick_up_3_desc'),
    timestamp: "12:13 PM",
    buttons: [t('i_m_here')],
    footerId: "order_pick_up_3",
    category: "Utility"
  },
  {
    title: t('templates_examples_order_pick_up_4'),
    body: t('templates_examples_order_pick_up_4_desc'),
    timestamp: "12:13 PM",
    buttons: [t('order_details')],
    footerId: "order_pick_up_4",
    category: "Utility"
  },
  {
    title: t('templates_examples_order_pick_up_no_cta_4'),
    body: t('templates_examples_order_pick_up_no_cta_4_desc'),
    timestamp: "12:13 PM",
    buttons: [],
    footerId: "order_pick_up_no_cta_4",
    category: "Utility"
  },
  {
    title: t('templates_examples_order_update_1'),
    body: t('templates_examples_order_update_1_desc'),
    timestamp: "12:13 PM",
    buttons: [t('order_details')],
    footerId: "order_update_1",
    category: "Utility"
  },
  {
    title: t('templates_examples_order_update_no_cta_1'),
    body: t('templates_examples_order_update_no_cta_1_desc'),
    timestamp: "12:13 PM",
    buttons: [],
    footerId: "order_update_no_cta_1",
    category: "Utility"
  },
  {
    title: t('templates_examples_payment_action_required_1'),
    body: t('templates_examples_payment_action_required_1_desc'),
    timestamp: "12:13 PM",
    buttons: [t('verify')],
    footerId: "payment_action_required_1",
    category: "Utility"
  },
  {
    title: t('templates_examples_payment_action_required_2'),
    body: t('templates_examples_payment_action_required_2_desc'),
    timestamp: "12:13 PM",
    buttons: [t('call_us')],
    footerId: "payment_action_required_2",
    category: "Utility"
  },
  {
    title: t('templates_examples_payment_action_required_3'),
    body: t('templates_examples_payment_action_required_3_desc'),
    timestamp: "12:13 PM",
    buttons: [t('call_us')],
    footerId: "payment_action_required_3",
    category: "Utility"
  },
  {
    title: t('templates_examples_payment_confirmation_1'),
    body: t('templates_examples_payment_confirmation_1_desc'),
    timestamp: "12:13 PM",
    buttons: [t('view_payment_details')],
    footerId: "payment_confirmation_1",
    category: "Utility"
  },
  {
    title: t('templates_examples_payment_confirmation_2'),
    body: t('templates_examples_payment_confirmation_2_desc'),
    timestamp: "12:13 PM",
    buttons: [t('view_details')],
    footerId: "payment_confirmation_2",
    category: "Utility"
  },
  {
    title: t('templates_examples_payment_confirmation_3'),
    body: t('templates_examples_payment_confirmation_3_desc'),
    timestamp: "12:13 PM",
    buttons: [t('view_details')],
    footerId: "payment_confirmation_3",
    category: "Utility"
  },
  {
    title: t('templates_examples_payment_confirmation_4'),
    body: t('templates_examples_payment_confirmation_4_desc'),
    timestamp: "12:13 PM",
    buttons: [t('order_details')],
    footerId: "payment_confirmation_4",
    category: "Utility"
  },
  {
    title: t('templates_examples_payment_due_reminder'),
    body: t('templates_examples_payment_due_reminder_desc'),
    timestamp: "12:13 PM",
    buttons: [t('pay_now')],
    footerId: "payment_due_reminder",
    category: "Utility"
  },
  {
    title: t('templates_examples_payment_failed_1'),
    body: t('templates_examples_payment_failed_1_desc'),
    timestamp: "12:13 PM",
    buttons: [t('view_account')],
    footerId: "payment_failed_1",
    category: "Utility"
  },
  {
    title: t('templates_examples_payment_failed_2'),
    body: t('templates_examples_payment_failed_2_desc'),
    timestamp: "12:13 PM",
    buttons: [t('view_account'), t('call_us')],
    footerId: "payment_failed_2",
    category: "Utility"
  },
  {
    title: t('templates_examples_payment_failed_3'),
    body: t('templates_examples_payment_failed_3_desc'),
    timestamp: "12:13 PM",
    buttons: [t('view_account')],
    footerId: "payment_failed_3",
    category: "Utility"
  },
  {
    title: t('templates_examples_payment_failed_4'),
    body: t('templates_examples_payment_failed_4_desc'),
    timestamp: "12:13 PM",
    buttons: [t('pay_now')],
    footerId: "payment_failed_4",
    category: "Utility"
  },
  {
    title: t('templates_examples_payment_notice_1'),
    body: t('templates_examples_payment_notice_1_desc'),
    timestamp: "12:13 PM",
    buttons: [],
    footerId: "payment_notice_1",
    category: "Utility"
  },
  {
    title: t('templates_examples_payment_notice_2'),
    body: t('templates_examples_payment_notice_2_desc'),
    timestamp: "12:13 PM",
    buttons: [],
    footerId: "payment_notice_2",
    category: "Utility"
  },
  {
    title: t('templates_examples_payment_notice_3'),
    body: t('templates_examples_payment_notice_3_desc'),
    timestamp: "12:13 PM",
    buttons: [],
    footerId: "payment_notice_3",
    category: "Utility"
  },
  {
    title: t('templates_examples_payment_overdue_1'),
    body: t('templates_examples_payment_overdue_1_desc'),
    timestamp: "12:13 PM",
    buttons: [t('pay_now'), t('contact_us')],
    footerId: "payment_overdue_1",
    category: "Utility"
  },
  {
    title: t('templates_examples_payment_overdue_2'),
    body: t('templates_examples_payment_overdue_2_desc'),
    timestamp: "12:13 PM",
    buttons: [t('pay_now')],
    footerId: "payment_overdue_2",
    category: "Utility"
  },
  {
    title: t('templates_examples_payment_overdue_3'),
    body: t('templates_examples_payment_overdue_3_desc'),
    timestamp: "12:13 PM",
    buttons: [t('pay_now')],
    footerId: "payment_overdue_3",
    category: "Utility"
  },
  {
    title: t('templates_examples_payment_recharge_reminder_01'),
    body: t('templates_examples_payment_recharge_reminder_01_desc'),
    timestamp: "12:13 PM",
    buttons: [t('review_and_pay')],
    footerId: "payment_recharge_reminder_01",
    category: "Utility"
  },
  {
    title: t('templates_examples_payment_reminder_1'),
    body: t('templates_examples_payment_reminder_1_desc'),
    timestamp: "12:13 PM",
    buttons: [t('pay_now')],
    footerId: "payment_reminder_1",
    category: "Utility"
  },
  {
    title: t('templates_examples_payment_reminder_2'),
    body: t('templates_examples_payment_reminder_2_desc'),
    timestamp: "12:13 PM",
    buttons: [t('pay_now')],
    footerId: "payment_reminder_2",
    category: "Utility"
  },
  {
    title: t('templates_examples_payment_reminder_3'),
    body: t('templates_examples_payment_reminder_3_desc'),
    timestamp: "12:13 PM",
    buttons: [t('pay_now')],
    footerId: "payment_reminder_3",
    category: "Utility"
  },
  {
    title: t('templates_examples_payment_reminder_4'),
    body: t('templates_examples_payment_reminder_4_desc'),
    timestamp: "12:13 PM",
    buttons: [t('pay_now')],
    footerId: "payment_reminder_4",
    category: "Utility"
  },
  {
    title: t('templates_examples_payment_scheduled_1'),
    body: t('templates_examples_payment_scheduled_1_desc'),
    timestamp: "12:13 PM",
    buttons: [t('manage_payment')],
    footerId: "payment_scheduled_1",
    category: "Utility"
  },
  {
    title: t('templates_examples_payment_scheduled_2'),
    body: t('templates_examples_payment_scheduled_2_desc'),
    timestamp: "12:13 PM",
    buttons: [t('manage_payment')],
    footerId: "payment_scheduled_2",
    category: "Utility"
  },
  {
    title: t('templates_examples_payment_scheduled_3'),
    body: t('templates_examples_payment_scheduled_3_desc'),
    timestamp: "12:13 PM",
    buttons: [t('manage_payment')],
    footerId: "payment_scheduled_3",
    category: "Utility"
  },
  {
    title: t('templates_examples_payment_successful'),
    body: t('templates_examples_payment_successful_desc'),
    timestamp: "12:13 PM",
    buttons: [t('receipt')],
    footerId: "payment_successful",
    category: "Utility"
  },
  {
    title: t('templates_examples_purchase_receipt_1'),
    body: t('templates_examples_purchase_receipt_1_desc'),
    timestamp: "12:13 PM",
    buttons: [],
    footerId: "purchase_receipt_1",
    category: "Utility"
  },
  {
    title: t('templates_examples_purchase_receipt_2'),
    body: t('templates_examples_purchase_receipt_2_desc'),
    timestamp: "12:13 PM",
    buttons: [],
    footerId: "purchase_receipt_2",
    category: "Utility"
  },
  {
    title: t('templates_examples_purchase_receipt_3'),
    body: t('templates_examples_purchase_receipt_3_desc'),
    timestamp: "12:13 PM",
    buttons: [t('order_details')],
    footerId: "purchase_receipt_3",
    category: "Utility"
  },
  {
    title: t('templates_examples_purchase_transaction_alert'),
    body: t('templates_examples_purchase_transaction_alert_desc'),
    timestamp: "12:13 PM",
    buttons: [],
    footerId: "purchase_transaction_alert",
    category: "Utility"
  },
  {
    title: t('templates_examples_recharge_failure'),
    body: t('templates_examples_recharge_failure_desc'),
    timestamp: "12:13 PM",
    buttons: [t('recharge')],
    footerId: "recharge_failure",
    category: "Utility"
  },
  {
    title: t('templates_examples_recharge_reminder'),
    body: t('templates_examples_recharge_reminder_desc'),
    timestamp: "12:13 PM",
    buttons: [t('recharge')],
    footerId: "recharge_reminder",
    category: "Utility"
  },
  {
    title: t('templates_examples_recharge_successful'),
    body: t('templates_examples_recharge_successful_desc'),
    timestamp: "12:13 PM",
    buttons: [],
    footerId: "recharge_successful",
    category: "Utility"
  },
  {
    title: t('templates_examples_refund_confirmation_1'),
    body: t('templates_examples_refund_confirmation_1_desc'),
    timestamp: "12:13 PM",
    buttons: [t('manage_order')],
    footerId: "refund_confirmation_1",
    category: "Utility"
  },
  {
    title: t('templates_examples_return_confirmation_1'),
    body: t('templates_examples_return_confirmation_1_desc'),
    timestamp: "12:13 PM",
    buttons: [t('manage_order')],
    footerId: "return_confirmation_1",
    category: "Utility"
  },
  {
    title: t('templates_examples_return_confirmation_2'),
    body: t('templates_examples_return_confirmation_2_desc'),
    timestamp: "12:13 PM",
    buttons: [t('manage_order')],
    footerId: "return_confirmation_2",
    category: "Utility"
  },
  {
    title: t('templates_examples_roaming_reminder'),
    body: t('templates_examples_roaming_reminder_desc'),
    timestamp: "12:13 PM",
    buttons: [t('activate')],
    footerId: "roaming_reminder",
    category: "Utility"
  },
  {
    title: t('templates_examples_service_disruption'),
    body: t('templates_examples_service_disruption_desc'),
    timestamp: "12:13 PM",
    buttons: [],
    footerId: "service_disruption",
    category: "Utility"
  },
  {
    title: t('templates_examples_shifting_journey'),
    body: t('templates_examples_shifting_journey_desc'),
    timestamp: "12:13 PM",
    buttons: [t('track_status')],
    footerId: "shifting_journey",
    category: "Utility"
  },
  {
    title: t('templates_examples_shipment_confirmation_1'),
    body: t('templates_examples_shipment_confirmation_1_desc'),
    timestamp: "12:13 PM",
    buttons: [t('track_shipment')],
    footerId: "shipment_confirmation_1",
    category: "Utility"
  },
  {
    title: t('templates_examples_shipment_confirmation_2'),
    body: t('templates_examples_shipment_confirmation_2_desc'),
    timestamp: "12:13 PM",
    buttons: [t('track_shipment')],
    footerId: "shipment_confirmation_2",
    category: "Utility"
  },
  {
    title: t('templates_examples_shipment_confirmation_3'),
    body: t('templates_examples_shipment_confirmation_3_desc'),
    timestamp: "12:13 PM",
    buttons: [t('track_my_order')],
    footerId: "shipment_confirmation_3",
    category: "Utility"
  },
  {
    title: t('templates_examples_shipment_confirmation_4'),
    body: t('templates_examples_shipment_confirmation_4_desc'),
    timestamp: "12:13 PM",
    buttons: [t('view_order_details')],
    footerId: "shipment_confirmation_4",
    category: "Utility"
  },
  {
    title: t('templates_examples_shipment_confirmation_5'),
    body: t('templates_examples_shipment_confirmation_5_desc'),
    timestamp: "12:13 PM",
    buttons: [t('view_order')],
    footerId: "shipment_confirmation_5",
    category: "Utility"
  },
  {
    title: t('templates_examples_statement_available_1'),
    body: t('templates_examples_statement_available_1_desc'),
    timestamp: "12:13 PM",
    buttons: [t('view_statement')],
    footerId: "statement_available_1",
    category: "Utility"
  },
  {
    title: t('templates_examples_statement_available_2'),
    body: t('templates_examples_statement_available_2_desc'),
    timestamp: "12:13 PM",
    buttons: [t('view_statement')],
    footerId: "statement_available_2",
    category: "Utility"
  },
  {
    title: t('templates_examples_support_ticket_acknowledgement'),
    body: t('templates_examples_support_ticket_acknowledgement_desc'),
    timestamp: "12:13 PM",
    buttons: [],
    footerId: "support_ticket_acknowledgement",
    category: "Utility"
  },
  {
    title: t('templates_examples_technician_arrival'),
    body: t('templates_examples_technician_arrival_desc'),
    timestamp: "12:13 PM",
    buttons: [t('track_location')],
    footerId: "technician_arrival",
    category: "Utility"
  },
  {
    title: t('templates_examples_upgrade_confirmation'),
    body: t('templates_examples_upgrade_confirmation_desc'),
    timestamp: "12:13 PM",
    buttons: [],
    footerId: "upgrade_confirmation",
    category: "Utility"
  },
  {
    title: t('templates_examples_renewal_reminder'),
    body: t('templates_examples_renewal_reminder_desc'),
    timestamp: "12:13 PM",
    buttons: [],
    footerId: "renewal_reminder",
    category: "Utility"
  },
  {
    title: t('templates_examples_renewal_successful'),
    body: t('templates_examples_renewal_successful_desc'),
    timestamp: "12:13 PM",
    buttons: [],
    footerId: "renewal_successful",
    category: "Utility"
  }
];