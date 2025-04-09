/*
  Warnings:

  - You are about to drop the `CompleteTask` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "CompleteTask" DROP CONSTRAINT "CompleteTask_userId_fkey";

-- AlterTable
ALTER TABLE "Task" ADD COLUMN     "completionDate" TIMESTAMP(3),
ADD COLUMN     "isComplete" BOOLEAN NOT NULL DEFAULT false;

-- DropTable
DROP TABLE "CompleteTask";
