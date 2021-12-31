import React, { createContext, useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { CustomerDocument, CustomerTokenDocument } from "@graphcommerce/magento-customer";

export const CustomerContext = createContext({
  customer: {},
  loggedIn: false
});

export default function CustomerProvider({ children }) {
  let customer = {
    customer: {},
    loggedIn: false
  }

  const { data: token } = useQuery(CustomerTokenDocument)
  const customerQuery = useQuery(CustomerDocument, {
    ssr: false,
    skip: typeof token === 'undefined',
  })

  const isLoggedIn = token?.customerToken && token?.customerToken.valid
  if (isLoggedIn) {
    customer = {
      customer: customerQuery.data?.customer,
      loggedIn: isLoggedIn
    }
  }

  return (
    <CustomerContext.Provider value={ customer }>
      {children}
    </CustomerContext.Provider>
  );
};
