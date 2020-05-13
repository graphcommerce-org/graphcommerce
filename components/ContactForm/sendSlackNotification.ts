/**
 * todo: This is clearly a hack and should be refactored, copied from old site.
 * In a more ideal scenario we'd implement this on the server on the GraphQL resolver level
 * Also we should probably implement some for of hidden recaptcha..
 */
const sendSlackNotification = async (
  messageData: NonNullable<GQLSubmitContactFormMutation['createContactForm']>,
) => {
  const endpoint =
    messageData.subject === 'VACANCY'
      ? '/BFSSEEL6T/FM0XzXdzBa3vOyjCPreYdYFI'
      : '/B6H36FKJ6/WPznv5prk6H4VTdjUMeg6J86'
  const url = `https://hooks.slack.com/services/T0LU8Q62X/${endpoint}`

  const message = `${messageData.name} <${messageData.email}> (${messageData.phoneNumber})
>>> *Vraag over ${messageData.subject.toLowerCase()}*
${messageData.message}
`

  const payload = { text: message }
  await fetch(url, { method: 'POST', body: JSON.stringify(payload) })
}

export default sendSlackNotification
