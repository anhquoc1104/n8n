/**
 * QuickBooks Online Node - Version 1
 * Discriminator: resource=payment, operation=get
 */


interface Credentials {
  quickBooksOAuth2Api: CredentialReference;
}

export type QuickbooksV1PaymentGetParams = {
  resource: 'payment';
  operation: 'get';
/**
 * The ID of the payment to retrieve
 */
    paymentId?: string | Expression<string> | PlaceholderValue;
/**
 * Whether to download estimate as PDF file
 * @default false
 */
    download?: boolean | Expression<boolean>;
/**
 * Put Output File in Field
 * @hint The name of the output binary field to put the file in
 * @displayOptions.show { download: [true] }
 * @default data
 */
    binaryProperty?: string | Expression<string> | PlaceholderValue;
/**
 * Name of the file that will be downloaded
 * @displayOptions.show { download: [true] }
 */
    fileName?: string | Expression<string> | PlaceholderValue;
};

export type QuickbooksV1PaymentGetOutput = {
  CurrencyRef?: {
    name?: string;
    value?: string;
  };
  CustomerRef?: {
    name?: string;
    value?: string;
  };
  DepositToAccountRef?: {
    value?: string;
  };
  domain?: string;
  ExchangeRate?: number;
  Id?: string;
  Line?: Array<{
    LineEx?: {
      any?: Array<{
        declaredType?: string;
        globalScope?: boolean;
        name?: string;
        nil?: boolean;
        scope?: string;
        typeSubstituted?: boolean;
        value?: {
          Name?: string;
          Value?: string;
        };
      }>;
    };
    LinkedTxn?: Array<{
      TxnId?: string;
      TxnType?: string;
    }>;
  }>;
  MetaData?: {
    CreateTime?: string;
    LastUpdatedTime?: string;
  };
  PaymentMethodRef?: {
    value?: string;
  };
  PaymentRefNum?: string;
  ProcessPayment?: boolean;
  sparse?: boolean;
  SyncToken?: string;
  TxnDate?: string;
  UnappliedAmt?: number;
};

export type QuickbooksV1PaymentGetNode = {
  type: 'n8n-nodes-base.quickbooks';
  version: 1;
  credentials?: Credentials;
  config: NodeConfig<QuickbooksV1PaymentGetParams>;
  output?: Items<QuickbooksV1PaymentGetOutput>;
};