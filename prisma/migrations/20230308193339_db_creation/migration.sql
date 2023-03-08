-- CreateTable
CREATE TABLE "Renter" (
    "idrenter" SERIAL NOT NULL,
    "namerenter" TEXT,
    "firstnamerenter" TEXT,
    "emailrenter" TEXT,

    CONSTRAINT "Renter_pkey" PRIMARY KEY ("idrenter")
);

-- CreateTable
CREATE TABLE "Car" (
    "idcar" SERIAL NOT NULL,
    "brandcar" TEXT,
    "modelcar" TEXT,
    "yearcar" DATE,
    "citycar" TEXT,
    "priceperdaycar" REAL,
    "photocar" BYTEA,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Car_pkey" PRIMARY KEY ("idcar")
);

-- CreateIndex
CREATE UNIQUE INDEX "Renter_emailrenter_key" ON "Renter"("emailrenter");

-- AddForeignKey
ALTER TABLE "Car" ADD CONSTRAINT "Car_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Renter"("idrenter") ON DELETE RESTRICT ON UPDATE CASCADE;
