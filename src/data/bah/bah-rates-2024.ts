// BAH rates by Military Housing Area (MHA) for 2024
// Rates are monthly amounts for each pay grade, with and without dependents.
// Source: Defense Travel Management Office (DTMO) published rates.
// To add more locations, add the MHA entry here and zip codes in zip-to-mha.ts.

export interface BAHLocation {
  mha: string;
  name: string;
  state: string;
  withDependents: Record<string, number>;
  withoutDependents: Record<string, number>;
}

export const bahLocations2024: BAHLocation[] = [
  {
    mha: 'DC001', name: 'Washington, DC', state: 'DC',
    withDependents:    { E1:2253,E2:2253,E3:2253,E4:2388,E5:2553,E6:2661,E7:2769,E8:2907,E9:3042,O1E:2769,O2E:2907,O3E:3042 },
    withoutDependents: { E1:1854,E2:1854,E3:1854,E4:1974,E5:2139,E6:2286,E7:2394,E8:2493,E9:2622,O1E:2394,O2E:2493,O3E:2622 },
  },
  {
    mha: 'CA304', name: 'San Diego, CA', state: 'CA',
    withDependents:    { E1:2673,E2:2673,E3:2673,E4:2832,E5:3024,E6:3141,E7:3267,E8:3396,E9:3525,O1E:3267,O2E:3396,O3E:3525 },
    withoutDependents: { E1:2196,E2:2196,E3:2196,E4:2340,E5:2526,E6:2697,E7:2826,E8:2931,E9:3060,O1E:2826,O2E:2931,O3E:3060 },
  },
  {
    mha: 'VA322', name: 'Norfolk / Virginia Beach, VA', state: 'VA',
    withDependents:    { E1:1806,E2:1806,E3:1806,E4:1932,E5:2064,E6:2166,E7:2271,E8:2376,E9:2481,O1E:2271,O2E:2376,O3E:2481 },
    withoutDependents: { E1:1467,E2:1467,E3:1467,E4:1593,E5:1722,E6:1845,E7:1956,E8:2043,E9:2136,O1E:1956,O2E:2043,O3E:2136 },
  },
  {
    mha: 'NC312', name: 'Fayetteville / Fort Liberty, NC', state: 'NC',
    withDependents:    { E1:1272,E2:1272,E3:1272,E4:1347,E5:1434,E6:1530,E7:1617,E8:1698,E9:1785,O1E:1617,O2E:1698,O3E:1785 },
    withoutDependents: { E1:1020,E2:1020,E3:1020,E4:1095,E5:1182,E6:1275,E7:1359,E8:1434,E9:1512,O1E:1359,O2E:1434,O3E:1512 },
  },
  {
    mha: 'TX370', name: 'San Antonio / JBSA, TX', state: 'TX',
    withDependents:    { E1:1494,E2:1494,E3:1494,E4:1587,E5:1692,E6:1782,E7:1878,E8:1968,E9:2061,O1E:1878,O2E:1968,O3E:2061 },
    withoutDependents: { E1:1218,E2:1218,E3:1218,E4:1305,E5:1404,E6:1497,E7:1590,E8:1671,E9:1755,O1E:1590,O2E:1671,O3E:1755 },
  },
  {
    mha: 'CO148', name: 'Colorado Springs, CO', state: 'CO',
    withDependents:    { E1:1725,E2:1725,E3:1725,E4:1830,E5:1953,E6:2055,E7:2157,E8:2259,E9:2361,O1E:2157,O2E:2259,O3E:2361 },
    withoutDependents: { E1:1404,E2:1404,E3:1404,E4:1503,E5:1620,E6:1731,E7:1833,E8:1926,E9:2016,O1E:1833,O2E:1926,O3E:2016 },
  },
  {
    mha: 'TX306', name: 'Killeen / Fort Cavazos, TX', state: 'TX',
    withDependents:    { E1:1194,E2:1194,E3:1194,E4:1266,E5:1350,E6:1440,E7:1524,E8:1602,E9:1680,O1E:1524,O2E:1602,O3E:1680 },
    withoutDependents: { E1:954,E2:954,E3:954,E4:1029,E5:1110,E6:1200,E7:1281,E8:1353,E9:1425,O1E:1281,O2E:1353,O3E:1425 },
  },
  {
    mha: 'HI104', name: 'Honolulu, HI', state: 'HI',
    withDependents:    { E1:2886,E2:2886,E3:2886,E4:3060,E5:3264,E6:3396,E7:3531,E8:3672,E9:3813,O1E:3531,O2E:3672,O3E:3813 },
    withoutDependents: { E1:2370,E2:2370,E3:2370,E4:2526,E5:2724,E6:2916,E7:3054,E8:3168,E9:3306,O1E:3054,O2E:3168,O3E:3306 },
  },
  {
    mha: 'NC314', name: 'Jacksonville / Camp Lejeune, NC', state: 'NC',
    withDependents:    { E1:1203,E2:1203,E3:1203,E4:1275,E5:1356,E6:1446,E7:1530,E8:1608,E9:1689,O1E:1530,O2E:1608,O3E:1689 },
    withoutDependents: { E1:963,E2:963,E3:963,E4:1035,E5:1116,E6:1203,E7:1284,E8:1356,E9:1431,O1E:1284,O2E:1356,O3E:1431 },
  },
  {
    mha: 'WA406', name: 'Tacoma / JBLM, WA', state: 'WA',
    withDependents:    { E1:1932,E2:1932,E3:1932,E4:2049,E5:2187,E6:2301,E7:2415,E8:2529,E9:2646,O1E:2415,O2E:2529,O3E:2646 },
    withoutDependents: { E1:1578,E2:1578,E3:1578,E4:1686,E5:1815,E6:1938,E7:2052,E8:2151,E9:2253,O1E:2052,O2E:2151,O3E:2253 },
  },
  {
    mha: 'FL368', name: 'Tampa / MacDill AFB, FL', state: 'FL',
    withDependents:    { E1:1785,E2:1785,E3:1785,E4:1893,E5:2022,E6:2127,E7:2232,E8:2340,E9:2448,O1E:2232,O2E:2340,O3E:2448 },
    withoutDependents: { E1:1452,E2:1452,E3:1452,E4:1557,E5:1680,E6:1797,E7:1905,E8:1998,E9:2094,O1E:1905,O2E:1998,O3E:2094 },
  },
  {
    mha: 'NV244', name: 'Las Vegas / Nellis AFB, NV', state: 'NV',
    withDependents:    { E1:1653,E2:1653,E3:1653,E4:1752,E5:1869,E6:1968,E7:2067,E8:2166,E9:2265,O1E:2067,O2E:2166,O3E:2265 },
    withoutDependents: { E1:1347,E2:1347,E3:1347,E4:1443,E5:1554,E6:1659,E7:1758,E8:1845,E9:1935,O1E:1758,O2E:1845,O3E:1935 },
  },
  {
    mha: 'GA186', name: 'Hinesville / Fort Stewart, GA', state: 'GA',
    withDependents:    { E1:1137,E2:1137,E3:1137,E4:1206,E5:1284,E6:1371,E7:1452,E8:1527,E9:1602,O1E:1452,O2E:1527,O3E:1602 },
    withoutDependents: { E1:912,E2:912,E3:912,E4:981,E5:1059,E6:1143,E7:1221,E8:1290,E9:1362,O1E:1221,O2E:1290,O3E:1362 },
  },
  {
    mha: 'FL152', name: 'Pensacola, FL', state: 'FL',
    withDependents:    { E1:1434,E2:1434,E3:1434,E4:1521,E5:1620,E6:1710,E7:1800,E8:1887,E9:1977,O1E:1800,O2E:1887,O3E:1977 },
    withoutDependents: { E1:1164,E2:1164,E3:1164,E4:1251,E5:1347,E6:1440,E7:1527,E8:1605,E9:1683,O1E:1527,O2E:1605,O3E:1683 },
  },
  {
    mha: 'TN128', name: 'Clarksville / Fort Campbell, TN', state: 'TN',
    withDependents:    { E1:1254,E2:1254,E3:1254,E4:1329,E5:1416,E6:1512,E7:1599,E8:1680,E9:1764,O1E:1599,O2E:1680,O3E:1764 },
    withoutDependents: { E1:1005,E2:1005,E3:1005,E4:1080,E5:1167,E6:1260,E7:1344,E8:1419,E9:1494,O1E:1344,O2E:1419,O3E:1494 },
  },
  {
    mha: 'CA456', name: 'Fairfield / Travis AFB, CA', state: 'CA',
    withDependents:    { E1:2427,E2:2427,E3:2427,E4:2574,E5:2748,E6:2856,E7:2970,E8:3087,E9:3207,O1E:2970,O2E:3087,O3E:3207 },
    withoutDependents: { E1:1995,E2:1995,E3:1995,E4:2124,E5:2295,E6:2454,E7:2568,E8:2664,E9:2784,O1E:2568,O2E:2664,O3E:2784 },
  },
  {
    mha: 'AZ340', name: 'Phoenix / Luke AFB, AZ', state: 'AZ',
    withDependents:    { E1:1596,E2:1596,E3:1596,E4:1692,E5:1806,E6:1902,E7:1998,E8:2094,E9:2190,O1E:1998,O2E:2094,O3E:2190 },
    withoutDependents: { E1:1302,E2:1302,E3:1302,E4:1392,E5:1500,E6:1602,E7:1698,E8:1785,E9:1869,O1E:1698,O2E:1785,O3E:1869 },
  },
  {
    mha: 'OK340', name: 'Lawton / Fort Sill, OK', state: 'OK',
    withDependents:    { E1:1068,E2:1068,E3:1068,E4:1131,E5:1206,E6:1287,E7:1362,E8:1434,E9:1506,O1E:1362,O2E:1434,O3E:1506 },
    withoutDependents: { E1:852,E2:852,E3:852,E4:918,E5:993,E6:1074,E7:1149,E8:1215,E9:1281,O1E:1149,O2E:1215,O3E:1281 },
  },
  {
    mha: 'NE228', name: 'Omaha / Offutt AFB, NE', state: 'NE',
    withDependents:    { E1:1398,E2:1398,E3:1398,E4:1482,E5:1581,E6:1665,E7:1752,E8:1839,E9:1926,O1E:1752,O2E:1839,O3E:1926 },
    withoutDependents: { E1:1137,E2:1137,E3:1137,E4:1218,E5:1314,E6:1404,E7:1488,E8:1566,E9:1641,O1E:1488,O2E:1566,O3E:1641 },
  },
  {
    mha: 'ND296', name: 'Minot AFB, ND', state: 'ND',
    withDependents:    { E1:1062,E2:1062,E3:1062,E4:1125,E5:1200,E6:1281,E7:1356,E8:1425,E9:1497,O1E:1356,O2E:1425,O3E:1497 },
    withoutDependents: { E1:849,E2:849,E3:849,E4:915,E5:987,E6:1068,E7:1143,E8:1209,E9:1275,O1E:1143,O2E:1209,O3E:1275 },
  },
  {
    mha: 'MS260', name: 'Biloxi / Keesler AFB, MS', state: 'MS',
    withDependents:    { E1:1209,E2:1209,E3:1209,E4:1281,E5:1365,E6:1455,E7:1539,E8:1617,E9:1698,O1E:1539,O2E:1617,O3E:1698 },
    withoutDependents: { E1:969,E2:969,E3:969,E4:1044,E5:1125,E6:1212,E7:1296,E8:1368,E9:1443,O1E:1296,O2E:1368,O3E:1443 },
  },
  {
    mha: 'IL200', name: 'Belleville / Scott AFB, IL', state: 'IL',
    withDependents:    { E1:1329,E2:1329,E3:1329,E4:1410,E5:1503,E6:1587,E7:1671,E8:1752,E9:1836,O1E:1671,O2E:1752,O3E:1836 },
    withoutDependents: { E1:1083,E2:1083,E3:1083,E4:1158,E5:1248,E6:1335,E7:1419,E8:1494,E9:1566,O1E:1419,O2E:1494,O3E:1566 },
  },
  {
    mha: 'AL188', name: 'Montgomery / Maxwell AFB, AL', state: 'AL',
    withDependents:    { E1:1191,E2:1191,E3:1191,E4:1263,E5:1347,E6:1437,E7:1521,E8:1599,E9:1680,O1E:1521,O2E:1599,O3E:1680 },
    withoutDependents: { E1:954,E2:954,E3:954,E4:1029,E5:1110,E6:1197,E7:1281,E8:1353,E9:1425,O1E:1281,O2E:1353,O3E:1425 },
  },
  {
    mha: 'OH380', name: 'Dayton / Wright-Patterson AFB, OH', state: 'OH',
    withDependents:    { E1:1275,E2:1275,E3:1275,E4:1353,E5:1440,E6:1536,E7:1623,E8:1704,E9:1788,O1E:1623,O2E:1704,O3E:1788 },
    withoutDependents: { E1:1038,E2:1038,E3:1038,E4:1113,E5:1197,E6:1284,E7:1368,E8:1443,E9:1515,O1E:1368,O2E:1443,O3E:1515 },
  },
  {
    mha: 'MD148', name: 'Baltimore / Fort Meade, MD', state: 'MD',
    withDependents:    { E1:2055,E2:2055,E3:2055,E4:2181,E5:2328,E6:2445,E7:2565,E8:2688,E9:2808,O1E:2565,O2E:2688,O3E:2808 },
    withoutDependents: { E1:1689,E2:1689,E3:1689,E4:1800,E5:1941,E6:2076,E7:2196,E8:2298,E9:2403,O1E:2196,O2E:2298,O3E:2403 },
  },
];
