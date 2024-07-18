/*
  Warnings:

  - Added the required column `province_id` to the `subscriber` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `subscriber` ADD COLUMN `province_id` VARCHAR(191) NOT NULL;
