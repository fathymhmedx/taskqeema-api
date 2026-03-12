/*
  Warnings:

  - Added the required column `content` to the `Lesson` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `lesson` ADD COLUMN `content` VARCHAR(191) NOT NULL,
    ADD COLUMN `sortOrder` INTEGER NOT NULL DEFAULT 0;
