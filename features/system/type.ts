export interface IColor {
  primary: { 
    main: string ,
    light: string,
    emerald: string
  };
  secondary: { 
    main: string 
  };
  background: { 
    orangeSecondary: string;
    main: string;
  };
  text: {
    main: string;
    spunPearl: string;
    parisM: string;
    stTropaz: string;
    regalBlue: string;
    vodka: string;
    mainHome: string,
    mainHomeActive: string
  };
  button: {
    main: string;
  };
  border: {
    main: string;
  };
  success: {
    main: string;
  };
  error: {
    main: string;
  };
  warning: {
    main: string;
  };
  confirm: {
    main: string;
  };
  info: {
    main: string;
  };
}

export interface ITypography {
  h1: IFontInfo | object;
  h2: IFontInfo | object;
  h3: IFontInfo | object;
  h4: IFontInfo | object;
  h5: IFontInfo | object;
  h6: IFontInfo | object;
  subtitle1: IFontInfo | object;
  subtitle2: IFontInfo | object;
  subtitle3: IFontInfo | object;
  body1: IFontInfo | object;
  body2: IFontInfo | object;
  button2XL: IFontInfo | object;
  buttonXL: IFontInfo | object;
  buttonLG: IFontInfo | object;
  buttonMD: IFontInfo | object;
  buttonSM: IFontInfo | object;
  alert: IFontInfo | object;
  caption: IFontInfo | object;
  overline: IFontInfo | object;
  titleTable: IFontInfo | object;
}

export interface IFontInfo {
  fontSize: number;
  fontWeight: number;
  lineHeight: number;
  letterSpacing: number;
}
