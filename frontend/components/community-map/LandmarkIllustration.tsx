import type { LandmarkType } from "@/lib/memberMapVisuals";
import { BakeryLandmark } from "./landmarks/BakeryLandmark";
import { MaterialLabLandmark } from "./landmarks/MaterialLabLandmark";
import { AirLabLandmark } from "./landmarks/AirLabLandmark";
import { PotteryWorkshopLandmark } from "./landmarks/PotteryWorkshopLandmark";
import { FurnitureStudioLandmark } from "./landmarks/FurnitureStudioLandmark";
import { GameCharacterLandmark } from "./landmarks/GameCharacterLandmark";
import { PublicArtistLandmark } from "./landmarks/PublicArtistLandmark";
import { PerformerLandmark } from "./landmarks/PerformerLandmark";
import { CommunityHouseLandmark } from "./landmarks/CommunityHouseLandmark";
import { CraftCharacterLandmark } from "./landmarks/CraftCharacterLandmark";
import { WriterCharacterLandmark } from "./landmarks/WriterCharacterLandmark";
import { PublisherKioskLandmark } from "./landmarks/PublisherKioskLandmark";
import { ArtSpaceLandmark } from "./landmarks/ArtSpaceLandmark";
import { CommunityGardenLandmark } from "./landmarks/CommunityGardenLandmark";
import { EmbroideryWorkshopLandmark } from "./landmarks/EmbroideryWorkshopLandmark";
import { ClimateLabLandmark } from "./landmarks/ClimateLabLandmark";
import { SailorClubLandmark } from "./landmarks/SailorClubLandmark";
import { GenericBuildingLandmark } from "./landmarks/GenericBuildingLandmark";
import { GenericCharacterLandmark } from "./landmarks/GenericCharacterLandmark";

export type LandmarkIllustrationProps = {
  type: LandmarkType;
  variant?: string;
  accent?: string;
  className?: string;
};

export function LandmarkIllustration({
  type,
  variant,
  accent,
  className = "landmark-svg",
}: LandmarkIllustrationProps) {
  const props = { variant, accent, className };

  switch (type) {
    case "bakery":
      return <BakeryLandmark {...props} />;
    case "material-lab":
      return <MaterialLabLandmark {...props} />;
    case "air-lab":
      return <AirLabLandmark {...props} />;
    case "pottery-workshop":
      return <PotteryWorkshopLandmark {...props} />;
    case "furniture-studio":
      return <FurnitureStudioLandmark {...props} />;
    case "game-character":
      return <GameCharacterLandmark {...props} />;
    case "public-artist":
      return <PublicArtistLandmark {...props} />;
    case "performer":
      return <PerformerLandmark {...props} />;
    case "community-house":
      return <CommunityHouseLandmark {...props} />;
    case "craft-character":
      return <CraftCharacterLandmark {...props} />;
    case "writer-character":
      return <WriterCharacterLandmark {...props} />;
    case "publisher-kiosk":
      return <PublisherKioskLandmark {...props} />;
    case "art-space":
      return <ArtSpaceLandmark {...props} />;
    case "community-garden":
      return <CommunityGardenLandmark {...props} />;
    case "embroidery-workshop":
      return <EmbroideryWorkshopLandmark {...props} />;
    case "climate-lab":
      return <ClimateLabLandmark {...props} />;
    case "sailor-club":
      return <SailorClubLandmark {...props} />;
    case "generic-building":
      return <GenericBuildingLandmark {...props} />;
    case "generic-character":
      return <GenericCharacterLandmark {...props} />;
    default:
      return <GenericBuildingLandmark {...props} />;
  }
}
