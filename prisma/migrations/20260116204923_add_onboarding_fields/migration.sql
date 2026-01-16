-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "phone" TEXT,
    "onboardingComplete" BOOLEAN NOT NULL DEFAULT false,
    "emergencyName" TEXT,
    "emergencyPhone" TEXT,
    "medicalConditions" TEXT,
    "injuries" TEXT,
    "waiverAccepted" BOOLEAN NOT NULL DEFAULT false,
    "weight" REAL,
    "height" REAL,
    "skillLevel" TEXT,
    "primaryInterest" TEXT
);
INSERT INTO "new_User" ("createdAt", "email", "id", "name", "password") SELECT "createdAt", "email", "id", "name", "password" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
