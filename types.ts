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
					last_updated: string | null
					name: string
					symbol: string
				}
				Insert: {
					asset_type: "commodity" | "crypto" | "fund" | "stock"
					description?: string | null
					id?: number
					last_updated?: string | null
					name: string
					symbol: string
				}
				Update: {
					asset_type?: "commodity" | "crypto" | "fund" | "stock"
					description?: string | null
					id?: number
					last_updated?: string | null
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
	depots: {
		Tables: {
			depot_values: {
				Row: {
					assets: number | null
					cash: number | null
					depot_id: number
					id: number
					tstamp: string
				}
				Insert: {
					assets?: number | null
					cash?: number | null
					depot_id: number
					id?: number
					tstamp?: string
				}
				Update: {
					assets?: number | null
					cash?: number | null
					depot_id?: number
					id?: number
					tstamp?: string
				}
				Relationships: [
					{
						foreignKeyName: "values_depot_fkey"
						columns: ["depot_id"]
						isOneToOne: false
						referencedRelation: "depots"
						referencedColumns: ["id"]
					},
				]
			}
			depots: {
				Row: {
					cash: number
					created: string
					id: number
					users: string[]
				}
				Insert: {
					cash: number
					created: string
					id?: number
					users: string[]
				}
				Update: {
					cash?: number
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
			values: {
				Row: {
					assets: number
					cash: number
					depot_id: number
					id: number
					tstamp: string
				}
				Insert: {
					assets: number
					cash: number
					depot_id: number
					id?: number
					tstamp: string
				}
				Update: {
					assets?: number
					cash?: number
					depot_id?: number
					id?: number
					tstamp?: string
				}
				Relationships: [
					{
						foreignKeyName: "values_depot_fkey"
						columns: ["depot_id"]
						isOneToOne: false
						referencedRelation: "depots"
						referencedColumns: ["id"]
					},
				]
			}
		}
		Views: {
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
					tstamp: string | null
				}
				Relationships: [
					{
						foreignKeyName: "values_depot_fkey"
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
		}
		Functions: {
			is_depot_member: {
				Args: { depot_id: number }
				Returns: boolean
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
	depots: {
		Enums: {},
	},
} as const
