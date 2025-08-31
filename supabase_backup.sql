--
-- PostgreSQL database dump
--

-- Dumped from database version 15.8
-- Dumped by pg_dump version 17.5

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: postgres; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE postgres WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'en_US.UTF-8';


ALTER DATABASE postgres OWNER TO postgres;

\connect postgres

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: auth; Type: SCHEMA; Schema: -; Owner: supabase_admin
--

CREATE SCHEMA auth;


ALTER SCHEMA auth OWNER TO supabase_admin;

--
-- Name: depots; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA depots;


ALTER SCHEMA depots OWNER TO postgres;

--
-- Name: extensions; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA extensions;


ALTER SCHEMA extensions OWNER TO postgres;

--
-- Name: graphql; Type: SCHEMA; Schema: -; Owner: supabase_admin
--

CREATE SCHEMA graphql;


ALTER SCHEMA graphql OWNER TO supabase_admin;

--
-- Name: graphql_public; Type: SCHEMA; Schema: -; Owner: supabase_admin
--

CREATE SCHEMA graphql_public;


ALTER SCHEMA graphql_public OWNER TO supabase_admin;

--
-- Name: pgbouncer; Type: SCHEMA; Schema: -; Owner: pgbouncer
--

CREATE SCHEMA pgbouncer;


ALTER SCHEMA pgbouncer OWNER TO pgbouncer;

--
-- Name: pgsodium; Type: SCHEMA; Schema: -; Owner: supabase_admin
--

CREATE SCHEMA pgsodium;


ALTER SCHEMA pgsodium OWNER TO supabase_admin;

--
-- Name: pgsodium; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS pgsodium WITH SCHEMA pgsodium;


--
-- Name: EXTENSION pgsodium; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION pgsodium IS 'Pgsodium is a modern cryptography library for Postgres.';


--
-- Name: realtime; Type: SCHEMA; Schema: -; Owner: supabase_admin
--

CREATE SCHEMA realtime;


ALTER SCHEMA realtime OWNER TO supabase_admin;

--
-- Name: storage; Type: SCHEMA; Schema: -; Owner: supabase_admin
--

CREATE SCHEMA storage;


ALTER SCHEMA storage OWNER TO supabase_admin;

--
-- Name: vault; Type: SCHEMA; Schema: -; Owner: supabase_admin
--

CREATE SCHEMA vault;


ALTER SCHEMA vault OWNER TO supabase_admin;

--
-- Name: dblink; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS dblink WITH SCHEMA public;


--
-- Name: EXTENSION dblink; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION dblink IS 'connect to other PostgreSQL databases from within a database';


--
-- Name: pg_graphql; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS pg_graphql WITH SCHEMA graphql;


--
-- Name: EXTENSION pg_graphql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION pg_graphql IS 'pg_graphql: GraphQL support';


--
-- Name: pg_stat_statements; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS pg_stat_statements WITH SCHEMA extensions;


--
-- Name: EXTENSION pg_stat_statements; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION pg_stat_statements IS 'track planning and execution statistics of all SQL statements executed';


--
-- Name: pgcrypto; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS pgcrypto WITH SCHEMA extensions;


--
-- Name: EXTENSION pgcrypto; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION pgcrypto IS 'cryptographic functions';


--
-- Name: pgjwt; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS pgjwt WITH SCHEMA extensions;


--
-- Name: EXTENSION pgjwt; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION pgjwt IS 'JSON Web Token API for Postgresql';


--
-- Name: supabase_vault; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS supabase_vault WITH SCHEMA vault;


--
-- Name: EXTENSION supabase_vault; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION supabase_vault IS 'Supabase Vault Extension';


--
-- Name: uuid-ossp; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA extensions;


--
-- Name: EXTENSION "uuid-ossp"; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';


--
-- Name: aal_level; Type: TYPE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TYPE auth.aal_level AS ENUM (
    'aal1',
    'aal2',
    'aal3'
);


ALTER TYPE auth.aal_level OWNER TO supabase_auth_admin;

--
-- Name: code_challenge_method; Type: TYPE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TYPE auth.code_challenge_method AS ENUM (
    's256',
    'plain'
);


ALTER TYPE auth.code_challenge_method OWNER TO supabase_auth_admin;

--
-- Name: factor_status; Type: TYPE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TYPE auth.factor_status AS ENUM (
    'unverified',
    'verified'
);


ALTER TYPE auth.factor_status OWNER TO supabase_auth_admin;

--
-- Name: factor_type; Type: TYPE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TYPE auth.factor_type AS ENUM (
    'totp',
    'webauthn',
    'phone'
);


ALTER TYPE auth.factor_type OWNER TO supabase_auth_admin;

--
-- Name: one_time_token_type; Type: TYPE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TYPE auth.one_time_token_type AS ENUM (
    'confirmation_token',
    'reauthentication_token',
    'recovery_token',
    'email_change_token_new',
    'email_change_token_current',
    'phone_change_token'
);


ALTER TYPE auth.one_time_token_type OWNER TO supabase_auth_admin;

--
-- Name: StockType; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."StockType" AS ENUM (
    'crypto',
    'stock',
    'etf',
    'currency'
);


ALTER TYPE public."StockType" OWNER TO postgres;

--
-- Name: TYPE "StockType"; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON TYPE public."StockType" IS 'Type of a Stock e.g. etf, stock, crypto, currency';


--
-- Name: info_record; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.info_record AS (
	id bigint,
	symbol text,
	name text,
	description text
);


ALTER TYPE public.info_record OWNER TO postgres;

--
-- Name: position_record; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.position_record AS (
	id bigint,
	date date,
	depot_id bigint,
	stock_id bigint,
	price integer,
	amount integer
);


ALTER TYPE public.position_record OWNER TO postgres;

--
-- Name: stockprice_record; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.stockprice_record AS (
	stock_id bigint,
	"timestamp" date,
	open real,
	close real,
	high real,
	low real,
	volume bigint,
	price_id bigint
);


ALTER TYPE public.stockprice_record OWNER TO postgres;

--
-- Name: depot_info_result; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.depot_info_result AS (
	stockprice public.stockprice_record,
	"position" public.position_record,
	info public.info_record
);


ALTER TYPE public.depot_info_result OWNER TO postgres;

--
-- Name: action; Type: TYPE; Schema: realtime; Owner: supabase_admin
--

CREATE TYPE realtime.action AS ENUM (
    'INSERT',
    'UPDATE',
    'DELETE',
    'TRUNCATE',
    'ERROR'
);


ALTER TYPE realtime.action OWNER TO supabase_admin;

--
-- Name: equality_op; Type: TYPE; Schema: realtime; Owner: supabase_admin
--

CREATE TYPE realtime.equality_op AS ENUM (
    'eq',
    'neq',
    'lt',
    'lte',
    'gt',
    'gte',
    'in'
);


ALTER TYPE realtime.equality_op OWNER TO supabase_admin;

--
-- Name: user_defined_filter; Type: TYPE; Schema: realtime; Owner: supabase_admin
--

CREATE TYPE realtime.user_defined_filter AS (
	column_name text,
	op realtime.equality_op,
	value text
);


ALTER TYPE realtime.user_defined_filter OWNER TO supabase_admin;

--
-- Name: wal_column; Type: TYPE; Schema: realtime; Owner: supabase_admin
--

CREATE TYPE realtime.wal_column AS (
	name text,
	type_name text,
	type_oid oid,
	value jsonb,
	is_pkey boolean,
	is_selectable boolean
);


ALTER TYPE realtime.wal_column OWNER TO supabase_admin;

--
-- Name: wal_rls; Type: TYPE; Schema: realtime; Owner: supabase_admin
--

CREATE TYPE realtime.wal_rls AS (
	wal jsonb,
	is_rls_enabled boolean,
	subscription_ids uuid[],
	errors text[]
);


ALTER TYPE realtime.wal_rls OWNER TO supabase_admin;

--
-- Name: email(); Type: FUNCTION; Schema: auth; Owner: supabase_auth_admin
--

CREATE FUNCTION auth.email() RETURNS text
    LANGUAGE sql STABLE
    AS $$
  select 
  coalesce(
    nullif(current_setting('request.jwt.claim.email', true), ''),
    (nullif(current_setting('request.jwt.claims', true), '')::jsonb ->> 'email')
  )::text
$$;


ALTER FUNCTION auth.email() OWNER TO supabase_auth_admin;

--
-- Name: FUNCTION email(); Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON FUNCTION auth.email() IS 'Deprecated. Use auth.jwt() -> ''email'' instead.';


--
-- Name: jwt(); Type: FUNCTION; Schema: auth; Owner: supabase_auth_admin
--

CREATE FUNCTION auth.jwt() RETURNS jsonb
    LANGUAGE sql STABLE
    AS $$
  select 
    coalesce(
        nullif(current_setting('request.jwt.claim', true), ''),
        nullif(current_setting('request.jwt.claims', true), '')
    )::jsonb
$$;


ALTER FUNCTION auth.jwt() OWNER TO supabase_auth_admin;

--
-- Name: role(); Type: FUNCTION; Schema: auth; Owner: supabase_auth_admin
--

CREATE FUNCTION auth.role() RETURNS text
    LANGUAGE sql STABLE
    AS $$
  select 
  coalesce(
    nullif(current_setting('request.jwt.claim.role', true), ''),
    (nullif(current_setting('request.jwt.claims', true), '')::jsonb ->> 'role')
  )::text
$$;


ALTER FUNCTION auth.role() OWNER TO supabase_auth_admin;

--
-- Name: FUNCTION role(); Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON FUNCTION auth.role() IS 'Deprecated. Use auth.jwt() -> ''role'' instead.';


--
-- Name: uid(); Type: FUNCTION; Schema: auth; Owner: supabase_auth_admin
--

CREATE FUNCTION auth.uid() RETURNS uuid
    LANGUAGE sql STABLE
    AS $$
  select 
  coalesce(
    nullif(current_setting('request.jwt.claim.sub', true), ''),
    (nullif(current_setting('request.jwt.claims', true), '')::jsonb ->> 'sub')
  )::uuid
$$;


ALTER FUNCTION auth.uid() OWNER TO supabase_auth_admin;

--
-- Name: FUNCTION uid(); Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON FUNCTION auth.uid() IS 'Deprecated. Use auth.jwt() -> ''sub'' instead.';


--
-- Name: grant_pg_cron_access(); Type: FUNCTION; Schema: extensions; Owner: supabase_admin
--

CREATE FUNCTION extensions.grant_pg_cron_access() RETURNS event_trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
  IF EXISTS (
    SELECT
    FROM pg_event_trigger_ddl_commands() AS ev
    JOIN pg_extension AS ext
    ON ev.objid = ext.oid
    WHERE ext.extname = 'pg_cron'
  )
  THEN
    grant usage on schema cron to postgres with grant option;

    alter default privileges in schema cron grant all on tables to postgres with grant option;
    alter default privileges in schema cron grant all on functions to postgres with grant option;
    alter default privileges in schema cron grant all on sequences to postgres with grant option;

    alter default privileges for user supabase_admin in schema cron grant all
        on sequences to postgres with grant option;
    alter default privileges for user supabase_admin in schema cron grant all
        on tables to postgres with grant option;
    alter default privileges for user supabase_admin in schema cron grant all
        on functions to postgres with grant option;

    grant all privileges on all tables in schema cron to postgres with grant option;
    revoke all on table cron.job from postgres;
    grant select on table cron.job to postgres with grant option;
  END IF;
END;
$$;


ALTER FUNCTION extensions.grant_pg_cron_access() OWNER TO supabase_admin;

--
-- Name: FUNCTION grant_pg_cron_access(); Type: COMMENT; Schema: extensions; Owner: supabase_admin
--

COMMENT ON FUNCTION extensions.grant_pg_cron_access() IS 'Grants access to pg_cron';


--
-- Name: grant_pg_graphql_access(); Type: FUNCTION; Schema: extensions; Owner: supabase_admin
--

CREATE FUNCTION extensions.grant_pg_graphql_access() RETURNS event_trigger
    LANGUAGE plpgsql
    AS $_$
DECLARE
    func_is_graphql_resolve bool;
BEGIN
    func_is_graphql_resolve = (
        SELECT n.proname = 'resolve'
        FROM pg_event_trigger_ddl_commands() AS ev
        LEFT JOIN pg_catalog.pg_proc AS n
        ON ev.objid = n.oid
    );

    IF func_is_graphql_resolve
    THEN
        -- Update public wrapper to pass all arguments through to the pg_graphql resolve func
        DROP FUNCTION IF EXISTS graphql_public.graphql;
        create or replace function graphql_public.graphql(
            "operationName" text default null,
            query text default null,
            variables jsonb default null,
            extensions jsonb default null
        )
            returns jsonb
            language sql
        as $$
            select graphql.resolve(
                query := query,
                variables := coalesce(variables, '{}'),
                "operationName" := "operationName",
                extensions := extensions
            );
        $$;

        -- This hook executes when `graphql.resolve` is created. That is not necessarily the last
        -- function in the extension so we need to grant permissions on existing entities AND
        -- update default permissions to any others that are created after `graphql.resolve`
        grant usage on schema graphql to postgres, anon, authenticated, service_role;
        grant select on all tables in schema graphql to postgres, anon, authenticated, service_role;
        grant execute on all functions in schema graphql to postgres, anon, authenticated, service_role;
        grant all on all sequences in schema graphql to postgres, anon, authenticated, service_role;
        alter default privileges in schema graphql grant all on tables to postgres, anon, authenticated, service_role;
        alter default privileges in schema graphql grant all on functions to postgres, anon, authenticated, service_role;
        alter default privileges in schema graphql grant all on sequences to postgres, anon, authenticated, service_role;

        -- Allow postgres role to allow granting usage on graphql and graphql_public schemas to custom roles
        grant usage on schema graphql_public to postgres with grant option;
        grant usage on schema graphql to postgres with grant option;
    END IF;

END;
$_$;


ALTER FUNCTION extensions.grant_pg_graphql_access() OWNER TO supabase_admin;

--
-- Name: FUNCTION grant_pg_graphql_access(); Type: COMMENT; Schema: extensions; Owner: supabase_admin
--

COMMENT ON FUNCTION extensions.grant_pg_graphql_access() IS 'Grants access to pg_graphql';


--
-- Name: grant_pg_net_access(); Type: FUNCTION; Schema: extensions; Owner: supabase_admin
--

CREATE FUNCTION extensions.grant_pg_net_access() RETURNS event_trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
  IF EXISTS (
    SELECT 1
    FROM pg_event_trigger_ddl_commands() AS ev
    JOIN pg_extension AS ext
    ON ev.objid = ext.oid
    WHERE ext.extname = 'pg_net'
  )
  THEN
    IF NOT EXISTS (
      SELECT 1
      FROM pg_roles
      WHERE rolname = 'supabase_functions_admin'
    )
    THEN
      CREATE USER supabase_functions_admin NOINHERIT CREATEROLE LOGIN NOREPLICATION;
    END IF;

    GRANT USAGE ON SCHEMA net TO supabase_functions_admin, postgres, anon, authenticated, service_role;

    IF EXISTS (
      SELECT FROM pg_extension
      WHERE extname = 'pg_net'
      -- all versions in use on existing projects as of 2025-02-20
      -- version 0.12.0 onwards don't need these applied
      AND extversion IN ('0.2', '0.6', '0.7', '0.7.1', '0.8', '0.10.0', '0.11.0')
    ) THEN
      ALTER function net.http_get(url text, params jsonb, headers jsonb, timeout_milliseconds integer) SECURITY DEFINER;
      ALTER function net.http_post(url text, body jsonb, params jsonb, headers jsonb, timeout_milliseconds integer) SECURITY DEFINER;

      ALTER function net.http_get(url text, params jsonb, headers jsonb, timeout_milliseconds integer) SET search_path = net;
      ALTER function net.http_post(url text, body jsonb, params jsonb, headers jsonb, timeout_milliseconds integer) SET search_path = net;

      REVOKE ALL ON FUNCTION net.http_get(url text, params jsonb, headers jsonb, timeout_milliseconds integer) FROM PUBLIC;
      REVOKE ALL ON FUNCTION net.http_post(url text, body jsonb, params jsonb, headers jsonb, timeout_milliseconds integer) FROM PUBLIC;

      GRANT EXECUTE ON FUNCTION net.http_get(url text, params jsonb, headers jsonb, timeout_milliseconds integer) TO supabase_functions_admin, postgres, anon, authenticated, service_role;
      GRANT EXECUTE ON FUNCTION net.http_post(url text, body jsonb, params jsonb, headers jsonb, timeout_milliseconds integer) TO supabase_functions_admin, postgres, anon, authenticated, service_role;
    END IF;
  END IF;
END;
$$;


ALTER FUNCTION extensions.grant_pg_net_access() OWNER TO supabase_admin;

--
-- Name: FUNCTION grant_pg_net_access(); Type: COMMENT; Schema: extensions; Owner: supabase_admin
--

COMMENT ON FUNCTION extensions.grant_pg_net_access() IS 'Grants access to pg_net';


--
-- Name: pgrst_ddl_watch(); Type: FUNCTION; Schema: extensions; Owner: supabase_admin
--

CREATE FUNCTION extensions.pgrst_ddl_watch() RETURNS event_trigger
    LANGUAGE plpgsql
    AS $$
DECLARE
  cmd record;
BEGIN
  FOR cmd IN SELECT * FROM pg_event_trigger_ddl_commands()
  LOOP
    IF cmd.command_tag IN (
      'CREATE SCHEMA', 'ALTER SCHEMA'
    , 'CREATE TABLE', 'CREATE TABLE AS', 'SELECT INTO', 'ALTER TABLE'
    , 'CREATE FOREIGN TABLE', 'ALTER FOREIGN TABLE'
    , 'CREATE VIEW', 'ALTER VIEW'
    , 'CREATE MATERIALIZED VIEW', 'ALTER MATERIALIZED VIEW'
    , 'CREATE FUNCTION', 'ALTER FUNCTION'
    , 'CREATE TRIGGER'
    , 'CREATE TYPE', 'ALTER TYPE'
    , 'CREATE RULE'
    , 'COMMENT'
    )
    -- don't notify in case of CREATE TEMP table or other objects created on pg_temp
    AND cmd.schema_name is distinct from 'pg_temp'
    THEN
      NOTIFY pgrst, 'reload schema';
    END IF;
  END LOOP;
END; $$;


ALTER FUNCTION extensions.pgrst_ddl_watch() OWNER TO supabase_admin;

--
-- Name: pgrst_drop_watch(); Type: FUNCTION; Schema: extensions; Owner: supabase_admin
--

CREATE FUNCTION extensions.pgrst_drop_watch() RETURNS event_trigger
    LANGUAGE plpgsql
    AS $$
DECLARE
  obj record;
BEGIN
  FOR obj IN SELECT * FROM pg_event_trigger_dropped_objects()
  LOOP
    IF obj.object_type IN (
      'schema'
    , 'table'
    , 'foreign table'
    , 'view'
    , 'materialized view'
    , 'function'
    , 'trigger'
    , 'type'
    , 'rule'
    )
    AND obj.is_temporary IS false -- no pg_temp objects
    THEN
      NOTIFY pgrst, 'reload schema';
    END IF;
  END LOOP;
END; $$;


ALTER FUNCTION extensions.pgrst_drop_watch() OWNER TO supabase_admin;

--
-- Name: set_graphql_placeholder(); Type: FUNCTION; Schema: extensions; Owner: supabase_admin
--

CREATE FUNCTION extensions.set_graphql_placeholder() RETURNS event_trigger
    LANGUAGE plpgsql
    AS $_$
    DECLARE
    graphql_is_dropped bool;
    BEGIN
    graphql_is_dropped = (
        SELECT ev.schema_name = 'graphql_public'
        FROM pg_event_trigger_dropped_objects() AS ev
        WHERE ev.schema_name = 'graphql_public'
    );

    IF graphql_is_dropped
    THEN
        create or replace function graphql_public.graphql(
            "operationName" text default null,
            query text default null,
            variables jsonb default null,
            extensions jsonb default null
        )
            returns jsonb
            language plpgsql
        as $$
            DECLARE
                server_version float;
            BEGIN
                server_version = (SELECT (SPLIT_PART((select version()), ' ', 2))::float);

                IF server_version >= 14 THEN
                    RETURN jsonb_build_object(
                        'errors', jsonb_build_array(
                            jsonb_build_object(
                                'message', 'pg_graphql extension is not enabled.'
                            )
                        )
                    );
                ELSE
                    RETURN jsonb_build_object(
                        'errors', jsonb_build_array(
                            jsonb_build_object(
                                'message', 'pg_graphql is only available on projects running Postgres 14 onwards.'
                            )
                        )
                    );
                END IF;
            END;
        $$;
    END IF;

    END;
$_$;


ALTER FUNCTION extensions.set_graphql_placeholder() OWNER TO supabase_admin;

--
-- Name: FUNCTION set_graphql_placeholder(); Type: COMMENT; Schema: extensions; Owner: supabase_admin
--

COMMENT ON FUNCTION extensions.set_graphql_placeholder() IS 'Reintroduces placeholder function for graphql_public.graphql';


--
-- Name: get_auth(text); Type: FUNCTION; Schema: pgbouncer; Owner: supabase_admin
--

CREATE FUNCTION pgbouncer.get_auth(p_usename text) RETURNS TABLE(username text, password text)
    LANGUAGE plpgsql SECURITY DEFINER
    AS $_$
begin
    raise debug 'PgBouncer auth request: %', p_usename;

    return query
    select 
        rolname::text, 
        case when rolvaliduntil < now() 
            then null 
            else rolpassword::text 
        end 
    from pg_authid 
    where rolname=$1 and rolcanlogin;
end;
$_$;


ALTER FUNCTION pgbouncer.get_auth(p_usename text) OWNER TO supabase_admin;

--
-- Name: batch_update_depot_values(date, date); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.batch_update_depot_values(start_date date, end_date date) RETURNS void
    LANGUAGE plpgsql
    AS $$
BEGIN
    IF start_date > end_date THEN
        RAISE EXCEPTION 'start_date must be less than or equal to end_date';
    END IF;

    WHILE start_date <= end_date LOOP
        PERFORM update_depot_values(start_date);
        start_date := start_date + INTERVAL '1 day';
    END LOOP;
END;
$$;


ALTER FUNCTION public.batch_update_depot_values(start_date date, end_date date) OWNER TO postgres;

--
-- Name: batch_update_depot_values(bigint, date, date); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.batch_update_depot_values(depot_id bigint, start_date date, end_date date) RETURNS void
    LANGUAGE plpgsql
    AS $$
BEGIN
    IF start_date > end_date THEN
        RAISE EXCEPTION 'start_date must be less than or equal to end_date';
    END IF;

    WHILE start_date <= end_date LOOP
        PERFORM update_depot_values_s(start_date, depot_id);
        start_date := start_date + INTERVAL '1 day';
    END LOOP;
END;
$$;


ALTER FUNCTION public.batch_update_depot_values(depot_id bigint, start_date date, end_date date) OWNER TO postgres;

--
-- Name: batch_update_depot_values_s(integer, date, date); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.batch_update_depot_values_s(depot_id integer, start_date date, end_date date) RETURNS void
    LANGUAGE plpgsql
    AS $$
BEGIN
    IF start_date > end_date THEN
        RAISE EXCEPTION 'start_date must be less than or equal to end_date';
    END IF;

    WHILE start_date <= end_date LOOP
        PERFORM update_depot_values_s(start_date, depot_id);
        start_date := start_date + INTERVAL '1 day';
    END LOOP;
END;
$$;


ALTER FUNCTION public.batch_update_depot_values_s(depot_id integer, start_date date, end_date date) OWNER TO postgres;

--
-- Name: batch_update_depot_values_s(bigint, date, date); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.batch_update_depot_values_s(depot_id bigint, start_date date, end_date date) RETURNS void
    LANGUAGE plpgsql
    AS $$
BEGIN
    IF start_date > end_date THEN
        RAISE EXCEPTION 'start_date must be less than or equal to end_date';
    END IF;

    WHILE start_date <= end_date LOOP
        PERFORM update_depot_values_s(start_date, depot_id);
        start_date := start_date + INTERVAL '1 day';
    END LOOP;
END;
$$;


ALTER FUNCTION public.batch_update_depot_values_s(depot_id bigint, start_date date, end_date date) OWNER TO postgres;

--
-- Name: buy_stock(date, bigint, bigint, integer); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.buy_stock(p_timestamp date, p_depot_id bigint, p_stock_id bigint, p_amount integer) RETURNS void
    LANGUAGE plpgsql
    AS $$
DECLARE
    closest_price NUMERIC;
    closest_price_timestamp DATE;
    total_cost NUMERIC;
    liquid_assets_n int;
    stock_assets_n int;
BEGIN
    -- Find the price closest to the provided timestamp but not in the future
    SELECT sp.close, sp."timestamp"
    INTO closest_price, closest_price_timestamp
    FROM "StockPrices" AS sp
    WHERE sp.stock_id = p_stock_id
      AND sp."timestamp" <= p_timestamp
    ORDER BY sp."timestamp" DESC
    LIMIT 1;

    -- Calculate the total cost
    total_cost := closest_price * p_amount;

    -- Check if the depot has enough liquid assets
    IF (SELECT d.liquid_assets FROM depots."Depots" AS d WHERE d.id = p_depot_id) < total_cost THEN
        RAISE EXCEPTION 'Insufficient liquid assets in depot %', p_depot_id;
    END IF;

    -- Decrement liquid assets
    UPDATE depots."Depots"
    SET liquid_assets = liquid_assets - total_cost
    WHERE id = p_depot_id;

    -- Insert or update DepotPositions
    INSERT INTO depots."DepotPositions" (depot_id, stock_id, expenses, date, amount)
    VALUES (
        p_depot_id,
        p_stock_id,
        total_cost,
        closest_price_timestamp,
        p_amount
    ) 
    ON CONFLICT (depot_id, stock_id) DO UPDATE
    SET 
        amount = depots."DepotPositions".amount + EXCLUDED.amount, 
        expenses = depots."DepotPositions".expenses + total_cost;
    
    PERFORM log_transaction(p_timestamp, p_stock_id, p_depot_id, p_amount, closest_price);
     /* PERFORM update_depot_values_s(current_date, p_depot_id); */
END;
$$;


ALTER FUNCTION public.buy_stock(p_timestamp date, p_depot_id bigint, p_stock_id bigint, p_amount integer) OWNER TO postgres;

--
-- Name: get_depot_positions(integer, integer); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.get_depot_positions(depot_id_param integer, price_count_param integer) RETURNS TABLE(id bigint, date date, depot_id bigint, stockid bigint, expenses real, profit real, amount integer, symbol text, name text, description text, type public."StockType", "timestamp" date, open real, close real, high real, low real, volume bigint, price_id bigint, rn bigint)
    LANGUAGE plpgsql
    AS $$
