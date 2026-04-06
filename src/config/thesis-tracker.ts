import type { TrackerConfig } from "@/src/lib/tracker/types";

export const trackerConfig: TrackerConfig = {
  verticals: [
    {
      id: "energy",
      name: "Energy — Power the Buildout",
      thesisDescription:
        "AI is an energy story before it is a software story. Every watt of compute capacity requires baseload power, and nuclear is the only carbon-free source that scales to meet the demand curve. This vertical tracks the generation capacity and fuel cycle inputs that make the rest of the buildout physically possible.",
      tickers: [
        {
          symbol: "CEG",
          name: "Constellation Energy",
          shortDescription:
            "Largest US nuclear fleet. 20-year power purchase agreements with Microsoft and Meta.",
        },
        {
          symbol: "VST",
          name: "Vistra",
          shortDescription:
            "6,400+ MW nuclear fleet plus largest US competitive gas generation portfolio. 20-year PPA with Meta for 2,600 MW of nuclear capacity.",
        },
        {
          symbol: "GEV",
          name: "GE Vernova",
          shortDescription:
            "Nuclear reactor technology and SMR development. Over $2B in data center electrification orders in 2025, tripling prior year.",
        },
        {
          symbol: "CCJ",
          name: "Cameco",
          shortDescription:
            "Second-largest uranium producer globally. Operates McArthur River and Cigar Lake, among the world's highest-grade uranium mines.",
        },
        {
          symbol: "UEC",
          name: "Uranium Energy Corp",
          shortDescription:
            "US-based ISR uranium producer. Ramping domestic production through 2026.",
        },
        {
          symbol: "LEU",
          name: "Centrus Energy",
          shortDescription:
            "Only US-based uranium enricher using American-made centrifuge technology. Began domestic centrifuge manufacturing in December 2025.",
        },
        {
          symbol: "OKLO",
          name: "Oklo",
          shortDescription:
            "Sam Altman-backed SMR developer. Pre-revenue. Next-gen form factor for distributed AI power.",
        },
        {
          symbol: "SMR",
          name: "NuScale Power",
          shortDescription:
            "First and only SMR design to receive NRC design certification. Second approval (77 MWe uprate) granted May 2025.",
        },
      ],
    },
    {
      id: "electrical-infrastructure",
      name: "Electrical Infrastructure — Deliver the Power",
      thesisDescription:
        "The tightest bottleneck in the AI buildout sits between the power plant and the data center. Transformers, switchgear, and high-voltage cabling now carry multi-year lead times. Over half of US distribution transformers are past their expected service life. This vertical tracks the companies building, equipping, and wiring the grid to handle AI-scale power demand.",
      tickers: [
        {
          symbol: "ETN",
          name: "Eaton",
          shortDescription:
            "Data center orders +200% in Q4 2025. Backlog equals 11 years of construction. Transformers, switchgear, power distribution.",
        },
        {
          symbol: "POWL",
          name: "Powell Industries",
          shortDescription:
            "Medium-voltage switchgear specialist. First data center megaproject at ~$75M. Total DC orders exceeding $100M per quarter.",
        },
        {
          symbol: "PWR",
          name: "Quanta Services",
          shortDescription:
            "Builds transmission lines, substations, and grid interconnections. Record backlog with data center work as fastest-growing segment.",
        },
        {
          symbol: "EMR",
          name: "Emerson Electric",
          shortDescription:
            "Power management, automation, and industrial control systems for data centers and grid infrastructure.",
        },
        {
          symbol: "ABBNY",
          name: "ABB",
          shortDescription:
            "Transformers, switchgear, and grid equipment. Double-digit data center order growth. ~15% of Electrification division orders from DCs.",
        },
        {
          symbol: "SBGSF",
          name: "Schneider Electric",
          shortDescription:
            "Full-stack: power distribution, UPS systems, and data center infrastructure management software. Present in most major DC builds globally.",
        },
        {
          symbol: "PRYMY",
          name: "Prysmian",
          shortDescription:
            "World's largest cable manufacturer (includes Encore Wire). High-voltage power cables with 24+ month lead times.",
        },
        {
          symbol: "HUBB",
          name: "Hubbell",
          shortDescription:
            "Electrical connectors, enclosures, and utility solutions. Embedded in the grid modernization supply chain powering data center load growth.",
        },
      ],
    },
    {
      id: "compute",
      name: "Compute — Build the Infrastructure",
      thesisDescription:
        "The full compute supply chain: GPU design, custom silicon, semiconductor equipment, fabrication, memory, data center housing, networking, and cooling. Hundreds of billions in hyperscaler capex convert into physical infrastructure through these companies. The chokepoints are real: one lithography monopoly, three HBM producers, and ~90% of advanced fabrication on a single island.",
      tickers: [
        {
          symbol: "NVDA",
          name: "Nvidia",
          shortDescription:
            "GPU monopoly powering AI training and inference. The anchor of the entire compute layer.",
        },
        {
          symbol: "AMD",
          name: "AMD",
          shortDescription:
            "Second GPU architecture for AI workloads. MI300/MI400 series gaining inference traction. Validates multi-vendor compute demand.",
        },
        {
          symbol: "AVGO",
          name: "Broadcom",
          shortDescription:
            "70%+ market share in custom AI ASICs. AI revenue +106% YoY to $8.4B. Primary beneficiary of hyperscaler shift to custom silicon.",
        },
        {
          symbol: "MRVL",
          name: "Marvell Technology",
          shortDescription:
            "Custom XPU silicon and electro-optics interconnects. 18 design wins in volume production. $75B lifetime revenue pipeline.",
        },
        {
          symbol: "TSM",
          name: "TSMC",
          shortDescription:
            "Manufactures ~90% of the world's most advanced chips. $52-56B 2026 capex. Most critical single node in the silicon supply chain.",
        },
        {
          symbol: "ASML",
          name: "ASML",
          shortDescription:
            "Sole manufacturer of EUV lithography machines. No ASML, no advanced chips. Market cap above $500B.",
        },
        {
          symbol: "LRCX",
          name: "Lam Research",
          shortDescription:
            "Dominant in high-aspect-ratio etching for HBM4 production. HBM tool revenue +50% YoY.",
        },
        {
          symbol: "AMAT",
          name: "Applied Materials",
          shortDescription:
            "Most diversified semi equipment maker. Guided 20%+ revenue growth for 2026. Record gross margins at 49.1%.",
        },
        {
          symbol: "MU",
          name: "Micron",
          shortDescription:
            "Western HBM producer. One of three manufacturers globally of the high-bandwidth memory inside every AI accelerator.",
        },
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
          symbol: "ANET",
          name: "Arista Networks",
          shortDescription:
            "43% market share in high-speed data center switching (400G/800G). The networking fabric connecting GPU clusters.",
        },
        {
          symbol: "VRT",
          name: "Vertiv",
          shortDescription:
            "Power management and thermal systems for data centers. Positioned across both power delivery and liquid cooling.",
        },
        {
          symbol: "SMCI",
          name: "Super Micro Computer",
          shortDescription:
            "AI server assembly and rack-scale architecture. Direct Nvidia GPU integration. Governance concerns create elevated company-specific risk.",
        },
      ],
    },
    {
      id: "commodities",
      name: "Commodities — The Physical Constraint Layer",
      thesisDescription:
        "The raw materials underneath every other vertical on this tracker. A single AI data center consumes 25-33 tonnes of copper per megawatt of capacity before accounting for grid infrastructure. Transformer production depends on electrical steel made by one domestic producer. These supply constraints are structural: decade-long mine development timelines colliding with demand curves that move at venture speed. ETFs provide broad commodity exposure while individual names capture the thesis connections no index can.",
      tickers: [
        {
          symbol: "URA",
          name: "Global X Uranium ETF",
          shortDescription:
            "Broad exposure to the uranium mining and nuclear fuel cycle. Tracks the commodity input powering the Energy vertical.",
          vehicleType: "etf",
        },
        {
          symbol: "COPX",
          name: "Global X Copper Miners ETF",
          shortDescription:
            "Basket of global copper producers. Copper deficit projected to widen through 2026+ as AI data center and grid buildout accelerates.",
          vehicleType: "etf",
        },
        {
          symbol: "SIL",
          name: "Global X Silver Miners ETF",
          shortDescription:
            "Silver miners basket. Industrial demand now over half of total silver consumption, driven by electrical contacts and DC components.",
          vehicleType: "etf",
        },
        {
          symbol: "LIT",
          name: "Global X Lithium & Battery Tech ETF",
          shortDescription:
            "Lithium producers and battery technology. Grid-scale battery storage (BESS) is becoming required infrastructure for data center power.",
          vehicleType: "etf",
        },
        {
          symbol: "REMX",
          name: "VanEck Rare Earth/Strategic Metals ETF",
          shortDescription:
            "Rare earth and strategic metals exposure. China controls ~91% of global rare earth refining. This ETF tracks the commodity layer underneath that chokepoint.",
          vehicleType: "etf",
        },
        {
          symbol: "CLF",
          name: "Cleveland-Cliffs",
          shortDescription:
            "Only US producer of grain-oriented electrical steel. Building a $150M transformer plant in West Virginia. No ETF captures this story.",
        },
        {
          symbol: "BHP",
          name: "BHP Group",
          shortDescription:
            "World's largest miner. Record copper production guidance for FY2026. Targeting ~2Mt copper by 2030s. Multi-vector commodity exposure across copper, iron, and potash.",
        },
      ],
    },
  ],
  lastUpdated: "2026-04-02",
  disclaimer:
    "This is a thesis tracking tool, not financial advice. These are equities I'm watching as part of the Agency Era thesis - a framework for understanding where capital flows as AI reshapes infrastructure demand. I am not recommending trades. Do your own research.",
};
