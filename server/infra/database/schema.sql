CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Define what our __blog__ table should look like here
-- cols id GUID, topic varchar(50), Title varchar(100), content text, author varchar(100), created_date TIMESTAMPTZ, last_updated TIMESTAMPTZ 
CREATE TABLE IF NOT EXISTS blogs (
    id UUID primary KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(100) NOT NULL,
    topic VARCHAR(100) NOT NULL,
    content text NOT NULL,
    author VARCHAR(100) NOT NULL,
    created_date TIMESTAMPTZ DEFAULT NOW(),
    last_updated TIMESTAMPTZ DEFAULT NOW()
);

-- Define what our history table should look like here
-- Cols id GUID, resourse_id, date created, content
CREATE TABLE IF NOT EXISTS history (
    id UUID primary KEY DEFAULT uuid_generate_v4(),
    resourse_id UUID references blogs(id),
    date_created TIMESTAMPTZ DEFAULT NOW(),
    content jsonb NOT NULL
)