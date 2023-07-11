/*
  Warnings:

  - You are about to drop the column `datetime` on the `Scheduling` table. All the data in the column will be lost.
  - Added the required column `end_datetime` to the `Scheduling` table without a default value. This is not possible if the table is not empty.
  - Added the required column `start_datetime` to the `Scheduling` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Scheduling" DROP COLUMN "datetime",
ADD COLUMN     "end_datetime" TIME NOT NULL,
ADD COLUMN     "start_datetime" TIME NOT NULL;