BEGIN
    RETURN QUERY
    WITH accessible_depots AS (
        SELECT DISTINCT dp.depot_id
        FROM depots."DepotPositions" dp
        WHERE dp.depot_id = depot_id_param
    ),
    filtered_positions AS (
        SELECT dp.*
        FROM depots."DepotPositions" dp
        INNER JOIN accessible_depots ad ON dp.depot_id = ad.depot_id
    ),
    relevant_stocks AS (
        SELECT DISTINCT stock_id
        FROM filtered_positions
    ),
    latest_prices AS (
        SELECT sp.*,
               ROW_NUMBER() OVER (
                   PARTITION BY sp.stock_id 
                   ORDER BY sp."timestamp" DESC
               ) AS rn
        FROM "StockPrices" sp
        INNER JOIN relevant_stocks rs ON sp.stock_id = rs.stock_id
    )
    SELECT 
        dp.id, dp.date, dp.depot_id, dp.stock_id, 
        dp.expenses, dp.profit, dp.amount,
        si.symbol, si.name, si.description, si."type",
        sp."timestamp", sp.open, sp.close, sp.high, 
        sp.low, sp.volume, sp.price_id, sp.rn
    FROM filtered_positions dp
    LEFT JOIN "StockInfo" si ON dp.stock_id = si.id
    LEFT JOIN latest_prices sp ON dp.stock_id = sp.stock_id 
    WHERE (sp.rn IS NULL OR sp.rn <= price_count_param);
END;
$$;


ALTER FUNCTION public.get_depot_positions(depot_id_param integer, price_count_param integer) OWNER TO postgres;

--
-- Name: get_depot_values(bigint, date, date); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.get_depot_values(p_depot_id bigint, p_interval_start date, p_interval_end date) RETURNS TABLE("timestamp" date, liquid_assets integer, stock_assets integer)
    LANGUAGE plpgsql
    AS $$
BEGIN
    RETURN QUERY
    SELECT
        dv.timestamp,
        dv.liquid_assets,
        dv.stock_assets
    FROM depots."DepotValues" as dv
    WHERE dv.depot_id = p_depot_id
      AND dv.timestamp BETWEEN p_interval_start AND p_interval_end
    ORDER BY dv.timestamp;
END;
$$;


ALTER FUNCTION public.get_depot_values(p_depot_id bigint, p_interval_start date, p_interval_end date) OWNER TO postgres;

--
-- Name: get_depots_of_user(uuid); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.get_depots_of_user(user_id uuid) RETURNS TABLE(id bigint, created_at date, liquid_assets integer, name text)
    LANGUAGE plpgsql
    AS $$
BEGIN
    RETURN QUERY
    SELECT
        dp.id,
        dp.created_at,
        dp.liquid_assets,
        dp.name
    FROM depots."Depots" as dp
    WHERE dp.user_id = get_depots_of_user.user_id
    ORDER BY dp.name;
END;
$$;


ALTER FUNCTION public.get_depots_of_user(user_id uuid) OWNER TO postgres;

--
-- Name: get_last_stock_prices(bigint, integer); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.get_last_stock_prices(p_stock_id bigint, limit_arg integer) RETURNS TABLE("timestamp" date, open real, close real, high real, low real, volume bigint)
    LANGUAGE plpgsql
    AS $$
BEGIN
    RETURN QUERY
    SELECT
        sp.timestamp,
        sp.open,
        sp.close,
        sp.high,
        sp.low,
        sp.volume
    FROM "StockPrices" sp
    JOIN "StockInfo" si ON sp.stock_id = si.id
    WHERE sp.stock_id = p_stock_id
    ORDER BY "timestamp" DESC
    LIMIT limit_arg;
END;
$$;


ALTER FUNCTION public.get_last_stock_prices(p_stock_id bigint, limit_arg integer) OWNER TO postgres;

--
-- Name: get_stock_info_by_id(bigint); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.get_stock_info_by_id(p_stock_id bigint) RETURNS TABLE(id bigint, symbol text, name text, description text, type public."StockType")
    LANGUAGE plpgsql
    AS $$
BEGIN
    RETURN QUERY
    SELECT 
        si.id,
        si.symbol,
        si.name,
        si.description,
        si.type
    FROM "StockInfo" si
    WHERE si.id = p_stock_id;
END;
$$;


ALTER FUNCTION public.get_stock_info_by_id(p_stock_id bigint) OWNER TO postgres;

--
-- Name: get_stock_position(bigint, bigint); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.get_stock_position(p_depot_id bigint, p_stock_id bigint) RETURNS TABLE(id bigint, date date, depot_id bigint, stock_id bigint, amount integer, expenses real, profit real)
    LANGUAGE plpgsql
    AS $$
BEGIN
    RETURN QUERY
    SELECT 
    dp."id",
    dp."date",
    dp.depot_id,
    dp.stock_id,
    dp.amount,
    dp.expenses,
    dp.profit
     from depots."DepotPositions" as dp where dp.depot_id = p_depot_id  AND dp.stock_id = p_stock_id;
END;
$$;


ALTER FUNCTION public.get_stock_position(p_depot_id bigint, p_stock_id bigint) OWNER TO postgres;

--
-- Name: get_stock_prices_by_interval(bigint, date, date); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.get_stock_prices_by_interval(p_stock_id bigint, p_interval_start date, p_interval_end date) RETURNS TABLE("timestamp" date, open real, close real, high real, low real, volume bigint)
    LANGUAGE plpgsql
    AS $$
BEGIN
    RETURN QUERY
    SELECT
        sp.timestamp,
        sp.open,
        sp.close,
        sp.high,
        sp.low,
        sp.volume
    FROM "StockPrices" sp
    JOIN "StockInfo" si ON sp.stock_id = si.id
    WHERE sp.stock_id = p_stock_id
      AND sp.timestamp BETWEEN p_interval_start AND p_interval_end
    ORDER BY sp.timestamp;
END;
$$;


ALTER FUNCTION public.get_stock_prices_by_interval(p_stock_id bigint, p_interval_start date, p_interval_end date) OWNER TO postgres;

--
-- Name: get_test_depot_positions(integer); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.get_test_depot_positions(depot_id_param integer) RETURNS TABLE(id bigint, date date, depot_id bigint, stock_id bigint, price integer, amount integer, symbol text, name text, description text, "timestamp" date, open real, close real, high real, low real, volume bigint, price_id bigint)
    LANGUAGE plpgsql
    AS $$
BEGIN
    RETURN QUERY
    WITH StockPricesLast30Days AS (
        SELECT sp.*
        FROM depots."DepotPositions" AS dp
        CROSS JOIN LATERAL get_stock_prices_by_interval(
            dp.stock_id, 
            CURRENT_DATE - INTERVAL '30 days', 
            CURRENT_DATE
        ) AS sp
        WHERE dp.depot_id = depot_id_param
    )
    SELECT dp.id, dp.date, dp.depot_id, dp.stock_id, dp.price, dp.amount,
           si.symbol, si.name, si.description,
           sp."timestamp", sp.open, sp.close, sp.high, sp.low, sp.volume, sp.price_id
    FROM depots."DepotPositions" AS dp
    LEFT JOIN "StockInfo" AS si
    ON dp.stock_id = si.id
    LEFT JOIN StockPricesLast30Days AS sp
    ON dp.stock_id = sp.stock_id
    WHERE dp.depot_id = depot_id_param;
END;
$$;


ALTER FUNCTION public.get_test_depot_positions(depot_id_param integer) OWNER TO postgres;

