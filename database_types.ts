export type Json =
	| string
	| number
	| boolean
	| null
	| { [key: string]: Json | undefined }
	| Json[]

export type Database = {
	api: {
		Tables: {
			asset_prices: {
				Row: {
					asset_id: number
					close: number | null
					high: number | null
					id: number
					low: number | null
					open: number | null
					tstamp: string
					volume: number | null
				}
				Insert: {
					asset_id: number
					close?: number | null
					high?: number | null
					id?: number
					low?: number | null
					open?: number | null
					tstamp: string
					volume?: number | null
				}
				Update: {
					asset_id?: number
					close?: number | null
					high?: number | null
					id?: number
					low?: number | null
					open?: number | null
					tstamp?: string
					volume?: number | null
				}
				Relationships: [
					{
						foreignKeyName: "assetprices_asset_id_fkey"
						columns: ["asset_id"]
						isOneToOne: false
						referencedRelation: "assets"
						referencedColumns: ["id"]
					},
				]
			}
			assets: {
				Row: {
					asset_type: "commodity" | "crypto" | "fund" | "stock"
					description: string | null
					id: number
					lastdepotsdepotsdedepot_idpotsdepots_updated: string | null
					name: string
					symbol: string
				}
				Insert: {
					asset_type: "commodity" | "crypto" | "fund" | "stock"
					description?: string | null
					id?: number
					lastdepotsdepotsdedepot_idpotsdepots_updated?: string | null
					name: string
					symbol: string
				}
				Update: {
					asset_type?: "commodity" | "crypto" | "fund" | "stock"
					description?: string | null
					id?: number
					lastdepotsdepotsdedepot_idpotsdepots_updated?: string | null
					name?: string
					symbol?: string
				}
				Relationships: []
			}
		}
		Views: {
			[_ in never]: never
		}
		Functions: {
			[_ in never]: never
		}
		Enums: {
			[_ in never]: never
		}
		CompositeTypes: {
			[_ in never]: never
		}
	}
	auth: {
		Tables: {
			audit_log_entries: {
				Row: {
					created_at: string | null
					id: string
					instance_id: string | null
					ip_address: string
					payload: Json | null
				}
				Insert: {
					created_at?: string | null
					id: string
					instance_id?: string | null
					ip_address?: string
					payload?: Json | null
				}
				Update: {
					created_at?: string | null
					id?: string
					instance_id?: string | null
					ip_address?: string
					payload?: Json | null
				}
				Relationships: []
			}
			flow_state: {
				Row: {
					auth_code: string
					auth_code_issued_at: string | null
					authentication_method: string
					code_challenge: string
					code_challenge_method: Database["auth"]["Enums"]["code_challenge_method"]
					created_at: string | null
					id: string
					provider_access_token: string | null
					provider_refresh_token: string | null
					provider_type: string
					updated_at: string | null
					user_id: string | null
				}
				Insert: {
					auth_code: string
					auth_code_issued_at?: string | null
					authentication_method: string
					code_challenge: string
					code_challenge_method: Database["auth"]["Enums"]["code_challenge_method"]
					created_at?: string | null
					id: string
					provider_access_token?: string | null
					provider_refresh_token?: string | null
					provider_type: string
					updated_at?: string | null
					user_id?: string | null
				}
				Update: {
					auth_code?: string
					auth_code_issued_at?: string | null
					authentication_method?: string
					code_challenge?: string
					code_challenge_method?: Database["auth"]["Enums"]["code_challenge_method"]
					created_at?: string | null
					id?: string
					provider_access_token?: string | null
					provider_refresh_token?: string | null
					provider_type?: string
					updated_at?: string | null
					user_id?: string | null
				}
				Relationships: []
			}
			identities: {
				Row: {
					created_at: string | null
					email: string | null
					id: string
					identity_data: Json
					last_sign_in_at: string | null
					provider: string
					provider_id: string
					updated_at: string | null
					user_id: string
				}
				Insert: {
					created_at?: string | null
					email?: string | null
					id?: string
					identity_data: Json
					last_sign_in_at?: string | null
					provider: string
					provider_id: string
					updated_at?: string | null
					user_id: string
				}
				Update: {
					created_at?: string | null
					email?: string | null
					id?: string
					identity_data?: Json
					last_sign_in_at?: string | null
					provider?: string
					provider_id?: string
					updated_at?: string | null
					user_id?: string
				}
				Relationships: [
					{
						foreignKeyName: "identities_user_id_fkey"
						columns: ["user_id"]
						isOneToOne: false
						referencedRelation: "users"
						referencedColumns: ["id"]
					},
				]
			}
			instances: {
				Row: {
					created_at: string | null
					id: string
					raw_base_config: string | null
					updated_at: string | null
					uuid: string | null
				}
				Insert: {
					created_at?: string | null
					id: string
					raw_base_config?: string | null
					updated_at?: string | null
					uuid?: string | null
				}
				Update: {
					created_at?: string | null
					id?: string
					raw_base_config?: string | null
					updated_at?: string | null
					uuid?: string | null
				}
				Relationships: []
			}
			mfa_amr_claims: {
				Row: {
					authentication_method: string
					created_at: string
					id: string
					session_id: string
					updated_at: string
				}
				Insert: {
					authentication_method: string
					created_at: string
					id: string
					session_id: string
					updated_at: string
				}
				Update: {
					authentication_method?: string
					created_at?: string
					id?: string
					session_id?: string
					updated_at?: string
				}
				Relationships: [
					{
						foreignKeyName: "mfa_amr_claims_session_id_fkey"
						columns: ["session_id"]
						isOneToOne: false
						referencedRelation: "sessions"
						referencedColumns: ["id"]
					},
				]
			}
			mfa_challenges: {
				Row: {
					created_at: string
					factor_id: string
					id: string
					ip_address: unknown
					otp_code: string | null
					verified_at: string | null
					web_authn_session_data: Json | null
				}
				Insert: {
					created_at: string
					factor_id: string
					id: string
					ip_address: unknown
					otp_code?: string | null
					verified_at?: string | null
					web_authn_session_data?: Json | null
				}
				Update: {
					created_at?: string
					factor_id?: string
					id?: string
					ip_address?: unknown
					otp_code?: string | null
					verified_at?: string | null
					web_authn_session_data?: Json | null
				}
				Relationships: [
					{
						foreignKeyName: "mfa_challenges_auth_factor_id_fkey"
						columns: ["factor_id"]
						isOneToOne: false
						referencedRelation: "mfa_factors"
						referencedColumns: ["id"]
					},
				]
			}
			mfa_factors: {
				Row: {
					created_at: string
					factor_type: Database["auth"]["Enums"]["factor_type"]
					friendly_name: string | null
					id: string
					last_challenged_at: string | null
					phone: string | null
					secret: string | null
					status: Database["auth"]["Enums"]["factor_status"]
					updated_at: string
					user_id: string
					web_authn_aaguid: string | null
					web_authn_credential: Json | null
				}
				Insert: {
					created_at: string
					factor_type: Database["auth"]["Enums"]["factor_type"]
					friendly_name?: string | null
					id: string
					last_challenged_at?: string | null
					phone?: string | null
					secret?: string | null
					status: Database["auth"]["Enums"]["factor_status"]
					updated_at: string
					user_id: string
					web_authn_aaguid?: string | null
					web_authn_credential?: Json | null
				}
				Update: {
					created_at?: string
					factor_type?: Database["auth"]["Enums"]["factor_type"]
					friendly_name?: string | null
					id?: string
					last_challenged_at?: string | null
					phone?: string | null
					secret?: string | null
					status?: Database["auth"]["Enums"]["factor_status"]
					updated_at?: string
					user_id?: string
					web_authn_aaguid?: string | null
					web_authn_credential?: Json | null
				}
				Relationships: [
					{
						foreignKeyName: "mfa_factors_user_id_fkey"
						columns: ["user_id"]
						isOneToOne: false
						referencedRelation: "users"
						referencedColumns: ["id"]
					},
				]
			}
			one_time_tokens: {
				Row: {
					created_at: string
					id: string
					relates_to: string
					token_hash: string
					token_type: Database["auth"]["Enums"]["one_time_token_type"]
					updated_at: string
					user_id: string
				}
				Insert: {
					created_at?: string
					id: string
					relates_to: string
					token_hash: string
					token_type: Database["auth"]["Enums"]["one_time_token_type"]
					updated_at?: string
					user_id: string
				}
				Update: {
					created_at?: string
					id?: string
					relates_to?: string
					token_hash?: string
					token_type?: Database["auth"]["Enums"]["one_time_token_type"]
					updated_at?: string
					user_id?: string
				}
				Relationships: [
					{
						foreignKeyName: "one_time_tokens_user_id_fkey"
						columns: ["user_id"]
						isOneToOne: false
						referencedRelation: "users"
						referencedColumns: ["id"]
					},
				]
			}
			refresh_tokens: {
				Row: {
					created_at: string | null
					id: number
					instance_id: string | null
					parent: string | null
					revoked: boolean | null
					session_id: string | null
					token: string | null
					updated_at: string | null
					user_id: string | null
				}
				Insert: {
					created_at?: string | null
					id?: number
					instance_id?: string | null
					parent?: string | null
					revoked?: boolean | null
					session_id?: string | null
					token?: string | null
					updated_at?: string | null
					user_id?: string | null
				}
				Update: {
					created_at?: string | null
					id?: number
					instance_id?: string | null
					parent?: string | null
					revoked?: boolean | null
					session_id?: string | null
					token?: string | null
					updated_at?: string | null
					user_id?: string | null
				}
				Relationships: [
					{
						foreignKeyName: "refresh_tokens_session_id_fkey"
						columns: ["session_id"]
						isOneToOne: false
						referencedRelation: "sessions"
						referencedColumns: ["id"]
					},
				]
			}
			saml_providers: {
				Row: {
					attribute_mapping: Json | null
					created_at: string | null
					entity_id: string
					id: string
					metadata_url: string | null
					metadata_xml: string
					name_id_format: string | null
					sso_provider_id: string
					updated_at: string | null
				}
				Insert: {
					attribute_mapping?: Json | null
					created_at?: string | null
					entity_id: string
					id: string
					metadata_url?: string | null
					metadata_xml: string
					name_id_format?: string | null
					sso_provider_id: string
					updated_at?: string | null
				}
				Update: {
					attribute_mapping?: Json | null
					created_at?: string | null
					entity_id?: string
					id?: string
					metadata_url?: string | null
					metadata_xml?: string
					name_id_format?: string | null
					sso_provider_id?: string
					updated_at?: string | null
				}
				Relationships: [
					{
						foreignKeyName: "saml_providers_sso_provider_id_fkey"
						columns: ["sso_provider_id"]
						isOneToOne: false
						referencedRelation: "sso_providers"
						referencedColumns: ["id"]
					},
				]
			}
			saml_relay_states: {
				Row: {
					created_at: string | null
					flow_state_id: string | null
					for_email: string | null
					id: string
					redirect_to: string | null
					request_id: string
					sso_provider_id: string
					updated_at: string | null
				}
				Insert: {
					created_at?: string | null
					flow_state_id?: string | null
					for_email?: string | null
					id: string
					redirect_to?: string | null
					request_id: string
					sso_provider_id: string
					updated_at?: string | null
				}
				Update: {
					created_at?: string | null
					flow_state_id?: string | null
					for_email?: string | null
					id?: string
					redirect_to?: string | null
					request_id?: string
					sso_provider_id?: string
					updated_at?: string | null
				}
				Relationships: [
					{
						foreignKeyName: "saml_relay_states_flow_state_id_fkey"
						columns: ["flow_state_id"]
						isOneToOne: false
						referencedRelation: "flow_state"
						referencedColumns: ["id"]
					},
					{
						foreignKeyName: "saml_relay_states_sso_provider_id_fkey"
						columns: ["sso_provider_id"]
						isOneToOne: false
						referencedRelation: "sso_providers"
						referencedColumns: ["id"]
					},
				]
			}
			schema_migrations: {
				Row: {
					version: string
				}
				Insert: {
					version: string
				}
				Update: {
					version?: string
				}
				Relationships: []
			}
			sessions: {
				Row: {
					aal: Database["auth"]["Enums"]["aal_level"] | null
					created_at: string | null
					factor_id: string | null
					id: string
					ip: unknown | null
					not_after: string | null
					refreshed_at: string | null
					tag: string | null
					updated_at: string | null
					user_agent: string | null
					user_id: string
				}
				Insert: {
					aal?: Database["auth"]["Enums"]["aal_level"] | null
					created_at?: string | null
					factor_id?: string | null
					id: string
					ip?: unknown | null
					not_after?: string | null
					refreshed_at?: string | null
					tag?: string | null
					updated_at?: string | null
					user_agent?: string | null
					user_id: string
				}
				Update: {
					aal?: Database["auth"]["Enums"]["aal_level"] | null
					created_at?: string | null
					factor_id?: string | null
					id?: string
					ip?: unknown | null
					not_after?: string | null
					refreshed_at?: string | null
					tag?: string | null
					updated_at?: string | null
					user_agent?: string | null
					user_id?: string
				}
				Relationships: [
					{
						foreignKeyName: "sessions_user_id_fkey"
						columns: ["user_id"]
						isOneToOne: false
						referencedRelation: "users"
						referencedColumns: ["id"]
					},
				]
			}
			sso_domains: {
				Row: {
					created_at: string | null
					domain: string
					id: string
					sso_provider_id: string
					updated_at: string | null
				}
				Insert: {
					created_at?: string | null
					domain: string
					id: string
					sso_provider_id: string
					updated_at?: string | null
				}
				Update: {
					created_at?: string | null
					domain?: string
					id?: string
					sso_provider_id?: string
					updated_at?: string | null
				}
				Relationships: [
					{
						foreignKeyName: "sso_domains_sso_provider_id_fkey"
						columns: ["sso_provider_id"]
						isOneToOne: false
						referencedRelation: "sso_providers"
						referencedColumns: ["id"]
					},
				]
			}
			sso_providers: {
				Row: {
					created_at: string | null
					id: string
					resource_id: string | null
					updated_at: string | null
				}
				Insert: {
					created_at?: string | null
					id: string
					resource_id?: string | null
					updated_at?: string | null
				}
				Update: {
					created_at?: string | null
					id?: string
					resource_id?: string | null
					updated_at?: string | null
				}
				Relationships: []
			}
			users: {
				Row: {
					aud: string | null
					banned_until: string | null
					confirmation_sent_at: string | null
					confirmation_token: string | null
					confirmed_at: string | null
					created_at: string | null
					deleted_at: string | null
					email: string | null
					email_change: string | null
					email_change_confirm_status: number | null
					email_change_sent_at: string | null
					email_change_token_current: string | null
					email_change_token_new: string | null
					email_confirmed_at: string | null
					encrypted_password: string | null
					id: string
					instance_id: string | null
					invited_at: string | null
					is_anonymous: boolean
					is_sso_user: boolean
					is_super_admin: boolean | null
					last_sign_in_at: string | null
					phone: string | null
					phone_change: string | null
					phone_change_sent_at: string | null
					phone_change_token: string | null
					phone_confirmed_at: string | null
					raw_app_meta_data: Json | null
					raw_user_meta_data: Json | null
					reauthentication_sent_at: string | null
					reauthentication_token: string | null
					recovery_sent_at: string | null
					recovery_token: string | null
					role: string | null
					updated_at: string | null
				}
				Insert: {
					aud?: string | null
					banned_until?: string | null
					confirmation_sent_at?: string | null
					confirmation_token?: string | null
					confirmed_at?: string | null
					created_at?: string | null
					deleted_at?: string | null
					email?: string | null
					email_change?: string | null
					email_change_confirm_status?: number | null
					email_change_sent_at?: string | null
					email_change_token_current?: string | null
					email_change_token_new?: string | null
					email_confirmed_at?: string | null
					encrypted_password?: string | null
					id: string
					instance_id?: string | null
					invited_at?: string | null
					is_anonymous?: boolean
					is_sso_user?: boolean
					is_super_admin?: boolean | null
					last_sign_in_at?: string | null
					phone?: string | null
					phone_change?: string | null
					phone_change_sent_at?: string | null
					phone_change_token?: string | null
					phone_confirmed_at?: string | null
					raw_app_meta_data?: Json | null
					raw_user_meta_data?: Json | null
					reauthentication_sent_at?: string | null
					reauthentication_token?: string | null
					recovery_sent_at?: string | null
					recovery_token?: string | null
					role?: string | null
					updated_at?: string | null
				}
				Update: {
					aud?: string | null
					banned_until?: string | null
					confirmation_sent_at?: string | null
					confirmation_token?: string | null
					confirmed_at?: string | null
					created_at?: string | null
					deleted_at?: string | null
					email?: string | null
					email_change?: string | null
					email_change_confirm_status?: number | null
					email_change_sent_at?: string | null
					email_change_token_current?: string | null
					email_change_token_new?: string | null
					email_confirmed_at?: string | null
					encrypted_password?: string | null
					id?: string
					instance_id?: string | null
					invited_at?: string | null
					is_anonymous?: boolean
					is_sso_user?: boolean
					is_super_admin?: boolean | null
					last_sign_in_at?: string | null
					phone?: string | null
					phone_change?: string | null
					phone_change_sent_at?: string | null
					phone_change_token?: string | null
					phone_confirmed_at?: string | null
					raw_app_meta_data?: Json | null
					raw_user_meta_data?: Json | null
					reauthentication_sent_at?: string | null
					reauthentication_token?: string | null
					recovery_sent_at?: string | null
					recovery_token?: string | null
					role?: string | null
					updated_at?: string | null
				}
				Relationships: []
			}
		}
		Views: {
			[_ in never]: never
		}
		Functions: {
			email: {
				Args: Record<PropertyKey, never>
				Returns: string
			}
			jwt: {
				Args: Record<PropertyKey, never>
				Returns: Json
			}
			role: {
				Args: Record<PropertyKey, never>
				Returns: string
			}
			uid: {
				Args: Record<PropertyKey, never>
				Returns: string
			}
		}
		Enums: {
			aal_level: "aal1" | "aal2" | "aal3"
			code_challenge_method: "s256" | "plain"
			factor_status: "unverified" | "verified"
			factor_type: "totp" | "webauthn" | "phone"
			one_time_token_type:
				| "confirmation_token"
				| "reauthentication_token"
				| "recovery_token"
				| "email_change_token_new"
				| "email_change_token_current"
				| "phone_change_token"
		}
		CompositeTypes: {
			[_ in never]: never
		}
	}
	depots: {
		Tables: {
			depots: {
				Row: {
					cash: number
					cash_start: number
					created: string
					id: number
					users: string[]
				}
				Insert: {
					cash: number
					cash_start: number
					created: string
					id?: number
					users: string[]
				}
				Update: {
					cash?: number
					cash_start?: number
					created?: string
					id?: number
					users?: string[]
				}
				Relationships: []
			}
			positions: {
				Row: {
					amount: number
					asset_id: number
					depot_id: number
					id: number
					last: string | null
					price: number
					worth: number
				}
				Insert: {
					amount: number
					asset_id: number
					depot_id: number
					id?: number
					last?: string | null
					price: number
					worth: number
				}
				Update: {
					amount?: number
					asset_id?: number
					depot_id?: number
					id?: number
					last?: string | null
					price?: number
					worth?: number
				}
				Relationships: [
					{
						foreignKeyName: "positions_depot_pkey"
						columns: ["depot_id"]
						isOneToOne: false
						referencedRelation: "depots"
						referencedColumns: ["id"]
					},
				]
			}
			transactions: {
				Row: {
					amount: number
					asset_id: number
					commission: number
					depot_id: number
					id: number
					price: number
					tstamp: string
					user_id: string | null
				}
				Insert: {
					amount: number
					asset_id: number
					commission: number
					depot_id: number
					id?: number
					price: number
					tstamp?: string
					user_id?: string | null
				}
				Update: {
					amount?: number
					asset_id?: number
					commission?: number
					depot_id?: number
					id?: number
					price?: number
					tstamp?: string
					user_id?: string | null
				}
				Relationships: [
					{
						foreignKeyName: "transactions_depot_fkey"
						columns: ["depot_id"]
						isOneToOne: false
						referencedRelation: "depots"
						referencedColumns: ["id"]
					},
				]
			}
		}
		Views: {
			aggregated_transactions: {
				Row: {
					asset_id: number | null
					daily_amount: number | null
					daily_commission: number | null
					depot_id: number | null
					running_amount: number | null
					running_commission: number | null
					running_expenses: number | null
					tstamp: string | null
				}
				Relationships: [
					{
						foreignKeyName: "transactions_depot_fkey"
						columns: ["depot_id"]
						isOneToOne: false
						referencedRelation: "depots"
						referencedColumns: ["id"]
					},
				]
			}
			aggregated_values: {
				Row: {
					assets: number | null
					cash: number | null
					depot_id: number | null
					diff_1d: number | null
					diff_1m: number | null
					diff_1y: number | null
					prev_1d_total: number | null
					prev_1m_total: number | null
					prev_1y_total: number | null
					rel_diff_1d: number | null
					rel_diff_1m: number | null
					rel_diff_1y: number | null
					total: number | null
					tstamp: number | null
				}
				Relationships: [
					{
						foreignKeyName: "transactions_depot_fkey"
						columns: ["depot_id"]
						isOneToOne: false
						referencedRelation: "depots"
						referencedColumns: ["id"]
					},
				]
			}
			position_profits: {
				Row: {
					asset_id: number | null
					current_amount: number | null
					current_price: number | null
					depot_id: number | null
					market_value: number | null
					symbol: string | null
					total_invested: number | null
					total_profit: number | null
					total_sold: number | null
				}
				Relationships: [
					{
						foreignKeyName: "transactions_depot_fkey"
						columns: ["depot_id"]
						isOneToOne: false
						referencedRelation: "depots"
						referencedColumns: ["id"]
					},
				]
			}
			values: {
				Row: {
					assets: number | null
					cash: number | null
					depot_id: number | null
					profit_from_start: number | null
					tstamp: string | null
					value: number | null
				}
				Relationships: [
					{
						foreignKeyName: "transactions_depot_fkey"
						columns: ["depot_id"]
						isOneToOne: false
						referencedRelation: "depots"
						referencedColumns: ["id"]
					},
				]
			}
		}
		Functions: {
			is_depot_member: {
				Args: { depot_id: number }
				Returns: boolean
			}
			new_depot_for_user: {
				Args: { p_user_id: string }
				Returns: undefined
			}
		}
		Enums: {
			[_ in never]: never
		}
		CompositeTypes: {
			[_ in never]: never
		}
	}
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
	DefaultSchemaTableNameOrOptions extends
		| keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
		| { schema: keyof DatabaseWithoutInternals },
	TableName extends DefaultSchemaTableNameOrOptions extends {
		schema: keyof DatabaseWithoutInternals
	}
		? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
				DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
		: never = never,
> = DefaultSchemaTableNameOrOptions extends {
	schema: keyof DatabaseWithoutInternals
}
	? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
			DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
			Row: infer R
		}
		? R
		: never
	: DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
				DefaultSchema["Views"])
		? (DefaultSchema["Tables"] &
				DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
				Row: infer R
			}
			? R
			: never
		: never

