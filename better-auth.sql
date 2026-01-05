-- BetterAuth Tables
CREATE TABLE "user" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "emailVerified" BOOLEAN NOT NULL,
    "image" TEXT,
    "createdAt" TIMESTAMP NOT NULL,
    "updatedAt" TIMESTAMP NOT NULL,
    CONSTRAINT "user_email_unique" UNIQUE ("email")
);

CREATE TABLE "session" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "expiresAt" TIMESTAMP NOT NULL,
    "token" TEXT NOT NULL,
    "createdAt" TIMESTAMP NOT NULL,
    "updatedAt" TIMESTAMP NOT NULL,
    "ipAddress" TEXT,
    "userAgent" TEXT,
    "userId" TEXT NOT NULL REFERENCES "user"("id"),
    CONSTRAINT "session_token_unique" UNIQUE ("token")
);

CREATE TABLE "account" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "accountId" TEXT NOT NULL,
    "providerId" TEXT NOT NULL,
    "userId" TEXT NOT NULL REFERENCES "user"("id"),
    "accessToken" TEXT,
    "refreshToken" TEXT,
    "idToken" TEXT,
    "accessTokenExpiresAt" TIMESTAMP,
    "refreshTokenExpiresAt" TIMESTAMP,
    "scope" TEXT,
    "password" TEXT,
    "createdAt" TIMESTAMP NOT NULL,
    "updatedAt" TIMESTAMP NOT NULL
);

CREATE TABLE "verification" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "identifier" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "expiresAt" TIMESTAMP NOT NULL,
    "createdAt" TIMESTAMP,
    "updatedAt" TIMESTAMP,
    CONSTRAINT "verification_identifier_value_unique" UNIQUE ("identifier", "value")
);

-- Application Tables (Recreated based on existing code)

CREATE TABLE "class" (
    "id" UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    "title" TEXT NOT NULL,
    "price" INTEGER DEFAULT 0,
    "start_date" TIMESTAMP WITH TIME ZONE,
    "end_date" TIMESTAMP WITH TIME ZONE,
    "rating" DECIMAL(2, 1) DEFAULT 0,
    "likes" INTEGER DEFAULT 0,
    "thumbnail_img" TEXT,
    "detail_img" TEXT,
    "detail_text" TEXT,
    "lecturer" TEXT,
    "students_total" INTEGER DEFAULT 0,
    "students_max" INTEGER,
    "manager_id" TEXT, -- Can be linked to user.id if manager is a user
    "created_at" TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE "enrollment" (
    "id" UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    "student_id" TEXT NOT NULL REFERENCES "user"("id") ON DELETE CASCADE,
    "class_id" UUID NOT NULL REFERENCES "class"("id") ON DELETE CASCADE,
    "enrolled_at" TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    "is_attended" BOOLEAN DEFAULT FALSE,
    UNIQUE("student_id", "class_id")
);
