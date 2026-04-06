-- CreateTable
CREATE TABLE "rounds" (
    "id" SERIAL NOT NULL,
    "match_id" TEXT NOT NULL,
    "minigame_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "rounds_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "rounds" ADD CONSTRAINT "rounds_match_id_fkey" FOREIGN KEY ("match_id") REFERENCES "matches"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rounds" ADD CONSTRAINT "rounds_minigame_id_fkey" FOREIGN KEY ("minigame_id") REFERENCES "minigames"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
