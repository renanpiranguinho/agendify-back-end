/*
  Warnings:

  - Changed the type of `end_datetime` on the `Scheduling` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `start_datetime` on the `Scheduling` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Scheduling" DROP COLUMN "end_datetime",
ADD COLUMN     "end_datetime" TIMESTAMP(3) NOT NULL,
DROP COLUMN "start_datetime",
ADD COLUMN     "start_datetime" TIMESTAMP(3) NOT NULL;
