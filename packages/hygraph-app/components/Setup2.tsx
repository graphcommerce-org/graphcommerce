// import { useApp, Wrapper } from '@hygraph/app-sdk-react'
// import { Button } from '@mui/material'
// import { useRouter } from 'next/router'

// function Setup({ code }: { code: string }) {
//   const { context } = useApp()

//   return (
//     <Button
//       onClick={() =>
//         fetch(`/api/saveAppToken`, {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify({
//             code,
//             environmentId: context.environment.id,
//           }),
//         })
//           .then((res) => res.json())
//           .then((data) => {
//             // Save token to localstorage
//             localStorage.setItem('app-token', data.appToken as string)
//           })
//       }
//     >
//       Get App Token
//     </Button>
//   )
// }

// // You'll get the exchange code in your setup page as query param only while
// // your App Installation is not completed
// export function SetupPage() {
//   const { query } = useRouter()
//   return (
//     <Wrapper>
//       <Setup code={query.code as string} />
//     </Wrapper>
//   )
// }
