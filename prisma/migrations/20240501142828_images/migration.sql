-- CreateTable
CREATE TABLE "Image" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdById" TEXT NOT NULL,
    "creatorName" TEXT NOT NULL,
    "prompt" TEXT NOT NULL,
    "negative" TEXT,
    "width" INTEGER NOT NULL,
    "height" INTEGER NOT NULL,
    "guidence" INTEGER NOT NULL,

    CONSTRAINT "Image_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Image_name_idx" ON "Image"("name");
