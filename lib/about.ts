export interface CvSection {
  title: string;
  items: string[];
}

export interface AboutData {
  portraitUrl: string;
  bioParagraphs: string[];
  statementParagraphs: string[];
  cvSections: CvSection[];
}

export const defaultAbout: AboutData = {
  portraitUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800",
  bioParagraphs: [
    "Ella Wright is a contemporary painter based in New York. Her work explores the boundaries between representation and abstraction through layered surfaces and a restrained palette.",
    "She has exhibited nationally and internationally and has been the recipient of residencies at MacDowell, Yaddo, and Vermont Studio Center. Her work is held in private collections across the United States and Europe.",
  ],
  statementParagraphs: [
    "I am interested in the way light falls on a surface and how time leaves a trace. My paintings begin from observation and drift toward memory—building and scraping back, leaving edges that hesitate between presence and absence.",
    "The work does not illustrate a story so much as hold space for quiet attention. I want the viewer to slow down and meet the surface with the same patience it asked of me in the making.",
  ],
  cvSections: [
    {
      title: "Education",
      items: [
        "MFA Painting, Rhode Island School of Design, Providence, RI — 2019",
        "BFA Studio Art, School of the Art Institute of Chicago, Chicago, IL — 2015",
      ],
    },
    {
      title: "Exhibitions",
      items: [
        "Solo Show, Galerie du Monde, New York, NY — 2024",
        "Group Show: Material Witness, The Drawing Center, New York, NY — 2023",
        "Two-Person Show, Reyes | Finn, Detroit, MI — 2022",
        "Group Show: Surface Tension, ICA Boston, Boston, MA — 2021",
      ],
    },
    {
      title: "Residencies",
      items: [
        "MacDowell, Peterborough, NH — 2023",
        "Yaddo, Saratoga Springs, NY — 2022",
        "Vermont Studio Center, Johnson, VT — 2021",
      ],
    },
  ],
};
