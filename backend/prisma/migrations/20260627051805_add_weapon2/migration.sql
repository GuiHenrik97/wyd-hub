-- AlterTable
ALTER TABLE "ItemSet" ADD COLUMN     "weapon2Additional" TEXT,
ADD COLUMN     "weapon2Ancient" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "weapon2Refinement" INTEGER,
ADD COLUMN     "weapon2Type" "WeaponEquipmentType";
