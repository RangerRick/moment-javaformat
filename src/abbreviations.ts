/*
// Java 8 mappings:
EST - -05:00
HST - -10:00
MST - -07:00
ACT - Australia/Darwin
AET - Australia/Sydney
AGT - America/Argentina/Buenos_Aires
ART - Africa/Cairo
AST - America/Anchorage
BET - America/Sao_Paulo
BST - Asia/Dhaka
CAT - Africa/Harare
CNT - America/St_Johns
CST - America/Chicago
CTT - Asia/Shanghai
EAT - Africa/Addis_Ababa
ECT - Europe/Paris
IET - America/Indiana/Indianapolis
IST - Asia/Kolkata
JST - Asia/Tokyo
MIT - Pacific/Apia
NET - Asia/Yerevan
NST - Pacific/Auckland
PLT - Asia/Karachi
PNT - America/Phoenix
PRT - America/Puerto_Rico
PST - America/Los_Angeles
SST - Pacific/Guadalcanal
VST - Asia/Ho_Chi_Minh
*/

export const offsets = {
  '-720': [ 'AoE', 'Y' ], // -12
  '-660': [ 'NUT', 'SST', 'X' ], // -11
  '-600': [ 'HST', 'CKT', 'TAHT', 'W' ], // -10
  '-570': [ 'MART' ], // -9:30
  '-540': [ 'AKST', 'HDT', 'GAMT', 'V' ], // -9
  '-480': [ 'PST', 'AKDT', 'U', 'PT' ], // -8
  '-420': [ 'MST', 'PDT', 'T', 'MT', 'PT' ], // -7
  '-360': [ 'CST', 'MDT', 'EAST', 'GALT', 'S', 'CT', 'MT' ], // -6
  '-300': [ 'EST', 'CDT', 'ACT', 'CIST', 'COT', 'CST', 'EASST', 'ECT', 'PET', 'R', 'ET', 'CT' ], // -5
  '-240': [ 'EDT', 'AST', 'AMT', 'BOT', 'CIDST', 'CLT', 'FKT', 'GYT', 'VET', 'Q', 'AT', 'ET' ], // -4
  '-210': [ 'NST' ], // -3:30
  '-180': [ 'UYT', 'ADT', 'AMST', 'ART', 'BRT', 'CLST', 'FKST', 'GFT', 'PMST', 'ROTT', 'SRT', 'UYT', 'WARST', 'WGT', 'P', 'AT' ], // -3
  '-150': [ 'NDT' ], // -2:30
  '-120': [ 'GST', 'BRST', 'FNT', 'GST', 'PMDT', 'UYST', 'WGST', 'O' ], // -2
  '-60':  [ 'CVT', 'AZOT', 'CVT', 'EGT', 'N' ], // -1
  '0':    [ 'UTC', 'GMT', 'AZOST', 'EGST', 'WET', 'Z', 'WT' ], // +/-0
  '60':   [ 'CET', 'BST', 'WAT', 'WEST', 'WST', 'A' ], // +1
  '120':  [ 'CAT', 'CEST', 'EET', 'SAST', 'WAST', 'B' ], // +2
  '180':  [ 'EAT', 'EEST', 'FET', 'MSK', 'SYOT', 'TRT', 'C' ], // +3
  '210':  [ 'IRST' ], // +3:30
  '240':  [ 'GET', 'AZT', 'KUYT', 'MSD', 'MUT', 'RET', 'SAMT', 'SCT', 'D' ], // +4
  '270':  [ 'AFT', 'IRDT' ], // +4:30
  '300':  [ 'UZT', 'AQTT', 'AZST', 'MAWT', 'MVT', 'ORAT', 'PKT', 'TFT', 'TJT', 'TMT', 'YEKT', 'E' ], // +5
  '330':  [ 'IST' ], // +5:30
  '345':  [ 'NPT' ], // +5:45
  '360':  [ 'BTT', 'ALMT', 'BTT', 'IOT', 'KGT', 'OMST', 'QYZT', 'VOST', 'YEKST', 'F' ], // +6
  '390':  [ 'MMT', 'CCT' ], // +6:30
  '420':  [ 'ICT', 'CXT', 'DAVT', 'HOVT', 'KRAT', 'NOVST', 'NOVT', 'OMSST', 'WIB', 'G' ], // +7
  '480':  [ 'HKT', 'AWST', 'BNT', 'CAST', 'CHOT', 'HOVST', 'IRKT', 'KRAST', 'MYT', 'PHT', 'SGT', 'ULAT', 'WITA', 'H' ], // +8
  '510':  [ 'PYT' ], // +8:30
  '525':  [ 'ACWST' ], // +8:45
  '540':  [ 'JST', 'AWDT', 'CHOST', 'IRKST', 'KST', 'PWT', 'TLT', 'ULAST', 'WIT', 'YAKT', 'I' ], // +9
  '570':  [ 'ACST', 'ACT' ], // +9:30
  '600':  [ 'PGT', 'AEST', 'CHUT', 'ChST', 'DDUT', 'VLAT', 'YAKST', 'YAPT', 'K', 'AET' ], // +10
  '630':  [ 'ACDT', 'LHST', 'ACT' ], // +10:30
  '660':  [ 'VUT', 'AEDT', 'KOST', 'LHDT', 'MAGT', 'NCT', 'NFT', 'PONT', 'SAKT', 'SBT', 'SRET', 'VLAST', 'L', 'AET' ], // +11
  '720':  [ 'FJT', 'ANAST', 'ANAT', 'GILT', 'MAGST', 'MHT', 'NFDT', 'NRT', 'NZST', 'PETST', 'PETT', 'TVT', 'WAKT', 'WFT', 'M' ], // +12
  '765':  [ 'CHAST' ], // +12:45
  '780':  [ 'TOT', 'FJST', 'NZDT', 'PHOT', 'TKT', 'TOT' ], // +13
  '825':  [ 'CHADT' ], // +13:45
  '840':  [ 'LINT', 'TOST', 'WST' ], // +14
};

