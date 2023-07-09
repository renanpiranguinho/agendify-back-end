/*
  Warnings:

  - A unique constraint covering the columns `[business_id,weekdays_id]` on the table `Availability` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Availability_business_id_weekdays_id_key" ON "Availability"("business_id", "weekdays_id");