--
-- Name: handle_new_user(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.handle_new_user() RETURNS trigger
    LANGUAGE plpgsql SECURITY DEFINER
    SET search_path TO ''
    AS $$
BEGIN
  INSERT INTO depots."Depots" (created_at, liquid_assets, user_id, name)
  VALUES (current_date, 50000, NEW.id, NEW.raw_user_meta_data ->> 'name');
  
  INSERT INTO public.profiles (id, name)
  VALUES (NEW.id, NEW.raw_user_meta_data ->> 'name');
  
  RETURN NEW;
END;
$$;


ALTER FUNCTION public.handle_new_user() OWNER TO postgres;

--
-- Name: log_transaction(date, bigint, bigint, integer, double precision); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.log_transaction(p_timestamp date, p_stock_id bigint, p_depot_id bigint, p_amount integer, p_price double precision) RETURNS void
    LANGUAGE plpgsql
    AS $$
BEGIN    
    -- Insert or update depots."DepotValues" for a specific depot with computed values
    insert into depots."Transactions" ("timestamp", stock_id, depot_id, amount, price)
    values (p_timestamp, p_stock_id, p_depot_id, p_amount, p_price)
    ON CONFLICT (depot_id, stock_id, timestamp) DO UPDATE
    SET 
        amount = depots."Transactions".amount + EXCLUDED.amount;
END;
$$;


ALTER FUNCTION public.log_transaction(p_timestamp date, p_stock_id bigint, p_depot_id bigint, p_amount integer, p_price double precision) OWNER TO postgres;

--
-- Name: paginate_stock_symbols(integer, integer); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.paginate_stock_symbols(chunk_size integer, chunk_number integer) RETURNS TABLE(id bigint, symbol text)
    LANGUAGE plpgsql
    AS $$
DECLARE
    total_rows BIGINT;
    effective_offset BIGINT;
BEGIN
    -- Get the total number of rows in the table
    SELECT COUNT(*) INTO total_rows FROM "StockInfo";

    -- Calculate the effective offset
    effective_offset := (chunk_number) * chunk_size;

    -- If the offset is greater than the total rows, return no rows
    IF effective_offset >= total_rows THEN
        RETURN;
    END IF;

    -- Otherwise, perform the paginated query
    RETURN QUERY
    SELECT si.id, si.symbol
    FROM "StockInfo" si
    ORDER BY si.id
    LIMIT chunk_size 
    OFFSET effective_offset;
END;
$$;


ALTER FUNCTION public.paginate_stock_symbols(chunk_size integer, chunk_number integer) OWNER TO postgres;

--
-- Name: search_stock_info(text); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.search_stock_info(search_query text) RETURNS TABLE(id bigint, name text, symbol text, description text)
    LANGUAGE plpgsql
    AS $$
BEGIN
    RETURN QUERY
    SELECT si.id AS id, 
           si.name AS name, 
           si.symbol AS symbol, 
           si.description AS description
    FROM "StockInfo" si
    WHERE 
        to_tsvector('english', si.symbol || ' ' || si.name || ' ' || si.description) @@ plainto_tsquery('english', search_query)
        OR si.symbol ILIKE '%' || search_query || '%' 
        OR si.name ILIKE '%' || search_query || '%' 
        OR si.description ILIKE '%' || search_query || '%'
    ORDER BY 
        -- Prioritize exact matches where the search string appears at the front
        CASE 
            WHEN si.symbol ILIKE search_query || '%' THEN 3
            WHEN si.name ILIKE search_query || '%' THEN 3
            WHEN si.description ILIKE search_query || '%' THEN 3
            WHEN si.symbol ILIKE '%' || search_query || '%' THEN 2
            WHEN si.name ILIKE '%' || search_query || '%' THEN 2
            WHEN si.description ILIKE '%' || search_query || '%' THEN 2
            ELSE 1
        END DESC,
        -- Within the ranks, sort by Full-Text Search relevance
        ts_rank_cd(to_tsvector('english', si.symbol || ' ' || si.name || ' ' || si.description), plainto_tsquery('english', search_query)) DESC;
END;
$$;


ALTER FUNCTION public.search_stock_info(search_query text) OWNER TO postgres;

--
-- Name: search_stock_info(text, integer); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.search_stock_info(search_query text, limit_arg integer) RETURNS TABLE(id bigint, name text, symbol text, description text)
    LANGUAGE plpgsql
    AS $$
BEGIN
    RETURN QUERY
    SELECT si.id AS id, 
           si.name AS name, 
           si.symbol AS symbol, 
           si.description AS description
    FROM "StockInfo" si
    WHERE 
        to_tsvector('english', si.symbol || ' ' || si.name || ' ' || si.description) @@ plainto_tsquery('english', search_query)
        OR si.symbol ILIKE '%' || search_query || '%' 
        OR si.name ILIKE '%' || search_query || '%' 
        OR si.description ILIKE '%' || search_query || '%'
    ORDER BY 
        -- Prioritize exact matches where the search string appears at the front
        CASE 
            WHEN si.symbol ILIKE search_query || '%' THEN 3
            WHEN si.name ILIKE search_query || '%' THEN 3
            WHEN si.description ILIKE search_query || '%' THEN 3
            WHEN si.symbol ILIKE '%' || search_query || '%' THEN 2
            WHEN si.name ILIKE '%' || search_query || '%' THEN 2
            WHEN si.description ILIKE '%' || search_query || '%' THEN 2
            ELSE 1
        END DESC,
        -- Within the ranks, sort by Full-Text Search relevance
        ts_rank_cd(to_tsvector('english', si.symbol || ' ' || si.name || ' ' || si.description), plainto_tsquery('english', search_query)) DESC
        LIMIT limit_arg;
END;
$$;


ALTER FUNCTION public.search_stock_info(search_query text, limit_arg integer) OWNER TO postgres;

--
-- Name: search_stock_with_values(text); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.search_stock_with_values(search_query text) RETURNS TABLE(id bigint, name text, symbol text, description text, "timestamp" date, open real, close real, high real, low real, volume bigint)
    LANGUAGE plpgsql
    AS $$
BEGIN
    RETURN QUERY
    SELECT si."id", si.name, si.symbol, si.description, sp.timestamp, sp.open, sp.close, sp.high, sp.low, sp.volume
    FROM search_stock_info(search_query) si
    LEFT JOIN LATERAL (
        SELECT sp.timestamp, sp.open, sp.close, sp.high, sp.low, sp.volume
        FROM "StockPrices" sp
        WHERE sp.stock_id = si."id"
        ORDER BY sp.timestamp DESC
        LIMIT 1
    ) sp ON true;
END;
$$;


ALTER FUNCTION public.search_stock_with_values(search_query text) OWNER TO postgres;

--
-- Name: sell_stock(date, bigint, bigint, integer); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.sell_stock(p_timestamp date, p_depot_id bigint, p_stock_id bigint, p_amount integer) RETURNS void
    LANGUAGE plpgsql
    AS $$
DECLARE
    closest_price real;
    closest_price_timestamp DATE;
    total_earnings real;
    current_stock_amount INT;
BEGIN
    -- Find the price closest to the provided timestamp but not in the future
    SELECT sp.close, sp."timestamp"
    INTO closest_price, closest_price_timestamp
    FROM "StockPrices" AS sp
    WHERE sp.stock_id = p_stock_id
      AND sp."timestamp" <= p_timestamp
    ORDER BY sp."timestamp" DESC
    LIMIT 1;

    -- Calculate the total earnings
    total_earnings := closest_price * p_amount;

    -- Check if the depot has enough stock to sell
    SELECT dp.amount INTO current_stock_amount
    FROM depots."DepotPositions" AS dp
    WHERE dp.depot_id = p_depot_id
      AND dp.stock_id = p_stock_id;

    IF current_stock_amount IS NULL OR current_stock_amount < p_amount THEN
        RAISE EXCEPTION 'Insufficient stock in depot % to sell', p_depot_id;
    END IF;

    -- Increase liquid assets
    UPDATE depots."Depots"
    SET liquid_assets = liquid_assets + total_earnings
    WHERE id = p_depot_id;

    UPDATE depots."DepotPositions"
    SET profit = profit + total_earnings
    WHERE depot_id = p_depot_id
      AND stock_id = p_stock_id;

    -- Decrease stock amount or delete if all is sold
    IF current_stock_amount = p_amount THEN
        DELETE FROM depots."DepotPositions"
        WHERE depot_id = p_depot_id
          AND stock_id = p_stock_id;
    ELSE
        UPDATE depots."DepotPositions"
        SET amount = amount - p_amount
        WHERE depot_id = p_depot_id
          AND stock_id = p_stock_id;
    END IF;

    PERFORM log_transaction(p_timestamp, p_stock_id, p_depot_id, -p_amount, closest_price);

    /* PERFORM update_depot_values_s(current_date, p_depot_id); */
END;
$$;


ALTER FUNCTION public.sell_stock(p_timestamp date, p_depot_id bigint, p_stock_id bigint, p_amount integer) OWNER TO postgres;

--
-- Name: update_depot_values(date); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.update_depot_values(p_timestamp date) RETURNS void
    LANGUAGE plpgsql
    AS $$
BEGIN    
    -- Insert or update depots."DepotValues" with computed values
    INSERT INTO depots."DepotValues" (timestamp, liquid_assets, stock_assets, depot_id)
    SELECT 
        p_timestamp AS timestamp,
        d.liquid_assets AS liquid_assets,
        COALESCE(SUM(sp.close * dp.amount), 0) AS stock_assets,
        d.id AS depot_id
    FROM 
        depots."Depots" d
    LEFT JOIN 
        depots."DepotPositions" dp ON d.id = dp.depot_id
    LEFT JOIN LATERAL (
        SELECT 
            sp.close, sp.stock_id
        FROM 
            "StockPrices" sp
        WHERE 
            sp.stock_id = dp.stock_id AND sp.timestamp <= p_timestamp
        ORDER BY 
            sp.timestamp DESC
        LIMIT 1
    ) sp ON dp.stock_id = sp.stock_id
    GROUP BY 
        d.id, d.liquid_assets
    ON CONFLICT (depot_id, timestamp) 
    DO UPDATE 
    SET 
        liquid_assets = EXCLUDED.liquid_assets,
        stock_assets = EXCLUDED.stock_assets;
END;
$$;


ALTER FUNCTION public.update_depot_values(p_timestamp date) OWNER TO postgres;

--
-- Name: update_depot_values_s(date, bigint); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.update_depot_values_s(p_timestamp date, p_depot_id bigint) RETURNS void
    LANGUAGE plpgsql
    AS $$
BEGIN    
    -- Insert or update depots."DepotValues" for a specific depot with computed values
    INSERT INTO depots."DepotValues" (timestamp, liquid_assets, stock_assets, depot_id)
    SELECT 
        p_timestamp AS timestamp,
        d.liquid_assets AS liquid_assets,
        COALESCE(SUM(sp.close * dp.amount), 0) AS stock_assets,
        d.id AS depot_id
    FROM 
        depots."Depots" d
    LEFT JOIN 
        depots."DepotPositions" dp ON d.id = dp.depot_id
    LEFT JOIN LATERAL (
        SELECT 
            sp.close, sp.stock_id
        FROM 
            "StockPrices" sp
        WHERE 
            sp.stock_id = dp.stock_id AND sp.timestamp <= p_timestamp
        ORDER BY 
            sp.timestamp DESC
        LIMIT 1
    ) sp ON dp.stock_id = sp.stock_id
    WHERE 
        d.id = p_depot_id
    GROUP BY 
        d.id, d.liquid_assets
    ON CONFLICT (depot_id, timestamp) 
    DO UPDATE 
    SET 
        liquid_assets = EXCLUDED.liquid_assets,
        stock_assets = EXCLUDED.stock_assets;
END;
$$;


ALTER FUNCTION public.update_depot_values_s(p_timestamp date, p_depot_id bigint) OWNER TO postgres;

--
-- Name: upsert_stock_prices(bigint, date, real, real, real, real, bigint); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.upsert_stock_prices(p_stock_id bigint, p_timestamp date, p_open real, p_close real, p_high real, p_low real, p_volume bigint) RETURNS void
    LANGUAGE plpgsql
    AS $$
BEGIN
    INSERT INTO "StockPrices" (stock_id, timestamp, open, close, high, low, volume)
    VALUES (p_stock_id, p_timestamp, p_open, p_close, p_high, p_low, p_volume)
    ON CONFLICT (timestamp, stock_id)  -- Conflict on composite key
    DO UPDATE SET
        volume = CASE
                    WHEN "StockPrices".volume < EXCLUDED.volume THEN EXCLUDED.volume
                    ELSE "StockPrices".volume
                 END,
        open = EXCLUDED.open,
        close = EXCLUDED.close,
        high = EXCLUDED.high,
        low = EXCLUDED.low;
END;
$$;


ALTER FUNCTION public.upsert_stock_prices(p_stock_id bigint, p_timestamp date, p_open real, p_close real, p_high real, p_low real, p_volume bigint) OWNER TO postgres;

--
-- Name: upsert_stock_prices_bulk(jsonb); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.upsert_stock_prices_bulk(p_data jsonb) RETURNS void
    LANGUAGE plpgsql
    AS $$
BEGIN
    INSERT INTO "StockPrices" (stock_id, timestamp, open, close, high, low, volume)
    SELECT
        (item->>'stock_id')::BIGINT,
        (item->>'timestamp')::DATE,
        (item->>'open')::REAL,
        (item->>'close')::REAL,
        (item->>'high')::REAL,
        (item->>'low')::REAL,
        (item->>'volume')::BIGINT
    FROM jsonb_array_elements(p_data) AS item
    ON CONFLICT (timestamp, stock_id)  -- Conflict on composite key
    DO UPDATE SET
        volume = CASE
                    WHEN "StockPrices".volume < EXCLUDED.volume THEN EXCLUDED.volume
                    ELSE "StockPrices".volume
                 END,
        open = EXCLUDED.open,
        close = EXCLUDED.close,
        high = EXCLUDED.high,
        low = EXCLUDED.low;
END;
$$;


ALTER FUNCTION public.upsert_stock_prices_bulk(p_data jsonb) OWNER TO postgres;

--
-- Name: apply_rls(jsonb, integer); Type: FUNCTION; Schema: realtime; Owner: supabase_admin
--

CREATE FUNCTION realtime.apply_rls(wal jsonb, max_record_bytes integer DEFAULT (1024 * 1024)) RETURNS SETOF realtime.wal_rls
    LANGUAGE plpgsql
    AS $$
declare
-- Regclass of the table e.g. public.notes
entity_ regclass = (quote_ident(wal ->> 'schema') || '.' || quote_ident(wal ->> 'table'))::regclass;

-- I, U, D, T: insert, update ...
action realtime.action = (
    case wal ->> 'action'
        when 'I' then 'INSERT'
        when 'U' then 'UPDATE'
        when 'D' then 'DELETE'
        else 'ERROR'
    end
);

-- Is row level security enabled for the table
is_rls_enabled bool = relrowsecurity from pg_class where oid = entity_;

subscriptions realtime.subscription[] = array_agg(subs)
    from
        realtime.subscription subs
    where
        subs.entity = entity_;

-- Subscription vars
roles regrole[] = array_agg(distinct us.claims_role::text)
    from
        unnest(subscriptions) us;

working_role regrole;
claimed_role regrole;
claims jsonb;

subscription_id uuid;
subscription_has_access bool;
visible_to_subscription_ids uuid[] = '{}';

-- structured info for wal's columns
columns realtime.wal_column[];
-- previous identity values for update/delete
old_columns realtime.wal_column[];

error_record_exceeds_max_size boolean = octet_length(wal::text) > max_record_bytes;

-- Primary jsonb output for record
output jsonb;

begin
perform set_config('role', null, true);

columns =
    array_agg(
        (
            x->>'name',
            x->>'type',
            x->>'typeoid',
            realtime.cast(
                (x->'value') #>> '{}',
                coalesce(
                    (x->>'typeoid')::regtype, -- null when wal2json version <= 2.4
                    (x->>'type')::regtype
                )
            ),
            (pks ->> 'name') is not null,
            true
        )::realtime.wal_column
    )
    from
        jsonb_array_elements(wal -> 'columns') x
        left join jsonb_array_elements(wal -> 'pk') pks
            on (x ->> 'name') = (pks ->> 'name');

old_columns =
    array_agg(
        (
            x->>'name',
            x->>'type',
            x->>'typeoid',
            realtime.cast(
                (x->'value') #>> '{}',
                coalesce(
                    (x->>'typeoid')::regtype, -- null when wal2json version <= 2.4
                    (x->>'type')::regtype
                )
            ),
            (pks ->> 'name') is not null,
            true
        )::realtime.wal_column
    )
    from
        jsonb_array_elements(wal -> 'identity') x
        left join jsonb_array_elements(wal -> 'pk') pks
            on (x ->> 'name') = (pks ->> 'name');

for working_role in select * from unnest(roles) loop

    -- Update `is_selectable` for columns and old_columns
    columns =
        array_agg(
            (
                c.name,
                c.type_name,
                c.type_oid,
                c.value,
                c.is_pkey,
                pg_catalog.has_column_privilege(working_role, entity_, c.name, 'SELECT')
            )::realtime.wal_column
        )
        from
            unnest(columns) c;

    old_columns =
            array_agg(
                (
                    c.name,
                    c.type_name,
                    c.type_oid,
                    c.value,
                    c.is_pkey,
                    pg_catalog.has_column_privilege(working_role, entity_, c.name, 'SELECT')
                )::realtime.wal_column
            )
            from
                unnest(old_columns) c;

    if action <> 'DELETE' and count(1) = 0 from unnest(columns) c where c.is_pkey then
        return next (
            jsonb_build_object(
                'schema', wal ->> 'schema',
                'table', wal ->> 'table',
                'type', action
            ),
            is_rls_enabled,
            -- subscriptions is already filtered by entity
            (select array_agg(s.subscription_id) from unnest(subscriptions) as s where claims_role = working_role),
            array['Error 400: Bad Request, no primary key']
        )::realtime.wal_rls;

    -- The claims role does not have SELECT permission to the primary key of entity
    elsif action <> 'DELETE' and sum(c.is_selectable::int) <> count(1) from unnest(columns) c where c.is_pkey then
        return next (
            jsonb_build_object(
                'schema', wal ->> 'schema',
                'table', wal ->> 'table',
                'type', action
            ),
            is_rls_enabled,
            (select array_agg(s.subscription_id) from unnest(subscriptions) as s where claims_role = working_role),
            array['Error 401: Unauthorized']
        )::realtime.wal_rls;

    else
        output = jsonb_build_object(
            'schema', wal ->> 'schema',
            'table', wal ->> 'table',
            'type', action,
            'commit_timestamp', to_char(
                ((wal ->> 'timestamp')::timestamptz at time zone 'utc'),
                'YYYY-MM-DD"T"HH24:MI:SS.MS"Z"'
            ),
            'columns', (
                select
                    jsonb_agg(
                        jsonb_build_object(
                            'name', pa.attname,
                            'type', pt.typname
                        )
                        order by pa.attnum asc
                    )
                from
                    pg_attribute pa
                    join pg_type pt
                        on pa.atttypid = pt.oid
                where
                    attrelid = entity_
                    and attnum > 0
                    and pg_catalog.has_column_privilege(working_role, entity_, pa.attname, 'SELECT')
            )
        )
        -- Add "record" key for insert and update
        || case
            when action in ('INSERT', 'UPDATE') then
                jsonb_build_object(
                    'record',
                    (
                        select
                            jsonb_object_agg(
                                -- if unchanged toast, get column name and value from old record
                                coalesce((c).name, (oc).name),
                                case
                                    when (c).name is null then (oc).value
                                    else (c).value
                                end
                            )
                        from
                            unnest(columns) c
                            full outer join unnest(old_columns) oc
                                on (c).name = (oc).name
                        where
                            coalesce((c).is_selectable, (oc).is_selectable)
                            and ( not error_record_exceeds_max_size or (octet_length((c).value::text) <= 64))
                    )
                )
            else '{}'::jsonb
        end
        -- Add "old_record" key for update and delete
        || case
            when action = 'UPDATE' then
                jsonb_build_object(
                        'old_record',
                        (
                            select jsonb_object_agg((c).name, (c).value)
                            from unnest(old_columns) c
                            where
                                (c).is_selectable
                                and ( not error_record_exceeds_max_size or (octet_length((c).value::text) <= 64))
                        )
                    )
            when action = 'DELETE' then
                jsonb_build_object(
                    'old_record',
                    (
                        select jsonb_object_agg((c).name, (c).value)
                        from unnest(old_columns) c
                        where
                            (c).is_selectable
                            and ( not error_record_exceeds_max_size or (octet_length((c).value::text) <= 64))
                            and ( not is_rls_enabled or (c).is_pkey ) -- if RLS enabled, we can't secure deletes so filter to pkey
                    )
                )
            else '{}'::jsonb
        end;

        -- Create the prepared statement
        if is_rls_enabled and action <> 'DELETE' then
            if (select 1 from pg_prepared_statements where name = 'walrus_rls_stmt' limit 1) > 0 then
                deallocate walrus_rls_stmt;
            end if;
            execute realtime.build_prepared_statement_sql('walrus_rls_stmt', entity_, columns);
        end if;

        visible_to_subscription_ids = '{}';

        for subscription_id, claims in (
                select
                    subs.subscription_id,
                    subs.claims
                from
                    unnest(subscriptions) subs
                where
                    subs.entity = entity_
                    and subs.claims_role = working_role
                    and (
                        realtime.is_visible_through_filters(columns, subs.filters)
                        or (
                          action = 'DELETE'
                          and realtime.is_visible_through_filters(old_columns, subs.filters)
                        )
                    )
        ) loop

            if not is_rls_enabled or action = 'DELETE' then
                visible_to_subscription_ids = visible_to_subscription_ids || subscription_id;
            else
                -- Check if RLS allows the role to see the record
                perform
                    -- Trim leading and trailing quotes from working_role because set_config
                    -- doesn't recognize the role as valid if they are included
                    set_config('role', trim(both '"' from working_role::text), true),
                    set_config('request.jwt.claims', claims::text, true);

                execute 'execute walrus_rls_stmt' into subscription_has_access;

                if subscription_has_access then
                    visible_to_subscription_ids = visible_to_subscription_ids || subscription_id;
                end if;
            end if;
        end loop;

        perform set_config('role', null, true);

        return next (
            output,
            is_rls_enabled,
            visible_to_subscription_ids,
            case
                when error_record_exceeds_max_size then array['Error 413: Payload Too Large']
                else '{}'
            end
        )::realtime.wal_rls;

    end if;
end loop;

perform set_config('role', null, true);
end;
$$;


ALTER FUNCTION realtime.apply_rls(wal jsonb, max_record_bytes integer) OWNER TO supabase_admin;

--
-- Name: broadcast_changes(text, text, text, text, text, record, record, text); Type: FUNCTION; Schema: realtime; Owner: supabase_admin
--

CREATE FUNCTION realtime.broadcast_changes(topic_name text, event_name text, operation text, table_name text, table_schema text, new record, old record, level text DEFAULT 'ROW'::text) RETURNS void
    LANGUAGE plpgsql
    AS $$
DECLARE
    -- Declare a variable to hold the JSONB representation of the row
    row_data jsonb := '{}'::jsonb;
BEGIN
    IF level = 'STATEMENT' THEN
        RAISE EXCEPTION 'function can only be triggered for each row, not for each statement';
    END IF;
    -- Check the operation type and handle accordingly
    IF operation = 'INSERT' OR operation = 'UPDATE' OR operation = 'DELETE' THEN
        row_data := jsonb_build_object('old_record', OLD, 'record', NEW, 'operation', operation, 'table', table_name, 'schema', table_schema);
        PERFORM realtime.send (row_data, event_name, topic_name);
    ELSE
        RAISE EXCEPTION 'Unexpected operation type: %', operation;
    END IF;
EXCEPTION
    WHEN OTHERS THEN
        RAISE EXCEPTION 'Failed to process the row: %', SQLERRM;
END;

$$;


ALTER FUNCTION realtime.broadcast_changes(topic_name text, event_name text, operation text, table_name text, table_schema text, new record, old record, level text) OWNER TO supabase_admin;

--
-- Name: build_prepared_statement_sql(text, regclass, realtime.wal_column[]); Type: FUNCTION; Schema: realtime; Owner: supabase_admin
--

CREATE FUNCTION realtime.build_prepared_statement_sql(prepared_statement_name text, entity regclass, columns realtime.wal_column[]) RETURNS text
    LANGUAGE sql
    AS $$
      /*
      Builds a sql string that, if executed, creates a prepared statement to
      tests retrive a row from *entity* by its primary key columns.
      Example
          select realtime.build_prepared_statement_sql('public.notes', '{"id"}'::text[], '{"bigint"}'::text[])
      */
          select
      'prepare ' || prepared_statement_name || ' as
          select
              exists(
                  select
                      1
                  from
                      ' || entity || '
                  where
                      ' || string_agg(quote_ident(pkc.name) || '=' || quote_nullable(pkc.value #>> '{}') , ' and ') || '
              )'
          from
              unnest(columns) pkc
          where
              pkc.is_pkey
          group by
              entity
      $$;


ALTER FUNCTION realtime.build_prepared_statement_sql(prepared_statement_name text, entity regclass, columns realtime.wal_column[]) OWNER TO supabase_admin;

--
-- Name: cast(text, regtype); Type: FUNCTION; Schema: realtime; Owner: supabase_admin
--

CREATE FUNCTION realtime."cast"(val text, type_ regtype) RETURNS jsonb
    LANGUAGE plpgsql IMMUTABLE
    AS $$
    declare
      res jsonb;
    begin
      execute format('select to_jsonb(%L::'|| type_::text || ')', val)  into res;
      return res;
    end
    $$;


ALTER FUNCTION realtime."cast"(val text, type_ regtype) OWNER TO supabase_admin;

--
-- Name: check_equality_op(realtime.equality_op, regtype, text, text); Type: FUNCTION; Schema: realtime; Owner: supabase_admin
--

CREATE FUNCTION realtime.check_equality_op(op realtime.equality_op, type_ regtype, val_1 text, val_2 text) RETURNS boolean
    LANGUAGE plpgsql IMMUTABLE
    AS $$
      /*
      Casts *val_1* and *val_2* as type *type_* and check the *op* condition for truthiness
      */
      declare
          op_symbol text = (
              case
                  when op = 'eq' then '='
                  when op = 'neq' then '!='
                  when op = 'lt' then '<'
                  when op = 'lte' then '<='
                  when op = 'gt' then '>'
                  when op = 'gte' then '>='
                  when op = 'in' then '= any'
                  else 'UNKNOWN OP'
              end
          );
          res boolean;
      begin
          execute format(
              'select %L::'|| type_::text || ' ' || op_symbol
              || ' ( %L::'
              || (
                  case
                      when op = 'in' then type_::text || '[]'
                      else type_::text end
              )
              || ')', val_1, val_2) into res;
          return res;
      end;
      $$;


ALTER FUNCTION realtime.check_equality_op(op realtime.equality_op, type_ regtype, val_1 text, val_2 text) OWNER TO supabase_admin;

--
-- Name: is_visible_through_filters(realtime.wal_column[], realtime.user_defined_filter[]); Type: FUNCTION; Schema: realtime; Owner: supabase_admin
--

CREATE FUNCTION realtime.is_visible_through_filters(columns realtime.wal_column[], filters realtime.user_defined_filter[]) RETURNS boolean
    LANGUAGE sql IMMUTABLE
    AS $_$
    /*
    Should the record be visible (true) or filtered out (false) after *filters* are applied
    */
        select
            -- Default to allowed when no filters present
            $2 is null -- no filters. this should not happen because subscriptions has a default
            or array_length($2, 1) is null -- array length of an empty array is null
            or bool_and(
                coalesce(
                    realtime.check_equality_op(
                        op:=f.op,
                        type_:=coalesce(
                            col.type_oid::regtype, -- null when wal2json version <= 2.4
                            col.type_name::regtype
                        ),
                        -- cast jsonb to text
                        val_1:=col.value #>> '{}',
                        val_2:=f.value
                    ),
                    false -- if null, filter does not match
                )
            )
        from
            unnest(filters) f
            join unnest(columns) col
                on f.column_name = col.name;
    $_$;


ALTER FUNCTION realtime.is_visible_through_filters(columns realtime.wal_column[], filters realtime.user_defined_filter[]) OWNER TO supabase_admin;

--
-- Name: list_changes(name, name, integer, integer); Type: FUNCTION; Schema: realtime; Owner: supabase_admin
--

CREATE FUNCTION realtime.list_changes(publication name, slot_name name, max_changes integer, max_record_bytes integer) RETURNS SETOF realtime.wal_rls
    LANGUAGE sql
    SET log_min_messages TO 'fatal'
    AS $$
      with pub as (
        select
          concat_ws(
            ',',
            case when bool_or(pubinsert) then 'insert' else null end,
            case when bool_or(pubupdate) then 'update' else null end,
            case when bool_or(pubdelete) then 'delete' else null end
          ) as w2j_actions,
          coalesce(
            string_agg(
              realtime.quote_wal2json(format('%I.%I', schemaname, tablename)::regclass),
              ','
            ) filter (where ppt.tablename is not null and ppt.tablename not like '% %'),
            ''
          ) w2j_add_tables
        from
          pg_publication pp
          left join pg_publication_tables ppt
            on pp.pubname = ppt.pubname
        where
          pp.pubname = publication
        group by
          pp.pubname
        limit 1
      ),
      w2j as (
        select
          x.*, pub.w2j_add_tables
        from
          pub,
          pg_logical_slot_get_changes(
            slot_name, null, max_changes,
            'include-pk', 'true',
            'include-transaction', 'false',
            'include-timestamp', 'true',
            'include-type-oids', 'true',
            'format-version', '2',
            'actions', pub.w2j_actions,
            'add-tables', pub.w2j_add_tables
          ) x
      )
      select
        xyz.wal,
        xyz.is_rls_enabled,
        xyz.subscription_ids,
        xyz.errors
      from
        w2j,
        realtime.apply_rls(
          wal := w2j.data::jsonb,
          max_record_bytes := max_record_bytes
        ) xyz(wal, is_rls_enabled, subscription_ids, errors)
      where
        w2j.w2j_add_tables <> ''
        and xyz.subscription_ids[1] is not null
    $$;


ALTER FUNCTION realtime.list_changes(publication name, slot_name name, max_changes integer, max_record_bytes integer) OWNER TO supabase_admin;

--
-- Name: quote_wal2json(regclass); Type: FUNCTION; Schema: realtime; Owner: supabase_admin
--

CREATE FUNCTION realtime.quote_wal2json(entity regclass) RETURNS text
    LANGUAGE sql IMMUTABLE STRICT
    AS $$
      select
        (
          select string_agg('' || ch,'')
          from unnest(string_to_array(nsp.nspname::text, null)) with ordinality x(ch, idx)
          where
            not (x.idx = 1 and x.ch = '"')
            and not (
              x.idx = array_length(string_to_array(nsp.nspname::text, null), 1)
              and x.ch = '"'
            )
        )
        || '.'
        || (
          select string_agg('' || ch,'')
          from unnest(string_to_array(pc.relname::text, null)) with ordinality x(ch, idx)
          where
            not (x.idx = 1 and x.ch = '"')
            and not (
              x.idx = array_length(string_to_array(nsp.nspname::text, null), 1)
              and x.ch = '"'
            )
          )
      from
        pg_class pc
        join pg_namespace nsp
          on pc.relnamespace = nsp.oid
      where
        pc.oid = entity
    $$;


ALTER FUNCTION realtime.quote_wal2json(entity regclass) OWNER TO supabase_admin;

--
-- Name: send(jsonb, text, text, boolean); Type: FUNCTION; Schema: realtime; Owner: supabase_admin
--

CREATE FUNCTION realtime.send(payload jsonb, event text, topic text, private boolean DEFAULT true) RETURNS void
    LANGUAGE plpgsql
    AS $$
BEGIN
  BEGIN
    -- Set the topic configuration
    EXECUTE format('SET LOCAL realtime.topic TO %L', topic);

    -- Attempt to insert the message
    INSERT INTO realtime.messages (payload, event, topic, private, extension)
    VALUES (payload, event, topic, private, 'broadcast');
  EXCEPTION
    WHEN OTHERS THEN
      -- Capture and notify the error
      RAISE WARNING 'ErrorSendingBroadcastMessage: %', SQLERRM;
  END;
END;
$$;


ALTER FUNCTION realtime.send(payload jsonb, event text, topic text, private boolean) OWNER TO supabase_admin;

--
-- Name: subscription_check_filters(); Type: FUNCTION; Schema: realtime; Owner: supabase_admin
--

CREATE FUNCTION realtime.subscription_check_filters() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
    /*
    Validates that the user defined filters for a subscription:
    - refer to valid columns that the claimed role may access
    - values are coercable to the correct column type
    */
    declare
        col_names text[] = coalesce(
                array_agg(c.column_name order by c.ordinal_position),
                '{}'::text[]
            )
            from
                information_schema.columns c
            where
                format('%I.%I', c.table_schema, c.table_name)::regclass = new.entity
                and pg_catalog.has_column_privilege(
                    (new.claims ->> 'role'),
                    format('%I.%I', c.table_schema, c.table_name)::regclass,
                    c.column_name,
                    'SELECT'
                );
        filter realtime.user_defined_filter;
        col_type regtype;

        in_val jsonb;
    begin
        for filter in select * from unnest(new.filters) loop
            -- Filtered column is valid
            if not filter.column_name = any(col_names) then
                raise exception 'invalid column for filter %', filter.column_name;
            end if;

            -- Type is sanitized and safe for string interpolation
            col_type = (
                select atttypid::regtype
                from pg_catalog.pg_attribute
                where attrelid = new.entity
                      and attname = filter.column_name
            );
            if col_type is null then
                raise exception 'failed to lookup type for column %', filter.column_name;
            end if;

            -- Set maximum number of entries for in filter
            if filter.op = 'in'::realtime.equality_op then
                in_val = realtime.cast(filter.value, (col_type::text || '[]')::regtype);
                if coalesce(jsonb_array_length(in_val), 0) > 100 then
                    raise exception 'too many values for `in` filter. Maximum 100';
                end if;
            else
                -- raises an exception if value is not coercable to type
                perform realtime.cast(filter.value, col_type);
            end if;

        end loop;

        -- Apply consistent order to filters so the unique constraint on
        -- (subscription_id, entity, filters) can't be tricked by a different filter order
        new.filters = coalesce(
            array_agg(f order by f.column_name, f.op, f.value),
            '{}'
        ) from unnest(new.filters) f;

        return new;
    end;
    $$;


ALTER FUNCTION realtime.subscription_check_filters() OWNER TO supabase_admin;

--
-- Name: to_regrole(text); Type: FUNCTION; Schema: realtime; Owner: supabase_admin
--

CREATE FUNCTION realtime.to_regrole(role_name text) RETURNS regrole
    LANGUAGE sql IMMUTABLE
    AS $$ select role_name::regrole $$;


ALTER FUNCTION realtime.to_regrole(role_name text) OWNER TO supabase_admin;

--
-- Name: topic(); Type: FUNCTION; Schema: realtime; Owner: supabase_realtime_admin
--

CREATE FUNCTION realtime.topic() RETURNS text
    LANGUAGE sql STABLE
    AS $$
select nullif(current_setting('realtime.topic', true), '')::text;
$$;


ALTER FUNCTION realtime.topic() OWNER TO supabase_realtime_admin;

--
-- Name: can_insert_object(text, text, uuid, jsonb); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.can_insert_object(bucketid text, name text, owner uuid, metadata jsonb) RETURNS void
    LANGUAGE plpgsql
    AS $$
BEGIN
  INSERT INTO "storage"."objects" ("bucket_id", "name", "owner", "metadata") VALUES (bucketid, name, owner, metadata);
  -- hack to rollback the successful insert
  RAISE sqlstate 'PT200' using
  message = 'ROLLBACK',
  detail = 'rollback successful insert';
END
$$;


ALTER FUNCTION storage.can_insert_object(bucketid text, name text, owner uuid, metadata jsonb) OWNER TO supabase_storage_admin;

--
-- Name: extension(text); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.extension(name text) RETURNS text
    LANGUAGE plpgsql
    AS $$
DECLARE
_parts text[];
_filename text;
BEGIN
	select string_to_array(name, '/') into _parts;
	select _parts[array_length(_parts,1)] into _filename;
	-- @todo return the last part instead of 2
	return reverse(split_part(reverse(_filename), '.', 1));
END
$$;


ALTER FUNCTION storage.extension(name text) OWNER TO supabase_storage_admin;

--
-- Name: filename(text); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.filename(name text) RETURNS text
    LANGUAGE plpgsql
    AS $$
DECLARE
_parts text[];
BEGIN
	select string_to_array(name, '/') into _parts;
	return _parts[array_length(_parts,1)];
END
$$;


ALTER FUNCTION storage.filename(name text) OWNER TO supabase_storage_admin;

--
-- Name: foldername(text); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.foldername(name text) RETURNS text[]
    LANGUAGE plpgsql
    AS $$
DECLARE
_parts text[];
BEGIN
	select string_to_array(name, '/') into _parts;
	return _parts[1:array_length(_parts,1)-1];
END
$$;


ALTER FUNCTION storage.foldername(name text) OWNER TO supabase_storage_admin;

--
-- Name: get_size_by_bucket(); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.get_size_by_bucket() RETURNS TABLE(size bigint, bucket_id text)
    LANGUAGE plpgsql
    AS $$
BEGIN
    return query
        select sum((metadata->>'size')::int) as size, obj.bucket_id
        from "storage".objects as obj
        group by obj.bucket_id;
END
$$;


ALTER FUNCTION storage.get_size_by_bucket() OWNER TO supabase_storage_admin;

--
-- Name: list_multipart_uploads_with_delimiter(text, text, text, integer, text, text); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.list_multipart_uploads_with_delimiter(bucket_id text, prefix_param text, delimiter_param text, max_keys integer DEFAULT 100, next_key_token text DEFAULT ''::text, next_upload_token text DEFAULT ''::text) RETURNS TABLE(key text, id text, created_at timestamp with time zone)
    LANGUAGE plpgsql
    AS $_$
BEGIN
    RETURN QUERY EXECUTE
        'SELECT DISTINCT ON(key COLLATE "C") * from (
            SELECT
                CASE
                    WHEN position($2 IN substring(key from length($1) + 1)) > 0 THEN
                        substring(key from 1 for length($1) + position($2 IN substring(key from length($1) + 1)))
                    ELSE
                        key
                END AS key, id, created_at
            FROM
                storage.s3_multipart_uploads
            WHERE
                bucket_id = $5 AND
                key ILIKE $1 || ''%'' AND
                CASE
                    WHEN $4 != '''' AND $6 = '''' THEN
                        CASE
                            WHEN position($2 IN substring(key from length($1) + 1)) > 0 THEN
                                substring(key from 1 for length($1) + position($2 IN substring(key from length($1) + 1))) COLLATE "C" > $4
                            ELSE
                                key COLLATE "C" > $4
                            END
                    ELSE
                        true
                END AND
                CASE
                    WHEN $6 != '''' THEN
                        id COLLATE "C" > $6
                    ELSE
                        true
                    END
            ORDER BY
                key COLLATE "C" ASC, created_at ASC) as e order by key COLLATE "C" LIMIT $3'
        USING prefix_param, delimiter_param, max_keys, next_key_token, bucket_id, next_upload_token;
END;
$_$;


ALTER FUNCTION storage.list_multipart_uploads_with_delimiter(bucket_id text, prefix_param text, delimiter_param text, max_keys integer, next_key_token text, next_upload_token text) OWNER TO supabase_storage_admin;

--
-- Name: list_objects_with_delimiter(text, text, text, integer, text, text); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.list_objects_with_delimiter(bucket_id text, prefix_param text, delimiter_param text, max_keys integer DEFAULT 100, start_after text DEFAULT ''::text, next_token text DEFAULT ''::text) RETURNS TABLE(name text, id uuid, metadata jsonb, updated_at timestamp with time zone)
    LANGUAGE plpgsql
    AS $_$
BEGIN
    RETURN QUERY EXECUTE
        'SELECT DISTINCT ON(name COLLATE "C") * from (
            SELECT
                CASE
                    WHEN position($2 IN substring(name from length($1) + 1)) > 0 THEN
                        substring(name from 1 for length($1) + position($2 IN substring(name from length($1) + 1)))
                    ELSE
                        name
                END AS name, id, metadata, updated_at
            FROM
                storage.objects
            WHERE
                bucket_id = $5 AND
                name ILIKE $1 || ''%'' AND
                CASE
                    WHEN $6 != '''' THEN
                    name COLLATE "C" > $6
                ELSE true END
                AND CASE
                    WHEN $4 != '''' THEN
                        CASE
                            WHEN position($2 IN substring(name from length($1) + 1)) > 0 THEN
                                substring(name from 1 for length($1) + position($2 IN substring(name from length($1) + 1))) COLLATE "C" > $4
                            ELSE
                                name COLLATE "C" > $4
                            END
                    ELSE
                        true
                END
            ORDER BY
                name COLLATE "C" ASC) as e order by name COLLATE "C" LIMIT $3'
        USING prefix_param, delimiter_param, max_keys, next_token, bucket_id, start_after;
END;
$_$;


ALTER FUNCTION storage.list_objects_with_delimiter(bucket_id text, prefix_param text, delimiter_param text, max_keys integer, start_after text, next_token text) OWNER TO supabase_storage_admin;

--
-- Name: operation(); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.operation() RETURNS text
    LANGUAGE plpgsql STABLE
    AS $$
BEGIN
    RETURN current_setting('storage.operation', true);
END;
$$;


ALTER FUNCTION storage.operation() OWNER TO supabase_storage_admin;

--
-- Name: search(text, text, integer, integer, integer, text, text, text); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.search(prefix text, bucketname text, limits integer DEFAULT 100, levels integer DEFAULT 1, offsets integer DEFAULT 0, search text DEFAULT ''::text, sortcolumn text DEFAULT 'name'::text, sortorder text DEFAULT 'asc'::text) RETURNS TABLE(name text, id uuid, updated_at timestamp with time zone, created_at timestamp with time zone, last_accessed_at timestamp with time zone, metadata jsonb)
    LANGUAGE plpgsql STABLE
    AS $_$
declare
  v_order_by text;
  v_sort_order text;
begin
  case
    when sortcolumn = 'name' then
      v_order_by = 'name';
    when sortcolumn = 'updated_at' then
      v_order_by = 'updated_at';
    when sortcolumn = 'created_at' then
      v_order_by = 'created_at';
    when sortcolumn = 'last_accessed_at' then
      v_order_by = 'last_accessed_at';
    else
      v_order_by = 'name';
  end case;

  case
    when sortorder = 'asc' then
      v_sort_order = 'asc';
    when sortorder = 'desc' then
      v_sort_order = 'desc';
    else
      v_sort_order = 'asc';
  end case;

  v_order_by = v_order_by || ' ' || v_sort_order;

  return query execute
    'with folders as (
       select path_tokens[$1] as folder
       from storage.objects
         where objects.name ilike $2 || $3 || ''%''
           and bucket_id = $4
           and array_length(objects.path_tokens, 1) <> $1
       group by folder
       order by folder ' || v_sort_order || '
     )
     (select folder as "name",
            null as id,
            null as updated_at,
            null as created_at,
            null as last_accessed_at,
            null as metadata from folders)
     union all
     (select path_tokens[$1] as "name",
            id,
            updated_at,
            created_at,
            last_accessed_at,
            metadata
     from storage.objects
     where objects.name ilike $2 || $3 || ''%''
       and bucket_id = $4
       and array_length(objects.path_tokens, 1) = $1
     order by ' || v_order_by || ')
     limit $5
     offset $6' using levels, prefix, search, bucketname, limits, offsets;
end;
$_$;


ALTER FUNCTION storage.search(prefix text, bucketname text, limits integer, levels integer, offsets integer, search text, sortcolumn text, sortorder text) OWNER TO supabase_storage_admin;

--
-- Name: update_updated_at_column(); Type: FUNCTION; Schema: storage; Owner: supabase_storage_admin
--

CREATE FUNCTION storage.update_updated_at_column() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW; 
END;
$$;


ALTER FUNCTION storage.update_updated_at_column() OWNER TO supabase_storage_admin;

--
-- Name: secrets_encrypt_secret_secret(); Type: FUNCTION; Schema: vault; Owner: supabase_admin
--

CREATE FUNCTION vault.secrets_encrypt_secret_secret() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
		BEGIN
		        new.secret = CASE WHEN new.secret IS NULL THEN NULL ELSE
			CASE WHEN new.key_id IS NULL THEN NULL ELSE pg_catalog.encode(
			  pgsodium.crypto_aead_det_encrypt(
				pg_catalog.convert_to(new.secret, 'utf8'),
				pg_catalog.convert_to((new.id::text || new.description::text || new.created_at::text || new.updated_at::text)::text, 'utf8'),
				new.key_id::uuid,
				new.nonce
			  ),
				'base64') END END;
		RETURN new;
		END;
		$$;


ALTER FUNCTION vault.secrets_encrypt_secret_secret() OWNER TO supabase_admin;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: audit_log_entries; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.audit_log_entries (
    instance_id uuid,
    id uuid NOT NULL,
    payload json,
    created_at timestamp with time zone,
    ip_address character varying(64) DEFAULT ''::character varying NOT NULL
);


ALTER TABLE auth.audit_log_entries OWNER TO supabase_auth_admin;

--
-- Name: TABLE audit_log_entries; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.audit_log_entries IS 'Auth: Audit trail for user actions.';


--
-- Name: flow_state; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.flow_state (
    id uuid NOT NULL,
    user_id uuid,
    auth_code text NOT NULL,
    code_challenge_method auth.code_challenge_method NOT NULL,
    code_challenge text NOT NULL,
    provider_type text NOT NULL,
    provider_access_token text,
    provider_refresh_token text,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    authentication_method text NOT NULL,
    auth_code_issued_at timestamp with time zone
);


ALTER TABLE auth.flow_state OWNER TO supabase_auth_admin;

--
-- Name: TABLE flow_state; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.flow_state IS 'stores metadata for pkce logins';


--
-- Name: identities; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.identities (
    provider_id text NOT NULL,
    user_id uuid NOT NULL,
    identity_data jsonb NOT NULL,
    provider text NOT NULL,
    last_sign_in_at timestamp with time zone,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    email text GENERATED ALWAYS AS (lower((identity_data ->> 'email'::text))) STORED,
    id uuid DEFAULT gen_random_uuid() NOT NULL
);


ALTER TABLE auth.identities OWNER TO supabase_auth_admin;

--
-- Name: TABLE identities; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.identities IS 'Auth: Stores identities associated to a user.';


--
-- Name: COLUMN identities.email; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON COLUMN auth.identities.email IS 'Auth: Email is a generated column that references the optional email property in the identity_data';


--
-- Name: instances; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.instances (
    id uuid NOT NULL,
    uuid uuid,
    raw_base_config text,
    created_at timestamp with time zone,
    updated_at timestamp with time zone
);


ALTER TABLE auth.instances OWNER TO supabase_auth_admin;

--
-- Name: TABLE instances; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.instances IS 'Auth: Manages users across multiple sites.';


--
-- Name: mfa_amr_claims; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.mfa_amr_claims (
    session_id uuid NOT NULL,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL,
    authentication_method text NOT NULL,
    id uuid NOT NULL
);


ALTER TABLE auth.mfa_amr_claims OWNER TO supabase_auth_admin;

--
-- Name: TABLE mfa_amr_claims; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.mfa_amr_claims IS 'auth: stores authenticator method reference claims for multi factor authentication';


--
-- Name: mfa_challenges; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.mfa_challenges (
    id uuid NOT NULL,
    factor_id uuid NOT NULL,
    created_at timestamp with time zone NOT NULL,
    verified_at timestamp with time zone,
    ip_address inet NOT NULL,
    otp_code text,
    web_authn_session_data jsonb
);


ALTER TABLE auth.mfa_challenges OWNER TO supabase_auth_admin;

--
-- Name: TABLE mfa_challenges; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.mfa_challenges IS 'auth: stores metadata about challenge requests made';


--
-- Name: mfa_factors; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.mfa_factors (
    id uuid NOT NULL,
    user_id uuid NOT NULL,
    friendly_name text,
    factor_type auth.factor_type NOT NULL,
    status auth.factor_status NOT NULL,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL,
    secret text,
    phone text,
    last_challenged_at timestamp with time zone,
    web_authn_credential jsonb,
    web_authn_aaguid uuid
);


ALTER TABLE auth.mfa_factors OWNER TO supabase_auth_admin;

--
-- Name: TABLE mfa_factors; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.mfa_factors IS 'auth: stores metadata about factors';


--
-- Name: one_time_tokens; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.one_time_tokens (
    id uuid NOT NULL,
    user_id uuid NOT NULL,
    token_type auth.one_time_token_type NOT NULL,
    token_hash text NOT NULL,
    relates_to text NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    CONSTRAINT one_time_tokens_token_hash_check CHECK ((char_length(token_hash) > 0))
);


ALTER TABLE auth.one_time_tokens OWNER TO supabase_auth_admin;

--
-- Name: refresh_tokens; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.refresh_tokens (
    instance_id uuid,
    id bigint NOT NULL,
    token character varying(255),
    user_id character varying(255),
    revoked boolean,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    parent character varying(255),
    session_id uuid
);


ALTER TABLE auth.refresh_tokens OWNER TO supabase_auth_admin;

--
-- Name: TABLE refresh_tokens; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.refresh_tokens IS 'Auth: Store of tokens used to refresh JWT tokens once they expire.';


--
-- Name: refresh_tokens_id_seq; Type: SEQUENCE; Schema: auth; Owner: supabase_auth_admin
--

CREATE SEQUENCE auth.refresh_tokens_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE auth.refresh_tokens_id_seq OWNER TO supabase_auth_admin;

--
-- Name: refresh_tokens_id_seq; Type: SEQUENCE OWNED BY; Schema: auth; Owner: supabase_auth_admin
--

ALTER SEQUENCE auth.refresh_tokens_id_seq OWNED BY auth.refresh_tokens.id;


--
-- Name: saml_providers; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.saml_providers (
    id uuid NOT NULL,
    sso_provider_id uuid NOT NULL,
    entity_id text NOT NULL,
    metadata_xml text NOT NULL,
    metadata_url text,
    attribute_mapping jsonb,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    name_id_format text,
    CONSTRAINT "entity_id not empty" CHECK ((char_length(entity_id) > 0)),
    CONSTRAINT "metadata_url not empty" CHECK (((metadata_url = NULL::text) OR (char_length(metadata_url) > 0))),
    CONSTRAINT "metadata_xml not empty" CHECK ((char_length(metadata_xml) > 0))
);


ALTER TABLE auth.saml_providers OWNER TO supabase_auth_admin;

--
-- Name: TABLE saml_providers; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.saml_providers IS 'Auth: Manages SAML Identity Provider connections.';


--
-- Name: saml_relay_states; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.saml_relay_states (
    id uuid NOT NULL,
    sso_provider_id uuid NOT NULL,
    request_id text NOT NULL,
    for_email text,
    redirect_to text,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    flow_state_id uuid,
    CONSTRAINT "request_id not empty" CHECK ((char_length(request_id) > 0))
);


ALTER TABLE auth.saml_relay_states OWNER TO supabase_auth_admin;

--
-- Name: TABLE saml_relay_states; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.saml_relay_states IS 'Auth: Contains SAML Relay State information for each Service Provider initiated login.';


--
-- Name: schema_migrations; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.schema_migrations (
    version character varying(255) NOT NULL
);


ALTER TABLE auth.schema_migrations OWNER TO supabase_auth_admin;

--
-- Name: TABLE schema_migrations; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.schema_migrations IS 'Auth: Manages updates to the auth system.';


--
-- Name: sessions; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.sessions (
    id uuid NOT NULL,
    user_id uuid NOT NULL,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    factor_id uuid,
    aal auth.aal_level,
    not_after timestamp with time zone,
    refreshed_at timestamp without time zone,
    user_agent text,
    ip inet,
    tag text
);


ALTER TABLE auth.sessions OWNER TO supabase_auth_admin;

--
-- Name: TABLE sessions; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.sessions IS 'Auth: Stores session data associated to a user.';


--
-- Name: COLUMN sessions.not_after; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON COLUMN auth.sessions.not_after IS 'Auth: Not after is a nullable column that contains a timestamp after which the session should be regarded as expired.';


--
-- Name: sso_domains; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.sso_domains (
    id uuid NOT NULL,
    sso_provider_id uuid NOT NULL,
    domain text NOT NULL,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    CONSTRAINT "domain not empty" CHECK ((char_length(domain) > 0))
);


ALTER TABLE auth.sso_domains OWNER TO supabase_auth_admin;

--
-- Name: TABLE sso_domains; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.sso_domains IS 'Auth: Manages SSO email address domain mapping to an SSO Identity Provider.';


--
-- Name: sso_providers; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.sso_providers (
    id uuid NOT NULL,
    resource_id text,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    CONSTRAINT "resource_id not empty" CHECK (((resource_id = NULL::text) OR (char_length(resource_id) > 0)))
);


ALTER TABLE auth.sso_providers OWNER TO supabase_auth_admin;

--
-- Name: TABLE sso_providers; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.sso_providers IS 'Auth: Manages SSO identity provider information; see saml_providers for SAML.';


--
-- Name: COLUMN sso_providers.resource_id; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON COLUMN auth.sso_providers.resource_id IS 'Auth: Uniquely identifies a SSO provider according to a user-chosen resource ID (case insensitive), useful in infrastructure as code.';


--
-- Name: users; Type: TABLE; Schema: auth; Owner: supabase_auth_admin
--

CREATE TABLE auth.users (
    instance_id uuid,
    id uuid NOT NULL,
    aud character varying(255),
    role character varying(255),
    email character varying(255),
    encrypted_password character varying(255),
    email_confirmed_at timestamp with time zone,
    invited_at timestamp with time zone,
    confirmation_token character varying(255),
    confirmation_sent_at timestamp with time zone,
    recovery_token character varying(255),
    recovery_sent_at timestamp with time zone,
    email_change_token_new character varying(255),
    email_change character varying(255),
    email_change_sent_at timestamp with time zone,
    last_sign_in_at timestamp with time zone,
    raw_app_meta_data jsonb,
    raw_user_meta_data jsonb,
    is_super_admin boolean,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    phone text DEFAULT NULL::character varying,
    phone_confirmed_at timestamp with time zone,
    phone_change text DEFAULT ''::character varying,
    phone_change_token character varying(255) DEFAULT ''::character varying,
    phone_change_sent_at timestamp with time zone,
    confirmed_at timestamp with time zone GENERATED ALWAYS AS (LEAST(email_confirmed_at, phone_confirmed_at)) STORED,
    email_change_token_current character varying(255) DEFAULT ''::character varying,
    email_change_confirm_status smallint DEFAULT 0,
    banned_until timestamp with time zone,
    reauthentication_token character varying(255) DEFAULT ''::character varying,
    reauthentication_sent_at timestamp with time zone,
    is_sso_user boolean DEFAULT false NOT NULL,
    deleted_at timestamp with time zone,
    is_anonymous boolean DEFAULT false NOT NULL,
    CONSTRAINT users_email_change_confirm_status_check CHECK (((email_change_confirm_status >= 0) AND (email_change_confirm_status <= 2)))
);


ALTER TABLE auth.users OWNER TO supabase_auth_admin;

--
-- Name: TABLE users; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON TABLE auth.users IS 'Auth: Stores user login data within a secure schema.';


--
-- Name: COLUMN users.is_sso_user; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON COLUMN auth.users.is_sso_user IS 'Auth: Set this column to true when the account comes from SSO. These accounts can have duplicate emails.';


--
-- Name: DepotPositions; Type: TABLE; Schema: depots; Owner: postgres
--

CREATE TABLE depots."DepotPositions" (
    id bigint NOT NULL,
    date date NOT NULL,
    depot_id bigint NOT NULL,
    stock_id bigint NOT NULL,
    expenses real DEFAULT '0'::real NOT NULL,
    amount integer NOT NULL,
    profit real DEFAULT '0'::real NOT NULL
);


ALTER TABLE depots."DepotPositions" OWNER TO postgres;

--
-- Name: DepotPositions_id_seq; Type: SEQUENCE; Schema: depots; Owner: postgres
--

ALTER TABLE depots."DepotPositions" ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME depots."DepotPositions_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: DepotValues; Type: TABLE; Schema: depots; Owner: postgres
--

CREATE TABLE depots."DepotValues" (
    "timestamp" date NOT NULL,
    depot_id bigint NOT NULL,
    stock_assets integer NOT NULL,
    id bigint NOT NULL,
    liquid_assets integer NOT NULL
);


ALTER TABLE depots."DepotValues" OWNER TO postgres;

--
-- Name: DepotValue_id_seq; Type: SEQUENCE; Schema: depots; Owner: postgres
--

ALTER TABLE depots."DepotValues" ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME depots."DepotValue_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: Depots; Type: TABLE; Schema: depots; Owner: postgres
--

CREATE TABLE depots."Depots" (
    id bigint NOT NULL,
    created_at date NOT NULL,
    liquid_assets integer DEFAULT 50000 NOT NULL,
    user_id uuid NOT NULL,
    name text,
    CONSTRAINT "Depots_name_check" CHECK ((length(name) < 60))
);


ALTER TABLE depots."Depots" OWNER TO postgres;

--
-- Name: Transactions; Type: TABLE; Schema: depots; Owner: postgres
--

CREATE TABLE depots."Transactions" (
    id bigint NOT NULL,
    "timestamp" date DEFAULT CURRENT_DATE NOT NULL,
    stock_id bigint NOT NULL,
    depot_id bigint NOT NULL,
    amount integer NOT NULL,
    price real NOT NULL
);


ALTER TABLE depots."Transactions" OWNER TO postgres;

--
-- Name: Transactions_id_seq; Type: SEQUENCE; Schema: depots; Owner: postgres
--

ALTER TABLE depots."Transactions" ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME depots."Transactions_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: depots_id_seq; Type: SEQUENCE; Schema: depots; Owner: postgres
--

ALTER TABLE depots."Depots" ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME depots.depots_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: a; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.a (
    symbol text NOT NULL,
    name text NOT NULL,
    description text NOT NULL,
    id bigint NOT NULL,
    type public."StockType" DEFAULT 'stock'::public."StockType" NOT NULL
);


ALTER TABLE public.a OWNER TO postgres;

--
-- Name: TABLE a; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON TABLE public.a IS 'Contains the id etc. timestamp is in utc+00';


--
-- Name: StockInfo_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.a ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public."StockInfo_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: StockPrices; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."StockPrices" (
    stock_id bigint NOT NULL,
    "timestamp" date NOT NULL,
    open real NOT NULL,
    close real NOT NULL,
    high real NOT NULL,
    low real NOT NULL,
    volume bigint NOT NULL,
    price_id bigint NOT NULL
);


ALTER TABLE public."StockPrices" OWNER TO postgres;

--
-- Name: StockPrices_new_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public."StockPrices" ALTER COLUMN price_id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public."StockPrices_new_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: leaderboard; Type: VIEW; Schema: public; Owner: postgres
--

CREATE VIEW public.leaderboard AS
 SELECT d.id,
    d.name,
    dv.stock_assets,
    dv.liquid_assets,
    dv."timestamp"
   FROM (depots."DepotValues" dv
     JOIN depots."Depots" d ON ((dv.depot_id = d.id)))
  WHERE (dv."timestamp" = date(now()))
  ORDER BY (dv.stock_assets + dv.liquid_assets);


ALTER VIEW public.leaderboard OWNER TO postgres;

--
-- Name: profiles; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.profiles (
    id uuid NOT NULL,
    name text
);


ALTER TABLE public.profiles OWNER TO postgres;

--
-- Name: messages; Type: TABLE; Schema: realtime; Owner: supabase_realtime_admin
--

CREATE TABLE realtime.messages (
    topic text NOT NULL,
    extension text NOT NULL,
    payload jsonb,
    event text,
    private boolean DEFAULT false,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    inserted_at timestamp without time zone DEFAULT now() NOT NULL,
    id uuid DEFAULT gen_random_uuid() NOT NULL
)
PARTITION BY RANGE (inserted_at);


ALTER TABLE realtime.messages OWNER TO supabase_realtime_admin;

--
-- Name: schema_migrations; Type: TABLE; Schema: realtime; Owner: supabase_admin
--

CREATE TABLE realtime.schema_migrations (
    version bigint NOT NULL,
    inserted_at timestamp(0) without time zone
);


ALTER TABLE realtime.schema_migrations OWNER TO supabase_admin;

--
-- Name: subscription; Type: TABLE; Schema: realtime; Owner: supabase_admin
--

CREATE TABLE realtime.subscription (
    id bigint NOT NULL,
    subscription_id uuid NOT NULL,
    entity regclass NOT NULL,
    filters realtime.user_defined_filter[] DEFAULT '{}'::realtime.user_defined_filter[] NOT NULL,
    claims jsonb NOT NULL,
    claims_role regrole GENERATED ALWAYS AS (realtime.to_regrole((claims ->> 'role'::text))) STORED NOT NULL,
    created_at timestamp without time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);


ALTER TABLE realtime.subscription OWNER TO supabase_admin;

--
-- Name: subscription_id_seq; Type: SEQUENCE; Schema: realtime; Owner: supabase_admin
--

ALTER TABLE realtime.subscription ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME realtime.subscription_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: buckets; Type: TABLE; Schema: storage; Owner: supabase_storage_admin
--

CREATE TABLE storage.buckets (
    id text NOT NULL,
    name text NOT NULL,
    owner uuid,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now(),
    public boolean DEFAULT false,
    avif_autodetection boolean DEFAULT false,
    file_size_limit bigint,
    allowed_mime_types text[],
    owner_id text
);


ALTER TABLE storage.buckets OWNER TO supabase_storage_admin;

--
-- Name: COLUMN buckets.owner; Type: COMMENT; Schema: storage; Owner: supabase_storage_admin
--

COMMENT ON COLUMN storage.buckets.owner IS 'Field is deprecated, use owner_id instead';


--
-- Name: migrations; Type: TABLE; Schema: storage; Owner: supabase_storage_admin
--

CREATE TABLE storage.migrations (
    id integer NOT NULL,
    name character varying(100) NOT NULL,
    hash character varying(40) NOT NULL,
    executed_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE storage.migrations OWNER TO supabase_storage_admin;

--
-- Name: objects; Type: TABLE; Schema: storage; Owner: supabase_storage_admin
--

CREATE TABLE storage.objects (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    bucket_id text,
    name text,
    owner uuid,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now(),
    last_accessed_at timestamp with time zone DEFAULT now(),
    metadata jsonb,
    path_tokens text[] GENERATED ALWAYS AS (string_to_array(name, '/'::text)) STORED,
    version text,
    owner_id text,
    user_metadata jsonb
);


ALTER TABLE storage.objects OWNER TO supabase_storage_admin;

--
-- Name: COLUMN objects.owner; Type: COMMENT; Schema: storage; Owner: supabase_storage_admin
--

COMMENT ON COLUMN storage.objects.owner IS 'Field is deprecated, use owner_id instead';


--
-- Name: s3_multipart_uploads; Type: TABLE; Schema: storage; Owner: supabase_storage_admin
--

CREATE TABLE storage.s3_multipart_uploads (
    id text NOT NULL,
    in_progress_size bigint DEFAULT 0 NOT NULL,
    upload_signature text NOT NULL,
    bucket_id text NOT NULL,
    key text NOT NULL COLLATE pg_catalog."C",
    version text NOT NULL,
    owner_id text,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    user_metadata jsonb
);


ALTER TABLE storage.s3_multipart_uploads OWNER TO supabase_storage_admin;

--
-- Name: s3_multipart_uploads_parts; Type: TABLE; Schema: storage; Owner: supabase_storage_admin
--

CREATE TABLE storage.s3_multipart_uploads_parts (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    upload_id text NOT NULL,
    size bigint DEFAULT 0 NOT NULL,
    part_number integer NOT NULL,
    bucket_id text NOT NULL,
    key text NOT NULL COLLATE pg_catalog."C",
    etag text NOT NULL,
    owner_id text,
    version text NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE storage.s3_multipart_uploads_parts OWNER TO supabase_storage_admin;

--
-- Name: refresh_tokens id; Type: DEFAULT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.refresh_tokens ALTER COLUMN id SET DEFAULT nextval('auth.refresh_tokens_id_seq'::regclass);


--
-- Name: mfa_amr_claims amr_id_pk; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.mfa_amr_claims
    ADD CONSTRAINT amr_id_pk PRIMARY KEY (id);


--
-- Name: audit_log_entries audit_log_entries_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.audit_log_entries
    ADD CONSTRAINT audit_log_entries_pkey PRIMARY KEY (id);


--
-- Name: flow_state flow_state_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.flow_state
    ADD CONSTRAINT flow_state_pkey PRIMARY KEY (id);


--
-- Name: identities identities_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.identities
    ADD CONSTRAINT identities_pkey PRIMARY KEY (id);


--
-- Name: identities identities_provider_id_provider_unique; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.identities
    ADD CONSTRAINT identities_provider_id_provider_unique UNIQUE (provider_id, provider);


--
-- Name: instances instances_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.instances
    ADD CONSTRAINT instances_pkey PRIMARY KEY (id);


--
-- Name: mfa_amr_claims mfa_amr_claims_session_id_authentication_method_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.mfa_amr_claims
    ADD CONSTRAINT mfa_amr_claims_session_id_authentication_method_pkey UNIQUE (session_id, authentication_method);


--
-- Name: mfa_challenges mfa_challenges_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.mfa_challenges
    ADD CONSTRAINT mfa_challenges_pkey PRIMARY KEY (id);


--
-- Name: mfa_factors mfa_factors_last_challenged_at_key; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.mfa_factors
    ADD CONSTRAINT mfa_factors_last_challenged_at_key UNIQUE (last_challenged_at);


--
-- Name: mfa_factors mfa_factors_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.mfa_factors
    ADD CONSTRAINT mfa_factors_pkey PRIMARY KEY (id);


--
-- Name: one_time_tokens one_time_tokens_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.one_time_tokens
    ADD CONSTRAINT one_time_tokens_pkey PRIMARY KEY (id);


--
-- Name: refresh_tokens refresh_tokens_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.refresh_tokens
    ADD CONSTRAINT refresh_tokens_pkey PRIMARY KEY (id);


--
-- Name: refresh_tokens refresh_tokens_token_unique; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.refresh_tokens
    ADD CONSTRAINT refresh_tokens_token_unique UNIQUE (token);


--
-- Name: saml_providers saml_providers_entity_id_key; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.saml_providers
    ADD CONSTRAINT saml_providers_entity_id_key UNIQUE (entity_id);


--
-- Name: saml_providers saml_providers_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.saml_providers
    ADD CONSTRAINT saml_providers_pkey PRIMARY KEY (id);


--
-- Name: saml_relay_states saml_relay_states_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.saml_relay_states
    ADD CONSTRAINT saml_relay_states_pkey PRIMARY KEY (id);


--
-- Name: schema_migrations schema_migrations_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.schema_migrations
    ADD CONSTRAINT schema_migrations_pkey PRIMARY KEY (version);


--
-- Name: sessions sessions_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.sessions
    ADD CONSTRAINT sessions_pkey PRIMARY KEY (id);


--
-- Name: sso_domains sso_domains_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.sso_domains
    ADD CONSTRAINT sso_domains_pkey PRIMARY KEY (id);


--
-- Name: sso_providers sso_providers_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.sso_providers
    ADD CONSTRAINT sso_providers_pkey PRIMARY KEY (id);


--
-- Name: users users_phone_key; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.users
    ADD CONSTRAINT users_phone_key UNIQUE (phone);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: DepotPositions DepotPositions_pkey; Type: CONSTRAINT; Schema: depots; Owner: postgres
--

ALTER TABLE ONLY depots."DepotPositions"
    ADD CONSTRAINT "DepotPositions_pkey" PRIMARY KEY (id);


--
-- Name: DepotValues DepotValue_pkey; Type: CONSTRAINT; Schema: depots; Owner: postgres
--

ALTER TABLE ONLY depots."DepotValues"
    ADD CONSTRAINT "DepotValue_pkey" PRIMARY KEY (id);


--
-- Name: Depots Depots_user_id_key; Type: CONSTRAINT; Schema: depots; Owner: postgres
--

ALTER TABLE ONLY depots."Depots"
    ADD CONSTRAINT "Depots_user_id_key" UNIQUE (user_id);


--
-- Name: Transactions Transactions_pkey; Type: CONSTRAINT; Schema: depots; Owner: postgres
--

ALTER TABLE ONLY depots."Transactions"
    ADD CONSTRAINT "Transactions_pkey" PRIMARY KEY (id);


--
-- Name: Depots depots_pkey; Type: CONSTRAINT; Schema: depots; Owner: postgres
--

ALTER TABLE ONLY depots."Depots"
    ADD CONSTRAINT depots_pkey PRIMARY KEY (id);


--
-- Name: DepotPositions dp_position_uby_stock_depot; Type: CONSTRAINT; Schema: depots; Owner: postgres
--

ALTER TABLE ONLY depots."DepotPositions"
    ADD CONSTRAINT dp_position_uby_stock_depot UNIQUE (depot_id, stock_id);


--
-- Name: Transactions dp_transactions_uby_stock_depot_date; Type: CONSTRAINT; Schema: depots; Owner: postgres
--

ALTER TABLE ONLY depots."Transactions"
    ADD CONSTRAINT dp_transactions_uby_stock_depot_date UNIQUE (depot_id, stock_id, "timestamp");


--
-- Name: DepotValues unique_stock_timestamp; Type: CONSTRAINT; Schema: depots; Owner: postgres
--

ALTER TABLE ONLY depots."DepotValues"
    ADD CONSTRAINT unique_stock_timestamp UNIQUE (depot_id, "timestamp");


--
-- Name: a StockInfo_id_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.a
    ADD CONSTRAINT "StockInfo_id_key" UNIQUE (id);


--
-- Name: a StockInfo_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.a
    ADD CONSTRAINT "StockInfo_pkey" PRIMARY KEY (id);


--
-- Name: StockPrices StockPrices_new_id_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."StockPrices"
    ADD CONSTRAINT "StockPrices_new_id_key" UNIQUE (price_id);


--
-- Name: StockPrices StockPrices_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."StockPrices"
    ADD CONSTRAINT "StockPrices_pkey" PRIMARY KEY (price_id);


--
-- Name: profiles profiles_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.profiles
    ADD CONSTRAINT profiles_pkey PRIMARY KEY (id);


--
-- Name: StockPrices unique_stock_timestamp; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."StockPrices"
    ADD CONSTRAINT unique_stock_timestamp UNIQUE (stock_id, "timestamp");


--
-- Name: messages messages_pkey; Type: CONSTRAINT; Schema: realtime; Owner: supabase_realtime_admin
--

ALTER TABLE ONLY realtime.messages
    ADD CONSTRAINT messages_pkey PRIMARY KEY (id, inserted_at);


--
-- Name: subscription pk_subscription; Type: CONSTRAINT; Schema: realtime; Owner: supabase_admin
--

ALTER TABLE ONLY realtime.subscription
    ADD CONSTRAINT pk_subscription PRIMARY KEY (id);


--
-- Name: schema_migrations schema_migrations_pkey; Type: CONSTRAINT; Schema: realtime; Owner: supabase_admin
--

ALTER TABLE ONLY realtime.schema_migrations
    ADD CONSTRAINT schema_migrations_pkey PRIMARY KEY (version);


--
-- Name: buckets buckets_pkey; Type: CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE ONLY storage.buckets
    ADD CONSTRAINT buckets_pkey PRIMARY KEY (id);


--
-- Name: migrations migrations_name_key; Type: CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE ONLY storage.migrations
    ADD CONSTRAINT migrations_name_key UNIQUE (name);


--
-- Name: migrations migrations_pkey; Type: CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE ONLY storage.migrations
    ADD CONSTRAINT migrations_pkey PRIMARY KEY (id);


--
-- Name: objects objects_pkey; Type: CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE ONLY storage.objects
    ADD CONSTRAINT objects_pkey PRIMARY KEY (id);


--
-- Name: s3_multipart_uploads_parts s3_multipart_uploads_parts_pkey; Type: CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE ONLY storage.s3_multipart_uploads_parts
    ADD CONSTRAINT s3_multipart_uploads_parts_pkey PRIMARY KEY (id);


--
-- Name: s3_multipart_uploads s3_multipart_uploads_pkey; Type: CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE ONLY storage.s3_multipart_uploads
    ADD CONSTRAINT s3_multipart_uploads_pkey PRIMARY KEY (id);


--
-- Name: audit_logs_instance_id_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX audit_logs_instance_id_idx ON auth.audit_log_entries USING btree (instance_id);


--
-- Name: confirmation_token_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE UNIQUE INDEX confirmation_token_idx ON auth.users USING btree (confirmation_token) WHERE ((confirmation_token)::text !~ '^[0-9 ]*$'::text);


--
-- Name: email_change_token_current_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE UNIQUE INDEX email_change_token_current_idx ON auth.users USING btree (email_change_token_current) WHERE ((email_change_token_current)::text !~ '^[0-9 ]*$'::text);


--
-- Name: email_change_token_new_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE UNIQUE INDEX email_change_token_new_idx ON auth.users USING btree (email_change_token_new) WHERE ((email_change_token_new)::text !~ '^[0-9 ]*$'::text);


--
-- Name: factor_id_created_at_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX factor_id_created_at_idx ON auth.mfa_factors USING btree (user_id, created_at);


--
-- Name: flow_state_created_at_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX flow_state_created_at_idx ON auth.flow_state USING btree (created_at DESC);


--
-- Name: identities_email_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX identities_email_idx ON auth.identities USING btree (email text_pattern_ops);


--
-- Name: INDEX identities_email_idx; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON INDEX auth.identities_email_idx IS 'Auth: Ensures indexed queries on the email column';


--
-- Name: identities_user_id_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX identities_user_id_idx ON auth.identities USING btree (user_id);


--
-- Name: idx_auth_code; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX idx_auth_code ON auth.flow_state USING btree (auth_code);


--
-- Name: idx_user_id_auth_method; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX idx_user_id_auth_method ON auth.flow_state USING btree (user_id, authentication_method);


--
-- Name: mfa_challenge_created_at_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX mfa_challenge_created_at_idx ON auth.mfa_challenges USING btree (created_at DESC);


--
-- Name: mfa_factors_user_friendly_name_unique; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE UNIQUE INDEX mfa_factors_user_friendly_name_unique ON auth.mfa_factors USING btree (friendly_name, user_id) WHERE (TRIM(BOTH FROM friendly_name) <> ''::text);


--
-- Name: mfa_factors_user_id_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX mfa_factors_user_id_idx ON auth.mfa_factors USING btree (user_id);


--
-- Name: one_time_tokens_relates_to_hash_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX one_time_tokens_relates_to_hash_idx ON auth.one_time_tokens USING hash (relates_to);


--
-- Name: one_time_tokens_token_hash_hash_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX one_time_tokens_token_hash_hash_idx ON auth.one_time_tokens USING hash (token_hash);


--
-- Name: one_time_tokens_user_id_token_type_key; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE UNIQUE INDEX one_time_tokens_user_id_token_type_key ON auth.one_time_tokens USING btree (user_id, token_type);


--
-- Name: reauthentication_token_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE UNIQUE INDEX reauthentication_token_idx ON auth.users USING btree (reauthentication_token) WHERE ((reauthentication_token)::text !~ '^[0-9 ]*$'::text);


--
-- Name: recovery_token_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE UNIQUE INDEX recovery_token_idx ON auth.users USING btree (recovery_token) WHERE ((recovery_token)::text !~ '^[0-9 ]*$'::text);


--
-- Name: refresh_tokens_instance_id_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX refresh_tokens_instance_id_idx ON auth.refresh_tokens USING btree (instance_id);


--
-- Name: refresh_tokens_instance_id_user_id_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX refresh_tokens_instance_id_user_id_idx ON auth.refresh_tokens USING btree (instance_id, user_id);


--
-- Name: refresh_tokens_parent_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX refresh_tokens_parent_idx ON auth.refresh_tokens USING btree (parent);


--
-- Name: refresh_tokens_session_id_revoked_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX refresh_tokens_session_id_revoked_idx ON auth.refresh_tokens USING btree (session_id, revoked);


--
-- Name: refresh_tokens_updated_at_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX refresh_tokens_updated_at_idx ON auth.refresh_tokens USING btree (updated_at DESC);


--
-- Name: saml_providers_sso_provider_id_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX saml_providers_sso_provider_id_idx ON auth.saml_providers USING btree (sso_provider_id);


--
-- Name: saml_relay_states_created_at_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX saml_relay_states_created_at_idx ON auth.saml_relay_states USING btree (created_at DESC);


--
-- Name: saml_relay_states_for_email_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX saml_relay_states_for_email_idx ON auth.saml_relay_states USING btree (for_email);


--
-- Name: saml_relay_states_sso_provider_id_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX saml_relay_states_sso_provider_id_idx ON auth.saml_relay_states USING btree (sso_provider_id);


--
-- Name: sessions_not_after_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX sessions_not_after_idx ON auth.sessions USING btree (not_after DESC);


--
-- Name: sessions_user_id_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX sessions_user_id_idx ON auth.sessions USING btree (user_id);


--
-- Name: sso_domains_domain_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE UNIQUE INDEX sso_domains_domain_idx ON auth.sso_domains USING btree (lower(domain));


--
-- Name: sso_domains_sso_provider_id_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX sso_domains_sso_provider_id_idx ON auth.sso_domains USING btree (sso_provider_id);


--
-- Name: sso_providers_resource_id_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE UNIQUE INDEX sso_providers_resource_id_idx ON auth.sso_providers USING btree (lower(resource_id));


--
-- Name: unique_phone_factor_per_user; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE UNIQUE INDEX unique_phone_factor_per_user ON auth.mfa_factors USING btree (user_id, phone);


--
-- Name: user_id_created_at_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX user_id_created_at_idx ON auth.sessions USING btree (user_id, created_at);


--
-- Name: users_email_partial_key; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE UNIQUE INDEX users_email_partial_key ON auth.users USING btree (email) WHERE (is_sso_user = false);


--
-- Name: INDEX users_email_partial_key; Type: COMMENT; Schema: auth; Owner: supabase_auth_admin
--

COMMENT ON INDEX auth.users_email_partial_key IS 'Auth: A partial unique index that applies only when is_sso_user is false';


--
-- Name: users_instance_id_email_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX users_instance_id_email_idx ON auth.users USING btree (instance_id, lower((email)::text));


--
-- Name: users_instance_id_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX users_instance_id_idx ON auth.users USING btree (instance_id);


--
-- Name: users_is_anonymous_idx; Type: INDEX; Schema: auth; Owner: supabase_auth_admin
--

CREATE INDEX users_is_anonymous_idx ON auth.users USING btree (is_anonymous);


--
-- Name: idx_stock_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_stock_id ON public."StockPrices" USING btree (stock_id);


--
-- Name: idx_stock_id_timestamp; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_stock_id_timestamp ON public."StockPrices" USING btree (stock_id, "timestamp" DESC);


--
-- Name: idx_timestamp; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_timestamp ON public."StockPrices" USING btree ("timestamp");


--
-- Name: idx_unique_stock_prices_timestamp_stock_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX idx_unique_stock_prices_timestamp_stock_id ON public."StockPrices" USING btree ("timestamp", stock_id);


--
-- Name: ix_realtime_subscription_entity; Type: INDEX; Schema: realtime; Owner: supabase_admin
--

CREATE INDEX ix_realtime_subscription_entity ON realtime.subscription USING btree (entity);


--
-- Name: subscription_subscription_id_entity_filters_key; Type: INDEX; Schema: realtime; Owner: supabase_admin
--

CREATE UNIQUE INDEX subscription_subscription_id_entity_filters_key ON realtime.subscription USING btree (subscription_id, entity, filters);


--
-- Name: bname; Type: INDEX; Schema: storage; Owner: supabase_storage_admin
--

CREATE UNIQUE INDEX bname ON storage.buckets USING btree (name);


--
-- Name: bucketid_objname; Type: INDEX; Schema: storage; Owner: supabase_storage_admin
--

CREATE UNIQUE INDEX bucketid_objname ON storage.objects USING btree (bucket_id, name);


--
-- Name: idx_multipart_uploads_list; Type: INDEX; Schema: storage; Owner: supabase_storage_admin
--

CREATE INDEX idx_multipart_uploads_list ON storage.s3_multipart_uploads USING btree (bucket_id, key, created_at);


--
-- Name: idx_objects_bucket_id_name; Type: INDEX; Schema: storage; Owner: supabase_storage_admin
--

CREATE INDEX idx_objects_bucket_id_name ON storage.objects USING btree (bucket_id, name COLLATE "C");


--
-- Name: name_prefix_search; Type: INDEX; Schema: storage; Owner: supabase_storage_admin
--

CREATE INDEX name_prefix_search ON storage.objects USING btree (name text_pattern_ops);


--
-- Name: users on_auth_user_created; Type: TRIGGER; Schema: auth; Owner: supabase_auth_admin
--

CREATE TRIGGER on_auth_user_created AFTER INSERT ON auth.users FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();


--
-- Name: subscription tr_check_filters; Type: TRIGGER; Schema: realtime; Owner: supabase_admin
--

CREATE TRIGGER tr_check_filters BEFORE INSERT OR UPDATE ON realtime.subscription FOR EACH ROW EXECUTE FUNCTION realtime.subscription_check_filters();


--
-- Name: objects update_objects_updated_at; Type: TRIGGER; Schema: storage; Owner: supabase_storage_admin
--

CREATE TRIGGER update_objects_updated_at BEFORE UPDATE ON storage.objects FOR EACH ROW EXECUTE FUNCTION storage.update_updated_at_column();


--
-- Name: identities identities_user_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.identities
    ADD CONSTRAINT identities_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;


--
-- Name: mfa_amr_claims mfa_amr_claims_session_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.mfa_amr_claims
    ADD CONSTRAINT mfa_amr_claims_session_id_fkey FOREIGN KEY (session_id) REFERENCES auth.sessions(id) ON DELETE CASCADE;


--
-- Name: mfa_challenges mfa_challenges_auth_factor_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.mfa_challenges
    ADD CONSTRAINT mfa_challenges_auth_factor_id_fkey FOREIGN KEY (factor_id) REFERENCES auth.mfa_factors(id) ON DELETE CASCADE;


--
-- Name: mfa_factors mfa_factors_user_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.mfa_factors
    ADD CONSTRAINT mfa_factors_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;


--
-- Name: one_time_tokens one_time_tokens_user_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.one_time_tokens
    ADD CONSTRAINT one_time_tokens_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;


--
-- Name: refresh_tokens refresh_tokens_session_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.refresh_tokens
    ADD CONSTRAINT refresh_tokens_session_id_fkey FOREIGN KEY (session_id) REFERENCES auth.sessions(id) ON DELETE CASCADE;


--
-- Name: saml_providers saml_providers_sso_provider_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.saml_providers
    ADD CONSTRAINT saml_providers_sso_provider_id_fkey FOREIGN KEY (sso_provider_id) REFERENCES auth.sso_providers(id) ON DELETE CASCADE;


--
-- Name: saml_relay_states saml_relay_states_flow_state_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.saml_relay_states
    ADD CONSTRAINT saml_relay_states_flow_state_id_fkey FOREIGN KEY (flow_state_id) REFERENCES auth.flow_state(id) ON DELETE CASCADE;


--
-- Name: saml_relay_states saml_relay_states_sso_provider_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.saml_relay_states
    ADD CONSTRAINT saml_relay_states_sso_provider_id_fkey FOREIGN KEY (sso_provider_id) REFERENCES auth.sso_providers(id) ON DELETE CASCADE;


--
-- Name: sessions sessions_user_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.sessions
    ADD CONSTRAINT sessions_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;


--
-- Name: sso_domains sso_domains_sso_provider_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE ONLY auth.sso_domains
    ADD CONSTRAINT sso_domains_sso_provider_id_fkey FOREIGN KEY (sso_provider_id) REFERENCES auth.sso_providers(id) ON DELETE CASCADE;


--
-- Name: DepotPositions DepotPositions_depot_id_fkey; Type: FK CONSTRAINT; Schema: depots; Owner: postgres
--

ALTER TABLE ONLY depots."DepotPositions"
    ADD CONSTRAINT "DepotPositions_depot_id_fkey" FOREIGN KEY (depot_id) REFERENCES depots."Depots"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: DepotPositions DepotPositions_stock_id_fkey; Type: FK CONSTRAINT; Schema: depots; Owner: postgres
--

ALTER TABLE ONLY depots."DepotPositions"
    ADD CONSTRAINT "DepotPositions_stock_id_fkey" FOREIGN KEY (stock_id) REFERENCES public.a(id);


--
-- Name: DepotValues DepotValue_depot_id_fkey; Type: FK CONSTRAINT; Schema: depots; Owner: postgres
--

ALTER TABLE ONLY depots."DepotValues"
    ADD CONSTRAINT "DepotValue_depot_id_fkey" FOREIGN KEY (depot_id) REFERENCES depots."Depots"(id) ON DELETE CASCADE;


--
-- Name: Depots Depots_user_id_fkey1; Type: FK CONSTRAINT; Schema: depots; Owner: postgres
--

ALTER TABLE ONLY depots."Depots"
    ADD CONSTRAINT "Depots_user_id_fkey1" FOREIGN KEY (user_id) REFERENCES public.profiles(id);


--
-- Name: Transactions Transactions_depot_id_fkey; Type: FK CONSTRAINT; Schema: depots; Owner: postgres
--

ALTER TABLE ONLY depots."Transactions"
    ADD CONSTRAINT "Transactions_depot_id_fkey" FOREIGN KEY (depot_id) REFERENCES depots."Depots"(id);


--
-- Name: Transactions Transactions_stock_id_fkey; Type: FK CONSTRAINT; Schema: depots; Owner: postgres
--

ALTER TABLE ONLY depots."Transactions"
    ADD CONSTRAINT "Transactions_stock_id_fkey" FOREIGN KEY (stock_id) REFERENCES public.a(id);


--
-- Name: StockPrices StockPrices_stock_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."StockPrices"
    ADD CONSTRAINT "StockPrices_stock_id_fkey" FOREIGN KEY (stock_id) REFERENCES public.a(id);


--
-- Name: profiles profiles_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.profiles
    ADD CONSTRAINT profiles_id_fkey FOREIGN KEY (id) REFERENCES auth.users(id) ON DELETE CASCADE;


--
-- Name: objects objects_bucketId_fkey; Type: FK CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE ONLY storage.objects
    ADD CONSTRAINT "objects_bucketId_fkey" FOREIGN KEY (bucket_id) REFERENCES storage.buckets(id);


--
-- Name: s3_multipart_uploads s3_multipart_uploads_bucket_id_fkey; Type: FK CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE ONLY storage.s3_multipart_uploads
    ADD CONSTRAINT s3_multipart_uploads_bucket_id_fkey FOREIGN KEY (bucket_id) REFERENCES storage.buckets(id);


--
-- Name: s3_multipart_uploads_parts s3_multipart_uploads_parts_bucket_id_fkey; Type: FK CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE ONLY storage.s3_multipart_uploads_parts
    ADD CONSTRAINT s3_multipart_uploads_parts_bucket_id_fkey FOREIGN KEY (bucket_id) REFERENCES storage.buckets(id);


--
-- Name: s3_multipart_uploads_parts s3_multipart_uploads_parts_upload_id_fkey; Type: FK CONSTRAINT; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE ONLY storage.s3_multipart_uploads_parts
    ADD CONSTRAINT s3_multipart_uploads_parts_upload_id_fkey FOREIGN KEY (upload_id) REFERENCES storage.s3_multipart_uploads(id) ON DELETE CASCADE;


--
-- Name: audit_log_entries; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.audit_log_entries ENABLE ROW LEVEL SECURITY;

--
-- Name: flow_state; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.flow_state ENABLE ROW LEVEL SECURITY;

--
-- Name: identities; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.identities ENABLE ROW LEVEL SECURITY;

--
-- Name: instances; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.instances ENABLE ROW LEVEL SECURITY;

--
-- Name: mfa_amr_claims; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.mfa_amr_claims ENABLE ROW LEVEL SECURITY;

--
-- Name: mfa_challenges; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.mfa_challenges ENABLE ROW LEVEL SECURITY;

--
-- Name: mfa_factors; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.mfa_factors ENABLE ROW LEVEL SECURITY;

--
-- Name: one_time_tokens; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.one_time_tokens ENABLE ROW LEVEL SECURITY;

--
-- Name: refresh_tokens; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.refresh_tokens ENABLE ROW LEVEL SECURITY;

--
-- Name: saml_providers; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.saml_providers ENABLE ROW LEVEL SECURITY;

--
-- Name: saml_relay_states; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.saml_relay_states ENABLE ROW LEVEL SECURITY;

--
-- Name: schema_migrations; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.schema_migrations ENABLE ROW LEVEL SECURITY;

--
-- Name: sessions; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.sessions ENABLE ROW LEVEL SECURITY;

--
-- Name: sso_domains; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.sso_domains ENABLE ROW LEVEL SECURITY;

--
-- Name: sso_providers; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.sso_providers ENABLE ROW LEVEL SECURITY;

--
-- Name: users; Type: ROW SECURITY; Schema: auth; Owner: supabase_auth_admin
--

ALTER TABLE auth.users ENABLE ROW LEVEL SECURITY;

--
-- Name: DepotPositions; Type: ROW SECURITY; Schema: depots; Owner: postgres
--

ALTER TABLE depots."DepotPositions" ENABLE ROW LEVEL SECURITY;

--
-- Name: DepotValues; Type: ROW SECURITY; Schema: depots; Owner: postgres
--

ALTER TABLE depots."DepotValues" ENABLE ROW LEVEL SECURITY;

--
-- Name: Depots; Type: ROW SECURITY; Schema: depots; Owner: postgres
--

ALTER TABLE depots."Depots" ENABLE ROW LEVEL SECURITY;

--
-- Name: Depots Enable insert for users based on user_id; Type: POLICY; Schema: depots; Owner: postgres
--

CREATE POLICY "Enable insert for users based on user_id" ON depots."Depots" FOR INSERT TO authenticated WITH CHECK ((( SELECT auth.uid() AS uid) = user_id));


--
-- Name: DepotPositions Enable read access for all users; Type: POLICY; Schema: depots; Owner: postgres
--

CREATE POLICY "Enable read access for all users" ON depots."DepotPositions" FOR SELECT USING (true);


--
-- Name: DepotValues Enable read access for all users; Type: POLICY; Schema: depots; Owner: postgres
--

CREATE POLICY "Enable read access for all users" ON depots."DepotValues" FOR SELECT USING (true);


--
-- Name: Depots Enable read access for all users; Type: POLICY; Schema: depots; Owner: postgres
--

CREATE POLICY "Enable read access for all users" ON depots."Depots" FOR SELECT USING (true);


--
-- Name: Transactions Enable read access for all users; Type: POLICY; Schema: depots; Owner: postgres
--

CREATE POLICY "Enable read access for all users" ON depots."Transactions" FOR SELECT USING (true);


--
-- Name: Depots Enable update for users based on email; Type: POLICY; Schema: depots; Owner: postgres
--

CREATE POLICY "Enable update for users based on email" ON depots."Depots" FOR UPDATE TO authenticated USING ((( SELECT auth.uid() AS uid) = user_id)) WITH CHECK ((( SELECT auth.uid() AS uid) = user_id));


--
-- Name: Transactions Enable update for users based on email; Type: POLICY; Schema: depots; Owner: postgres
--

CREATE POLICY "Enable update for users based on email" ON depots."Transactions" FOR UPDATE USING ((EXISTS ( SELECT 1
   FROM depots."Depots" d
  WHERE ((d.id = "Transactions".depot_id) AND (d.user_id = auth.uid())))));


--
-- Name: DepotPositions ONLY USERS OF A REPO MAY UPDATE ITS POSITIONS; Type: POLICY; Schema: depots; Owner: postgres
--

CREATE POLICY "ONLY USERS OF A REPO MAY UPDATE ITS POSITIONS" ON depots."DepotPositions" FOR UPDATE USING ((EXISTS ( SELECT 1
   FROM depots."Depots" d
  WHERE ((d.id = "DepotPositions".depot_id) AND (d.user_id = auth.uid())))));


--
-- Name: DepotValues ONLY USERS OF DEPOT MAY INSERT VALUES; Type: POLICY; Schema: depots; Owner: postgres
--

CREATE POLICY "ONLY USERS OF DEPOT MAY INSERT VALUES" ON depots."DepotValues" FOR INSERT TO authenticated WITH CHECK ((EXISTS ( SELECT 1
   FROM depots."Depots" d
  WHERE ((d.id = "DepotValues".depot_id) AND (d.user_id = auth.uid())))));


--
-- Name: DepotValues ONLY USERS OF REPO MAY UPDATE; Type: POLICY; Schema: depots; Owner: postgres
--

CREATE POLICY "ONLY USERS OF REPO MAY UPDATE" ON depots."DepotValues" FOR SELECT USING ((EXISTS ( SELECT 1
   FROM depots."Depots" d
  WHERE ((d.id = "DepotValues".depot_id) AND (d.user_id = auth.uid())))));


--
-- Name: Transactions; Type: ROW SECURITY; Schema: depots; Owner: postgres
--

ALTER TABLE depots."Transactions" ENABLE ROW LEVEL SECURITY;

--
-- Name: DepotPositions USER MAY ONLY DELETE OWN POSITIONS; Type: POLICY; Schema: depots; Owner: postgres
--

CREATE POLICY "USER MAY ONLY DELETE OWN POSITIONS" ON depots."DepotPositions" FOR DELETE TO authenticated USING ((EXISTS ( SELECT 1
   FROM depots."Depots" d
  WHERE ((d.id = "DepotPositions".depot_id) AND (d.user_id = auth.uid())))));


--
-- Name: DepotPositions USER MAY ONLY INSERT FOR OWN DEPO; Type: POLICY; Schema: depots; Owner: postgres
--

CREATE POLICY "USER MAY ONLY INSERT FOR OWN DEPO" ON depots."DepotPositions" FOR INSERT TO authenticated WITH CHECK ((EXISTS ( SELECT 1
   FROM depots."Depots" d
  WHERE ((d.id = "DepotPositions".depot_id) AND (d.user_id = auth.uid())))));


--
-- Name: Transactions USERS OF DEPOT MAY INSERT; Type: POLICY; Schema: depots; Owner: postgres
--

CREATE POLICY "USERS OF DEPOT MAY INSERT" ON depots."Transactions" FOR INSERT TO authenticated WITH CHECK ((EXISTS ( SELECT 1
   FROM depots."Depots" d
  WHERE ((d.id = "Transactions".depot_id) AND (d.user_id = auth.uid())))));


--
-- Name: StockPrices Enable read access for all users; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Enable read access for all users" ON public."StockPrices" FOR SELECT USING (true);


--
-- Name: a Enable read access for all users; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Enable read access for all users" ON public.a FOR SELECT USING (true);


--
-- Name: profiles Enable read access for all users; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Enable read access for all users" ON public.profiles FOR SELECT USING (true);


--
-- Name: StockPrices; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public."StockPrices" ENABLE ROW LEVEL SECURITY;

--
-- Name: a; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.a ENABLE ROW LEVEL SECURITY;

--
-- Name: profiles; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

--
-- Name: messages; Type: ROW SECURITY; Schema: realtime; Owner: supabase_realtime_admin
--

ALTER TABLE realtime.messages ENABLE ROW LEVEL SECURITY;

--
-- Name: buckets; Type: ROW SECURITY; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE storage.buckets ENABLE ROW LEVEL SECURITY;

--
-- Name: migrations; Type: ROW SECURITY; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE storage.migrations ENABLE ROW LEVEL SECURITY;

--
-- Name: objects; Type: ROW SECURITY; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

--
-- Name: s3_multipart_uploads; Type: ROW SECURITY; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE storage.s3_multipart_uploads ENABLE ROW LEVEL SECURITY;

--
-- Name: s3_multipart_uploads_parts; Type: ROW SECURITY; Schema: storage; Owner: supabase_storage_admin
--

ALTER TABLE storage.s3_multipart_uploads_parts ENABLE ROW LEVEL SECURITY;

--
-- Name: supabase_realtime; Type: PUBLICATION; Schema: -; Owner: postgres
--

CREATE PUBLICATION supabase_realtime WITH (publish = 'insert, update, delete, truncate');


ALTER PUBLICATION supabase_realtime OWNER TO postgres;

--
-- Name: DATABASE postgres; Type: ACL; Schema: -; Owner: postgres
--

GRANT ALL ON DATABASE postgres TO dashboard_user;


--
-- Name: SCHEMA auth; Type: ACL; Schema: -; Owner: supabase_admin
--

GRANT USAGE ON SCHEMA auth TO anon;
GRANT USAGE ON SCHEMA auth TO authenticated;
GRANT USAGE ON SCHEMA auth TO service_role;
GRANT ALL ON SCHEMA auth TO supabase_auth_admin;
GRANT ALL ON SCHEMA auth TO dashboard_user;
GRANT USAGE ON SCHEMA auth TO postgres;


--
-- Name: SCHEMA depots; Type: ACL; Schema: -; Owner: postgres
--

GRANT USAGE ON SCHEMA depots TO authenticated;
GRANT USAGE ON SCHEMA depots TO anon;
GRANT USAGE ON SCHEMA depots TO service_role;


--
-- Name: SCHEMA extensions; Type: ACL; Schema: -; Owner: postgres
--

GRANT USAGE ON SCHEMA extensions TO anon;
GRANT USAGE ON SCHEMA extensions TO authenticated;
GRANT USAGE ON SCHEMA extensions TO service_role;
GRANT ALL ON SCHEMA extensions TO dashboard_user;


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: pg_database_owner
--

GRANT USAGE ON SCHEMA public TO postgres;
GRANT USAGE ON SCHEMA public TO anon;
GRANT USAGE ON SCHEMA public TO authenticated;
GRANT USAGE ON SCHEMA public TO service_role;


--
-- Name: SCHEMA realtime; Type: ACL; Schema: -; Owner: supabase_admin
--

GRANT USAGE ON SCHEMA realtime TO postgres;
GRANT USAGE ON SCHEMA realtime TO anon;
GRANT USAGE ON SCHEMA realtime TO authenticated;
GRANT USAGE ON SCHEMA realtime TO service_role;
GRANT ALL ON SCHEMA realtime TO supabase_realtime_admin;


--
-- Name: SCHEMA storage; Type: ACL; Schema: -; Owner: supabase_admin
--

GRANT USAGE ON SCHEMA storage TO postgres;
GRANT USAGE ON SCHEMA storage TO anon;
GRANT USAGE ON SCHEMA storage TO authenticated;
GRANT USAGE ON SCHEMA storage TO service_role;
GRANT ALL ON SCHEMA storage TO supabase_storage_admin;
GRANT ALL ON SCHEMA storage TO dashboard_user;


--
-- Name: SCHEMA vault; Type: ACL; Schema: -; Owner: supabase_admin
--

GRANT USAGE ON SCHEMA vault TO postgres WITH GRANT OPTION;
GRANT USAGE ON SCHEMA vault TO service_role;


--
-- Name: FUNCTION email(); Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT ALL ON FUNCTION auth.email() TO dashboard_user;
GRANT ALL ON FUNCTION auth.email() TO postgres;


--
-- Name: FUNCTION jwt(); Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT ALL ON FUNCTION auth.jwt() TO postgres;
GRANT ALL ON FUNCTION auth.jwt() TO dashboard_user;


--
-- Name: FUNCTION role(); Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT ALL ON FUNCTION auth.role() TO dashboard_user;
GRANT ALL ON FUNCTION auth.role() TO postgres;


--
-- Name: FUNCTION uid(); Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT ALL ON FUNCTION auth.uid() TO dashboard_user;
GRANT ALL ON FUNCTION auth.uid() TO postgres;


--
-- Name: FUNCTION algorithm_sign(signables text, secret text, algorithm text); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.algorithm_sign(signables text, secret text, algorithm text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.algorithm_sign(signables text, secret text, algorithm text) TO dashboard_user;


--
-- Name: FUNCTION armor(bytea); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.armor(bytea) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.armor(bytea) TO dashboard_user;


--
-- Name: FUNCTION armor(bytea, text[], text[]); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.armor(bytea, text[], text[]) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.armor(bytea, text[], text[]) TO dashboard_user;


--
-- Name: FUNCTION crypt(text, text); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.crypt(text, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.crypt(text, text) TO dashboard_user;


--
-- Name: FUNCTION dearmor(text); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.dearmor(text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.dearmor(text) TO dashboard_user;


--
-- Name: FUNCTION decrypt(bytea, bytea, text); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.decrypt(bytea, bytea, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.decrypt(bytea, bytea, text) TO dashboard_user;


--
-- Name: FUNCTION decrypt_iv(bytea, bytea, bytea, text); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.decrypt_iv(bytea, bytea, bytea, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.decrypt_iv(bytea, bytea, bytea, text) TO dashboard_user;


--
-- Name: FUNCTION digest(bytea, text); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.digest(bytea, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.digest(bytea, text) TO dashboard_user;


--
-- Name: FUNCTION digest(text, text); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.digest(text, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.digest(text, text) TO dashboard_user;


--
-- Name: FUNCTION encrypt(bytea, bytea, text); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.encrypt(bytea, bytea, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.encrypt(bytea, bytea, text) TO dashboard_user;


--
-- Name: FUNCTION encrypt_iv(bytea, bytea, bytea, text); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.encrypt_iv(bytea, bytea, bytea, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.encrypt_iv(bytea, bytea, bytea, text) TO dashboard_user;


--
-- Name: FUNCTION gen_random_bytes(integer); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.gen_random_bytes(integer) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.gen_random_bytes(integer) TO dashboard_user;


--
-- Name: FUNCTION gen_random_uuid(); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.gen_random_uuid() TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.gen_random_uuid() TO dashboard_user;


--
-- Name: FUNCTION gen_salt(text); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.gen_salt(text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.gen_salt(text) TO dashboard_user;


--
-- Name: FUNCTION gen_salt(text, integer); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.gen_salt(text, integer) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.gen_salt(text, integer) TO dashboard_user;


--
-- Name: FUNCTION grant_pg_cron_access(); Type: ACL; Schema: extensions; Owner: supabase_admin
--

REVOKE ALL ON FUNCTION extensions.grant_pg_cron_access() FROM supabase_admin;
GRANT ALL ON FUNCTION extensions.grant_pg_cron_access() TO supabase_admin WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.grant_pg_cron_access() TO dashboard_user;


--
-- Name: FUNCTION grant_pg_graphql_access(); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.grant_pg_graphql_access() TO postgres WITH GRANT OPTION;


--
-- Name: FUNCTION grant_pg_net_access(); Type: ACL; Schema: extensions; Owner: supabase_admin
--

REVOKE ALL ON FUNCTION extensions.grant_pg_net_access() FROM supabase_admin;
GRANT ALL ON FUNCTION extensions.grant_pg_net_access() TO supabase_admin WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.grant_pg_net_access() TO dashboard_user;


--
-- Name: FUNCTION hmac(bytea, bytea, text); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.hmac(bytea, bytea, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.hmac(bytea, bytea, text) TO dashboard_user;


--
-- Name: FUNCTION hmac(text, text, text); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.hmac(text, text, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.hmac(text, text, text) TO dashboard_user;


--
-- Name: FUNCTION pg_stat_statements(showtext boolean, OUT userid oid, OUT dbid oid, OUT toplevel boolean, OUT queryid bigint, OUT query text, OUT plans bigint, OUT total_plan_time double precision, OUT min_plan_time double precision, OUT max_plan_time double precision, OUT mean_plan_time double precision, OUT stddev_plan_time double precision, OUT calls bigint, OUT total_exec_time double precision, OUT min_exec_time double precision, OUT max_exec_time double precision, OUT mean_exec_time double precision, OUT stddev_exec_time double precision, OUT rows bigint, OUT shared_blks_hit bigint, OUT shared_blks_read bigint, OUT shared_blks_dirtied bigint, OUT shared_blks_written bigint, OUT local_blks_hit bigint, OUT local_blks_read bigint, OUT local_blks_dirtied bigint, OUT local_blks_written bigint, OUT temp_blks_read bigint, OUT temp_blks_written bigint, OUT blk_read_time double precision, OUT blk_write_time double precision, OUT temp_blk_read_time double precision, OUT temp_blk_write_time double precision, OUT wal_records bigint, OUT wal_fpi bigint, OUT wal_bytes numeric, OUT jit_functions bigint, OUT jit_generation_time double precision, OUT jit_inlining_count bigint, OUT jit_inlining_time double precision, OUT jit_optimization_count bigint, OUT jit_optimization_time double precision, OUT jit_emission_count bigint, OUT jit_emission_time double precision); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.pg_stat_statements(showtext boolean, OUT userid oid, OUT dbid oid, OUT toplevel boolean, OUT queryid bigint, OUT query text, OUT plans bigint, OUT total_plan_time double precision, OUT min_plan_time double precision, OUT max_plan_time double precision, OUT mean_plan_time double precision, OUT stddev_plan_time double precision, OUT calls bigint, OUT total_exec_time double precision, OUT min_exec_time double precision, OUT max_exec_time double precision, OUT mean_exec_time double precision, OUT stddev_exec_time double precision, OUT rows bigint, OUT shared_blks_hit bigint, OUT shared_blks_read bigint, OUT shared_blks_dirtied bigint, OUT shared_blks_written bigint, OUT local_blks_hit bigint, OUT local_blks_read bigint, OUT local_blks_dirtied bigint, OUT local_blks_written bigint, OUT temp_blks_read bigint, OUT temp_blks_written bigint, OUT blk_read_time double precision, OUT blk_write_time double precision, OUT temp_blk_read_time double precision, OUT temp_blk_write_time double precision, OUT wal_records bigint, OUT wal_fpi bigint, OUT wal_bytes numeric, OUT jit_functions bigint, OUT jit_generation_time double precision, OUT jit_inlining_count bigint, OUT jit_inlining_time double precision, OUT jit_optimization_count bigint, OUT jit_optimization_time double precision, OUT jit_emission_count bigint, OUT jit_emission_time double precision) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pg_stat_statements(showtext boolean, OUT userid oid, OUT dbid oid, OUT toplevel boolean, OUT queryid bigint, OUT query text, OUT plans bigint, OUT total_plan_time double precision, OUT min_plan_time double precision, OUT max_plan_time double precision, OUT mean_plan_time double precision, OUT stddev_plan_time double precision, OUT calls bigint, OUT total_exec_time double precision, OUT min_exec_time double precision, OUT max_exec_time double precision, OUT mean_exec_time double precision, OUT stddev_exec_time double precision, OUT rows bigint, OUT shared_blks_hit bigint, OUT shared_blks_read bigint, OUT shared_blks_dirtied bigint, OUT shared_blks_written bigint, OUT local_blks_hit bigint, OUT local_blks_read bigint, OUT local_blks_dirtied bigint, OUT local_blks_written bigint, OUT temp_blks_read bigint, OUT temp_blks_written bigint, OUT blk_read_time double precision, OUT blk_write_time double precision, OUT temp_blk_read_time double precision, OUT temp_blk_write_time double precision, OUT wal_records bigint, OUT wal_fpi bigint, OUT wal_bytes numeric, OUT jit_functions bigint, OUT jit_generation_time double precision, OUT jit_inlining_count bigint, OUT jit_inlining_time double precision, OUT jit_optimization_count bigint, OUT jit_optimization_time double precision, OUT jit_emission_count bigint, OUT jit_emission_time double precision) TO dashboard_user;


--
-- Name: FUNCTION pg_stat_statements_info(OUT dealloc bigint, OUT stats_reset timestamp with time zone); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.pg_stat_statements_info(OUT dealloc bigint, OUT stats_reset timestamp with time zone) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pg_stat_statements_info(OUT dealloc bigint, OUT stats_reset timestamp with time zone) TO dashboard_user;


--
-- Name: FUNCTION pg_stat_statements_reset(userid oid, dbid oid, queryid bigint); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.pg_stat_statements_reset(userid oid, dbid oid, queryid bigint) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pg_stat_statements_reset(userid oid, dbid oid, queryid bigint) TO dashboard_user;


--
-- Name: FUNCTION pgp_armor_headers(text, OUT key text, OUT value text); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.pgp_armor_headers(text, OUT key text, OUT value text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_armor_headers(text, OUT key text, OUT value text) TO dashboard_user;


--
-- Name: FUNCTION pgp_key_id(bytea); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.pgp_key_id(bytea) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_key_id(bytea) TO dashboard_user;


--
-- Name: FUNCTION pgp_pub_decrypt(bytea, bytea); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.pgp_pub_decrypt(bytea, bytea) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_pub_decrypt(bytea, bytea) TO dashboard_user;


--
-- Name: FUNCTION pgp_pub_decrypt(bytea, bytea, text); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.pgp_pub_decrypt(bytea, bytea, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_pub_decrypt(bytea, bytea, text) TO dashboard_user;


--
-- Name: FUNCTION pgp_pub_decrypt(bytea, bytea, text, text); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.pgp_pub_decrypt(bytea, bytea, text, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_pub_decrypt(bytea, bytea, text, text) TO dashboard_user;


--
-- Name: FUNCTION pgp_pub_decrypt_bytea(bytea, bytea); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.pgp_pub_decrypt_bytea(bytea, bytea) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_pub_decrypt_bytea(bytea, bytea) TO dashboard_user;


--
-- Name: FUNCTION pgp_pub_decrypt_bytea(bytea, bytea, text); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.pgp_pub_decrypt_bytea(bytea, bytea, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_pub_decrypt_bytea(bytea, bytea, text) TO dashboard_user;


--
-- Name: FUNCTION pgp_pub_decrypt_bytea(bytea, bytea, text, text); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.pgp_pub_decrypt_bytea(bytea, bytea, text, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_pub_decrypt_bytea(bytea, bytea, text, text) TO dashboard_user;


--
-- Name: FUNCTION pgp_pub_encrypt(text, bytea); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.pgp_pub_encrypt(text, bytea) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_pub_encrypt(text, bytea) TO dashboard_user;


--
-- Name: FUNCTION pgp_pub_encrypt(text, bytea, text); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.pgp_pub_encrypt(text, bytea, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_pub_encrypt(text, bytea, text) TO dashboard_user;


--
-- Name: FUNCTION pgp_pub_encrypt_bytea(bytea, bytea); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.pgp_pub_encrypt_bytea(bytea, bytea) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_pub_encrypt_bytea(bytea, bytea) TO dashboard_user;


--
-- Name: FUNCTION pgp_pub_encrypt_bytea(bytea, bytea, text); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.pgp_pub_encrypt_bytea(bytea, bytea, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_pub_encrypt_bytea(bytea, bytea, text) TO dashboard_user;


--
-- Name: FUNCTION pgp_sym_decrypt(bytea, text); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.pgp_sym_decrypt(bytea, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_sym_decrypt(bytea, text) TO dashboard_user;


--
-- Name: FUNCTION pgp_sym_decrypt(bytea, text, text); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.pgp_sym_decrypt(bytea, text, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_sym_decrypt(bytea, text, text) TO dashboard_user;


--
-- Name: FUNCTION pgp_sym_decrypt_bytea(bytea, text); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.pgp_sym_decrypt_bytea(bytea, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_sym_decrypt_bytea(bytea, text) TO dashboard_user;


--
-- Name: FUNCTION pgp_sym_decrypt_bytea(bytea, text, text); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.pgp_sym_decrypt_bytea(bytea, text, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_sym_decrypt_bytea(bytea, text, text) TO dashboard_user;


--
-- Name: FUNCTION pgp_sym_encrypt(text, text); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.pgp_sym_encrypt(text, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_sym_encrypt(text, text) TO dashboard_user;


--
-- Name: FUNCTION pgp_sym_encrypt(text, text, text); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.pgp_sym_encrypt(text, text, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_sym_encrypt(text, text, text) TO dashboard_user;


--
-- Name: FUNCTION pgp_sym_encrypt_bytea(bytea, text); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.pgp_sym_encrypt_bytea(bytea, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_sym_encrypt_bytea(bytea, text) TO dashboard_user;


--
-- Name: FUNCTION pgp_sym_encrypt_bytea(bytea, text, text); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.pgp_sym_encrypt_bytea(bytea, text, text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.pgp_sym_encrypt_bytea(bytea, text, text) TO dashboard_user;


--
-- Name: FUNCTION pgrst_ddl_watch(); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.pgrst_ddl_watch() TO postgres WITH GRANT OPTION;


--
-- Name: FUNCTION pgrst_drop_watch(); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.pgrst_drop_watch() TO postgres WITH GRANT OPTION;


--
-- Name: FUNCTION set_graphql_placeholder(); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.set_graphql_placeholder() TO postgres WITH GRANT OPTION;


--
-- Name: FUNCTION sign(payload json, secret text, algorithm text); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.sign(payload json, secret text, algorithm text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.sign(payload json, secret text, algorithm text) TO dashboard_user;


--
-- Name: FUNCTION try_cast_double(inp text); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.try_cast_double(inp text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.try_cast_double(inp text) TO dashboard_user;


--
-- Name: FUNCTION url_decode(data text); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.url_decode(data text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.url_decode(data text) TO dashboard_user;


--
-- Name: FUNCTION url_encode(data bytea); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.url_encode(data bytea) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.url_encode(data bytea) TO dashboard_user;


--
-- Name: FUNCTION uuid_generate_v1(); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.uuid_generate_v1() TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.uuid_generate_v1() TO dashboard_user;


--
-- Name: FUNCTION uuid_generate_v1mc(); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.uuid_generate_v1mc() TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.uuid_generate_v1mc() TO dashboard_user;


--
-- Name: FUNCTION uuid_generate_v3(namespace uuid, name text); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.uuid_generate_v3(namespace uuid, name text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.uuid_generate_v3(namespace uuid, name text) TO dashboard_user;


--
-- Name: FUNCTION uuid_generate_v4(); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.uuid_generate_v4() TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.uuid_generate_v4() TO dashboard_user;


--
-- Name: FUNCTION uuid_generate_v5(namespace uuid, name text); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.uuid_generate_v5(namespace uuid, name text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.uuid_generate_v5(namespace uuid, name text) TO dashboard_user;


--
-- Name: FUNCTION uuid_nil(); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.uuid_nil() TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.uuid_nil() TO dashboard_user;


--
-- Name: FUNCTION uuid_ns_dns(); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.uuid_ns_dns() TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.uuid_ns_dns() TO dashboard_user;


--
-- Name: FUNCTION uuid_ns_oid(); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.uuid_ns_oid() TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.uuid_ns_oid() TO dashboard_user;


--
-- Name: FUNCTION uuid_ns_url(); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.uuid_ns_url() TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.uuid_ns_url() TO dashboard_user;


--
-- Name: FUNCTION uuid_ns_x500(); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.uuid_ns_x500() TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.uuid_ns_x500() TO dashboard_user;


--
-- Name: FUNCTION verify(token text, secret text, algorithm text); Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT ALL ON FUNCTION extensions.verify(token text, secret text, algorithm text) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION extensions.verify(token text, secret text, algorithm text) TO dashboard_user;


--
-- Name: FUNCTION graphql("operationName" text, query text, variables jsonb, extensions jsonb); Type: ACL; Schema: graphql_public; Owner: supabase_admin
--

GRANT ALL ON FUNCTION graphql_public.graphql("operationName" text, query text, variables jsonb, extensions jsonb) TO postgres;
GRANT ALL ON FUNCTION graphql_public.graphql("operationName" text, query text, variables jsonb, extensions jsonb) TO anon;
GRANT ALL ON FUNCTION graphql_public.graphql("operationName" text, query text, variables jsonb, extensions jsonb) TO authenticated;
GRANT ALL ON FUNCTION graphql_public.graphql("operationName" text, query text, variables jsonb, extensions jsonb) TO service_role;


--
-- Name: FUNCTION get_auth(p_usename text); Type: ACL; Schema: pgbouncer; Owner: supabase_admin
--

REVOKE ALL ON FUNCTION pgbouncer.get_auth(p_usename text) FROM PUBLIC;
GRANT ALL ON FUNCTION pgbouncer.get_auth(p_usename text) TO pgbouncer;
GRANT ALL ON FUNCTION pgbouncer.get_auth(p_usename text) TO postgres;


--
-- Name: FUNCTION crypto_aead_det_decrypt(message bytea, additional bytea, key_uuid uuid, nonce bytea); Type: ACL; Schema: pgsodium; Owner: pgsodium_keymaker
--

GRANT ALL ON FUNCTION pgsodium.crypto_aead_det_decrypt(message bytea, additional bytea, key_uuid uuid, nonce bytea) TO service_role;


--
-- Name: FUNCTION crypto_aead_det_encrypt(message bytea, additional bytea, key_uuid uuid, nonce bytea); Type: ACL; Schema: pgsodium; Owner: pgsodium_keymaker
--

GRANT ALL ON FUNCTION pgsodium.crypto_aead_det_encrypt(message bytea, additional bytea, key_uuid uuid, nonce bytea) TO service_role;


--
-- Name: FUNCTION crypto_aead_det_keygen(); Type: ACL; Schema: pgsodium; Owner: supabase_admin
--

GRANT ALL ON FUNCTION pgsodium.crypto_aead_det_keygen() TO service_role;


--
-- Name: FUNCTION batch_update_depot_values(start_date date, end_date date); Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON FUNCTION public.batch_update_depot_values(start_date date, end_date date) TO anon;
GRANT ALL ON FUNCTION public.batch_update_depot_values(start_date date, end_date date) TO authenticated;
GRANT ALL ON FUNCTION public.batch_update_depot_values(start_date date, end_date date) TO service_role;


--
-- Name: FUNCTION batch_update_depot_values(depot_id bigint, start_date date, end_date date); Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON FUNCTION public.batch_update_depot_values(depot_id bigint, start_date date, end_date date) TO anon;
GRANT ALL ON FUNCTION public.batch_update_depot_values(depot_id bigint, start_date date, end_date date) TO authenticated;
GRANT ALL ON FUNCTION public.batch_update_depot_values(depot_id bigint, start_date date, end_date date) TO service_role;


--
-- Name: FUNCTION batch_update_depot_values_s(depot_id integer, start_date date, end_date date); Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON FUNCTION public.batch_update_depot_values_s(depot_id integer, start_date date, end_date date) TO anon;
GRANT ALL ON FUNCTION public.batch_update_depot_values_s(depot_id integer, start_date date, end_date date) TO authenticated;
GRANT ALL ON FUNCTION public.batch_update_depot_values_s(depot_id integer, start_date date, end_date date) TO service_role;


--
-- Name: FUNCTION batch_update_depot_values_s(depot_id bigint, start_date date, end_date date); Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON FUNCTION public.batch_update_depot_values_s(depot_id bigint, start_date date, end_date date) TO anon;
GRANT ALL ON FUNCTION public.batch_update_depot_values_s(depot_id bigint, start_date date, end_date date) TO authenticated;
GRANT ALL ON FUNCTION public.batch_update_depot_values_s(depot_id bigint, start_date date, end_date date) TO service_role;


--
-- Name: FUNCTION buy_stock(p_timestamp date, p_depot_id bigint, p_stock_id bigint, p_amount integer); Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON FUNCTION public.buy_stock(p_timestamp date, p_depot_id bigint, p_stock_id bigint, p_amount integer) TO anon;
GRANT ALL ON FUNCTION public.buy_stock(p_timestamp date, p_depot_id bigint, p_stock_id bigint, p_amount integer) TO authenticated;
GRANT ALL ON FUNCTION public.buy_stock(p_timestamp date, p_depot_id bigint, p_stock_id bigint, p_amount integer) TO service_role;


--
-- Name: FUNCTION dblink(text); Type: ACL; Schema: public; Owner: supabase_admin
--

GRANT ALL ON FUNCTION public.dblink(text) TO postgres;
GRANT ALL ON FUNCTION public.dblink(text) TO anon;
GRANT ALL ON FUNCTION public.dblink(text) TO authenticated;
GRANT ALL ON FUNCTION public.dblink(text) TO service_role;


--
-- Name: FUNCTION dblink(text, boolean); Type: ACL; Schema: public; Owner: supabase_admin
--

GRANT ALL ON FUNCTION public.dblink(text, boolean) TO postgres;
GRANT ALL ON FUNCTION public.dblink(text, boolean) TO anon;
GRANT ALL ON FUNCTION public.dblink(text, boolean) TO authenticated;
GRANT ALL ON FUNCTION public.dblink(text, boolean) TO service_role;


--
-- Name: FUNCTION dblink(text, text); Type: ACL; Schema: public; Owner: supabase_admin
--

GRANT ALL ON FUNCTION public.dblink(text, text) TO postgres;
GRANT ALL ON FUNCTION public.dblink(text, text) TO anon;
GRANT ALL ON FUNCTION public.dblink(text, text) TO authenticated;
GRANT ALL ON FUNCTION public.dblink(text, text) TO service_role;


--
-- Name: FUNCTION dblink(text, text, boolean); Type: ACL; Schema: public; Owner: supabase_admin
--

GRANT ALL ON FUNCTION public.dblink(text, text, boolean) TO postgres;
GRANT ALL ON FUNCTION public.dblink(text, text, boolean) TO anon;
GRANT ALL ON FUNCTION public.dblink(text, text, boolean) TO authenticated;
GRANT ALL ON FUNCTION public.dblink(text, text, boolean) TO service_role;


--
-- Name: FUNCTION dblink_build_sql_delete(text, int2vector, integer, text[]); Type: ACL; Schema: public; Owner: supabase_admin
--

GRANT ALL ON FUNCTION public.dblink_build_sql_delete(text, int2vector, integer, text[]) TO postgres;
GRANT ALL ON FUNCTION public.dblink_build_sql_delete(text, int2vector, integer, text[]) TO anon;
GRANT ALL ON FUNCTION public.dblink_build_sql_delete(text, int2vector, integer, text[]) TO authenticated;
GRANT ALL ON FUNCTION public.dblink_build_sql_delete(text, int2vector, integer, text[]) TO service_role;


--
-- Name: FUNCTION dblink_build_sql_insert(text, int2vector, integer, text[], text[]); Type: ACL; Schema: public; Owner: supabase_admin
--

GRANT ALL ON FUNCTION public.dblink_build_sql_insert(text, int2vector, integer, text[], text[]) TO postgres;
GRANT ALL ON FUNCTION public.dblink_build_sql_insert(text, int2vector, integer, text[], text[]) TO anon;
GRANT ALL ON FUNCTION public.dblink_build_sql_insert(text, int2vector, integer, text[], text[]) TO authenticated;
GRANT ALL ON FUNCTION public.dblink_build_sql_insert(text, int2vector, integer, text[], text[]) TO service_role;


--
-- Name: FUNCTION dblink_build_sql_update(text, int2vector, integer, text[], text[]); Type: ACL; Schema: public; Owner: supabase_admin
--

GRANT ALL ON FUNCTION public.dblink_build_sql_update(text, int2vector, integer, text[], text[]) TO postgres;
GRANT ALL ON FUNCTION public.dblink_build_sql_update(text, int2vector, integer, text[], text[]) TO anon;
GRANT ALL ON FUNCTION public.dblink_build_sql_update(text, int2vector, integer, text[], text[]) TO authenticated;
GRANT ALL ON FUNCTION public.dblink_build_sql_update(text, int2vector, integer, text[], text[]) TO service_role;


--
-- Name: FUNCTION dblink_cancel_query(text); Type: ACL; Schema: public; Owner: supabase_admin
--

GRANT ALL ON FUNCTION public.dblink_cancel_query(text) TO postgres;
GRANT ALL ON FUNCTION public.dblink_cancel_query(text) TO anon;
GRANT ALL ON FUNCTION public.dblink_cancel_query(text) TO authenticated;
GRANT ALL ON FUNCTION public.dblink_cancel_query(text) TO service_role;


--
-- Name: FUNCTION dblink_close(text); Type: ACL; Schema: public; Owner: supabase_admin
--

GRANT ALL ON FUNCTION public.dblink_close(text) TO postgres;
GRANT ALL ON FUNCTION public.dblink_close(text) TO anon;
GRANT ALL ON FUNCTION public.dblink_close(text) TO authenticated;
GRANT ALL ON FUNCTION public.dblink_close(text) TO service_role;


--
-- Name: FUNCTION dblink_close(text, boolean); Type: ACL; Schema: public; Owner: supabase_admin
--

GRANT ALL ON FUNCTION public.dblink_close(text, boolean) TO postgres;
GRANT ALL ON FUNCTION public.dblink_close(text, boolean) TO anon;
GRANT ALL ON FUNCTION public.dblink_close(text, boolean) TO authenticated;
GRANT ALL ON FUNCTION public.dblink_close(text, boolean) TO service_role;


--
-- Name: FUNCTION dblink_close(text, text); Type: ACL; Schema: public; Owner: supabase_admin
--

GRANT ALL ON FUNCTION public.dblink_close(text, text) TO postgres;
GRANT ALL ON FUNCTION public.dblink_close(text, text) TO anon;
GRANT ALL ON FUNCTION public.dblink_close(text, text) TO authenticated;
GRANT ALL ON FUNCTION public.dblink_close(text, text) TO service_role;


--
-- Name: FUNCTION dblink_close(text, text, boolean); Type: ACL; Schema: public; Owner: supabase_admin
--

GRANT ALL ON FUNCTION public.dblink_close(text, text, boolean) TO postgres;
GRANT ALL ON FUNCTION public.dblink_close(text, text, boolean) TO anon;
GRANT ALL ON FUNCTION public.dblink_close(text, text, boolean) TO authenticated;
GRANT ALL ON FUNCTION public.dblink_close(text, text, boolean) TO service_role;


--
-- Name: FUNCTION dblink_connect(text); Type: ACL; Schema: public; Owner: supabase_admin
--

GRANT ALL ON FUNCTION public.dblink_connect(text) TO postgres;
GRANT ALL ON FUNCTION public.dblink_connect(text) TO anon;
GRANT ALL ON FUNCTION public.dblink_connect(text) TO authenticated;
GRANT ALL ON FUNCTION public.dblink_connect(text) TO service_role;


--
-- Name: FUNCTION dblink_connect(text, text); Type: ACL; Schema: public; Owner: supabase_admin
--

GRANT ALL ON FUNCTION public.dblink_connect(text, text) TO postgres;
GRANT ALL ON FUNCTION public.dblink_connect(text, text) TO anon;
GRANT ALL ON FUNCTION public.dblink_connect(text, text) TO authenticated;
GRANT ALL ON FUNCTION public.dblink_connect(text, text) TO service_role;


--
-- Name: FUNCTION dblink_current_query(); Type: ACL; Schema: public; Owner: supabase_admin
--

GRANT ALL ON FUNCTION public.dblink_current_query() TO postgres;
GRANT ALL ON FUNCTION public.dblink_current_query() TO anon;
GRANT ALL ON FUNCTION public.dblink_current_query() TO authenticated;
GRANT ALL ON FUNCTION public.dblink_current_query() TO service_role;


--
-- Name: FUNCTION dblink_disconnect(); Type: ACL; Schema: public; Owner: supabase_admin
--

GRANT ALL ON FUNCTION public.dblink_disconnect() TO postgres;
GRANT ALL ON FUNCTION public.dblink_disconnect() TO anon;
GRANT ALL ON FUNCTION public.dblink_disconnect() TO authenticated;
GRANT ALL ON FUNCTION public.dblink_disconnect() TO service_role;


--
-- Name: FUNCTION dblink_disconnect(text); Type: ACL; Schema: public; Owner: supabase_admin
--

GRANT ALL ON FUNCTION public.dblink_disconnect(text) TO postgres;
GRANT ALL ON FUNCTION public.dblink_disconnect(text) TO anon;
GRANT ALL ON FUNCTION public.dblink_disconnect(text) TO authenticated;
GRANT ALL ON FUNCTION public.dblink_disconnect(text) TO service_role;


--
-- Name: FUNCTION dblink_error_message(text); Type: ACL; Schema: public; Owner: supabase_admin
--

GRANT ALL ON FUNCTION public.dblink_error_message(text) TO postgres;
GRANT ALL ON FUNCTION public.dblink_error_message(text) TO anon;
GRANT ALL ON FUNCTION public.dblink_error_message(text) TO authenticated;
GRANT ALL ON FUNCTION public.dblink_error_message(text) TO service_role;


--
-- Name: FUNCTION dblink_exec(text); Type: ACL; Schema: public; Owner: supabase_admin
--

GRANT ALL ON FUNCTION public.dblink_exec(text) TO postgres;
GRANT ALL ON FUNCTION public.dblink_exec(text) TO anon;
GRANT ALL ON FUNCTION public.dblink_exec(text) TO authenticated;
GRANT ALL ON FUNCTION public.dblink_exec(text) TO service_role;


--
-- Name: FUNCTION dblink_exec(text, boolean); Type: ACL; Schema: public; Owner: supabase_admin
--

GRANT ALL ON FUNCTION public.dblink_exec(text, boolean) TO postgres;
GRANT ALL ON FUNCTION public.dblink_exec(text, boolean) TO anon;
GRANT ALL ON FUNCTION public.dblink_exec(text, boolean) TO authenticated;
GRANT ALL ON FUNCTION public.dblink_exec(text, boolean) TO service_role;


--
-- Name: FUNCTION dblink_exec(text, text); Type: ACL; Schema: public; Owner: supabase_admin
--

GRANT ALL ON FUNCTION public.dblink_exec(text, text) TO postgres;
GRANT ALL ON FUNCTION public.dblink_exec(text, text) TO anon;
GRANT ALL ON FUNCTION public.dblink_exec(text, text) TO authenticated;
GRANT ALL ON FUNCTION public.dblink_exec(text, text) TO service_role;


--
-- Name: FUNCTION dblink_exec(text, text, boolean); Type: ACL; Schema: public; Owner: supabase_admin
--

GRANT ALL ON FUNCTION public.dblink_exec(text, text, boolean) TO postgres;
GRANT ALL ON FUNCTION public.dblink_exec(text, text, boolean) TO anon;
GRANT ALL ON FUNCTION public.dblink_exec(text, text, boolean) TO authenticated;
GRANT ALL ON FUNCTION public.dblink_exec(text, text, boolean) TO service_role;


--
-- Name: FUNCTION dblink_fdw_validator(options text[], catalog oid); Type: ACL; Schema: public; Owner: supabase_admin
--

GRANT ALL ON FUNCTION public.dblink_fdw_validator(options text[], catalog oid) TO postgres;
GRANT ALL ON FUNCTION public.dblink_fdw_validator(options text[], catalog oid) TO anon;
GRANT ALL ON FUNCTION public.dblink_fdw_validator(options text[], catalog oid) TO authenticated;
GRANT ALL ON FUNCTION public.dblink_fdw_validator(options text[], catalog oid) TO service_role;


--
-- Name: FUNCTION dblink_fetch(text, integer); Type: ACL; Schema: public; Owner: supabase_admin
--

GRANT ALL ON FUNCTION public.dblink_fetch(text, integer) TO postgres;
GRANT ALL ON FUNCTION public.dblink_fetch(text, integer) TO anon;
GRANT ALL ON FUNCTION public.dblink_fetch(text, integer) TO authenticated;
GRANT ALL ON FUNCTION public.dblink_fetch(text, integer) TO service_role;


--
-- Name: FUNCTION dblink_fetch(text, integer, boolean); Type: ACL; Schema: public; Owner: supabase_admin
--

GRANT ALL ON FUNCTION public.dblink_fetch(text, integer, boolean) TO postgres;
GRANT ALL ON FUNCTION public.dblink_fetch(text, integer, boolean) TO anon;
GRANT ALL ON FUNCTION public.dblink_fetch(text, integer, boolean) TO authenticated;
GRANT ALL ON FUNCTION public.dblink_fetch(text, integer, boolean) TO service_role;


--
-- Name: FUNCTION dblink_fetch(text, text, integer); Type: ACL; Schema: public; Owner: supabase_admin
--

GRANT ALL ON FUNCTION public.dblink_fetch(text, text, integer) TO postgres;
GRANT ALL ON FUNCTION public.dblink_fetch(text, text, integer) TO anon;
GRANT ALL ON FUNCTION public.dblink_fetch(text, text, integer) TO authenticated;
GRANT ALL ON FUNCTION public.dblink_fetch(text, text, integer) TO service_role;


--
-- Name: FUNCTION dblink_fetch(text, text, integer, boolean); Type: ACL; Schema: public; Owner: supabase_admin
--

GRANT ALL ON FUNCTION public.dblink_fetch(text, text, integer, boolean) TO postgres;
GRANT ALL ON FUNCTION public.dblink_fetch(text, text, integer, boolean) TO anon;
GRANT ALL ON FUNCTION public.dblink_fetch(text, text, integer, boolean) TO authenticated;
GRANT ALL ON FUNCTION public.dblink_fetch(text, text, integer, boolean) TO service_role;


--
-- Name: FUNCTION dblink_get_connections(); Type: ACL; Schema: public; Owner: supabase_admin
--

GRANT ALL ON FUNCTION public.dblink_get_connections() TO postgres;
GRANT ALL ON FUNCTION public.dblink_get_connections() TO anon;
GRANT ALL ON FUNCTION public.dblink_get_connections() TO authenticated;
GRANT ALL ON FUNCTION public.dblink_get_connections() TO service_role;


--
-- Name: FUNCTION dblink_get_notify(OUT notify_name text, OUT be_pid integer, OUT extra text); Type: ACL; Schema: public; Owner: supabase_admin
--

GRANT ALL ON FUNCTION public.dblink_get_notify(OUT notify_name text, OUT be_pid integer, OUT extra text) TO postgres;
GRANT ALL ON FUNCTION public.dblink_get_notify(OUT notify_name text, OUT be_pid integer, OUT extra text) TO anon;
GRANT ALL ON FUNCTION public.dblink_get_notify(OUT notify_name text, OUT be_pid integer, OUT extra text) TO authenticated;
GRANT ALL ON FUNCTION public.dblink_get_notify(OUT notify_name text, OUT be_pid integer, OUT extra text) TO service_role;


--
-- Name: FUNCTION dblink_get_notify(conname text, OUT notify_name text, OUT be_pid integer, OUT extra text); Type: ACL; Schema: public; Owner: supabase_admin
--

GRANT ALL ON FUNCTION public.dblink_get_notify(conname text, OUT notify_name text, OUT be_pid integer, OUT extra text) TO postgres;
GRANT ALL ON FUNCTION public.dblink_get_notify(conname text, OUT notify_name text, OUT be_pid integer, OUT extra text) TO anon;
GRANT ALL ON FUNCTION public.dblink_get_notify(conname text, OUT notify_name text, OUT be_pid integer, OUT extra text) TO authenticated;
GRANT ALL ON FUNCTION public.dblink_get_notify(conname text, OUT notify_name text, OUT be_pid integer, OUT extra text) TO service_role;


--
-- Name: FUNCTION dblink_get_pkey(text); Type: ACL; Schema: public; Owner: supabase_admin
--

GRANT ALL ON FUNCTION public.dblink_get_pkey(text) TO postgres;
GRANT ALL ON FUNCTION public.dblink_get_pkey(text) TO anon;
GRANT ALL ON FUNCTION public.dblink_get_pkey(text) TO authenticated;
GRANT ALL ON FUNCTION public.dblink_get_pkey(text) TO service_role;


--
-- Name: FUNCTION dblink_get_result(text); Type: ACL; Schema: public; Owner: supabase_admin
--

GRANT ALL ON FUNCTION public.dblink_get_result(text) TO postgres;
GRANT ALL ON FUNCTION public.dblink_get_result(text) TO anon;
GRANT ALL ON FUNCTION public.dblink_get_result(text) TO authenticated;
GRANT ALL ON FUNCTION public.dblink_get_result(text) TO service_role;


--
-- Name: FUNCTION dblink_get_result(text, boolean); Type: ACL; Schema: public; Owner: supabase_admin
--

GRANT ALL ON FUNCTION public.dblink_get_result(text, boolean) TO postgres;
GRANT ALL ON FUNCTION public.dblink_get_result(text, boolean) TO anon;
GRANT ALL ON FUNCTION public.dblink_get_result(text, boolean) TO authenticated;
GRANT ALL ON FUNCTION public.dblink_get_result(text, boolean) TO service_role;


--
-- Name: FUNCTION dblink_is_busy(text); Type: ACL; Schema: public; Owner: supabase_admin
--

GRANT ALL ON FUNCTION public.dblink_is_busy(text) TO postgres;
GRANT ALL ON FUNCTION public.dblink_is_busy(text) TO anon;
GRANT ALL ON FUNCTION public.dblink_is_busy(text) TO authenticated;
GRANT ALL ON FUNCTION public.dblink_is_busy(text) TO service_role;


--
-- Name: FUNCTION dblink_open(text, text); Type: ACL; Schema: public; Owner: supabase_admin
--

GRANT ALL ON FUNCTION public.dblink_open(text, text) TO postgres;
GRANT ALL ON FUNCTION public.dblink_open(text, text) TO anon;
GRANT ALL ON FUNCTION public.dblink_open(text, text) TO authenticated;
GRANT ALL ON FUNCTION public.dblink_open(text, text) TO service_role;


--
-- Name: FUNCTION dblink_open(text, text, boolean); Type: ACL; Schema: public; Owner: supabase_admin
--

GRANT ALL ON FUNCTION public.dblink_open(text, text, boolean) TO postgres;
GRANT ALL ON FUNCTION public.dblink_open(text, text, boolean) TO anon;
GRANT ALL ON FUNCTION public.dblink_open(text, text, boolean) TO authenticated;
GRANT ALL ON FUNCTION public.dblink_open(text, text, boolean) TO service_role;


--
-- Name: FUNCTION dblink_open(text, text, text); Type: ACL; Schema: public; Owner: supabase_admin
--

GRANT ALL ON FUNCTION public.dblink_open(text, text, text) TO postgres;
GRANT ALL ON FUNCTION public.dblink_open(text, text, text) TO anon;
GRANT ALL ON FUNCTION public.dblink_open(text, text, text) TO authenticated;
GRANT ALL ON FUNCTION public.dblink_open(text, text, text) TO service_role;


--
-- Name: FUNCTION dblink_open(text, text, text, boolean); Type: ACL; Schema: public; Owner: supabase_admin
--

GRANT ALL ON FUNCTION public.dblink_open(text, text, text, boolean) TO postgres;
GRANT ALL ON FUNCTION public.dblink_open(text, text, text, boolean) TO anon;
GRANT ALL ON FUNCTION public.dblink_open(text, text, text, boolean) TO authenticated;
GRANT ALL ON FUNCTION public.dblink_open(text, text, text, boolean) TO service_role;


--
-- Name: FUNCTION dblink_send_query(text, text); Type: ACL; Schema: public; Owner: supabase_admin
--

GRANT ALL ON FUNCTION public.dblink_send_query(text, text) TO postgres;
GRANT ALL ON FUNCTION public.dblink_send_query(text, text) TO anon;
GRANT ALL ON FUNCTION public.dblink_send_query(text, text) TO authenticated;
GRANT ALL ON FUNCTION public.dblink_send_query(text, text) TO service_role;


--
-- Name: FUNCTION get_depot_positions(depot_id_param integer, price_count_param integer); Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON FUNCTION public.get_depot_positions(depot_id_param integer, price_count_param integer) TO anon;
GRANT ALL ON FUNCTION public.get_depot_positions(depot_id_param integer, price_count_param integer) TO authenticated;
GRANT ALL ON FUNCTION public.get_depot_positions(depot_id_param integer, price_count_param integer) TO service_role;


--
-- Name: FUNCTION get_depot_values(p_depot_id bigint, p_interval_start date, p_interval_end date); Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON FUNCTION public.get_depot_values(p_depot_id bigint, p_interval_start date, p_interval_end date) TO anon;
GRANT ALL ON FUNCTION public.get_depot_values(p_depot_id bigint, p_interval_start date, p_interval_end date) TO authenticated;
GRANT ALL ON FUNCTION public.get_depot_values(p_depot_id bigint, p_interval_start date, p_interval_end date) TO service_role;


--
-- Name: FUNCTION get_depots_of_user(user_id uuid); Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON FUNCTION public.get_depots_of_user(user_id uuid) TO anon;
GRANT ALL ON FUNCTION public.get_depots_of_user(user_id uuid) TO authenticated;
GRANT ALL ON FUNCTION public.get_depots_of_user(user_id uuid) TO service_role;


--
-- Name: FUNCTION get_last_stock_prices(p_stock_id bigint, limit_arg integer); Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON FUNCTION public.get_last_stock_prices(p_stock_id bigint, limit_arg integer) TO anon;
GRANT ALL ON FUNCTION public.get_last_stock_prices(p_stock_id bigint, limit_arg integer) TO authenticated;
GRANT ALL ON FUNCTION public.get_last_stock_prices(p_stock_id bigint, limit_arg integer) TO service_role;


--
-- Name: FUNCTION get_stock_info_by_id(p_stock_id bigint); Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON FUNCTION public.get_stock_info_by_id(p_stock_id bigint) TO anon;
GRANT ALL ON FUNCTION public.get_stock_info_by_id(p_stock_id bigint) TO authenticated;
GRANT ALL ON FUNCTION public.get_stock_info_by_id(p_stock_id bigint) TO service_role;


--
-- Name: FUNCTION get_stock_position(p_depot_id bigint, p_stock_id bigint); Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON FUNCTION public.get_stock_position(p_depot_id bigint, p_stock_id bigint) TO anon;
GRANT ALL ON FUNCTION public.get_stock_position(p_depot_id bigint, p_stock_id bigint) TO authenticated;
GRANT ALL ON FUNCTION public.get_stock_position(p_depot_id bigint, p_stock_id bigint) TO service_role;


--
-- Name: FUNCTION get_stock_prices_by_interval(p_stock_id bigint, p_interval_start date, p_interval_end date); Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON FUNCTION public.get_stock_prices_by_interval(p_stock_id bigint, p_interval_start date, p_interval_end date) TO anon;
GRANT ALL ON FUNCTION public.get_stock_prices_by_interval(p_stock_id bigint, p_interval_start date, p_interval_end date) TO authenticated;
GRANT ALL ON FUNCTION public.get_stock_prices_by_interval(p_stock_id bigint, p_interval_start date, p_interval_end date) TO service_role;


--
-- Name: FUNCTION get_test_depot_positions(depot_id_param integer); Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON FUNCTION public.get_test_depot_positions(depot_id_param integer) TO anon;
GRANT ALL ON FUNCTION public.get_test_depot_positions(depot_id_param integer) TO authenticated;
GRANT ALL ON FUNCTION public.get_test_depot_positions(depot_id_param integer) TO service_role;


--
-- Name: FUNCTION handle_new_user(); Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON FUNCTION public.handle_new_user() TO anon;
GRANT ALL ON FUNCTION public.handle_new_user() TO authenticated;
GRANT ALL ON FUNCTION public.handle_new_user() TO service_role;


--
-- Name: FUNCTION log_transaction(p_timestamp date, p_stock_id bigint, p_depot_id bigint, p_amount integer, p_price double precision); Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON FUNCTION public.log_transaction(p_timestamp date, p_stock_id bigint, p_depot_id bigint, p_amount integer, p_price double precision) TO anon;
GRANT ALL ON FUNCTION public.log_transaction(p_timestamp date, p_stock_id bigint, p_depot_id bigint, p_amount integer, p_price double precision) TO authenticated;
GRANT ALL ON FUNCTION public.log_transaction(p_timestamp date, p_stock_id bigint, p_depot_id bigint, p_amount integer, p_price double precision) TO service_role;


--
-- Name: FUNCTION paginate_stock_symbols(chunk_size integer, chunk_number integer); Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON FUNCTION public.paginate_stock_symbols(chunk_size integer, chunk_number integer) TO anon;
GRANT ALL ON FUNCTION public.paginate_stock_symbols(chunk_size integer, chunk_number integer) TO authenticated;
GRANT ALL ON FUNCTION public.paginate_stock_symbols(chunk_size integer, chunk_number integer) TO service_role;


--
-- Name: FUNCTION search_stock_info(search_query text); Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON FUNCTION public.search_stock_info(search_query text) TO anon;
GRANT ALL ON FUNCTION public.search_stock_info(search_query text) TO authenticated;
GRANT ALL ON FUNCTION public.search_stock_info(search_query text) TO service_role;


--
-- Name: FUNCTION search_stock_info(search_query text, limit_arg integer); Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON FUNCTION public.search_stock_info(search_query text, limit_arg integer) TO anon;
GRANT ALL ON FUNCTION public.search_stock_info(search_query text, limit_arg integer) TO authenticated;
GRANT ALL ON FUNCTION public.search_stock_info(search_query text, limit_arg integer) TO service_role;


--
-- Name: FUNCTION search_stock_with_values(search_query text); Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON FUNCTION public.search_stock_with_values(search_query text) TO anon;
GRANT ALL ON FUNCTION public.search_stock_with_values(search_query text) TO authenticated;
GRANT ALL ON FUNCTION public.search_stock_with_values(search_query text) TO service_role;


--
-- Name: FUNCTION sell_stock(p_timestamp date, p_depot_id bigint, p_stock_id bigint, p_amount integer); Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON FUNCTION public.sell_stock(p_timestamp date, p_depot_id bigint, p_stock_id bigint, p_amount integer) TO anon;
GRANT ALL ON FUNCTION public.sell_stock(p_timestamp date, p_depot_id bigint, p_stock_id bigint, p_amount integer) TO authenticated;
GRANT ALL ON FUNCTION public.sell_stock(p_timestamp date, p_depot_id bigint, p_stock_id bigint, p_amount integer) TO service_role;


--
-- Name: FUNCTION update_depot_values(p_timestamp date); Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON FUNCTION public.update_depot_values(p_timestamp date) TO anon;
GRANT ALL ON FUNCTION public.update_depot_values(p_timestamp date) TO authenticated;
GRANT ALL ON FUNCTION public.update_depot_values(p_timestamp date) TO service_role;


--
-- Name: FUNCTION update_depot_values_s(p_timestamp date, p_depot_id bigint); Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON FUNCTION public.update_depot_values_s(p_timestamp date, p_depot_id bigint) TO anon;
GRANT ALL ON FUNCTION public.update_depot_values_s(p_timestamp date, p_depot_id bigint) TO authenticated;
GRANT ALL ON FUNCTION public.update_depot_values_s(p_timestamp date, p_depot_id bigint) TO service_role;


--
-- Name: FUNCTION upsert_stock_prices(p_stock_id bigint, p_timestamp date, p_open real, p_close real, p_high real, p_low real, p_volume bigint); Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON FUNCTION public.upsert_stock_prices(p_stock_id bigint, p_timestamp date, p_open real, p_close real, p_high real, p_low real, p_volume bigint) TO anon;
GRANT ALL ON FUNCTION public.upsert_stock_prices(p_stock_id bigint, p_timestamp date, p_open real, p_close real, p_high real, p_low real, p_volume bigint) TO authenticated;
GRANT ALL ON FUNCTION public.upsert_stock_prices(p_stock_id bigint, p_timestamp date, p_open real, p_close real, p_high real, p_low real, p_volume bigint) TO service_role;


--
-- Name: FUNCTION upsert_stock_prices_bulk(p_data jsonb); Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON FUNCTION public.upsert_stock_prices_bulk(p_data jsonb) TO anon;
GRANT ALL ON FUNCTION public.upsert_stock_prices_bulk(p_data jsonb) TO authenticated;
GRANT ALL ON FUNCTION public.upsert_stock_prices_bulk(p_data jsonb) TO service_role;


--
-- Name: FUNCTION apply_rls(wal jsonb, max_record_bytes integer); Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON FUNCTION realtime.apply_rls(wal jsonb, max_record_bytes integer) TO postgres;
GRANT ALL ON FUNCTION realtime.apply_rls(wal jsonb, max_record_bytes integer) TO dashboard_user;
GRANT ALL ON FUNCTION realtime.apply_rls(wal jsonb, max_record_bytes integer) TO anon;
GRANT ALL ON FUNCTION realtime.apply_rls(wal jsonb, max_record_bytes integer) TO authenticated;
GRANT ALL ON FUNCTION realtime.apply_rls(wal jsonb, max_record_bytes integer) TO service_role;
GRANT ALL ON FUNCTION realtime.apply_rls(wal jsonb, max_record_bytes integer) TO supabase_realtime_admin;


--
-- Name: FUNCTION broadcast_changes(topic_name text, event_name text, operation text, table_name text, table_schema text, new record, old record, level text); Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON FUNCTION realtime.broadcast_changes(topic_name text, event_name text, operation text, table_name text, table_schema text, new record, old record, level text) TO postgres;
GRANT ALL ON FUNCTION realtime.broadcast_changes(topic_name text, event_name text, operation text, table_name text, table_schema text, new record, old record, level text) TO dashboard_user;


--
-- Name: FUNCTION build_prepared_statement_sql(prepared_statement_name text, entity regclass, columns realtime.wal_column[]); Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON FUNCTION realtime.build_prepared_statement_sql(prepared_statement_name text, entity regclass, columns realtime.wal_column[]) TO postgres;
GRANT ALL ON FUNCTION realtime.build_prepared_statement_sql(prepared_statement_name text, entity regclass, columns realtime.wal_column[]) TO dashboard_user;
GRANT ALL ON FUNCTION realtime.build_prepared_statement_sql(prepared_statement_name text, entity regclass, columns realtime.wal_column[]) TO anon;
GRANT ALL ON FUNCTION realtime.build_prepared_statement_sql(prepared_statement_name text, entity regclass, columns realtime.wal_column[]) TO authenticated;
GRANT ALL ON FUNCTION realtime.build_prepared_statement_sql(prepared_statement_name text, entity regclass, columns realtime.wal_column[]) TO service_role;
GRANT ALL ON FUNCTION realtime.build_prepared_statement_sql(prepared_statement_name text, entity regclass, columns realtime.wal_column[]) TO supabase_realtime_admin;


--
-- Name: FUNCTION "cast"(val text, type_ regtype); Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON FUNCTION realtime."cast"(val text, type_ regtype) TO postgres;
GRANT ALL ON FUNCTION realtime."cast"(val text, type_ regtype) TO dashboard_user;
GRANT ALL ON FUNCTION realtime."cast"(val text, type_ regtype) TO anon;
GRANT ALL ON FUNCTION realtime."cast"(val text, type_ regtype) TO authenticated;
GRANT ALL ON FUNCTION realtime."cast"(val text, type_ regtype) TO service_role;
GRANT ALL ON FUNCTION realtime."cast"(val text, type_ regtype) TO supabase_realtime_admin;


--
-- Name: FUNCTION check_equality_op(op realtime.equality_op, type_ regtype, val_1 text, val_2 text); Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON FUNCTION realtime.check_equality_op(op realtime.equality_op, type_ regtype, val_1 text, val_2 text) TO postgres;
GRANT ALL ON FUNCTION realtime.check_equality_op(op realtime.equality_op, type_ regtype, val_1 text, val_2 text) TO dashboard_user;
GRANT ALL ON FUNCTION realtime.check_equality_op(op realtime.equality_op, type_ regtype, val_1 text, val_2 text) TO anon;
GRANT ALL ON FUNCTION realtime.check_equality_op(op realtime.equality_op, type_ regtype, val_1 text, val_2 text) TO authenticated;
GRANT ALL ON FUNCTION realtime.check_equality_op(op realtime.equality_op, type_ regtype, val_1 text, val_2 text) TO service_role;
GRANT ALL ON FUNCTION realtime.check_equality_op(op realtime.equality_op, type_ regtype, val_1 text, val_2 text) TO supabase_realtime_admin;


--
-- Name: FUNCTION is_visible_through_filters(columns realtime.wal_column[], filters realtime.user_defined_filter[]); Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON FUNCTION realtime.is_visible_through_filters(columns realtime.wal_column[], filters realtime.user_defined_filter[]) TO postgres;
GRANT ALL ON FUNCTION realtime.is_visible_through_filters(columns realtime.wal_column[], filters realtime.user_defined_filter[]) TO dashboard_user;
GRANT ALL ON FUNCTION realtime.is_visible_through_filters(columns realtime.wal_column[], filters realtime.user_defined_filter[]) TO anon;
GRANT ALL ON FUNCTION realtime.is_visible_through_filters(columns realtime.wal_column[], filters realtime.user_defined_filter[]) TO authenticated;
GRANT ALL ON FUNCTION realtime.is_visible_through_filters(columns realtime.wal_column[], filters realtime.user_defined_filter[]) TO service_role;
GRANT ALL ON FUNCTION realtime.is_visible_through_filters(columns realtime.wal_column[], filters realtime.user_defined_filter[]) TO supabase_realtime_admin;


--
-- Name: FUNCTION list_changes(publication name, slot_name name, max_changes integer, max_record_bytes integer); Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON FUNCTION realtime.list_changes(publication name, slot_name name, max_changes integer, max_record_bytes integer) TO postgres;
GRANT ALL ON FUNCTION realtime.list_changes(publication name, slot_name name, max_changes integer, max_record_bytes integer) TO dashboard_user;
GRANT ALL ON FUNCTION realtime.list_changes(publication name, slot_name name, max_changes integer, max_record_bytes integer) TO anon;
GRANT ALL ON FUNCTION realtime.list_changes(publication name, slot_name name, max_changes integer, max_record_bytes integer) TO authenticated;
GRANT ALL ON FUNCTION realtime.list_changes(publication name, slot_name name, max_changes integer, max_record_bytes integer) TO service_role;
GRANT ALL ON FUNCTION realtime.list_changes(publication name, slot_name name, max_changes integer, max_record_bytes integer) TO supabase_realtime_admin;


--
-- Name: FUNCTION quote_wal2json(entity regclass); Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON FUNCTION realtime.quote_wal2json(entity regclass) TO postgres;
GRANT ALL ON FUNCTION realtime.quote_wal2json(entity regclass) TO dashboard_user;
GRANT ALL ON FUNCTION realtime.quote_wal2json(entity regclass) TO anon;
GRANT ALL ON FUNCTION realtime.quote_wal2json(entity regclass) TO authenticated;
GRANT ALL ON FUNCTION realtime.quote_wal2json(entity regclass) TO service_role;
GRANT ALL ON FUNCTION realtime.quote_wal2json(entity regclass) TO supabase_realtime_admin;


--
-- Name: FUNCTION send(payload jsonb, event text, topic text, private boolean); Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON FUNCTION realtime.send(payload jsonb, event text, topic text, private boolean) TO postgres;
GRANT ALL ON FUNCTION realtime.send(payload jsonb, event text, topic text, private boolean) TO dashboard_user;


--
-- Name: FUNCTION subscription_check_filters(); Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON FUNCTION realtime.subscription_check_filters() TO postgres;
GRANT ALL ON FUNCTION realtime.subscription_check_filters() TO dashboard_user;
GRANT ALL ON FUNCTION realtime.subscription_check_filters() TO anon;
GRANT ALL ON FUNCTION realtime.subscription_check_filters() TO authenticated;
GRANT ALL ON FUNCTION realtime.subscription_check_filters() TO service_role;
GRANT ALL ON FUNCTION realtime.subscription_check_filters() TO supabase_realtime_admin;


--
-- Name: FUNCTION to_regrole(role_name text); Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON FUNCTION realtime.to_regrole(role_name text) TO postgres;
GRANT ALL ON FUNCTION realtime.to_regrole(role_name text) TO dashboard_user;
GRANT ALL ON FUNCTION realtime.to_regrole(role_name text) TO anon;
GRANT ALL ON FUNCTION realtime.to_regrole(role_name text) TO authenticated;
GRANT ALL ON FUNCTION realtime.to_regrole(role_name text) TO service_role;
GRANT ALL ON FUNCTION realtime.to_regrole(role_name text) TO supabase_realtime_admin;


--
-- Name: FUNCTION topic(); Type: ACL; Schema: realtime; Owner: supabase_realtime_admin
--

GRANT ALL ON FUNCTION realtime.topic() TO postgres;
GRANT ALL ON FUNCTION realtime.topic() TO dashboard_user;


--
-- Name: FUNCTION can_insert_object(bucketid text, name text, owner uuid, metadata jsonb); Type: ACL; Schema: storage; Owner: supabase_storage_admin
--

GRANT ALL ON FUNCTION storage.can_insert_object(bucketid text, name text, owner uuid, metadata jsonb) TO postgres;


--
-- Name: FUNCTION extension(name text); Type: ACL; Schema: storage; Owner: supabase_storage_admin
--

GRANT ALL ON FUNCTION storage.extension(name text) TO postgres;


--
-- Name: FUNCTION filename(name text); Type: ACL; Schema: storage; Owner: supabase_storage_admin
--

GRANT ALL ON FUNCTION storage.filename(name text) TO postgres;


--
-- Name: FUNCTION foldername(name text); Type: ACL; Schema: storage; Owner: supabase_storage_admin
--

GRANT ALL ON FUNCTION storage.foldername(name text) TO postgres;


--
-- Name: FUNCTION get_size_by_bucket(); Type: ACL; Schema: storage; Owner: supabase_storage_admin
--

GRANT ALL ON FUNCTION storage.get_size_by_bucket() TO postgres;


--
-- Name: FUNCTION list_multipart_uploads_with_delimiter(bucket_id text, prefix_param text, delimiter_param text, max_keys integer, next_key_token text, next_upload_token text); Type: ACL; Schema: storage; Owner: supabase_storage_admin
--

GRANT ALL ON FUNCTION storage.list_multipart_uploads_with_delimiter(bucket_id text, prefix_param text, delimiter_param text, max_keys integer, next_key_token text, next_upload_token text) TO postgres;


--
-- Name: FUNCTION list_objects_with_delimiter(bucket_id text, prefix_param text, delimiter_param text, max_keys integer, start_after text, next_token text); Type: ACL; Schema: storage; Owner: supabase_storage_admin
--

GRANT ALL ON FUNCTION storage.list_objects_with_delimiter(bucket_id text, prefix_param text, delimiter_param text, max_keys integer, start_after text, next_token text) TO postgres;


--
-- Name: FUNCTION operation(); Type: ACL; Schema: storage; Owner: supabase_storage_admin
--

GRANT ALL ON FUNCTION storage.operation() TO postgres;


--
-- Name: FUNCTION search(prefix text, bucketname text, limits integer, levels integer, offsets integer, search text, sortcolumn text, sortorder text); Type: ACL; Schema: storage; Owner: supabase_storage_admin
--

GRANT ALL ON FUNCTION storage.search(prefix text, bucketname text, limits integer, levels integer, offsets integer, search text, sortcolumn text, sortorder text) TO postgres;


--
-- Name: FUNCTION update_updated_at_column(); Type: ACL; Schema: storage; Owner: supabase_storage_admin
--

GRANT ALL ON FUNCTION storage.update_updated_at_column() TO postgres;


--
-- Name: FUNCTION _crypto_aead_det_decrypt(message bytea, additional bytea, key_id bigint, context bytea, nonce bytea); Type: ACL; Schema: vault; Owner: supabase_admin
--

GRANT ALL ON FUNCTION vault._crypto_aead_det_decrypt(message bytea, additional bytea, key_id bigint, context bytea, nonce bytea) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION vault._crypto_aead_det_decrypt(message bytea, additional bytea, key_id bigint, context bytea, nonce bytea) TO service_role;


--
-- Name: FUNCTION create_secret(new_secret text, new_name text, new_description text, new_key_id uuid); Type: ACL; Schema: vault; Owner: supabase_admin
--

GRANT ALL ON FUNCTION vault.create_secret(new_secret text, new_name text, new_description text, new_key_id uuid) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION vault.create_secret(new_secret text, new_name text, new_description text, new_key_id uuid) TO service_role;


--
-- Name: FUNCTION update_secret(secret_id uuid, new_secret text, new_name text, new_description text, new_key_id uuid); Type: ACL; Schema: vault; Owner: supabase_admin
--

GRANT ALL ON FUNCTION vault.update_secret(secret_id uuid, new_secret text, new_name text, new_description text, new_key_id uuid) TO postgres WITH GRANT OPTION;
GRANT ALL ON FUNCTION vault.update_secret(secret_id uuid, new_secret text, new_name text, new_description text, new_key_id uuid) TO service_role;


--
-- Name: FOREIGN DATA WRAPPER dblink_fdw; Type: ACL; Schema: -; Owner: supabase_admin
--

GRANT ALL ON FOREIGN DATA WRAPPER dblink_fdw TO postgres;


--
-- Name: TABLE audit_log_entries; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE auth.audit_log_entries TO dashboard_user;
GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE auth.audit_log_entries TO postgres;
GRANT SELECT ON TABLE auth.audit_log_entries TO postgres WITH GRANT OPTION;


--
-- Name: TABLE flow_state; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE auth.flow_state TO postgres;
GRANT SELECT ON TABLE auth.flow_state TO postgres WITH GRANT OPTION;
GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE auth.flow_state TO dashboard_user;


--
-- Name: TABLE identities; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE auth.identities TO postgres;
GRANT SELECT ON TABLE auth.identities TO postgres WITH GRANT OPTION;
GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE auth.identities TO dashboard_user;


--
-- Name: TABLE instances; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE auth.instances TO dashboard_user;
GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE auth.instances TO postgres;
GRANT SELECT ON TABLE auth.instances TO postgres WITH GRANT OPTION;


--
-- Name: TABLE mfa_amr_claims; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE auth.mfa_amr_claims TO postgres;
GRANT SELECT ON TABLE auth.mfa_amr_claims TO postgres WITH GRANT OPTION;
GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE auth.mfa_amr_claims TO dashboard_user;


--
-- Name: TABLE mfa_challenges; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE auth.mfa_challenges TO postgres;
GRANT SELECT ON TABLE auth.mfa_challenges TO postgres WITH GRANT OPTION;
GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE auth.mfa_challenges TO dashboard_user;


--
-- Name: TABLE mfa_factors; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE auth.mfa_factors TO postgres;
GRANT SELECT ON TABLE auth.mfa_factors TO postgres WITH GRANT OPTION;
GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE auth.mfa_factors TO dashboard_user;


--
-- Name: TABLE one_time_tokens; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE auth.one_time_tokens TO postgres;
GRANT SELECT ON TABLE auth.one_time_tokens TO postgres WITH GRANT OPTION;
GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE auth.one_time_tokens TO dashboard_user;


--
-- Name: TABLE refresh_tokens; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE auth.refresh_tokens TO dashboard_user;
GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE auth.refresh_tokens TO postgres;
GRANT SELECT ON TABLE auth.refresh_tokens TO postgres WITH GRANT OPTION;


--
-- Name: SEQUENCE refresh_tokens_id_seq; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT ALL ON SEQUENCE auth.refresh_tokens_id_seq TO dashboard_user;
GRANT ALL ON SEQUENCE auth.refresh_tokens_id_seq TO postgres;


--
-- Name: TABLE saml_providers; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE auth.saml_providers TO postgres;
GRANT SELECT ON TABLE auth.saml_providers TO postgres WITH GRANT OPTION;
GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE auth.saml_providers TO dashboard_user;


--
-- Name: TABLE saml_relay_states; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE auth.saml_relay_states TO postgres;
GRANT SELECT ON TABLE auth.saml_relay_states TO postgres WITH GRANT OPTION;
GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE auth.saml_relay_states TO dashboard_user;


--
-- Name: TABLE sessions; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE auth.sessions TO postgres;
GRANT SELECT ON TABLE auth.sessions TO postgres WITH GRANT OPTION;
GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE auth.sessions TO dashboard_user;


--
-- Name: TABLE sso_domains; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE auth.sso_domains TO postgres;
GRANT SELECT ON TABLE auth.sso_domains TO postgres WITH GRANT OPTION;
GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE auth.sso_domains TO dashboard_user;


--
-- Name: TABLE sso_providers; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE auth.sso_providers TO postgres;
GRANT SELECT ON TABLE auth.sso_providers TO postgres WITH GRANT OPTION;
GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE auth.sso_providers TO dashboard_user;


--
-- Name: TABLE users; Type: ACL; Schema: auth; Owner: supabase_auth_admin
--

GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE auth.users TO dashboard_user;
GRANT INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE auth.users TO postgres;
GRANT SELECT ON TABLE auth.users TO postgres WITH GRANT OPTION;


--
-- Name: TABLE "DepotPositions"; Type: ACL; Schema: depots; Owner: postgres
--

GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE depots."DepotPositions" TO anon;
GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE depots."DepotPositions" TO authenticated;
GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE depots."DepotPositions" TO service_role;


--
-- Name: SEQUENCE "DepotPositions_id_seq"; Type: ACL; Schema: depots; Owner: postgres
--

GRANT ALL ON SEQUENCE depots."DepotPositions_id_seq" TO anon;
GRANT ALL ON SEQUENCE depots."DepotPositions_id_seq" TO authenticated;
GRANT ALL ON SEQUENCE depots."DepotPositions_id_seq" TO service_role;


--
-- Name: TABLE "DepotValues"; Type: ACL; Schema: depots; Owner: postgres
--

GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE depots."DepotValues" TO anon;
GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE depots."DepotValues" TO authenticated;
GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE depots."DepotValues" TO service_role;


--
-- Name: SEQUENCE "DepotValue_id_seq"; Type: ACL; Schema: depots; Owner: postgres
--

GRANT ALL ON SEQUENCE depots."DepotValue_id_seq" TO anon;
GRANT ALL ON SEQUENCE depots."DepotValue_id_seq" TO authenticated;
GRANT ALL ON SEQUENCE depots."DepotValue_id_seq" TO service_role;


--
-- Name: TABLE "Depots"; Type: ACL; Schema: depots; Owner: postgres
--

GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE depots."Depots" TO anon;
GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE depots."Depots" TO authenticated;
GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE depots."Depots" TO service_role;


--
-- Name: TABLE "Transactions"; Type: ACL; Schema: depots; Owner: postgres
--

GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE depots."Transactions" TO anon;
GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE depots."Transactions" TO authenticated;
GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE depots."Transactions" TO service_role;


--
-- Name: SEQUENCE "Transactions_id_seq"; Type: ACL; Schema: depots; Owner: postgres
--

GRANT ALL ON SEQUENCE depots."Transactions_id_seq" TO anon;
GRANT ALL ON SEQUENCE depots."Transactions_id_seq" TO authenticated;
GRANT ALL ON SEQUENCE depots."Transactions_id_seq" TO service_role;


--
-- Name: SEQUENCE depots_id_seq; Type: ACL; Schema: depots; Owner: postgres
--

GRANT ALL ON SEQUENCE depots.depots_id_seq TO anon;
GRANT ALL ON SEQUENCE depots.depots_id_seq TO authenticated;
GRANT ALL ON SEQUENCE depots.depots_id_seq TO service_role;


--
-- Name: TABLE pg_stat_statements; Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE extensions.pg_stat_statements TO postgres WITH GRANT OPTION;
GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE extensions.pg_stat_statements TO dashboard_user;


--
-- Name: TABLE pg_stat_statements_info; Type: ACL; Schema: extensions; Owner: supabase_admin
--

GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE extensions.pg_stat_statements_info TO postgres WITH GRANT OPTION;
GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE extensions.pg_stat_statements_info TO dashboard_user;


--
-- Name: TABLE decrypted_key; Type: ACL; Schema: pgsodium; Owner: supabase_admin
--

GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE pgsodium.decrypted_key TO pgsodium_keyholder;


--
-- Name: TABLE masking_rule; Type: ACL; Schema: pgsodium; Owner: supabase_admin
--

GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE pgsodium.masking_rule TO pgsodium_keyholder;


--
-- Name: TABLE mask_columns; Type: ACL; Schema: pgsodium; Owner: supabase_admin
--

GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE pgsodium.mask_columns TO pgsodium_keyholder;


--
-- Name: TABLE a; Type: ACL; Schema: public; Owner: postgres
--

GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE public.a TO anon;
GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE public.a TO authenticated;
GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE public.a TO service_role;


--
-- Name: SEQUENCE "StockInfo_id_seq"; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON SEQUENCE public."StockInfo_id_seq" TO anon;
GRANT ALL ON SEQUENCE public."StockInfo_id_seq" TO authenticated;
GRANT ALL ON SEQUENCE public."StockInfo_id_seq" TO service_role;


--
-- Name: TABLE "StockPrices"; Type: ACL; Schema: public; Owner: postgres
--

GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE public."StockPrices" TO anon;
GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE public."StockPrices" TO authenticated;
GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE public."StockPrices" TO service_role;


--
-- Name: SEQUENCE "StockPrices_new_id_seq"; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON SEQUENCE public."StockPrices_new_id_seq" TO anon;
GRANT ALL ON SEQUENCE public."StockPrices_new_id_seq" TO authenticated;
GRANT ALL ON SEQUENCE public."StockPrices_new_id_seq" TO service_role;


--
-- Name: TABLE leaderboard; Type: ACL; Schema: public; Owner: postgres
--

GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE public.leaderboard TO anon;
GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE public.leaderboard TO authenticated;
GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE public.leaderboard TO service_role;


--
-- Name: TABLE profiles; Type: ACL; Schema: public; Owner: postgres
--

GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE public.profiles TO anon;
GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE public.profiles TO authenticated;
GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE public.profiles TO service_role;


--
-- Name: TABLE messages; Type: ACL; Schema: realtime; Owner: supabase_realtime_admin
--

GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE realtime.messages TO postgres;
GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE realtime.messages TO dashboard_user;
GRANT SELECT,INSERT,UPDATE ON TABLE realtime.messages TO anon;
GRANT SELECT,INSERT,UPDATE ON TABLE realtime.messages TO authenticated;
GRANT SELECT,INSERT,UPDATE ON TABLE realtime.messages TO service_role;


--
-- Name: TABLE schema_migrations; Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE realtime.schema_migrations TO postgres;
GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE realtime.schema_migrations TO dashboard_user;
GRANT SELECT ON TABLE realtime.schema_migrations TO anon;
GRANT SELECT ON TABLE realtime.schema_migrations TO authenticated;
GRANT SELECT ON TABLE realtime.schema_migrations TO service_role;
GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE realtime.schema_migrations TO supabase_realtime_admin;


--
-- Name: TABLE subscription; Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE realtime.subscription TO postgres;
GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE realtime.subscription TO dashboard_user;
GRANT SELECT ON TABLE realtime.subscription TO anon;
GRANT SELECT ON TABLE realtime.subscription TO authenticated;
GRANT SELECT ON TABLE realtime.subscription TO service_role;
GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE realtime.subscription TO supabase_realtime_admin;


--
-- Name: SEQUENCE subscription_id_seq; Type: ACL; Schema: realtime; Owner: supabase_admin
--

GRANT ALL ON SEQUENCE realtime.subscription_id_seq TO postgres;
GRANT ALL ON SEQUENCE realtime.subscription_id_seq TO dashboard_user;
GRANT USAGE ON SEQUENCE realtime.subscription_id_seq TO anon;
GRANT USAGE ON SEQUENCE realtime.subscription_id_seq TO authenticated;
GRANT USAGE ON SEQUENCE realtime.subscription_id_seq TO service_role;
GRANT ALL ON SEQUENCE realtime.subscription_id_seq TO supabase_realtime_admin;


--
-- Name: TABLE buckets; Type: ACL; Schema: storage; Owner: supabase_storage_admin
--

GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE storage.buckets TO anon;
GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE storage.buckets TO authenticated;
GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE storage.buckets TO service_role;
GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE storage.buckets TO postgres WITH GRANT OPTION;


--
-- Name: TABLE objects; Type: ACL; Schema: storage; Owner: supabase_storage_admin
--

GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE storage.objects TO anon;
GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE storage.objects TO authenticated;
GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE storage.objects TO service_role;
GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE storage.objects TO postgres WITH GRANT OPTION;


--
-- Name: TABLE s3_multipart_uploads; Type: ACL; Schema: storage; Owner: supabase_storage_admin
--

GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE storage.s3_multipart_uploads TO service_role;
GRANT SELECT ON TABLE storage.s3_multipart_uploads TO authenticated;
GRANT SELECT ON TABLE storage.s3_multipart_uploads TO anon;
GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE storage.s3_multipart_uploads TO postgres;


--
-- Name: TABLE s3_multipart_uploads_parts; Type: ACL; Schema: storage; Owner: supabase_storage_admin
--

GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE storage.s3_multipart_uploads_parts TO service_role;
GRANT SELECT ON TABLE storage.s3_multipart_uploads_parts TO authenticated;
GRANT SELECT ON TABLE storage.s3_multipart_uploads_parts TO anon;
GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE storage.s3_multipart_uploads_parts TO postgres;


--
-- Name: TABLE secrets; Type: ACL; Schema: vault; Owner: supabase_admin
--

GRANT SELECT,REFERENCES,DELETE,TRUNCATE ON TABLE vault.secrets TO postgres WITH GRANT OPTION;
GRANT SELECT,DELETE ON TABLE vault.secrets TO service_role;


--
-- Name: TABLE decrypted_secrets; Type: ACL; Schema: vault; Owner: supabase_admin
--

GRANT SELECT,REFERENCES,DELETE,TRUNCATE ON TABLE vault.decrypted_secrets TO postgres WITH GRANT OPTION;
GRANT SELECT,DELETE ON TABLE vault.decrypted_secrets TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: auth; Owner: supabase_auth_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_auth_admin IN SCHEMA auth GRANT ALL ON SEQUENCES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_auth_admin IN SCHEMA auth GRANT ALL ON SEQUENCES TO dashboard_user;


--
-- Name: DEFAULT PRIVILEGES FOR FUNCTIONS; Type: DEFAULT ACL; Schema: auth; Owner: supabase_auth_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_auth_admin IN SCHEMA auth GRANT ALL ON FUNCTIONS TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_auth_admin IN SCHEMA auth GRANT ALL ON FUNCTIONS TO dashboard_user;


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: auth; Owner: supabase_auth_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_auth_admin IN SCHEMA auth GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_auth_admin IN SCHEMA auth GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLES TO dashboard_user;


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: depots; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA depots GRANT ALL ON SEQUENCES TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA depots GRANT ALL ON SEQUENCES TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA depots GRANT ALL ON SEQUENCES TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR FUNCTIONS; Type: DEFAULT ACL; Schema: depots; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA depots GRANT ALL ON FUNCTIONS TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA depots GRANT ALL ON FUNCTIONS TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA depots GRANT ALL ON FUNCTIONS TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: depots; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA depots GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLES TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA depots GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLES TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA depots GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLES TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: extensions; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA extensions GRANT ALL ON SEQUENCES TO postgres WITH GRANT OPTION;


--
-- Name: DEFAULT PRIVILEGES FOR FUNCTIONS; Type: DEFAULT ACL; Schema: extensions; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA extensions GRANT ALL ON FUNCTIONS TO postgres WITH GRANT OPTION;


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: extensions; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA extensions GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLES TO postgres WITH GRANT OPTION;


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: graphql; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql GRANT ALL ON SEQUENCES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql GRANT ALL ON SEQUENCES TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql GRANT ALL ON SEQUENCES TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql GRANT ALL ON SEQUENCES TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR FUNCTIONS; Type: DEFAULT ACL; Schema: graphql; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql GRANT ALL ON FUNCTIONS TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql GRANT ALL ON FUNCTIONS TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql GRANT ALL ON FUNCTIONS TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql GRANT ALL ON FUNCTIONS TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: graphql; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLES TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLES TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLES TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: graphql_public; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT ALL ON SEQUENCES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT ALL ON SEQUENCES TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT ALL ON SEQUENCES TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT ALL ON SEQUENCES TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR FUNCTIONS; Type: DEFAULT ACL; Schema: graphql_public; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT ALL ON FUNCTIONS TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT ALL ON FUNCTIONS TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT ALL ON FUNCTIONS TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT ALL ON FUNCTIONS TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: graphql_public; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLES TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLES TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA graphql_public GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLES TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: pgsodium; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA pgsodium GRANT ALL ON SEQUENCES TO pgsodium_keyholder;


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: pgsodium; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA pgsodium GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLES TO pgsodium_keyholder;


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: pgsodium_masks; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA pgsodium_masks GRANT ALL ON SEQUENCES TO pgsodium_keyiduser;


--
-- Name: DEFAULT PRIVILEGES FOR FUNCTIONS; Type: DEFAULT ACL; Schema: pgsodium_masks; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA pgsodium_masks GRANT ALL ON FUNCTIONS TO pgsodium_keyiduser;


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: pgsodium_masks; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA pgsodium_masks GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLES TO pgsodium_keyiduser;


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: public; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON SEQUENCES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON SEQUENCES TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON SEQUENCES TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON SEQUENCES TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: public; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON SEQUENCES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON SEQUENCES TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON SEQUENCES TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON SEQUENCES TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR FUNCTIONS; Type: DEFAULT ACL; Schema: public; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON FUNCTIONS TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON FUNCTIONS TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON FUNCTIONS TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON FUNCTIONS TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR FUNCTIONS; Type: DEFAULT ACL; Schema: public; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON FUNCTIONS TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON FUNCTIONS TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON FUNCTIONS TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON FUNCTIONS TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: public; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLES TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLES TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLES TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: public; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLES TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLES TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLES TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: realtime; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA realtime GRANT ALL ON SEQUENCES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA realtime GRANT ALL ON SEQUENCES TO dashboard_user;


--
-- Name: DEFAULT PRIVILEGES FOR FUNCTIONS; Type: DEFAULT ACL; Schema: realtime; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA realtime GRANT ALL ON FUNCTIONS TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA realtime GRANT ALL ON FUNCTIONS TO dashboard_user;


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: realtime; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA realtime GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA realtime GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLES TO dashboard_user;


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: storage; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON SEQUENCES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON SEQUENCES TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON SEQUENCES TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON SEQUENCES TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR FUNCTIONS; Type: DEFAULT ACL; Schema: storage; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON FUNCTIONS TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON FUNCTIONS TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON FUNCTIONS TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT ALL ON FUNCTIONS TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: storage; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLES TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLES TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA storage GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLES TO service_role;


--
-- Name: issue_graphql_placeholder; Type: EVENT TRIGGER; Schema: -; Owner: supabase_admin
--

CREATE EVENT TRIGGER issue_graphql_placeholder ON sql_drop
         WHEN TAG IN ('DROP EXTENSION')
   EXECUTE FUNCTION extensions.set_graphql_placeholder();


ALTER EVENT TRIGGER issue_graphql_placeholder OWNER TO supabase_admin;

--
-- Name: issue_pg_cron_access; Type: EVENT TRIGGER; Schema: -; Owner: supabase_admin
--

CREATE EVENT TRIGGER issue_pg_cron_access ON ddl_command_end
         WHEN TAG IN ('CREATE EXTENSION')
   EXECUTE FUNCTION extensions.grant_pg_cron_access();


ALTER EVENT TRIGGER issue_pg_cron_access OWNER TO supabase_admin;

--
-- Name: issue_pg_graphql_access; Type: EVENT TRIGGER; Schema: -; Owner: supabase_admin
--

CREATE EVENT TRIGGER issue_pg_graphql_access ON ddl_command_end
         WHEN TAG IN ('CREATE FUNCTION')
   EXECUTE FUNCTION extensions.grant_pg_graphql_access();


ALTER EVENT TRIGGER issue_pg_graphql_access OWNER TO supabase_admin;

--
-- Name: issue_pg_net_access; Type: EVENT TRIGGER; Schema: -; Owner: supabase_admin
--

CREATE EVENT TRIGGER issue_pg_net_access ON ddl_command_end
         WHEN TAG IN ('CREATE EXTENSION')
   EXECUTE FUNCTION extensions.grant_pg_net_access();


ALTER EVENT TRIGGER issue_pg_net_access OWNER TO supabase_admin;

--
-- Name: pgrst_ddl_watch; Type: EVENT TRIGGER; Schema: -; Owner: supabase_admin
--

CREATE EVENT TRIGGER pgrst_ddl_watch ON ddl_command_end
   EXECUTE FUNCTION extensions.pgrst_ddl_watch();


ALTER EVENT TRIGGER pgrst_ddl_watch OWNER TO supabase_admin;

--
-- Name: pgrst_drop_watch; Type: EVENT TRIGGER; Schema: -; Owner: supabase_admin
--

CREATE EVENT TRIGGER pgrst_drop_watch ON sql_drop
   EXECUTE FUNCTION extensions.pgrst_drop_watch();


ALTER EVENT TRIGGER pgrst_drop_watch OWNER TO supabase_admin;

--
-- PostgreSQL database dump complete
--

