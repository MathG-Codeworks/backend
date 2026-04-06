-- CreateTable
CREATE TABLE "attemps" (
    "id" SERIAL NOT NULL,
    "is_correct" BOOLEAN NOT NULL,
    "number" INTEGER NOT NULL,
    "exercise_id" INTEGER NOT NULL,
    "option_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "attemps_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "attemps" ADD CONSTRAINT "attemps_exercise_id_fkey" FOREIGN KEY ("exercise_id") REFERENCES "exercises"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "attemps" ADD CONSTRAINT "attemps_option_id_fkey" FOREIGN KEY ("option_id") REFERENCES "options"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "attemps" ADD CONSTRAINT "attemps_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
