/*
  Warnings:

  - You are about to drop the column `availability_id` on the `Business` table. All the data in the column will be lost.
  - Added the required column `business_id` to the `Availability` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Business" DROP CONSTRAINT "Business_availability_id_fkey";

-- AlterTable
ALTER TABLE "Availability" ADD COLUMN     "business_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Business" DROP COLUMN "availability_id";

-- AddForeignKey
ALTER TABLE "Availability" ADD CONSTRAINT "Availability_business_id_fkey" FOREIGN KEY ("business_id") REFERENCES "Business"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
