export interface Client {
  name: string;
  /** Logo extracted from the company profiles, if available. */
  logo?: string;
}

const logo = (file: string) => `/images/logos/clients/${file}.png`;

export const developers: Client[] = [
  { name: "Emaar", logo: logo("emaar") },
  { name: "Meydan", logo: logo("meydan") },
  { name: "Sobha Realty", logo: logo("sobha") },
  { name: "DAMAC", logo: logo("damac") },
  { name: "Khazna", logo: logo("khazna") },
  { name: "Emirates Health Services (EHS)", logo: logo("ehs") },
  { name: "Meraas", logo: logo("meraas") },
  { name: "Ajmal Makan", logo: logo("ajmal-makan") },
  { name: "Diamond Developers", logo: logo("diamond") },
  { name: "Azizi", logo: logo("azizi") },
  { name: "Nakheel", logo: logo("nakheel") },
  { name: "RAK Properties", logo: logo("rak-properties") },
  { name: "Deyaar", logo: logo("deyaar") },
  { name: "ALEC Holdings", logo: logo("alec") },
  { name: "RAKEZ", logo: logo("rakez") },
  { name: "Binghatti", logo: logo("binghatti") },
];

export const contractors: Client[] = [
  { name: "ACC Contracting LLC" },
  { name: "ALEC Contracting LLC" },
  { name: "ASGC Contracting LLC" },
  { name: "Jeet Contracting LLC" },
  { name: "Sobha Contracting LLC" },
  { name: "Bhatia Contracting LLC" },
  { name: "China State Contracting LLC" },
  { name: "Gardinia Contracting LLC" },
  { name: "Gulf Asia Contracting LLC" },
  { name: "China Railway 18th Bureau Contracting" },
  { name: "UNEC Contracting LLC" },
  { name: "M.A. Kharafi & Sons Contracting LLC" },
  { name: "Ali & Sons Construction" },
  { name: "Saleh Construction" },
  { name: "Naresco Construction" },
];

export const cateringClients: Client[] = [
  { name: "Infosys (Hyderabad)" },
  { name: "National Paints" },
  { name: "Reem Capital" },
  { name: "Shapoorji Pallonji" },
  { name: "Lootha" },
  { name: "AG Engineering" },
];
