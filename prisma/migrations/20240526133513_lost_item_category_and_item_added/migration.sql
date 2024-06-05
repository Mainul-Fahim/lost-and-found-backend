-- CreateEnum
CREATE TYPE "FoundStatus" AS ENUM ('FOUND', 'NOT_FOUND');

-- CreateTable
CREATE TABLE "lostItemCategories" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "lostItemCategories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "lostItems" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,
    "foundItemName" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "status" "FoundStatus" NOT NULL DEFAULT 'NOT_FOUND',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "lostItems_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "lostItems_categoryId_key" ON "lostItems"("categoryId");

-- AddForeignKey
ALTER TABLE "lostItems" ADD CONSTRAINT "lostItems_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lostItems" ADD CONSTRAINT "lostItems_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "lostItemCategories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
