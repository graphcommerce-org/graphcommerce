import { makeStyles, Theme } from '@material-ui/core'

const useOrderCardItemImagesStyles = makeStyles(
  (theme: Theme) => ({
    images: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center',
      marginTop: theme.spacings.xxs,
    },
    image: {
      width: 88,
      height: 88,
      marginRight: theme.spacings.xxs,
      marginBottom: theme.spacings.xxs,
    },
    placeholder: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
  }),
  { name: 'OrderCardItemImages' },
)

export default useOrderCardItemImagesStyles
