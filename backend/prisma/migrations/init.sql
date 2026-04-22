-- ============================================
-- TABLE USERS
-- ============================================
CREATE TABLE users
(
    id         UUID PRIMARY KEY      DEFAULT gen_random_uuid(),
    name       VARCHAR(128) NOT NULL
        CHECK (LENGTH(TRIM(name)) > 0),
    email      VARCHAR(128) NOT NULL UNIQUE,
    password   VARCHAR(255) NOT NULL,
    role       VARCHAR(32)  NOT NULL DEFAULT 'viewer'
        CHECK (role IN ('super_admin', 'admin', 'editor', 'viewer')),
    status     VARCHAR(32)  NOT NULL DEFAULT 'active'
        CHECK (status IN ('active', 'inactive', 'banned', 'pending')),
    created_at TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_users_email ON users (email);


-- ============================================
-- TABLE REFRESH_TOKEN
-- ============================================
CREATE TABLE refresh_token
(
    id              UUID PRIMARY KEY     DEFAULT gen_random_uuid(),
    user_id         UUID        NOT NULL REFERENCES users (id) ON DELETE CASCADE,
    token           TEXT        NOT NULL UNIQUE,
    status          VARCHAR(32) NOT NULL DEFAULT 'active'
        CHECK (status IN ('active', 'revoked')),
    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    date_expiration TIMESTAMPTZ NOT NULL
);

CREATE INDEX idx_refresh_tokens_user_id ON refresh_token (user_id);
CREATE INDEX idx_refresh_tokens_token ON refresh_token (token);


-- ============================================
-- TABLE ITINERARY
-- ============================================
CREATE TABLE itineraries
(
    id          UUID PRIMARY KEY      DEFAULT gen_random_uuid(),
    user_id     UUID         NOT NULL REFERENCES users (id) ON DELETE CASCADE,
    title       VARCHAR(255) NOT NULL,
    description TEXT,
    start_date  TIMESTAMPTZ  NOT NULL,
    end_date    TIMESTAMPTZ  NOT NULL,
    share_token TEXT         NOT NULL UNIQUE,
    created_at  TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
    updated_at  TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_itineraries_user_id ON itineraries (user_id);
CREATE INDEX idx_itineraries_share_token ON itineraries (share_token);


-- ============================================
-- TABLE LEGS
-- ============================================
CREATE TABLE legs
(
    id           UUID PRIMARY KEY       DEFAULT gen_random_uuid(),
    itinerary_id UUID          NOT NULL REFERENCES itineraries (id) ON DELETE CASCADE,
    title        VARCHAR(255)  NOT NULL,
    description  TEXT,
    latitude     DECIMAL(9, 6) NOT NULL,
    longitude    DECIMAL(9, 6) NOT NULL,
    duration     INT,                    -- en minutes, optionnel
    "order"      INT           NOT NULL, -- "order" est un mot réservé SQL
    created_at   TIMESTAMPTZ   NOT NULL DEFAULT NOW(),
    updated_at   TIMESTAMPTZ   NOT NULL DEFAULT NOW(),

    -- Contrainte: Une itinéraire ne peut pas avoir 2 étapes avec le même order
    UNIQUE (itinerary_id, "order")
);

CREATE INDEX idx_legs_itinerary_id ON legs (itinerary_id);


-- ============================================
-- TRIGGERS pour updated_at
-- ============================================
CREATE
OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
RETURN NEW;
END;
$$
LANGUAGE plpgsql;

CREATE TRIGGER trigger_users_updated_at
    BEFORE UPDATE
    ON users
    FOR EACH ROW
    EXECUTE FUNCTION set_updated_at();

CREATE TRIGGER trigger_itineraries_updated_at
    BEFORE UPDATE
    ON itineraries
    FOR EACH ROW
    EXECUTE FUNCTION set_updated_at();

CREATE TRIGGER trigger_legs_updated_at
    BEFORE UPDATE
    ON legs
    FOR EACH ROW
    EXECUTE FUNCTION set_updated_at();