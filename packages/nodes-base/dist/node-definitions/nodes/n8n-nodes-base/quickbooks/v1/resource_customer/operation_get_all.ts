/**
 * QuickBooks Online Node - Version 1
 * Discriminator: resource=customer, operation=getAll
 */


interface Credentials {
  quickBooksOAuth2Api: CredentialReference;
}

export type QuickbooksV1CustomerGetAllParams = {
  resource: 'customer';
  operation: 'getAll';
/**
 * Whether to return all results or only up to a given limit
 * @default false
 */
    returnAll?: boolean | Expression<boolean>;
/**
 * Max number of results to return
 * @displayOptions.show { returnAll: [false] }
 * @default 50
 */
    limit?: number | Expression<number>;
/**
 * Filters
 * @default {}
 */
    filters?: {
    /** The condition for selecting customers. See the &lt;a href="https://developer.intuit.com/app/developer/qbo/docs/develop/explore-the-quickbooks-online-api/data-queries"&gt;guide&lt;/a&gt; for supported syntax.
     */
    query?: string | Expression<string> | PlaceholderValue;
  };
};

export type QuickbooksV1CustomerGetAllOutput = {
  Active?: boolean;
  BillAddr?: {
    City?: string;
    CountrySubDivisionCode?: string;
    Id?: string;
    Line1?: string;
    PostalCode?: string;
  };
  BillWithParent?: boolean;
  CompanyName?: string;
  CurrencyRef?: {
    name?: string;
    value?: string;
  };
  DisplayName?: string;
  domain?: string;
  FullyQualifiedName?: string;
  Id?: string;
  Job?: boolean;
  MetaData?: {
    CreateTime?: string;
    LastUpdatedTime?: string;
  };
  PreferredDeliveryMethod?: string;
  PrimaryEmailAddr?: {
    Address?: string;
  };
  PrimaryPhone?: {
    FreeFormNumber?: string;
  };
  PrintOnCheckName?: string;
  ShipAddr?: {
    City?: string;
    CountrySubDivisionCode?: string;
    Id?: string;
    Line1?: string;
    PostalCode?: string;
  };
  sparse?: boolean;
  SyncToken?: string;
  Taxable?: boolean;
};

export type QuickbooksV1CustomerGetAllNode = {
  type: 'n8n-nodes-base.quickbooks';
  version: 1;
  credentials?: Credentials;
  config: NodeConfig<QuickbooksV1CustomerGetAllParams>;
  output?: Items<QuickbooksV1CustomerGetAllOutput>;
};