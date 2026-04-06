-- CreateTable
CREATE TABLE "matches" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "matches_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users_matches" (
    "user_id" INTEGER NOT NULL,
    "match_id" TEXT NOT NULL,

    CONSTRAINT "users_matches_pkey" PRIMARY KEY ("user_id","match_id")
);

-- AddForeignKey
ALTER TABLE "users_matches" ADD CONSTRAINT "users_matches_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users_matches" ADD CONSTRAINT "users_matches_match_id_fkey" FOREIGN KEY ("match_id") REFERENCES "matches"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
