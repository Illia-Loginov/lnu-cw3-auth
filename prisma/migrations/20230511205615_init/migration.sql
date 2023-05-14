-- CreateTable
CREATE TABLE "User" (
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("username")
);

-- CreateTable
CREATE TABLE "RefreshToken" (
    "token" TEXT NOT NULL,
    "expiration" TIMESTAMP(3) NOT NULL,
    "username" TEXT NOT NULL,

    CONSTRAINT "RefreshToken_pkey" PRIMARY KEY ("token")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "RefreshToken_token_key" ON "RefreshToken"("token");

-- AddForeignKey
ALTER TABLE "RefreshToken" ADD CONSTRAINT "RefreshToken_username_fkey" FOREIGN KEY ("username") REFERENCES "User"("username") ON DELETE RESTRICT ON UPDATE CASCADE;
