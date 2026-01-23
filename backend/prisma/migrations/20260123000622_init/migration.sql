-- CreateTable
CREATE TABLE "emergencies" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL DEFAULT '',
    "cta" TEXT,
    "tags" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "emergencies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "steps" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "emergencyId" TEXT NOT NULL,

    CONSTRAINT "steps_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "emergencies_slug_key" ON "emergencies"("slug");

-- AddForeignKey
ALTER TABLE "steps" ADD CONSTRAINT "steps_emergencyId_fkey" FOREIGN KEY ("emergencyId") REFERENCES "emergencies"("id") ON DELETE CASCADE ON UPDATE CASCADE;
