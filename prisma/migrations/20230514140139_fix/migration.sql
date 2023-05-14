/*
  Warnings:

  - Made the column `category_id` on table `Business` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Business" DROP CONSTRAINT "Business_category_id_fkey";

-- DropIndex
DROP INDEX "Business_category_id_key";

-- AlterTable
ALTER TABLE "Business" ALTER COLUMN "category_id" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Business" ADD CONSTRAINT "Business_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
