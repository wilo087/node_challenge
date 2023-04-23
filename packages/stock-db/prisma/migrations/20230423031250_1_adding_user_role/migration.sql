/*
  Warnings:

  - Added the required column `close` to the `Stock` table without a default value. This is not possible if the table is not empty.
  - Added the required column `high` to the `Stock` table without a default value. This is not possible if the table is not empty.
  - Added the required column `low` to the `Stock` table without a default value. This is not possible if the table is not empty.
  - Added the required column `open` to the `Stock` table without a default value. This is not possible if the table is not empty.
  - Added the required column `symbol` to the `Stock` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'USER');

-- AlterTable
ALTER TABLE "Stock" ADD COLUMN     "close" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "high" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "low" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "open" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "symbol" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'USER';
