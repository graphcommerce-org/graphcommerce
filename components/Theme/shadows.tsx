import { Shadows } from '@material-ui/core/styles/shadows'

const shadowKeyUmbraOpacity = 0.2
const shadowKeyPenumbraOpacity = 0.14
const shadowAmbientShadowOpacity = 0.12

function createShadow(...px: number[]) {
  return [
    `${px[0]}px ${px[1]}px ${px[2]}px ${px[3]}px rgba(255,0,0,${shadowKeyUmbraOpacity})`,
    `${px[4]}px ${px[5]}px ${px[6]}px ${px[7]}px rgba(255,0,0,${shadowKeyPenumbraOpacity})`,
    `${px[8]}px ${px[9]}px ${px[10]}px ${px[11]}px rgba(255,0,0,${shadowAmbientShadowOpacity})`,
  ].join(',')
}

const shadows: Shadows = [
  /*  0 */ 'none',
  /*  1 */ createShadow(0, 2, 1, -1, 0, 1, 1, 0, 0, 1, 3, 0),
  /*  2 */ createShadow(0, 3, 1, -2, 0, 2, 2, 0, 0, 1, 5, 0),
  /*  3 */ `0 1px 4px 0 rgba(0,0,0,0.07), 0 4px 8px 0 rgba(0,0,0,0.09)`,
  /*  4 */ `0 1px 4px 0 rgba(0,0,0,0.08), 0 4px 10px 0 rgba(0,0,0,0.10)`,
  /*  5 */ createShadow(0, 3, 5, -1, 0, 5, 8, 0, 0, 1, 14, 0),
  /*  6 */ `0 0 2px 0 rgba(0,0,0,0.08), 0 7px 17px 0 rgba(0,0,0,0.08)`,
  /*  7 */ createShadow(0, 4, 5, -2, 0, 7, 10, 1, 0, 2, 16, 1),
  /*  8 */ `0 0 3px 0 rgba(0,0,0,0.09), 0 7px 17px 0 rgba(0,0,0,0.1)`,
  /*  9 */ createShadow(0, 5, 6, -3, 0, 9, 12, 1, 0, 3, 16, 2),
  /* 10 */ createShadow(0, 6, 6, -3, 0, 10, 14, 1, 0, 4, 18, 3),
  /* 11 */ createShadow(0, 6, 7, -4, 0, 11, 15, 1, 0, 4, 20, 3),
  /* 12 */ `0 1px 4px 0 rgba(0,0,0,0.09), 0 7px 17px 0 rgba(0,0,0,0.11)`,
  /* 13 */ createShadow(0, 7, 8, -4, 0, 13, 19, 2, 0, 5, 24, 4),
  /* 14 */ createShadow(0, 7, 9, -4, 0, 14, 21, 2, 0, 5, 26, 4),
  /* 15 */ createShadow(0, 8, 9, -5, 0, 15, 22, 2, 0, 6, 28, 5),
  /* 16 */ `0 1px 4px 0 rgba(0,0,0,0.09), 0 7px 19px 0 rgba(0,0,0,0.11)`,
  /* 17 */ createShadow(0, 8, 11, -5, 0, 17, 26, 2, 0, 6, 32, 5),
  /* 18 */ createShadow(0, 9, 11, -5, 0, 18, 28, 2, 0, 7, 34, 6),
  /* 19 */ createShadow(0, 9, 12, -6, 0, 19, 29, 2, 0, 7, 36, 6),
  /* 20 */ `0 2px 10px 0 rgba(0, 0, 0, 0.04), 0 26px 30px -13px rgba(0, 0, 0, 0.14)`,
  /* 21 */ createShadow(0, 10, 13, -6, 0, 21, 33, 3, 0, 8, 40, 7),
  /* 22 */ createShadow(0, 10, 14, -6, 0, 22, 35, 3, 0, 8, 42, 7),
  /* 23 */ `0 0 2px 0 rgba(0,0,0,0.08), 0 7px 20px 0 rgba(0,0,0,0.12)`,
  /* 24 */ `0 2px 15px 0 rgba(0, 0, 0, 0.04), 0 60px 70px -20px rgba(0, 0, 0, 0.14)`,
]

export default shadows
