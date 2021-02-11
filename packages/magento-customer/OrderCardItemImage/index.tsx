import { OrderCardFragment } from './OrderCard.gql'

export type OrderCardItemImageProps = OrderCardItemImageFragment

export default function OrderCardItemImage(props: OrderCardItemImageProps) {
  return <div>order card item image</div>
}

// function LinkedProductImage(props: ProductListItemFragment) {
//   const productLink = useProductLink(props)

//   return (
//     <PageLink href={productLink}>
//       <MuiLink underline='none'>
//         <div /* className={classes.imageContainer}*/>
//           {/* {small_image ? ( */}
//           {/* <PictureResponsiveNext
//             alt=''
//             width={50}
//             height={50}
//             src='/images/icons/icon_home.svg'
//             type='image/jpeg'
//             // className={}
//           /> */}
//           {/* ) : ( */}
//           {/* <div
//                     // className={clsx(classes.placeholder, classes.image)}
//                     >
//                       GEEN AFBEELDING
//                     </div>
//                   )} */}
//         </div>
//       </MuiLink>
//     </PageLink>
//   )
// }
