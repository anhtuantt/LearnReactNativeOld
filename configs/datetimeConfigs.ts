export interface IDateFormat {
  DD_MM_YYYY: string;
  YYYY_MM_DD: string;
  MM_DD_YYYY: string;
  HH_MM_DD_MM_YYYY: string;
  DD_MM_YYYY_HH_MM_SS: string;
  DD_MM_YYYY_DASH: string;
  DDMMYYYYHHmmss: string;
  YYYY_MM_DD_HH_MM_SS: string;
  HH_MM: string;
  HH_MM_DD_MM_YYYY_: string;
  HH_MM____DD_MM_YYYY_: string;
  YYYY_MM_DD_HH_MM: string;
  DD_MM_YYYY_HH_MM: string;
  DD_MM_YYYY_HH_MM_SS_: string;
  DD_MM: string;
  DD_MM_YYYY_HH_MM_NO_COMMA: string;
  HH_MM_SS: string;
  HH_MM_SS_A: string;
  HH_MM_A: string;
  YYYY_MM_DD_T_HH_mm_ss_SS_Z: string;
  YYYY_MM_DD_T_HH_mm_ss: string;
  ddd_MMM_DD_YYYY_HH_mm_ss_GMT_Z: string;
  YYYY_MM_DD_T_HH_mm_ss_SSSSSSS: string;
  YYYY_MM_DD_DASH: string;
}
export const DateFormat: IDateFormat = {
  DD_MM_YYYY: 'DD/MM/YYYY',
  YYYY_MM_DD: 'YYYY/MM/DD',
  MM_DD_YYYY: 'MM/DD/YYYY',
  HH_MM_DD_MM_YYYY: 'hh:mm A DD/MM/yyyy',
  DD_MM_YYYY_HH_MM_SS: 'DD/MM/YYYY, hh:mm:ss',
  DD_MM_YYYY_DASH: 'DD-MM-YYYY',
  DDMMYYYYHHmmss: 'DDMMYYYYHHmmss',
  YYYY_MM_DD_HH_MM_SS: 'yyyy-MM-DD HH:mm:ss',
  HH_MM: 'HH:mm',
  HH_MM_DD_MM_YYYY_: 'HH:mm DD/MM/yyyy',
  HH_MM____DD_MM_YYYY_: 'HH:mm  DD/MM/yyyy',
  YYYY_MM_DD_HH_MM: 'yyyy-MM-DD HH:mm',
  DD_MM_YYYY_HH_MM: 'DD/MM/YYYY, HH:mm',
  DD_MM_YYYY_HH_MM_SS_: 'DD/MM/YYYY HH:mm:ss',
  DD_MM: 'DD/MM',
  DD_MM_YYYY_HH_MM_NO_COMMA: 'DD/MM/YYYY HH:mm',
  HH_MM_SS: 'HH:mm:ss',
  HH_MM_SS_A: 'hh:mm:ss A',
  HH_MM_A: 'hh:mm A',
  YYYY_MM_DD_T_HH_mm_ss_SS_Z: 'YYYY-MM-DDTHH:mm:ss.SSZ',
  YYYY_MM_DD_T_HH_mm_ss: 'YYYY-MM-DDTHH:mm:ss',
  ddd_MMM_DD_YYYY_HH_mm_ss_GMT_Z: 'ddd MMM DD YYYY HH:mm:ss [GMT]Z',
  YYYY_MM_DD_T_HH_mm_ss_SSSSSSS: 'YYYY-MM-DDTHH:mm:ss.SSSSSSS',
  YYYY_MM_DD_DASH: 'YYYY-MM-DD',
};
