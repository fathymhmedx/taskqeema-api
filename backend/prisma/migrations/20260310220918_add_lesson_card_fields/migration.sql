/*
  Warnings:

  - You are about to drop the column `content` on the `lesson` table. All the data in the column will be lost.
  - You are about to drop the column `sortOrder` on the `lesson` table. All the data in the column will be lost.
  - Made the column `description` on table `lesson` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `lesson` DROP COLUMN `content`,
    DROP COLUMN `sortOrder`,
    ADD COLUMN `image` VARCHAR(191) NULL,
    ADD COLUMN `isFavorite` BOOLEAN NULL,
    ADD COLUMN `rating` DOUBLE NULL,
    MODIFY `description` VARCHAR(191) NOT NULL;
