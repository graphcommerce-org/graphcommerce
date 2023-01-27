import { PageOptions } from "@graphcommerce/framer-next-pages";
import { StoreConfigDocument } from "@graphcommerce/magento-store";
import { LayoutOverlay, LayoutOverlayProps } from "@graphcommerce/next-ui";
import { Box } from "@mui/material";
import { CompareList } from "../../components/CompareProducts/components/CompareList";
import { graphqlSharedClient } from "../../lib/graphql/graphqlSsrClient";
import { GetPageStaticProps } from "../search";

export function ComparePage(){
  return <CompareList />
}

const pageOptions: PageOptions<LayoutOverlayProps> = {
  overlayGroup: 'bottom',
  Layout: LayoutOverlay,
  layoutProps: { variantMd: 'bottom', variantSm: 'bottom' },
}
ComparePage.pageOptions = pageOptions

export default ComparePage

export const getStaticProps: GetPageStaticProps = async ({ locale }) => {
  const client = graphqlSharedClient(locale)
  const conf = client.query({ query: StoreConfigDocument })

  return {
    props: {
      apolloState: await conf.then(() => client.cache.extract()),
    },
  }
}