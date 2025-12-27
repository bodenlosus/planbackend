export type Json =
	| string
	| number
	| boolean
	| null
	| { [key: string]: Json | undefined }
	| Json[]

export type Database = {
	depots: {
		Tables: {
			DepotPositions: {
				Row: {
					amount: number
					date: string
					depot_id: number
					expenses: number
					id: number
					profit: number
					stock_id: number
				}
				Insert: {
					amount: number
					date: string
					depot_id: number
					expenses?: number
					id?: number
					profit?: number
					stock_id: number
				}
				Update: {
					amount?: number
					date?: string
					depot_id?: number
					expenses?: number
					id?: number
					profit?: number
					stock_id?: number
				}
				Relationships: [
					{
						foreignKeyName: "DepotPositions_depot_id_fkey"
						columns: ["depot_id"]
						isOneToOne: false
						referencedRelation: "Depots"
						referencedColumns: ["id"]
					},
				]
			}
			Depots: {
				Row: {
					created_at: string
					id: number
					liquid_assets: number
					name: string | null
					user_id: string
				}
				Insert: {
					created_at: string
					id?: number
					liquid_assets?: number
					name?: string | null
					user_id: string
				}
				Update: {
					created_at?: string
					id?: number
					liquid_assets?: number
					name?: string | null
					user_id?: string
				}
				Relationships: []
			}
			DepotValues: {
				Row: {
					depot_id: number
					id: number
					liquid_assets: number
					stock_assets: number
					timestamp: string
				}
				Insert: {
					depot_id: number
					id?: number
					liquid_assets: number
					stock_assets: number
					timestamp: string
				}
				Update: {
					depot_id?: number
					id?: number
					liquid_assets?: number
					stock_assets?: number
					timestamp?: string
				}
				Relationships: [
					{
						foreignKeyName: "DepotValue_depot_id_fkey"
						columns: ["depot_id"]
						isOneToOne: false
						referencedRelation: "Depots"
						referencedColumns: ["id"]
					},
				]
			}
			Transactions: {
				Row: {
					amount: number
					depot_id: number
					id: number
					price: number
					stock_id: number
					timestamp: string
				}
				Insert: {
					amount: number
					depot_id: number
					id?: number
					price: number
					stock_id: number
					timestamp?: string
				}
				Update: {
					amount?: number
					depot_id?: number
					id?: number
					price?: number
					stock_id?: number
					timestamp?: string
				}
				Relationships: [
					{
						foreignKeyName: "Transactions_depot_id_fkey"
						columns: ["depot_id"]
						isOneToOne: false
						referencedRelation: "Depots"
						referencedColumns: ["id"]
					},
				]
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
	public: {
		Tables: {
			profiles: {
				Row: {
					id: string
					name: string | null
				}
				Insert: {
					id: string
					name?: string | null
				}
				Update: {
					id?: string
					name?: string | null
				}
				Relationships: []
			}
			StockInfo: {
				Row: {
					description: string
					id: number
					name: string
					symbol: string
					type: Database["public"]["Enums"]["StockType"]
				}
				Insert: {
					description: string
					id?: number
					name: string
					symbol: string
					type?: Database["public"]["Enums"]["StockType"]
				}
				Update: {
					description?: string
					id?: number
					name?: string
					symbol?: string
					type?: Database["public"]["Enums"]["StockType"]
				}
				Relationships: []
			}
			StockPrices: {
				Row: {
					close: number
					high: number
					low: number
					open: number
					price_id: number
					stock_id: number
					timestamp: string
					volume: number
				}
				Insert: {
					close: number
					high: number
					low: number
					open: number
					price_id?: number
					stock_id: number
					timestamp: string
					volume: number
				}
				Update: {
					close?: number
					high?: number
					low?: number
					open?: number
					price_id?: number
					stock_id?: number
					timestamp?: string
					volume?: number
				}
				Relationships: [
					{
						foreignKeyName: "StockPrices_stock_id_fkey"
						columns: ["stock_id"]
						isOneToOne: false
						referencedRelation: "StockInfo"
						referencedColumns: ["id"]
					},
				]
			}
		}
		Views: {
			leaderboard: {
				Row: {
					id: number | null
					liquid_assets: number | null
					name: string | null
					stock_assets: number | null
					timestamp: string | null
				}
				Relationships: []
			}
		}
		Functions: {
			batch_update_depot_values:
				| {
						Args: {
							depot_id: number
							start_date: string
							end_date: string
						}
						Returns: undefined
				  }
				| {
						Args: {
							start_date: string
							end_date: string
						}
						Returns: undefined
				  }
			batch_update_depot_values_s:
				| {
						Args: {
							depot_id: number
							start_date: string
							end_date: string
						}
						Returns: undefined
				  }
				| {
						Args: {
							depot_id: number
							start_date: string
							end_date: string
						}
						Returns: undefined
				  }
			buy_stock: {
				Args: {
					p_timestamp: string
					p_depot_id: number
					p_stock_id: number
					p_amount: number
				}
				Returns: undefined
			}
			dblink: {
				Args: {
					"": string
				}
				Returns: Record<string, unknown>[]
			}
			dblink_cancel_query: {
				Args: {
					"": string
				}
				Returns: string
			}
			dblink_close: {
				Args: {
					"": string
				}
				Returns: string
			}
			dblink_connect: {
				Args: {
					"": string
				}
				Returns: string
			}
			dblink_connect_u: {
				Args: {
					"": string
				}
				Returns: string
			}
			dblink_current_query: {
				Args: Record<PropertyKey, never>
				Returns: string
			}
			dblink_disconnect:
				| {
						Args: Record<PropertyKey, never>
						Returns: string
				  }
				| {
						Args: {
							"": string
						}
						Returns: string
				  }
			dblink_error_message: {
				Args: {
					"": string
				}
				Returns: string
			}
			dblink_exec: {
				Args: {
					"": string
				}
				Returns: string
			}
			dblink_fdw_validator: {
				Args: {
					options: string[]
					catalog: unknown
				}
				Returns: undefined
			}
			dblink_get_connections: {
				Args: Record<PropertyKey, never>
				Returns: string[]
			}
			dblink_get_notify:
				| {
						Args: Record<PropertyKey, never>
						Returns: Record<string, unknown>[]
				  }
				| {
						Args: {
							conname: string
						}
						Returns: Record<string, unknown>[]
				  }
			dblink_get_pkey: {
				Args: {
					"": string
				}
				Returns: Database["public"]["CompositeTypes"]["dblink_pkey_results"][]
			}
			dblink_get_result: {
				Args: {
					"": string
				}
				Returns: Record<string, unknown>[]
			}
			dblink_is_busy: {
				Args: {
					"": string
				}
				Returns: number
			}
			get_depot_positions: {
				Args: {
					depot_id_param: number
					price_count_param: number
				}
				Returns: {
					id: number
					date: string
					depot_id: number
					stockid: number
					expenses: number
					profit: number
					amount: number
					symbol: string
					name: string
					description: string
					type: Database["public"]["Enums"]["StockType"]
					timestamp: string
					open: number
					close: number
					high: number
					low: number
					volume: number
					price_id: number
					rn: number
				}[]
			}
			get_depot_values: {
				Args: {
					p_depot_id: number
					p_interval_start: string
					p_interval_end: string
				}
				Returns: {
					timestamp: string
					liquid_assets: number
					stock_assets: number
				}[]
			}
			get_depots_of_user: {
				Args: {
					user_id: string
				}
				Returns: {
					id: number
					created_at: string
					liquid_assets: number
					name: string
				}[]
			}
			get_last_stock_prices: {
				Args: {
					p_stock_id: number
					limit_arg: number
				}
				Returns: {
					timestamp: string
					open: number
					close: number
					high: number
					low: number
					volume: number
				}[]
			}
			get_stock_info_by_id: {
				Args: {
					p_stock_id: number
				}
				Returns: {
					id: number
					symbol: string
					name: string
					description: string
					type: Database["public"]["Enums"]["StockType"]
				}[]
			}
			get_stock_position: {
				Args: {
					p_depot_id: number
					p_stock_id: number
				}
				Returns: {
					id: number
					date: string
					depot_id: number
					stock_id: number
					amount: number
					expenses: number
					profit: number
				}[]
			}
			get_stock_prices_by_interval: {
				Args: {
					p_stock_id: number
					p_interval_start: string
					p_interval_end: string
				}
				Returns: {
					timestamp: string
					open: number
					close: number
					high: number
					low: number
					volume: number
				}[]
			}
			get_test_depot_positions: {
				Args: {
					depot_id_param: number
				}
				Returns: {
					id: number
					date: string
					depot_id: number
					stock_id: number
					price: number
					amount: number
					symbol: string
					name: string
					description: string
					timestamp: string
					open: number
					close: number
					high: number
					low: number
					volume: number
					price_id: number
				}[]
			}
			log_transaction: {
				Args: {
					p_timestamp: string
					p_stock_id: number
					p_depot_id: number
					p_amount: number
					p_price: number
				}
				Returns: undefined
			}
			paginate_stock_symbols: {
				Args: {
					chunk_size: number
					chunk_number: number
				}
				Returns: {
					id: number
					symbol: string
				}[]
			}
			search_stock_info:
				| {
						Args: {
							search_query: string
						}
						Returns: {
							id: number
							name: string
							symbol: string
							description: string
						}[]
				  }
				| {
						Args: {
							search_query: string
							limit_arg: number
						}
						Returns: {
							id: number
							name: string
							symbol: string
							description: string
						}[]
				  }
			search_stock_with_values: {
				Args: {
					search_query: string
				}
				Returns: {
					id: number
					name: string
					symbol: string
					description: string
					timestamp: string
					open: number
					close: number
					high: number
					low: number
					volume: number
				}[]
			}
			sell_stock: {
				Args: {
					p_timestamp: string
					p_depot_id: number
					p_stock_id: number
					p_amount: number
				}
				Returns: undefined
			}
			update_depot_values: {
				Args: {
					p_timestamp: string
				}
				Returns: undefined
			}
			update_depot_values_s: {
				Args: {
					p_timestamp: string
					p_depot_id: number
				}
				Returns: undefined
			}
			upsert_stock_prices: {
				Args: {
					p_stock_id: number
					p_timestamp: string
					p_open: number
					p_close: number
					p_high: number
					p_low: number
					p_volume: number
				}
				Returns: undefined
			}
			upsert_stock_prices_bulk: {
				Args: {
					p_data: Json
				}
				Returns: undefined
			}
		}
		Enums: {
			StockType: "crypto" | "stock" | "etf" | "currency"
		}
		CompositeTypes: {
			dblink_pkey_results: {
				position: number | null
				colname: string | null
			}
			depot_info_result: {
				stockprice:
					| Database["public"]["CompositeTypes"]["stockprice_record"]
					| null
				position: Database["public"]["CompositeTypes"]["position_record"] | null
				info: Database["public"]["CompositeTypes"]["info_record"] | null
			}
			info_record: {
				id: number | null
				symbol: string | null
				name: string | null
				description: string | null
			}
			position_record: {
				id: number | null
				date: string | null
				depot_id: number | null
				stock_id: number | null
				price: number | null
				amount: number | null
			}
			stockprice_record: {
				stock_id: number | null
				timestamp: string | null
				open: number | null
				close: number | null
				high: number | null
				low: number | null
				volume: number | null
				price_id: number | null
			}
		}
	}
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
	PublicTableNameOrOptions extends
		| keyof (PublicSchema["Tables"] & PublicSchema["Views"])
		| { schema: keyof Database },
	TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
		? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
				Database[PublicTableNameOrOptions["schema"]]["Views"])
		: never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
	? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
			Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
			Row: infer R
		}
		? R
		: never
	: PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
				PublicSchema["Views"])
		? (PublicSchema["Tables"] &
				PublicSchema["Views"])[PublicTableNameOrOptions] extends {
				Row: infer R
			}
			? R
			: never
		: never

export type TablesInsert<
	PublicTableNameOrOptions extends
		| keyof PublicSchema["Tables"]
		| { schema: keyof Database },
	TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
		? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
		: never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
	? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
			Insert: infer I
		}
		? I
		: never
	: PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
		? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
				Insert: infer I
			}
			? I
			: never
		: never

export type TablesUpdate<
	PublicTableNameOrOptions extends
		| keyof PublicSchema["Tables"]
		| { schema: keyof Database },
	TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
		? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
		: never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
	? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
			Update: infer U
		}
		? U
		: never
	: PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
		? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
				Update: infer U
			}
			? U
			: never
		: never

export type Enums<
	PublicEnumNameOrOptions extends
		| keyof PublicSchema["Enums"]
		| { schema: keyof Database },
	EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
		? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
		: never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
	? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
	: PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
		? PublicSchema["Enums"][PublicEnumNameOrOptions]
		: never

export type CompositeTypes<
	PublicCompositeTypeNameOrOptions extends
		| keyof PublicSchema["CompositeTypes"]
		| { schema: keyof Database },
	CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
		schema: keyof Database
	}
		? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
		: never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
	? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
	: PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
		? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
		: never