export type TablesInsert<
	DefaultSchemaTableNameOrOptions extends
		| keyof DefaultSchema["Tables"]
		| { schema: keyof DatabaseWithoutInternals },
	TableName extends DefaultSchemaTableNameOrOptions extends {
		schema: keyof DatabaseWithoutInternals
	}
		? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
		: never = never,
> = DefaultSchemaTableNameOrOptions extends {
	schema: keyof DatabaseWithoutInternals
}
	? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
			Insert: infer I
		}
		? I
		: never
	: DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
		? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
				Insert: infer I
			}
			? I
			: never
		: never

export type TablesUpdate<
	DefaultSchemaTableNameOrOptions extends
		| keyof DefaultSchema["Tables"]
		| { schema: keyof DatabaseWithoutInternals },
	TableName extends DefaultSchemaTableNameOrOptions extends {
		schema: keyof DatabaseWithoutInternals
	}
		? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
		: never = never,
> = DefaultSchemaTableNameOrOptions extends {
	schema: keyof DatabaseWithoutInternals
}
	? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
			Update: infer U
		}
		? U
		: never
	: DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
		? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
				Update: infer U
			}
			? U
			: never
		: never

export type Enums<
	DefaultSchemaEnumNameOrOptions extends
		| keyof DefaultSchema["Enums"]
		| { schema: keyof DatabaseWithoutInternals },
	EnumName extends DefaultSchemaEnumNameOrOptions extends {
		schema: keyof DatabaseWithoutInternals
	}
		? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
		: never = never,
> = DefaultSchemaEnumNameOrOptions extends {
	schema: keyof DatabaseWithoutInternals
}
	? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
	: DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
		? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
		: never

export type CompositeTypes<
	PublicCompositeTypeNameOrOptions extends
		| keyof DefaultSchema["CompositeTypes"]
		| { schema: keyof DatabaseWithoutInternals },
	CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
		schema: keyof DatabaseWithoutInternals
	}
		? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
		: never = never,
> = PublicCompositeTypeNameOrOptions extends {
	schema: keyof DatabaseWithoutInternals
}
	? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
	: PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
		? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
		: never

export const Constants = {
	api: {
		Enums: {},
	},
	auth: {
		Enums: {
			aal_level: ["aal1", "aal2", "aal3"],
			code_challenge_method: ["s256", "plain"],
			factor_status: ["unverified", "verified"],
			factor_type: ["totp", "webauthn", "phone"],
			one_time_token_type: [
				"confirmation_token",
				"reauthentication_token",
				"recovery_token",
				"email_change_token_new",
				"email_change_token_current",
				"phone_change_token",
			],
		},
	},
	depots: {
		Enums: {},
	},
} as const
