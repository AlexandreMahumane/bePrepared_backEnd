/*
  Warnings:

  - A unique constraint covering the columns `[device_id]` on the table `subscriber` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `subscriber_device_id_key` ON `subscriber`(`device_id`);