export const abbreviations = {
  A: 'Alpha Time Zone',
  ACDT: 'Australian Central Daylight Time',
  ACST: 'Australian Central Standard Time',
//  ACT: 'Acre Time',
  ACT: 'Australian Central Time',
  ACWST: 'Australian Central Western Standard Time',
//  ADT: 'Arabia Daylight Time',
  ADT: 'Atlantic Daylight Time',
  ADST: 'Atlantic Daylight Saving Time',
  AEDT: 'Australian Eastern Daylight Time',
  AEST: 'Australian Eastern Standard Time',
  AET: 'Australian Eastern Time',
  AFT: 'Afghanistan Time',
  AKDT: 'Alaska Daylight Time',
  AKST: 'Alaska Standard Time',
  ALMT: 'Alma-Ata Time',
  AMDT: 'Armenia Daylight Time',
  AMST: 'Amazon Summer Time',
//  AMST: 'Armenia Summer Time',
  AMT: 'Amazon Time',
//  AMT: 'Armenia Time',
  ANAST: 'Anadyr Summer Time',
  ANAT: 'Anadyr Time',
  AQTT: 'Aqtobe Time',
  ART: 'Argentina Time',
//  AST: 'Arabia Standard Time',
  AST: 'Atlantic Standard Time',
  AT: 'Atlantic Time',
  AWDT: 'Australian Western Daylight Time',
  AWST: 'Australian Western Standard Time',
  AZODT: 'Azores Daylight Time',
  AZOST: 'Azores Summer Time',
  AZOT: 'Azores Time',
  AZST: 'Azerbaijan Summer Time',
  AZT: 'Azerbaijan Time',
  AoE: 'Anywhere on Earth',
  B: 'Bravo Time Zone',
  BDST: 'British Daylight Saving Time',
//  BDT: 'British Daylight Time',
BDT: 'Brunei Time',
  BNT: 'Brunei Darussalam Time',
  BOT: 'Bolivia Time',
  BRST: 'Brasília Summer Time',
  BRT: 'Brasília Time',
//  BST: 'Bangladesh Standard Time',
//  BST: 'Bougainville Standard Time',
  BST: 'British Summer Time',
  BT: 'Brazil Time',
  BTT: 'Bhutan Time',
  C: 'Charlie Time Zone',
  CAST: 'Casey Time',
  CAT: 'Central Africa Time',
  CCT: 'Cocos Islands Time',
  CDT: 'Central Daylight Time',
//  CDT: 'Cuba Daylight Time',
  CDST: 'Central Daylight Savings Time',
  CEDT: 'Central European Daylight Time',
  CEST: 'Central European Summer Time',
  CET: 'Central European Time',
  CHADT: 'Chatham Island Daylight Time',
  CHAST: 'Chatham Island Standard Time',
  CHODT: 'Choibalsan Daylight Time',
  CHODST: 'Choibalsan Daylight Saving Time',
  CHOST: 'Choibalsan Summer Time',
  CHOT: 'Choibalsan Time',
  CHUT: 'Chuuk Time',
  CIDST: 'Cayman Islands Daylight Saving Time',
  CIST: 'Cayman Islands Standard Time',
  CIT: 'Cayman Islands Time',
  CKT: 'Cook Island Time',
  CLDT: 'Chile Daylight Time',
  CLST: 'Chile Summer Time',
  CLT: 'Chile Standard Time',
  COT: 'Colombia Time',
  CST: 'Central Standard Time',
//  CST: 'China Standard Time',
//  CST: 'Cuba Standard Time',
  CT: 'Central Time',
  CVT: 'Cape Verde Time',
  CXT: 'Christmas Island Time',
  ChST: 'Chamorro Standard Time',
  D: 'Delta Time Zone',
  DAVT: 'Davis Time',
  DDUT: "Dumont-d'Urville Time",
  E: 'Echo Time Zone',
  EADT: 'Easter Island Daylight Time',
  EASST: 'Easter Island Summer Time',
  EAST: 'Easter Island Standard Time',
  EAT: 'Eastern Africa Time',
  ECST: 'European Central Summer Time',
  ECT: 'Ecuador Time',
  EDT: 'Eastern Daylight Time',
  EDST: 'Eastern Daylight Saving Time',
  EEDT: 'Eastern European Daylight Time',
  EEST: 'Eastern European Summer Time',
  EET: 'Eastern European Time',
  EFATE: 'Efate Time',
  EGST: 'Eastern Greenland Summer Time',
  EGT: 'East Greenland Time',
  EST: 'Eastern Standard Time',
  ET: 'Eastern Time',
  F: 'Foxtrot Time Zone',
  FET: 'Further-Eastern European Time',
  FJDT: 'Fiji Daylight Time',
  FJST: 'Fiji Summer Time',
  FJT: 'Fiji Time',
  FKDT: 'Falkland Island Daylight Time',
  FKST: 'Falkland Islands Summer Time',
  FKT: 'Falkland Island Time',
  FNT: 'Fernando de Noronha Time',
  G: 'Golf Time Zone',
  GALT: 'Galapagos Time',
  GAMT: 'Gambier Time',
  GET: 'Georgia Standard Time',
  GFT: 'French Guiana Time',
  GILT: 'Gilbert Island Time',
  GMT: 'Greenwich Mean Time',
//  GST: 'Gulf Standard Time',
  GST: 'South Georgia Time',
  GT: 'Greenwich Time',
  GYT: 'Guyana Time',
  H: 'Hotel Time Zone',
  HAA: "Heure Avancée de l'Atlantique",
  HAC: "Heure Avancée du Centre",
  HADT: 'Hawaii Daylight Time',
  HAE: "Heure Avancée de l'Est",
  HAP: 'Heure Avancée du Pacifique',
  HAST: 'Hawaii-Aleutian Standard Time',
  HAR: "Heure Avancée des Rocheuses",
  HAT: "Heure Avancée de Terre-Neuve",
  HDT: 'Hawaii-Aleutian Daylight Time',
  HLV: 'Hora Legal de Venezuela',
  HNA: "Heure Normale de l'Atlantique",
  HNC: "Heure Normale du Centre",
  HNE: "Heure Normale de l'Est",
  HNP: 'Heure Normale du Pacifique',
  HNR: "Heure Normale des Rocheuses",
  HNT: 'Heure Normale de Terre-Neuve',
  HKT: 'Hong Kong Time',
  HOVDT: 'Hovd Daylight Time',
  HOVDST: 'Hovd Daylight Saving Time',
  HOVST: 'Hovd Summer Time',
  HOVT: 'Hovd Time',
  HST: 'Hawaii Standard Time',
  I: 'India Time Zone',
  ICT: 'Indochina Time',
  IDT: 'Israel Daylight Time',
  IOT: 'Indian Chagos Time',
  IRDT: 'Iran Daylight Time',
  IRKST: 'Irkutsk Summer Time',
  IRKT: 'Irkutsk Time',
  IRST: 'Iran Standard Time',
  IST: 'India Standard Time',
//  IST: 'Irish Standard Time',
//  IST: 'Israel Standard Time',
  JST: 'Japan Standard Time',
  K: 'Kilo Time Zone',
  KGT: 'Kyrgyzstan Time',
  KIT: 'Kerguelen (Islands) Time',
  KOST: 'Kosrae Time',
  KRAST: 'Krasnoyarsk Summer Time',
  KRAT: 'Krasnoyarsk Time',
  KST: 'Korea Standard Time',
  KT: 'Korea Time',
  KUYT: 'Kuybyshev Time',
  L: 'Lima Time Zone',
  LHDT: 'Lord Howe Daylight Time',
  LHST: 'Lord Howe Standard Time',
  LINT: 'Line Islands Time',
  M: 'Mike Time Zone',
  MAGST: 'Magadan Summer Time',
  MAGT: 'Magadan Time',
  MART: 'Marquesas Time',
  MAWT: 'Mawson Time',
  MCK: 'Moscow Time',
  MDST: 'Mountain Daylight Saving Time',
  MDT: 'Mountain Daylight Time',
  MESZ: 'Mitteleuropäische Sommerzeit',
  MEZ: 'Mitteleuropäische Zeit',
  MHT: 'Marshall Islands Time',
  MMT: 'Myanmar Time',
  MST: 'Mountain Standard Time',
  MSK: 'Moscow Standard Time',
  MT: 'Mountain Time',
  MUT: 'Mauritius Time',
  MVT: 'Maldives Time',
  MYT: 'Malaysia Time',
  N: 'November Time Zone',
  NACDT: 'North American Central Daylight Time',
  NACST: 'North American Central Standard Time',
  NAEDT: 'North American Eastern Daylight Time',
  NAEST: 'North American Eastern Standard Time',
  NAMDT: 'North American Mountain Daylight Time',
  NAMST: 'North American Mountain Standard Time',
  NAPDT: 'North American Pacific Daylight Time',
  NAPST: 'North American Pacific Standard Time',
  NCT: 'New Caledonia Time',
  NDT: 'Newfoundland Daylight Time',
  NFDT: 'Norfolk Daylight Time',
  NFT: 'Norfolk Time',
  NOVST: 'Novosibirsk Summer Time',
  NOVT: 'Novosibirsk Time',
  NPT: 'Nepal Time',
  NRT: 'Nauru Time',
  NST: 'Newfoundland Standard Time',
  NUT: 'Niue Time',
  NZDT: 'New Zealand Daylight Time',
  NZST: 'New Zealand Standard Time',
  O: 'Oscar Time Zone',
  OESZ: 'Osteuropäische Sommerzeit',
  OEZ: 'Osteuropäische Zeit',
  OMSST: 'Omsk Summer Time',
  OMST: 'Omsk Standard Time',
  ORAT: 'Oral Time',
  P: 'Papa Time Zone',
  PDT: 'Pacific Daylight Time',
  PDST: 'Pacific Daylight Saving Time',
  PET: 'Peru Time',
  PETST: 'Kamchatka Summer Time',
  PETT: 'Kamchatka Time',
  PGT: 'Papua New Guinea Time',
  PHOT: 'Phoenix Island Time',
  PHT: 'Philippine Time',
  PKT: 'Pakistan Standard Time',
  PMDT: 'Pierre & Miquelon Daylight Time',
  PMST: 'Pierre & Miquelon Standard Time',
  PONT: 'Pohnpei Standard Time',
  PST: 'Pacific Standard Time',
//  PST: 'Pitcairn Standard Time',
  PT: 'Pacific Time',
  PWT: 'Palau Time',
//  PYST: 'Paraguay Summer Time',
  PYST: 'Pyongyang Standard Time',
//  PYT: 'Paraguay Time',
  PYT: 'Pyongyang Time',
  Q: 'Quebec Time Zone',
  QYZT: 'Qyzylorda Time',
  R: 'Romeo Time Zone',
  RET: 'Reunion Time',
  ROTT: 'Rothera Time',
  S: 'Sierra Time Zone',
  SAKT: 'Sakhalin Time',
  SAMT: 'Samara Time',
  SAMST: 'Samara Summer Time',
  SAST: 'South Africa Standard Time',
  SBT: 'Solomon Islands Time',
  SCT: 'Seychelles Time',
  SGT: 'Singapore Time',
  SRET: 'Srednekolymsk Time',
  SRT: 'Suriname Time',
  SST: 'Samoa Standard Time',
  SYOT: 'Syowa Time',
  T: 'Tango Time Zone',
  TAHT: 'Tahiti Time',
  TFT: 'French Southern and Antarctic Time',
  TJT: 'Tajikistan Time',
  TKT: 'Tokelau Time',
  TLT: 'East Timor Time',
  TMT: 'Turkmenistan Time',
  TOST: 'Tonga Summer Time',
  TOT: 'Tonga Time',
  TRT: 'Turkey Time',
  tVT: 'Tuvalu Time',
  U: 'Uniform Time Zone',
  ULAST: 'Ulaanbaatar Summer Time',
  ULAT: 'Ulaanbaatar Time',
  UTC: 'Coordinated Universal Time',
  UYST: 'Uruguay Summer Time',
  UYT: 'Uruguay Time',
  UZT: 'Uzbekistan Time',
  V: 'Victor Time Zone',
  VET: 'Venezuelan Standard Time',
  VLAST: 'Vladivostok Summer Time',
  VLAT: 'Vladivostok Time',
  VOST: 'Vostok Time',
  VUT: 'Vanuatu Time',
  W: 'Whiskey Time Zone',
  WAKT: 'Wake Time',
  WARST: 'Western Argentine Summer Time',
  WAST: 'West Africa Summer Time',
//  WAT: 'Western Australia Time',
  WAT: 'West Africa Time',
//  WAT: 'Western Australia Time',
  WDT: 'Western Daylight Time',
  WEDT: 'Western European Daylight Time',
  WEST: 'Western European Summer Time',
  WESZ: 'Westeuropäische Sommerzeit',
  WET: 'Western European Time',
  WEZ: 'Westeuropäische Zeit',
  WFT: 'Wallis and Futuna Time',
  WGST: 'Western Greenland Summer Time',
  WGT: 'West Greenland Time',
  WIB: 'Western Indonesian Time',
  WIT: 'Eastern Indonesian Time',
  WITA: 'Central Indonesian Time',
  WST: 'Western Standard Time',
//  WST: 'West Samoa Time',
//  WST: 'Western Summer Time',
  WT: 'Western Sahara Standard Time',
  X: 'X-ray Time Zone',
  Y: 'Yankee Time Zone',
  YAKST: 'Yakutsk Summer Time',
  YAKT: 'Yakutsk Time',
  YAPT: 'Yap Time',
  YEKST: 'Yekaterinburg Summer Time',
  YEKT: 'Yekaterinburg Time',
  Z: 'Zulu Time Zone',
};

export default abbreviations;