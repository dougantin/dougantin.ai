import type { TrackerConfig } from "@/src/lib/tracker/types";

export const trackerConfig: TrackerConfig = {
  verticals: [
    {
      id: "energy",
      name: "Energy — Power the Buildout",
      thesisDescription: "[PLACEHOLDER — we'll write this later]",
      tickers: [
        {
          symbol: "CEG",
          name: "Constellation Energy",
          shortDescription:
            "Largest US nuclear operator. 20-year power purchase agreements with Microsoft and Meta.",
        },
        {
          symbol: "GEV",
          name: "GE Vernova",
          shortDescription:
            "Nuclear reactor technology and SMR development. Spun out of GE in 2024.",
        },
        {
          symbol: "CCJ",
          name: "Cameco",
          shortDescription:
            "World's second-largest uranium miner. Controls ~24% of global supply via McArthur River and Cigar Lake.",
        },
        {
          symbol: "UEC",
          name: "Uranium Energy Corp",
          shortDescription:
            "US-based ISR uranium producer. Ramping production through 2026.",
        },
        {
          symbol: "LEU",
          name: "Centrus Energy",
          shortDescription:
            "Only US-based uranium enricher using American-made centrifuge technology.",
        },
        {
          symbol: "OKLO",
          name: "Oklo",
          shortDescription:
            "Sam Altman-backed SMR developer. Pre-revenue, speculative.",
        },
      ],
    },
    {
      id: "compute",
      name: "Compute — Build the Infrastructure",
      thesisDescription: "[PLACEHOLDER]",
      tickers: [
        {
          symbol: "EQIX",
          name: "Equinix",
          shortDescription:
            "Largest data center REIT globally. 270+ facilities across 77 markets.",
        },
        {
          symbol: "DLR",
          name: "Digital Realty",
          shortDescription:
            "300+ data center facilities. 20 consecutive years of revenue growth.",
        },
        {
          symbol: "IRM",
          name: "Iron Mountain",
          shortDescription:
            "Hybrid records management + data center model. DC revenue approaching $1B.",
        },
        {
          symbol: "ANET",
          name: "Arista Networks",
          shortDescription:
            "43% market share in high-speed data center switching (400G/800G).",
        },
        {
          symbol: "NVDA",
          name: "Nvidia",
          shortDescription:
            "The obvious one. GPU monopoly powering AI training and inference.",
        },
        {
          symbol: "VRT",
          name: "Vertiv",
          shortDescription:
            "Power management and thermal systems for data centers.",
        },
      ],
    },
    {
      id: "metals",
      name: "Metals & Commodities — The Physical Bottleneck",
      thesisDescription: "[PLACEHOLDER]",
      tickers: [
        {
          symbol: "FCX",
          name: "Freeport-McMoRan",
          shortDescription:
            "Largest publicly traded copper producer. Mines in US, Peru, Indonesia.",
        },
        {
          symbol: "SCCO",
          name: "Southern Copper",
          shortDescription:
            "Pure-play copper with some of the lowest production costs globally.",
        },
        {
          symbol: "TECK",
          name: "Teck Resources",
          shortDescription:
            "Pivoted to copper focus after divesting coal business.",
        },
        {
          symbol: "RIO",
          name: "Rio Tinto",
          shortDescription:
            "Diversified miner (copper, aluminum, lithium). Direct copper supply deal with AWS.",
        },
        {
          symbol: "ALB",
          name: "Albemarle",
          shortDescription:
            "World's largest lithium producer. Trading near multi-year low valuations.",
        },
        {
          symbol: "SQM",
          name: "Sociedad Quimica y Minera",
          shortDescription:
            "Major lithium producer. Operations in Chile, Australia, China.",
        },
      ],
    },
  ],
  lastUpdated: "2026-03-31",
  disclaimer:
    "This is a thesis tracking tool, not financial advice. These are equities I'm watching as part of the Agency Era thesis - a framework for understanding where capital flows as AI reshapes infrastructure demand. I am not recommending trades. Do your own research.",
};
