export interface ConfirmTransaction {
  status: boolean;
  message: string;
  data: {
    id: number;
    domain: string;
    status: string;
    reference: string;
    receipt_number: null | string;
    amount: number;
    message: null | string;
    gateway_response: string;
    paid_at: string;
    created_at: string;
    channel: string;
    currency: 'NGN';
    ip_address: string;
    metadata: {
      referrer: string;
    };
    log: {
      start_time: number;
      time_spent: number;
      attempts: number;
      errors: number;
      success: boolean;
      mobile: boolean;
      input: [];
      history: {
        type: string;
        message: string;
        time: number;
      }[];
    };
    fees: number;
    fees_split: null;
    authorization: {
      authorization_code: string;
      bin: string;
      last4: string;
      exp_month: string;
      exp_year: string;
      channel: string;
      card_type: string;
      bank: string;
      country_code: string;
      brand: string;
      reusable: boolean;
      signature: string;
      account_name: null;
      receiver_bank_account_number: null;
      receiver_bank: null;
    };
    customer: {
      id: number;
      first_name: '';
      last_name: '';
      email: string;
      customer_code: string;
      phone: string;
      metadata: null;
      risk_action: string;
      international_format_phone: null;
    };
    plan: null;
    split: Record<string, never>;
    order_id: null;
    paidAt: string;
    createdAt: string;
    requested_amount: number;
    pos_transaction_data: null;
    source: null;
    fees_breakdown: null;
    transaction_date: string;
    plan_object: Record<string, never>;
    subaccount: Record<string, never>;
  };
}
